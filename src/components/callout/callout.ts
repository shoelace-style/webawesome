import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import styles from './callout.css';

/**
 * @summary Callouts are used to display important messages inline.
 * @documentation https://backers.webawesome.com/docs/components/callout
 * @status stable
 * @since 2.0
 *
 * @slot - The callout's main content.
 * @slot icon - An icon to show in the callout. Works best with `<wa-icon>`.
 *
 * @csspart icon - The container that wraps the optional icon.
 * @csspart message - The container that wraps the callout's main content.
 *
 * @cssproperty --icon-color - The color of the callout's icon.
 * @cssproperty --icon-size - The size of the callout's icon.
 * @cssproperty --spacing - The amount of space around and between the callout's content. Expects a single value. If you want different spacing around and between the content, use `padding` on the callout itself.
 */
@customElement('wa-callout')
export default class WaCallout extends WebAwesomeElement {
  static shadowStyle = styles;

  /** The callout's theme variant. */
  @property({ reflect: true }) variant: 'brand' | 'success' | 'neutral' | 'warning' | 'danger' = 'brand';

  render() {
    return html`
      <div part="icon">
        <slot name="icon"></slot>
      </div>

      <div part="message">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-callout': WaCallout;
  }
}
