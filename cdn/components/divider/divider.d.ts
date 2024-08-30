import WebAwesomeElement from '../../internal/webawesome-element.js';
import type { CSSResultGroup } from 'lit';
/**
 * @summary Dividers are used to visually separate or group elements.
 * @documentation https://backers.webawesome.com/docs/components/divider
 * @status stable
 * @since 2.0
 *
 * @cssproperty --color - The color of the divider.
 * @cssproperty --width - The width of the divider.
 * @cssproperty --spacing - The spacing of the divider.
 */
export default class WaDivider extends WebAwesomeElement {
    static styles: CSSResultGroup;
    /** Draws the divider in a vertical orientation. */
    vertical: boolean;
    connectedCallback(): void;
    handleVerticalChange(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'wa-divider': WaDivider;
    }
}
