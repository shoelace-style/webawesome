import { createComponent } from '@lit/react';
import * as React from 'react';
import Component from '../../components/tooltip/tooltip.js';

import { type EventName } from '@lit/react';
import type { WaAfterHideEvent, WaAfterShowEvent, WaHideEvent, WaShowEvent } from '../../events/events.js';
export type { WaAfterHideEvent, WaAfterShowEvent, WaHideEvent, WaShowEvent } from '../../events/events.js';

const tagName = 'wa-tooltip';

/**
 * @summary Tooltips display additional information based on a specific action.
 * @documentation https://backers.webawesome.com/docs/components/tooltip
 * @status stable
 * @since 2.0
 *
 * @dependency wa-popup
 *
 * @slot - The tooltip's default slot where any content should live. Interactive content should be avoided.
 *
 * @event wa-show - Emitted when the tooltip begins to show.
 * @event wa-after-show - Emitted after the tooltip has shown and all animations are complete.
 * @event wa-hide - Emitted when the tooltip begins to hide.
 * @event wa-after-hide - Emitted after the tooltip has hidden and all animations are complete.
 *
 * @csspart base - The component's base wrapper, an `<wa-popup>` element.
 * @csspart base__popup - The popup's exported `popup` part. Use this to target the tooltip's popup container.
 * @csspart base__arrow - The popup's exported `arrow` part. Use this to target the tooltip's arrow.
 * @csspart body - The tooltip's body where its content is rendered.
 *
 * @cssproperty --background-color - The tooltip's background color.
 * @cssproperty --border-radius - The radius of the tooltip's corners.
 * @cssproperty --max-width - The maximum width of the tooltip before its content will wrap.
 * @cssproperty --padding - The padding within the tooltip.
 */
const reactWrapper = createComponent({
  tagName,
  elementClass: Component,
  react: React,
  events: {
    onWaShow: 'wa-show' as EventName<WaShowEvent>,
    onWaAfterShow: 'wa-after-show' as EventName<WaAfterShowEvent>,
    onWaHide: 'wa-hide' as EventName<WaHideEvent>,
    onWaAfterHide: 'wa-after-hide' as EventName<WaAfterHideEvent>,
  },
  displayName: 'WaTooltip',
});

export default reactWrapper;
