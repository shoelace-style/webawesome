import { html, isServer, type PropertyValues } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { live } from 'lit/directives/live.js';
import { WaClearEvent } from '../../events/clear.js';
import { WaCreateEvent } from '../../events/create.js';
import type { WaRemoveEvent } from '../../events/remove.js';
import { announce } from '../../internal/live-announcer.js';
import { warnDeprecatedSize } from '../../internal/size.js';
import { HasSlotController } from '../../internal/slot.js';
import { submitOnEnter } from '../../internal/submit-on-enter.js';
import { TagInputValidator } from '../../internal/validators/tag-input-validator.js';
import { watch } from '../../internal/watch.js';
import { WebAwesomeFormAssociatedElement } from '../../internal/webawesome-form-associated-element.js';
import formControlStyles from '../../styles/component/form-control.styles.js';
import sizeStyles from '../../styles/component/size.styles.js';
import visuallyHidden from '../../styles/component/visually-hidden.styles.js';
import { LocalizeController } from '../../utilities/localize.js';
import '../icon/icon.js';
import '../tag/tag.js';
import styles from './tag-input.styles.js';

/**
 * @summary Tag inputs collect a list of short values, such as keywords, email addresses, or labels, as removable tags.
 *  Users add a tag by typing and pressing Enter or a delimiter, and each tag is submitted as its own form value.
 * @documentation https://webawesome.com/docs/components/tag-input
 * @status experimental
 * @since 3.13
 *
 * @dependency wa-icon
 * @dependency wa-tag
 *
 * @slot label - The tag input's label. Alternatively, you can use the `label` attribute.
 * @slot start - An element, such as `<wa-icon>`, placed at the start of the control.
 * @slot end - An element, such as `<wa-icon>`, placed at the end of the control.
 * @slot clear-icon - An icon to use in lieu of the default clear icon.
 * @slot hint - Text that describes how to use the tag input. Alternatively, you can use the `hint` attribute.
 *
 * @event blur - Emitted when the control loses focus.
 * @event change - Emitted when a tag is added, removed, or all tags are cleared by the user.
 * @event focus - Emitted when the control gains focus.
 * @event input - Emitted when the user types in the text box or when a tag is added or removed.
 * @event wa-create - Emitted before typed text becomes a tag. Call `event.preventDefault()` to reject it. The event
 *  `detail` contains `{ inputValue: string }`, the text that would become the tag.
 * @event wa-clear - Emitted when the clear button is activated.
 * @event wa-invalid - Emitted when the form control has been checked for validity and its constraints aren't satisfied.
 *
 * @csspart form-control-label - The label.
 * @csspart tag-input - The component's outer wrapper, the bordered box that holds the tags and text box.
 * @csspart start - The container that wraps the `start` slot.
 * @csspart tags - The list that holds the tags.
 * @csspart tag - Each tag, a `<wa-tag>`.
 * @csspart tag__content - The tag's content part.
 * @csspart tag__remove-button - The tag's remove button.
 * @csspart tag__remove-button__base - The tag's remove button base part.
 * @csspart input - The internal text box, an `<input>` element.
 * @csspart clear-button - The clear button.
 * @csspart end - The container that wraps the `end` slot.
 * @csspart hint - The hint's wrapper.
 *
 * @cssstate blank - The tag input has no tags.
 * @cssstate readonly - The tag input is readonly.
 */
@customElement('wa-tag-input')
export default class WaTagInput extends WebAwesomeFormAssociatedElement {
  static css = [sizeStyles, formControlStyles, visuallyHidden, styles];

  static get validators() {
    return isServer ? [] : [...super.validators, TagInputValidator()];
  }

  assumeInteractionOn = ['blur', 'input'];
  private readonly hasSlotController = new HasSlotController(this, 'hint', 'label');

  /** @internal Used by the validator to localize validation messages. */
  readonly localize = new LocalizeController(this);

  @query('.control') input: HTMLInputElement;

  /** The index of the tag that has roving focus, or -1 when the text box or nothing has focus. */
  @state() private focusedTagIndex = -1;

  private _value: string[] | null = null;

  /**
   * The tags as an array of strings, submitted as one entry per tag under `name`. Set the `value` attribute to a
   * delimiter-separated string for an initial value.
   */
  get value(): string[] {
    return [...(this._value ?? this.parseDelimited(this.defaultValue))];
  }

