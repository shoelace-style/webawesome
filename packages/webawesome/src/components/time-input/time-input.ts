import { html, isServer, nothing } from 'lit';
import type { TemplateResult } from 'lit-html';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import '../../components/popup/popup.js';
import type WaPopup from '../../components/popup/popup.js';
import { WaAfterHideEvent } from '../../events/after-hide.js';
import { WaAfterShowEvent } from '../../events/after-show.js';
import { WaClearEvent } from '../../events/clear.js';
import { WaHideEvent } from '../../events/hide.js';
import { WaShowEvent } from '../../events/show.js';
import { animateWithClass } from '../../internal/animate.js';
import { isTopDismissible, registerDismissible, unregisterDismissible } from '../../internal/dismissible-stack.js';
import { waitForEvent } from '../../internal/event.js';
import { SegmentedFieldController } from '../../internal/segmented-field/segmented-field-controller.js';
import { warnDeprecatedSize } from '../../internal/size.js';
import { HasSlotController } from '../../internal/slot.js';
import { MirrorValidator } from '../../internal/validators/mirror-validator.js';
import { RequiredValidator } from '../../internal/validators/required-validator.js';
import { watch } from '../../internal/watch.js';
import { WebAwesomeFormAssociatedElement } from '../../internal/webawesome-form-associated-element.js';
import formControlStyles from '../../styles/component/form-control.styles.js';
import sizeStyles from '../../styles/component/size.styles.js';
import { LocalizeController } from '../../utilities/localize.js';
import {
  buildTimeSegmentLayout,
  dayPeriodFromKey,
  formatDayPeriod,
  formatTimeSegmentText,
  isTimeEmpty,
  resolveHour12,
  timeSegmentRules,
  timeSegmentsToWire,
  wireToTimeSegments,
  withSecondsForStep,
  type TimeField,
  type TimeSegments,
} from './internal/time-segments.js';
import styles from './time-input.styles.js';

export type WaTimeInputSize = 'xs' | 's' | 'm' | 'l' | 'xl';
export type WaTimeInputPlacement = 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end';
export type WaTimeInputHourFormat = 'auto' | '12' | '24';

let uniqueId = 0;
const generateId = (): string => `wa-time-input-${++uniqueId}`;

const SINGLE_GROUP = 'single';

/**
 * @summary Time pickers let users enter a time through a segmented field or select one visually from a popup column
 *  picker. They support 12- and 24-hour formats, optional seconds, and locale-aware segment order.
 * @documentation https://webawesome.com/docs/components/time-input
 * @status experimental
 * @since 3.8
 *
 * @dependency wa-icon
 * @dependency wa-popup
 *
 * @slot label - The time picker's label. Alternatively, use the `label` attribute.
 * @slot hint - Text that describes how to use the time picker. Alternatively, use the `hint` attribute.
 * @slot start - An element placed at the start of the input.
 * @slot end - An element placed at the end of the input.
 * @slot clear-icon - An icon to use in lieu of the default clear icon.
 * @slot expand-icon - The icon to show on the popup toggle button. Defaults to a clock icon.
 * @slot footer - Content shown below the column picker in the popup. Replaces the default Now button when present.
 *
 * @event change - Emitted when the committed value changes.
 * @event input - Emitted as the user types into a segment or interacts with the popup columns.
 * @event focus - Emitted when the control receives focus.
 * @event blur - Emitted when the control loses focus.
 * @event wa-clear - Emitted when the clear button is activated.
 * @event wa-show - Emitted when the popup is about to open. Cancelable.
 * @event wa-after-show - Emitted after the popup opens and animations complete.
 * @event wa-hide - Emitted when the popup is about to close. Cancelable.
 * @event wa-after-hide - Emitted after the popup closes and animations complete.
 * @event wa-invalid - Emitted when the form control has been checked for validity and its constraints aren't satisfied.
 *
 * @csspart form-control - The form control that wraps the label, input, and hint.
 * @csspart form-control-label - The label's wrapper.
 * @csspart form-control-input - The input's wrapper.
 * @csspart hint - The hint's wrapper.
 * @csspart base - The component's base wrapper.
 * @csspart input-wrapper - The container around the start slot, segmented input, clear button, and expand button.
 * @csspart start - The container that wraps the `start` slot.
 * @csspart end - The container that wraps the `end` slot.
 * @csspart input - The segmented input group.
 * @csspart segment - Each editable segment (hour/minute/second/AM-PM spinbutton). Use `[part~="segment"]` to style all.
 * @csspart segment-literal - Inert literal text between segments (separators).
 * @csspart clear-button - The clear button.
 * @csspart expand-button - The popup toggle button.
 * @csspart expand-icon - The expand icon wrapper.
 * @csspart popup - The popup container.
 * @csspart columns - The row of column listboxes inside the popup.
 * @csspart column - Each column listbox.
 * @csspart column-item - Each option inside a column.
 * @csspart column-item-selected - The currently selected option inside a column.
 * @csspart now-button - The default "Now" button rendered in the popup footer when `with-now` is set.
 *
 * @cssproperty [--show-duration=var(--wa-transition-fast)] - The duration of the show animation.
 * @cssproperty [--hide-duration=var(--wa-transition-fast)] - The duration of the hide animation.
 * @cssproperty [--column-item-height=2.25em] - Height of each option inside a popup column.
 * @cssproperty [--column-width=3em] - Width of each popup column.
 *
 * @cssstate blank - The time picker has no committed value.
 * @cssstate open - The popup is open.
 * @cssstate disabled - The time picker is disabled.
 */
