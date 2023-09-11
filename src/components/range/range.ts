import WaRange from './range.component.js';

export * from './range.component.js';
export default WaRange;

WaRange.define('wa-range');

declare global {
  interface HTMLElementTagNameMap {
    'wa-range': WaRange;
  }
}
