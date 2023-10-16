import { html } from 'lit';
import { property } from 'lit/decorators.js';
import styles from './nav-group.styles.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import type { CSSResultGroup } from 'lit';

/**
 * @summary A nav group is a way of grouping `<wa-nav-item>`s together.
 * @documentation https://shoelace.style/components/nav-group
 * @status experimental
 * @since 3.0
 *
 * @csspart base - The base wrapper div around the content
 * @csspart nav-items - The wrapper around the default slot where nav items are placed.
 * @csspart details - When `<wa-nav-group>` is expandable, wraps the nav-items in a `<wa-details>`.
 * @csspart details__base - Maps to the `wa-details::part(base)`
 * @csspart details__header - Maps to the `wa-details::part(header)`
 * @csspart details__summary - Maps to the `wa-details::part(summary)`
 * @csspart details__summary-icon - Maps to the `wa-details::part(summary-icon)`
 * @csspart details__content - Maps to the `wa-details::part(content)`
 *
 * @slot - The default slot where `<wa-nav-item>`s are placed.
 * @slot heading - Displayed above the nav items.
 * @slot summary - Displayed inside the `<wa-details>` element.
 * @slot expand-icon - The expand icon for `<wa-details>`.
 * @slot collapse-icon - The collapse icon for `<wa-details>`.
 *
 */
export default class WaNavGroup extends WebAwesomeElement {
  static styles: CSSResultGroup = styles;

  /**
   * The label to display above the nav items slotted in.
   */
  @property({ reflect: true }) label = '';

  render() {
    return html`
      <div part="base" class="base" role="navigation" aria-labelledby="label">
        <p id="label" part="label" class="label">
          <slot name="label">${this.label}</slot>
        </p>

        <div class="nav-items" part="nav-items" aria-labelledby="label" role="list">
          <slot></slot>
        </div>
      </div>
    `;
  }
}
