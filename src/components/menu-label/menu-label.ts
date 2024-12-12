import { customElement } from 'lit/decorators.js';
import { html } from 'lit';
import styles from './menu-label.css';
import WebAwesomeElement from '../../internal/webawesome-element.js';

/**
 * @summary Menu labels are used to describe a group of menu items.
 * @documentation https://backers.webawesome.com/docs/components/menu-label
 * @status stable
 * @since 2.0
 *
 * @slot - The menu label's content.
 *
 * @csspart base - The component's base wrapper.
 */
@customElement('wa-menu-label')
export default class WaMenuLabel extends WebAwesomeElement {
  static shadowStyle = styles;

  render() {
    return html` <slot part="base" class="menu-label"></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-menu-label': WaMenuLabel;
  }
}
