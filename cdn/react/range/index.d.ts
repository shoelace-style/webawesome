import Component from '../../components/range/range.js';
import { type EventName } from '@lit/react';
import type { WaBlurEvent } from '../../events/events.js';
import type { WaChangeEvent } from '../../events/events.js';
import type { WaFocusEvent } from '../../events/events.js';
import type { WaInputEvent } from '../../events/events.js';
import type { WaInvalidEvent } from '../../events/events.js';
export type { WaBlurEvent } from '../../events/events.js';
export type { WaChangeEvent } from '../../events/events.js';
export type { WaFocusEvent } from '../../events/events.js';
export type { WaInputEvent } from '../../events/events.js';
export type { WaInvalidEvent } from '../../events/events.js';
/**
 * @summary Ranges allow the user to select a single value within a given range using a slider.
 * @documentation https://backers.webawesome.com/docs/components/range
 * @status stable
 * @since 2.0
 *
 * @slot label - The range's label. Alternatively, you can use the `label` attribute.
 * @slot help-text - Text that describes how to use the input. Alternatively, you can use the `help-text` attribute.
 *
 * @event wa-blur - Emitted when the control loses focus.
 * @event wa-change - Emitted when an alteration to the control's value is committed by the user.
 * @event wa-focus - Emitted when the control gains focus.
 * @event wa-input - Emitted when the control receives input.
 * @event wa-invalid - Emitted when the form control has been checked for validity and its constraints aren't satisfied.
 *
 * @csspart form-control - The form control that wraps the label, input, and help text.
 * @csspart form-control-label - The label's wrapper.
 * @csspart form-control-input - The range's wrapper.
 * @csspart form-control-help-text - The help text's wrapper.
 * @csspart base - The component's base wrapper.
 * @csspart input - The internal `<input>` element.
 * @csspart tooltip - The range's tooltip.
 *
 * @cssproperty --thumb-color - The color of the thumb.
 * @cssproperty --thumb-gap - The visual gap between the edges of the thumb and the track.
 * @cssproperty --thumb-shadow - The shadow effects around the edges of the thumb.
 * @cssproperty --thumb-size - The size of the thumb.
 * @cssproperty --tooltip-offset - The vertical distance the tooltip is offset from the thumb.
 * @cssproperty --track-color-active - The color of the portion of the track that represents the current value.
 * @cssproperty --track-color-inactive - The of the portion of the track that represents the remaining value.
 * @cssproperty --track-height - The height of the track.
 * @cssproperty --track-active-offset - The point of origin of the active track.
 */
declare const reactWrapper: import("@lit/react").ReactWebComponent<Component, {
    onWaBlur: EventName<WaBlurEvent>;
    onWaChange: EventName<WaChangeEvent>;
    onWaFocus: EventName<WaFocusEvent>;
    onWaInput: EventName<WaInputEvent>;
    onWaInvalid: EventName<WaInvalidEvent>;
}>;
export default reactWrapper;
