import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { watch } from '../../internal/watch.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import styles from './random-content.styles.js';

// Keyframes must live in the document scope, Chromium does not resolve shadow-root-scoped
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
 * @summary Random content selects one or more child elements at random and displays them.
 * @documentation https://webawesome.com/docs/components/random-content
 * @status experimental
 * @since 3.9
 *
 * @slot - The pool of children to randomize from. Unselected children are hidden with `display: none`.
 *
 * @cssproperty --animation-duration - Duration of the entrance animation. Default is `300ms`.
 * @cssproperty --animation-easing - Easing function for the entrance animation. Default is `ease`.
 * @cssproperty --animation-translate - Translation distance for directional animations (`fade-up`, `fade-down`, `fade-left`, `fade-right`). Default is `0.5em`.
 */
@customElement('wa-random-content')
export default class WaRandomContent extends WebAwesomeElement {
  static css = styles;

  private sequenceCursor = 0;
  private uniqueQueue: Element[] = [];
  private currentSelection = new Set<Element>();
  private intervalId: ReturnType<typeof setInterval> | undefined;

  /** Number of children to show simultaneously. Clamped to [1, childCount]. */
  @property({ type: Number }) items = 1;

  /** Auto-rotation interval in milliseconds. Set to `0` (default) to disable. */
  @property({ type: Number }) interval = 0;

  /** Selection strategy: `random` (default), `unique`, or `sequence`. */
  @property({ reflect: true }) mode: 'random' | 'unique' | 'sequence' = 'random';

  /** Entrance animation for newly shown children. */
  @property({ reflect: true }) animation: 'none' | 'fade' | 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' =
    'none';

  connectedCallback() {
    super.connectedCallback();
    this.startInterval();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.stopInterval();
  }

  @watch('interval', { waitUntilFirstUpdate: true })
  handleIntervalChange() {
    this.stopInterval();
    this.startInterval();
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

  /** Trigger a new selection using the current mode. */
  randomize() {
    const children = this.assignedChildren();
    if (!children.length) return;

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
      const pool = children.length > count ? children.filter(c => !this.currentSelection.has(c)) : children;
      selected = this.sample(pool, count);
      this.currentSelection = new Set(selected);
    }

    children.forEach(el => {
      const htmlEl = el as HTMLElement;
      const isSelected = selected.includes(el);
      htmlEl.style.display = isSelected ? '' : 'none';
      if (!isSelected) {
        delete htmlEl.dataset['waAnimation'];
      }
      // Strip bottom margin from the last shown element so hidden siblings don't
      // leave a phantom gap (e.g. <p> elements that aren't the last DOM child).
      htmlEl.style.marginBlockEnd = isSelected && selected[selected.length - 1] === el ? '0' : '';
    });

    if (this.animation !== 'none') {
      selected.forEach(el => {
        const htmlEl = el as HTMLElement;
        // CSS transforms don't apply to display:inline elements. Upgrade to inline-block
        // so directional animations work.
        if (this.animation !== 'fade' && getComputedStyle(el).display === 'inline') {
          htmlEl.style.display = 'inline-block';
        }
        // Cancel any in-progress animation so the CSS animation restarts cleanly.
        el.getAnimations().forEach(a => a.cancel());
        htmlEl.dataset['waAnimation'] = this.animation;
        htmlEl.addEventListener('animationend', () => delete htmlEl.dataset['waAnimation'], { once: true });
      });
    }
  }

  private startInterval() {
    if (this.interval > 0) {
      this.intervalId = setInterval(() => this.randomize(), this.interval);
    }
  }

  private stopInterval() {
    clearInterval(this.intervalId);
    this.intervalId = undefined;
  }

  private assignedChildren(): Element[] {
    const slot = this.shadowRoot?.querySelector('slot') as HTMLSlotElement | null;
    return slot?.assignedElements() ?? [];
  }

  // Fisher-Yates partial shuffle — picks `count` unique items from `pool`
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
    return html`<slot @slotchange=${this.handleSlotChange}></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-random-content': WaRandomContent;
  }
}
