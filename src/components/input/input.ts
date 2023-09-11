import WaInput from './input.component.js';

export * from './input.component.js';
export default WaInput;

WaInput.define('wa-input');

declare global {
  interface HTMLElementTagNameMap {
    'wa-input': WaInput;
  }
}
