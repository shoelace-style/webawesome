import Component from '../../components/radio-button/radio-button.js';
import { type EventName } from '@lit/react';
import type { WaBlurEvent } from '../../events/events.js';
import type { WaFocusEvent } from '../../events/events.js';
export type { WaBlurEvent } from '../../events/events.js';
export type { WaFocusEvent } from '../../events/events.js';
/**
 * @summary Radios buttons allow the user to select a single option from a group using a button-like control.
 * @documentation https://backers.webawesome.com/docs/components/radio-button
 * @status stable
 * @since 2.0
 *
 * @slot - The radio button's label.
 * @slot prefix - A presentational prefix icon or similar element.
 * @slot suffix - A presentational suffix icon or similar element.
 *
 * @event wa-blur - Emitted when the button loses focus.
 * @event wa-focus - Emitted when the button gains focus.
 *
 * @cssproperty --background-color - The button's background color.
 * @cssproperty --background-color-active - The button's background color when active.
 * @cssproperty --background-color-hover - The button's background color on hover.
 * @cssproperty --border-color - The color of the button's border.
 * @cssproperty --border-color-active - The color of the button's border when active.
 * @cssproperty --border-color-hover - The color of the button's border on hover.
 * @cssproperty --border-radius - The radius of the button's corners.
 * @cssproperty --border-style - The style of the button's border.
 * @cssproperty --border-width - The width of the button's border. Expects a single value.
 * @cssproperty --box-shadow - The shadow effects around the edges of the button.
 * @cssproperty --indicator-color - The color of the checked button indicator.
 * @cssproperty --indicator-width - The width of the checked button indicator.
 * @cssproperty --label-color - The color of the button's label.
 * @cssproperty --label-color-active - The color of the button's label when active.
 * @cssproperty --label-color-hover - The color of the button's label on hover.
 *
 * @csspart base - The component's base wrapper.
 * @csspart button - The internal `<button>` element.
 * @csspart button--checked - The internal button element when the radio button is checked.
 * @csspart prefix - The container that wraps the prefix.
 * @csspart label - The container that wraps the radio button's label.
 * @csspart suffix - The container that wraps the suffix.
 */
declare const reactWrapper: import("@lit/react").ReactWebComponent<Component, {
    onWaBlur: EventName<WaBlurEvent>;
    onWaFocus: EventName<WaFocusEvent>;
}>;
export default reactWrapper;
