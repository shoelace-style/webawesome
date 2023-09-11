import WaRadio from './radio.component.js';

export * from './radio.component.js';
export default WaRadio;

WaRadio.define('wa-radio');

declare global {
  interface HTMLElementTagNameMap {
    'wa-radio': WaRadio;
  }
}
