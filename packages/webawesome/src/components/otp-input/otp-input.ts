import { html, isServer, type PropertyValues } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { live } from 'lit/directives/live.js';
import { WaClearEvent } from '../../events/clear.js';
import { WaCompleteEvent } from '../../events/complete.js';
import { scrollIntoView } from '../../internal/scroll.js';
import { warnDeprecatedSize } from '../../internal/size.js';
import { HasSlotController } from '../../internal/slot.js';
import { submitForm } from '../../internal/submit-on-enter.js';
import { MirrorValidator } from '../../internal/validators/mirror-validator.js';
import { watch } from '../../internal/watch.js';
import { WebAwesomeFormAssociatedElement } from '../../internal/webawesome-form-associated-element.js';
import formControlStyles from '../../styles/component/form-control.styles.js';
import sizeStyles from '../../styles/component/size.styles.js';
import styles from './otp-input.styles.js';

/**
 * @summary OTP inputs collect one-time passcodes, PINs, and other fixed-length codes, one character per segment.
 * Use them for SMS verification, two-factor authentication, and invite codes.
 * @documentation https://webawesome.com/docs/components/otp-input
 * @status experimental
 * @since 3.10
 *
 * @slot label - An optional label. Use this for labels that contain HTML. When `label` attribute is set it takes priority.
 * @slot hint - Optional hint text. Use this for hints that contain HTML. When `hint` attribute is set it takes priority.
 *
 * @event focus - Emitted when the control gains focus.
 * @event blur - Emitted when the control loses focus.
 * @event input - Emitted when a character is entered or removed.
 * @event change - Emitted when the value changes and the field loses focus.
 * @event wa-complete - Emitted once when all segments are filled. Cancelable — call `preventDefault()` to stop
 *   `autosubmit` from submitting the form for this completion.
 * @event wa-clear - Emitted when the control's value is cleared.
 * @event wa-invalid - Emitted when the form control has been checked for validity and its constraints aren't satisfied.
 *
 * @csspart label - The label element.
 * @csspart hint - The hint element.
 * @csspart segments - The wrapper around all segment cells and separators.
 * @csspart segment - An individual character segment cell.
 * @csspart segment-separator - A literal separator character between segment groups (e.g. space or dash).
 *
 * @cssstate --blank - Applied when no characters have been entered.
 * @cssstate --filled - Applied when all segments are filled.
 * @cssstate disabled - Applied when the component is disabled.
 * @cssstate readonly - Applied when the component is readonly.
 * @cssstate user-invalid - Applied when validation fails after interaction.
 *
 * @cssproperty --segment-size - Width and height of each segment cell. Default: `2.5em`.
 * @cssproperty --segment-gap - Gap between segments (not used in `contained` appearance). Default: themed.
 * @cssproperty --segment-border-radius - Corner radius of each segment. Default: themed.
 */
@customElement('wa-otp-input')
export default class WaOtpInput extends WebAwesomeFormAssociatedElement {
  static shadowRootOptions = { ...WebAwesomeFormAssociatedElement.shadowRootOptions, delegatesFocus: true };
  static css = [sizeStyles, formControlStyles, styles];

  static get validators() {
    return isServer ? [] : [...super.validators, MirrorValidator()];
  }

  private readonly hasSlotController = new HasSlotController(this, 'label', 'hint');

  /** The real `<input>` used for form association and validation (visually hidden). */
  @query('.hidden-input') input: HTMLInputElement;

  @query('.segments') private segmentsContainer: HTMLElement;

  get validationTarget() {
    return this.segmentsContainer;
  }

  @state() private _focused = false;
  // Which segment the cursor is on. -1 when unfocused.
  @state() private _activeIndex = -1;
  // The other end of a native multi-character selection (e.g. from Cmd/Ctrl+A).
  // -1, or equal to _activeIndex, means "no selection — just a caret at _activeIndex".
  @state() private _selectionAnchor = -1;

  private get hasSelection(): boolean {
    return this._selectionAnchor >= 0 && this._selectionAnchor !== this._activeIndex;
  }

  // Move the caret to `index` with no active selection.
  private setCaretIndex(index: number) {
    this._activeIndex = index;
    this._selectionAnchor = -1;
  }

  // Backing field — not a reactive @state; value setter triggers requestUpdate() manually
  private _value = '';

  /** The current value of the OTP field, submitted as a name/value pair with form data. */
  get value(): string {
    return this._value;
  }

