// Renders a component live on a stage. Hovering/focusing a CSS Parts table row highlights its part on the
// stage (a ring + wash + a floating part-name badge); hovering the part highlights its row. There are no
// persistent markers — the table is the accessible source of truth, so a part we can't locate or measure
// keeps its row, just without a highlight.
//
// The part list is read from the table's rows (`[data-anatomy-table] tr[data-part-name]`), produced by
// component.njk. Keep the two in sync.

// Attributes that duplicate an id or point at another node; cloning them would break the real page's
// label/aria wiring. We deliberately keep `name` — the stage isn't inside a <form>, and stripping it
// would blank `<wa-icon name="...">` and similar attribute-driven content.
const IDENTITY_ATTRS = [
  'id',
  'for',
  'aria-labelledby',
  'aria-describedby',
  'aria-controls',
  'aria-owns',
  'aria-activedescendant',
];

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
  #onResize;
  #measured = [];
  #stage;
  #overlay;

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
    if (this.#onResize) window.removeEventListener('resize', this.#onResize);
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

    const rows = [...table.querySelectorAll('tbody tr[data-part-name]')];
    if (!rows.length) return;

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

    // Structure: stage (positioning context) holds an inert subject wrapper plus an interactive regions
    // overlay. Only the subject is inert — inert would also swallow the regions' pointer events.
    const anatomy = document.createElement('div');
    anatomy.className = 'anatomy';

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
    anatomy.append(stage);
    this.append(anatomy);
    this.#stage = stage;
    this.#overlay = overlay;

    await this.#whenReady(tag, subject);

    this.#layout(rows, subject, overlay);

    // If nothing on the component is highlightable (sub-components that don't render standalone, or
    // components whose parts are all state-dependent), the stage adds no value — drop it and let the
    // table stand alone.
    if (!this.#measured.length) {
      this.querySelector('.anatomy')?.remove();
      return;
    }

    this.#observe();
  }

  async #whenReady(tag, subject) {
    // The autoloader registers the element once it's in the DOM; race a timeout so a component that never
    // loads (e.g. a bare fallback) degrades gracefully instead of hanging.
    await Promise.race([window.customElements.whenDefined(tag), new Promise(resolve => setTimeout(resolve, 2000))]);
    if (subject.updateComplete) {
      try {
        await subject.updateComplete;
      } catch {
        /* ignore */
      }
    }
    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  }

  #layout(rows, subject, overlay) {
    // Measure relative to the overlay (regions' offset parent), not the stage, so the 1px stage border
    // doesn't shift every region.
    const originRect = overlay.getBoundingClientRect();
    this.#measured = [];

    for (const row of rows) {
      const name = row.dataset.partName;

      // Nested parts live in a child component's shadow root (exported via exportparts); resolving them
      // is deferred. Treat as not-shown.
      const el = name.includes('__') ? null : subject.shadowRoot?.querySelector(`[part~="${CSS.escape(name)}"]`);
      const rect = el ? measureRect(el) : null;
      // No region to point at (part is nested or not shown in this state); the table still documents it.
      if (!rect) continue;

      // An invisible hover region over the part: highlighting is entirely hover/focus-driven — no
      // persistent markers or numbers. The region doubles as the reverse hit-target (stage → row).
      row.classList.add('is-linked');
      const region = document.createElement('span');
      region.className = 'anatomy-region';

      // A small part-name badge that surfaces near the part while it's highlighted; pulse draws the eye.
      const label = document.createElement('wa-badge');
      label.className = 'anatomy-region-label';
      label.setAttribute('pill', '');
      label.setAttribute('attention', 'pulse');
      label.textContent = name;
      region.append(label);

      overlay.append(region);

      const record = { el, region, row, area: rect.width * rect.height };
      this.#measured.push(record);
      this.#position(record, originRect);
      this.#wireHighlight(record);
    }

    // Stack smaller regions above larger ones so a part nested inside a bigger container (e.g. a select's
    // clear-button inside form-control-input) still receives hover instead of being covered.
    [...this.#measured]
      .sort((a, b) => b.area - a.area)
      .forEach((record, i) => {
        record.region.style.zIndex = String(i);
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
    // Match the part's own corner radius so the ring hugs its exact shape.
    const radius = getComputedStyle(record.el).borderRadius;
    if (radius && radius !== '0px') region.style.borderRadius = radius;
  }

  #wireHighlight(record) {
    const { region, row } = record;
    const on = () => this.#highlight(record, true);
    const off = () => this.#highlight(record, false);
    row.addEventListener('pointerenter', on);
    row.addEventListener('pointerleave', off);
    row.addEventListener('focusin', on);
    row.addEventListener('focusout', off);
    region.addEventListener('pointerenter', on);
    region.addEventListener('pointerleave', off);
  }

  #highlight(record, active) {
    record.region.classList.toggle('is-highlighted', active);
    record.row.classList.toggle('is-active', active);
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

    this.#onResize = schedule;
    window.addEventListener('resize', this.#onResize);
  }
}

if (!window.customElements.get('component-anatomy')) {
  window.customElements.define('component-anatomy', ComponentAnatomy);
}
