// Renders a component live on a stage and cross-links it with the CSS Parts table. Hover (mouse), focus
// (keyboard), and tap (touch) all work both ways: a linked row's part-name button highlights its part on the
// stage, and a part highlights (or scrolls to) its row. No markers — the table is the accessible source of
// truth. The part list is read from `[data-anatomy-table] tr[data-part-name]`, produced by component.njk.

// Cloned attributes that duplicate an id or point at another node break the real page's label/aria wiring.
// `name` is deliberately kept — stripping it would blank `<wa-icon name="...">`; the stage isn't in a <form>.
const IDENTITY_ATTRS = [
  'id',
  'for',
  'aria-labelledby',
  'aria-describedby',
  'aria-controls',
  'aria-owns',
  'aria-activedescendant',
];

// In-box states that reveal a part the default state hides, keyed by that part. Portal states (open menus,
// dialogs) are out of scope — those parts render outside the stage.
const STATE_MAP = {
  spinner: { label: 'Loading', attrs: { loading: '' } },
  // props sets the first matching property (not attribute) — radio/checkbox use `checked`, option `selected`,
  // and radio's `checked` is internal @state that markup can't set.
  'checked-icon': { label: 'Checked', props: ['checked', 'selected'] },
  // indeterminate and checked are mutually exclusive — clear checked or the checkbox renders no icon.
  'indeterminate-icon': { label: 'Indeterminate', attrs: { indeterminate: '' }, remove: ['checked'] },
  caret: { label: 'Caret', attrs: { 'with-caret': '' } },
  count: { label: 'Character count', attrs: { 'with-count': '' } },
  markers: { label: 'Markers', attrs: { 'with-markers': '' } },
  'password-toggle-button': { label: 'Password toggle', attrs: { 'password-toggle': '' } },
  'remove-button': { label: 'Removable', attrs: { 'with-remove': '' } },
  tags: { label: 'Multiple', attrs: { multiple: '' } },
};

function stripIdentity(root) {
  const nodes = [root, ...root.querySelectorAll('*')];
  for (const node of nodes) {
    for (const attr of IDENTITY_ATTRS) node.removeAttribute(attr);
  }
}

// Bounding box for a part, resolving `display: contents` (a bare `<slot part>` reports a zero rect) by
// unioning the children it stands in for. Returns null when nothing renders.
function measureRect(el) {
  const rect = el.getBoundingClientRect();
  if (rect.width || rect.height) return rect;

  const standIns = el.tagName === 'SLOT' ? el.assignedElements({ flatten: true }) : [...el.children];
  let left = Infinity;
  let top = Infinity;
  let right = -Infinity;
  let bottom = -Infinity;
  for (const node of standIns) {
    const r = node.getBoundingClientRect();
    if (!(r.width || r.height)) continue;
    left = Math.min(left, r.left);
    top = Math.min(top, r.top);
    right = Math.max(right, r.right);
    bottom = Math.max(bottom, r.bottom);
  }
  if (left === Infinity) return null;
  return { left, top, right, bottom, width: right - left, height: bottom - top };
}

