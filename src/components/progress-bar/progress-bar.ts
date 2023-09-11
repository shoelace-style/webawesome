import WaProgressBar from './progress-bar.component.js';

export * from './progress-bar.component.js';
export default WaProgressBar;

WaProgressBar.define('wa-progress-bar');

declare global {
  interface HTMLElementTagNameMap {
    'wa-progress-bar': WaProgressBar;
  }
}
