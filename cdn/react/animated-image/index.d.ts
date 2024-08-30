import Component from '../../components/animated-image/animated-image.js';
import { type EventName } from '@lit/react';
import type { WaLoadEvent } from '../../events/events.js';
import type { WaErrorEvent } from '../../events/events.js';
export type { WaLoadEvent } from '../../events/events.js';
export type { WaErrorEvent } from '../../events/events.js';
/**
 * @summary A component for displaying animated GIFs and WEBPs that play and pause on interaction.
 * @documentation https://backers.webawesome.com/docs/components/animated-image
 * @status stable
 * @since 2.0
 *
 * @dependency wa-icon
 *
 * @event wa-load - Emitted when the image loads successfully.
 * @event wa-error - Emitted when the image fails to load.
 *
 * @slot play-icon - Optional play icon to use instead of the default. Works best with `<wa-icon>`.
 * @slot pause-icon - Optional pause icon to use instead of the default. Works best with `<wa-icon>`.
 *
 * @part control-box - The container that surrounds the pause/play icons and provides their background.
 *
 * @cssproperty --control-box-size - The size of the icon box.
 * @cssproperty --icon-size - The size of the play/pause icons.
 */
declare const reactWrapper: import("@lit/react").ReactWebComponent<Component, {
    onWaLoad: EventName<WaLoadEvent>;
    onWaError: EventName<WaErrorEvent>;
}>;
export default reactWrapper;
