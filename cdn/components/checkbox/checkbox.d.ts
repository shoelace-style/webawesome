import '../icon/icon.js';
import { WebAwesomeFormAssociatedElement } from '../../internal/webawesome-element.js';
import type { CSSResultGroup, PropertyValues } from 'lit';
/**
 * @summary Checkboxes allow the user to toggle an option on or off.
 * @documentation https://backers.webawesome.com/docs/components/checkbox
 * @status stable
 * @since 2.0
 *
 * @dependency wa-icon
 *
 * @slot - The checkbox's label.
 * @slot help-text - Text that describes how to use the checkbox. Alternatively, you can use the `help-text` attribute.
 *
 * @event wa-blur - Emitted when the checkbox loses focus.
 * @event wa-change - Emitted when the checked state changes.
 * @event wa-focus - Emitted when the checkbox gains focus.
 * @event wa-input - Emitted when the checkbox receives input.
 * @event wa-invalid - Emitted when the form control has been checked for validity and its constraints aren't satisfied.
 *
 * @csspart base - The component's base wrapper.
 * @csspart control - The square container that wraps the checkbox's checked state.
 * @csspart control--checked - Matches the control part when the checkbox is checked.
 * @csspart control--indeterminate - Matches the control part when the checkbox is indeterminate.
 * @csspart checked-icon - The checked icon, a `<wa-icon>` element.
 * @csspart indeterminate-icon - The indeterminate icon, a `<wa-icon>` element.
 * @csspart label - The container that wraps the checkbox's label.
 * @csspart form-control-help-text - The help text's wrapper.
 *
 * @cssproperty --background-color - The checkbox's background color.
 * @cssproperty --background-color-checked - The checkbox's background color when checked.
 * @cssproperty --border-color - The color of the checkbox's borders.
 * @cssproperty --border-color-checked - The color of the checkbox's borders when checked.
 * @cssproperty --border-radius - The radius of the checkbox's corners.
 * @cssproperty --border-style - The style of the checkbox's borders.
 * @cssproperty --border-width - The width of the checkbox's borders. Expects a single value.
 * @cssproperty --box-shadow - The shadow effects around the edges of the checkbox.
 * @cssproperty --toggle-size - The size of the checkbox.
 */
export default class WaCheckbox extends WebAwesomeFormAssociatedElement {
    static styles: CSSResultGroup;
    static shadowRootOptions: {
        delegatesFocus: boolean;
        mode: ShadowRootMode;
        slotAssignment?: SlotAssignmentMode | undefined;
    };
    static get validators(): import("../../internal/webawesome-element.js").Validator<WebAwesomeFormAssociatedElement>[];
    private readonly hasSlotController;
    input: HTMLInputElement;
    private hasFocus;
    title: string;
    /** The name of the checkbox, submitted as a name/value pair with form data. */
    name: string;
    /** The current value of the checkbox, submitted as a name/value pair with form data. */
    value: null | string;
    /** The checkbox's size. */
    size: 'small' | 'medium' | 'large';
    /** Disables the checkbox. */
    disabled: boolean;
    /**
     * Draws the checkbox in an indeterminate state. This is usually applied to checkboxes that represents a "select
     * all/none" behavior when associated checkboxes have a mix of checked and unchecked states.
     */
    indeterminate: boolean;
    /** Draws the checkbox in a checked state. */
    checked: boolean;
    /** The default value of the form control. Primarily used for resetting the form control. */
    defaultChecked: boolean;
    /**
     * By default, form controls are associated with the nearest containing `<form>` element. This attribute allows you
     * to place the form control outside of a form and associate it with the form that has this `id`. The form must be in
     * the same document or shadow root for this to work.
     */
    form: null;
    /** Makes the checkbox a required field. */
    required: boolean;
    /** The checkbox's help text. If you need to display HTML, use the `help-text` slot instead. */
    helpText: string;
    private handleClick;
    private handleBlur;
    private handleInput;
    private handleFocus;
    handleDefaultCheckedChange(): void;
    get formValue(): string | null;
    handleValueOrCheckedChange(): void;
    handleStateChange(): void;
    protected willUpdate(changedProperties: PropertyValues<this>): void;
    formResetCallback(): void;
    /** Simulates a click on the checkbox. */
    click(): void;
    /** Sets focus on the checkbox. */
    focus(options?: FocusOptions): void;
    /** Removes focus from the checkbox. */
    blur(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wa-checkbox': WaCheckbox;
    }
}
