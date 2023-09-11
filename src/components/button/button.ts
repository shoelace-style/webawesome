import WaButton from './button.component.js';

export * from './button.component.js';
export default WaButton;

WaButton.define('wa-button');

declare global {
  interface HTMLElementTagNameMap {
    'wa-button': WaButton;
  }
}
