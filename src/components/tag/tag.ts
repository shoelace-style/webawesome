import '../icon-button/icon-button.js';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property } from 'lit/decorators.js';
import { html } from 'lit';
import { LocalizeController } from '../../utilities/localize.js';
import { WaRemoveEvent } from '../../events/remove.js';
import styles from './tag.css';
import WebAwesomeElement from '../../internal/webawesome-element.js';

/**
 * @summary Tags are used as labels to organize things or to indicate a selection.
 * @documentation https://backers.webawesome.com/docs/components/tag
 * @status stable
 * @since 2.0
 *
 * @dependency wa-icon-button
 *
 * @slot - The tag's content.
 *
 * @event wa-remove - Emitted when the remove button is activated.
 *
 * @csspart base - The component's base wrapper.
 * @csspart content - The tag's content.
 * @csspart remove-button - The tag's remove button, an `<wa-icon-button>`.
 * @csspart remove-button__base - The remove button's exported `base` part.
 *
 * @cssproperty --background-color - The tag's background color.
 * @cssproperty --border-color - The color of the tag's border.
 * @cssproperty --border-radius - The radius of the tag's corners.
 * @cssproperty --border-style - The style of the tag's border.
 * @cssproperty --border-width - The width of the tag's border.
 * @cssproperty --content-color - The color of the tag's content.
 */
@customElement('wa-tag')
export default class WaTag extends WebAwesomeElement {
  static shadowStyle = styles;

  private readonly localize = new LocalizeController(this);

  /** The tag's theme variant. */
  @property({ reflect: true }) variant: 'brand' | 'success' | 'neutral' | 'warning' | 'danger' | 'text' = 'neutral';

  /** The tag's size. */
  @property({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';

  /** Draws a pill-style tag with rounded edges. */
  @property({ type: Boolean, reflect: true }) pill = false;

  /** Makes the tag removable and shows a remove button. */
  @property({ type: Boolean }) removable = false;

  private handleRemoveClick() {
    this.dispatchEvent(new WaRemoveEvent());
  }

  render() {
    return html`
      <span
        part="base"
        class=${classMap({
          tag: true,

          // Types
          'tag--brand': this.variant === 'brand',
          'tag--success': this.variant === 'success',
          'tag--neutral': this.variant === 'neutral',
          'tag--warning': this.variant === 'warning',
          'tag--danger': this.variant === 'danger',
          'tag--text': this.variant === 'text',

          // Sizes
          'tag--small': this.size === 'small',
          'tag--medium': this.size === 'medium',
          'tag--large': this.size === 'large',

          // Modifiers
          'tag--pill': this.pill,
          'tag--removable': this.removable
        })}
      >
        <slot part="content" class="tag__content"></slot>

        ${this.removable
          ? html`
              <wa-icon-button
                part="remove-button"
                exportparts="base:remove-button__base"
                name="xmark"
                library="system"
                variant="solid"
                label=${this.localize.term('remove')}
                class="tag__remove"
                @click=${this.handleRemoveClick}
                tabindex="-1"
              ></wa-icon-button>
            `
          : ''}
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-tag': WaTag;
  }
}