@customElement('wa-time-input')
export default class WaTimeInput extends WebAwesomeFormAssociatedElement {
  static css = [sizeStyles, formControlStyles, styles];

  static shadowRootOptions = {
    ...WebAwesomeFormAssociatedElement.shadowRootOptions,
    delegatesFocus: true,
  };

  static get validators() {
    const validators = isServer
      ? []
      : [
          RequiredValidator({
            validationElement: Object.assign(document.createElement('input'), { required: true }),
          }),
          // Mirrors the hidden native `<input type="time">` so its min/max/step constraints (including
          // reversed/overnight ranges) surface as rangeUnderflow/rangeOverflow/stepMismatch validity.
          MirrorValidator(),
        ];
    return [...super.validators, ...validators];
  }

  /** Every segment edit dispatches `input`, so a single observed `input` event marks the field as interacted with. */
  assumeInteractionOn = ['input'];

  private readonly hasSlotController = new HasSlotController(this, 'hint', 'label', 'footer');
  private readonly localize = new LocalizeController(this);
  private readonly popupId = generateId();
  private readonly keyboardHelpId = `${this.popupId}-help`;

  private pendingValue: string | null = null;
  /** When true, the next `show()` will move focus into the first popup column (set by Alt+ArrowDown). */
  private moveFocusToColumnOnShow = false;
  /** Debounces duplicate `change` events when the value hasn't transitioned. */
  private lastEmittedValue = '';

  @query('.time-input-popup') popup!: WaPopup;
  @query('.value-input') valueInput!: HTMLInputElement;

  /** The segments displayed in the input and popup. The wire value is derived from these. */
  @state() private segments: TimeSegments = { hour: null, minute: null, second: null, dayPeriod: null };

  /**
   * Generic segmented-input plumbing. Owns per-segment digit buffers, roving tabindex, navigation keys
   * (arrows / Home / End / Tab flush / Backspace / Delete), and separator advance. Time-specific rules
   * (per-field digit semantics, wraparound stepping, layout derivation) are plugged in below.
   */
  private readonly segmentsController = new SegmentedFieldController(this, {
    getLayout: () => this.getLayout(),
    isRtl: () => this.isRtl,
    isReadonly: () => this.readonly,
    isDisabled: () => this.disabled,
    rules: timeSegmentRules({
      getSegments: () => this.segments,
      setSegments: (_group, next) => {
        this.segments = next;
      },
      hour12: () => this.resolvedHour12,
    }),
    onCommit: () => {
      this.recomputeValue();
      this.requestUpdate();
    },
  });

  /** Localized term lookup. Falls back to the English string if a locale hasn't translated the key yet. */
  private term(
    key:
      | 'am'
      | 'chooseTime'
      | 'closeTimeInput'
      | 'dayPeriod'
      | 'empty'
      | 'hour'
      | 'minute'
      | 'now'
      | 'pm'
      | 'second'
      | 'time'
      | 'timeInputKeyboardHelp',
    fallback: string,
  ): string {
    return this.localize.term(key) || fallback;
  }

  get validationTarget() {
    return this.valueInput;
  }

  //
  // Properties
  //

  /** The time picker's name, submitted as a name/value pair with form data. */
  @property({ reflect: true, useDefault: true }) name = '';

  private _value = '';

  /**
   * The time picker's value as a wire-format string matching HTML `<input type="time">`: `HH:mm`, `HH:mm:ss`, or
   * `HH:mm:ss.sss` (always 24-hour). The setter also accepts a `Date` (extracts local h/m/s) or `null`.
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
      this.syncSegmentsFromCanonical();
    } else {
      this.pendingValue = this._value;
    }
    this.requestUpdate('value', oldValue);
  }

  /** The default value of the form control. Used for form reset. */
  @property({ attribute: 'value', reflect: true, useDefault: true }) defaultValue: string = this.getAttribute('value') ?? '';

  /** Disables the time picker. */
  @property({ type: Boolean }) disabled = false;

  /** Makes the time picker required for form submission. */
  @property({ type: Boolean, reflect: true }) required = false;

  /** Makes the input non-editable. The popup still opens for browsing. */
  @property({ type: Boolean, reflect: true }) readonly = false;

  /** The time picker's size. */
  @property({ reflect: true, useDefault: true }) size: WaTimeInputSize | 'small' | 'medium' | 'large' = 'm';

  @watch('size')
  handleSizeChange() {
    warnDeprecatedSize(this.localName, this.size);
  }

  /** The time picker's visual appearance. */
  @property({ reflect: true, useDefault: true }) appearance: 'filled' | 'outlined' | 'filled-outlined' = 'outlined';

