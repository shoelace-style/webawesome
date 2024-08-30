import Component from '../../components/icon-button/icon-button.js';
import { type EventName } from '@lit/react';
import type { WaBlurEvent } from '../../events/events.js';
import type { WaFocusEvent } from '../../events/events.js';
export type { WaBlurEvent } from '../../events/events.js';
export type { WaFocusEvent } from '../../events/events.js';
/**
 * @summary Icons buttons are simple, icon-only buttons that can be used for actions and in toolbars.
 * @documentation https://backers.webawesome.com/docs/components/icon-button
 * @status stable
 * @since 2.0
 *
 * @dependency wa-icon
 *
 * @event wa-blur - Emitted when the icon button loses focus.
 * @event wa-focus - Emitted when the icon button gains focus.
 *
 * @cssproperty --background-color-hover - The color of the button's background on hover.
 *
 * @csspart base - The component's base wrapper.
 */
declare const reactWrapper: import("@lit/react").ReactWebComponent<Component, {
    onWaBlur: EventName<WaBlurEvent>;
    onWaFocus: EventName<WaFocusEvent>;
}>;
export default reactWrapper;
