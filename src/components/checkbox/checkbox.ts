import WaCheckbox from './checkbox.component.js';

export * from './checkbox.component.js';
export default WaCheckbox;

WaCheckbox.define('wa-checkbox');

declare global {
  interface HTMLElementTagNameMap {
    'wa-checkbox': WaCheckbox;
  }
}
