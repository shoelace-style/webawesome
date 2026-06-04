import { html, isServer } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { live } from 'lit/directives/live.js';
import { uniqueId } from '../../internal/math.js';
import { warnDeprecatedSize } from '../../internal/size.js';
import { HasSlotController } from '../../internal/slot.js';
import { MirrorValidator } from '../../internal/validators/mirror-validator.js';
import { watch } from '../../internal/watch.js';
import { WebAwesomeFormAssociatedElement } from '../../internal/webawesome-form-associated-element.js';
import formControlStyles from '../../styles/component/form-control.styles.js';
import sizeStyles from '../../styles/component/size.styles.js';
import { LocalizeController } from '../../utilities/localize.js';
import { localeFieldOrder, type SegmentField } from './internal/field-order.js';
import { PartialDateValidator } from './internal/partial-date-validator.js';
import { EMPTY_PARTS, isoToParts, partsToIso, type DateParts } from './internal/parts.js';
import styles from './known-date.styles.js';

export type WaKnownDateSize = 'xs' | 's' | 'm' | 'l' | 'xl';
export type WaKnownDateAppearance = 'filled' | 'outlined' | 'filled-outlined';

const generateId = (): string => uniqueId('wa-known-date-');

/**
 * @summary Known dates let users enter dates they already know — birthdays, expirations, document
 *  dates — through three separate day, month, and year fields shown in the locale's natural order.
 * @documentation https://webawesome.com/docs/components/known-date
 * @status experimental
 * @since 3.8
 *
 * @slot label - The known date's group label. Alternatively, use the `label` attribute.
 * @slot hint - Text that describes how to use the known date. Alternatively, use the `hint` attribute.
 *
 * @event blur - Emitted when the control loses focus.
 * @event change - Emitted when the committed value transitions to a new ISO date.
 * @event focus - Emitted when the control gains focus.
 * @event input - Emitted as the user types in any field.
 * @event wa-invalid - Emitted when the form control has been checked for validity and its constraints aren't satisfied.
 *
 * @csspart form-control - The form control's outer wrapper.
 * @csspart form-control-label - The wrapper inside the legend that styles the visible label text.
 * @csspart form-control-input - Alias on the fields row matching other form controls.
 * @csspart hint - The hint's wrapper.
 * @csspart label - Alias on the legend's inner label wrapper.
 * @csspart base - The component's outer wrapper (alias of the fields row).
 * @csspart fieldset - The `<fieldset>` element grouping the three fields (or a `role="group"` div).
 * @csspart legend - The `<legend>` element (when a label is present).
 * @csspart fields - The flex row holding the three field blocks.
 * @csspart field - Each field block (label + input).
 * @csspart field-day - Added to the day field block.
 * @csspart field-month - Added to the month field block.
 * @csspart field-year - Added to the year field block.
 * @csspart field-label - The text label above each field's input.
 * @csspart field-input - The native `<input>` inside a field.
 * @csspart error - The inline error message region. This is an intentional difference from `<wa-date-input>`
 *  and `<wa-time-picker>`, which rely on the browser's native validation popup. Because this control is composed
 *  of three separate fields, an inline `role="alert"` region gives a single, predictable place to surface the
 *  validation message rather than anchoring a native popup on one of the three fields.
 *
 * @cssstate blank - The known date has no committed value.
 * @cssstate disabled - The known date is disabled.
 */
@customElement('wa-known-date')
export default class WaKnownDate extends WebAwesomeFormAssociatedElement {
  static css = [sizeStyles, formControlStyles, styles];

  static shadowRootOptions = {
    ...WebAwesomeFormAssociatedElement.shadowRootOptions,
    delegatesFocus: true,
  };

  static get validators() {
    const validators = isServer ? [] : [MirrorValidator(), PartialDateValidator()];
    return [...super.validators, ...validators];
  }

  // Moving focus between the three internal fields shouldn't count as "leaving the group," so we key
  // interaction off `input` alone — matching `<wa-date-input>` and `<wa-time-picker>`.
  assumeInteractionOn = ['input'];

  readonly localize = new LocalizeController(this);
  private readonly hasSlotController = new HasSlotController(this, 'hint', 'label');
  private readonly groupId = generateId();
  private readonly hintId = `${this.groupId}-hint`;
  private readonly errorId = `${this.groupId}-error`;

