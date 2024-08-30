import Component from '../../components/image-comparer/image-comparer.js';
import { type EventName } from '@lit/react';
import type { WaChangeEvent } from '../../events/events.js';
export type { WaChangeEvent } from '../../events/events.js';
/**
 * @summary Compare visual differences between similar photos with a sliding panel.
 * @documentation https://backers.webawesome.com/docs/components/image-comparer
 * @status stable
 * @since 2.0
 *
 * @dependency wa-icon
 *
 * @slot before - The before image, an `<img>` or `<svg>` element.
 * @slot after - The after image, an `<img>` or `<svg>` element.
 * @slot handle - The icon used inside the handle.
 *
 * @event wa-change - Emitted when the position changes.
 *
 * @csspart base - The component's base wrapper.
 * @csspart before - The container that wraps the before image.
 * @csspart after - The container that wraps the after image.
 * @csspart divider - The divider that separates the images.
 * @csspart handle - The handle that the user drags to expose the after image.
 *
 * @cssproperty --divider-color - The color of the divider.
 * @cssproperty --divider-width - The width of the dividing line.
 * @cssproperty --handle-color - The color of the icon used inside the handle.
 * @cssproperty --handle-size - The size of the compare handle.
 */
declare const reactWrapper: import("@lit/react").ReactWebComponent<Component, {
    onWaChange: EventName<WaChangeEvent>;
}>;
export default reactWrapper;
