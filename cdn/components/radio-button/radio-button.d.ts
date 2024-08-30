import { WebAwesomeFormAssociatedElement } from '../../internal/webawesome-element.js';
import type { CSSResultGroup } from 'lit';
/**
 * @summary Radios buttons allow the user to select a single option from a group using a button-like control.
 * @documentation https://backers.webawesome.com/docs/components/radio-button
 * @status stable
 * @since 2.0
 *
 * @slot - The radio button's label.
 * @slot prefix - A presentational prefix icon or similar element.
 * @slot suffix - A presentational suffix icon or similar element.
 *
 * @event wa-blur - Emitted when the button loses focus.
 * @event wa-focus - Emitted when the button gains focus.
 *
 * @cssproperty --background-color - The button's background color.
 * @cssproperty --background-color-active - The button's background color when active.
 * @cssproperty --background-color-hover - The button's background color on hover.
 * @cssproperty --border-color - The color of the button's border.
 * @cssproperty --border-color-active - The color of the button's border when active.
 * @cssproperty --border-color-hover - The color of the button's border on hover.
 * @cssproperty --border-radius - The radius of the button's corners.
 * @cssproperty --border-style - The style of the button's border.
 * @cssproperty --border-width - The width of the button's border. Expects a single value.
 * @cssproperty --box-shadow - The shadow effects around the edges of the button.
 * @cssproperty --indicator-color - The color of the checked button indicator.
 * @cssproperty --indicator-width - The width of the checked button indicator.
 * @cssproperty --label-color - The color of the button's label.
 * @cssproperty --label-color-active - The color of the button's label when active.
 * @cssproperty --label-color-hover - The color of the button's label on hover.
 *
 * @csspart base - The component's base wrapper.
 * @csspart button - The internal `<button>` element.
 * @csspart button--checked - The internal button element when the radio button is checked.
 * @csspart prefix - The container that wraps the prefix.
 * @csspart label - The container that wraps the radio button's label.
 * @csspart suffix - The container that wraps the suffix.
 */
export default class WaRadioButton extends WebAwesomeFormAssociatedElement {
    static styles: CSSResultGroup;
    private readonly hasSlotController;
    input: HTMLInputElement;
    hiddenInput: HTMLInputElement;
    protected hasFocus: boolean;
    /**
     * @internal The radio button's checked state. This is exposed as an "internal" attribute so we can reflect it, making
     * it easier to style in button groups.
     */
    checked: boolean;
    /** The radio's value. When selected, the radio group will receive this value. */
    value: string;
    /** Disables the radio button. */
    disabled: boolean;
    /**
     * The radio button's size. When used inside a radio group, the size will be determined by the radio group's size so
     * this attribute can typically be omitted.
     */
    size: 'small' | 'medium' | 'large';
    /** Draws a pill-style radio button with rounded edges. */
    pill: boolean;
    /**
     * The string pointing to a form's id.
     */
    form: string | null;
    /**
     * Used for SSR. if true, will show slotted prefix on initial render.
     */
    withPrefix: boolean;
    /**
     * Used for SSR. if true, will show slotted suffix on initial render.
     */
    withSuffix: boolean;
    /**
     * Used for SSR. if true, will show slotted suffix on initial render. (should this be withDefault, since its the default slot??)
     */
    withLabel: boolean;
    static shadowRootOptions: {
        delegatesFocus: boolean;
        mode: ShadowRootMode;
        slotAssignment?: SlotAssignmentMode | undefined;
    };
    connectedCallback(): void;
    private handleBlur;
    private handleClick;
    private handleFocus;
    handleDisabledChange(): void;
    /** Sets focus on the radio button. */
    focus(options?: FocusOptions): void;
    /** Removes focus from the radio button. */
    blur(): void;
    render(): import("lit-html").TemplateResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'wa-radio-button': WaRadioButton;
    }
}
