import WaOption from './option.component.js';

export * from './option.component.js';
export default WaOption;

WaOption.define('wa-option');

declare global {
  interface HTMLElementTagNameMap {
    'wa-option': WaOption;
  }
}
