import WaFormatNumber from './format-number.component.js';

export * from './format-number.component.js';
export default WaFormatNumber;

WaFormatNumber.define('wa-format-number');

declare global {
  interface HTMLElementTagNameMap {
    'wa-format-number': WaFormatNumber;
  }
}