  /** Draws a pill-style time picker with rounded edges. */
  @property({ type: Boolean, reflect: true }) pill = false;

  /** The time picker's label. If you need to display HTML, use the `label` slot instead. */
  @property() label = '';

  /** The time picker's hint. If you need to display HTML, use the `hint` slot instead. */
  @property({ attribute: 'hint' }) hint = '';

  /** Forwarded to the hidden form input to enable browser autofill (`on`/`off`/custom tokens). */
  @property() autocomplete = '';

  /** Shows a clear button when the time picker has a value. */
  @property({ attribute: 'with-clear', type: Boolean }) withClear = false;

  /** Renders a "Now" button in the popup footer. */
  @property({ attribute: 'with-now', type: Boolean }) withNow = false;

  /** Only required for SSR. Set to `true` if you're slotting in a `label` element. */
  @property({ attribute: 'with-label', type: Boolean }) withLabel = false;

  /** Only required for SSR. Set to `true` if you're slotting in a `hint` element. */
  @property({ attribute: 'with-hint', type: Boolean }) withHint = false;

  //
  // Time-input specific
  //

  /**
   * The earliest selectable time in wire format. May be later than `max` to represent an overnight range. The picker
   * delegates reversed-range semantics to the mirrored native `<input type="time">`.
   */
  @property({ reflect: true, useDefault: true }) min = '';

  /** The latest selectable time in wire format. */
  @property({ reflect: true, useDefault: true }) max = '';

  /**
   * The granularity, in seconds, matching HTML `<input type="time">`. Default `60` hides the seconds segment.
   * Values below 60 reveal the seconds segment. `'any'` disables `stepMismatch` enforcement.
   */
  @property({ converter: { fromAttribute: stepFromAttribute, toAttribute: stepToAttribute } })
  step: number | 'any' = 60;

  /** Whether the UI uses a 12-hour or 24-hour clock. `auto` follows the resolved locale. */
  @property({ attribute: 'hour-format', reflect: true, useDefault: true }) hourFormat: WaTimeInputHourFormat = 'auto';

  //
  // Popup
  //

  /** Whether the popup is open. */
  @property({ type: Boolean, reflect: true }) open = false;

  /** Preferred popup placement. */
  @property({ reflect: true, useDefault: true }) placement: WaTimeInputPlacement = 'bottom-start';

  /** Distance in pixels between the popup and the input. */
  @property({ type: Number, reflect: true }) distance = 0;