  /** Hidden mirror used for native constraint validation (min/max/required + valid-date roundtrip). */
  @query('.value-input') valueInput!: HTMLInputElement;

  /** Debounces duplicate `change` events when the value hasn't transitioned. */
  private lastEmittedValue = '';
  private pendingValue: string | null = null;

  /** The three field strings. Stored verbatim so user-typed digits round-trip faithfully. */
  @state() parts: DateParts = { ...EMPTY_PARTS };

  //
  // Properties
  //

  /** The name submitted with form data. */
  @property({ reflect: true }) name = '';

  private _value = '';

  /**
   * The committed value as an ISO `YYYY-MM-DD` string. The setter also accepts a `Date` or `null`. Reading
   * returns an empty string when the value is blank or any field is only partially filled.
   */
  get value(): string {
    if (this.valueHasChanged) return this._value;
    return this._value || this.defaultValue || '';
  }
  @state()
  set value(val: string | Date | null) {
    const normalized = this.normalizeIncomingValue(val);
    if (normalized === this._value) return;
    const oldValue = this._value;
    this._value = normalized;
    this.valueHasChanged = true;
    if (this.hasUpdated) {
      this.syncPartsFromCanonical();
    } else {
      this.pendingValue = this._value;
    }
    this.requestUpdate('value', oldValue);
  }

  /** The default value used for form reset. */
  @property({ attribute: 'value', reflect: true }) defaultValue: string = this.getAttribute('value') ?? '';

  /** Disables the known date. */
  @property({ type: Boolean }) disabled = false;

  /** Makes the known date required for form submission. */
  @property({ type: Boolean, reflect: true }) required = false;

  /** Makes the fields non-editable. */
  @property({ type: Boolean, reflect: true }) readonly = false;

  /** The known date's size. */
  @property({ reflect: true }) size: WaKnownDateSize | 'small' | 'medium' | 'large' = 'm';

  @watch('size')
  handleSizeChange() {
    warnDeprecatedSize(this.localName, this.size);
  }

  /** The known date's visual appearance. */
  @property({ reflect: true }) appearance: WaKnownDateAppearance = 'outlined';

  /** Draws pill-style fields with rounded edges. */
  @property({ type: Boolean, reflect: true }) pill = false;

  /** The known date's label. If you need to display HTML, use the `label` slot instead. */
  @property() label = '';

  /** The known date's hint. If you need to display HTML, use the `hint` slot instead. */
  @property({ attribute: 'hint' }) hint = '';

  /**
   * Browser autofill family. When set to `bday`, the three fields receive `bday-day`, `bday-month`, and
   * `bday-year` respectively. The field-agnostic directives `off` and `on` are applied to all three fields.
   * Any other value is forwarded only to the year field.
   */
  @property() autocomplete = '';

  /** Earliest selectable date as `YYYY-MM-DD`. */
  @property({ reflect: true }) min = '';

  /** Latest selectable date as `YYYY-MM-DD`. */
  @property({ reflect: true }) max = '';

  /** BCP-47 locale override. When empty, the inherited `lang` attribute is used. */
  @property({ reflect: true }) locale = '';

  /** Only required for SSR. Set to `true` if you're slotting in a `label` element. */
  @property({ attribute: 'with-label', type: Boolean }) withLabel = false;

  /** Only required for SSR. Set to `true` if you're slotting in a `hint` element. */
  @property({ attribute: 'with-hint', type: Boolean }) withHint = false;

  //
  // Lifecycle
  //

  firstUpdated() {
    if (this.pendingValue != null) {
      this._value = this.pendingValue;
      this.pendingValue = null;
    } else if (!this._value && this.defaultValue) {
      this._value = this.defaultValue;
    }
    this.syncPartsFromCanonical();
    // `MirrorValidator` reads `this.input` to mirror the hidden native `<input type="date">`'s constraint
    // validity (min/max/required/valid-date). Unlike the picker siblings — which use `RequiredValidator` and
    // therefore never set `this.input` — this control depends on this assignment. `validationTarget` is still
    // overridden so the validation *popup* anchors on a visible field rather than the hidden mirror.
    this.input = this.valueInput;
    this.updateValidity();
    this.lastEmittedValue = this._value;
  }

