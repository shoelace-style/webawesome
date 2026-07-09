// Renders a component live on a stage. Hovering/focusing a CSS Parts table row highlights its part on the
// stage (a ring + wash + a floating part-name badge); hovering the part highlights its row, and clicking
// the part scrolls to its table row. There are no persistent markers — the table is the accessible source
// of truth, so a part we can't locate or measure keeps its row, just without a highlight.
//
// The part list is read from the table's rows (`[data-anatomy-table] tr[data-part-name]`), produced by
// component.njk. Keep the two in sync.

// Attributes that duplicate an id or point at another node; cloning them would break the real page's
// label/aria wiring. We deliberately keep `name` — the stage isn't inside a <form>, and stripping it
// would blank `<wa-icon name="...">` and similar attribute-driven content. `class`/`style` are kept too
// (examples use them for on-stage sizing and WA utilities); this assumes an example never reuses a
// page-scoped docs class, which would leak docs.css onto the stage.
const IDENTITY_ATTRS = [
  'id',
  'for',
  'aria-labelledby',
  'aria-describedby',
  'aria-controls',
  'aria-owns',
  'aria-activedescendant',
];

// In-box states that reveal a part not shown by default, keyed by the part they surface. A toggle is
// offered only when the component has that part and it isn't already shown in the default state. Portal
// states (open menus, dialogs) are out of scope — those parts render outside the stage.
const STATE_MAP = {
  spinner: { label: 'Loading', attrs: { loading: '' } },
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

// Bounding box for a part element, resolving `display: contents` cases (e.g. a bare `<slot part="label">`
// reports a zero rect) by unioning the rendered children it stands in for. Returns null when nothing renders.
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
  #rows = [];
  #stateSnapshot = new Map();
  #stateToken = 0;
  #flashTimer;

  connectedCallback() {
    // Drop anything restored from a Turbo snapshot and rebuild from the table, so positions always
    // reflect the current viewport.
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

    // Subject: an example flagged `.anatomy`/`.anatomy-only` if the page has one, else the first example,
    // else a bare element.
    const example =
      document.querySelector(`.code-example-content[data-anatomy-subject] ${tag}`) ||
      document.querySelector(`.code-example-content ${tag}`);
    if (!example) {
      console.warn(`[component-anatomy] No example instance of <${tag}> found; falling back to a bare element.`);
    }
    const subject = example ? example.cloneNode(true) : document.createElement(tag);
    stripIdentity(subject);
    this.#subject = subject;

    // Structure: a wa-card frames the diagram (stage in the body, state toggles in the header). The stage
    // holds an inert subject wrapper plus an interactive regions overlay — only the subject is inert, since
    // inert would also swallow the regions' pointer events.
    const card = document.createElement('wa-card');
    card.className = 'anatomy wa-not-prose';

    const stage = document.createElement('div');
    // Reuse the shared dot-grid background utility (same one the pro homepage uses).
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

    await this.#whenReady(tag, subject);

    this.#wireRows();
    this.#relayout();

    // If nothing on the component is highlightable (sub-components that don't render standalone, or
    // components whose parts are all state-dependent), the stage adds no value — drop it and let the
    // table stand alone.
    if (!this.#measured.length) {
      this.querySelector('.anatomy')?.remove();
      return;
    }

    this.#buildStateControls(card);
    this.#observe();
  }

  async #whenReady(tag, subject) {
    // The autoloader registers the element once it's in the DOM; race a timeout so a component that never
    // loads (e.g. a bare fallback) degrades gracefully instead of hanging.
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
    el.addEventListener('pointerenter', () => toggle(true));
    el.addEventListener('pointerleave', () => toggle(false));
  }

  // Wired once (rows persist across re-layouts); the record is resolved live, so re-measuring on a state
  // change leaves no stale or duplicate listeners.
  #wireRows() {
    for (const row of this.#rows) {
      if (row.__anatomyWired) continue;
      row.__anatomyWired = true;
      const toggle = active => this.#highlightRow(row, active);
      this.#bindHover(row, toggle);
      row.addEventListener('focusin', () => toggle(true));
      row.addEventListener('focusout', () => toggle(false));
    }
  }

  #relayout() {
    // Rebuild from scratch — a state toggle can change which parts render.
    this.#overlay.replaceChildren();
    for (const row of this.#rows) row.classList.remove('is-linked', 'is-active');
    this.#measured = [];
    this.#recordByRow.clear();

    const originRect = this.#overlay.getBoundingClientRect();
    for (const row of this.#rows) {
      const name = row.dataset.partName;

      // Nested parts live in a child component's shadow root (exported via exportparts); resolving them
      // is deferred. Treat as not-shown.
      const el = name.includes('__') ? null : this.#subject.shadowRoot?.querySelector(`[part~="${CSS.escape(name)}"]`);
      const rect = el ? measureRect(el) : null;
      // No region to point at (part is nested or not shown in this state); the table still documents it.
      if (!rect) continue;

      row.classList.add('is-linked');
      const region = document.createElement('span');
      region.className = 'anatomy-region';

      const label = document.createElement('wa-badge');
      label.className = 'anatomy-region-label';
      label.setAttribute('pill', '');
      label.setAttribute('attention', 'pulse');
      label.textContent = name;
      region.append(label);

      this.#overlay.append(region);

      // Match the part's own corner radius so the ring hugs its shape — set once (stable across reflows).
      const radius = getComputedStyle(el).borderRadius;
      if (radius && radius !== '0px') region.style.borderRadius = radius;

      const record = { el, region, row, area: rect.width * rect.height };
      this.#measured.push(record);
      this.#recordByRow.set(row, record);
      this.#position(record, originRect);
      this.#wireRegion(record);
    }

    // Stack smaller regions above larger ones so a part nested inside a bigger container (e.g. a select's
    // clear-button inside form-control-input) still receives hover instead of being covered.
    [...this.#measured]
      .sort((a, b) => b.area - a.area)
      .forEach((record, i) => {
        record.region.style.zIndex = String(i);
      });
  }

  #wireRegion(record) {
    const { region, row } = record;
    this.#bindHover(region, active => this.#highlight(record, active));
    // pointerleave clears the hover highlight as the page scrolls, so `is-flash` carries it to the landing row.
    region.addEventListener('click', () => {
      row.scrollIntoView({ behavior: 'smooth', block: 'center' });
      for (const other of this.#rows) other.classList.remove('is-flash');
      row.classList.add('is-flash');
      clearTimeout(this.#flashTimer);
      this.#flashTimer = setTimeout(() => row.classList.remove('is-flash'), 1500);
    });
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

  // State toggles that reveal an in-box part the default state hides — offered only for a part the
  // component has and isn't already showing.
  #buildStateControls(card) {
    const available = [];
    for (const [part, config] of Object.entries(STATE_MAP)) {
      const row = this.#rows.find(r => r.dataset.partName === part);
      if (row && !this.#recordByRow.has(row)) available.push(config);
    }
    if (!available.length) return;

    // Snapshot the original value of every attribute a state touches, so "Default" restores it exactly.
    const touched = new Set(available.flatMap(state => [...Object.keys(state.attrs), ...(state.remove ?? [])]));
    this.#stateSnapshot = new Map([...touched].map(attr => [attr, this.#subject.getAttribute(attr)]));

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
    // The active button reads as selected via wa-button's own appearance (filled vs plain) — no custom color.
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
    for (const state of available) bar.append(makeButton(state.label, state));
    setActive(defaultButton);

    header.append(heading, bar);
    card.append(header);
  }

  async #applyState(state) {
    for (const [attr, value] of this.#stateSnapshot) {
      if (value === null) this.#subject.removeAttribute(attr);
      else this.#subject.setAttribute(attr, value);
    }
    if (state) {
      for (const attr of state.remove ?? []) this.#subject.removeAttribute(attr);
      for (const [attr, value] of Object.entries(state.attrs)) this.#subject.setAttribute(attr, value);
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
      frame = requestAnimationFrame(() => this.#reposition());
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
