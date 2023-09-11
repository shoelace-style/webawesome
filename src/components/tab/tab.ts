import WaTab from './tab.component.js';

export * from './tab.component.js';
export default WaTab;

WaTab.define('wa-tab');

declare global {
  interface HTMLElementTagNameMap {
    'wa-tab': WaTab;
  }
}
