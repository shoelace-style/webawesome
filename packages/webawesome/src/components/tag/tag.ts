import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { WaRemoveEvent } from '../../events/remove.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import appearanceStyles from '../../styles/utilities/appearance.css';
import sizeStyles from '../../styles/utilities/size.css';
import variantStyles from '../../styles/utilities/variants.css';
import { LocalizeController } from '../../utilities/localize.js';
import '../button/button.js';
import styles from './tag.css';

/**
 * @summary Tags are used as labels to organize things or to indicate a selection.
 * @documentation https://backers.webawesome.com/docs/components/tag
 * @status stable
 * @since 2.0
 *
 * @dependency wa-button
 *
 * @slot - The tag's content.
 *
 * @event wa-remove - Emitted when the remove button is activated.
 *
 * @csspart base - The component's base wrapper.
 * @csspart content - The tag's content.
 * @csspart remove-button - The tag's remove button, a `<wa-button>`.
 * @csspart remove-button__base - The remove button's exported `base` part.
 */
@customElement('wa-tag')
export default class WaTag extends WebAwesomeElement {
  static css = [sizeStyles, variantStyles, appearanceStyles, styles];

  private readonly localize = new LocalizeController(this);

  /** The tag's theme variant. Defaults to `neutral` if not within another element with a variant. */
  @property({ reflect: true }) variant: 'brand' | 'neutral' | 'success' | 'warning' | 'danger' = 'neutral';

  /** The tag's visual appearance. */
  @property({ reflect: true }) appearance: 'accent' | 'outlined accent' | 'filled' | 'outlined' | 'outlined filled' =
    'outlined filled';

  /** The tag's size. */
  @property({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';

  /** Draws a pill-style tag with rounded edges. */
  @property({ type: Boolean, reflect: true }) pill = false;

  /** Makes the tag removable and shows a remove button. */
  @property({ attribute: 'with-remove', type: Boolean }) withRemove = false;

  private handleRemoveClick() {
    this.dispatchEvent(new WaRemoveEvent());
  }

  render() {
    return html`
      <slot part="content" class="content"></slot>

      ${this.withRemove
        ? html`
            <wa-button
              part="remove-button"
              exportparts="base:remove-button__base"
              class="remove"
              appearance="plain"
              @click=${this.handleRemoveClick}
              tabindex="-1"
            >
              <wa-icon name="xmark" library="system" variant="solid" label=${this.localize.term('remove')}></wa-icon>
            </wa-button>
          `
        : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-tag': WaTag;
  }
}
