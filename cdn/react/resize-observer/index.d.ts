import Component from '../../components/resize-observer/resize-observer.js';
import { type EventName } from '@lit/react';
import type { WaResizeEvent } from '../../events/events.js';
export type { WaResizeEvent } from '../../events/events.js';
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
declare const reactWrapper: import("@lit/react").ReactWebComponent<Component, {
    onWaResize: EventName<WaResizeEvent>;
}>;
export default reactWrapper;
