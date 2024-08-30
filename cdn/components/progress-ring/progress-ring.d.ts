import WebAwesomeElement from '../../internal/webawesome-element.js';
import type { CSSResultGroup } from 'lit';
/**
 * @summary Progress rings are used to show the progress of a determinate operation in a circular fashion.
 * @documentation https://backers.webawesome.com/docs/components/progress-ring
 * @status stable
 * @since 2.0
 *
 * @slot - A label to show inside the ring.
 *
 * @csspart base - The component's base wrapper.
 * @csspart label - The progress ring label.
 *
 * @cssproperty --size - The diameter of the progress ring (cannot be a percentage).
 * @cssproperty --track-width - The width of the track.
 * @cssproperty --track-color - The color of the track.
 * @cssproperty --indicator-width - The width of the indicator. Defaults to the track width.
 * @cssproperty --indicator-color - The color of the indicator.
 * @cssproperty --indicator-transition-duration - The duration of the indicator's transition when the value changes.
 */
export default class WaProgressRing extends WebAwesomeElement {
    static styles: CSSResultGroup;
    private readonly localize;
    indicator: SVGCircleElement;
    indicatorOffset: string;
    /** The current progress as a percentage, 0 to 100. */
    value: number;
    /** A custom label for assistive devices. */
    label: string;
    updated(changedProps: Map<string, unknown>): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wa-progress-ring': WaProgressRing;
    }
}
