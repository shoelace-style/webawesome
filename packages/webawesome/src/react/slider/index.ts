import { createComponent } from '@lit/react';
import * as React from 'react';
import Component from '../../components/slider/slider.js';

import { type EventName } from '@lit/react';
import type { WaInvalidEvent } from '../../events/events.js';
export type { WaInvalidEvent } from '../../events/events.js';

const tagName = 'wa-slider';

/**
 * @summary Ranges allow the user to select a single value within a given range using a slider.
 * @documentation https://backers.webawesome.com/docs/components/range
 * @status stable
 * @since 2.0
 *
 * @slot label - The slider label. Alternatively, you can use the `label` attribute.
 * @slot hint - Text that describes how to use the input. Alternatively, you can use the `hint` attribute.
 *
 * @event blur - Emitted when the control loses focus.
 * @event change - Emitted when an alteration to the control's value is committed by the user.
 * @event focus - Emitted when the control gains focus.
 * @event input - Emitted when the control receives input.
 * @event wa-invalid - Emitted when the form control has been checked for validity and its constraints aren't satisfied.
 *
 * @csspart form-control - The form control that wraps the label, input, and hint.
 * @csspart form-control-label - The input's label.
 * @csspart form-control-input - The input's wrapper.
 * @csspart hint - The hint's wrapper.
 * @csspart base - The internal `<input>` element.
 * @csspart tooltip - The slider tooltip.
 *
 * @cssproperty --thumb-color - The color of the thumb.
 * @cssproperty --thumb-gap - The visual gap between the edges of the thumb and the track.
 * @cssproperty --thumb-shadow - The shadow effects around the edges of the thumb.
 * @cssproperty --thumb-size - The size of the thumb.
 * @cssproperty --tooltip-offset - The vertical distance the tooltip is offset from the thumb.
 * @cssproperty --track-color-active - The color of the portion of the track that represents the current value.
 * @cssproperty --track-color-inactive - The of the portion of the track that represents the remaining value.
 * @cssproperty --track-height - The height of the track.
 * @cssproperty --track-active-offset - The point of origin of the active track.
 */
const reactWrapper = createComponent({
  tagName,
  elementClass: Component,
  react: React,
  events: {
    onWaInvalid: 'wa-invalid' as EventName<WaInvalidEvent>,
  },
  displayName: 'WaSlider',
});

export default reactWrapper;
