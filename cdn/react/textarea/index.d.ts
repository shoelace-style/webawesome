import Component from '../../components/textarea/textarea.js';
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
 * @summary Textareas collect data from the user and allow multiple lines of text.
 * @documentation https://backers.webawesome.com/docs/components/textarea
 * @status stable
 * @since 2.0
 *
 * @slot label - The textarea's label. Alternatively, you can use the `label` attribute.
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
 * @csspart form-control-input - The input's wrapper.
 * @csspart form-control-help-text - The help text's wrapper.
 * @csspart base - The component's base wrapper.
 * @csspart textarea - The internal `<textarea>` control.
 *
 * @cssproperty --background-color - The textarea's background color.
 * @cssproperty --border-color - The color of the textarea's borders.
 * @cssproperty --border-radius - The border radius of the textarea's corners.
 * @cssproperty --border-style - The style of the textarea's borders.
 * @cssproperty --border-width - The width of the textarea's borders.
 * @cssproperty --box-shadow - The shadow effects around the edges of the textarea.
 */
declare const reactWrapper: import("@lit/react").ReactWebComponent<Component, {
    onWaBlur: EventName<WaBlurEvent>;
    onWaChange: EventName<WaChangeEvent>;
    onWaFocus: EventName<WaFocusEvent>;
    onWaInput: EventName<WaInputEvent>;
    onWaInvalid: EventName<WaInvalidEvent>;
}>;
export default reactWrapper;
