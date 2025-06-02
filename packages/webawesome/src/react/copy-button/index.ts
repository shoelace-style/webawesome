import { createComponent } from '@lit/react';
import * as React from 'react';
import Component from '../../components/copy-button/copy-button.js';

import { type EventName } from '@lit/react';
import type { WaCopyEvent, WaErrorEvent } from '../../events/events.js';
export type { WaCopyEvent, WaErrorEvent } from '../../events/events.js';

const tagName = 'wa-copy-button';

/**
 * @summary Copies text data to the clipboard when the user clicks the trigger.
 * @documentation https://backers.webawesome.com/docs/components/copy
 * @status experimental
 * @since 2.7
 *
 * @dependency wa-icon
 * @dependency wa-tooltip
 *
 * @event wa-copy - Emitted when the data has been copied.
 * @event wa-error - Emitted when the data could not be copied.
 *
 * @slot copy-icon - The icon to show in the default copy state. Works best with `<wa-icon>`.
 * @slot success-icon - The icon to show when the content is copied. Works best with `<wa-icon>`.
 * @slot error-icon - The icon to show when a copy error occurs. Works best with `<wa-icon>`.
 *
 * @csspart button - The internal `<button>` element.
 * @csspart copy-icon - The container that holds the copy icon.
 * @csspart success-icon - The container that holds the success icon.
 * @csspart error-icon - The container that holds the error icon.
 * @csspart tooltip__base - The tooltip's exported `base` part.
 * @csspart tooltip__base__popup - The tooltip's exported `popup` part.
 * @csspart tooltip__base__arrow - The tooltip's exported `arrow` part.
 * @csspart tooltip__body - The tooltip's exported `body` part.
 *
 * @cssproperty --background-color - The color of the button's background.
 * @cssproperty --background-color-hover - The color of the button's background on hover.
 * @cssproperty --success-color - The color to use for success feedback.
 * @cssproperty --error-color - The color to use for error feedback.
 */
const reactWrapper = createComponent({
  tagName,
  elementClass: Component,
  react: React,
  events: {
    onWaCopy: 'wa-copy' as EventName<WaCopyEvent>,
    onWaError: 'wa-error' as EventName<WaErrorEvent>,
  },
  displayName: 'WaCopyButton',
});

export default reactWrapper;
