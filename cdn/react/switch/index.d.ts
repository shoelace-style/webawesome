import Component from '../../components/switch/switch.js';
import { type EventName } from '@lit/react';
import type { WaBlurEvent } from '../../events/events.js';
import type { WaChangeEvent } from '../../events/events.js';
import type { WaInputEvent } from '../../events/events.js';
import type { WaFocusEvent } from '../../events/events.js';
import type { WaInvalidEvent } from '../../events/events.js';
export type { WaBlurEvent } from '../../events/events.js';
export type { WaChangeEvent } from '../../events/events.js';
export type { WaInputEvent } from '../../events/events.js';
export type { WaFocusEvent } from '../../events/events.js';
export type { WaInvalidEvent } from '../../events/events.js';
/**
 * @summary Switches allow the user to toggle an option on or off.
 * @documentation https://backers.webawesome.com/docs/components/switch
 * @status stable
 * @since 2.0
 *
 * @slot - The switch's label.
 * @slot help-text - Text that describes how to use the switch. Alternatively, you can use the `help-text` attribute.
 *
 * @event wa-blur - Emitted when the control loses focus.
 * @event wa-change - Emitted when the control's checked state changes.
 * @event wa-input - Emitted when the control receives input.
 * @event wa-focus - Emitted when the control gains focus.
 * @event wa-invalid - Emitted when the form control has been checked for validity and its constraints aren't satisfied.
 *
 * @csspart base - The component's base wrapper.
 * @csspart control - The control that houses the switch's thumb.
 * @csspart thumb - The switch's thumb.
 * @csspart label - The switch's label.
 * @csspart form-control-help-text - The help text's wrapper.
 *
 * @cssproperty --background-color - The switch's background color.
 * @cssproperty --background-color-checked - The switch's background color when checked.
 * @cssproperty --border-color - The color of the switch's borders.
 * @cssproperty --border-color-checked - The color of the switch's borders when checked.
 * @cssproperty --border-style - The style of the switch's borders.
 * @cssproperty --border-width - The width of the switch's borders. Expects a single value.
 * @cssproperty --box-shadow - The shadow effects around the edges of the switch.
 * @cssproperty --height - The height of the switch.
 * @cssproperty --thumb-color - The color of the thumb.
 * @cssproperty --thumb-color-checked - The color of the thumb when checked.
 * @cssproperty --thumb-shadow - The shadow effects around the edges of the thumb.
 * @cssproperty --thumb-size - The size of the thumb.
 * @cssproperty --width - The width of the switch.
 */
declare const reactWrapper: import("@lit/react").ReactWebComponent<Component, {
    onWaBlur: EventName<WaBlurEvent>;
    onWaChange: EventName<WaChangeEvent>;
    onWaInput: EventName<WaInputEvent>;
    onWaFocus: EventName<WaFocusEvent>;
    onWaInvalid: EventName<WaInvalidEvent>;
}>;
export default reactWrapper;
