import { createComponent } from '@lit/react';
import * as React from 'react';
import Component from '../../components/split-panel/split-panel.js';

import { type EventName } from '@lit/react';
import type { WaRepositionEvent } from '../../events/events.js';
export type { WaRepositionEvent } from '../../events/events.js';

const tagName = 'wa-split-panel';

/**
 * @summary Split panels display two adjacent panels, allowing the user to reposition them.
 * @documentation https://backers.webawesome.com/docs/components/split-panel
 * @status stable
 * @since 2.0
 *
 * @event wa-reposition - Emitted when the divider's position changes.
 *
 * @slot start - Content to place in the start panel.
 * @slot end - Content to place in the end panel.
 * @slot divider - The divider. Useful for slotting in a custom icon that renders as a handle.
 *
 * @csspart start - The start panel.
 * @csspart end - The end panel.
 * @csspart panel - Targets both the start and end panels.
 * @csspart divider - The divider that separates the start and end panels.
 *
 * @cssproperty --divider-color - The color of the divider.
 * @cssproperty [--divider-width=4px] - The width of the visible divider.
 * @cssproperty [--divider-hit-area=12px] - The invisible region around the divider where dragging can occur. This is
 *  usually wider than the divider to facilitate easier dragging.
 * @cssproperty [--min=0] - The minimum allowed size of the primary panel.
 * @cssproperty [--max=100%] - The maximum allowed size of the primary panel.
 */
const reactWrapper = createComponent({
  tagName,
  elementClass: Component,
  react: React,
  events: {
    onWaReposition: 'wa-reposition' as EventName<WaRepositionEvent>,
  },
  displayName: 'WaSplitPanel',
});

export default reactWrapper;
