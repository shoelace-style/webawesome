import '../icon/icon.js';
import { WebAwesomeFormAssociatedElement } from '../../internal/webawesome-element.js';
import type { CSSResultGroup } from 'lit';
/**
 * @summary Icons buttons are simple, icon-only buttons that can be used for actions and in toolbars.
 * @documentation https://backers.webawesome.com/docs/components/icon-button
 * @status stable
 * @since 2.0
 *
 * @dependency wa-icon
 *
 * @event wa-blur - Emitted when the icon button loses focus.
 * @event wa-focus - Emitted when the icon button gains focus.
 *
 * @cssproperty --background-color-hover - The color of the button's background on hover.
 *
 * @csspart base - The component's base wrapper.
 */
export default class WaIconButton extends WebAwesomeFormAssociatedElement {
    static styles: CSSResultGroup;
    button: HTMLButtonElement | HTMLLinkElement;
    private hasFocus;
    /** The name of the icon to draw. Available names depend on the icon library being used. */
    name: string | null;
    /**
     * The family of icons to choose from. For Font Awesome, valid options include `classic`, `sharp`, `duotone`, and
     * `brands`. Custom icon libraries may or may not use this property.
     */
    family: string;
    /**
     * The name of the icon's variant. For Font Awesome, valid options include `thin`, `light`, `regular`, and `solid` for
     * the _classic_ and _sharp_ families. Custom icon libraries may or may not use this property.
     */
    variant: string;
    /** The name of a registered custom icon library. */
    library?: string;
    /**
     * An external URL of an SVG file. Be sure you trust the content you are including, as it will be executed as code and
     * can result in XSS attacks.
     */
    src?: string;
    /** When set, the underlying button will be rendered as an `<a>` with this `href` instead of a `<button>`. */
    href?: string;
    /** Tells the browser where to open the link. Only used when `href` is set. */
    target?: '_blank' | '_parent' | '_self' | '_top';
    /** Tells the browser to download the linked file as this filename. Only used when `href` is set. */
    download?: string;
    /**
     * A description that gets read by assistive devices. For optimal accessibility, you should always include a label
     * that describes what the icon button does.
     */
    label: string;
    /** Disables the button. */
    disabled: boolean;
    private handleBlur;
    private handleFocus;
    private handleClick;
    /** Simulates a click on the icon button. */
    click(): void;
    /** Sets focus on the icon button. */
    focus(options?: FocusOptions): void;
    /** Removes focus from the icon button. */
    blur(): void;
    render(): import("lit-html").TemplateResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'wa-icon-button': WaIconButton;
    }
}
