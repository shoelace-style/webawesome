import WaPopup from './popup.component.js';

export * from './popup.component.js';
export default WaPopup;

WaPopup.define('wa-popup');

declare global {
  interface HTMLElementTagNameMap {
    'wa-popup': WaPopup;
  }
}
