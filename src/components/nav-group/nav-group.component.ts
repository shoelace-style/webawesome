import { html } from 'lit';
import { LocalizeController } from '../../utilities/localize.js';
import { property } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import styles from './nav-group.styles.js';
import WaDetails from '../details/details.component.js';
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

  static dependencies = {
    'wa-details': WaDetails
  };

  private readonly localize = new LocalizeController(this);

  /**
   * The text to display in the summary of the `<wa-details>` element when the nav group is expandable.
   */
  @property({ reflect: true }) summary = '';

  /**
   * The label to display above the nav items slotted in.
   */
  @property({ reflect: true }) heading = '';

  /**
   * If true, will add a `<wa-details>` element into the shadowRoot that you can slot `<wa-nav-items>` into.
   */
  @property({ reflect: true, type: Boolean }) expandable: boolean = false;

  render() {
    const isRtl = this.localize.dir() === 'rtl';

    return html` <div part="base" class="base">
      <p id="heading" part="heading" class="heading">
        <slot name="heading">${this.heading}</slot>
      </p>

      ${when(
        this.expandable,
        () => html`
          <wa-details
            class="details"
            part="details"
            exportparts="
                base:details__base,
                header:details__header,
                summary:details__summary,
                summary-icon:details__summary-icon,
                content:details__content
              "
          >
            <div slot="summary">
              <slot name="summary"> ${this.summary} </slot>
            </div>

            <slot slot="expand-icon" name="expand-icon">
              <wa-icon library="system" name=${isRtl ? 'chevron-left' : 'chevron-right'}></wa-icon>
            </slot>
            <slot slot="collapse-icon" name="collapse-icon">
              <wa-icon library="system" name=${isRtl ? 'chevron-left' : 'chevron-right'}></wa-icon>
            </slot>

            <div class="nav-items" part="nav-items" aria-labelledby="heading" role="list">
              <slot></slot>
            </div>
          </wa-details>
        `,
        () => html`
          <div class="nav-items" part="nav-items" aria-labelledby="heading" role="list">
            <slot></slot>
          </div>
        `
      )}
    </div>`;
  }
}
