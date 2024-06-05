import '../icon/icon.js';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property, state } from 'lit/decorators.js';
import { html } from 'lit';
import { WaBlurEvent } from '../../events/blur.js';
import { WaFocusEvent } from '../../events/focus.js';
import { watch } from '../../internal/watch.js';
import { WebAwesomeFormAssociatedElement } from '../../internal/webawesome-element.js';
import componentStyles from '../../styles/component.styles.js';
import styles from './radio.styles.js';
import type { CSSResultGroup } from 'lit';

/**
 * @summary Radios allow the user to select a single option from a group.
 * @documentation https://shoelace.style/components/radio
 * @status stable
 * @since 2.0
 *
 * @dependency wa-icon
 *
 * @slot - The radio's label.
 *
 * @event wa-blur - Emitted when the control loses focus.
 * @event wa-focus - Emitted when the control gains focus.
 *
 * @csspart base - The component's base wrapper.
 * @csspart control - The circular container that wraps the radio's checked state.
 * @csspart control--checked - The radio control when the radio is checked.
 * @csspart checked-icon - The checked icon.
 * @csspart label - The container that wraps the radio's label.
 *
 * @cssproperty --background - The radio's background styles.
 * @cssproperty --background-checked - The radio's background styles when checked.
 * @cssproperty --border-color - The color of the radio's borders.
 * @cssproperty --border-color-checked - The color of the radio's borders when checked.
 * @cssproperty --border-style - The style of the radio's borders.
 * @cssproperty --border-width - The width of the radio's borders. Expects a single value.
 * @cssproperty --box-shadow - The shadow effects around the edges of the radio.
 * @cssproperty --checked-icon-color - The color of the radio's checked icon.
 * @cssproperty --checked-icon-scale - The size of the checked icon relative to the radio.
 * @cssproperty --toggle-size - The size of the radio.
 */
@customElement('wa-radio')
export default class WaRadio extends WebAwesomeFormAssociatedElement {
  static styles: CSSResultGroup = [componentStyles, styles];

  @state() checked = false;
  @state() protected hasFocus = false;

  /**
   * The string pointing to a form's id.
   */
  @property({ reflect: true }) form: string | null = null;

  /** The radio's value. When selected, the radio group will receive this value. */
  @property({ reflect: true }) value: string;

  /**
   * The radio's size. When used inside a radio group, the size will be determined by the radio group's size so this
   * attribute can typically be omitted.
   */
  @property({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';

  /** Disables the radio. */
  @property({ type: Boolean }) disabled = false;

  constructor() {
    super();
    this.addEventListener('click', this.handleClick);
    this.addEventListener('blur', this.handleBlur);
    this.addEventListener('focus', this.handleFocus);
  }

  connectedCallback() {
    super.connectedCallback();
    this.setInitialAttributes();
  }

  private handleBlur = () => {
    this.hasFocus = false;
    this.dispatchEvent(new WaBlurEvent());
  };

  private handleFocus = () => {
    this.hasFocus = true;
    this.dispatchEvent(new WaFocusEvent());
  };

  private setInitialAttributes() {
    this.setAttribute('role', 'radio');
    this.tabIndex = 0;
    this.setAttribute('aria-disabled', this.disabled ? 'true' : 'false');
  }

  @watch('checked')
  handleCheckedChange() {
    this.setAttribute('aria-checked', this.checked ? 'true' : 'false');
    this.tabIndex = this.checked ? 0 : -1;
  }

  /**
   * @override
   */
  setValue(): void {
    // We override `setValue` because we don't want to set form values from here. We want to do that in "RadioGroup" itself.
  }

  @watch('disabled', { waitUntilFirstUpdate: true })
  handleDisabledChange() {
    this.setAttribute('aria-disabled', this.disabled ? 'true' : 'false');
  }

  private handleClick = () => {
    if (!this.disabled) {
      this.checked = true;
    }
  };

  render() {
    return html`
      <span
        part="base"
        class=${classMap({
          radio: true,
          'radio--checked': this.checked,
          'radio--disabled': this.disabled,
          'radio--focused': this.hasFocus,
          'radio--small': this.size === 'small',
          'radio--medium': this.size === 'medium',
          'radio--large': this.size === 'large'
        })}
      >
        <span part="${`control${this.checked ? ' control--checked' : ''}`}" class="radio__control">
          ${this.checked
            ? html`
                <svg
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                  part="checked-icon"
                  class="radio__checked-icon"
                >
                  <circle cx="8" cy="8" r="8" />
                </svg>
              `
            : ''}
        </span>

        <slot part="label" class="radio__label"></slot>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-radio': WaRadio;
  }
}
