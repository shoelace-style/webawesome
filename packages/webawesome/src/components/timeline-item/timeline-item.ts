import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { HasSlotController } from '../../internal/slot.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import variantStyles from '../../styles/component/variants.styles.js';
import styles from './timeline-item.styles.js';

/**
 * @summary Timeline items represent a single, dated entry inside a `<wa-timeline>`, such as one event in an order
 *  history or activity feed.
 * @documentation https://webawesome.com/docs/components/timeline-item
 * @status experimental
 * @since 3.15
 *
 * @slot - The item's main content, such as a title and description.
 * @slot opposite - Optional content shown on the opposite side of the rail from the main content, commonly a date or
 *  timestamp, such as a `<wa-format-date>` or `<wa-relative-time>`.
 * @slot icon - An element, such as `<wa-icon>` or `<wa-avatar>`, that replaces the default dot in the marker.
 *
 * @csspart timeline-item - The component's outer wrapper.
 * @csspart marker - The circular marker that marks the item's position on the timeline.
 * @csspart connector - The line connecting this item to the next one.
 * @csspart content - The wrapper around the default slot.
 * @csspart opposite - The wrapper around the `opposite` slot.
 *
 * @cssproperty --marker-size - The size of the item's marker. Inherited from `<wa-timeline>`; set it here to make one
 *  item stand out.
 * @cssproperty --connector-color - The color of the connector that follows this item when its `variant` is `neutral`.
 *  Inherited from `<wa-timeline>`.
 * @cssproperty --connector-width - The thickness of the connector that follows this item. Inherited from
 *  `<wa-timeline>`; set it here to make one item's connector stand out.
 * @cssproperty --connector-gap - The gap between this item's marker and its connector. Inherited from `<wa-timeline>`.
 *  Use a length such as `0px`, not a bare `0`, to remove it.
 */
@customElement('wa-timeline-item')
export default class WaTimelineItem extends WebAwesomeElement {
  static css = [variantStyles, styles];

  private readonly hasSlotController = new HasSlotController(this, 'opposite');

  /**
   * Colors the item's marker and the connector after it. The color is cosmetic; pair it with an icon and a clear label
   * when an entry needs to read as failed or flagged.
   */
  @property({ reflect: true }) variant: 'neutral' | 'brand' | 'success' | 'warning' | 'danger' = 'neutral';

  /**
   * Only required for SSR. Set to `true` if you're slotting in an `opposite` element, so the server-rendered markup
   * includes it before the component hydrates on the client.
   */
  @property({ type: Boolean, attribute: 'with-opposite' }) withOpposite = false;

  @property({ reflect: true }) role = 'listitem';

  render() {
    const hasOpposite = this.hasSlotController.test('opposite', 'withOpposite');

    return html`
      <div part="timeline-item" class="item">
        <span part="opposite" class="opposite" ?hidden=${!hasOpposite}>
          <slot name="opposite"></slot>
        </span>
        <span class="rail">
          <span part="marker" class="marker">
            <slot name="icon"></slot>
          </span>
          <span part="connector" class="connector"></span>
        </span>
        <span part="content" class="content">
          <slot></slot>
        </span>
      </div>
    `;
  }
}

// The change-in-update warning is required for this component because HasSlotController calls requestUpdate() in
// response to slotchange events after first render, including the synthetic slotchange WebAwesomeElement dispatches
// post-hydration to work around SSR not being able to catch real slotchange events. See
// https://lit.dev/docs/tools/development/#development-build-runtime-warnings
WaTimelineItem.disableWarning?.('change-in-update');

declare global {
  interface HTMLElementTagNameMap {
    'wa-timeline-item': WaTimelineItem;
  }
}