  @property({ attribute: false })
  set value(val: string[] | string | FormData | null) {
    // Form state restoration hands back the FormData we stored
    if (val instanceof FormData) {
      val = this.name ? (val.getAll(this.name) as string[]) : [];
    }

    if (typeof val === 'string') {
      val = this.parseDelimited(val);
    }

    const next = val ? [...val] : [];
    const old = this._value;

    if (old && old.length === next.length && old.every((tag, index) => tag === next[index])) {
      return;
    }

    this._value = next;
    this.valueHasChanged = true;
  }

  /**
   * The default value of the form control as a delimiter-separated string. Primarily used for resetting the form
   * control.
   */
  @property({ attribute: 'value', reflect: true }) defaultValue: string | null = this.getAttribute('value') ?? null;

  /** The text currently typed in the text box that hasn't become a tag yet. */
  @property({ attribute: false }) inputValue = '';

  /**
   * The characters that turn typed text into a tag. Each character is a separate delimiter, so `",;"` accepts both
   * commas and semicolons. Pasted text is split on the same characters. Set to an empty string so only Enter adds a
   * tag. Also used to parse the `value` attribute, which falls back to a comma when the delimiter is empty.
   */
  @property() delimiter = ',';

  /** The maximum number of tags that can be added. Once reached, no more tags can be added until one is removed. */
  @property({ attribute: 'max-tags', type: Number }) maxTags: number;

  /** The minimum number of tags required for the control to be valid. Has no effect when there are no tags. */
  @property({ attribute: 'min-tags', type: Number }) minTags: number;

  /** Allows the same tag to be added more than once. By default, duplicates are ignored. */
  @property({ attribute: 'allow-duplicates', type: Boolean, reflect: true }) allowDuplicates = false;

  /** Adds a clear button that removes all tags. */
  @property({ attribute: 'with-clear', type: Boolean }) withClear = false;

  /** Placeholder text to show in the text box. Hidden once the maximum number of tags is reached. */
  @property() placeholder = '';

  /** The tag input's label. If you need to display HTML, use the `label` slot instead. */
  @property() label = '';

  /** The tag input's hint. If you need to display HTML, use the `hint` slot instead. */
  @property({ attribute: 'hint' }) hint = '';

  /**
   * Only required for SSR. Set to `true` if you're slotting in a `label` element so the server-rendered markup
   * includes the label before the component hydrates on the client.
   */
  @property({ attribute: 'with-label', type: Boolean }) withLabel = false;

  /**
   * Only required for SSR. Set to `true` if you're slotting in a `hint` element so the server-rendered markup
   * includes the hint before the component hydrates on the client.
   */
  @property({ attribute: 'with-hint', type: Boolean }) withHint = false;

  /** The tag input's size. Also applied to each tag. */
  @property({ reflect: true }) size: 'xs' | 's' | 'm' | 'l' | 'xl' | 'small' | 'medium' | 'large' = 'm';

  @watch('size')
  handleSizeChange() {
    warnDeprecatedSize(this.localName, this.size);
  }

  /** The tag input's visual appearance. */
  @property({ reflect: true }) appearance: 'filled' | 'outlined' | 'filled-outlined' = 'outlined';

  /** Draws a pill-style tag input, and pill-style tags, with rounded edges. */
  @property({ type: Boolean, reflect: true }) pill = false;

  /** Makes the tag input readonly. Tags stay visible and are still submitted, but can't be added or removed. */
  @property({ type: Boolean, reflect: true }) readonly = false;

  /** Makes the tag input a required field, so at least one tag must be added. */
  @property({ type: Boolean, reflect: true }) required = false;

  /** Controls whether and how text input is automatically capitalized as it is entered by the user. */
  @property() autocapitalize: 'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters';

  /**
   * Indicates whether the browser's autocorrect feature is on or off. When set as an attribute, use `"off"` or `"on"`.
   * When set as a property, use `true` or `false`.
   */
  @property({
    type: Boolean,
    converter: {
      fromAttribute: value => (!value || value === 'off' ? false : true),
      toAttribute: value => (value ? 'on' : 'off'),
    },
  })
  declare autocorrect: boolean;

