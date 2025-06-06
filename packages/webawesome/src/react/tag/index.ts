import { createComponent } from '@lit/react';
import * as React from 'react';
import Component from '../../components/tag/tag.js';

import { type EventName } from '@lit/react';
import type { WaRemoveEvent } from '../../events/events.js';
export type { WaRemoveEvent } from '../../events/events.js';

const tagName = 'wa-tag';

/**
 * @summary Tags are used as labels to organize things or to indicate a selection.
 * @documentation https://backers.webawesome.com/docs/components/tag
 * @status stable
 * @since 2.0
 *
 * @dependency wa-button
 *
 * @slot - The tag's content.
 *
 * @event wa-remove - Emitted when the remove button is activated.
 *
 * @csspart base - The component's base wrapper.
 * @csspart content - The tag's content.
 * @csspart remove-button - The tag's remove button, a `<wa-button>`.
 * @csspart remove-button__base - The remove button's exported `base` part.
 */
const reactWrapper = createComponent({
  tagName,
  elementClass: Component,
  react: React,
  events: {
    onWaRemove: 'wa-remove' as EventName<WaRemoveEvent>,
  },
  displayName: 'WaTag',
});

export default reactWrapper;
