import Component from '../../components/input/input.js';
import { type EventName } from '@lit/react';
import type { WaBlurEvent } from '../../events/events.js';
import type { WaChangeEvent } from '../../events/events.js';
import type { WaClearEvent } from '../../events/events.js';
import type { WaFocusEvent } from '../../events/events.js';
import type { WaInputEvent } from '../../events/events.js';
import type { WaInvalidEvent } from '../../events/events.js';
export type { WaBlurEvent } from '../../events/events.js';
export type { WaChangeEvent } from '../../events/events.js';
export type { WaClearEvent } from '../../events/events.js';
export type { WaFocusEvent } from '../../events/events.js';
export type { WaInputEvent } from '../../events/events.js';
export type { WaInvalidEvent } from '../../events/events.js';
/**
 * @summary Inputs collect data from the user.
 * @documentation https://backers.webawesome.com/docs/components/input
 * @status stable
 * @since 2.0
 *
 * @dependency wa-icon
 *
 * @slot label - The input's label. Alternatively, you can use the `label` attribute.
 * @slot prefix - Used to prepend a presentational icon or similar element to the input.
 * @slot suffix - Used to append a presentational icon or similar element to the input.
 * @slot clear-icon - An icon to use in lieu of the default clear icon.
 * @slot show-password-icon - An icon to use in lieu of the default show password icon.
 * @slot hide-password-icon - An icon to use in lieu of the default hide password icon.
 * @slot help-text - Text that describes how to use the input. Alternatively, you can use the `help-text` attribute.
 *
 * @event wa-blur - Emitted when the control loses focus.
 * @event wa-change - Emitted when an alteration to the control's value is committed by the user.
 * @event wa-clear - Emitted when the clear button is activated.
 * @event wa-focus - Emitted when the control gains focus.
 * @event wa-input - Emitted when the control receives input.
 * @event wa-invalid - Emitted when the form control has been checked for validity and its constraints aren't satisfied.
 *
 * @csspart form-control - The form control that wraps the label, input, and help text.
 * @csspart form-control-label - The label's wrapper.
 * @csspart form-control-input - The input's wrapper.
 * @csspart form-control-help-text - The help text's wrapper.
 * @csspart base - The component's base wrapper.
 * @csspart input - The internal `<input>` control.
 * @csspart prefix - The container that wraps the prefix.
 * @csspart clear-button - The clear button.
 * @csspart password-toggle-button - The password toggle button.
 * @csspart suffix - The container that wraps the suffix.
 *
 * @cssproperty --background-color - The input's background color.
 * @cssproperty --border-color - The color of the input's borders.
 * @cssproperty --border-radius - The radius of the input's corners.
 * @cssproperty --border-style - The style of the input's borders.
 * @cssproperty --border-width - The width of the input's borders. Expects a single value.
 * @cssproperty --box-shadow - The shadow effects around the edges of the input.
 */
declare const reactWrapper: import("@lit/react").ReactWebComponent<Component, {
    onWaBlur: EventName<WaBlurEvent>;
    onWaChange: EventName<WaChangeEvent>;
    onWaClear: EventName<WaClearEvent>;
    onWaFocus: EventName<WaFocusEvent>;
    onWaInput: EventName<WaInputEvent>;
    onWaInvalid: EventName<WaInvalidEvent>;
}>;
export default reactWrapper;
