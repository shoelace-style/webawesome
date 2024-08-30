import { WebAwesomeFormAssociatedElement } from '../../internal/webawesome-element.js';
import type { CSSResultGroup } from 'lit';
/**
 * @summary Textareas collect data from the user and allow multiple lines of text.
 * @documentation https://backers.webawesome.com/docs/components/textarea
 * @status stable
 * @since 2.0
 *
 * @slot label - The textarea's label. Alternatively, you can use the `label` attribute.
 * @slot help-text - Text that describes how to use the input. Alternatively, you can use the `help-text` attribute.
 *
 * @event wa-blur - Emitted when the control loses focus.
 * @event wa-change - Emitted when an alteration to the control's value is committed by the user.
 * @event wa-focus - Emitted when the control gains focus.
 * @event wa-input - Emitted when the control receives input.
 * @event wa-invalid - Emitted when the form control has been checked for validity and its constraints aren't satisfied.
 *
 * @csspart form-control - The form control that wraps the label, input, and help text.
 * @csspart form-control-label - The label's wrapper.
 * @csspart form-control-input - The input's wrapper.
 * @csspart form-control-help-text - The help text's wrapper.
 * @csspart base - The component's base wrapper.
 * @csspart textarea - The internal `<textarea>` control.
 *
 * @cssproperty --background-color - The textarea's background color.
 * @cssproperty --border-color - The color of the textarea's borders.
 * @cssproperty --border-radius - The border radius of the textarea's corners.
 * @cssproperty --border-style - The style of the textarea's borders.
 * @cssproperty --border-width - The width of the textarea's borders.
 * @cssproperty --box-shadow - The shadow effects around the edges of the textarea.
 */
export default class WaTextarea extends WebAwesomeFormAssociatedElement {
    static styles: CSSResultGroup;
    static get validators(): import("../../internal/webawesome-element.js").Validator<WebAwesomeFormAssociatedElement>[];
    assumeInteractionOn: string[];
    private readonly hasSlotController;
    private resizeObserver;
    input: HTMLTextAreaElement;
    private hasFocus;
    title: string;
    /** The name of the textarea, submitted as a name/value pair with form data. */
    name: string | null;
    /** The current value of the textarea, submitted as a name/value pair with form data. */
    value: string;
    /** The default value of the form control. Primarily used for resetting the form control. */
    defaultValue: string;
    /** The textarea's size. */
    size: 'small' | 'medium' | 'large';
    /** Draws a filled textarea. */
    filled: boolean;
    /** The textarea's label. If you need to display HTML, use the `label` slot instead. */
    label: string;
    /** The textarea's help text. If you need to display HTML, use the `help-text` slot instead. */
    helpText: string;
    /** Placeholder text to show as a hint when the input is empty. */
    placeholder: string;
    /** The number of rows to display by default. */
    rows: number;
    /** Controls how the textarea can be resized. */
    resize: 'none' | 'vertical' | 'auto';
    /** Disables the textarea. */
    disabled: boolean;
    /** Makes the textarea readonly. */
    readonly: boolean;
    /**
     * By default, form controls are associated with the nearest containing `<form>` element. This attribute allows you
     * to place the form control outside of a form and associate it with the form that has this `id`. The form must be in
     * the same document or shadow root for this to work.
     */
    form: null;
    /** Makes the textarea a required field. */
    required: boolean;
    /** The minimum length of input that will be considered valid. */
    minlength: number;
    /** The maximum length of input that will be considered valid. */
    maxlength: number;
    /** Controls whether and how text input is automatically capitalized as it is entered by the user. */
    autocapitalize: 'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters';
    /** Indicates whether the browser's autocorrect feature is on or off. */
    autocorrect: string;
    /**
     * Specifies what permission the browser has to provide assistance in filling out form field values. Refer to
     * [this page on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) for available values.
     */
    autocomplete: string;
    /** Indicates that the input should receive focus on page load. */
    autofocus: boolean;
    /** Used to customize the label or icon of the Enter key on virtual keyboards. */
    enterkeyhint: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send';
    /** Enables spell checking on the textarea. */
    spellcheck: boolean;
    /**
     * Tells the browser what type of data will be entered by the user, allowing it to display the appropriate virtual
     * keyboard on supportive devices.
     */
    inputmode: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';
    /**
     * Used for SSR. If you're slotting in a `label` element, make sure to set this to `true`.
     */
    withLabel: boolean;
    /**
     * Used for SSR. If you're slotting in a `help-text` element, make sure to set this to `true`.
     */
    withHelpText: boolean;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private handleBlur;
    private handleChange;
    private handleFocus;
    private handleInput;
    private setTextareaHeight;
    handleRowsChange(): void;
    handleValueChange(): Promise<void>;
    /** Sets focus on the textarea. */
    focus(options?: FocusOptions): void;
    /** Removes focus from the textarea. */
    blur(): void;
    /** Selects all the text in the textarea. */
    select(): void;
    /** Gets or sets the textarea's scroll position. */
    scrollPosition(position?: {
        top?: number;
        left?: number;
    }): {
        top: number;
        left: number;
    } | undefined;
    /** Sets the start and end positions of the text selection (0-based). */
    setSelectionRange(selectionStart: number, selectionEnd: number, selectionDirection?: 'forward' | 'backward' | 'none'): void;
    /** Replaces a range of text with a new string. */
    setRangeText(replacement: string, start?: number, end?: number, selectMode?: 'select' | 'start' | 'end' | 'preserve'): void;
    formResetCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wa-textarea': WaTextarea;
    }
}
