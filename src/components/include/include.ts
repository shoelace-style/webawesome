import WaInclude from './include.component.js';

export * from './include.component.js';
export default WaInclude;

WaInclude.define('wa-include');

declare global {
  interface HTMLElementTagNameMap {
    'wa-include': WaInclude;
  }
}
