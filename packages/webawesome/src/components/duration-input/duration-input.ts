import { html, isServer } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { live } from 'lit/directives/live.js';
import { repeat } from 'lit/directives/repeat.js';
import { WaClearEvent } from '../../events/clear.js';
import { SegmentedFieldController } from '../../internal/segmented-field/segmented-field-controller.js';
import { HasSlotController } from '../../internal/slot.js';
import { submitOnEnter } from '../../internal/submit-on-enter.js';
import { RequiredValidator } from '../../internal/validators/required-validator.js';
import { WebAwesomeFormAssociatedElement, type Validator } from '../../internal/webawesome-form-associated-element.js';
import formControlStyles from '../../styles/component/form-control.styles.js';
import segmentedFieldStyles from '../../styles/component/segmented-field.styles.js';
import sizeStyles from '../../styles/component/size.styles.js';
import { LocalizeController } from '../../utilities/localize.js';
import '../icon/icon.js';
import styles from './duration-input.styles.js';

const durationPattern = /^\d{2}:[0-5]\d:[0-5]\d\.\d{3}$/;
const daysPattern = /^(\d+):([01]\d|2[0-3]):[0-5]\d:[0-5]\d\.\d{3}$/;
const maxDays = Math.floor(Number.MAX_SAFE_INTEGER / 24);
const fields = [
  { name: 'Days', width: 1, max: maxDays },
  { name: 'Hours', width: 2, max: 99 },
  { name: 'Minutes', width: 2, max: 59 },
  { name: 'Seconds', width: 2, max: 59 },
  { name: 'Milliseconds', width: 3, max: 999 },
];
const group = 'duration';

function parseDuration(value: string | null): string[] | null {
  if (!value) return null;
  if (durationPattern.test(value)) return ['0', ...value.split(/[:.]/)];
  const match = daysPattern.exec(value);
  if (!match || Number(match[1]) > maxDays) return null;
  return value.split(/[:.]/);
}