  set value(val: string) {
    const next = this.filterAndTransform(val).slice(0, this.effectiveLength);
    if (this._value === next) return;
    const oldValue = this._value;
    this._value = next;
    this.setValue(next);
    if (this.input) this.input.value = next;
    // When value changes while focused, move cursor to the end of the new value
    if (this._focused) {
      this.setCaretIndex(Math.min(next.length, this.effectiveLength - 1));
    }
    this.requestUpdate('value', oldValue);
  }

  /** The default value. Used to restore the field on form reset. Reflects the `value` HTML attribute. */
  @property({ attribute: 'value', reflect: true }) defaultValue: string | null = this.getAttribute('value') ?? null;

  /** Number of character segments to display. Overridden by `format` when set. */
  @property({ type: Number, reflect: true }) length = 6;

  /** Visual appearance of the segments. */
  @property({ reflect: true }) appearance: 'outlined' | 'filled' | 'filled-outlined' | 'contained' = 'outlined';

  /** Allowed character class. */
  @property({ reflect: true }) type: 'numeric' | 'alpha' | 'alphanumeric' = 'numeric';

  /** When true, entered characters are displayed as bullets (•) without exposing the value visually. */
  @property({ type: Boolean, reflect: true }) mask = false;

  /** Case transformation applied to entered characters. */
  @property({ reflect: true }) case: 'preserve' | 'upper' | 'lower' = 'preserve';

  /** The size of each segment. */
  @property({ reflect: true }) size: 'xs' | 's' | 'm' | 'l' | 'xl' | 'small' | 'medium' | 'large' = 'm';

  @watch('size')
  handleSizeChange() {
    warnDeprecatedSize(this.localName, this.size);
  }

  /** A label shown above the segments. Use the `label` slot for HTML content. */
  @property() label = '';

  /** Hint text shown below the segments. Use the `hint` slot for HTML content. */
  @property() hint = '';

  /**
   * Segment format string using `#` as a segment placeholder and any other character as a literal separator.
   * Setting `format` overrides `length` (the segment count is derived from the number of `#` characters).
   * @example "### ###" → two groups of three with a space between them
   * @example "####-####" → two groups of four joined by a dash
   */
  @property() format = '';

  /** The `autocomplete` attribute forwarded to the underlying input. */
  @property({ reflect: true }) autocomplete = 'one-time-code';

  /** Makes the field required. A partially-filled field is always invalid regardless of this attribute. */
  @property({ type: Boolean, reflect: true }) required = false;

  /** Makes the field readonly — the value displays but cannot be edited by the user. */
  @property({ type: Boolean, reflect: true }) readonly = false;

  /** When true, the form is submitted automatically once all segments are filled. */
  @property({ type: Boolean, reflect: true }) autosubmit = false;

  /** Automatically focuses the field when the page loads. */
  @property({ type: Boolean }) autofocus = false;

  /**
   * A hint character displayed in each empty segment. Useful for communicating the expected format
   * at a glance — for example `placeholder="0"` for a numeric PIN or `placeholder="·"` for a code.
   */
  @property() placeholder = '';

  assumeInteractionOn = ['blur', 'input'];

  private _lastChangeValue = '';

  /** Number of segments derived from `format` (count of `#`) or `length`. */
  get effectiveLength(): number {
    return this.format ? [...this.format].filter(c => c === '#').length : this.length;
  }

  /** Parsed format array — each entry is a segment slot or a literal separator character. */
  private get parsedFormat(): Array<{ type: 'segment' | 'separator'; char: string }> {
    const src = this.format || '#'.repeat(this.length);
    return [...src].map(c => ({ type: c === '#' ? 'segment' : 'separator', char: c }));
  }

  private filterAndTransform(val: string): string {
    let s = val;
    if (this.type === 'numeric') s = s.replace(/\D/g, '');
    else if (this.type === 'alpha') s = s.replace(/[^a-zA-Z]/g, '');
    else if (this.type === 'alphanumeric') s = s.replace(/[^a-zA-Z0-9]/g, '');

    if (this.case === 'upper') s = s.toUpperCase();
    else if (this.case === 'lower') s = s.toLowerCase();

    return s;
  }

