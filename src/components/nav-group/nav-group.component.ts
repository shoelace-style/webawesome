import { html } from 'lit';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import styles from './nav-group.styles.js';
import type { CSSResultGroup } from 'lit';
import { when } from 'lit/directives/when.js';
import { property } from 'lit/decorators.js';
import { LocalizeController } from '../../utilities/localize.js';
import WaDetails from '../details/details.component.js';

/**
 * @summary Short summary of the component's intended use.
 * @documentation https://shoelace.style/components/nav-group
 * @status experimental
 * @since 3.0
 *
 * @slot - The default slot.
 */
export default class WaNavGroup extends WebAwesomeElement {
  static styles: CSSResultGroup = styles;

  static dependencies = {
    'wa-details': WaDetails
  }

  private readonly localize = new LocalizeController(this)

  /**
   * The label to display either as the summary for <wa-details> or above the <wa-nav-items>
   */
  @property({ reflect: true }) label = ""
  @property({ reflect: true, type: Boolean }) expandable: boolean = false

  render() {
    const isRtl = this.localize.dir() === 'rtl';

    return html`<div class="base nav-items" part="base" role="list">
      ${when(this.expandable,
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
              <slot name="label">
                ${this.label}
              </slot>
            </div>

            <slot slot="expand-icon" name="expand-icon">
              <wa-icon library="system" name=${isRtl ? 'chevron-left' : 'chevron-right'}></wa-icon>
            </slot>
            <slot slot="collapse-icon" name="collapse-icon">
              <wa-icon library="system" name=${isRtl ? 'chevron-left' : 'chevron-right'}></wa-icon>
            </slot>

            <div class="nav-items" part="nav-items">
              <slot></slot>
            </div>
          </wa-details>
        `,
        () => html`<slot></slot>`
      )}
    </div>`;
  }
}
