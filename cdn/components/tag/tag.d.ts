import '../icon-button/icon-button.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import type { CSSResultGroup } from 'lit';
/**
 * @summary Tags are used as labels to organize things or to indicate a selection.
 * @documentation https://backers.webawesome.com/docs/components/tag
 * @status stable
 * @since 2.0
 *
 * @dependency wa-icon-button
 *
 * @slot - The tag's content.
 *
 * @event wa-remove - Emitted when the remove button is activated.
 *
 * @csspart base - The component's base wrapper.
 * @csspart content - The tag's content.
 * @csspart remove-button - The tag's remove button, an `<wa-icon-button>`.
 * @csspart remove-button__base - The remove button's exported `base` part.
 *
 * @cssproperty --background-color - The tag's background color.
 * @cssproperty --border-color - The color of the tag's border.
 * @cssproperty --border-radius - The radius of the tag's corners.
 * @cssproperty --border-style - The style of the tag's border.
 * @cssproperty --border-width - The width of the tag's border.
 * @cssproperty --content-color - The color of the tag's content.
 */
export default class WaTag extends WebAwesomeElement {
    static styles: CSSResultGroup;
    private readonly localize;
    /** The tag's theme variant. */
    variant: 'brand' | 'success' | 'neutral' | 'warning' | 'danger' | 'text';
    /** The tag's size. */
    size: 'small' | 'medium' | 'large';
    /** Draws a pill-style tag with rounded edges. */
    pill: boolean;
    /** Makes the tag removable and shows a remove button. */
    removable: boolean;
    private handleRemoveClick;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wa-tag': WaTag;
    }
}
