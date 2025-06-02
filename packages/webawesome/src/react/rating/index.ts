import { createComponent } from '@lit/react';
import * as React from 'react';
import Component from '../../components/rating/rating.js';

import { type EventName } from '@lit/react';
import type { WaHoverEvent } from '../../events/events.js';
export type { WaHoverEvent } from '../../events/events.js';

const tagName = 'wa-rating';

/**
 * @summary Ratings give users a way to quickly view and provide feedback.
 * @documentation https://backers.webawesome.com/docs/components/rating
 * @status stable
 * @since 2.0
 *
 * @dependency wa-icon
 *
 * @event change - Emitted when the rating's value changes.
 * @event {{ phase: 'start' | 'move' | 'end', value: number }} wa-hover - Emitted when the user hovers over a value. The
 *  `phase` property indicates when hovering starts, moves to a new value, or ends. The `value` property tells what the
 *  rating's value would be if the user were to commit to the hovered value.
 *
 * @csspart base - The component's base wrapper.
 *
 * @cssproperty --symbol-color - The inactive color for symbols.
 * @cssproperty --symbol-color-active - The active color for symbols.
 * @cssproperty --symbol-spacing - The spacing to use around symbols.
 */
const reactWrapper = createComponent({
  tagName,
  elementClass: Component,
  react: React,
  events: {
    onWaHover: 'wa-hover' as EventName<WaHoverEvent>,
  },
  displayName: 'WaRating',
});

export default reactWrapper;
