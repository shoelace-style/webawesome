import WaAnimatedImage from './animated-image.component.js';

export * from './animated-image.component.js';
export default WaAnimatedImage;

WaAnimatedImage.define('wa-animated-image');

declare global {
  interface HTMLElementTagNameMap {
    'wa-animated-image': WaAnimatedImage;
  }
}
