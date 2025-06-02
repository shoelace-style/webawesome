import { createComponent } from '@lit/react';
import * as React from 'react';
import Component from '../../components/dropdown/dropdown.js';

import { type EventName } from '@lit/react';
import type { WaAfterHideEvent, WaAfterShowEvent, WaHideEvent, WaShowEvent } from '../../events/events.js';
export type { WaAfterHideEvent, WaAfterShowEvent, WaHideEvent, WaShowEvent } from '../../events/events.js';

const tagName = 'wa-dropdown';

/**
 * @summary Dropdowns expose additional content that "drops down" in a panel.
 * @documentation https://backers.webawesome.com/docs/components/dropdown
 * @status stable
 * @since 2.0
 *
 * @dependency wa-popup
 *
 * @slot - The dropdown's main content.
 * @slot trigger - The dropdown's trigger, usually a `<wa-button>` element.
 *
 * @event wa-show - Emitted when the dropdown opens.
 * @event wa-after-show - Emitted after the dropdown opens and all animations are complete.
 * @event wa-hide - Emitted when the dropdown closes.
 * @event wa-after-hide - Emitted after the dropdown closes and all animations are complete.
 *
 * @cssproperty --box-shadow - The shadow effects around the dropdown's edges.
 *
 * @csspart base - The component's base wrapper, a `<wa-popup>` element.
 * @csspart base__popup - The popup's exported `popup` part. Use this to target the tooltip's popup container.
 * @csspart trigger - The container that wraps the trigger.
 * @csspart panel - The panel that gets shown when the dropdown is open.
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
  displayName: 'WaDropdown',
});

export default reactWrapper;
