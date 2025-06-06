import { createComponent } from '@lit/react';
import * as React from 'react';
import Component from '../../components/slider/slider.js';

import { type EventName } from '@lit/react';
import type { WaInvalidEvent } from '../../events/events.js';
export type { WaInvalidEvent } from '../../events/events.js';

const tagName = 'wa-slider';

/**
 * <wa-slider>
 *
 * @summary Ranges allow the user to select a single value within a given range using a slider.
 * @documentation https://backers.webawesome.com/docs/components/range
 * @status stable
 * @since 2.0
 *
 * @dependency wa-tooltip
 *
 * @slot label - The slider label. Alternatively, you can use the `label` attribute.
 * @slot hint - Text that describes how to use the input. Alternatively, you can use the `hint` attribute.
 *  instead.
 * @slot reference - One or more reference labels to show visually below the slider.
 *
 * @event blur - Emitted when the control loses focus.
 * @event change - Emitted when an alteration to the control's value is committed by the user.
 * @event focus - Emitted when the control gains focus.
 * @event input - Emitted when the control receives input.
 * @event wa-invalid - Emitted when the form control has been checked for validity and its constraints aren't satisfied.
 *
 * @csspart label - The element that contains the sliders's label.
 * @csspart hint - The element that contains the slider's description.
 * @csspart slider - The focusable element with `role="slider"`. Contains the track and reference slot.
 * @csspart track - The slider's track.
 * @csspart indicator - The colored indicator that shows from the start of the slider to the current value.
 * @csspart markers - The container that holds all the markers when `with-markers` is used.
 * @csspart marker - The individual markers that are shown when `with-markers` is used.
 * @csspart references - The container that holds references that get slotted in.
 * @csspart thumb - The slider's thumb.
 * @csspart thumb-min - The min value thumb in a range slider.
 * @csspart thumb-max - The max value thumb in a range slider.
 * @csspart tooltip - The tooltip, a `<wa-tooltip>` element.
 * @csspart tooltip__tooltip - The tooltip's `tooltip` part.
 * @csspart tooltip__content - The tooltip's `content` part.
 * @csspart tooltip__arrow - The tooltip's `arrow` part.
 *
 * @cssstate disabled - Applied when the slider is disabled.
 * @cssstate dragging - Applied when the slider is being dragged.
 * @cssstate focused - Applied when the slider has focus.
 * @cssstate user-valid - Applied when the slider is valid and the user has sufficiently interacted with it.
 * @cssstate user-invalid - Applied when the slider is invalid and the user has sufficiently interacted with it.
 *
 * @cssproperty [--track-size=0.75em] - The height or width of the slider's track.
 * @cssproperty [--marker-width=0.1875em] - The width of each individual marker.
 * @cssproperty [--marker-height=0.1875em] - The height of each individual marker.
 * @cssproperty [--thumb-width=1.25em] - The width of the thumb.
 * @cssproperty [--thumb-height=1.25em] - The height of the thumb.
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
