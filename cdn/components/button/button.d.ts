import '../icon/icon.js';
import '../spinner/spinner.js';
import { WebAwesomeFormAssociatedElement } from '../../internal/webawesome-element.js';
import type { CSSResultGroup } from 'lit';
/**
 * @summary Buttons represent actions that are available to the user.
 * @documentation https://backers.webawesome.com/docs/components/button
 * @status stable
 * @since 2.0
 *
 * @dependency wa-icon
 * @dependency wa-spinner
 *
 * @event wa-blur - Emitted when the button loses focus.
 * @event wa-focus - Emitted when the button gains focus.
 * @event wa-invalid - Emitted when the form control has been checked for validity and its constraints aren't satisfied.
 *
 * @slot - The button's label.
 * @slot prefix - A presentational prefix icon or similar element.
 * @slot suffix - A presentational suffix icon or similar element.
 *
 * @csspart base - The component's base wrapper.
 * @csspart prefix - The container that wraps the prefix.
 * @csspart label - The button's label.
 * @csspart suffix - The container that wraps the suffix.
 * @csspart caret - The button's caret icon, a `<wa-icon>` element.
 * @csspart spinner - The spinner that shows when the button is in the loading state.
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
 * @cssproperty --label-color - The color of the button's label.
 * @cssproperty --label-color-active - The color of the button's label when active.
 * @cssproperty --label-color-hover - The color of the button's label on hover.
 */
export default class WaButton extends WebAwesomeFormAssociatedElement {
    static styles: CSSResultGroup;
    static get validators(): import("../../internal/webawesome-element.js").Validator<WebAwesomeFormAssociatedElement>[];
    assumeInteractionOn: string[];
    private readonly localize;
    button: HTMLButtonElement | HTMLLinkElement;
    private hasFocus;
    visuallyHiddenLabel: boolean;
    invalid: boolean;
    title: string;
    /** The button's theme variant. */
    variant: 'neutral' | 'brand' | 'success' | 'warning' | 'danger';
    /** The button's visual appearance. */
    appearance: 'filled' | 'tinted' | 'outlined' | 'text';
    /** The button's size. */
    size: 'small' | 'medium' | 'large';
    /** Draws the button with a caret. Used to indicate that the button triggers a dropdown menu or similar behavior. */
    caret: boolean;
    /** Disables the button. Does not apply to link buttons. */
    disabled: boolean;
    /** Draws the button in a loading state. */
    loading: boolean;
    /** Draws a pill-style button with rounded edges. */
    pill: boolean;
    /**
     * The type of button. Note that the default value is `button` instead of `submit`, which is opposite of how native
     * `<button>` elements behave. When the type is `submit`, the button will submit the surrounding form.
     */
    type: 'button' | 'submit' | 'reset';
    /**
     * The name of the button, submitted as a name/value pair with form data, but only when this button is the submitter.
     * This attribute is ignored when `href` is present.
     */
    name: string | null;
    /**
     * The value of the button, submitted as a pair with the button's name as part of the form data, but only when this
     * button is the submitter. This attribute is ignored when `href` is present.
     */
    value: string;
    /** When set, the underlying button will be rendered as an `<a>` with this `href` instead of a `<button>`. */
    href: string;
    /** Tells the browser where to open the link. Only used when `href` is present. */
    target: '_blank' | '_parent' | '_self' | '_top';
    /**
     * When using `href`, this attribute will map to the underlying link's `rel` attribute. Unlike regular links, the
     * default is `noreferrer noopener` to prevent security exploits. However, if you're using `target` to point to a
     * specific tab/window, this will prevent that from working correctly. You can remove or change the default value by
     * setting the attribute to an empty string or a value of your choice, respectively.
     */
    rel: string;
    /** Tells the browser to download the linked file as this filename. Only used when `href` is present. */
    download?: string;
    /**
     * The "form owner" to associate the button with. If omitted, the closest containing form will be used instead. The
     * value of this attribute must be an id of a form in the same document or shadow root as the button.
     */
    form: string | null;
    /** Used to override the form owner's `action` attribute. */
    formAction: string;
    /** Used to override the form owner's `enctype` attribute.  */
    formEnctype: 'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain';
    /** Used to override the form owner's `method` attribute.  */
    formMethod: 'post' | 'get';
    /** Used to override the form owner's `novalidate` attribute. */
    formNoValidate: boolean;
    /** Used to override the form owner's `target` attribute. */
    formTarget: '_self' | '_blank' | '_parent' | '_top' | string;
    private handleBlur;
    private handleFocus;
    private handleClick;
    private constructLightDOMButton;
    private handleInvalid;
    private handleLabelSlotChange;
    private isButton;
    private isLink;
    handleDisabledChange(): void;
    setValue(..._args: Parameters<WebAwesomeFormAssociatedElement['setValue']>): void;
    /** Simulates a click on the button. */
    click(): void;
    /** Sets focus on the button. */
    focus(options?: FocusOptions): void;
    /** Removes focus from the button. */
    blur(): void;
    render(): import("lit-html").TemplateResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'wa-button': WaButton;
    }
}
