import { html, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { WaContentChangeEvent } from '../../events/random-content-change.js';
import { prefersReducedMotion } from '../../internal/animate.js';
import { watch } from '../../internal/watch.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import visuallyHidden from '../../styles/component/visually-hidden.styles.js';
import { AutoplayController } from '../carousel/autoplay-controller.js';
import styles from './random-content.styles.js';

// Keyframes must live in the document scope: Chromium does not resolve shadow-root-scoped
// @keyframes for slotted elements, even when applied via ::slotted() rules.
if (typeof document !== 'undefined') {
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(`
    @keyframes wa-rc-fade {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes wa-rc-fade-up {
      from { opacity: 0; transform: translateY(var(--animation-translate, 0.5em)); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes wa-rc-fade-down {
      from { opacity: 0; transform: translateY(calc(-1 * var(--animation-translate, 0.5em))); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes wa-rc-fade-left {
      from { opacity: 0; transform: translateX(var(--animation-translate, 0.5em)); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes wa-rc-fade-right {
      from { opacity: 0; transform: translateX(calc(-1 * var(--animation-translate, 0.5em))); }
      to { opacity: 1; transform: translateX(0); }
    }
  `);
  document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
}

/**
 * @summary Selects one or more child elements at random and displays them, hiding the rest.
 * @documentation https://webawesome.com/docs/components/random-content
 * @status experimental
 * @since 3.9
 *
 * @slot - The pool of children to choose from. Only direct element children are eligible; unselected
 *  children are hidden with the `hidden` attribute.
 *
 * @event {{ items: Element[] }} wa-content-change - Emitted whenever the displayed selection changes,
 *  including on first render, on `randomize()`, and on each autoplay tick.
 *
 * @cssproperty --animation-duration - Duration of the entrance animation. Default is `300ms`.
 * @cssproperty --animation-easing - Easing function for the entrance animation. Default is `ease`.
 * @cssproperty --animation-translate - Translation distance for directional animations (`fade-up`, `fade-down`, `fade-left`, `fade-right`). Default is `0.5em`.
 */
@customElement('wa-random-content')
export default class WaRandomContent extends WebAwesomeElement {
  static css = [styles, visuallyHidden];

  private sequenceCursor = 0;
  private uniqueQueue: Element[] = [];
  private currentSelection = new Set<Element>();
  private isInitialSelection = true;
  private autoplayController = new AutoplayController(this, () => this.randomize());
  // Tracks the pending "clear animation attribute" listener per child so rapid re-animation
  // (e.g. fast autoplay) doesn't stack listeners — `cancel()` fires `animationcancel`, not the
  // `animationend` the listener waits for, so it wouldn't otherwise be removed.
  private animationCleanups = new WeakMap<Element, AbortController>();

  /** Text pushed to a visually-hidden live region so screen readers hear rotations. */
  @state() private liveAnnouncement = '';

  /** Number of children to show simultaneously. Clamped to [1, childCount]. */
  @property({ type: Number }) items = 1;

  /** Selection strategy: `unique` (default), `random`, or `sequence`. */
  @property({ reflect: true }) mode: 'random' | 'unique' | 'sequence' = 'unique';

  /** Rotate the content automatically. Set the cadence with `autoplay-interval`. */
  @property({ type: Boolean, reflect: true }) autoplay = false;

  /** Autoplay cadence in milliseconds. */
  @property({ type: Number, attribute: 'autoplay-interval' }) autoplayInterval = 3000;

  /** Entrance animation for newly shown children. */
  @property({ reflect: true }) animation: 'none' | 'fade' | 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' =
    'none';

  connectedCallback() {
    super.connectedCallback();
    // Restart autoplay on reconnect; the initial start happens in firstUpdated().
    if (this.hasUpdated) this.syncAutoplay();
  }

  firstUpdated(changedProperties: PropertyValues<this>) {
    // The base class dispatches the initial `slotchange` here (an SSR workaround), which drives the
    // first selection — so calling super is required for server-rendered content to render correctly.
    super.firstUpdated(changedProperties);
    this.syncAutoplay();
  }

  @watch(['autoplay', 'autoplayInterval'], { waitUntilFirstUpdate: true })
  handleAutoplayChange() {
    this.syncAutoplay();
  }

  @watch('mode', { waitUntilFirstUpdate: true })
  handleModeChange() {
    this.sequenceCursor = 0;
    this.uniqueQueue = [];
    this.currentSelection.clear();
    this.randomize();
  }

  @watch('items', { waitUntilFirstUpdate: true })
  handleItemsChange() {
    this.uniqueQueue = [];
    this.randomize();
  }

  /** Selects a new set of children using the current mode. Returns the elements now shown. */
  randomize(): Element[] {
    const children = this.assignedChildren();
    if (!children.length) return [];

    const count = Math.min(Math.max(1, this.items), children.length);
    let selected: Element[];

    if (this.mode === 'sequence') {
      selected = [];
      Array.from({ length: count }).forEach((_, i) => {
        selected.push(children[(this.sequenceCursor + i) % children.length]);
      });
      this.sequenceCursor = (this.sequenceCursor + count) % children.length;
    } else if (this.mode === 'unique') {
      if (this.uniqueQueue.length < count) {
        // Refill the queue with a full shuffle of all children. Items from the current
        // selection go to the end so the next pick is never the same as the last shown.
        const queued = new Set(this.uniqueQueue);
        const rest = children.filter(c => !this.currentSelection.has(c) && !queued.has(c));
        const current = children.filter(c => this.currentSelection.has(c) && !queued.has(c));
        this.uniqueQueue.push(...this.sample(rest, rest.length), ...this.sample(current, current.length));
        // Edge case: items >= children.length — just use all children.
        if (this.uniqueQueue.length < count) {
          this.uniqueQueue = this.sample([...children], children.length);
        }
      }
      selected = this.uniqueQueue.splice(0, count);
      this.currentSelection = new Set(selected);
    } else {
      const pool = children.filter(c => !this.currentSelection.has(c));
      selected = this.sample(pool.length >= count ? pool : children, count);
      this.currentSelection = new Set(selected);
    }

    const firstShown = selected[0];
    const lastShown = selected[selected.length - 1];
    children.forEach(el => {
      const htmlEl = el as HTMLElement;
      const isSelected = selected.includes(el);
      // Reset per-pick inline styles we own, so a previously promoted/hidden element is clean.
      delete htmlEl.dataset['waAnimation'];
      htmlEl.style.display = '';
      htmlEl.hidden = !isSelected;
      // Strip the leading/trailing block margins of the shown set so the hidden siblings don't leave
      // a phantom gap (e.g. a <p> or <wa-callout> whose own margin would otherwise show before the
      // first shown item or after the last). Items between keep their margins for spacing.
      htmlEl.style.marginBlockStart = isSelected && el === firstShown ? '0' : '';
      htmlEl.style.marginBlockEnd = isSelected && el === lastShown ? '0' : '';
    });

    if (this.animation !== 'none' && !prefersReducedMotion()) {
      selected.forEach(el => {
        const htmlEl = el as HTMLElement;
        // CSS transforms don't apply to display:inline elements. Promote to inline-block so
        // directional animations work. (An explicit display also keeps `hidden` overridable.)
        if (this.animation !== 'fade' && getComputedStyle(el).display === 'inline') {
          htmlEl.style.display = 'inline-block';
        }
        // Cancel any in-progress animation so the CSS animation restarts cleanly.
        el.getAnimations().forEach(a => a.cancel());
        // Abort the previous animationend listener (cancel() fires animationcancel, not animationend,
        // so { once: true } alone would leave the old listener attached until a future animation ends).

        htmlEl.dataset['waAnimation'] = this.animation;
        // Drop the previous (un-fired) listener before adding a new one so they don't accumulate.
        this.animationCleanups.get(el)?.abort();
        const cleanup = new AbortController();
        this.animationCleanups.set(el, cleanup);
        htmlEl.addEventListener('animationend', () => delete htmlEl.dataset['waAnimation'], {
          once: true,
          signal: cleanup.signal,
        });
      });
    }

    // Announce the new content to screen readers — but not the initial render, which would be noise.
    if (this.isInitialSelection) {
      this.isInitialSelection = false;
    } else {
      this.liveAnnouncement = selected
        .map(el => el.textContent?.trim())
        .filter(Boolean)
        .join(', ');
    }

    this.dispatchEvent(new WaContentChangeEvent({ items: selected }));
    return selected;
  }

  private syncAutoplay() {
    this.autoplayController.stop();
    // Reduced motion is handled by skipping the entrance animation (see randomize), not by stopping
    // autoplay — matching <wa-carousel>, which keeps advancing but without the smooth transition.
    if (this.autoplay && this.autoplayInterval > 0) {
      this.autoplayController.start(this.autoplayInterval);
    }
  }

  private assignedChildren(): Element[] {
    const slot = this.shadowRoot?.querySelector('slot') as HTMLSlotElement | null;
    return slot?.assignedElements() ?? [];
  }

  // Fisher-Yates partial shuffle — picks `count` unique items from `pool`.
  private sample(pool: Element[], count: number): Element[] {
    const arr = [...pool];
    Array.from({ length: count }).forEach((_, i) => {
      const j = i + Math.floor(Math.random() * (arr.length - i));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    });
    return arr.slice(0, count);
  }

  private handleSlotChange() {
    this.randomize();
  }

  render() {
    return html`
      <slot @slotchange=${this.handleSlotChange}></slot>
      <div class="wa-visually-hidden" role="status" aria-live="polite" aria-atomic="true">${this.liveAnnouncement}</div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-random-content': WaRandomContent;
  }
}
