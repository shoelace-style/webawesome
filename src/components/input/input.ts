import '../icon/icon.js';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property, query, state } from 'lit/decorators.js';
import { HasSlotController } from '../../internal/slot.js';
import { html, isServer } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { live } from 'lit/directives/live.js';
import { LocalizeController } from '../../utilities/localize.js';
import { MirrorValidator } from '../../internal/validators/mirror-validator.js';
import { WaBlurEvent } from '../../events/blur.js';
import { WaChangeEvent } from '../../events/change.js';
import { WaClearEvent } from '../../events/clear.js';
import { WaFocusEvent } from '../../events/focus.js';
import { WaInputEvent } from '../../events/input.js';
import { watch } from '../../internal/watch.js';
import { WebAwesomeFormAssociatedElement } from '../../internal/webawesome-element.js';
import formControlStyles from '../../styles/shadow/form-control.css';
import styles from './input.css';
import type WaButton from '../button/button.js';

/**
 * @summary Inputs collect data from the user.
 * @documentation https://backers.webawesome.com/docs/components/input
 * @status stable
 * @since 2.0
 *
 * @dependency wa-icon
 *
 * @slot label - The input's label. Alternatively, you can use the `label` attribute.
 * @slot prefix - Used to prepend a presentational icon or similar element to the input.
 * @slot suffix - Used to append a presentational icon or similar element to the input.
 * @slot clear-icon - An icon to use in lieu of the default clear icon.
 * @slot show-password-icon - An icon to use in lieu of the default show password icon.
 * @slot hide-password-icon - An icon to use in lieu of the default hide password icon.
 * @slot hint - Text that describes how to use the input. Alternatively, you can use the `hint` attribute.
 *
 * @event wa-blur - Emitted when the control loses focus.
 * @event wa-change - Emitted when an alteration to the control's value is committed by the user.
 * @event wa-clear - Emitted when the clear button is activated.
 * @event wa-focus - Emitted when the control gains focus.
 * @event wa-input - Emitted when the control receives input.
 * @event wa-invalid - Emitted when the form control has been checked for validity and its constraints aren't satisfied.
 *
 * @csspart form-control - The form control that wraps the label, input, and hint.
 * @csspart form-control-label - The label's wrapper.
 * @csspart form-control-input - The input's wrapper.
 * @csspart form-control-hint - The hint's wrapper.
 * @csspart base - The component's base wrapper.
 * @csspart input - The internal `<input>` control.
 * @csspart prefix - The container that wraps the prefix.
 * @csspart clear-button - The clear button.
 * @csspart password-toggle-button - The password toggle button.
 * @csspart suffix - The container that wraps the suffix.
 *
 * @cssproperty --background-color - The input's background color.
 * @cssproperty --border-color - The color of the input's borders.
 * @cssproperty --border-radius - The radius of the input's corners.
 * @cssproperty --border-style - The style of the input's borders.
 * @cssproperty --border-width - The width of the input's borders. Expects a single value.
 * @cssproperty --box-shadow - The shadow effects around the edges of the input.
 */
@customElement('wa-input')
export default class WaInput extends WebAwesomeFormAssociatedElement {
  static shadowStyle = [formControlStyles, styles];

  static shadowRootOptions = { ...WebAwesomeFormAssociatedElement.shadowRootOptions, delegatesFocus: true };

  static get validators() {
    return [...super.validators, MirrorValidator()];
  }

  assumeInteractionOn = ['wa-blur', 'wa-input'];
  private readonly hasSlotController = new HasSlotController(this, 'hint', 'label');
  private readonly localize = new LocalizeController(this);

  @query('.input__control') input: HTMLInputElement;

  @state() private hasFocus = false;
  @property() title = ''; // make reactive to pass through

  /**
   * The type of input. Works the same as a native `<input>` element, but only a subset of types are supported. Defaults
   * to `text`.
   */
  @property({ reflect: true }) type:
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'number'
    | 'password'
    | 'search'
    | 'tel'
    | 'text'
    | 'time'
    | 'url' = 'text';

  private _value: string | null = null;

  /** The current value of the input, submitted as a name/value pair with form data. */
  get value() {
    if (this.valueHasChanged) {
      return this._value;
    }

    return this._value ?? this.defaultValue;
  }

