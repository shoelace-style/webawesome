import WaDropdown from './dropdown.component.js';

export * from './dropdown.component.js';
export default WaDropdown;

WaDropdown.define('wa-dropdown');

declare global {
  interface HTMLElementTagNameMap {
    'wa-dropdown': WaDropdown;
  }
}
