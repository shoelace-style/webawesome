import { createComponent } from '@lit/react';
import * as React from 'react';
import Component from '../../components/icon/icon.js';

import { type EventName } from '@lit/react';
import type { WaErrorEvent, WaLoadEvent } from '../../events/events.js';
export type { WaErrorEvent, WaLoadEvent } from '../../events/events.js';

const tagName = 'wa-icon';

/**
 * @summary Icons are symbols that can be used to represent various options within an application.
 * @documentation https://backers.webawesome.com/docs/components/icon
 * @status stable
 * @since 2.0
 *
 * @event wa-load - Emitted when the icon has loaded. When using `spriteSheet: true` this will not emit.
 * @event wa-error - Emitted when the icon fails to load due to an error. When using `spriteSheet: true` this will not emit.
 *
 * @csspart svg - The internal SVG element.
 * @csspart use - The `<use>` element generated when using `spriteSheet: true`
 *
 * @cssproperty [--primary-color=currentColor] - Sets a duotone icon's primary color.
 * @cssproperty [--primary-opacity=1] - Sets a duotone icon's primary opacity.
 * @cssproperty [--secondary-color=currentColor] - Sets a duotone icon's secondary color.
 * @cssproperty [--secondary-opacity=0.4] - Sets a duotone icon's secondary opacity.
 */
const reactWrapper = createComponent({
  tagName,
  elementClass: Component,
  react: React,
  events: {
    onWaLoad: 'wa-load' as EventName<WaLoadEvent>,
    onWaError: 'wa-error' as EventName<WaErrorEvent>,
  },
  displayName: 'WaIcon',
});

export default reactWrapper;
