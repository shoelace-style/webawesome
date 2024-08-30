import WebAwesomeElement from '../../internal/webawesome-element.js';
import type { CSSResultGroup } from 'lit';
/**
 * @summary Progress bars are used to show the status of an ongoing operation.
 * @documentation https://backers.webawesome.com/docs/components/progress-bar
 * @status stable
 * @since 2.0
 *
 * @slot - A label to show inside the progress indicator.
 *
 * @csspart base - The component's base wrapper.
 * @csspart indicator - The progress bar's indicator.
 * @csspart label - The progress bar's label.
 *
 * @cssproperty --height - The progress bar's height.
 * @cssproperty --track-color - The color of the track.
 * @cssproperty --indicator-color - The color of the indicator.
 * @cssproperty --label-color - The color of the label.
 * @cssproperty --box-shadow - The shadow effects around the edges of the progress bar.
 */
export default class WaProgressBar extends WebAwesomeElement {
    static styles: CSSResultGroup;
    private readonly localize;
    /** The current progress as a percentage, 0 to 100. */
    value: number;
    /** When true, percentage is ignored, the label is hidden, and the progress bar is drawn in an indeterminate state. */
    indeterminate: boolean;
    /** A custom label for assistive devices. */
    label: string;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wa-progress-bar': WaProgressBar;
    }
}
