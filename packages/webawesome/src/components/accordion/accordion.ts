import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
// import type WaAccordionItem from '../accordion-item/accordion-item.js';
import styles from './accordion.styles.js';

@customElement('wa-accordion')
export default class WaAccordion extends WebAwesomeElement {
  static css = styles;
  render() {
    return html` hi `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-accordion': WaAccordion;
  }
}
