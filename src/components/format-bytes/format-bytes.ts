import WaFormatBytes from './format-bytes.component.js';

export * from './format-bytes.component.js';
export default WaFormatBytes;

WaFormatBytes.define('wa-format-bytes');

declare global {
  interface HTMLElementTagNameMap {
    'wa-format-bytes': WaFormatBytes;
  }
}
