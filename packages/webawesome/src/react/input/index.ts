import { createComponent } from '@lit/react';
import * as React from 'react';
import Component from '../../components/input/input.js';

import { type EventName } from '@lit/react';
import type { WaClearEvent, WaInvalidEvent } from '../../events/events.js';
export type { WaClearEvent, WaInvalidEvent } from '../../events/events.js';

const tagName = 'wa-input';

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
 * @slot hint - Text that describes how to use the input. Alternatively, you can use the `hint` attribute.
 *
 * @event blur - Emitted when the control loses focus.
 * @event change - Emitted when an alteration to the control's value is committed by the user.
 * @event focus - Emitted when the control gains focus.
 * @event input - Emitted when the control receives input.
 * @event wa-clear - Emitted when the clear button is activated.
 * @event wa-invalid - Emitted when the form control has been checked for validity and its constraints aren't satisfied.
 *
 * @csspart label - The label
 * @csspart hint - The hint's wrapper.
 * @csspart input - The wrapper being rendered as an input
 * @csspart base - The internal `<input>` control.
 * @csspart prefix - The container that wraps the prefix.
 * @csspart clear-button - The clear button.
 * @csspart password-toggle-button - The password toggle button.
 * @csspart suffix - The container that wraps the suffix.
 *
 * @cssproperty --background-color - The input's background color.
 * @cssproperty --border-color - The color of the input's borders.
 * @cssproperty --border-width - The width of the input's borders. Expects a single value.
 * @cssproperty --box-shadow - The shadow effects around the edges of the input.
 *
 * @cssstate blank - The input is empty.
 */
const reactWrapper = createComponent({
  tagName,
  elementClass: Component,
  react: React,
  events: {
    onWaClear: 'wa-clear' as EventName<WaClearEvent>,
    onWaInvalid: 'wa-invalid' as EventName<WaInvalidEvent>,
  },
  displayName: 'WaInput',
});

export default reactWrapper;
