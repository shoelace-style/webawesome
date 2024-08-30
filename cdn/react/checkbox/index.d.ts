import Component from '../../components/checkbox/checkbox.js';
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
 * @summary Checkboxes allow the user to toggle an option on or off.
 * @documentation https://backers.webawesome.com/docs/components/checkbox
 * @status stable
 * @since 2.0
 *
 * @dependency wa-icon
 *
 * @slot - The checkbox's label.
 * @slot help-text - Text that describes how to use the checkbox. Alternatively, you can use the `help-text` attribute.
 *
 * @event wa-blur - Emitted when the checkbox loses focus.
 * @event wa-change - Emitted when the checked state changes.
 * @event wa-focus - Emitted when the checkbox gains focus.
 * @event wa-input - Emitted when the checkbox receives input.
 * @event wa-invalid - Emitted when the form control has been checked for validity and its constraints aren't satisfied.
 *
 * @csspart base - The component's base wrapper.
 * @csspart control - The square container that wraps the checkbox's checked state.
 * @csspart control--checked - Matches the control part when the checkbox is checked.
 * @csspart control--indeterminate - Matches the control part when the checkbox is indeterminate.
 * @csspart checked-icon - The checked icon, a `<wa-icon>` element.
 * @csspart indeterminate-icon - The indeterminate icon, a `<wa-icon>` element.
 * @csspart label - The container that wraps the checkbox's label.
 * @csspart form-control-help-text - The help text's wrapper.
 *
 * @cssproperty --background-color - The checkbox's background color.
 * @cssproperty --background-color-checked - The checkbox's background color when checked.
 * @cssproperty --border-color - The color of the checkbox's borders.
 * @cssproperty --border-color-checked - The color of the checkbox's borders when checked.
 * @cssproperty --border-radius - The radius of the checkbox's corners.
 * @cssproperty --border-style - The style of the checkbox's borders.
 * @cssproperty --border-width - The width of the checkbox's borders. Expects a single value.
 * @cssproperty --box-shadow - The shadow effects around the edges of the checkbox.
 * @cssproperty --toggle-size - The size of the checkbox.
 */
declare const reactWrapper: import("@lit/react").ReactWebComponent<Component, {
    onWaBlur: EventName<WaBlurEvent>;
    onWaChange: EventName<WaChangeEvent>;
    onWaFocus: EventName<WaFocusEvent>;
    onWaInput: EventName<WaInputEvent>;
    onWaInvalid: EventName<WaInvalidEvent>;
}>;
export default reactWrapper;
