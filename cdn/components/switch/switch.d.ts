import { WebAwesomeFormAssociatedElement } from '../../internal/webawesome-element.js';
import type { CSSResultGroup, PropertyValues } from 'lit';
/**
 * @summary Switches allow the user to toggle an option on or off.
 * @documentation https://backers.webawesome.com/docs/components/switch
 * @status stable
 * @since 2.0
 *
 * @slot - The switch's label.
 * @slot help-text - Text that describes how to use the switch. Alternatively, you can use the `help-text` attribute.
 *
 * @event wa-blur - Emitted when the control loses focus.
 * @event wa-change - Emitted when the control's checked state changes.
 * @event wa-input - Emitted when the control receives input.
 * @event wa-focus - Emitted when the control gains focus.
 * @event wa-invalid - Emitted when the form control has been checked for validity and its constraints aren't satisfied.
 *
 * @csspart base - The component's base wrapper.
 * @csspart control - The control that houses the switch's thumb.
 * @csspart thumb - The switch's thumb.
 * @csspart label - The switch's label.
 * @csspart form-control-help-text - The help text's wrapper.
 *
 * @cssproperty --background-color - The switch's background color.
 * @cssproperty --background-color-checked - The switch's background color when checked.
 * @cssproperty --border-color - The color of the switch's borders.
 * @cssproperty --border-color-checked - The color of the switch's borders when checked.
 * @cssproperty --border-style - The style of the switch's borders.
 * @cssproperty --border-width - The width of the switch's borders. Expects a single value.
 * @cssproperty --box-shadow - The shadow effects around the edges of the switch.
 * @cssproperty --height - The height of the switch.
 * @cssproperty --thumb-color - The color of the thumb.
 * @cssproperty --thumb-color-checked - The color of the thumb when checked.
 * @cssproperty --thumb-shadow - The shadow effects around the edges of the thumb.
 * @cssproperty --thumb-size - The size of the thumb.
 * @cssproperty --width - The width of the switch.
 */
export default class WaSwitch extends WebAwesomeFormAssociatedElement {
    static styles: CSSResultGroup;
    static get validators(): import("../../internal/webawesome-element.js").Validator<WebAwesomeFormAssociatedElement>[];
    private readonly hasSlotController;
    input: HTMLInputElement;
    private hasFocus;
    title: string;
    /** The name of the switch, submitted as a name/value pair with form data. */
    name: string | null;
    /** The current value of the switch, submitted as a name/value pair with form data. */
    value: null | string;
    /** The switch's size. */
    size: 'small' | 'medium' | 'large';
    /** Disables the switch. */
    disabled: boolean;
    /** Draws the switch in a checked state. */
    checked: boolean;
    /** The default value of the form control. Primarily used for resetting the form control. */
    defaultChecked: boolean;
    /**
     * By default, form controls are associated with the nearest containing `<form>` element. This attribute allows you
     * to place the form control outside of a form and associate it with the form that has this `id`. The form must be in
     * the same document or shadow root for this to work.
     */
    form: null;
    /** Makes the switch a required field. */
    required: boolean;
    /** The switch's help text. If you need to display HTML, use the `help-text` slot instead. */
    helpText: string;
    /**
     * Used for SSR. If you slot in help-text, make sure to add `with-help-text` to your component to get it to properly render with SSR.
     */
    withHelpText: boolean;
    firstUpdated(changedProperties: PropertyValues<typeof this>): void;
    private handleBlur;
    private handleInput;
    private handleClick;
    private handleFocus;
    private handleKeyDown;
    protected willUpdate(changedProperties: PropertyValues<this>): void;
    handleValueOrCheckedChange(): void;
    handleDefaultCheckedChange(): void;
    handleDisabledChange(): void;
    /** Simulates a click on the switch. */
    click(): void;
    /** Sets focus on the switch. */
    focus(options?: FocusOptions): void;
    /** Removes focus from the switch. */
    blur(): void;
    setValue(value: string | File | FormData | null, stateValue?: string | File | FormData | null | undefined): void;
    formResetCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wa-switch': WaSwitch;
    }
}
