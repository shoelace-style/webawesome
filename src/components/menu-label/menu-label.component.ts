import { html } from 'lit';
import styles from './menu-label.styles.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import type { CSSResultGroup } from 'lit';

/**
 * @summary Menu labels are used to describe a group of menu items.
 * @documentation https://shoelace.style/components/menu-label
 * @status stable
 * @since 2.0
 *
 * @slot - The menu label's content.
 *
 * @csspart base - The component's base wrapper.
 */
export default class WaMenuLabel extends WebAwesomeElement {
  static styles: CSSResultGroup = styles;

  render() {
    return html` <slot part="base" class="menu-label"></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-menu-label': WaMenuLabel;
  }
}