  protected willUpdate(changedProperties: PropertyValues) {
    super.willUpdate(changedProperties);
    // Initialize live value from the HTML `value` attribute on first render.
    if (!this.hasUpdated) {
      const initial = this.filterAndTransform(this.defaultValue ?? '').slice(0, this.effectiveLength);
      if (this._value !== initial) {
        this._value = initial;
        this.setValue(initial);
        this._lastChangeValue = initial;
      }
    }
    // Re-filter and truncate when type, case, length, or format changes after first render.
    if (
      this.hasUpdated &&
      (changedProperties.has('type') ||
        changedProperties.has('case') ||
        changedProperties.has('length') ||
        changedProperties.has('format'))
    ) {
      const refiltered = this.filterAndTransform(this._value).slice(0, this.effectiveLength);
      if (refiltered !== this._value) {
        this._value = refiltered;
        this.setValue(refiltered);
        if (this.input) this.input.value = refiltered;
      }
    }
  }

  protected updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);

    const v = this._value;
    this.customStates.set('--blank', v.length === 0);
    this.customStates.set('--filled', v.length === this.effectiveLength);
    this.customStates.set('readonly', this.readonly);

    // Guard updateValidity() — calling it unconditionally triggers setValidity() → requestUpdate('validity')
    // → updated() again → infinite loop. Only recheck when value-affecting properties change.
    if (
      changedProperties.has('value') ||
      changedProperties.has('required') ||
      changedProperties.has('length') ||
      changedProperties.has('format')
    ) {
      this.updateValidity();
    }

    // After every render, sync the hidden input's cursor/selection to _activeIndex so
    // the next keypress inserts or replaces at the correct segment position.
    this.syncCursor();

    // Keep the active/selected segment in view, the hidden input's own position is static,
    // so it won't trigger the browser's native scroll-into-view as the caret moves between
    // segments in a `.segments` row that's scrolled horizontally (long `length`, large `size`).
    const activeSegment = this.segmentsContainer?.querySelector<HTMLElement>('.segment--active, .segment--selected');
    if (activeSegment && this.segmentsContainer) {
      scrollIntoView(activeSegment, this.segmentsContainer, 'horizontal', 'auto');
    }
  }

  // Position the hidden input cursor at _activeIndex. If the slot has a character,
  // select it (so typing replaces it); otherwise place an empty cursor there.
  private syncCursor() {
    if (!this._focused || !this.input || this._activeIndex < 0) return;
    // Don't collapse a live multi-character selection (e.g. from Cmd/Ctrl+A) on unrelated re-renders.
    if (this.hasSelection) return;
    const len = this._value.length;
    const start = Math.min(this._activeIndex, len);
    const end = this._activeIndex < len ? start + 1 : start;
    this.input.setSelectionRange(start, end);
  }

  formResetCallback() {
    super.formResetCallback();
    const reset = this.filterAndTransform(this.defaultValue ?? '').slice(0, this.effectiveLength);
    const oldValue = this._value;
    this._value = reset;
    this.setValue(reset);
    this._lastChangeValue = '';
    if (this.input) this.input.value = reset;
    this.requestUpdate('value', oldValue);
  }

  private handleInput(e: InputEvent) {
    if (this.readonly) return;
    const input = e.target as HTMLInputElement;
    const rawValue = input.value;
    const rawCursor = input.selectionStart ?? rawValue.length;

    const filtered = this.filterAndTransform(rawValue).slice(0, this.effectiveLength);

    // Correct the visible input if invalid chars were stripped
    let cursorAfterFilter = rawCursor;
    if (rawValue !== filtered) {
      input.value = filtered;
      // Map the raw cursor through the filter to find where it lands in the filtered string
      const rawPrefix = rawValue.slice(0, rawCursor);
      cursorAfterFilter = Math.min(this.filterAndTransform(rawPrefix).length, this.effectiveLength);
    }

    // Update the active segment to wherever the cursor is now
    this.setCaretIndex(Math.min(cursorAfterFilter, this.effectiveLength - 1));

    const prevLength = this._value.length;
    const oldValue = this._value;
    this._value = filtered;
    this.setValue(filtered);

    // No manual 'input' dispatch here — the native event that triggered this handler already
    // bubbles and composes out of the shadow root on its own (unlike Backspace/Delete/paste,
    // which call preventDefault() and so need a synthetic one instead).
    this.maybeDispatchComplete(filtered.length === this.effectiveLength && prevLength < this.effectiveLength);

    this.requestUpdate('value', oldValue);
  }

  // Dispatch wa-complete when the value just became fully filled, then submit the form if
  // autosubmit is enabled and no listener canceled the event.
  private maybeDispatchComplete(justCompleted: boolean) {
    if (!justCompleted) return;
    const notCanceled = this.dispatchEvent(new WaCompleteEvent());
    if (this.autosubmit && notCanceled) {
      // Deferred like submitOnEnter — requestSubmit() called synchronously from inside the
      // triggering input event doesn't reliably fire, and this also gives async wa-complete
      // listeners a moment to have run before the form actually submits.
      setTimeout(() => submitForm(this));
    }
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (e.isComposing) return;
    const max = this.effectiveLength;

    if (e.key === 'Tab') {
      if (!e.shiftKey && this._activeIndex < max - 1) {
        e.preventDefault();
        this.setCaretIndex(this._activeIndex + 1);
      } else if (e.shiftKey && this._activeIndex > 0) {
        e.preventDefault();
        this.setCaretIndex(this._activeIndex - 1);
      }
      // else: Tab/Shift-Tab at boundary → propagate out of component
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      if (this.hasSelection) {
        this.setCaretIndex(Math.min(Math.max(this._selectionAnchor, this._activeIndex), max - 1));
      } else {
        this._activeIndex = Math.min(this._activeIndex + 1, max - 1);
      }
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      if (this.hasSelection) {
        this.setCaretIndex(Math.max(Math.min(this._selectionAnchor, this._activeIndex), 0));
      } else {
        this._activeIndex = Math.max(this._activeIndex - 1, 0);
      }
    } else if (this.readonly) {
      // All character-mutating keys are blocked when readonly; navigation above still works.
    } else if (e.key === 'Backspace') {
      // Prevent browser from shifting chars; manually splice the slot and move back.
      e.preventDefault();
      if (this.hasSelection) {
        const start = Math.min(this._selectionAnchor, this._activeIndex);
        const end = Math.max(this._selectionAnchor, this._activeIndex);
        this.spliceValue(start, end);
        this.setCaretIndex(Math.min(start, max - 1));
      } else {
        const idx = this._activeIndex;
        if (idx < this._value.length) {
          this.spliceValue(idx);
        }
        this.setCaretIndex(Math.max(idx - 1, 0));
      }
    } else if (e.key === 'Delete') {
      // Same as Backspace but cursor stays in place.
      e.preventDefault();
      if (this.hasSelection) {
        const start = Math.min(this._selectionAnchor, this._activeIndex);
        const end = Math.max(this._selectionAnchor, this._activeIndex);
        this.spliceValue(start, end);
        this.setCaretIndex(Math.min(start, max - 1));
      } else {
        const idx = this._activeIndex;
        if (idx < this._value.length) {
          this.spliceValue(idx);
        }
      }
    }
  }

  // Remove the characters in [start, end) from _value and sync state.
  private spliceValue(start: number, end: number = start + 1) {
    const next = this._value.slice(0, start) + this._value.slice(end);
    const oldValue = this._value;
    this._value = next;
    this.setValue(next);
    if (this.input) this.input.value = next;
    this.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
    this.requestUpdate('value', oldValue);
  }

  private handlePaste(e: ClipboardEvent) {
    e.preventDefault();
    if (this.readonly) return;
    const text = e.clipboardData?.getData('text/plain') ?? '';
    const filtered = this.filterAndTransform(text);
    if (!filtered) return;

    const idx = this._activeIndex;
    const max = this.effectiveLength;

    // Overlay paste: replace chars starting at active index, preserve everything else.
    const slots = Array.from({ length: max }, (_, i) => this._value[i] ?? '');
    for (let i = 0; i < filtered.length && idx + i < max; i++) {
      slots[idx + i] = filtered[i];
    }
    // Compact: drop trailing empty slots so the string stays dense.
    let end = max - 1;
    while (end >= 0 && !slots[end]) end--;
    const next = end >= 0 ? slots.slice(0, end + 1).join('') : '';

    const prevLength = this._value.length;
    const oldValue = this._value;
    this._value = next;
    this.setValue(next);
    if (this.input) this.input.value = next;

    this.setCaretIndex(Math.min(idx + filtered.length, max - 1));

    this.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
    this.maybeDispatchComplete(next.length === max && prevLength < max);

    this.requestUpdate('value', oldValue);
  }

  private handleFocus() {
    this._focused = true;
    this.setCaretIndex(Math.min(this._value.length, this.effectiveLength - 1));
  }

  // Mirror a native multi-character selection (e.g. Cmd/Ctrl+A) into component state so
  // render() can highlight it and Backspace/Delete can clear the whole range.
  private handleSelect() {
    if (!this.input) return;
    const start = this.input.selectionStart ?? 0;
    const end = this.input.selectionEnd ?? start;
    if (end - start > 1) {
      this._selectionAnchor = start;
      this._activeIndex = end;
    } else if (this._selectionAnchor !== -1) {
      this._selectionAnchor = -1;
    }
  }

  private handleBlur() {
    this._focused = false;
    this.setCaretIndex(-1);
    if (this._value !== this._lastChangeValue) {
      this._lastChangeValue = this._value;
      this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    }
  }

  private handleSegmentsClick(e: MouseEvent) {
    if (this.disabled) return;

    this.input?.focus(); // handleFocus sets _activeIndex to first empty slot

    // If the user clicked directly on a specific segment, override _activeIndex
    const target = e.target as Element;
    const segment = target.closest('[part~="segment"]');
    if (segment && this.shadowRoot) {
      const segments = [...this.shadowRoot.querySelectorAll('[part~="segment"]')];
      const index = segments.indexOf(segment as HTMLElement);
      if (index >= 0) {
        // Allow clicking on any filled segment for replacement; clamp to first empty otherwise
        this.setCaretIndex(Math.min(index, this._value.length));
      }
    }
  }

  /** Clears the current value and returns focus to the field. */
  clear() {
    this.value = '';
    this.dispatchEvent(new WaClearEvent());
    this.focus();
  }

  /** Focuses the field. */
  focus(options?: FocusOptions) {
    this.input?.focus(options);
  }

  /** Removes focus from the field. */
  blur() {
    this.input?.blur();
  }

  /** Selects all entered characters in the hidden input. */
  select() {
    this.input?.select();
  }

  render() {
    const hasLabelSlot = this.hasSlotController.test('label');
    const hasHintSlot = this.hasSlotController.test('hint');
    const hasLabel = this.label ? true : !!hasLabelSlot;
    const hasHint = this.hint ? true : !!hasHintSlot;

    const chars = [...this._value];
    const parts = this.parsedFormat;
    const activeIndex = this._activeIndex;
    const selected = this.hasSelection
      ? [Math.min(this._selectionAnchor, activeIndex), Math.max(this._selectionAnchor, activeIndex)]
      : null;
    let segmentIndex = 0;

    return html`
      <label
        id="label"
        part="label"
        class=${classMap({ label: true, 'has-label': hasLabel })}
        for="hidden-input"
        aria-hidden=${hasLabel ? 'false' : 'true'}
      >
        <slot name="label">${this.label}</slot>
      </label>

      <div part="segments" class="segments" role="group" aria-labelledby="label" @click=${this.handleSegmentsClick}>
        ${parts.map(part => {
          if (part.type === 'separator') {
            return html`<span part="segment-separator" class="segment-separator" aria-hidden="true"
              >${part.char}</span
            >`;
          }

          const i = segmentIndex++;
          const char = chars[i] ?? '';
          const isSelected = selected !== null && i >= selected[0] && i < selected[1];
          const isActive = selected === null && i === activeIndex;

          return html`
            <div
              part="segment"
              class=${classMap({
                segment: true,
                'segment--active': isActive,
                'segment--selected': isSelected,
                'segment--filled': Boolean(char),
              })}
              aria-hidden="true"
            >
              ${char
                ? this.mask
                  ? '•'
                  : char
                : this.placeholder
                  ? html`<span class="segment--placeholder">${this.placeholder}</span>`
                  : ''}
              ${isActive ? html`<span class="caret"></span>` : ''}
            </div>
          `;
        })}

        <input
          id="hidden-input"
          class="hidden-input"
          type="text"
          .value=${live(this._value)}
          maxlength=${this.effectiveLength}
          minlength=${this.effectiveLength}
          autocomplete=${this.autocomplete}
          inputmode=${this.type === 'numeric' ? 'numeric' : 'text'}
          aria-describedby="hint"
          ?required=${this.required}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          ?autofocus=${this.autofocus}
          @input=${this.handleInput}
          @keydown=${this.handleKeyDown}
          @paste=${this.handlePaste}
          @focus=${this.handleFocus}
          @blur=${this.handleBlur}
          @select=${this.handleSelect}
        />
      </div>

      <slot
        id="hint"
        part="hint"
        name="hint"
        class=${classMap({ hint: true, 'has-slotted': hasHint })}
        aria-hidden=${hasHint ? 'false' : 'true'}
        >${this.hint}</slot
      >
    `;
  }
}

WaOtpInput.disableWarning?.('change-in-update');

declare global {
  interface HTMLElementTagNameMap {
    'wa-otp-input': WaOtpInput;
  }
}
