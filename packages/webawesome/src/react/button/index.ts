import { createComponent } from '@lit/react';
import * as React from 'react';
import Component from '../../components/button/button.js';

import { type EventName } from '@lit/react';
import type { WaInvalidEvent } from '../../events/events.js';
export type { WaInvalidEvent } from '../../events/events.js';

const tagName = 'wa-button';

/**
 * @summary Buttons represent actions that are available to the user.
 * @documentation https://backers.webawesome.com/docs/components/button
 * @status stable
 * @since 2.0
 *
 * @dependency wa-icon
 * @dependency wa-spinner
 *
 * @event blur - Emitted when the button loses focus.
 * @event focus - Emitted when the button gains focus.
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
 * @cssproperty --display - Set to `none` to hide the element, or any other valid `display` value to override the internal `display` value of the `base` part.
 * @cssproperty --background-color - The button's background color when the button is not being interacted with.
 * @cssproperty --background-color-active - The button's background color when active.
 * @cssproperty --background-color-hover - The button's background color on hover.
 * @cssproperty --border-color - The color of the button's border when the button is not being interacted with.
 * @cssproperty --border-color-active - The color of the button's border when active.
 * @cssproperty --border-color-hover - The color of the button's border on hover.
 * @cssproperty --text-color - The color of the button's label when the button is not being interacted with.
 * @cssproperty --text-color-active - The color of the button's label when active.
 * @cssproperty --text-color-hover - The color of the button's label on hover.
 */
const reactWrapper = createComponent({
  tagName,
  elementClass: Component,
  react: React,
  events: {
    onWaInvalid: 'wa-invalid' as EventName<WaInvalidEvent>,
  },
  displayName: 'WaButton',
});

export default reactWrapper;
