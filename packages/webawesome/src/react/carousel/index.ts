import { createComponent } from '@lit/react';
import * as React from 'react';
import Component from '../../components/carousel/carousel.js';

import { type EventName } from '@lit/react';
import type { WaSlideChangeEvent } from '../../events/events.js';
export type { WaSlideChangeEvent } from '../../events/events.js';

const tagName = 'wa-carousel';

/**
 * @summary Carousels display an arbitrary number of content slides along a horizontal or vertical axis.
 *
 * @since 2.2
 * @status experimental
 *
 * @dependency wa-icon
 *
 * @event {{ index: number, slide: WaCarouselItem }} wa-slide-change - Emitted when the active slide changes.
 *
 * @slot - The carousel's main content, one or more `<wa-carousel-item>` elements.
 * @slot next-icon - Optional next icon to use instead of the default. Works best with `<wa-icon>`.
 * @slot previous-icon - Optional previous icon to use instead of the default. Works best with `<wa-icon>`.
 *
 * @csspart base - The carousel's internal wrapper.
 * @csspart scroll-container - The scroll container that wraps the slides.
 * @csspart pagination - The pagination indicators wrapper.
 * @csspart pagination-item - The pagination indicator.
 * @csspart pagination-item-active - Applied when the item is active.
 * @csspart navigation - The navigation wrapper.
 * @csspart navigation-button - The navigation button.
 * @csspart navigation-button-previous - Applied to the previous button.
 * @csspart navigation-button-next - Applied to the next button.
 *
 * @cssproperty [--aspect-ratio=16/9] - The aspect ratio of each slide.
 * @cssproperty --navigation-color - The color of the navigation arrows.
 * @cssproperty --pagination-color - The color of the dots indicating the number of slides.
 * @cssproperty --pagination-color-active - The color of the dot indicating the active slide.
 * @cssproperty --scroll-hint - The amount of padding to apply to the scroll area, allowing adjacent slides to become
 *  partially visible as a scroll hint.
 * @cssproperty --slide-gap - The space between each slide.
 */
const reactWrapper = createComponent({
  tagName,
  elementClass: Component,
  react: React,
  events: {
    onWaSlideChange: 'wa-slide-change' as EventName<WaSlideChangeEvent>,
  },
  displayName: 'WaCarousel',
});

export default reactWrapper;
