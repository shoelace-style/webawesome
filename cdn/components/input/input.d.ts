import '../icon/icon.js';
import { WebAwesomeFormAssociatedElement } from '../../internal/webawesome-element.js';
import type { CSSResultGroup } from 'lit';
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
 * @slot help-text - Text that describes how to use the input. Alternatively, you can use the `help-text` attribute.
 *
 * @event wa-blur - Emitted when the control loses focus.
 * @event wa-change - Emitted when an alteration to the control's value is committed by the user.
 * @event wa-clear - Emitted when the clear button is activated.
 * @event wa-focus - Emitted when the control gains focus.
 * @event wa-input - Emitted when the control receives input.
 * @event wa-invalid - Emitted when the form control has been checked for validity and its constraints aren't satisfied.
 *
 * @csspart form-control - The form control that wraps the label, input, and help text.
 * @csspart form-control-label - The label's wrapper.
 * @csspart form-control-input - The input's wrapper.
 * @csspart form-control-help-text - The help text's wrapper.
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
export default class WaInput extends WebAwesomeFormAssociatedElement {
    static styles: CSSResultGroup;
    static shadowRootOptions: {
        delegatesFocus: boolean;
        mode: ShadowRootMode;
        slotAssignment?: SlotAssignmentMode | undefined;
    };
    static get validators(): import("../../internal/webawesome-element.js").Validator<WebAwesomeFormAssociatedElement>[];
    assumeInteractionOn: string[];
    private readonly hasSlotController;
    private readonly localize;
    input: HTMLInputElement;
    private hasFocus;
    title: string;
    /**
     * The type of input. Works the same as a native `<input>` element, but only a subset of types are supported. Defaults
     * to `text`.
     */
    type: 'date' | 'datetime-local' | 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'time' | 'url';
    /** The name of the input, submitted as a name/value pair with form data. */
    name: string | null;
    /** The current value of the input, submitted as a name/value pair with form data. */
    value: string;
    /** The default value of the form control. Primarily used for resetting the form control. */
    defaultValue: string;
    /** The input's size. */
    size: 'small' | 'medium' | 'large';
    /** Draws a filled input. */
    filled: boolean;
    /** Draws a pill-style input with rounded edges. */
    pill: boolean;
    /** The input's label. If you need to display HTML, use the `label` slot instead. */
    label: string;
    /** The input's help text. If you need to display HTML, use the `help-text` slot instead. */
    helpText: string;
    /** Adds a clear button when the input is not empty. */
    clearable: boolean;
    /** Disables the input. */
    disabled: boolean;
    /** Placeholder text to show as a hint when the input is empty. */
    placeholder: string;
    /** Makes the input readonly. */
    readonly: boolean;
    /** Adds a button to toggle the password's visibility. Only applies to password types. */
    passwordToggle: boolean;
    /** Determines whether or not the password is currently visible. Only applies to password input types. */
    passwordVisible: boolean;
    /** Hides the browser's built-in increment/decrement spin buttons for number inputs. */
    noSpinButtons: boolean;
    /**
     * By default, form controls are associated with the nearest containing `<form>` element. This attribute allows you
     * to place the form control outside of a form and associate it with the form that has this `id`. The form must be in
     * the same document or shadow root for this to work.
     */
    form: null;
    /** Makes the input a required field. */
    required: boolean;
    /** A regular expression pattern to validate input against. */
    pattern: string;
    /** The minimum length of input that will be considered valid. */
    minlength: number;
    /** The maximum length of input that will be considered valid. */
    maxlength: number;
    /** The input's minimum value. Only applies to date and number input types. */
    min: number | string;
    /** The input's maximum value. Only applies to date and number input types. */
    max: number | string;
    /**
     * Specifies the granularity that the value must adhere to, or the special value `any` which means no stepping is
     * implied, allowing any numeric value. Only applies to date and number input types.
     */
    step: number | 'any';
    /** Controls whether and how text input is automatically capitalized as it is entered by the user. */
    autocapitalize: 'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters';
    /** Indicates whether the browser's autocorrect feature is on or off. */
    autocorrect: 'off' | 'on';
    /**
     * Specifies what permission the browser has to provide assistance in filling out form field values. Refer to
     * [this page on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) for available values.
     */
    autocomplete: string;
    /** Indicates that the input should receive focus on page load. */
    autofocus: boolean;
    /** Used to customize the label or icon of the Enter key on virtual keyboards. */
    enterkeyhint: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send';
    /** Enables spell checking on the input. */
    spellcheck: boolean;
    /**
     * Tells the browser what type of data will be entered by the user, allowing it to display the appropriate virtual
     * keyboard on supportive devices.
     */
    inputmode: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';
    /**
     * Used for SSR. Will determine if the SSRed component will have the label slot rendered on initial paint.
     */
    withLabel: boolean;
    /**
     * Used for SSR. Will determine if the SSRed component will have the help text slot rendered on initial paint.
     */
    withHelpText: boolean;
    private handleBlur;
    private handleChange;
    private handleClearClick;
    private handleFocus;
    private handleInput;
    private handleKeyDown;
    private handlePasswordToggle;
    handleStepChange(): void;
    /** Sets focus on the input. */
    focus(options?: FocusOptions): void;
    /** Removes focus from the input. */
    blur(): void;
    /** Selects all the text in the input. */
    select(): void;
    /** Sets the start and end positions of the text selection (0-based). */
    setSelectionRange(selectionStart: number, selectionEnd: number, selectionDirection?: 'forward' | 'backward' | 'none'): void;
    /** Replaces a range of text with a new string. */
    setRangeText(replacement: string, start?: number, end?: number, selectMode?: 'select' | 'start' | 'end' | 'preserve'): void;
    /** Displays the browser picker for an input element (only works if the browser supports it for the input type). */
    showPicker(): void;
    /** Increments the value of a numeric input type by the value of the step attribute. */
    stepUp(): void;
    /** Decrements the value of a numeric input type by the value of the step attribute. */
    stepDown(): void;
    formResetCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wa-input': WaInput;
    }
}
