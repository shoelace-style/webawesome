import { customElement } from 'lit/decorators.js';
import { html } from 'lit';
import styles from './carousel-item.css';
import WebAwesomeElement from '../../internal/webawesome-element.js';

/**
 * @summary A carousel item represent a slide within a [carousel](/docs/components/carousel).
 *
 * @since 2.0
 * @status experimental
 *
 * @slot - The carousel item's content..
 *
 * @cssproperty --aspect-ratio - The slide's aspect ratio. Inherited from the carousel by default.
 *
 */
@customElement('wa-carousel-item')
export default class WaCarouselItem extends WebAwesomeElement {
  static shadowStyle = styles;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'group');
  }

  render() {
    return html` <slot></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-carousel-item': WaCarouselItem;
  }
}
