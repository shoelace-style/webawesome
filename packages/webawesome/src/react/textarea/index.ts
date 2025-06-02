import { createComponent } from '@lit/react';
import * as React from 'react';
import Component from '../../components/textarea/textarea.js';

import { type EventName } from '@lit/react';
import type { WaInvalidEvent } from '../../events/events.js';
export type { WaInvalidEvent } from '../../events/events.js';

const tagName = 'wa-textarea';

/**
 * @summary Textareas collect data from the user and allow multiple lines of text.
 * @documentation https://backers.webawesome.com/docs/components/textarea
 * @status stable
 * @since 2.0
 *
 * @slot label - The textarea's label. Alternatively, you can use the `label` attribute.
 * @slot hint - Text that describes how to use the input. Alternatively, you can use the `hint` attribute.
 *
 * @event blur - Emitted when the control loses focus.
 * @event change - Emitted when an alteration to the control's value is committed by the user.
 * @event focus - Emitted when the control gains focus.
 * @event input - Emitted when the control receives input.
 * @event wa-invalid - Emitted when the form control has been checked for validity and its constraints aren't satisfied.
 *
 * @csspart label - The label
 * @csspart form-control-input - The input's wrapper.
 * @csspart hint - The hint's wrapper.
 * @csspart textarea - The internal `<textarea>` control.
 * @csspart base - The wrapper around the `<textarea>` control.
 *
 * @cssproperty --background-color - The textarea's background color.
 * @cssproperty --border-color - The color of the textarea's borders.
 * @cssproperty --border-width - The width of the textarea's borders.
 * @cssproperty --box-shadow - The shadow effects around the edges of the textarea.
 *
 * @cssstate blank - The textarea is empty.
 */
const reactWrapper = createComponent({
  tagName,
  elementClass: Component,
  react: React,
  events: {
    onWaInvalid: 'wa-invalid' as EventName<WaInvalidEvent>,
  },
  displayName: 'WaTextarea',
});

export default reactWrapper;