  /**
   * Specifies what permission the browser has to provide assistance in filling out form field values. Refer to
   * [this page on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) for available values.
   * Defaults to `off`.
   */
  @property() autocomplete: string;

  /** Used to customize the label or icon of the Enter key on virtual keyboards. */
  @property() enterkeyhint: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send';

  /** Enables spell checking on the text box. */
  @property({
    type: Boolean,
    converter: {
      // Allow "true|false" attribute values but keep the property boolean
      fromAttribute: value => (!value || value === 'false' ? false : true),
      toAttribute: value => (value ? 'true' : 'false'),
    },
  })
  spellcheck = true;

  /**
   * Tells the browser what type of data will be entered by the user, allowing it to display the appropriate virtual
   * keyboard on supportive devices.
   */
  @property() inputmode: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';

  /** A regex that matches any delimiter character, or null when delimiters are turned off. */
  private get delimiterRegex(): RegExp | null {
    if (!this.delimiter) {
      return null;
    }

    return new RegExp(`[${this.delimiter.replace(/[.*+?^${}()|[\]\\-]/g, '\\$&')}]`);
  }

  private get isAtMax() {
    return this.maxTags != null && this.value.length >= this.maxTags;
  }

  /** Splits a delimiter-separated string into trimmed, non-empty tags. */
  private parseDelimited(str: string | null): string[] {
    if (!str) {
      return [];
    }

    const chars = this.delimiter || ',';
    const regex = new RegExp(`[${chars.replace(/[.*+?^${}()|[\]\\-]/g, '\\$&')}]`);

    return str
      .split(regex)
      .map(tag => tag.trim())
      .filter(Boolean);
  }

  private get tagElements(): HTMLElement[] {
    return [...(this.shadowRoot?.querySelectorAll<HTMLElement>('[part~="tag"]') ?? [])];
  }

  /** Finds the index of the tag that contains the event target, or -1 if the target isn't inside a tag. */
  private getTagIndex(target: EventTarget | null): number {
    const tag = (target as Element | null)?.closest?.('[part~="tag"]') as HTMLElement | null;
    return tag ? Number(tag.dataset.index) : -1;
  }

  /** Updates the text box and the inputValue property together so they never drift apart. */
  private setInputText(text: string) {
    this.inputValue = text;

    if (this.input) {
      this.input.value = text;
    }
  }

  private emitInputAndChange() {
    this.updateComplete.then(() => {
      this.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
      this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    });
  }

  /**
   * Adds a single tag from user input, subject to trimming, the tag limit, duplicate rules, and the cancelable
   * wa-create event. Returns true when the tag was added. Doesn't emit input or change.
   */
  private tryAddTag(text: string): boolean {
    if (this.disabled || this.readonly) {
      return false;
    }

    const tag = text.trim();

    if (!tag || this.isAtMax) {
      return false;
    }

    const tags = this.value;

    if (!this.allowDuplicates && tags.includes(tag)) {
      // The shake is visual only, so tell screen reader users why nothing happened
      this.shakeTag(tags.indexOf(tag));
      announce(this.localize.term('tagAlreadyAdded', tag));
      return false;
    }

    const createEvent = new WaCreateEvent({ inputValue: tag });
    this.dispatchEvent(createEvent);

    if (createEvent.defaultPrevented) {
      return false;
    }

    this.value = [...tags, tag];
    announce(this.localize.term('tagAdded', tag));

    return true;
  }

  /**
   * Adds every string as a tag that passes the rules. Emits input and change once if any were added. Returns the
   * texts that were refused, so the caller can put them back in the text box instead of discarding them.
   */
  private addTags(texts: string[]): string[] {
    const rejected: string[] = [];
    let added = false;

    for (const text of texts) {
      if (this.tryAddTag(text)) {
        added = true;
      } else if (text.trim()) {
        rejected.push(text.trim());
      }
    }

    if (added) {
      this.hasInteracted = true;
      this.emitInputAndChange();
    }

    return rejected;
  }

  /** Removes the tag at the given index in response to user input. Returns true when a tag was removed. */
  private removeTagAt(index: number): boolean {
    const tags = this.value;

    if (this.disabled || this.readonly || index < 0 || index >= tags.length) {
      return false;
    }

    const [removed] = tags.splice(index, 1);

    this.hasInteracted = true;
    this.value = tags;
    announce(this.localize.term('tagRemoved', removed));
    this.emitInputAndChange();

    return true;
  }

