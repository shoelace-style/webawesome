import { createComponent } from '@lit/react';
import * as React from 'react';
import Component from '../../components/tab-group/tab-group.js';

import { type EventName } from '@lit/react';
import type { WaTabHideEvent, WaTabShowEvent } from '../../events/events.js';
export type { WaTabHideEvent, WaTabShowEvent } from '../../events/events.js';

const tagName = 'wa-tab-group';

/**
 * @summary Tab groups organize content into a container that shows one section at a time.
 * @documentation https://backers.webawesome.com/docs/components/tab-group
 * @status stable
 * @since 2.0
 *
 * @dependency wa-button
 * @dependency wa-tab
 * @dependency wa-tab-panel
 *
 * @slot - Used for grouping tab panels in the tab group. Must be `<wa-tab-panel>` elements.
 * @slot nav - Used for grouping tabs in the tab group. Must be `<wa-tab>` elements. Note that `<wa-tab>` will set this
 *  slot on itself automatically.
 *
 * @event {{ name: String }} wa-tab-show - Emitted when a tab is shown.
 * @event {{ name: String }} wa-tab-hide - Emitted when a tab is hidden.
 *
 * @csspart base - The component's base wrapper.
 * @csspart nav - The tab group's navigation container where tabs are slotted in.
 * @csspart tabs - The container that wraps the tabs.
 * @csspart body - The tab group's body where tab panels are slotted in.
 * @csspart scroll-button - The previous/next scroll buttons that show when tabs are scrollable, a `<wa-button>`.
 * @csspart scroll-button-start - The starting scroll button.
 * @csspart scroll-button-end - The ending scroll button.
 * @csspart scroll-button__base - The scroll button's exported `base` part.
 *
 * @cssproperty --indicator-color - The color of the active tab indicator.
 * @cssproperty --track-color - The color of the indicator's track (the line that separates tabs from panels).
 * @cssproperty --track-width - The width of the indicator's track (the line that separates tabs from panels).
 */
const reactWrapper = createComponent({
  tagName,
  elementClass: Component,
  react: React,
  events: {
    onWaTabShow: 'wa-tab-show' as EventName<WaTabShowEvent>,
    onWaTabHide: 'wa-tab-hide' as EventName<WaTabHideEvent>,
  },
  displayName: 'WaTabGroup',
});

export default reactWrapper;
