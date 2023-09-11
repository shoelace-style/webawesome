import WaCarouselItem from './carousel-item.component.js';

export * from './carousel-item.component.js';
export default WaCarouselItem;

WaCarouselItem.define('wa-carousel-item');

declare global {
  interface HTMLElementTagNameMap {
    'wa-carousel-item': WaCarouselItem;
  }
}
