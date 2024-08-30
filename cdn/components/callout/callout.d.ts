import WebAwesomeElement from '../../internal/webawesome-element.js';
import type { CSSResultGroup } from 'lit';
/**
 * @summary Callouts are used to display important messages inline.
 * @documentation https://backers.webawesome.com/docs/components/callout
 * @status stable
 * @since 2.0
 *
 * @slot - The callout's main content.
 * @slot icon - An icon to show in the callout. Works best with `<wa-icon>`.
 *
 * @csspart base - The component's base wrapper.
 * @csspart icon - The container that wraps the optional icon.
 * @csspart message - The container that wraps the callout's main content.
 *
 * @cssproperty --background-color - The callout's background color.
 * @cssproperty --border-color - The color of the callout's border.
 * @cssproperty --border-radius - The radius of the callout's corners.
 * @cssproperty --border-style - The style of the callout's borders.
 * @cssproperty --border-width - The width of the callout's borders.
 * @cssproperty --content-color - The color of the callout's content.
 * @cssproperty --icon-color - The color of the callout's icon.
 * @cssproperty --icon-size - The size of the callout's icon.
 * @cssproperty --spacing - The amount of space around and between the callout's content. Expects a single value.
 */
export default class WaCallout extends WebAwesomeElement {
    static styles: CSSResultGroup;
    /** The callout's theme variant. */
    variant: 'brand' | 'success' | 'neutral' | 'warning' | 'danger';
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wa-callout': WaCallout;
    }
}
