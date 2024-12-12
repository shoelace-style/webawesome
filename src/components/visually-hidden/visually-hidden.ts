import { customElement } from 'lit/decorators.js';
import { html } from 'lit';
import styles from './visually-hidden.css';
import WebAwesomeElement from '../../internal/webawesome-element.js';

/**
 * @summary The visually hidden utility makes content accessible to assistive devices without displaying it on the screen.
 * @documentation https://backers.webawesome.com/docs/components/visually-hidden
 * @status stable
 * @since 2.0
 *
 * @slot - The content to be visually hidden.
 */
@customElement('wa-visually-hidden')
export default class WaVisuallyHidden extends WebAwesomeElement {
  static shadowStyle = styles;

  render() {
    return html` <slot></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-visually-hidden': WaVisuallyHidden;
  }
}
