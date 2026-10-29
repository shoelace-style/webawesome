import { html, isServer } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { watch } from '../../internal/watch.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import '../timeline-item/timeline-item.js';
import type WaTimelineItem from '../timeline-item/timeline-item.js';
import styles from './timeline.styles.js';

/**
 * @summary Timelines lay out a chronological list of events, such as an order history, activity feed, or changelog.
 * @documentation https://webawesome.com/docs/components/timeline
 * @status experimental
 * @since 3.15
 *
 * @dependency wa-timeline-item
 *
 * @slot - One or more `<wa-timeline-item>` elements.
 *
 * @csspart timeline - The ordered list that lays out the items.
 *
 * @cssproperty [--gap=var(--wa-space-l)] - The space between items.
 * @cssproperty [--marker-size=1em] - The size of each item's marker. Usually set here so every item matches.
 * @cssproperty [--connector-color=var(--wa-color-neutral-fill-normal)] - The color of the connector line after a
 *  `neutral` item, which is the default. Any other `variant` colors its own connector instead.
 * @cssproperty [--connector-width=var(--wa-border-width-m)] - The thickness of the connector line, in either
 *  orientation.
 * @cssproperty [--connector-gap=0.35em] - The gap between a marker's edge and the connector line. Use a length such
 *  as `0px`, not a bare `0`, to remove it.
 *
 * @ssr - During SSR, `<wa-timeline>` can't reach its items, so server-rendered markup uses the default vertical layout
 *  and document order. `orientation`, `marker-placement`, `marker-alignment`, and `reverse` apply once it hydrates.
 */
@customElement('wa-timeline')
export default class WaTimeline extends WebAwesomeElement {
  static css = [styles];

  private mutationObserver?: MutationObserver;

  /** The timeline's layout direction. */
  @property({ reflect: true }) orientation: 'horizontal' | 'vertical' = 'vertical';

  /**
   * Which side of the rail each marker sits on. `start` and `end` put every marker on that edge; `alternate` flips
   * every other item so the rail runs down the middle. Only applies when `orientation` is `vertical`.
   */
  @property({ attribute: 'marker-placement', reflect: true }) markerPlacement: 'start' | 'end' | 'alternate' = 'start';

  /**
   * Where the marker sits along its item. `start` lines it up with the first line of text. `center` centers it on the
   * item's full height and runs the connector behind it as one line, which suits cards. Only applies when
   * `orientation` is `vertical`.
   */
  @property({ attribute: 'marker-alignment', reflect: true }) markerAlignment: 'start' | 'center' = 'start';

  /**
   * Shows the last item first without changing document order, so `append()` adds at the top and reading and focus
   * order still match the screen. Server-rendered timelines show document order until they hydrate.
   */
  @property({ type: Boolean, reflect: true }) reverse = false;

  /** Slotted item count. A reversed timeline renders one named slot per item, last to first. */
  @state() private itemCount = 0;

  connectedCallback() {
    super.connectedCallback();

    // SSR guard: MutationObserver isn't available during server-side rendering.
    if (isServer) return;

    // After the first update...
    this.updateComplete.then(() => {
      this.syncItems();

      // Resync when an item's variant changes. subtree also sees content inside items and nested timelines, so only
      // react to direct children.
      this.mutationObserver = new MutationObserver(mutations => {
        const isOwnMutation = mutations.some(mutation => (mutation.target as Element).parentElement === this);
        if (isOwnMutation) this.syncItems();
      });
      this.mutationObserver.observe(this, { attributes: true, attributeFilter: ['variant'], subtree: true });
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.mutationObserver?.disconnect();
  }

  private handleSlotChange() {
    this.syncItems();
  }

  // Reads the light DOM, not the default slot: a reversed timeline moves every item into a named slot.
  private getAllItems() {
    return [...this.children].filter(el => el.localName === 'wa-timeline-item') as WaTimelineItem[];
  }

  /**
   * Hands each item its layout as `data-wa-timeline-*` attributes.
   * A reversed timeline can't reorder its light DOM, so each item also gets a numbered slot rendered last to first,
   * which keeps reading and focus order matching the screen. Each item also learns the previous item's variant for
   * its centered connector.
   */
  private syncItems() {
    const items = this.getAllItems();
    const isVertical = this.orientation !== 'horizontal';

    items.forEach((item, index) => {
      let placement = '';
      if (isVertical && this.markerPlacement === 'end') placement = 'end';
      if (isVertical && this.markerPlacement === 'alternate')
        placement = index % 2 === 0 ? 'alternate-start' : 'alternate-end';

      item.toggleAttribute('data-wa-timeline-horizontal', !isVertical);
      item.toggleAttribute('data-wa-timeline-center', isVertical && this.markerAlignment === 'center');
      item.toggleAttribute('data-wa-timeline-reverse', this.reverse);
      if (placement) {
        item.setAttribute('data-wa-timeline-placement', placement);
      } else {
        item.removeAttribute('data-wa-timeline-placement');
      }

      if (this.reverse) {
        item.setAttribute('slot', `item-${index}`);
      } else if (item.getAttribute('slot')?.startsWith('item-')) {
        item.removeAttribute('slot');
      }

      // An attribute, not a property: a property set before the item hydrates never reaches its template, but an
      // attribute is real DOM either way.
      const previous = this.reverse ? items[index + 1] : items[index - 1];
      if (previous) {
        item.setAttribute('data-wa-timeline-previous-variant', previous.variant);
      } else {
        item.removeAttribute('data-wa-timeline-previous-variant');
      }
    });

    this.itemCount = this.reverse ? items.length : 0;
  }

  @watch(['orientation', 'markerPlacement', 'markerAlignment', 'reverse'], {
    waitUntilFirstUpdate: true,
  })
  handleLayoutChange() {
    this.syncItems();
  }

  render() {
    const reversedSlots = Array.from({ length: this.itemCount }, (_, i) => this.itemCount - 1 - i);

    // slotchange bubbles, so listening on the list catches it from the default slot and every numbered slot alike.
    return html`
      <ol part="timeline" class="timeline" role="list" @slotchange=${this.handleSlotChange}>
        ${reversedSlots.map(index => html`<slot name="item-${index}"></slot>`)}
        <slot></slot>
      </ol>
    `;
  }
}

// The change-in-update warning is required for this component because syncItems() sets the itemCount state from
// slotchange after first render, including the synthetic slotchange WebAwesomeElement dispatches post-hydration to
// work around SSR not being able to catch real slotchange events. See
// https://lit.dev/docs/tools/development/#development-build-runtime-warnings
WaTimeline.disableWarning?.('change-in-update');

declare global {
  interface HTMLElementTagNameMap {
    'wa-timeline': WaTimeline;
  }
}
