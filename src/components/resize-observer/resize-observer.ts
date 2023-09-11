import WaResizeObserver from './resize-observer.component.js';

export * from './resize-observer.component.js';
export default WaResizeObserver;

WaResizeObserver.define('wa-resize-observer');

declare global {
  interface HTMLElementTagNameMap {
    'wa-resize-observer': WaResizeObserver;
  }
}