class ComponentAnatomy extends HTMLElement {
  #resizeObserver;
  #themeObserver;
  #measured = [];
  #recordByRow = new Map();
  #stage;
  #overlay;
  #subject;
  #card;
  #section;
  #rows = [];
  #stateSnapshot = new Map();
  #statePropSnapshot = new Map();
  #stateToken = 0;
  #flashTimer;
  // Breathing room (--wa-space-m, resolved to px in #build) between the pinned card and a row scrolled to it.
  #scrollGap = 0;
  // Read live so a mid-session modality/preference change is honored. On touch (hover: none) the pointer
  // highlight is gated off so it never sticks without a leave; focus/tap drive it instead.
  #hoverQuery = window.matchMedia('(hover: hover)');
  #motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  connectedCallback() {
    // Rebuild from the table (dropping any Turbo-snapshot restore) so positions match the current viewport.
    this.querySelector('.anatomy')?.remove();
    this.#build();
  }

  disconnectedCallback() {
    this.#teardown();
  }

  #teardown() {
    this.#resizeObserver?.disconnect();
    this.#themeObserver?.disconnect();
    clearTimeout(this.#flashTimer);
    this.#measured = [];
  }

  #findTable() {
    let node = this.nextElementSibling;
    while (node) {
      if (node.matches?.('[data-anatomy-table]')) return node;
      const nested = node.querySelector?.('[data-anatomy-table]');
      if (nested) return nested;
      node = node.nextElementSibling;
    }
    return null;
  }

  async #build() {
    const tag = this.getAttribute('component');
    const table = this.#findTable();
    if (!tag || !table) {
      console.warn('[component-anatomy] No CSS Parts table found; skipping the anatomy diagram.');
      return;
    }

    this.#rows = [...table.querySelectorAll('tbody tr[data-part-name]')];
    if (!this.#rows.length) return;

    // Subject: the example flagged `.anatomy`/`.anatomy-only`, else the first example, else a bare element.
    const example =
      document.querySelector(`.code-example-content[data-anatomy-subject] ${tag}`) ||
      document.querySelector(`.code-example-content ${tag}`);
    if (!example) {
      console.warn(`[component-anatomy] No example instance of <${tag}> found; falling back to a bare element.`);
    }
    const subject = example ? example.cloneNode(true) : document.createElement(tag);
    stripIdentity(subject);
    this.#subject = subject;

    // Only the subject is inert — inert would also swallow the regions overlay's pointer events.
    const card = document.createElement('wa-card');
    card.className = 'anatomy wa-not-prose';

    const stage = document.createElement('div');
    stage.className = 'anatomy-stage background-dot-grid';

    const subjectWrap = document.createElement('div');
    subjectWrap.className = 'anatomy-subject';
    subjectWrap.setAttribute('inert', '');
    subjectWrap.append(subject);

    const overlay = document.createElement('div');
    overlay.className = 'anatomy-regions';
    overlay.setAttribute('aria-hidden', 'true');

    stage.append(subjectWrap, overlay);
    card.append(stage);
    this.append(card);
    this.#stage = stage;
    this.#overlay = overlay;
    this.#card = card;
    this.#section = this.closest('.anatomy-section');
    this.#scrollGap = this.#spacePx('--wa-space-m');

    await this.#whenReady(tag, subject);

    this.#wireRows();
    this.#relayout();

    // Nothing highlightable (sub-components, or all-state-dependent parts) — drop the stage, keep the table.
    if (!this.#measured.length) {
      this.querySelector('.anatomy')?.remove();
      return;
    }

    // One labeled figure a screen reader can skip; figure, not img, so the state toggles stay operable.
    this.setAttribute('role', 'figure');
    this.setAttribute('aria-label', `Anatomy of ${tag}`);

    this.#buildStateControls(card);
    this.#observe();
    this.#updateScrollInset();
  }

  async #whenReady(tag, subject) {
    // Race a timeout so a component that never registers (e.g. a bare fallback) degrades instead of hanging.
    await Promise.race([window.customElements.whenDefined(tag), new Promise(resolve => setTimeout(resolve, 2000))]);
    await this.#settle(subject);
  }

  async #settle(subject) {
    if (subject.updateComplete) {
      try {
        await subject.updateComplete;
      } catch {
        /* ignore */
      }
    }
    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  }

  #bindHover(el, toggle) {
    el.addEventListener('pointerenter', () => {
      if (this.#hoverQuery.matches) toggle(true);
    });
    el.addEventListener('pointerleave', () => toggle(false));
  }

  // Wired once; rows persist across re-layouts and the record is resolved live, so no stale/duplicate
  // listeners. Hover is row-wide; focus is scoped to the part-name button (see #ensureTrigger).
  #wireRows() {
    for (const row of this.#rows) {
      if (row.__anatomyWired) continue;
      row.__anatomyWired = true;
      this.#bindHover(row, active => this.#highlightRow(row, active));
    }
  }

  // Upgrade a demonstrated row's part name to a focusable button so keyboard/touch can drive the diagram.
  // Not-shown parts keep their plain <code> untouched. Idempotent.
  #ensureTrigger(row) {
    if (row.__anatomyTrigger?.isConnected) return;
    const code = row.querySelector('.table-name code');
    if (!code) return;

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'anatomy-part-trigger';
    code.replaceWith(button);
    button.append(code);
    button.addEventListener('focus', () => this.#highlightRow(row, true));
    button.addEventListener('blur', () => this.#highlightRow(row, false));
    // Locate: a pinned stage is already in view, so just flash; otherwise scroll it in first.
    button.addEventListener('click', () => {
      const record = this.#recordByRow.get(row);
      if (!record) return;
      if (!this.#isSticky()) this.#stage.scrollIntoView({ behavior: this.#scrollBehavior(), block: 'center' });
      this.#flash(record);
    });
    row.__anatomyTrigger = button;
  }

  #revertTrigger(row) {
    const button = row.__anatomyTrigger;
    if (!button?.isConnected) return;
    const code = button.querySelector('code');
    if (code) button.replaceWith(code);
    row.__anatomyTrigger = null;
  }

  // Rebuilt from scratch — a state toggle can change which parts render.
  #relayout() {
    this.#overlay.replaceChildren();
    for (const row of this.#rows) row.classList.remove('is-linked', 'is-active');
    this.#measured = [];
    this.#recordByRow.clear();

    const originRect = this.#overlay.getBoundingClientRect();
    for (const row of this.#rows) {
      const name = row.dataset.partName;

      // Nested parts (`__`, exported from a child shadow root) are deferred — treat as not-shown.
      const el = name.includes('__') ? null : this.#subject.shadowRoot?.querySelector(`[part~="${CSS.escape(name)}"]`);
      const rect = el ? measureRect(el) : null;
      // Zero area = present but collapsed (e.g. option's checked-icon before selection) — treat as not-shown.
      if (!rect || !rect.width || !rect.height) continue;

      row.classList.add('is-linked');
      this.#ensureTrigger(row);
      const region = document.createElement('span');
      region.className = 'anatomy-region';

      const label = document.createElement('wa-badge');
      label.className = 'anatomy-region-label';
      label.setAttribute('pill', '');
      label.setAttribute('attention', 'pulse');
      label.textContent = name;
      region.append(label);

      this.#overlay.append(region);

      // Hug the part's own corner radius; set once (stable across reflows).
      const radius = getComputedStyle(el).borderRadius;
      if (radius && radius !== '0px') region.style.borderRadius = radius;

      const record = { el, region, row, area: rect.width * rect.height };
      this.#measured.push(record);
      this.#recordByRow.set(row, record);
      this.#position(record, originRect);
      this.#wireRegion(record);
    }

    for (const row of this.#rows) if (!this.#recordByRow.has(row)) this.#revertTrigger(row);

    // Stack smaller regions above larger ones so a part nested in a bigger container still receives hover.
    [...this.#measured]
      .sort((a, b) => b.area - a.area)
      .forEach((record, i) => {
        record.region.style.zIndex = String(i);
      });
  }

  #wireRegion(record) {
    const { region } = record;
    this.#bindHover(region, active => this.#highlight(record, active));
    // Identify: tap a part → bring its row below the pinned card and flash the pair.
    region.addEventListener('click', () => {
      this.#scrollRowIntoView(record.row);
      this.#flash(record);
    });
  }

  #isSticky() {
    return getComputedStyle(this).position === 'sticky';
  }

  #scrollBehavior() {
    return this.#motionQuery.matches ? 'auto' : 'smooth';
  }

  // Direct window scroll, not scrollIntoView — the table's <wa-scroller> is a scroll container on both axes,
  // which throws off scrollIntoView's offset and scroll-margin.
  #scrollRowIntoView(row) {
    const top = row.getBoundingClientRect().top;
    window.scrollBy({ top: Math.round(top - this.#insetPx()), behavior: this.#scrollBehavior() });
  }

  // On-screen height of the pinned card (wa-page chrome + card) that scroll targets must clear; 0 when not
  // sticky. card.offsetTop (from the host, its offsetParent) already includes the host's top padding.
  #insetPx() {
    if (!this.#card) return 0;
    const cs = getComputedStyle(this);
    if (cs.position !== 'sticky') return 0;
    const px = name => parseFloat(cs.getPropertyValue(name)) || 0;
    const chrome = px('--banner-top') + px('--header-top') + px('--subheader-top');
    return chrome + this.#card.offsetTop + this.#card.offsetHeight + this.#scrollGap;
  }

  // Resolve a WA spacing token to px — custom properties read back as calc(), so measure it instead.
  #spacePx(token) {
    const probe = document.createElement('div');
    probe.style.cssText = `position: absolute; visibility: hidden; block-size: var(${token})`;
    this.append(probe);
    const px = probe.offsetHeight;
    probe.remove();
    return px;
  }

  // Mirror #insetPx into a CSS var so the browser's keyboard-focus auto-scroll (honoring the buttons'
  // scroll-margin) also lands them below the pinned card.
  #updateScrollInset() {
    if (!this.#section) return;
    const inset = this.#insetPx();
    if (inset) this.#section.style.setProperty('--anatomy-scroll-inset', `${Math.round(inset)}px`);
    else this.#section.style.removeProperty('--anatomy-scroll-inset');
  }

  // is-flash (not a hover class) so the highlight survives a smooth scroll — pointerleave would clear it.
  #flash(record) {
    for (const other of this.#rows) other.classList.remove('is-flash');
    for (const other of this.#measured) other.region.classList.remove('is-flash');

    record.row.classList.add('is-flash');
    record.region.classList.add('is-flash');

    clearTimeout(this.#flashTimer);
    this.#flashTimer = setTimeout(() => {
      record.row.classList.remove('is-flash');
      record.region.classList.remove('is-flash');
    }, 1500);
  }

  #position(record, originRect) {
    const rect = measureRect(record.el);
    if (!rect) return;
    const { region } = record;
    region.style.left = `${rect.left - originRect.left}px`;
    region.style.top = `${rect.top - originRect.top}px`;
    region.style.width = `${rect.width}px`;
    region.style.height = `${rect.height}px`;
  }

  #highlight(record, active) {
    record.region.classList.toggle('is-highlighted', active);
    record.row.classList.toggle('is-active', active);
  }

  #highlightRow(row, active) {
    const record = this.#recordByRow.get(row);
    if (record) this.#highlight(record, active);
  }

  // State toggles, offered only for a part the component has but doesn't show by default.
  #buildStateControls(card) {
    const available = [];
    for (const [part, config] of Object.entries(STATE_MAP)) {
      const row = this.#rows.find(r => r.dataset.partName === part);
      if (row && !this.#recordByRow.has(row)) available.push(config);
    }
    if (!available.length) return;

    // Snapshot every attribute and property a state touches so "Default" restores it exactly.
    const touched = new Set(available.flatMap(state => [...Object.keys(state.attrs ?? {}), ...(state.remove ?? [])]));
    this.#stateSnapshot = new Map([...touched].map(attr => [attr, this.#subject.getAttribute(attr)]));
    const props = new Set(available.map(state => this.#stateProp(state)).filter(Boolean));
    this.#statePropSnapshot = new Map([...props].map(name => [name, this.#subject[name]]));

    const header = document.createElement('div');
    header.className = 'wa-flank:end wa-align-items-center';
    header.slot = 'header';

    const heading = document.createElement('small');
    heading.className = 'anatomy-states-label';
    heading.textContent = 'Component states';

    const bar = document.createElement('div');
    bar.className = 'anatomy-states wa-cluster wa-gap-3xs';
    bar.setAttribute('role', 'group');
    bar.setAttribute('aria-label', 'Component states');

    const buttons = [];
    const setActive = button => {
      for (const other of buttons) {
        const active = other === button;
        other.setAttribute('appearance', active ? 'filled' : 'plain');
        other.setAttribute('aria-pressed', String(active));
      }
    };
    const makeButton = (label, state) => {
      const button = document.createElement('wa-button');
      button.className = 'anatomy-state';
      button.setAttribute('appearance', 'plain');
      button.setAttribute('size', 'small');
      button.textContent = label;
      button.addEventListener('click', () => {
        if (button.getAttribute('appearance') === 'filled') return;
        setActive(button);
        this.#applyState(state);
      });
      buttons.push(button);
      return button;
    };

    const defaultButton = makeButton('Default', null);
    bar.append(defaultButton);
    for (const state of available) {
      // A prop-based state labels itself from the property it sets (checked → Checked, selected → Selected).
      const prop = this.#stateProp(state);
      const label = prop ? prop[0].toUpperCase() + prop.slice(1) : state.label;
      bar.append(makeButton(label, state));
    }
    setActive(defaultButton);

    header.append(heading, bar);
    card.append(header);
  }

  // First property in `state.props` that the subject actually has (radio/checkbox: `checked`, option:
  // `selected`) — so a state can reveal a part markup can't, like radio's internal @state `checked`.
  #stateProp(state) {
    return state.props?.find(name => name in this.#subject) ?? null;
  }

  async #applyState(state) {
    for (const [attr, value] of this.#stateSnapshot) {
      if (value === null) this.#subject.removeAttribute(attr);
      else this.#subject.setAttribute(attr, value);
    }
    for (const [name, value] of this.#statePropSnapshot) this.#subject[name] = value;
    if (state) {
      for (const attr of state.remove ?? []) this.#subject.removeAttribute(attr);
      for (const [attr, value] of Object.entries(state.attrs ?? {})) this.#subject.setAttribute(attr, value);
      const prop = this.#stateProp(state);
      if (prop) this.#subject[prop] = true;
    }
    // Guard against out-of-order re-layouts when states are toggled rapidly.
    const token = ++this.#stateToken;
    await this.#settle(this.#subject);
    if (token === this.#stateToken) this.#relayout();
  }

  #reposition() {
    if (!this.#overlay || !this.#measured.length) return;
    const originRect = this.#overlay.getBoundingClientRect();
    for (const record of this.#measured) this.#position(record, originRect);
  }

  #observe() {
    let frame;
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        this.#reposition();
        this.#updateScrollInset();
      });
    };

    this.#resizeObserver = new ResizeObserver(schedule);
    this.#resizeObserver.observe(this.#stage);

    // Theme and direction toggles restyle the component in place, changing part geometry.
    this.#themeObserver = new MutationObserver(schedule);
    this.#themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'dir'],
    });
  }
}

if (!window.customElements.get('component-anatomy')) {
  window.customElements.define('component-anatomy', ComponentAnatomy);
}
