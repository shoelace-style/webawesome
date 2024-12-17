import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
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
 * @csspart base - The component's base wrapper.
 * @csspart image - The container that wraps the card's image.
 * @csspart header - The container that wraps the card's header.
 * @csspart body - The container that wraps the card's main content.
 * @csspart footer - The container that wraps the card's footer.
 *
 * @cssproperty --background-color - The card's background color.
 * @cssproperty --border-color - The card's border color, including borders that occur inside the card.
 * @cssproperty --border-radius - The radius for the card's corners. Expects a single value.
 * @cssproperty --border-style - The style of the card's borders.
 * @cssproperty --border-width - The width of the card's borders. Expects a single value.
 * @cssproperty --box-shadow - The shadow effects around the edges of the card.
 * @cssproperty --spacing - The amount of space around and between sections of the card. Expects a single value.
 */
@customElement('wa-card')
export default class WaCard extends WebAwesomeElement {
  static shadowStyle = styles;

  /** Renders the card with a header */
  @property({ attribute: 'with-header', type: Boolean }) withHeader = false;

  /** Renders the card with an image */
  @property({ attribute: 'with-image', type: Boolean }) withImage = false;

  /** Renders the card with a footer */
  @property({ attribute: 'with-footer', type: Boolean }) withFooter = false;

  render() {
    return html`
      <div
        part="base"
        class=${classMap({
          card: true,
          'card--has-footer': this.withFooter,
          'card--has-image': this.withImage,
          'card--has-header': this.withHeader,
        })}
      >
        <slot name="image" part="image" class="card__image"></slot>
        <slot name="header" part="header" class="card__header"></slot>
        <slot part="body" class="card__body"></slot>
        <slot name="footer" part="footer" class="card__footer"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-card': WaCard;
  }
}
