import Component from '../../components/button/button.js';
import { type EventName } from '@lit/react';
import type { WaBlurEvent } from '../../events/events.js';
import type { WaFocusEvent } from '../../events/events.js';
import type { WaInvalidEvent } from '../../events/events.js';
export type { WaBlurEvent } from '../../events/events.js';
export type { WaFocusEvent } from '../../events/events.js';
export type { WaInvalidEvent } from '../../events/events.js';
/**
 * @summary Buttons represent actions that are available to the user.
 * @documentation https://backers.webawesome.com/docs/components/button
 * @status stable
 * @since 2.0
 *
 * @dependency wa-icon
 * @dependency wa-spinner
 *
 * @event wa-blur - Emitted when the button loses focus.
 * @event wa-focus - Emitted when the button gains focus.
 * @event wa-invalid - Emitted when the form control has been checked for validity and its constraints aren't satisfied.
 *
 * @slot - The button's label.
 * @slot prefix - A presentational prefix icon or similar element.
 * @slot suffix - A presentational suffix icon or similar element.
 *
 * @csspart base - The component's base wrapper.
 * @csspart prefix - The container that wraps the prefix.
 * @csspart label - The button's label.
 * @csspart suffix - The container that wraps the suffix.
 * @csspart caret - The button's caret icon, a `<wa-icon>` element.
 * @csspart spinner - The spinner that shows when the button is in the loading state.
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
 * @cssproperty --label-color - The color of the button's label.
 * @cssproperty --label-color-active - The color of the button's label when active.
 * @cssproperty --label-color-hover - The color of the button's label on hover.
 */
declare const reactWrapper: import("@lit/react").ReactWebComponent<Component, {
    onWaBlur: EventName<WaBlurEvent>;
    onWaFocus: EventName<WaFocusEvent>;
    onWaInvalid: EventName<WaInvalidEvent>;
}>;
export default reactWrapper;
