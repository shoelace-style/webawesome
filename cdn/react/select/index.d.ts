import Component from '../../components/select/select.js';
import { type EventName } from '@lit/react';
import type { WaChangeEvent } from '../../events/events.js';
import type { WaClearEvent } from '../../events/events.js';
import type { WaInputEvent } from '../../events/events.js';
import type { WaFocusEvent } from '../../events/events.js';
import type { WaBlurEvent } from '../../events/events.js';
import type { WaShowEvent } from '../../events/events.js';
import type { WaAfterShowEvent } from '../../events/events.js';
import type { WaHideEvent } from '../../events/events.js';
import type { WaAfterHideEvent } from '../../events/events.js';
import type { WaInvalidEvent } from '../../events/events.js';
export type { WaChangeEvent } from '../../events/events.js';
export type { WaClearEvent } from '../../events/events.js';
export type { WaInputEvent } from '../../events/events.js';
export type { WaFocusEvent } from '../../events/events.js';
export type { WaBlurEvent } from '../../events/events.js';
export type { WaShowEvent } from '../../events/events.js';
export type { WaAfterShowEvent } from '../../events/events.js';
export type { WaHideEvent } from '../../events/events.js';
export type { WaAfterHideEvent } from '../../events/events.js';
export type { WaInvalidEvent } from '../../events/events.js';
/**
 * @summary Selects allow you to choose items from a menu of predefined options.
 * @documentation https://backers.webawesome.com/docs/components/select
 * @status stable
 * @since 2.0
 *
 * @dependency wa-icon
 * @dependency wa-popup
 * @dependency wa-tag
 *
 * @slot - The listbox options. Must be `<wa-option>` elements. You can use `<wa-divider>` to group items visually.
 * @slot label - The input's label. Alternatively, you can use the `label` attribute.
 * @slot prefix - Used to prepend a presentational icon or similar element to the combobox.
 * @slot suffix - Used to append a presentational icon or similar element to the combobox.
 * @slot clear-icon - An icon to use in lieu of the default clear icon.
 * @slot expand-icon - The icon to show when the control is expanded and collapsed. Rotates on open and close.
 * @slot help-text - Text that describes how to use the input. Alternatively, you can use the `help-text` attribute.
 *
 * @event wa-change - Emitted when the control's value changes.
 * @event wa-clear - Emitted when the control's value is cleared.
 * @event wa-input - Emitted when the control receives input.
 * @event wa-focus - Emitted when the control gains focus.
 * @event wa-blur - Emitted when the control loses focus.
 * @event wa-show - Emitted when the select's menu opens.
 * @event wa-after-show - Emitted after the select's menu opens and all animations are complete.
 * @event wa-hide - Emitted when the select's menu closes.
 * @event wa-after-hide - Emitted after the select's menu closes and all animations are complete.
 * @event wa-invalid - Emitted when the form control has been checked for validity and its constraints aren't satisfied.
 *
 * @csspart form-control - The form control that wraps the label, input, and help text.
 * @csspart form-control-label - The label's wrapper.
 * @csspart form-control-input - The select's wrapper.
 * @csspart form-control-help-text - The help text's wrapper.
 * @csspart combobox - The container the wraps the prefix, suffix, combobox, clear icon, and expand button.
 * @csspart prefix - The container that wraps the prefix slot.
 * @csspart suffix - The container that wraps the suffix slot.
 * @csspart display-input - The element that displays the selected option's label, an `<input>` element.
 * @csspart listbox - The listbox container where options are slotted.
 * @csspart tags - The container that houses option tags when `multiselect` is used.
 * @csspart tag - The individual tags that represent each multiselect option.
 * @csspart tag__base - The tag's base part.
 * @csspart tag__content - The tag's content part.
 * @csspart tag__remove-button - The tag's remove button.
 * @csspart tag__remove-button__base - The tag's remove button base part.
 * @csspart clear-button - The clear button.
 * @csspart expand-icon - The container that wraps the expand icon.
 *
 * @cssproperty --background-color - The background color of the select's combobox.
 * @cssproperty --border-color - The border color of the select's combobox.
 * @cssproperty --border-radius - The border radius of the select's combobox.
 * @cssproperty --border-style - The style of the select's borders, including the listbox.
 * @cssproperty --border-width - The width of the select's borders, including the listbox.
 * @cssproperty --box-shadow - The shadow effects around the edges of the select's combobox.
 */
declare const reactWrapper: import("@lit/react").ReactWebComponent<Component, {
    onWaChange: EventName<WaChangeEvent>;
    onWaClear: EventName<WaClearEvent>;
    onWaInput: EventName<WaInputEvent>;
    onWaFocus: EventName<WaFocusEvent>;
    onWaBlur: EventName<WaBlurEvent>;
    onWaShow: EventName<WaShowEvent>;
    onWaAfterShow: EventName<WaAfterShowEvent>;
    onWaHide: EventName<WaHideEvent>;
    onWaAfterHide: EventName<WaAfterHideEvent>;
    onWaInvalid: EventName<WaInvalidEvent>;
}>;
export default reactWrapper;
