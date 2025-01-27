import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
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
 * @cssproperty --spacing - The amount of space around and between sections of the card. Expects a single value.
 */
@customElement('wa-card')
export default class WaCard extends WebAwesomeElement {
  static shadowStyle = styles;

  /** Renders the card with a header. Only needed for SSR, otherwise is automatically added. */
  @property({ attribute: 'with-header', type: Boolean }) withHeader = false;

  /** Renders the card with an image. Only needed for SSR, otherwise is automatically added. */
  @property({ attribute: 'with-image', type: Boolean }) withImage = false;

  /** Renders the card with a footer. Only needed for SSR, otherwise is automatically added. */
  @property({ attribute: 'with-footer', type: Boolean }) withFooter = false;

  render() {
    return html`
      <slot name="image" part="image" class="image"></slot>
      <slot name="header" part="header" class="header"></slot>
      <slot part="body" class="body"></slot>
      <slot name="footer" part="footer" class="footer"></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-card': WaCard;
  }
}
