import type { PropertyValues } from 'lit';
import { html, isServer } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { live } from 'lit/directives/live.js';
import { HasSlotController } from '../../internal/slot.js';
import { RequiredValidator } from '../../internal/validators/required-validator.js';
import { watch } from '../../internal/watch.js';
import { WebAwesomeFormAssociatedElement } from '../../internal/webawesome-form-associated-element.js';
import formControlStyles from '../../styles/component/form-control.styles.js';
import sizeStyles from '../../styles/component/size.styles.js';
import '../icon/icon.js';
import styles from './checkbox.styles.js';

/**
 * @summary Checkboxes allow the user to toggle an option on or off.
 * @documentation https://webawesome.com/docs/components/checkbox
 * @status stable
 * @since 2.0
 *
 * @dependency wa-icon
 *
 * @slot - The checkbox's label.
 * @slot hint - Text that describes how to use the checkbox. Alternatively, you can use the `hint` attribute.
 *
 * @event blur - Emitted when the checkbox loses focus.
 * @event change - Emitted when the checked state changes.
 * @event focus - Emitted when the checkbox gains focus.
 * @event input - Emitted when the checkbox receives input.
 * @event wa-invalid - Emitted when the form control has been checked for validity and its constraints aren't satisfied.
 *
 * @csspart base - The component's label .
 * @csspart control - The square container that wraps the checkbox's checked state.
 * @csspart checked-icon - The checked icon, a `<wa-icon>` element.
 * @csspart indeterminate-icon - The indeterminate icon, a `<wa-icon>` element.
 * @csspart label - The container that wraps the checkbox's label.
 * @csspart hint - The hint's wrapper.
 *
 * @cssproperty --checked-icon-color - The color of the checked and indeterminate icons.
 * @cssproperty --checked-icon-scale - The size of the checked and indeterminate icons relative to the checkbox.
 *
 * @cssstate checked - Applied when the checkbox is checked.
 * @cssstate disabled - Applied when the checkbox is disabled.
 * @cssstate indeterminate - Applied when the checkbox is in an indeterminate state.
 *
 */
@customElement('wa-checkbox')
export default class WaCheckbox extends WebAwesomeFormAssociatedElement {
  static css = [formControlStyles, sizeStyles, styles];

  static shadowRootOptions = { ...WebAwesomeFormAssociatedElement.shadowRootOptions, delegatesFocus: true };

  static get validators() {
    const validators = isServer
      ? []
      : [
          RequiredValidator({
            validationProperty: 'checked',
            // Use a checkbox so we get "free" translation strings.
            validationElement: Object.assign(document.createElement('input'), {
              type: 'checkbox',
              required: true,
            }),
          }),
        ];
    return [...super.validators, ...validators];
  }

  private readonly hasSlotController = new HasSlotController(this, 'hint');

  @query('input[type="checkbox"]') input: HTMLInputElement;

  @property() title = ''; // make reactive to pass through

  /** The name of the checkbox, submitted as a name/value pair with form data. */
  @property({ reflect: true }) name = '';

  private _value: string | null = this.getAttribute('value') ?? null;

  /** The value of the checkbox, submitted as a name/value pair with form data. */
  get value(): string | null {
    const val = this._value || 'on';
    return this.checked ? val : null;
  }

  @property({ reflect: true })
  set value(val: string | null) {
    this._value = val;
  }

  /** The checkbox's size. */
  @property({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';

  /** Disables the checkbox. */
  @property({ type: Boolean }) disabled = false;

  /**
   * Draws the checkbox in an indeterminate state. This is usually applied to checkboxes that represents a "select
   * all/none" behavior when associated checkboxes have a mix of checked and unchecked states.
   */
  @property({ type: Boolean, reflect: true }) indeterminate = false;

  /** Draws the checkbox in a checked state. */
  @property({ type: Boolean, attribute: false }) checked: boolean = this.hasAttribute('checked');

  /** The default value of the form control. Primarily used for resetting the form control. */
  @property({ type: Boolean, reflect: true, attribute: 'checked' }) defaultChecked: boolean =
    this.hasAttribute('checked');

  /** Makes the checkbox a required field. */
  @property({ type: Boolean, reflect: true }) required = false;

  /** The checkbox's hint. If you need to display HTML, use the `hint` slot instead. */
  @property() hint = '';

  private handleClick() {
    this.hasInteracted = true;
    this.checked = !this.checked;
    this.indeterminate = false;
    this.updateComplete.then(() => {
      this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    });
  }

  @watch('defaultChecked')
  handleDefaultCheckedChange() {
    if (!this.hasInteracted && this.checked !== this.defaultChecked) {
      this.checked = this.defaultChecked;
      this.handleValueOrCheckedChange();
    }
  }

  handleValueOrCheckedChange() {
    // These @watch() commands seem to override the base element checks for changes, so we need to setValue for the form and and updateValidity()
    this.setValue(this.checked ? this.value : null, this._value);
    this.updateValidity();
  }

  @watch(['checked', 'indeterminate'])
  handleStateChange() {
    if (this.hasUpdated) {
      this.input.checked = this.checked; // force a sync update
      this.input.indeterminate = this.indeterminate; // force a sync update
    }

    this.customStates.set('checked', this.checked);
    this.customStates.set('indeterminate', this.indeterminate);
    this.updateValidity();
  }

  @watch('disabled')
  handleDisabledChange() {
    this.customStates.set('disabled', this.disabled);
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

  formResetCallback() {
    // Evaluate checked before the super call because of our watcher on value.
    this.checked = this.defaultChecked;
    super.formResetCallback();
    this.handleValueOrCheckedChange();
  }

  /** Simulates a click on the checkbox. */
  click() {
    this.input.click();
  }

  /** Sets focus on the checkbox. */
  focus(options?: FocusOptions) {
    this.input.focus(options);
  }

  /** Removes focus from the checkbox. */
  blur() {
    this.input.blur();
  }

  render() {
    const hasHintSlot = isServer ? true : this.hasSlotController.test('hint');
    const hasHint = this.hint ? true : !!hasHintSlot;
    const isIndeterminate = !this.checked && this.indeterminate;

    const iconName = isIndeterminate ? 'indeterminate' : 'check';
    const iconState = isIndeterminate ? 'indeterminate' : 'check';

    //
    // NOTE: we use a `<div>` around the label slot because of this Chrome bug.
    // Fixed in Chrome 119
    // https://bugs.chromium.org/p/chromium/issues/detail?id=1413733
    //
    return html`
      <label part="base">
        <span part="control">
          <input
            class="input"
            type="checkbox"
            title=${this.title /* An empty title prevents browser validation tooltips from appearing on hover */}
            name=${this.name}
            value=${ifDefined(this._value)}
            .indeterminate=${live(this.indeterminate)}
            .checked=${live(this.checked)}
            .disabled=${this.disabled}
            .required=${this.required}
            aria-checked=${this.checked ? 'true' : 'false'}
            aria-describedby="hint"
            @click=${this.handleClick}
          />

          <wa-icon part="${iconState}-icon icon" library="system" name=${iconName}></wa-icon>
        </span>

        <slot part="label"></slot>
      </label>

      <slot
        id="hint"
        part="hint"
        name="hint"
        aria-hidden=${hasHint ? 'false' : 'true'}
        class="${classMap({ 'has-slotted': hasHint })}"
      >
        ${this.hint}
      </slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-checkbox': WaCheckbox;
  }
}
