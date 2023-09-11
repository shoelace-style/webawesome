import WaImageComparer from './image-comparer.component.js';

export * from './image-comparer.component.js';
export default WaImageComparer;

WaImageComparer.define('wa-image-comparer');

declare global {
  interface HTMLElementTagNameMap {
    'wa-image-comparer': WaImageComparer;
  }
}
