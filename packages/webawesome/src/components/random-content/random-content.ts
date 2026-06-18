import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { parseDuration } from '../../internal/animate.js';
import { watch } from '../../internal/watch.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import styles from './random-content.styles.js';

/**
 * @summary Random content selects one or more child elements at random and displays them.
 * @documentation https://webawesome.com/docs/components/random-content
 * @status experimental
 * @since 3.8
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
  private uniqueHistory = new Set<Element>();
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
    this.uniqueHistory.clear();
    this.currentSelection.clear();
    this.randomize();
  }

  @watch('items', { waitUntilFirstUpdate: true })
  handleItemsChange() {
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
      let pool = children.filter(c => !this.uniqueHistory.has(c));
      if (pool.length < count) {
        this.uniqueHistory.clear();
        pool = [...children];
      }
      selected = this.sample(pool, count);
      selected.forEach(el => this.uniqueHistory.add(el));
    } else {
      const pool = children.length > count ? children.filter(c => !this.currentSelection.has(c)) : children;
      selected = this.sample(pool, count);
      this.currentSelection = new Set(selected);
    }

    children.forEach(el => {
      const htmlEl = el as HTMLElement;
      const isSelected = selected.includes(el);
      htmlEl.style.display = isSelected ? '' : 'none';
      // Strip bottom margin from the last shown element so hidden siblings don't
      // leave a phantom gap (e.g. <p> elements that aren't the last DOM child).
      htmlEl.style.marginBlockEnd = isSelected && selected[selected.length - 1] === el ? '0' : '';
    });

    if (this.animation !== 'none') {
      const cs = getComputedStyle(this);
      const duration = parseDuration(cs.getPropertyValue('--animation-duration').trim()) || 300;
      const easing = cs.getPropertyValue('--animation-easing').trim() || 'ease';
      const translate = cs.getPropertyValue('--animation-translate').trim() || '0.5em';
      const from: Keyframe = { opacity: 0 };
      const to: Keyframe = { opacity: 1 };
      const isDirectional = this.animation !== 'fade';
      if (this.animation === 'fade-up') {
        from.transform = `translateY(${translate})`;
        to.transform = 'translateY(0)';
      }
      if (this.animation === 'fade-down') {
        from.transform = `translateY(-${translate})`;
        to.transform = 'translateY(0)';
      }
      if (this.animation === 'fade-left') {
        from.transform = `translateX(${translate})`;
        to.transform = 'translateX(0)';
      }
      if (this.animation === 'fade-right') {
        from.transform = `translateX(-${translate})`;
        to.transform = 'translateX(0)';
      }
      selected.forEach(el => {
        // CSS transforms don't apply to display:inline elements. Upgrade to inline-block
        // so directional animations work.
        if (isDirectional && getComputedStyle(el).display === 'inline') {
          (el as HTMLElement).style.display = 'inline-block';
        }
        el.animate([from, to], { duration, easing });
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
