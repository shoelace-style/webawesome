import Component from '../../components/include/include.js';
import { type EventName } from '@lit/react';
import type { WaLoadEvent } from '../../events/events.js';
import type { WaErrorEvent } from '../../events/events.js';
export type { WaLoadEvent } from '../../events/events.js';
export type { WaErrorEvent } from '../../events/events.js';
/**
 * @summary Includes give you the power to embed external HTML files into the page.
 * @documentation https://backers.webawesome.com/docs/components/include
 * @status stable
 * @since 2.0
 *
 * @event wa-load - Emitted when the included file is loaded.
 * @event {{ status: number }} wa-error - Emitted when the included file fails to load due to an error.
 */
declare const reactWrapper: import("@lit/react").ReactWebComponent<Component, {
    onWaLoad: EventName<WaLoadEvent>;
    onWaError: EventName<WaErrorEvent>;
}>;
export default reactWrapper;
