import { createComponent } from '@lit/react';
import * as React from 'react';
import Component from '../../components/animation/animation.js';

import { type EventName } from '@lit/react';
import type { WaCancelEvent, WaFinishEvent, WaStartEvent } from '../../events/events.js';
export type { WaCancelEvent, WaFinishEvent, WaStartEvent } from '../../events/events.js';

const tagName = 'wa-animation';

/**
 * @summary Animate elements declaratively with nearly 100 baked-in presets, or roll your own with custom keyframes. Powered by the [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API).
 * @documentation https://backers.webawesome.com/docs/components/animation
 * @status stable
 * @since 2.0
 *
 * @event wa-cancel - Emitted when the animation is canceled.
 * @event wa-finish - Emitted when the animation finishes.
 * @event wa-start - Emitted when the animation starts or restarts.
 *
 * @slot - The element to animate. Avoid slotting in more than one element, as subsequent ones will be ignored. To
 *  animate multiple elements, either wrap them in a single container or use multiple `<wa-animation>` elements.
 */
const reactWrapper = createComponent({
  tagName,
  elementClass: Component,
  react: React,
  events: {
    onWaCancel: 'wa-cancel' as EventName<WaCancelEvent>,
    onWaFinish: 'wa-finish' as EventName<WaFinishEvent>,
    onWaStart: 'wa-start' as EventName<WaStartEvent>,
  },
  displayName: 'WaAnimation',
});

export default reactWrapper;
