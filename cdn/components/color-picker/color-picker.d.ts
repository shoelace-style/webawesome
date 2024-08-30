import '../button-group/button-group.js';
import '../button/button.js';
import '../dropdown/dropdown.js';
import '../icon/icon.js';
import { WebAwesomeFormAssociatedElement } from '../../internal/webawesome-element.js';
import type { CSSResultGroup, PropertyValues } from 'lit';
import type WaDropdown from '../dropdown/dropdown.js';
import type WaInput from '../input/input.js';
/**
 * @summary Color pickers allow the user to select a color.
 * @documentation https://backers.webawesome.com/docs/components/color-picker
 * @status stable
 * @since 2.0
 *
 * @dependency wa-button
 * @dependency wa-button-group
 * @dependency wa-dropdown
 * @dependency wa-input
 * @dependency wa-visually-hidden
 *
 * @slot label - The color picker's form label. Alternatively, you can use the `label` attribute.
 * @slot help-text - The color picker's form help text. Alternatively, you can use the `helpText` attribute.
 *
 * @event wa-blur - Emitted when the color picker loses focus.
 * @event wa-change - Emitted when the color picker's value changes.
 * @event wa-focus - Emitted when the color picker receives focus.
 * @event wa-input - Emitted when the color picker receives input.
 * @event wa-invalid - Emitted when the form control has been checked for validity and its constraints aren't satisfied.
 *
 * @csspart base - The component's base wrapper.
 * @csspart trigger - The color picker's dropdown trigger.
 * @csspart swatches - The container that holds the swatches.
 * @csspart swatch - Each individual swatch.
 * @csspart grid - The color grid.
 * @csspart grid-handle - The color grid's handle.
 * @csspart slider - Hue and opacity sliders.
 * @csspart slider-handle - Hue and opacity slider handles.
 * @csspart hue-slider - The hue slider.
 * @csspart hue-slider-handle - The hue slider's handle.
 * @csspart opacity-slider - The opacity slider.
 * @csspart opacity-slider-handle - The opacity slider's handle.
 * @csspart preview - The preview color.
 * @csspart input - The text input.
 * @csspart eye-dropper-button - The eye dropper button.
 * @csspart eye-dropper-button__base - The eye dropper button's exported `button` part.
 * @csspart eye-dropper-button__prefix - The eye dropper button's exported `prefix` part.
 * @csspart eye-dropper-button__label - The eye dropper button's exported `label` part.
 * @csspart eye-dropper-button__suffix - The eye dropper button's exported `suffix` part.
 * @csspart eye-dropper-button__caret - The eye dropper button's exported `caret` part.
 * @csspart format-button - The format button.
 * @csspart format-button__base - The format button's exported `button` part.
 * @csspart format-button__prefix - The format button's exported `prefix` part.
 * @csspart format-button__label - The format button's exported `label` part.
 * @csspart format-button__suffix - The format button's exported `suffix` part.
 * @csspart format-button__caret - The format button's exported `caret` part.
 *
 * @cssproperty --background-color - The color picker's background color.
 * @cssproperty --border-color - The color of the color picker's borders.
 * @cssproperty --border-radius - The radius of the color picker's corners.
 * @cssproperty --border-style - The style of the color picker's borders.
 * @cssproperty --border-width - The width of the color picker's borders.
 * @cssproperty --grid-width - The width of the color grid.
 * @cssproperty --grid-height - The height of the color grid.
 * @cssproperty --grid-handle-size - The size of the color grid's handle.
 * @cssproperty --preview-size - The size of the preview color.
 * @cssproperty --preview-border-radius - The corners of the preview color.
 * @cssproperty --slider-height - The height of the hue and alpha sliders.
 * @cssproperty --slider-handle-size - The diameter of the slider's handle.
 * @cssproperty --spacing - The amount of space around and between the color picker's controls.
 * @cssproperty --swatch-border-radius - The corners of each predefined color swatch.
 * @cssproperty --swatch-size - The size of each predefined color swatch.
 * @cssproperty --trigger-border-radius - The corners of the color picker's dropdown trigger.
 */