  /** Briefly shakes an existing tag to show why a duplicate was rejected. */
  private shakeTag(index: number) {
    const tag = this.tagElements[index];

    if (!tag || typeof tag.animate !== 'function') {
      return;
    }

    if (typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    tag.animate(
      [
        { translate: '0' },
        { translate: '-0.2em' },
        { translate: '0.2em' },
        { translate: '-0.2em' },
        { translate: '0.2em' },
        { translate: '0' },
      ],
      { duration: 300, easing: 'ease-in-out' },
    );
  }

  /** Moves roving focus to the tag at the given index after the next render. */
  private async focusTag(index: number) {
    this.focusedTagIndex = index;
    await this.updateComplete;
    this.tagElements[index]?.focus();
  }

  private handleInput(event: InputEvent) {
    const text = this.input.value;
    const regex = this.delimiterRegex;

    // Wait for IME composition to finish before splitting on delimiters
    if (regex && !event.isComposing && regex.test(text)) {
      const segments = text.split(regex);
      const remainder = segments.pop() ?? '';

      const rejected = this.addTags(segments);
      this.setInputText([...rejected, remainder].filter(Boolean).join(this.delimiter[0]));
      return;
    }

    this.inputValue = text;
  }

  private handlePaste(event: ClipboardEvent) {
    const regex = this.delimiterRegex;

    if (this.disabled || this.readonly || !regex) {
      return;
    }

    const pasted = event.clipboardData?.getData('text/plain') ?? '';

    // Pasted text without a delimiter is inserted by the browser as usual
    if (!regex.test(pasted)) {
      return;
    }

    event.preventDefault();

    const start = this.input.selectionStart ?? this.input.value.length;
    const end = this.input.selectionEnd ?? start;
    const combined = this.input.value.slice(0, start) + pasted + this.input.value.slice(end);

    const rejected = this.addTags(combined.split(regex));
    this.setInputText(rejected.join(this.delimiter[0]));
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (event.isComposing) {
      return;
    }

    const text = this.input.value;
    const hasModifier = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
    const isRtl = this.localize.dir() === 'rtl';
    const previousKey = isRtl ? 'ArrowRight' : 'ArrowLeft';

    if (event.key === 'Enter' && !hasModifier) {
      // Enter with text adds a tag. Enter with an empty text box submits the form, like a native input.
      if (text) {
        event.preventDefault();

        if (this.addTags([text]).length === 0) {
          this.setInputText('');
        }
      } else {
        submitOnEnter(event, this);
      }

      return;
    }

    if (this.disabled || this.readonly) {
      // A readonly input isn't an editable context, so WebKit treats an unhandled Backspace as the history-back gesture
      if (event.key === 'Backspace') {
        event.preventDefault();
      }

      return;
    }

    if (event.key === 'Backspace' && text === '' && this.value.length > 0) {
      event.preventDefault();
      this.removeTagAt(this.value.length - 1);
      return;
    }

    if (
      event.key === previousKey &&
      !hasModifier &&
      text === '' &&
      this.input.selectionStart === 0 &&
      this.value.length > 0
    ) {
      event.preventDefault();
      this.focusTag(this.value.length - 1);
      return;
    }

    if (event.key === 'Escape' && text) {
      event.preventDefault();
      this.setInputText('');
      this.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
    }
  }

  private handleInputFocus() {
    this.focusedTagIndex = -1;
  }

  private handleInputBlur() {
    // Commit pending text so a draft never lingers. Rejected text is dropped for the same reason.
    if (this.input.value && !this.readonly && !this.disabled) {
      this.addTags([this.input.value]);
      this.setInputText('');
    }
  }

  private handleTagKeyDown(event: KeyboardEvent) {
    const index = this.getTagIndex(event.target);

    // A focused tag isn't an editable context, so WebKit treats an unhandled Backspace as the history-back gesture
    if (event.key === 'Backspace' || event.key === 'Delete') {
      event.preventDefault();
    }

    if (this.disabled || this.readonly || index < 0) {
      return;
    }

    const count = this.value.length;
    const hasModifier = event.metaKey || event.ctrlKey || event.altKey;
    const isRtl = this.localize.dir() === 'rtl';
    const previousKey = isRtl ? 'ArrowRight' : 'ArrowLeft';
    const nextKey = isRtl ? 'ArrowLeft' : 'ArrowRight';

    switch (event.key) {
      case previousKey:
        event.preventDefault();
        this.focusTag(Math.max(0, index - 1));
        break;

      case nextKey:
        event.preventDefault();
        if (index < count - 1) {
          this.focusTag(index + 1);
        } else {
          this.input.focus();
        }
        break;

      case 'Home':
        event.preventDefault();
        this.focusTag(0);
        break;

      case 'End':
        event.preventDefault();
        this.input.focus();
        break;

      case 'Backspace':
        event.preventDefault();
        this.removeTagAt(index);
        if (index > 0) {
          this.focusTag(index - 1);
        } else {
          this.input.focus();
        }
        break;

      case 'Delete':
        event.preventDefault();
        this.removeTagAt(index);
        if (index < count - 1) {
          this.focusTag(index);
        } else if (index > 0) {
          this.focusTag(index - 1);
        } else {
          this.input.focus();
        }
        break;

      case 'Escape':
        this.input.focus();
        break;

      default:
        // A printable key returns focus to the text box so typing can continue
        if (event.key.length === 1 && !hasModifier) {
          this.input.focus();
        }
    }
  }

  private handleTagClick(event: MouseEvent) {
    const index = this.getTagIndex(event.target);

    if (this.disabled || index < 0) {
      return;
    }

    // Clicks on the remove button are handled by wa-remove
    const isButton = event.composedPath().some(el => el instanceof Element && el.localName === 'wa-button');

    if (!isButton) {
      this.focusTag(index);
    }
  }

  private handleTagFocusIn(event: FocusEvent) {
    this.focusedTagIndex = this.getTagIndex(event.target);
  }

  private handleTagFocusOut() {
    this.focusedTagIndex = -1;
  }

  private handleTagRemove(event: WaRemoveEvent) {
    // Keep the tag's event inside the component. Removal is observable via input and change.
    event.stopPropagation();

    if (this.removeTagAt(this.getTagIndex(event.target))) {
      this.input.focus();
    }
  }

  private handleWrapperMouseDown(event: MouseEvent) {
    const target = event.target as HTMLElement;

    // Let the text box and slotted decorations take focus normally
    if (target === this.input || target.closest?.('[slot="start"], [slot="end"]')) {
      return;
    }

    // Keep the text box focused when clicking padding, tags, or buttons so it doesn't blur and commit a draft
    event.preventDefault();
  }

  private handleWrapperClick(event: MouseEvent) {
    const target = event.target as HTMLElement;

    if (this.disabled || target === this.input) {
      return;
    }

    if (target.closest?.('[slot="start"], [slot="end"], [part~="tag"], [part~="clear-button"]')) {
      return;
    }

    this.input.focus();
  }

  private handleClearMouseDown(event: MouseEvent) {
    // Don't lose focus when clicking the clear button
    event.preventDefault();
    event.stopPropagation();
  }

  private handleClearClick(event: MouseEvent) {
    event.stopPropagation();

    if (this.value.length > 0) {
      this.hasInteracted = true;
      this.value = [];
      this.setInputText('');
      announce(this.localize.term('allTagsRemoved'));

      this.updateComplete.then(() => {
        this.dispatchEvent(new WaClearEvent());
        this.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
        this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
      });
    }

    this.input.focus();
  }

  updated(changedProperties: PropertyValues<this>) {
    super.updated(changedProperties);

    this.customStates.set('blank', this.value.length === 0);
    this.customStates.set('readonly', this.readonly);

    // Guard updateValidity() so setValidity() -> requestUpdate('validity') can't loop. Only recheck when a
    // value-affecting property changes.
    if (
      changedProperties.has('value') ||
      changedProperties.has('defaultValue') ||
      changedProperties.has('required') ||
      changedProperties.has('minTags') ||
      changedProperties.has('maxTags')
    ) {
      this.updateValidity();
    }
  }

  formResetCallback() {
    this._value = null;
    this.setInputText('');
    super.formResetCallback();
    this.requestUpdate('value');
  }

  /** Sets focus on the text box. */
  focus(options?: FocusOptions) {
    this.input.focus(options);
  }

  /** Removes focus from the text box. */
  blur() {
    this.input.blur();
  }

  render() {
    const hasLabelSlot = this.hasSlotController.test('label', 'withLabel');
    const hasHintSlot = this.hasSlotController.test('hint', 'withHint');
    const hasLabel = this.label ? true : !!hasLabelSlot;
    const hasHint = this.hint ? true : !!hasHintSlot;
    const tags = this.value;
    const atMax = this.isAtMax;
    const isClearVisible =
      // prevents hydration mismatch errors
      (!this.didSSR || this.hasUpdated) && this.withClear && !this.disabled && !this.readonly && tags.length > 0;

    return html`
      <label
        id="label"
        part="form-control-label"
        class=${classMap({
          label: true,
          'has-label': hasLabel,
        })}
        for="input"
        aria-hidden=${hasLabel ? 'false' : 'true'}
      >
        <slot name="label">${this.label}</slot>
      </label>

      <div
        part="tag-input"
        class=${classMap({
          'tag-input': true,
          'has-tags': tags.length > 0,
        })}
        @mousedown=${this.handleWrapperMouseDown}
        @click=${this.handleWrapperClick}
      >
        <slot name="start" part="start" class="start"></slot>

        ${tags.length > 0
          ? html`
              ${this.readonly
                ? ''
                : html`
                    <span id="tag-help" class="wa-visually-hidden-force">
                      ${this.localize.term('tagInputKeyboardHelp')}
                    </span>
                  `}
              <div
                part="tags"
                class="tags"
                role="list"
                aria-labelledby="label"
                @keydown=${this.handleTagKeyDown}
                @click=${this.handleTagClick}
                @focusin=${this.handleTagFocusIn}
                @focusout=${this.handleTagFocusOut}
                @wa-remove=${this.handleTagRemove}
              >
                ${tags.map(
                  (tag, index) => html`
                    <wa-tag
                      part="tag"
                      class=${classMap({
                        tag: true,
                        'tag--focused': this.focusedTagIndex === index,
                      })}
                      exportparts="
                        content:tag__content,
                        remove-button:tag__remove-button,
                        remove-button__base:tag__remove-button__base
                      "
                      role="listitem"
                      tabindex="-1"
                      aria-describedby=${ifDefined(this.readonly ? undefined : 'tag-help')}
                      size=${this.size}
                      ?pill=${this.pill}
                      ?with-remove=${!this.readonly}
                      data-index=${index}
                      >${tag}</wa-tag
                    >
                  `,
                )}
              </div>
            `
          : ''}

        <input
          part="input"
          id="input"
          class="control"
          type="text"
          .value=${live(this.inputValue)}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly || atMax}
          placeholder=${ifDefined(atMax ? undefined : this.placeholder || undefined)}
          autocapitalize=${ifDefined(this.autocapitalize)}
          autocomplete=${this.autocomplete ?? 'off'}
          autocorrect=${this.autocorrect ? 'on' : 'off'}
          spellcheck=${this.spellcheck}
          enterkeyhint=${ifDefined(this.enterkeyhint)}
          inputmode=${ifDefined(this.inputmode)}
          aria-describedby="hint"
          aria-invalid=${this.validity.valid ? 'false' : 'true'}
          @input=${this.handleInput}
          @paste=${this.handlePaste}
          @keydown=${this.handleKeyDown}
          @focus=${this.handleInputFocus}
          @blur=${this.handleInputBlur}
        />

        ${isClearVisible
          ? html`
              <button
                part="clear-button"
                class="clear"
                type="button"
                tabindex="-1"
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

        <slot name="end" part="end" class="end"></slot>
      </div>

      <slot
        id="hint"
        part="hint"
        name="hint"
        class=${classMap({
          'has-slotted': hasHint,
        })}
        aria-hidden=${hasHint ? 'false' : 'true'}
        >${this.hint}</slot
      >
    `;
  }
}

// The change-in-update warning is required for this component because the form-associated base class calls
// updateValidity() in firstUpdated(), which triggers requestUpdate('validity') to sync the validation state after the
// first render when the validation target is available. Additionally, HasSlotController triggers requestUpdate() on
// initial slotchange events. See https://lit.dev/docs/tools/development/#development-build-runtime-warnings
WaTagInput.disableWarning?.('change-in-update');

declare global {
  interface HTMLElementTagNameMap {
    'wa-tag-input': WaTagInput;
  }
}
