import { html, isServer } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { live } from 'lit/directives/live.js';
import { HasSlotController } from '../../internal/slot.js';
import { submitOnEnter } from '../../internal/submit-on-enter.js';
import { RequiredValidator } from '../../internal/validators/required-validator.js';
import { WebAwesomeFormAssociatedElement, type Validator } from '../../internal/webawesome-form-associated-element.js';
import formControlStyles from '../../styles/component/form-control.styles.js';
import sizeStyles from '../../styles/component/size.styles.js';
import styles from './duration-input.styles.js';

const durationPattern = /^\d{2}:[0-5]\d:[0-5]\d\.\d{3}$/;
const fields = [
  { name: 'Hours', width: 2, max: 99 },
  { name: 'Minutes', width: 2, max: 59 },
  { name: 'Seconds', width: 2, max: 59 },
  { name: 'Milliseconds', width: 3, max: 999 },
];

const durationValidator: Validator = {
  checkValidity(element) {
    const value = (element as WaDurationInput).value;
    const isValid = !value || durationPattern.test(value);
    return {
      isValid,
      message: isValid ? '' : 'Enter a duration in HH:mm:ss.SSS format.',
      invalidKeys: isValid ? [] : ['badInput'],
    };
  },
};

/**
 * @summary A prototype input for elapsed durations.
 * @documentation https://webawesome.com/docs/components/duration-input
 * @status experimental
 *
 * @slot label - The input's label. Alternatively, use the `label` attribute.
 * @slot hint - Text describing the input. Alternatively, use the `hint` attribute.
 *
 * @event input - Emitted when a segment receives valid input.
 * @event change - Emitted when an edited segment is committed.
 * @event wa-invalid - Emitted when the input fails validation.
 *
 * @csspart form-control-label - The label.
 * @csspart duration-input - The input wrapper.
 * @csspart input - An individual segment.
 * @csspart hint - The hint.
 */
@customElement('wa-duration-input')
export default class WaDurationInput extends WebAwesomeFormAssociatedElement {
  static css = [sizeStyles, formControlStyles, styles];
  static shadowRootOptions = { ...WebAwesomeFormAssociatedElement.shadowRootOptions, delegatesFocus: true };

  static get validators() {
    return isServer ? [] : [...super.validators, RequiredValidator(), durationValidator];
  }

  private readonly hasSlotController = new HasSlotController(this, 'hint', 'label');
  private _value: string | null = null;
  @state() private draft: string[] | null = null;

  @query('input') input: HTMLInputElement;

  /** The committed duration in HH:mm:ss.SSS format. */
  get value() {
    return this.valueHasChanged ? this._value : (this._value ?? this.defaultValue);
  }

  @state()
  set value(value: string | null) {
    this.draft = null;
    if (this._value === value && this.valueHasChanged) return;
    this.valueHasChanged = true;
    this._value = value;
  }

  /** The initial value, restored when the form is reset. */
  @property({ attribute: 'value', reflect: true }) defaultValue: string | null = this.getAttribute('value') || null;

  @property({ reflect: true }) size: 'xs' | 's' | 'm' | 'l' | 'xl' = 'm';
  @property({ reflect: true }) appearance: 'filled' | 'outlined' | 'filled-outlined' = 'outlined';
  @property() label = '';
  @property() hint = '';
  @property({ type: Boolean, reflect: true }) required = false;
  @property({ type: Boolean, reflect: true }) readonly = false;
  @property({ attribute: 'with-label', type: Boolean }) withLabel = false;
  @property({ attribute: 'with-hint', type: Boolean }) withHint = false;

  protected updateFormValue(value: unknown) {
    this.setValue(value == null ? '' : String(value), value == null ? null : String(value));
  }

  private handleFocus(event: FocusEvent) {
    const input = event.currentTarget as HTMLInputElement;
    input.dataset.previous = input.value;
    input.select();
  }

  private handleInput(event: Event, max: number) {
    const input = event.currentTarget as HTMLInputElement;
    if (!/^\d*$/.test(input.value) || Number(input.value) > max) {
      input.value = input.dataset.previous ?? '';
      event.stopPropagation();
      return;
    }
    input.dataset.previous = input.value;
    this.draft = [...this.renderRoot.querySelectorAll<HTMLInputElement>('input')].map(segment => segment.value);
  }

  private handleChange(event: Event) {
    event.stopPropagation();
    this.commit();
  }

  private handleBlur() {
    if (this.draft) this.commit();
  }

  private commit() {
    const inputs = [...this.renderRoot.querySelectorAll<HTMLInputElement>('input')];
    const parts = inputs.map((input, index) => {
      const value = (input.value || '0').padStart(fields[index].width, '0');
      input.value = value;
      input.dataset.previous = value;
      return value;
    });
    const value = `${parts[0]}:${parts[1]}:${parts[2]}.${parts[3]}`;
    if (this.value === value) {
      this.draft = null;
      return;
    }
    this.value = value;
    this.updateFormValue(this.value);
    this.updateValidity();
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && this.draft) this.commit();
    submitOnEnter(event, this);
  }

  focus(options?: FocusOptions) {
    this.input?.focus(options);
  }

  blur() {
    this.renderRoot.querySelector<HTMLInputElement>('input:focus')?.blur();
  }

  formResetCallback() {
    this.value = this.defaultValue;
    super.formResetCallback();
    this.updateFormValue(this.value);
  }

  render() {
    const hasLabel = !!this.label || this.hasSlotController.test('label', 'withLabel');
    const hasHint = !!this.hint || this.hasSlotController.test('hint', 'withHint');
    const parts = durationPattern.test(this.value ?? '') ? this.value!.split(/[:.]/) : ['', '', '', ''];
    const display = this.draft ?? (this.value ? parts : ['00', '00', '00', '000']);

    return html`
      <label part="form-control-label" class=${classMap({ 'has-label': hasLabel })} for="hours" id="label">
        <slot name="label">${this.label}</slot>
      </label>
      <div part="duration-input" class="duration-field" role="group" aria-labelledby="label" aria-describedby="hint">
        ${fields.map(
          (field, index) => html`
            ${index ? html`<span aria-hidden="true">${index === 3 ? '.' : ':'}</span>` : ''}
            <input
              part="input"
              id=${index === 0 ? 'hours' : field.name.toLowerCase()}
              aria-label=${field.name}
              inputmode="numeric"
              maxlength=${field.width}
              ?disabled=${live(this.disabled)}
              ?readonly=${live(this.readonly)}
              .value=${live(display[index])}
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
              @input=${(event: Event) => this.handleInput(event, field.max)}
              @change=${this.handleChange}
              @keydown=${this.handleKeyDown}
            />
          `,
        )}
      </div>
      <slot id="hint" part="hint" name="hint" class=${classMap({ 'has-slotted': hasHint })}>${this.hint}</slot>
    `;
  }
}

WaDurationInput.disableWarning?.('change-in-update');

declare global {
  interface HTMLElementTagNameMap {
    'wa-duration-input': WaDurationInput;
  }
}
