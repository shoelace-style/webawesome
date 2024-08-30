import WebAwesomeElement from '../../internal/webawesome-element.js';
import type { CSSResultGroup } from 'lit';
/**
 * @summary Badges are used to draw attention and display statuses or counts.
 * @documentation https://backers.webawesome.com/docs/components/badge
 * @status stable
 * @since 2.0
 *
 * @slot - The badge's content.
 *
 * @csspart base - The component's base wrapper.
 *
 * @cssproperty --background-color - The badge's background color.
 * @cssproperty --border-color - The color of the badge's border.
 * @cssproperty --border-radius - The radius of the badge's corners.
 * @cssproperty --border-style - The style of the badge's border.
 * @cssproperty --border-width - The width of the badge's border.
 * @cssproperty --content-color - The color of the badge's content.
 */
export default class WaBadge extends WebAwesomeElement {
    static styles: CSSResultGroup;
    /** The badge's theme variant. */
    variant: 'brand' | 'success' | 'neutral' | 'warning' | 'danger';
    /** Draws a pill-style badge with rounded edges. */
    pill: boolean;
    /** Makes the badge pulsate to draw attention. */
    pulse: boolean;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wa-badge': WaBadge;
    }
}
