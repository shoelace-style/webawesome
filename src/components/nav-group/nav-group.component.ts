import { html } from 'lit';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import styles from './nav-group.styles.js';
import type { CSSResultGroup } from 'lit';
import { when } from 'lit/directives/when.js';
import { property } from 'lit/decorators.js';
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

  /**
   * The label to display either as the summary for <wa-details> or above the <wa-nav-items>
   */
  @property({ reflect: true }) label = ""
  @property({ reflect: true, type: Boolean }) expandable: boolean = false

  render() {
    return html`<div class="base" part="base" role="list">
      ${when(this.expandable,
        () => html`
          <wa-details>
            <div slot="summary">
              <slot name="label">
                ${this.label}
              </slot>
            </div>

            <slot></slot>
          </wa-details>
        `,
        () => html`<slot></slot>`
      )}
    </div>`;
  }
}
