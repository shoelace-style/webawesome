import WaSelect from './select.component.js';

export * from './select.component.js';
export default WaSelect;

WaSelect.define('wa-select');

declare global {
  interface HTMLElementTagNameMap {
    'wa-select': WaSelect;
  }
}
