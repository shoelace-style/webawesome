import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { HasSlotController } from '../../internal/slot.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import sizeStyles from '../../styles/utilities/size.css';
import styles from './card.css';

/**
 * @summary Cards can be used to group related subjects in a container.
 * @documentation https://webawesome.com/docs/components/card
 * @status stable
 * @since 2.0
 *
 * @slot - The card's main content.
 * @slot header - An optional header for the card.
 * @slot footer - An optional footer for the card.
 * @slot media - An optional media section to render at the start of the card.
 *
 * @csspart media - The container that wraps the card's media.
 * @csspart header - The container that wraps the card's header.
 * @csspart body - The container that wraps the card's main content.
 * @csspart footer - The container that wraps the card's footer.
 *
 * @cssproperty [--spacing=var(--wa-space-l)] - The amount of space around and between sections of the card. Expects a single value.
 */
@customElement('wa-card')
export default class WaCard extends WebAwesomeElement {
  static css = [sizeStyles, styles];

  private readonly hasSlotController = new HasSlotController(this, 'footer', 'header', 'media');

  /** The card's visual appearance. */
  @property({ reflect: true })
  appearance: 'accent' | 'filled' | 'outlined' | 'plain' = 'outlined';

  /** Renders the card with a header. Only needed for SSR, otherwise is automatically added. */
  @property({ attribute: 'with-header', type: Boolean, reflect: true }) withHeader = false;

  /** Renders the card with an image. Only needed for SSR, otherwise is automatically added. */
  @property({ attribute: 'with-media', type: Boolean, reflect: true }) withMedia = false;

  /** Renders the card with a footer. Only needed for SSR, otherwise is automatically added. */
  @property({ attribute: 'with-footer', type: Boolean, reflect: true }) withFooter = false;

  updated() {
    // Enable the respective slots when detected
    if (!this.withHeader && this.hasSlotController.test('header')) this.withHeader = true;
    if (!this.withMedia && this.hasSlotController.test('media')) this.withMedia = true;
    if (!this.withFooter && this.hasSlotController.test('footer')) this.withFooter = true;
  }

  render() {
    return html`
      <slot name="media" part="media" class="media"></slot>
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
