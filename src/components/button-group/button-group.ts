import WaButtonGroup from './button-group.component.js';

export * from './button-group.component.js';
export default WaButtonGroup;

WaButtonGroup.define('wa-button-group');

declare global {
  interface HTMLElementTagNameMap {
    'wa-button-group': WaButtonGroup;
  }
}