  //
  // Lifecycle
  //

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeOpenListeners();
  }

  firstUpdated() {
    if (this.pendingValue != null) {
      this._value = this.pendingValue;
      this.pendingValue = null;
    } else if (!this._value && this.defaultValue) {
      this._value = this.defaultValue;
    }
    this.syncSegmentsFromCanonical();
    // `MirrorValidator` reads `this.input` to mirror the hidden native `<input type="time">`'s min/max/step
    // constraint validity. `validationTarget` still points at the same element so the popup anchors correctly.
    this.input = this.valueInput;
    this.updateValidity();
    this.lastEmittedValue = this._value;
  }

  protected updated(changed: Map<string, unknown>) {
    super.updated?.(changed as never);
    if (changed.has('value')) {
      this.customStates.set('blank', !this.value);
    }
    if (changed.has('disabled')) {
      this.customStates.set('disabled', this.disabled);
    }
    if (changed.has('open')) {
      this.customStates.set('open', this.open);
    }
    if (changed.has('step') || changed.has('hourFormat')) {
      // Step or hour-format change can change which segments are visible. Resync from the canonical value so any
      // newly-required segments (e.g. seconds) populate.
      this.syncSegmentsFromCanonical();
    }
    if (changed.has('min') || changed.has('max') || changed.has('step')) {
      // MirrorValidator reads the native input's constraint attributes, which are bound during render. Revalidate
      // after render so a reactive min/max/step change is reflected in validity (willUpdate runs pre-render).
      this.updateValidity();
    }
  }

  @watch('disabled', { waitUntilFirstUpdate: true })
  handleDisabledChange() {
    if (this.disabled && this.open) {
      this.open = false;
    }
  }

  @watch('open', { waitUntilFirstUpdate: true })
  async handleOpenChange() {
    if (this.open && !this.disabled) {
      const showEvent = new WaShowEvent();
      this.dispatchEvent(showEvent);
      if (showEvent.defaultPrevented) {
        this.open = false;
        return;
      }
      this.addOpenListeners();
      this.popup.active = true;
      await this.updateComplete;
      await animateWithClass(this.popup.popup, 'show');
      // Center each column on its current value.
      this.scrollColumnsToCurrent();
      if (this.moveFocusToColumnOnShow) {
        this.moveFocusToColumnOnShow = false;
        this.focusFirstColumn();
      }
      this.dispatchEvent(new WaAfterShowEvent());
    } else {
      const hideEvent = new WaHideEvent();
      this.dispatchEvent(hideEvent);
      if (hideEvent.defaultPrevented) {
        this.open = true;
        return;
      }
      this.removeOpenListeners();
      await animateWithClass(this.popup.popup, 'hide');
      this.popup.active = false;
      this.dispatchEvent(new WaAfterHideEvent());
      // If focus is in the popup, return it to the active segment.
      const active = this.shadowRoot?.activeElement;
      if (active && this.popup?.contains(active)) {
        this.focusActiveSegment();
      }
    }
  }

  //
  // Public API
  //

  /** Sets focus on the first empty (else first) segment. */
  focus(options?: FocusOptions) {
    const target = this.segmentsController.findFocusableSegment((_g, f) => this.segments[f as TimeField] == null);
    target?.focus(options);
  }

  /** Removes focus from the time picker. */
  blur() {
    const active = this.shadowRoot?.activeElement as HTMLElement | null;
    active?.blur();
  }

  /** Opens the popup. */
  async show(): Promise<void> {
    if (this.open || this.disabled) return;
    this.open = true;
    await waitForEvent(this, 'wa-after-show');
  }

  /** Closes the popup. */
  async hide(): Promise<void> {
    if (!this.open || this.disabled) return;
    this.open = false;
    await waitForEvent(this, 'wa-after-hide');
  }

  /** The time as a `Date` (today + wire value), or `null` when empty. */
  get valueAsDate(): Date | null {
    const value = this.value;
    if (!value) return null;
    const segments = wireToTimeSegments(value, { hour12: false, withSeconds: this.resolvedWithSeconds });
    if (segments.hour == null || segments.minute == null) return null;
    const d = new Date();
    d.setHours(segments.hour, segments.minute, segments.second ?? 0, 0);
    return d;
  }

  /** Milliseconds since midnight, or `NaN` when empty. */
  get valueAsNumber(): number {
    const d = this.valueAsDate;
    if (!d) return Number.NaN;
    return d.getHours() * 3_600_000 + d.getMinutes() * 60_000 + d.getSeconds() * 1000;
  }

  //
  // Form association
  //

  formResetCallback() {
    this._value = this.defaultValue;
    this.valueHasChanged = false;
    this.segmentsController.clearBuffers();
    this.syncSegmentsFromCanonical();
    super.formResetCallback();
    this.lastEmittedValue = this._value;
    this.requestUpdate();
  }

  formStateRestoreCallback(state: string | File | FormData | null) {
    if (typeof state === 'string') {
      this._value = state;
      if (this.hasUpdated) {
        this.syncSegmentsFromCanonical();
      } else {
        this.pendingValue = state;
      }
      this.requestUpdate();
    }
    this.updateValidity();
  }

  //
  // Internal helpers
  //

  private get resolvedLocale(): string {
    return this.localize.lang() || 'en';
  }

  private get isRtl(): boolean {
    return this.localize.dir() === 'rtl';
  }

  /** Final hour12 decision: `auto` defers to the locale; explicit `'12'` / `'24'` overrides. */
  private get resolvedHour12(): boolean {
    if (this.hourFormat === '12') return true;
    if (this.hourFormat === '24') return false;
    return resolveHour12(this.resolvedLocale);
  }

  /** Whether the seconds segment is shown given the current `step` value. */
  private get resolvedWithSeconds(): boolean {
    return withSecondsForStep(this.step);
  }

  private getLayout() {
    return buildTimeSegmentLayout(this.resolvedLocale, {
      hour12: this.resolvedHour12,
      withSeconds: this.resolvedWithSeconds,
    });
  }

  private normalizeIncomingValue(val: unknown): string {
    if (val == null) return '';
    if (typeof val === 'string') return val;
    if (val instanceof Date) {
      const hh = String(val.getHours()).padStart(2, '0');
      const mm = String(val.getMinutes()).padStart(2, '0');
      const ss = String(val.getSeconds()).padStart(2, '0');
      return this.resolvedWithSeconds ? `${hh}:${mm}:${ss}` : `${hh}:${mm}`;
    }
    return '';
  }

  /** Recompute the segment state from the canonical `_value`. Discards any in-progress digit buffers. */
  private syncSegmentsFromCanonical() {
    this.segmentsController.clearBuffers();
    this.segments = wireToTimeSegments(this._value, {
      hour12: this.resolvedHour12,
      withSeconds: this.resolvedWithSeconds,
    });
    this.updateHiddenInput();
  }

  private updateHiddenInput() {
    if (this.valueInput) {
      this.valueInput.value = this._value;
    }
    this.setValue(this._value || null);
  }

  /**
   * Recompute the canonical value from the current segments. Fires `input` always, and `change` when the value
   * transitions, matching `<input type="time">` semantics.
   */
  private recomputeValue() {
    const oldValue = this._value;
    const newValue = timeSegmentsToWire(this.segments, {
      hour12: this.resolvedHour12,
      withSeconds: this.resolvedWithSeconds,
    });

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

  //
  // Popup listeners
  //

  private addOpenListeners() {
    document.addEventListener('focusin', this.handleDocumentFocusIn);
    document.addEventListener('keydown', this.handleDocumentKeyDown);
    document.addEventListener('mousedown', this.handleDocumentMouseDown);
    registerDismissible(this);
  }

  private removeOpenListeners() {
    document.removeEventListener('focusin', this.handleDocumentFocusIn);
    document.removeEventListener('keydown', this.handleDocumentKeyDown);
    document.removeEventListener('mousedown', this.handleDocumentMouseDown);
    unregisterDismissible(this);
  }

  private handleDocumentFocusIn = (event: Event) => {
    const path = event.composedPath();
    if (!path.includes(this)) this.hide();
  };

  private handleDocumentKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && this.open && isTopDismissible(this)) {
      event.stopPropagation();
      event.preventDefault();
      this.hide();
    }
  };

  private handleDocumentMouseDown = (event: MouseEvent) => {
    const path = event.composedPath();
    if (!path.includes(this)) this.hide();
  };

  //
  // Segment focus restore
  //

  private focusActiveSegment() {
    const active = this.segmentsController.getActiveSegment();
    if (active) {
      const el = this.segmentsController.segmentElementFor(active.group, active.field);
      if (el) {
        el.focus({ preventScroll: true });
        return;
      }
    }
    this.segmentsController
      .findFocusableSegment((_g, f) => this.segments[f as TimeField] == null)
      ?.focus({ preventScroll: true });
  }

  //
  // Segment input handlers
  //
  // The popup opens on a pointer click into the field but NOT when focus arrives via Tab, since that would
  // interfere with tab order. Opening is also explicit via the toggle button or Alt+ArrowDown.

  private handleSegmentFocus = (event: FocusEvent) => {
    this.segmentsController.eventHandlers().focus(event);
  };

  private handleSegmentBlur = (event: FocusEvent) => {
    this.segmentsController.eventHandlers().blur(event);
  };

  private handleInputWrapperPointerDown = (event: PointerEvent) => {
    if (this.disabled || this.readonly || this.open) return;
    // Don't auto-open when the click lands on (or inside) an interactive control in the wrapper (clear button,
    // toggle button, slotted action). Those have their own click semantics and we'd race them. We walk the full
    // composed path so we still catch the case where the click target is inside a nested shadow root (e.g. the
    // <wa-icon> slotted into the toggle button).
    for (const node of event.composedPath()) {
      if (node === this) break;
      if (!(node instanceof Element)) continue;
      const tag = node.tagName;
      if (tag === 'BUTTON' || tag === 'A' || node.getAttribute('role') === 'button') return;
    }
    this.show();
  };

  private handleSegmentKeyDown = (event: KeyboardEvent) => {
    const el = event.currentTarget as HTMLElement;
    const field = el.dataset.segment as TimeField;

    // Popup-specific shortcuts the controller doesn't know about.
    if (event.altKey && event.key === 'ArrowDown') {
      event.preventDefault();
      this.moveFocusToColumnOnShow = true;
      if (this.open) {
        this.focusFirstColumn();
      } else {
        this.show();
      }
      return;
    }
    if (event.altKey && event.key === 'ArrowUp') {
      event.preventDefault();
      this.hide();
      return;
    }
    if (event.key === 'Enter') {
      event.preventDefault();
      if (this.segmentsController.getBuffer(SINGLE_GROUP, field)) {
        this.segmentsController.flushBuffer(SINGLE_GROUP, field);
        this.recomputeValue();
      }
      if (this.open) this.hide();
      return;
    }

    // AM/PM letter shortcuts on the dayPeriod segment.
    if (field === 'dayPeriod') {
      const period = dayPeriodFromKey(event.key);
      if (period != null) {
        event.preventDefault();
        if (this.readonly) return;
        this.segments = { ...this.segments, dayPeriod: period };
        this.recomputeValue();
        this.requestUpdate();
        this.segmentsController.moveFocus(el, 1);
        return;
      }
    }

    // Everything else: delegate to the controller.
    this.segmentsController.eventHandlers().keydown(event);
  };

  //
  // Other handlers
  //

  private handleExpandButtonClick = () => {
    if (this.open) {
      this.hide();
    } else {
      this.moveFocusToColumnOnShow = true;
      this.show();
    }
  };

  private handleClearClick = (event: MouseEvent) => {
    event.stopPropagation();
    if (!this._value && isTimeEmpty(this.segments)) return;
    this._value = '';
    this.valueHasChanged = true;
    this.segmentsController.clearBuffers();
    this.syncSegmentsFromCanonical();
    this.updateValidity();
    this.dispatchEvent(new WaClearEvent());
    this.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    this.lastEmittedValue = '';
    this.focus();
  };

  private handleClearMouseDown = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  private handleNowClick = () => {
    const now = new Date();
    this.value = now;
    // `value` setter is async via update queue; emit input/change immediately for the gesture.
    this.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    this.lastEmittedValue = this._value;
    this.hide();
  };

  //
  // Popup columns
  //

  /** Field list for the visible columns, based on the resolved layout. */
  private get columnFields(): TimeField[] {
    return this.getLayout().order.filter(f => f !== undefined) as TimeField[];
  }

  private columnItemsFor(field: TimeField): Array<{ label: string; value: number; disabled: boolean }> {
    if (field === 'dayPeriod') {
      return [
        { label: this.term('am', formatDayPeriod(this.resolvedLocale, 0)), value: 0, disabled: false },
        { label: this.term('pm', formatDayPeriod(this.resolvedLocale, 1)), value: 1, disabled: false },
      ];
    }
    // Hour / minute / second: numeric range, possibly stepped.
    if (field === 'hour') {
      const items: Array<{ label: string; value: number; disabled: boolean }> = [];
      if (this.resolvedHour12) {
        for (let h = 1; h <= 12; h++) items.push({ label: String(h).padStart(2, '0'), value: h, disabled: false });
      } else {
        for (let h = 0; h <= 23; h++) items.push({ label: String(h).padStart(2, '0'), value: h, disabled: false });
      }
      return items;
    }
    // Minute / second: 0–59. Stride is derived from `step` (in seconds) per the HTML spec. For the minute column we use
    // `step / 60` when step ≥ 60 (multi-minute), else stride 1; for the second column we use `step` directly when
    // step < 60.
    const stepSec = typeof this.step === 'number' && Number.isFinite(this.step) && this.step > 0 ? this.step : 1;
    const stride =
      field === 'minute'
        ? stepSec < 60
          ? 1
          : Math.max(1, Math.floor(stepSec / 60))
        : Math.max(1, Math.floor(stepSec));
    const items: Array<{ label: string; value: number; disabled: boolean }> = [];
    for (let v = 0; v < 60; v += stride) {
      items.push({ label: String(v).padStart(2, '0'), value: v, disabled: false });
    }
    return items;
  }

  private focusFirstColumn() {
    if (!this.shadowRoot) return;
    const first = this.shadowRoot.querySelector<HTMLElement>('.column');
    first?.focus({ preventScroll: true });
  }

  private scrollColumnsToCurrent() {
    if (!this.shadowRoot) return;
    for (const column of this.shadowRoot.querySelectorAll<HTMLElement>('.column')) {
      const field = column.dataset.field as TimeField;
      const value = this.segments[field];
      if (value == null) continue;
      const item = column.querySelector<HTMLElement>(`[data-value="${value}"]`);
      if (item) this.keepItemInView(column, item);
    }
  }

  /**
   * Scroll `column` only as far as needed to keep `item` in view. Equivalent to `scrollIntoView({ block: 'nearest' })`
   * but scoped to the column so it can't scroll ancestors (the page, popup, etc.). Measured with
   * `getBoundingClientRect` because the items' `offsetParent` isn't the column.
   */
  private keepItemInView(column: HTMLElement, item: HTMLElement) {
    const columnRect = column.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    if (itemRect.top < columnRect.top) {
      column.scrollTop += itemRect.top - columnRect.top;
    } else if (itemRect.bottom > columnRect.bottom) {
      column.scrollTop += itemRect.bottom - columnRect.bottom;
    }
  }

  private handleColumnItemClick = (event: MouseEvent) => {
    const target = (event.target as HTMLElement).closest<HTMLElement>('.column-item');
    if (!target || target.getAttribute('aria-disabled') === 'true') return;
    const field = target.dataset.field as TimeField;
    const value = Number(target.dataset.value);
    if (Number.isNaN(value)) return;
    this.segments = { ...this.segments, [field]: value } as TimeSegments;
    this.recomputeValue();
    this.requestUpdate();
  };

  private handleColumnKeyDown = (event: KeyboardEvent) => {
    const column = event.currentTarget as HTMLElement;
    const field = column.dataset.field as TimeField;

    if (event.key === 'Escape') {
      event.preventDefault();
      this.hide();
      return;
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      this.hide();
      return;
    }

    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      const fields = this.columnFields;
      if (fields.length < 2) return;
      const delta = event.key === 'ArrowLeft' ? -1 : 1;
      const currentIdx = fields.indexOf(field);
      const nextIdx = (((currentIdx + delta) % fields.length) + fields.length) % fields.length;
      const nextField = fields[nextIdx];
      const nextColumn = this.shadowRoot?.querySelector<HTMLElement>(`.column[data-field="${nextField}"]`);
      nextColumn?.focus({ preventScroll: true });
      return;
    }

    if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'PageUp' || event.key === 'PageDown') {
      event.preventDefault();
      const delta = event.key === 'ArrowUp' || event.key === 'PageUp' ? -1 : 1;
      const jump = event.key === 'PageUp' || event.key === 'PageDown' ? 5 : 1;
      const items = this.columnItemsFor(field);
      if (items.length === 0) return;
      const currentValue = this.segments[field];
      const idx =
        currentValue == null
          ? 0
          : Math.max(
              0,
              items.findIndex(it => it.value === currentValue),
            );
      const nextIdx = (((idx + delta * jump) % items.length) + items.length) % items.length;
      const nextItem = items[nextIdx];
      this.segments = { ...this.segments, [field]: nextItem.value } as TimeSegments;
      this.recomputeValue();
      this.requestUpdate();
      // Scroll to keep the new item centered.
      requestAnimationFrame(() => {
        const itemEl = column.querySelector<HTMLElement>(`[data-value="${nextItem.value}"]`);
        if (itemEl) this.keepItemInView(column, itemEl);
      });
      return;
    }

    if (event.key === 'Home') {
      event.preventDefault();
      const items = this.columnItemsFor(field);
      if (items.length === 0) return;
      this.segments = { ...this.segments, [field]: items[0].value } as TimeSegments;
      this.recomputeValue();
      this.requestUpdate();
      return;
    }

    if (event.key === 'End') {
      event.preventDefault();
      const items = this.columnItemsFor(field);
      if (items.length === 0) return;

      const lastItem = items[items.length - 1];
      this.segments = { ...this.segments, [field]: lastItem.value } as TimeSegments;
      this.recomputeValue();
      this.requestUpdate();
      return;
    }
  };

  //
  // Segment placeholders / a11y labels
  //

  /** Visual placeholder rendered in an empty segment. Matches the native `<input type="time">` UI. */
  private placeholderFor(_field: TimeField): string {
    return '--';
  }

  /** Localized readable name of the field, used for the spinbutton's aria-label. */
  private fieldLabelFor(field: TimeField): string {
    const fallback =
      field === 'hour' ? 'Hour' : field === 'minute' ? 'Minute' : field === 'second' ? 'Second' : 'AM/PM';
    return this.term(field as 'hour' | 'minute' | 'second' | 'dayPeriod', fallback);
  }

  private segmentAriaValueText(field: TimeField): string {
    const value = this.segments[field];
    const buffer = this.segmentsController.getBuffer(SINGLE_GROUP, field);
    if (buffer) return buffer;
    if (value == null) return this.term('empty', 'Empty');
    if (field === 'dayPeriod') {
      return value === 0 ? this.term('am', 'AM') : this.term('pm', 'PM');
    }
    return String(value);
  }

  //
  // Render
  //

  render() {
    const hasLabelSlot = this.hasUpdated ? this.hasSlotController.test('label') : this.withLabel;
    const hasHintSlot = this.hasUpdated ? this.hasSlotController.test('hint') : this.withHint;
    const hasFooterSlot = this.hasUpdated ? this.hasSlotController.test('footer') : false;
    const hasLabel = !!this.label || !!hasLabelSlot;
    const hasHint = !!this.hint || !!hasHintSlot;
    const hasValue = !!this._value;
    const layout = this.getLayout();

    const groupAriaLabel = this.label || this.term('time', 'Time');

    return html`
      <div
        part="form-control"
        class=${classMap({
          'form-control': true,
          'form-control-has-label': hasLabel,
        })}
      >
        <label
          id="label"
          part="form-control-label label"
          class=${classMap({ label: true, 'has-label': hasLabel })}
          aria-hidden=${hasLabel ? 'false' : 'true'}
          @click=${() => this.focus()}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <wa-popup
            class=${classMap({ 'time-input-popup': true, open: this.open })}
            placement=${this.placement}
            distance=${this.distance}
            ?active=${this.open}
            flip
            shift
          >
            <div
              part="base input-wrapper"
              class="input-wrapper"
              slot="anchor"
              @pointerdown=${this.handleInputWrapperPointerDown}
            >
              <slot name="start" part="start" class="start"></slot>

              <div
                part="input"
                class="segments"
                role="group"
                aria-labelledby=${hasLabel ? 'label' : nothing}
                aria-label=${hasLabel ? nothing : groupAriaLabel}
              >
                ${this.renderSegmentGroup(layout)}
              </div>

              <span id=${this.keyboardHelpId} class="visually-hidden">
                ${this.term(
                  'timeInputKeyboardHelp',
                  'Use arrow keys to change values; press Alt+Down Arrow to open the time picker.',
                )}
              </span>

              <input
                class="value-input"
                type="time"
                tabindex="-1"
                aria-hidden="true"
                .value=${this._value}
                min=${ifDefined(this.min || undefined)}
                max=${ifDefined(this.max || undefined)}
                step=${ifDefined(this.step === 'any' ? 'any' : String(this.step))}
                ?disabled=${this.disabled}
                ?required=${this.required}
                autocomplete=${ifDefined(this.autocomplete || undefined)}
              />

              ${this.withClear && hasValue
                ? html`<button
                    part="clear-button"
                    type="button"
                    class="clear-button"
                    aria-label=${this.localize.term('clearEntry')}
                    tabindex="-1"
                    @mousedown=${this.handleClearMouseDown}
                    @click=${this.handleClearClick}
                  >
                    <slot name="clear-icon">
                      <wa-icon name="circle-xmark" library="system" variant="regular"></wa-icon>
                    </slot>
                  </button>`
                : nothing}

              <slot name="end" part="end" class="end"></slot>

              <button
                part="expand-button"
                type="button"
                class="expand-button"
                aria-label=${this.open
                  ? this.term('closeTimeInput', 'Close time picker')
                  : this.term('chooseTime', 'Choose time')}
                aria-haspopup="dialog"
                aria-expanded=${this.open ? 'true' : 'false'}
                aria-controls=${this.popupId}
                ?disabled=${this.disabled}
                @click=${this.handleExpandButtonClick}
              >
                <slot name="expand-icon" part="expand-icon" class="expand-icon">
                  <wa-icon library="system" name="clock"></wa-icon>
                </slot>
              </button>
            </div>

            <div
              id=${this.popupId}
              part="popup"
              class="popup-body"
              role="dialog"
              aria-modal="true"
              aria-label=${this.term('chooseTime', 'Choose time')}
            >
              <div part="columns" class="columns">${this.columnFields.map(f => this.renderColumn(f))}</div>
              ${hasFooterSlot
                ? html`<div class="popup-footer"><slot name="footer"></slot></div>`
                : this.withNow
                  ? html`<div class="popup-footer">
                      <button part="now-button" type="button" class="now-button" @click=${this.handleNowClick}>
                        ${this.term('now', 'Now')}
                      </button>
                    </div>`
                  : nothing}
            </div>
          </wa-popup>
        </div>

        <slot
          id="hint"
          name="hint"
          part="hint"
          class=${classMap({ 'has-slotted': hasHint })}
          aria-hidden=${hasHint ? 'false' : 'true'}
        >
          ${this.hint}
        </slot>
      </div>
    `;
  }

  private renderSegmentGroup(layout: ReturnType<typeof buildTimeSegmentLayout>): TemplateResult[] {
    const active = this.segmentsController.getActiveSegment();
    let tabAssigned = false;
    const nodes: TemplateResult[] = [];
    for (const token of layout.tokens) {
      if (token.kind === 'literal') {
        nodes.push(html`<span part="segment-literal" class="segment-literal" aria-hidden="true">${token.text}</span>`);
      } else {
        const field = token.field as TimeField;
        const isFirstActive = !tabAssigned && (active == null || active.field === field);
        if (isFirstActive) tabAssigned = true;
        nodes.push(this.renderSegment(field, isFirstActive));
      }
    }
    return nodes;
  }

  private renderSegment(field: TimeField, isTabStop: boolean): TemplateResult {
    const value = this.segments[field];
    const buffer = this.segmentsController.getBuffer(SINGLE_GROUP, field);
    const placeholder = this.placeholderFor(field);
    const display = formatTimeSegmentText(field, value, buffer, placeholder, this.resolvedLocale);
    const isEmptySegment = value == null && !buffer;
    const bounds =
      field === 'hour'
        ? this.resolvedHour12
          ? { min: 1, max: 12 }
          : { min: 0, max: 23 }
        : field === 'minute' || field === 'second'
          ? { min: 0, max: 59 }
          : { min: 0, max: 1 };
    const ariaValueText = this.segmentAriaValueText(field);

    return html`<span
      part="segment"
      class=${classMap({ segment: true, empty: isEmptySegment, [`segment-${field}`]: true })}
      data-group=${SINGLE_GROUP}
      data-segment=${field}
      role="spinbutton"
      tabindex=${this.disabled ? -1 : isTabStop ? 0 : -1}
      aria-label=${this.fieldLabelFor(field)}
      aria-valuemin=${bounds.min}
      aria-valuemax=${bounds.max}
      aria-valuenow=${ifDefined(value == null ? undefined : value)}
      aria-valuetext=${ariaValueText}
      aria-readonly=${this.readonly ? 'true' : 'false'}
      aria-disabled=${this.disabled ? 'true' : 'false'}
      aria-describedby=${this.keyboardHelpId}
      inputmode=${field === 'dayPeriod' ? 'text' : 'numeric'}
      @keydown=${this.handleSegmentKeyDown}
      @focus=${this.handleSegmentFocus}
      @blur=${this.handleSegmentBlur}
      >${display}</span
    >`;
  }

  private renderColumn(field: TimeField): TemplateResult {
    const items = this.columnItemsFor(field);
    const currentValue = this.segments[field];
    const activedescendantId = currentValue != null ? `${this.popupId}-${field}-${currentValue}` : undefined;
    return html`<div
      part="column column-${field}"
      class=${classMap({ column: true, [`column-${field}`]: true })}
      data-field=${field}
      role="listbox"
      tabindex="0"
      aria-label=${this.fieldLabelFor(field)}
      aria-orientation="vertical"
      aria-activedescendant=${ifDefined(activedescendantId)}
      @click=${this.handleColumnItemClick}
      @keydown=${this.handleColumnKeyDown}
    >
      ${items.map(item => {
        const id = `${this.popupId}-${field}-${item.value}`;
        const selected = item.value === currentValue;
        return html`<button
          id=${id}
          part="column-item ${selected ? 'column-item-selected' : ''}"
          class="column-item"
          data-field=${field}
          data-value=${item.value}
          type="button"
          role="option"
          aria-selected=${selected ? 'true' : 'false'}
          aria-disabled=${item.disabled ? 'true' : 'false'}
          tabindex="-1"
        >
          ${item.label}
        </button>`;
      })}
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-time-input': WaTimeInput;
  }
}

//
// Attribute converters
//

function stepFromAttribute(value: string | null): number | 'any' {
  if (value == null) return 60;
  if (value === 'any') return 'any';
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? n : 60;
}

function stepToAttribute(value: number | 'any'): string | null {
  if (value === 'any') return 'any';
  return String(value);
}
