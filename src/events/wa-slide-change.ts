import type WaCarouselItem from '../components/carousel-item/carousel-item.js';

export type WaSlideChangeEvent = CustomEvent<{ index: number; slide: WaCarouselItem }>;

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-slide-change': WaSlideChangeEvent;
  }
}
