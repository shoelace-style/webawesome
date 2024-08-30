import WebAwesomeElement from '../../internal/webawesome-element.js';
import type { CSSResultGroup } from 'lit';
/**
 * @summary The Resize Observer component offers a thin, declarative interface to the [`ResizeObserver API`](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver).
 * @documentation https://backers.webawesome.com/docs/components/resize-observer
 * @status stable
 * @since 2.0
 *
 * @slot - One or more elements to watch for resizing.
 *
 * @event {{ entries: ResizeObserverEntry[] }} wa-resize - Emitted when the element is resized.
 */
export default class WaResizeObserver extends WebAwesomeElement {
    static styles: CSSResultGroup;
    private resizeObserver;
    private observedElements;
    /** Disables the observer. */
    disabled: boolean;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private handleSlotChange;
    private startObserver;
    private stopObserver;
    handleDisabledChange(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wa-resize-observer': WaResizeObserver;
    }
}
