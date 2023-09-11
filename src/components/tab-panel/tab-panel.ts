import WaTabPanel from './tab-panel.component.js';

export * from './tab-panel.component.js';
export default WaTabPanel;

WaTabPanel.define('wa-tab-panel');

declare global {
  interface HTMLElementTagNameMap {
    'wa-tab-panel': WaTabPanel;
  }
}
