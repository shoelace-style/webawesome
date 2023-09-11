import WaCarousel from './carousel.component.js';

export * from './carousel.component.js';
export default WaCarousel;

WaCarousel.define('wa-carousel');

declare global {
  interface HTMLElementTagNameMap {
    'wa-carousel': WaCarousel;
  }
}
