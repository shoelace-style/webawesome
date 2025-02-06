import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { HasSlotController } from '../../internal/slot.js';
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
 * @cssproperty [--border-radius=var(--wa-panel-border-radius)] - The radius for the card's corners. Expects a single value.
 * @cssproperty [--border-color=var(--wa-color-surface-border)] - The color of the card's borders, including inner borders. Expects a single value.
 * @cssproperty [--border-width=var(--wa-panel-border-width)] - The width of the card's borders. Expects a single value.
 * @cssproperty [--spacing=var(--wa-space)] - The amount of space around and between sections of the card. Expects a single value.
 */
@customElement('wa-card')
export default class WaCard extends WebAwesomeElement {
  static shadowStyle = [sizeStyles, styles];

  private readonly hasSlotController = new HasSlotController(this, 'footer', 'header', 'image');

  /** The component's size. Will be inherited by any descendants with a `size` attribute. */
  @property({ reflect: true, initial: 'medium' }) size: 'small' | 'medium' | 'large' | 'inherit' = 'inherit';

  /** Renders the card with a header. Only needed for SSR, otherwise is automatically added. */
  @property({ attribute: 'with-header', type: Boolean, reflect: true }) withHeader = false;

  /** Renders the card with an image. Only needed for SSR, otherwise is automatically added. */
  @property({ attribute: 'with-image', type: Boolean, reflect: true }) withImage = false;

  /** Renders the card with a footer. Only needed for SSR, otherwise is automatically added. */
  @property({ attribute: 'with-footer', type: Boolean, reflect: true }) withFooter = false;

  updated() {
    // Enable the respective slots when detected
    if (!this.withHeader && this.hasSlotController.test('header')) this.withHeader = true;
    if (!this.withImage && this.hasSlotController.test('image')) this.withImage = true;
    if (!this.withFooter && this.hasSlotController.test('footer')) this.withFooter = true;
  }

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
