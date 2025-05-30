import type WaCarouselItem from '../components/carousel-item/carousel-item.js';

export class WaSlideChangeEvent extends Event {
  readonly detail: WaSlideChangeEventDetails;

  constructor(detail: WaSlideChangeEventDetails) {
    super('wa-slide-change', { bubbles: true, cancelable: false, composed: true });
    this.detail = detail;
  }
}

interface WaSlideChangeEventDetails {
  index: number;
  slide: WaCarouselItem;
}

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-slide-change': WaSlideChangeEvent;
  }
}
