import { createComponent } from '@lit/react';
import * as React from 'react';
import Component from '../../components/popup/popup.js';

import { type EventName } from '@lit/react';
import type { WaRepositionEvent } from '../../events/events.js';
export type { WaRepositionEvent } from '../../events/events.js';

const tagName = 'wa-popup';

/**
 * @summary Popup is a utility that lets you declaratively anchor "popup" containers to another element.
 * @documentation https://backers.webawesome.com/docs/components/popup
 * @status stable
 * @since 2.0
 *
 * @event wa-reposition - Emitted when the popup is repositioned. This event can fire a lot, so avoid putting expensive
 *  operations in your listener or consider debouncing it.
 *
 * @slot - The popup's content.
 * @slot anchor - The element the popup will be anchored to. If the anchor lives outside of the popup, you can use the
 *  `anchor` attribute or property instead.
 *
 * @csspart arrow - The arrow's container. Avoid setting `top|bottom|left|right` properties, as these values are
 *  assigned dynamically as the popup moves. This is most useful for applying a background color to match the popup, and
 *  maybe a border or box shadow.
 * @csspart popup - The popup's container. Useful for setting a background color, box shadow, etc.
 * @csspart hover-bridge - The hover bridge element. Only available when the `hover-bridge` option is enabled.
 *
 * @cssproperty [--arrow-size=6px] - The size of the arrow. Note that an arrow won't be shown unless the `arrow`
 *  attribute is used.
 * @cssproperty [--arrow-color=black] - The color of the arrow.
 * @cssproperty [--auto-size-available-width] - A read-only custom property that determines the amount of width the
 *  popup can be before overflowing. Useful for positioning child elements that need to overflow. This property is only
 *  available when using `auto-size`.
 * @cssproperty [--auto-size-available-height] - A read-only custom property that determines the amount of height the
 *  popup can be before overflowing. Useful for positioning child elements that need to overflow. This property is only
 *  available when using `auto-size`.
 * @cssproperty [--show-duration=100ms] - The show duration to use when applying built-in animation classes.
 * @cssproperty [--hide-duration=100ms] - The hide duration to use when applying built-in animation classes.
 */
const reactWrapper = createComponent({
  tagName,
  elementClass: Component,
  react: React,
  events: {
    onWaReposition: 'wa-reposition' as EventName<WaRepositionEvent>,
  },
  displayName: 'WaPopup',
});

export default reactWrapper;
