import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import sizeStyles from '../../styles/utilities/size.css';
import variantStyles from '../../styles/utilities/variants.css';
import styles from './callout.css';

/**
 * @summary Callouts are used to display important messages inline.
 * @documentation https://webawesome.com/docs/components/callout
 * @status stable
 * @since 2.0
 *
 * @slot - The callout's main content.
 * @slot icon - An icon to show in the callout. Works best with `<wa-icon>`.
 * @slot action - A callout action to show in the callout. Works best with `<biskin-button>`.
 *
 * @csspart icon - The container that wraps the optional icon.
 * @csspart message - The container that wraps the callout's main content.
 * @csspart action - The container that wraps the optional action.
 *
 * @cssproperty --icon-color - The color of the callout's icon.
 * @cssproperty --icon-size - The size of the callout's icon.
 */
@customElement('wa-callout')
export default class WaCallout extends WebAwesomeElement {
  static css = [styles, variantStyles, sizeStyles];

  /** The callout's theme variant. Defaults to `brand` if not within another element with a variant. */
  @property({ reflect: true }) variant: 'brand' | 'neutral' | 'success' | 'warning' | 'danger' = 'brand';

  /** The callout's visual appearance. */
  @property({ reflect: true }) appearance: 'accent' | 'filled' | 'outlined' | 'plain' | 'outlined filled' =
    'outlined filled';

  /** The callout's size. */
  @property({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';

  render() {
    return html`
      <div part="icon">
        <slot name="icon"></slot>
      </div>

      <div part="message">
        <slot></slot>
      </div>

      <div part="action">
        <slot name="action"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-callout': WaCallout;
  }
}
