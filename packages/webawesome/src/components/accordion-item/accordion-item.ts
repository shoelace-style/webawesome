import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import styles from './accordion-item.styles.js';

@customElement('wa-accordion-item')
export default class WaAccordionItem extends WebAwesomeElement {
  static css = styles;
  render() {
    return html` hi`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-accordion-item': WaAccordionItem;
  }
}
