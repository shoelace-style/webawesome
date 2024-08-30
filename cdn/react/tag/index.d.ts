import Component from '../../components/tag/tag.js';
import { type EventName } from '@lit/react';
import type { WaRemoveEvent } from '../../events/events.js';
export type { WaRemoveEvent } from '../../events/events.js';
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
declare const reactWrapper: import("@lit/react").ReactWebComponent<Component, {
    onWaRemove: EventName<WaRemoveEvent>;
}>;
export default reactWrapper;
