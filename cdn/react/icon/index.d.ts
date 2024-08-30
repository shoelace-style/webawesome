import Component from '../../components/icon/icon.js';
import { type EventName } from '@lit/react';
import type { WaLoadEvent } from '../../events/events.js';
import type { WaErrorEvent } from '../../events/events.js';
export type { WaLoadEvent } from '../../events/events.js';
export type { WaErrorEvent } from '../../events/events.js';
/**
 * @summary Icons are symbols that can be used to represent various options within an application.
 * @documentation https://backers.webawesome.com/docs/components/icon
 * @status stable
 * @since 2.0
 *
 * @event wa-load - Emitted when the icon has loaded. When using `spriteSheet: true` this will not emit.
 * @event wa-error - Emitted when the icon fails to load due to an error. When using `spriteSheet: true` this will not emit.
 *
 * @csspart svg - The internal SVG element.
 * @csspart use - The `<use>` element generated when using `spriteSheet: true`
 *
 * @cssproperty [--primary-color=currentColor] - Sets a duotone icon's primary color.
 * @cssproperty [--primary-opacity=1] - Sets a duotone icon's primary opacity.
 * @cssproperty [--secondary-color=currentColor] - Sets a duotone icon's secondary color.
 * @cssproperty [--secondary-opacity=0.4] - Sets a duotone icon's secondary opacity.
 */
declare const reactWrapper: import("@lit/react").ReactWebComponent<Component, {
    onWaLoad: EventName<WaLoadEvent>;
    onWaError: EventName<WaErrorEvent>;
}>;
export default reactWrapper;
