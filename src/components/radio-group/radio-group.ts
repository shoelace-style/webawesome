import WaRadioGroup from './radio-group.component.js';

export * from './radio-group.component.js';
export default WaRadioGroup;

WaRadioGroup.define('wa-radio-group');

declare global {
  interface HTMLElementTagNameMap {
    'wa-radio-group': WaRadioGroup;
  }
}