function formatDuration(parts: string[], showDays: boolean): string {
  const [days, hours, minutes, seconds, milliseconds] = parts;
  const prefix = showDays || Number(days) > 0 ? `${Number(days)}:` : '';
  return `${prefix}${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function normalizeHours(parts: string[]) {
  const hours = Number(parts[1]);
  if (Number(parts[0]) === 0 && hours >= 24) {
    parts[0] = String(Math.floor(hours / 24));
    parts[1] = String(hours % 24).padStart(2, '0');
  }
}

function compareDurations(left: string[], right: string[]): number {
  const a = [...left];
  const b = [...right];
  normalizeHours(a);
  normalizeHours(b);
  for (let index = 0; index < a.length; index++) {
    const difference = Number(a[index]) - Number(b[index]);
    if (difference !== 0) return difference;
  }
  return 0;
}

const durationValidator: Validator = {
  checkValidity(element) {
    const value = (element as WaDurationInput).value;
    const isValid = !value || parseDuration(value) !== null;
    return {
      isValid,
      message: isValid ? '' : 'Enter a duration in HH:mm:ss.SSS or D:HH:mm:ss.SSS format.',
      invalidKeys: isValid ? [] : ['badInput'],
    };
  },
};

const durationRangeValidator: Validator = {
  observedAttributes: ['min', 'max'],
  checkValidity(element) {
    const input = element as WaDurationInput;
    const min = parseDuration(input.min);
    const max = parseDuration(input.max);
    if ((input.min && !min) || (input.max && !max)) {
      return {
        isValid: false,
        message: 'Duration limits must use HH:mm:ss.SSS or D:HH:mm:ss.SSS format.',
        invalidKeys: ['customError'],
      };
    }
    if (min && max && compareDurations(min, max) > 0) {
      return {
        isValid: false,
        message: 'Minimum duration must not exceed maximum duration.',
        invalidKeys: ['customError'],
      };
    }
    const value = parseDuration(input.value);
    if (value && min && compareDurations(value, min) < 0) {
      return { isValid: false, message: `Duration must be at least ${input.min}.`, invalidKeys: ['rangeUnderflow'] };
    }
    if (value && max && compareDurations(value, max) > 0) {
      return { isValid: false, message: `Duration must be at most ${input.max}.`, invalidKeys: ['rangeOverflow'] };
    }
    return { isValid: true, message: '', invalidKeys: [] };
  },
};

/**
 * @summary A prototype input for elapsed durations.
 * @documentation https://webawesome.com/docs/components/duration-input
 * @status experimental
 *
 * @dependency wa-icon
 *
 * @slot label - The input's label. Alternatively, use the `label` attribute.
 * @slot hint - Text describing the input. Alternatively, use the `hint` attribute.
 * @slot start - An element placed at the start of the input.
 * @slot end - An element placed at the end of the input.
 * @slot clear-icon - An icon to use instead of the default clear icon.
 *
 * @event input - Emitted when a segment receives valid input.
 * @event change - Emitted when an edited segment is committed.
 * @event wa-clear - Emitted when the clear button is activated.
 * @event wa-invalid - Emitted when the input fails validation.
 *
 * @csspart form-control-label - The label.
 * @csspart duration-input - The input wrapper.
 * @csspart input - An individual segment.
 * @csspart start - The start decoration slot.
 * @csspart end - The end decoration slot.
 * @csspart clear-button - The clear button.
 * @csspart hint - The hint.
 */
@customElement('wa-duration-input')
export default class WaDurationInput extends WebAwesomeFormAssociatedElement {
  static css = [sizeStyles, formControlStyles, segmentedFieldStyles, styles];
  static shadowRootOptions = { ...WebAwesomeFormAssociatedElement.shadowRootOptions, delegatesFocus: true };

  static get validators() {
    return isServer ? [] : [...super.validators, RequiredValidator(), durationValidator, durationRangeValidator];
  }

  private readonly hasSlotController = new HasSlotController(this, 'hint', 'label');
  private readonly localize = new LocalizeController(this);
  private _value: string | null = null;
  @state() private draft: string[] | null = null;

  @query('input') input: HTMLInputElement;

  private readonly segmentsController = new SegmentedFieldController(this, {
    getLayout: () => ({
      tokens: this.visibleFields.map(field => ({ kind: 'segment', field: field.name })),
      order: this.visibleFields.map(field => field.name),
    }),
    isRtl: () => this.localize.dir() === 'rtl',
    isReadonly: () => this.readonly,
    isDisabled: () => this.disabled,
    rules: {
      typeDigit: (_group, name, buffer, digit) => {
        const field = fields.find(item => item.name === name)!;
        const combined = buffer + digit;
        if (name === 'Days' && Number(combined) > maxDays) {
          return { value: buffer, buffer, advance: false };
        }
        const next = Number(combined) > this.fieldMax(name) ? digit : combined;
        const complete = name !== 'Days' && next.length === field.width;
        return { value: next, buffer: complete ? '' : next, advance: complete };
      },
      step: (_group, name, delta) => {
        const index = fields.findIndex(field => field.name === name);
        const parts = this.currentParts();
        const max = this.fieldMax(name);
        const current = Number(parts[index] || 0);
        if (name === 'Days') {
          const next = current + delta;
          return next < 0 || next > max ? null : { value: String(next) };
        }
        if (name === 'Hours' && this.inDayMode(parts)) {
          const days = Number(parts[0] || 0);
          if (current === 23 && delta === 1) {
            if (days === maxDays) return null;
            parts[0] = String(days + 1);
            this.draft = parts;
          } else if (current === 0 && delta === -1) {
            if (days === 0) return null;
            parts[0] = String(days - 1);
            this.draft = parts;
          }
        }
        return { value: String((current + delta + max + 1) % (max + 1)) };
      },
      bounds: (_group, name) => ({ min: 0, max: this.fieldMax(name) }),
      commitBuffer: (_group, _name, buffer) => buffer,
      clear: () => true,
    },
    onCommit: (_group, name, value) => {
      const index = fields.findIndex(field => field.name === name);
      const parts = this.currentParts();
      const next = value == null ? '' : String(value);
      const changed = parts[index] !== next || (!this.draft && this.value == null);
      parts[index] = next;
      this.draft = parts;
      if (changed) this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
      if (!this.segmentsController.getBuffer(group, name)) this.commit();
    },
  });

  /** The committed duration in HH:mm:ss.SSS or D:HH:mm:ss.SSS format. */
  get value() {
    const value = this.valueHasChanged ? this._value : (this._value ?? this.defaultValue);
    const parts = parseDuration(value);
    if (!parts) return value;
    if (this.showDays) normalizeHours(parts);
    return formatDuration(parts, this.showDays);
  }

  @state()
  set value(value: string | null) {
    this.draft = null;
    this.segmentsController?.clearBuffers();
    if (this._value === value && this.valueHasChanged) return;
    this.valueHasChanged = true;
    this._value = value;
  }

  /** The initial value, restored when the form is reset. */
  @property({ attribute: 'value', reflect: true }) defaultValue: string | null = this.getAttribute('value') || null;

  /** The input's size. */
  @property({ reflect: true }) size: 'xs' | 's' | 'm' | 'l' | 'xl' = 'm';
  /** The input's visual appearance. */
  @property({ reflect: true }) appearance: 'filled' | 'outlined' | 'filled-outlined' = 'outlined';
  /** Draws the input with fully rounded edges. */
  @property({ type: Boolean, reflect: true }) pill = false;
  @property() label = '';
  @property() hint = '';
  @property({ type: Boolean, reflect: true }) required = false;
  @property({ type: Boolean, reflect: true }) readonly = false;
  /** Shows a clear button when the input has a value. */
  @property({ attribute: 'with-clear', type: Boolean }) withClear = false;
  /** Shows the days segment and uses 24-hour days. */
  @property({ attribute: 'show-days', type: Boolean, reflect: true }) showDays = false;
  /** The minimum valid duration, inclusive. */
  @property({ reflect: true }) min = '';
  /** The maximum valid duration, inclusive. */
  @property({ reflect: true }) max = '';
  /** Text between days and hours. */
  @property({ attribute: 'days-divider' }) daysDivider: string | null = null;
  /** Text between hours and minutes. */
  @property({ attribute: 'hours-divider' }) hoursDivider: string | null = null;
  /** Text between minutes and seconds. */
  @property({ attribute: 'minutes-divider' }) minutesDivider: string | null = null;
  /** Text between seconds and milliseconds. */
  @property({ attribute: 'seconds-divider' }) secondsDivider: string | null = null;
  /** Text following milliseconds, named for compatibility with input-duration. */
  @property({ attribute: 'microseconds-divider' }) microsecondsDivider: string | null = null;
  @property({ attribute: 'with-label', type: Boolean }) withLabel = false;
  @property({ attribute: 'with-hint', type: Boolean }) withHint = false;

  protected updateFormValue(value: unknown) {
    this.setValue(value == null ? '' : String(value), value == null ? null : String(value));
  }

  protected willUpdate(changedProperties: Parameters<WebAwesomeFormAssociatedElement['willUpdate']>[0]) {
    if (changedProperties.has('showDays') && this.draft) {
      this.segmentsController.flushAllBuffers();
      if (this.draft) this.commit();
    }
    if (changedProperties.has('showDays') && this.hasUpdated) {
      const rawValue = this.valueHasChanged ? this._value : this.defaultValue;
      const parts = parseDuration(rawValue);
      if (parts) {
        normalizeHours(parts);
        this._value = formatDuration(parts, true);
        this.valueHasChanged = true;
      }
    }
    super.willUpdate(changedProperties);
    if (changedProperties.has('showDays')) this.updateFormValue(this.value);
  }

  private get visibleFields() {
    return this.showDays ? fields : fields.slice(1);
  }

  private inDayMode(parts = this.currentParts()) {
    return this.showDays || Number(parts[0]) > 0;
  }

  private fieldMax(name: string) {
    if (name === 'Hours' && this.inDayMode()) return 23;
    return fields.find(field => field.name === name)!.max;
  }

  private currentParts() {
    if (this.draft) return [...this.draft];
    return parseDuration(this.value) ?? ['0', '00', '00', '00', '000'];
  }

  private handleFocus(event: FocusEvent) {
    this.segmentsController.eventHandlers().focus(event);
    const input = event.currentTarget as HTMLInputElement;
    input.dataset.previous = input.value;
    input.select();
  }

  private handleInput(event: Event, name: string) {
    const input = event.currentTarget as HTMLInputElement;
    if (!/^\d*$/.test(input.value) || Number(input.value) > this.fieldMax(name)) {
      input.value = input.dataset.previous ?? '';
      event.stopPropagation();
      return;
    }
    this.segmentsController.setBuffer(group, input.dataset.segment!, '');
    input.dataset.previous = input.value;
    const parts = this.currentParts();
    parts[fields.findIndex(field => field.name === name)] = input.value;
    this.draft = parts;
  }

  private handleChange(event: Event) {
    event.stopPropagation();
    this.commit();
  }

  private handleBlur(event: FocusEvent) {
    this.segmentsController.eventHandlers().blur(event);
    if (this.draft) this.commit();
  }

  private commit() {
    const parts = this.currentParts().map((part, index) => (part || '0').padStart(fields[index].width, '0'));
    if (this.showDays) normalizeHours(parts);
    const value = formatDuration(parts, this.showDays);
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
    if (event.key === 'Enter' && this.draft) {
      this.segmentsController.clearBuffers();
      this.commit();
    } else if (!event.altKey && !event.ctrlKey && !event.metaKey) {
      this.segmentsController.handleKeyDownEvent(event);
    }
    submitOnEnter(event, this);
  }

  private handleClearMouseDown(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  private handleClearClick(event: MouseEvent) {
    event.stopPropagation();
    if (this.disabled || this.readonly || (!this.value && !this.draft)) return;
    this.value = null;
    this.updateFormValue(null);
    this.updateValidity();
    this.dispatchEvent(new WaClearEvent());
    this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    this.focus();
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
    const display =
      this.draft ?? (this.value && !parseDuration(this.value) ? ['', '', '', '', ''] : this.currentParts());
    const active = this.segmentsController.getActiveSegment();
    const activeVisible = this.visibleFields.some(field => field.name === active?.field);
    const dividers = [
      this.daysDivider ?? 'd ',
      this.hoursDivider ?? ':',
      this.minutesDivider ?? ':',
      this.secondsDivider ?? '.',
    ];

    return html`
      <label
        part="form-control-label"
        class=${classMap({ 'has-label': hasLabel })}
        for=${this.showDays ? 'days' : 'hours'}
        id="label"
      >
        <slot name="label">${this.label}</slot>
      </label>
      <div part="duration-input" class="duration-field" role="group" aria-labelledby="label" aria-describedby="hint">
        <slot name="start" part="start"></slot>
        <div class="segments">
          ${repeat(
            this.visibleFields,
            field => field.name,
            (field, visibleIndex) => {
              const index = fields.indexOf(field);
              return html`
                ${visibleIndex ? html`<span class="divider" aria-hidden="true">${dividers[index - 1]}</span>` : ''}
                <input
                  part="input"
                  id=${field.name.toLowerCase()}
                  data-group=${group}
                  data-segment=${field.name}
                  tabindex=${this.disabled
                    ? -1
                    : (activeVisible ? active!.field === field.name : visibleIndex === 0)
                      ? 0
                      : -1}
                  aria-label=${field.name}
                  inputmode="numeric"
                  maxlength=${ifDefined(field.name === 'Days' ? undefined : field.width)}
                  style=${field.name === 'Days' ? `width: ${Math.max(2, display[index].length)}ch` : ''}
                  ?disabled=${live(this.disabled)}
                  ?readonly=${live(this.readonly)}
                  .value=${live(display[index])}
                  @focus=${this.handleFocus}
                  @blur=${this.handleBlur}
                  @input=${(event: Event) => this.handleInput(event, field.name)}
                  @change=${this.handleChange}
                  @keydown=${this.handleKeyDown}
                />
              `;
            },
          )}
          ${this.microsecondsDivider
            ? html`<span class="divider" aria-hidden="true">${this.microsecondsDivider}</span>`
            : ''}
        </div>
        ${this.withClear && !this.disabled && !this.readonly && (this.value || this.draft)
          ? html`
              <button
                part="clear-button"
                type="button"
                aria-label=${this.localize.term('clearEntry')}
                @mousedown=${this.handleClearMouseDown}
                @click=${this.handleClearClick}
              >
                <slot name="clear-icon">
                  <wa-icon name="circle-xmark" library="system" variant="regular"></wa-icon>
                </slot>
              </button>
            `
          : ''}
        <slot name="end" part="end"></slot>
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
