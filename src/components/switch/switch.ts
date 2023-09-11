import WaSwitch from './switch.component.js';

export * from './switch.component.js';
export default WaSwitch;

WaSwitch.define('wa-switch');

declare global {
  interface HTMLElementTagNameMap {
    'wa-switch': WaSwitch;
  }
}
