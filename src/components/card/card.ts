import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import sizeStyles from '../../styles/utilities/size.css';
import styles from './card.css';

/**
 * @summary Cards can be used to group related subjects in a container.
 * @documentation https://backers.webawesome.com/docs/components/card
 * @status stable
 * @since 2.0
 *
 * @slot - The card's main content.
 * @slot header - An optional header for the card.
 * @slot footer - An optional footer for the card.
 * @slot image - An optional image to render at the start of the card.
 *
 * @csspart image - The container that wraps the card's image.
 * @csspart header - The container that wraps the card's header.
 * @csspart body - The container that wraps the card's main content.
 * @csspart footer - The container that wraps the card's footer.
 *
 * @cssproperty --border-radius - The radius for the card's corners. Expects a single value. Defaults to `var(--wa-panel-border-radius)`.
 * @cssproperty --border-width - The width of the card's borders. Expects a single value. Defaults to `var(--wa-panel-border-width)`.
 * @cssproperty --spacing - The amount of space around and between sections of the card. Expects a single value. Defaults to `var(--wa-space)`.
 */
@customElement('wa-card')
export default class WaCard extends WebAwesomeElement {
  static shadowStyle = [sizeStyles, styles];

  /** The component's size. Will be inherited by any descendants with a `size` attribute. */
  @property({ reflect: true, initial: 'medium' }) size: 'small' | 'medium' | 'large' | 'inherit' = 'inherit';

  static SSR_SLOTS = ['image', 'header', 'footer'];

  render() {
    return html`
      <slot
        name="image"
        part="image"
        class="${classMap({ image: true, 'has-slotted': this.hasSlotted.has('image') })}"
        @slotchange=${this.slotUpdate}
      ></slot>
      <slot
        name="header"
        part="header"
        class="${classMap({ header: true, 'has-slotted': this.hasSlotted.has('header') })}"
        @slotchange=${this.slotUpdate}
      ></slot>
      <slot part="body" class="body"></slot>
      <slot
        name="footer"
        part="footer"
        class="${classMap({ footer: true, 'has-slotted': this.hasSlotted.has('footer') })}"
        @slotchange=${this.slotUpdate}
      ></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-card': WaCard;
  }
}
