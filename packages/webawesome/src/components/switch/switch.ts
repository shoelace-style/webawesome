import type { PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { live } from 'lit/directives/live.js';
import { HasSlotController } from '../../internal/slot.js';
import { MirrorValidator } from '../../internal/validators/mirror-validator.js';
import { watch } from '../../internal/watch.js';
import { WebAwesomeFormAssociatedElement } from '../../internal/webawesome-form-associated-element.js';
import formControlStyles from '../../styles/component/form-control.css';
import sizeStyles from '../../styles/utilities/size.css';
import styles from './switch.css';

/**
 * @summary Switches allow the user to toggle an option on or off.
 * @documentation https://backers.webawesome.com/docs/components/switch
 * @status stable
 * @since 2.0
 *
 * @slot - The switch's label.
 * @slot hint - Text that describes how to use the switch. Alternatively, you can use the `hint` attribute.
 *
 * @event blur - Emitted when the control loses focus.
 * @event change - Emitted when the control's checked state changes.
 * @event input - Emitted when the control receives input.
 * @event focus - Emitted when the control gains focus.
 * @event wa-invalid - Emitted when the form control has been checked for validity and its constraints aren't satisfied.
 *
 * @csspart base - The component's base wrapper.
 * @csspart control - The control that houses the switch's thumb.
 * @csspart thumb - The switch's thumb.
 * @csspart label - The switch's label.
 * @csspart hint - The hint's wrapper.
 *
 * @cssproperty --background-color - The switch's background color.
 * @cssproperty --background-color-checked - The switch's background color when checked.
 * @cssproperty --border-color - The color of the switch's borders.
 * @cssproperty --border-color-checked - The color of the switch's borders when checked.
 * @cssproperty --border-style - The style of the switch's borders.
 * @cssproperty --border-width - The width of the switch's borders. Expects a single value.
 * @cssproperty --box-shadow - The shadow effects around the edges of the switch.
 * @cssproperty --height - The height of the switch.
 * @cssproperty --thumb-color - The color of the thumb.
 * @cssproperty --thumb-color-checked - The color of the thumb when checked.
 * @cssproperty --thumb-shadow - The shadow effects around the edges of the thumb.
 * @cssproperty --thumb-size - The size of the thumb.
 * @cssproperty --width - The width of the switch.
 */
@customElement('wa-switch')
export default class WaSwitch extends WebAwesomeFormAssociatedElement {
  static shadowRootOptions = { ...WebAwesomeFormAssociatedElement.shadowRootOptions, delegatesFocus: true };
  static css = [formControlStyles, sizeStyles, styles];

  static get validators() {
    return [...super.validators, MirrorValidator()];
  }

  private readonly hasSlotController = new HasSlotController(this, 'hint');

  @query('input[type="checkbox"]') input: HTMLInputElement;

  @property() title = ''; // make reactive to pass through

  /** The name of the switch, submitted as a name/value pair with form data. */
  @property({ reflect: true }) name: string | null = null;

  private _value: string | null = this.getAttribute('value') ?? null;

  /** The value of the switch, submitted as a name/value pair with form data. */
  get value(): string | null {
    return this._value ?? 'on';
  }

  @property({ reflect: true })
  set value(val: string | null) {
    this._value = val;
  }

  /** The switch's size. */
  @property({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';

  /** Disables the switch. */
  @property({ type: Boolean }) disabled = false;

  /** Draws the switch in a checked state. */
  @property({ type: Boolean, attribute: false }) checked: boolean = this.hasAttribute('checked');

  /** The default value of the form control. Primarily used for resetting the form control. */
  @property({ type: Boolean, attribute: 'checked', reflect: true }) defaultChecked: boolean =
    this.hasAttribute('checked');

  /**
   * By default, form controls are associated with the nearest containing `<form>` element. This attribute allows you
   * to place the form control outside of a form and associate it with the form that has this `id`. The form must be in
   * the same document or shadow root for this to work.
   */
  @property({ reflect: true }) form = null;

  /** Makes the switch a required field. */
  @property({ type: Boolean, reflect: true }) required = false;

  /** The switch's hint. If you need to display HTML, use the `hint` slot instead. */
  @property({ attribute: 'hint' }) hint = '';

  /**
   * Used for SSR. If you slot in hint, make sure to add `with-hint` to your component to get it to properly render with SSR.
   */
  @property({ attribute: 'with-hint', type: Boolean }) withHint = false;

  firstUpdated(changedProperties: PropertyValues<typeof this>) {
    super.firstUpdated(changedProperties);

    this.handleValueOrCheckedChange();
  }

  private handleClick() {
    this.hasInteracted = true;
    this.checked = !this.checked;
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.checked = false;
      this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
      this.dispatchEvent(new InputEvent('input'));
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.checked = true;
      this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
      this.dispatchEvent(new InputEvent('input'));
    }
  }

  protected willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('defaultChecked')) {
      if (!this.hasInteracted) {
        this.checked = this.defaultChecked;
      }
    }

    if (changedProperties.has('value') || changedProperties.has('checked')) {
      this.handleValueOrCheckedChange();
    }
  }

  handleValueOrCheckedChange() {
    // These @watch() commands seem to override the base element checks for changes, so we need to setValue for the form and and updateValidity()
    this.setValue(this.checked ? this.value : null, this._value);
    this.updateValidity();
  }

  @watch('defaultChecked')
  handleDefaultCheckedChange() {
    if (!this.hasInteracted && this.checked !== this.defaultChecked) {
      this.checked = this.defaultChecked;
      this.handleValueOrCheckedChange();
    }
  }

  @watch(['checked'])
  handleStateChange() {
    if (this.hasUpdated) {
      this.input.checked = this.checked; // force a sync update
    }

    this.customStates.set('checked', this.checked);
    this.updateValidity();
  }

  @watch('disabled', { waitUntilFirstUpdate: true })
  handleDisabledChange() {
    // Disabled form controls are always valid
    this.updateValidity();
  }

  /** Simulates a click on the switch. */
  click() {
    this.input.click();
  }

  /** Sets focus on the switch. */
  focus(options?: FocusOptions) {
    this.input.focus(options);
  }

  /** Removes focus from the switch. */
  blur() {
    this.input.blur();
  }

  setValue(value: string | File | FormData | null, stateValue?: string | File | FormData | null | undefined): void {
    if (!this.checked) {
      this.internals.setFormValue(null, null);
      return;
    }

    this.internals.setFormValue(value ?? 'on', stateValue);
  }

  formResetCallback(): void {
    this.checked = this.defaultChecked;
    super.formResetCallback();
    this.handleValueOrCheckedChange();
  }

  render() {
    const hasHintSlot = this.hasUpdated ? this.hasSlotController.test('hint') : this.withHint;
    const hasHint = this.hint ? true : !!hasHintSlot;

    return html`
      <label
        part="base"
        class=${classMap({
          checked: this.checked,
          disabled: this.disabled,
        })}
      >
        <input
          class="input"
          type="checkbox"
          title=${this.title /* An empty title prevents browser validation tooltips from appearing on hover */}
          name=${this.name}
          value=${ifDefined(this.value)}
          .checked=${live(this.checked)}
          .disabled=${this.disabled}
          .required=${this.required}
          role="switch"
          aria-checked=${this.checked ? 'true' : 'false'}
          aria-describedby="hint"
          @click=${this.handleClick}
          @keydown=${this.handleKeyDown}
        />

        <span part="control" class="switch">
          <span part="thumb" class="thumb"></span>
        </span>

        <slot part="label" class="label"></slot>
      </label>

      <slot
        name="hint"
        part="hint"
        class=${classMap({
          'has-slotted': hasHint,
        })}
        aria-hidden=${hasHint ? 'false' : 'true'}
        >${this.hint}</slot
      >
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-switch': WaSwitch;
  }
}
