import Component from '../../components/avatar/avatar.js';
import { type EventName } from '@lit/react';
import type { WaErrorEvent } from '../../events/events.js';
export type { WaErrorEvent } from '../../events/events.js';
/**
 * @summary Avatars are used to represent a person or object.
 * @documentation https://backers.webawesome.com/docs/components/avatar
 * @status stable
 * @since 2.0
 *
 * @dependency wa-icon
 *
 * @slot icon - The default icon to use when no image or initials are present. Works best with `<wa-icon>`.
 *
 * @event wa-error - The image could not be loaded. This may because of an invalid URL, a temporary network condition, or some
 * unknown cause.
 *
 * @csspart base - The component's base wrapper.
 * @csspart icon - The container that wraps the avatar's icon.
 * @csspart initials - The container that wraps the avatar's initials.
 * @csspart image - The avatar image. Only shown when the `image` attribute is set.
 *
 * @cssproperty --background-color - The avatar's background color.
 * @cssproperty --content-color - The color of the avatar's content.
 * @cssproperty --size - The size of the avatar.
 */
declare const reactWrapper: import("@lit/react").ReactWebComponent<Component, {
    onWaError: EventName<WaErrorEvent>;
}>;
export default reactWrapper;
