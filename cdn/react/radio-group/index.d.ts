import Component from '../../components/radio-group/radio-group.js';
import { type EventName } from '@lit/react';
import type { WaChangeEvent } from '../../events/events.js';
import type { WaInputEvent } from '../../events/events.js';
import type { WaInvalidEvent } from '../../events/events.js';
export type { WaChangeEvent } from '../../events/events.js';
export type { WaInputEvent } from '../../events/events.js';
export type { WaInvalidEvent } from '../../events/events.js';
/**
 * @summary Radio groups are used to group multiple [radios](/docs/components/radio) or [radio buttons](/docs/components/radio-button) so they function as a single form control.
 * @documentation https://backers.webawesome.com/docs/components/radio-group
 * @status stable
 * @since 2.0
 *
 * @dependency wa-button-group
 *
 * @slot - The default slot where `<wa-radio>` or `<wa-radio-button>` elements are placed.
 * @slot label - The radio group's label. Required for proper accessibility. Alternatively, you can use the `label`
 *  attribute.
 * @slot help-text - Text that describes how to use the radio group. Alternatively, you can use the `help-text` attribute.
 *
 * @event wa-change - Emitted when the radio group's selected value changes.
 * @event wa-input - Emitted when the radio group receives user input.
 * @event wa-invalid - Emitted when the form control has been checked for validity and its constraints aren't satisfied.
 *
 * @csspart form-control - The form control that wraps the label, input, and help text.
 * @csspart form-control-label - The label's wrapper.
 * @csspart form-control-input - The input's wrapper.
 * @csspart form-control-help-text - The help text's wrapper.
 * @csspart button-group - The button group that wraps radio buttons.
 * @csspart button-group__base - The button group's `base` part.
 */
declare const reactWrapper: import("@lit/react").ReactWebComponent<Component, {
    onWaChange: EventName<WaChangeEvent>;
    onWaInput: EventName<WaInputEvent>;
    onWaInvalid: EventName<WaInvalidEvent>;
}>;
export default reactWrapper;