  protected updated(changed: Map<string, unknown>) {
    super.updated?.(changed as never);
    if (changed.has('value')) {
      this.customStates.set('blank', !this._value);
    }
  }

  //
  // Public API
  //

  /** Focuses the first empty field, or the first field when all are filled. */
  focus(options?: FocusOptions) {
    const target = this.firstFocusableInput();
    target?.focus(options);
  }

  /** Removes focus from the known date. */
  blur() {
    const active = this.shadowRoot?.activeElement as HTMLElement | null;
    active?.blur();
  }

  /** The committed value as a `Date`, or `null` when the value is empty/invalid. */
  get valueAsDate(): Date | null {
    if (!this._value) return null;
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(this._value);
    if (!match) return null;
    return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  }

  /**
   * Anchor native validation popups on a real visible input. The hidden mirror handles form data, but
   * anchoring a popup on `display: none` content would render it at offset (0, 0).
   */
  get validationTarget(): HTMLElement | undefined {
    if (!this.shadowRoot) return undefined;
    const inputs = Array.from(this.shadowRoot.querySelectorAll<HTMLInputElement>('input[part~="field-input"]'));
    if (inputs.length === 0) return undefined;
    // Prefer the first empty field — that's the one the user needs to fix when partial.
    for (const field of this.fieldOrder()) {
      if (this.parts[field] === '') {
        const el = inputs.find(i => i.dataset.field === field);
        if (el) return el;
      }
    }
    return inputs[0];
  }

  //
  // Form association
  //

  formResetCallback() {
    this._value = this.defaultValue;
    this.valueHasChanged = false;
    this.syncPartsFromCanonical();
    super.formResetCallback();
    this.lastEmittedValue = this._value;
    this.requestUpdate();
  }

  formStateRestoreCallback(state: string | File | FormData | null) {
    if (typeof state === 'string') {
      // Route through the value setter so `valueHasChanged`, `pendingValue` (pre-first-update), and part syncing
      // are all handled consistently.
      this.value = state;
    }
    this.updateValidity();
  }

  //
  // Internal helpers
  //

  private get resolvedLocale(): string {
    return this.locale || this.localize.lang() || 'en';
  }

  private fieldOrder(): SegmentField[] {
    return localeFieldOrder(this.resolvedLocale);
  }

  private normalizeIncomingValue(val: unknown): string {
    if (val == null) return '';
    if (val instanceof Date) {
      const y = String(val.getFullYear()).padStart(4, '0');
      const m = String(val.getMonth() + 1).padStart(2, '0');
      const d = String(val.getDate()).padStart(2, '0');
      return `${y}-${m}-${d}`;
    }
    if (typeof val === 'string') {
      // Round-trip through parts to enforce the canonical 4-2-2 shape and reject invalid calendar dates.
      const parts = isoToParts(val);
      return partsToIso(parts);
    }
    return '';
  }

  private syncPartsFromCanonical() {
    this.parts = isoToParts(this._value);
    this.updateHiddenInput();
  }

  private updateHiddenInput() {
    if (this.valueInput) {
      this.valueInput.value = this._value;
    }
    // setValue(null) when blank — matches <wa-date-input> so FormData omits the entry instead of
    // submitting `name=`.
    this.setValue(this._value || null);
  }

