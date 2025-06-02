import { createComponent } from '@lit/react';
import * as React from 'react';
import Component from '../../components/include/include.js';

import { type EventName } from '@lit/react';
import type { WaErrorEvent, WaLoadEvent } from '../../events/events.js';
export type { WaErrorEvent, WaLoadEvent } from '../../events/events.js';

const tagName = 'wa-include';

/**
 * @summary Includes give you the power to embed external HTML files into the page.
 * @documentation https://backers.webawesome.com/docs/components/include
 * @status stable
 * @since 2.0
 *
 * @event wa-load - Emitted when the included file is loaded.
 * @event {{ status: number }} wa-error - Emitted when the included file fails to load due to an error.
 */
const reactWrapper = createComponent({
  tagName,
  elementClass: Component,
  react: React,
  events: {
    onWaLoad: 'wa-load' as EventName<WaLoadEvent>,
    onWaError: 'wa-error' as EventName<WaErrorEvent>,
  },
  displayName: 'WaInclude',
});

export default reactWrapper;
