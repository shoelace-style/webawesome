import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { html } from 'lit/static-html.js';
import { WaBlurEvent } from '../../events/blur.js';
import { WaFocusEvent } from '../../events/focus.js';
import { HasSlotController } from '../../internal/slot.js';
import { watch } from '../../internal/watch.js';
import { WebAwesomeFormAssociatedElement } from '../../internal/webawesome-element.js';
import nativeStyles from '../../styles/native/button.css';
import sizeStyles from '../../styles/utilities/size.css';
import variantStyles from '../../styles/utilities/variants.css';
import buttonStyles from '../button/button.css';
import styles from './radio-button.css';

/**
 * @summary Radios buttons allow the user to select a single option from a group using a button-like control.
 * @documentation https://backers.webawesome.com/docs/components/radio-button
 * @status stable
 * @since 2.0
 *
 * @slot - The radio button's label.
 * @slot prefix - A presentational prefix icon or similar element.
 * @slot suffix - A presentational suffix icon or similar element.
 *
 * @event wa-blur - Emitted when the button loses focus.
 * @event wa-focus - Emitted when the button gains focus.
 *
 * @cssproperty --background-color - The button's background color.
 * @cssproperty --background-color-active - The button's background color when active.
 * @cssproperty --background-color-hover - The button's background color on hover.
 * @cssproperty --border-color - The color of the button's border.
 * @cssproperty --border-color-active - The color of the button's border when active.
 * @cssproperty --border-color-hover - The color of the button's border on hover.
 * @cssproperty --border-radius - The radius of the button's corners.
 * @cssproperty --border-style - The style of the button's border.
 * @cssproperty --border-width - The width of the button's border. Expects a single value.
 * @cssproperty --box-shadow - The shadow effects around the edges of the button.
 * @cssproperty --indicator-color - The color of the checked button indicator.
 * @cssproperty --indicator-width - The width of the checked button indicator.
 * @cssproperty --text-color - The color of the button's label.
 * @cssproperty --text-color-active - The color of the button's label when active.
 * @cssproperty --text-color-hover - The color of the button's label on hover.
 *
 * @csspart base - The internal `<button>` element.
 * @csspart checked - The internal button element when the radio button is checked.
 * @csspart prefix - The container that wraps the prefix.
 * @csspart label - The container that wraps the radio button's label.
 * @csspart suffix - The container that wraps the suffix.
 */
@customElement('wa-radio-button')
export default class WaRadioButton extends WebAwesomeFormAssociatedElement {
  static shadowStyle = [variantStyles, sizeStyles, nativeStyles, buttonStyles, styles];

  private readonly hasSlotController = new HasSlotController(this, '[default]', 'prefix', 'suffix');

  @query('button') input: HTMLButtonElement;
  @query('.hidden-input') hiddenInput: HTMLInputElement;

  @state() protected hasFocus = false;

  /**
   * @internal The radio button's checked state. This is exposed as an "internal" attribute so we can reflect it, making
   * it easier to style in button groups.
   */
  @property({ type: Boolean, reflect: true }) checked = false;

  /** The radio's value. When selected, the radio group will receive this value. */
  @property({ reflect: true }) value: string;

  /** Disables the radio button. */
  @property({ type: Boolean }) disabled = false;

  /**
   * The radio button's size. When used inside a radio group, the size will be determined by the radio group's size so
   * this attribute can typically be omitted.
   */
  @property({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';

  /** Draws a pill-style radio button with rounded edges. */
  @property({ type: Boolean, reflect: true }) pill = false;

  /**
   * The string pointing to a form's id.
   */
  @property({ reflect: true }) form: string | null = null;

  /**
   * Used for SSR. if true, will show slotted prefix on initial render.
   */
  @property({ type: Boolean, attribute: 'with-prefix' }) withPrefix = false;

  /**
   * Used for SSR. if true, will show slotted suffix on initial render.
   */
  @property({ type: Boolean, attribute: 'with-suffix' }) withSuffix = false;

  /**
   * Used for SSR. if true, will show slotted suffix on initial render. (should this be withDefault, since its the default slot??)
   */
  @property({ type: Boolean, attribute: 'with-label' }) withLabel = false;

  // Needed for Form Validation. Without it we get a console error.
  static shadowRootOptions = { ...WebAwesomeFormAssociatedElement.shadowRootOptions, delegatesFocus: true };

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'presentation');
  }

  private handleBlur() {
    this.hasFocus = false;
    this.dispatchEvent(new WaBlurEvent());
  }

  private handleClick(e: MouseEvent) {
    if (this.disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    this.checked = true;
  }

  private handleFocus() {
    this.hasFocus = true;
    this.dispatchEvent(new WaFocusEvent());
  }

  @watch('disabled', { waitUntilFirstUpdate: true })
  handleDisabledChange() {
    this.setAttribute('aria-disabled', this.disabled ? 'true' : 'false');
  }

  /** Sets focus on the radio button. */
  focus(options?: FocusOptions) {
    this.input.focus(options);
  }

  /** Removes focus from the radio button. */
  blur() {
    this.input.blur();
  }

  render() {
    const hasLabel = this.hasUpdated ? this.hasSlotController.test('[default]') : this.withLabel;
    const hasPrefix = this.hasUpdated ? this.hasSlotController.test('prefix') : this.withPrefix;
    const hasSuffix = this.hasUpdated ? this.hasSlotController.test('suffix') : this.withSuffix;

    return html`
      <button
        part="base${this.checked ? ' checked' : ''}"
        role="radio"
        aria-checked="${this.checked}"
        class=${classMap({
          'wa-neutral': !this.checked,
          'wa-brand': this.checked,
          disabled: this.disabled,
          focused: this.hasFocus,
          'wa-outlined': true,
          'wa-filled': this.checked,
          'wa-pill': this.pill,
          'has-label': hasLabel,
          'has-prefix': hasPrefix,
          'has-suffix': hasSuffix,
        })}
        aria-disabled=${this.disabled}
        type="button"
        value=${ifDefined(this.value)}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @click=${this.handleClick}
      >
        <slot name="prefix" part="prefix" class="prefix"></slot>
        <slot part="label" class="label"></slot>
        <slot name="suffix" part="suffix" class="suffix"></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-radio-button': WaRadioButton;
  }
}
