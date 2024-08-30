import '../icon/icon.js';
import { WebAwesomeFormAssociatedElement } from '../../internal/webawesome-element.js';
import type { CSSResultGroup } from 'lit';
/**
 * @summary Radios allow the user to select a single option from a group.
 * @documentation https://backers.webawesome.com/docs/components/radio
 * @status stable
 * @since 2.0
 *
 * @dependency wa-icon
 *
 * @slot - The radio's label.
 *
 * @event wa-blur - Emitted when the control loses focus.
 * @event wa-focus - Emitted when the control gains focus.
 *
 * @csspart base - The component's base wrapper.
 * @csspart control - The circular container that wraps the radio's checked state.
 * @csspart control--checked - The radio control when the radio is checked.
 * @csspart checked-icon - The checked icon.
 * @csspart label - The container that wraps the radio's label.
 *
 * @cssproperty --background-color - The radio's background color.
 * @cssproperty --background-color-checked - The radio's background color when checked.
 * @cssproperty --border-color - The color of the radio's borders.
 * @cssproperty --border-color-checked - The color of the radio's borders when checked.
 * @cssproperty --border-style - The style of the radio's borders.
 * @cssproperty --border-width - The width of the radio's borders. Expects a single value.
 * @cssproperty --box-shadow - The shadow effects around the edges of the radio.
 * @cssproperty --checked-icon-color - The color of the radio's checked icon.
 * @cssproperty --checked-icon-scale - The size of the checked icon relative to the radio.
 * @cssproperty --toggle-size - The size of the radio.
 */
export default class WaRadio extends WebAwesomeFormAssociatedElement {
    static styles: CSSResultGroup;
    checked: boolean;
    protected hasFocus: boolean;
    /**
     * The string pointing to a form's id.
     */
    form: string | null;
    /** The radio's value. When selected, the radio group will receive this value. */
    value: string;
    /**
     * The radio's size. When used inside a radio group, the size will be determined by the radio group's size so this
     * attribute can typically be omitted.
     */
    size: 'small' | 'medium' | 'large';
    /** Disables the radio. */
    disabled: boolean;
    constructor();
    connectedCallback(): void;
    private handleBlur;
    private handleFocus;
    private setInitialAttributes;
    handleCheckedChange(): void;
    /**
     * @override
     */
    setValue(): void;
    handleDisabledChange(): void;
    private handleClick;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wa-radio': WaRadio;
    }
}
