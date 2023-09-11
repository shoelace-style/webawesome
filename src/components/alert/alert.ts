import WaAlert from './alert.component.js';

export * from './alert.component.js';
export default WaAlert;

WaAlert.define('wa-alert');

declare global {
  interface HTMLElementTagNameMap {
    'wa-alert': WaAlert;
  }
}
