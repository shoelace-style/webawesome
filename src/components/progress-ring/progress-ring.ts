import WaProgressRing from './progress-ring.component.js';

export * from './progress-ring.component.js';
export default WaProgressRing;

WaProgressRing.define('wa-progress-ring');

declare global {
  interface HTMLElementTagNameMap {
    'wa-progress-ring': WaProgressRing;
  }
}
