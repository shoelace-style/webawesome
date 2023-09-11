import WaSpinner from './spinner.component.js';

export * from './spinner.component.js';
export default WaSpinner;

WaSpinner.define('wa-spinner');

declare global {
  interface HTMLElementTagNameMap {
    'wa-spinner': WaSpinner;
  }
}