export default class WaColorPicker extends WebAwesomeFormAssociatedElement {
    static styles: CSSResultGroup;
    static shadowRootOptions: {
        delegatesFocus: boolean;
        mode: ShadowRootMode;
        slotAssignment?: SlotAssignmentMode | undefined;
    };
    static get validators(): import("../../internal/webawesome-element.js").Validator<WebAwesomeFormAssociatedElement>[];
    private readonly hasSlotController;
    private isSafeValue;
    private readonly localize;
    base: HTMLElement;
    input: WaInput;
    triggerLabel: HTMLElement;
    triggerButton: HTMLButtonElement;
    get validationTarget(): HTMLButtonElement | WaInput;
    dropdown: WaDropdown;
    previewButton: HTMLButtonElement;
    trigger: HTMLButtonElement;
    private hasFocus;
    private isDraggingGridHandle;
    private isEmpty;
    private inputValue;
    private hue;
    private saturation;
    private brightness;
    private alpha;
    /**
     * The current value of the color picker. The value's format will vary based the `format` attribute. To get the value
     * in a specific format, use the `getFormattedValue()` method. The value is submitted as a name/value pair with form
     * data.
     */
    value: string;
    /** The default value of the form control. Primarily used for resetting the form control. */
    defaultValue: string;
    withLabel: boolean;
    withHelpText: boolean;
    private hasEyeDropper;
    /**
     * The color picker's label. This will not be displayed, but it will be announced by assistive devices. If you need to
     * display HTML, you can use the `label` slot` instead.
     */
    label: string;
    /**
     * The color picker's help text. If you need to display HTML, use the `help-text` slot instead.
     */
    helpText: string;
    /**
     * The format to use. If opacity is enabled, these will translate to HEXA, RGBA, HSLA, and HSVA respectively. The color
     * picker will accept user input in any format (including CSS color names) and convert it to the desired format.
     */
    format: 'hex' | 'rgb' | 'hsl' | 'hsv';
    /** Determines the size of the color picker's trigger */
    size: 'small' | 'medium' | 'large';
    /** Removes the button that lets users toggle between format.   */
    noFormatToggle: boolean;
    /** The name of the form control, submitted as a name/value pair with form data. */
    name: string | null;
    /** Disables the color picker. */
    disabled: boolean;
    /**
     * Enable this option to prevent the panel from being clipped when the component is placed inside a container with
     * `overflow: auto|scroll`. Hoisting uses a fixed positioning strategy that works in many, but not all, scenarios.
     */
    hoist: boolean;
    /** Shows the opacity slider. Enabling this will cause the formatted value to be HEXA, RGBA, or HSLA. */
    opacity: boolean;
    /** By default, values are lowercase. With this attribute, values will be uppercase instead. */
    uppercase: boolean;
    /**
     * One or more predefined color swatches to display as presets in the color picker. Can include any format the color
     * picker can parse, including HEX(A), RGB(A), HSL(A), HSV(A), and CSS color names. Each color must be separated by a
     * semicolon (`;`). Alternatively, you can pass an array of color values to this property using JavaScript.
     */
    swatches: string | string[];
    /**
     * By default, form controls are associated with the nearest containing `<form>` element. This attribute allows you
     * to place the form control outside of a form and associate it with the form that has this `id`. The form must be in
     * the same document or shadow root for this to work.
     */
    form: null;
    /** Makes the color picker a required field. */
    required: boolean;
    constructor();
    private handleCopy;
    private handleFocusIn;
    private handleFocusOut;
    private handleFormatToggle;
    private handleAlphaDrag;
    private handleHueDrag;
    private handleGridDrag;
    private handleAlphaKeyDown;
    private handleHueKeyDown;
    private handleGridKeyDown;
    private handleInputChange;
    private handleInputInput;
    private handleInputKeyDown;
    private handleTouchMove;
    private parseColor;
    private setColor;
    private setLetterCase;
    private syncValues;
    private handleAfterHide;
    private handleAfterShow;
    private handleEyeDropper;
    private selectSwatch;
    /** Generates a hex string from HSV values. Hue must be 0-360. All other arguments must be 0-100. */
    getHexString(hue: number, saturation: number, brightness: number, alpha?: number): string;
    private stopNestedEventPropagation;
    handleFormatChange(): void;
    handleOpacityChange(): void;
    protected willUpdate(changedProperties: PropertyValues<this>): void;
    handleValueChange(oldValue: string | undefined, newValue: string): void;
    /** Sets focus on the color picker. */
    focus(options?: FocusOptions): void;
    /** Removes focus from the color picker. */
    blur(): void;
    /** Returns the current value as a string in the specified format. */
    getFormattedValue(format?: 'hex' | 'hexa' | 'rgb' | 'rgba' | 'hsl' | 'hsla' | 'hsv' | 'hsva'): string;
    /** Checks for validity and shows the browser's validation message if the control is invalid. */
    reportValidity(): boolean;
    formResetCallback(): void;
    firstUpdated(changedProperties: PropertyValues<this>): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wa-color-picker': WaColorPicker;
    }
}