  @state()
  set value(val: string | null) {
    if (this._value === val) {
      return;
    }

    this.valueHasChanged = true;
    this._value = val;
  }

  /** The default value of the form control. Primarily used for resetting the form control. */
  @property({ attribute: 'value', reflect: true }) defaultValue: null | string = this.getAttribute('value') || null;

  /** The input's size. */
  @property({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';

  /** Draws a filled input. */
  @property({ type: Boolean, reflect: true }) filled = false;

  /** Draws a pill-style input with rounded edges. */
  @property({ type: Boolean, reflect: true }) pill = false;

  /** The input's label. If you need to display HTML, use the `label` slot instead. */
  @property() label = '';

  /** The input's hint. If you need to display HTML, use the `hint` slot instead. */
  @property({ attribute: 'hint' }) hint = '';

  /** Adds a clear button when the input is not empty. */
  @property({ type: Boolean }) clearable = false;

  /** Placeholder text to show as a hint when the input is empty. */
  @property() placeholder = '';

  /** Makes the input readonly. */
  @property({ type: Boolean, reflect: true }) readonly = false;

  /** Adds a button to toggle the password's visibility. Only applies to password types. */
  @property({ attribute: 'password-toggle', type: Boolean }) passwordToggle = false;

  /** Determines whether or not the password is currently visible. Only applies to password input types. */
  @property({ attribute: 'password-visible', type: Boolean }) passwordVisible = false;

  /** Hides the browser's built-in increment/decrement spin buttons for number inputs. */
  @property({ attribute: 'no-spin-buttons', type: Boolean }) noSpinButtons = false;

  /**
   * By default, form controls are associated with the nearest containing `<form>` element. This attribute allows you
   * to place the form control outside of a form and associate it with the form that has this `id`. The form must be in
   * the same document or shadow root for this to work.
   */
  @property({ reflect: true }) form = null;

  /** Makes the input a required field. */
  @property({ type: Boolean, reflect: true }) required = false;

  /** A regular expression pattern to validate input against. */
  @property() pattern: string;

  /** The minimum length of input that will be considered valid. */
  @property({ type: Number }) minlength: number;

  /** The maximum length of input that will be considered valid. */
  @property({ type: Number }) maxlength: number;

  /** The input's minimum value. Only applies to date and number input types. */
  @property() min: number | string;

  /** The input's maximum value. Only applies to date and number input types. */
  @property() max: number | string;

  /**
   * Specifies the granularity that the value must adhere to, or the special value `any` which means no stepping is
   * implied, allowing any numeric value. Only applies to date and number input types.
   */
  @property() step: number | 'any';

  /** Controls whether and how text input is automatically capitalized as it is entered by the user. */
  @property() autocapitalize: 'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters';

  /** Indicates whether the browser's autocorrect feature is on or off. */
  @property() autocorrect: 'off' | 'on';

  /**
   * Specifies what permission the browser has to provide assistance in filling out form field values. Refer to
   * [this page on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) for available values.
   */
  @property() autocomplete: string;

  /** Indicates that the input should receive focus on page load. */
  @property({ type: Boolean }) autofocus: boolean;

  /** Used to customize the label or icon of the Enter key on virtual keyboards. */
  @property() enterkeyhint: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send';

  /** Enables spell checking on the input. */
  @property({
    type: Boolean,
    converter: {
      // Allow "true|false" attribute values but keep the property boolean
      fromAttribute: value => (!value || value === 'false' ? false : true),
      toAttribute: value => (value ? 'true' : 'false')
    }
  })
  spellcheck = true;

  /**
   * Tells the browser what type of data will be entered by the user, allowing it to display the appropriate virtual
   * keyboard on supportive devices.
   */
  @property() inputmode: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';

  /**
   * Used for SSR. Will determine if the SSRed component will have the label slot rendered on initial paint.
   */
  @property({ attribute: 'with-label', type: Boolean }) withLabel = false;

  /**
   * Used for SSR. Will determine if the SSRed component will have the hint slot rendered on initial paint.
   */
  @property({ attribute: 'with-hint', type: Boolean }) withHint = false;

  private handleBlur() {
    this.hasFocus = false;
    this.dispatchEvent(new WaBlurEvent());
  }

  private handleChange() {
    this.value = this.input.value;
    this.dispatchEvent(new WaChangeEvent());
  }

  private handleClearClick(event: MouseEvent) {
    event.preventDefault();

    if (this.value !== '') {
      this.value = '';
      this.dispatchEvent(new WaClearEvent());
      this.dispatchEvent(new WaInputEvent());
      this.dispatchEvent(new WaChangeEvent());
    }

    this.input.focus();
  }

  private handleFocus() {
    this.hasFocus = true;
    this.dispatchEvent(new WaFocusEvent());
  }

  private handleInput() {
    this.value = this.input.value;
    this.dispatchEvent(new WaInputEvent());
  }

  private handleKeyDown(event: KeyboardEvent) {
    const hasModifier = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;

    // Pressing enter when focused on an input should submit the form like a native input, but we wait a tick before
    // submitting to allow users to cancel the keydown event if they need to
    if (event.key === 'Enter' && !hasModifier) {
      setTimeout(() => {
        //
        // When using an Input Method Editor (IME), pressing enter will cause the form to submit unexpectedly. One way
        // to check for this is to look at event.isComposing, which will be true when the IME is open.
        //
        // See https://github.com/shoelace-style/shoelace/pull/988
        //
        if (!event.defaultPrevented && !event.isComposing) {
          const form = this.getForm();

          if (!form) {
            return;
          }

          const formElements = [...form.elements];

          // If we're the only formElement, we submit like a native input.
          if (formElements.length === 1) {
            form.requestSubmit(null);
            return;
          }

          const button = formElements.find(
            (el: HTMLButtonElement) => el.type === 'submit' && !el.matches(':disabled')
          ) as undefined | HTMLButtonElement | WaButton;

          // No button found, don't submit.
          if (!button) {
            return;
          }

          if (button.tagName.toLowerCase() === 'button') {
            form.requestSubmit(button);
          } else {
            // requestSubmit() wont work with `<wa-button>`
            button.click();
          }
        }
      });
    }
  }

  private handlePasswordToggle() {
    this.passwordVisible = !this.passwordVisible;
  }

  @watch('step', { waitUntilFirstUpdate: true })
  handleStepChange() {
    // If step changes, the value may become invalid so we need to recheck after the update. We set the new step
    // imperatively so we don't have to wait for the next render to report the updated validity.
    this.input.step = String(this.step);
    this.updateValidity();
  }

  /** Sets focus on the input. */
  focus(options?: FocusOptions) {
    this.input.focus(options);
  }

  /** Removes focus from the input. */
  blur() {
    this.input.blur();
  }

  /** Selects all the text in the input. */
  select() {
    this.input.select();
  }

  /** Sets the start and end positions of the text selection (0-based). */
  setSelectionRange(
    selectionStart: number,
    selectionEnd: number,
    selectionDirection: 'forward' | 'backward' | 'none' = 'none'
  ) {
    this.input.setSelectionRange(selectionStart, selectionEnd, selectionDirection);
  }

  /** Replaces a range of text with a new string. */
  setRangeText(
    replacement: string,
    start?: number,
    end?: number,
    selectMode: 'select' | 'start' | 'end' | 'preserve' = 'preserve'
  ) {
    const selectionStart = start ?? this.input.selectionStart!;
    const selectionEnd = end ?? this.input.selectionEnd!;

    this.input.setRangeText(replacement, selectionStart, selectionEnd, selectMode);

    if (this.value !== this.input.value) {
      this.value = this.input.value;
    }
  }

  /** Displays the browser picker for an input element (only works if the browser supports it for the input type). */
  showPicker() {
    if ('showPicker' in HTMLInputElement.prototype) {
      this.input.showPicker();
    }
  }

  /** Increments the value of a numeric input type by the value of the step attribute. */
  stepUp() {
    this.input.stepUp();
    if (this.value !== this.input.value) {
      this.value = this.input.value;
    }
  }

  /** Decrements the value of a numeric input type by the value of the step attribute. */
  stepDown() {
    this.input.stepDown();
    if (this.value !== this.input.value) {
      this.value = this.input.value;
    }
  }

  formResetCallback() {
    this.value = this.defaultValue;

    super.formResetCallback();
  }

  render() {
    const hasLabelSlot = this.hasUpdated ? this.hasSlotController.test('label') : this.withLabel;
    const hasHintSlot = this.hasUpdated ? this.hasSlotController.test('hint') : this.withHint;
    const hasLabel = this.label ? true : !!hasLabelSlot;
    const hasHint = this.hint ? true : !!hasHintSlot;
    const hasClearIcon = this.clearable && !this.disabled && !this.readonly;
    const isClearIconVisible =
      // prevents hydration mismatch errors.
      (isServer || this.hasUpdated) &&
      hasClearIcon &&
      (typeof this.value === 'number' || (this.value && this.value.length > 0));

    return html`
      <div
        part="form-control"
        class=${classMap({
          'form-control': true,
          'form-control--small': this.size === 'small',
          'form-control--medium': this.size === 'medium',
          'form-control--large': this.size === 'large',
          'form-control--has-label': hasLabel,
          'form-control--has-hint': hasHint
        })}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${hasLabel ? 'false' : 'true'}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${classMap({
              input: true,

              // Sizes
              'input--small': this.size === 'small',
              'input--medium': this.size === 'medium',
              'input--large': this.size === 'large',

              // States
              'input--pill': this.pill,
              'input--standard': !this.filled,
              'input--filled': this.filled,
              'input--disabled': this.disabled,
              'input--focused': this.hasFocus,
              'input--empty': !this.value,
              'input--no-spin-buttons': this.noSpinButtons
            })}
          >
            <span part="prefix" class="input__prefix">
              <slot name="prefix"></slot>
            </span>

            <input
              part="input"
              id="input"
              class="input__control"
              type=${this.type === 'password' && this.passwordVisible ? 'text' : this.type}
              title=${this.title /* An empty title prevents browser validation tooltips from appearing on hover */}
              name=${ifDefined(this.name)}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              ?required=${this.required}
              placeholder=${ifDefined(this.placeholder)}
              minlength=${ifDefined(this.minlength)}
              maxlength=${ifDefined(this.maxlength)}
              min=${ifDefined(this.min)}
              max=${ifDefined(this.max)}
              step=${ifDefined(this.step as number)}
              .value=${live(this.value || '')}
              autocapitalize=${ifDefined(this.autocapitalize)}
              autocomplete=${ifDefined(this.autocomplete)}
              autocorrect=${ifDefined(this.autocorrect)}
              ?autofocus=${this.autofocus}
              spellcheck=${this.spellcheck}
              pattern=${ifDefined(this.pattern)}
              enterkeyhint=${ifDefined(this.enterkeyhint)}
              inputmode=${ifDefined(this.inputmode)}
              aria-describedby="hint"
              @change=${this.handleChange}
              @input=${this.handleInput}
              @keydown=${this.handleKeyDown}
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
            />

            ${isClearIconVisible
              ? html`
                  <button
                    part="clear-button"
                    class="input__clear"
                    type="button"
                    aria-label=${this.localize.term('clearEntry')}
                    @click=${this.handleClearClick}
                    tabindex="-1"
                  >
                    <slot name="clear-icon">
                      <wa-icon name="circle-xmark" library="system" variant="regular"></wa-icon>
                    </slot>
                  </button>
                `
              : ''}
            ${this.passwordToggle && !this.disabled
              ? html`
                  <button
                    part="password-toggle-button"
                    class="input__password-toggle"
                    type="button"
                    aria-label=${this.localize.term(this.passwordVisible ? 'hidePassword' : 'showPassword')}
                    @click=${this.handlePasswordToggle}
                    tabindex="-1"
                  >
                    ${this.passwordVisible
                      ? html`
                          <slot name="show-password-icon">
                            <wa-icon name="eye-slash" library="system" variant="regular"></wa-icon>
                          </slot>
                        `
                      : html`
                          <slot name="hide-password-icon">
                            <wa-icon name="eye" library="system" variant="regular"></wa-icon>
                          </slot>
                        `}
                  </button>
                `
              : ''}

            <span part="suffix" class="input__suffix">
              <slot name="suffix"></slot>
            </span>
          </div>
        </div>

        <div part="form-control-hint" id="hint" class="form-control__hint" aria-hidden=${hasHint ? 'false' : 'true'}>
          <slot name="hint">${this.hint}</slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-input': WaInput;
  }
}
