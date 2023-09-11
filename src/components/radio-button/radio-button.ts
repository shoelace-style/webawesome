import WaRadioButton from './radio-button.component.js';

export * from './radio-button.component.js';
export default WaRadioButton;

WaRadioButton.define('wa-radio-button');

declare global {
  interface HTMLElementTagNameMap {
    'wa-radio-button': WaRadioButton;
  }
}
