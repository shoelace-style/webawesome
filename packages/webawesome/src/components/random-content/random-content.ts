import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { watch } from '../../internal/watch.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import styles from './random-content.styles.js';

/**
 * @summary Randomly selects and displays one or more of its slotted children.
 * @documentation https://webawesome.com/docs/components/random-content
 * @status experimental
 * @since 3.7
 *
 * @slot - The pool of children to randomize from. Unselected children are hidden with `display: none`.
 */
@customElement('wa-random-content')
export default class WaRandomContent extends WebAwesomeElement {
  static css = styles;

  private sequenceCursor = 0;
  private uniqueHistory = new Set<Element>();

  /** Number of children to show simultaneously. Clamped to [1, childCount]. */
  @property({ type: Number }) items = 1;

  /** Selection strategy: `random` (default), `unique`, or `sequence`. */
  @property({ reflect: true }) mode: 'random' | 'unique' | 'sequence' = 'random';

  @watch('mode', { waitUntilFirstUpdate: true })
  handleModeChange() {
    this.sequenceCursor = 0;
    this.uniqueHistory.clear();
    this.randomize();
  }

  @watch('items', { waitUntilFirstUpdate: true })
  handleItemsChange() {
    this.randomize();
  }

  /** Imperatively trigger a new selection using the current mode. */
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
      selected = this.sample(children, count);
    }

    children.forEach(el => {
      (el as HTMLElement).style.display = selected.includes(el) ? '' : 'none';
    });
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
