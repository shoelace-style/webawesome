import WebAwesomeElement from '../../internal/webawesome-element.js';
import type { CSSResultGroup } from 'lit';
/**
 * @summary Split panels display two adjacent panels, allowing the user to reposition them.
 * @documentation https://backers.webawesome.com/docs/components/split-panel
 * @status stable
 * @since 2.0
 *
 * @event wa-reposition - Emitted when the divider's position changes.
 *
 * @slot start - Content to place in the start panel.
 * @slot end - Content to place in the end panel.
 * @slot divider - The divider. Useful for slotting in a custom icon that renders as a handle.
 *
 * @csspart start - The start panel.
 * @csspart end - The end panel.
 * @csspart panel - Targets both the start and end panels.
 * @csspart divider - The divider that separates the start and end panels.
 *
 * @cssproperty --divider-color - The color of the divider.
 * @cssproperty [--divider-width=4px] - The width of the visible divider.
 * @cssproperty [--divider-hit-area=12px] - The invisible region around the divider where dragging can occur. This is
 *  usually wider than the divider to facilitate easier dragging.
 * @cssproperty [--min=0] - The minimum allowed size of the primary panel.
 * @cssproperty [--max=100%] - The maximum allowed size of the primary panel.
 */
export default class WaSplitPanel extends WebAwesomeElement {
    static styles: CSSResultGroup;
    private cachedPositionInPixels;
    private readonly localize;
    private resizeObserver;
    private size;
    divider: HTMLElement;
    /**
     * The current position of the divider from the primary panel's edge as a percentage 0-100. Defaults to 50% of the
     * container's initial size.
     */
    position: number;
    /** The current position of the divider from the primary panel's edge in pixels. */
    positionInPixels: number;
    /** Draws the split panel in a vertical orientation with the start and end panels stacked. */
    vertical: boolean;
    /** Disables resizing. Note that the position may still change as a result of resizing the host element. */
    disabled: boolean;
    /**
     * If no primary panel is designated, both panels will resize proportionally when the host element is resized. If a
     * primary panel is designated, it will maintain its size and the other panel will grow or shrink as needed when the
     * host element is resized.
     */
    primary?: 'start' | 'end';
    /**
     * One or more space-separated values at which the divider should snap. Values can be in pixels or percentages, e.g.
     * `"100px 50%"`.
     */
    snap?: string;
    /** How close the divider must be to a snap point until snapping occurs. */
    snapThreshold: number;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private detectSize;
    private percentageToPixels;
    private pixelsToPercentage;
    private handleDrag;
    private handleKeyDown;
    private handleResize;
    handlePositionChange(): void;
    handlePositionInPixelsChange(): void;
    handleVerticalChange(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wa-split-panel': WaSplitPanel;
    }
}
declare global {
    interface HTMLElementTagNameMap {
        'wa-split-panel': WaSplitPanel;
    }
}