  private recomputeValue() {
    const oldValue = this._value;
    const newValue = partsToIso(this.parts);

    if (newValue !== oldValue) {
      this._value = newValue;
      this.valueHasChanged = true;
      this.updateHiddenInput();
      this.updateValidity();
    }

    this.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));

    if (newValue !== this.lastEmittedValue) {
      this.lastEmittedValue = newValue;
      this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    }
  }

  private firstFocusableInput(): HTMLInputElement | undefined {
    if (!this.shadowRoot) return undefined;
    const inputs = Array.from(this.shadowRoot.querySelectorAll<HTMLInputElement>('input[part~="field-input"]'));
    for (const field of this.fieldOrder()) {
      if (this.parts[field] === '') {
        const el = inputs.find(i => i.dataset.field === field);
        if (el) return el;
      }
    }
    return inputs[0];
  }

  private autocompleteFor(field: SegmentField): string | undefined {
    const family = this.autocomplete.trim();
    if (!family) return undefined;
    if (family === 'bday') {
      if (field === 'day') return 'bday-day';
      if (field === 'month') return 'bday-month';
      return 'bday-year';
    }
    // `off` and `on` are field-agnostic directives, so they apply to all three inputs. Any other family
    // (e.g. an arbitrary token) only makes sense on the year field, where a full value would land.
    if (family === 'off' || family === 'on') return family;
    return field === 'year' ? family : undefined;
  }

  //
  // Field handlers
  //

  private handleFieldInput = (event: InputEvent) => {
    if (this.readonly) return;
    const target = event.currentTarget as HTMLInputElement;
    const field = target.dataset.field as SegmentField;
    const max = field === 'year' ? 4 : 2;
    const sanitized = target.value.replace(/\D/g, '').slice(0, max);
    if (sanitized !== target.value) target.value = sanitized;
    this.parts = { ...this.parts, [field]: sanitized };
    this.recomputeValue();
    this.requestUpdate();
  };

  //
  // Render
  //

  render() {
    const hasLabelSlot = this.hasUpdated ? this.hasSlotController.test('label') : this.withLabel;
    const hasHintSlot = this.hasUpdated ? this.hasSlotController.test('hint') : this.withHint;
    const hasLabel = !!this.label || !!hasLabelSlot;
    const hasHint = !!this.hint || !!hasHintSlot;
    const groupAriaLabel = this.label || this.localize.term('date') || 'Date';

    const userInvalid = !isServer && this.customStates.has('user-invalid');
    const errorMessage = userInvalid ? this.validationMessage : '';
    const showError = userInvalid && !!errorMessage;

    const describedBy = [hasHint ? this.hintId : null, showError ? this.errorId : null].filter(Boolean).join(' ');

    const fields = this.fieldOrder().map(field => this.renderField(field, describedBy, userInvalid));

    const groupContent = html`
      <div part="base form-control-input fields" class="fields">${fields}</div>

      <slot
        name="hint"
        part="hint"
        id=${this.hintId}
        class=${classMap({ hint: true, 'has-slotted': hasHint })}
        aria-hidden=${hasHint ? 'false' : 'true'}
      >
        ${this.hint}
      </slot>

      <div part="error" id=${this.errorId} class="error" role="alert" aria-live="polite" ?hidden=${!showError}>
        ${errorMessage}
      </div>
    `;

    return html`
      <div
        part="form-control"
        class=${classMap({
          'form-control': true,
          'form-control-has-label': hasLabel,
        })}
      >
        ${hasLabel
          ? html`<fieldset part="fieldset" class="fieldset">
              <legend part="legend">
                <span part="form-control-label label" class="label">
                  <slot name="label">${this.label}</slot>
                </span>
              </legend>
              ${groupContent}
            </fieldset>`
          : html`<div part="fieldset" class="fieldset" role="group" aria-label=${groupAriaLabel}>${groupContent}</div>`}

        <input
          class="value-input"
          type="date"
          tabindex="-1"
          aria-hidden="true"
          .value=${this._value}
          min=${ifDefined(this.min || undefined)}
          max=${ifDefined(this.max || undefined)}
          ?disabled=${this.disabled}
          ?required=${this.required}
        />
      </div>
    `;
  }

  private renderField(field: SegmentField, describedBy: string, userInvalid: boolean) {
    const fieldId = `${this.groupId}-${field}`;
    const value = this.parts[field];
    const autocompleteAttr = this.autocompleteFor(field);
    const ariaInvalid = userInvalid ? 'true' : undefined;
    const fieldLabel = this.localize.term(field) || (field === 'day' ? 'Day' : field === 'month' ? 'Month' : 'Year');

    return html`
      <div part="field field-${field}" class=${classMap({ field: true, [`field-${field}`]: true })}>
        <input
          id=${fieldId}
          part="field-input"
          class="field-input"
          type="text"
          inputmode="numeric"
          pattern="[0-9]*"
          maxlength=${field === 'year' ? 4 : 2}
          data-field=${field}
          autocomplete=${ifDefined(autocompleteAttr)}
          aria-describedby=${ifDefined(describedBy || undefined)}
          aria-invalid=${ifDefined(ariaInvalid)}
          aria-required=${this.required ? 'true' : 'false'}
          .value=${live(value)}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          @input=${this.handleFieldInput}
        />
        <label part="field-label" class="field-label" for=${fieldId}>${fieldLabel}</label>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-known-date': WaKnownDate;
  }
}
