import WaColorPicker from './color-picker.component.js';

export * from './color-picker.component.js';
export default WaColorPicker;

WaColorPicker.define('wa-color-picker');

declare global {
  interface HTMLElementTagNameMap {
    'wa-color-picker': WaColorPicker;
  }
}
