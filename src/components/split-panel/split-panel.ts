import WaSplitPanel from './split-panel.component.js';

export * from './split-panel.component.js';
export default WaSplitPanel;

WaSplitPanel.define('wa-split-panel');

declare global {
  interface HTMLElementTagNameMap {
    'wa-split-panel': WaSplitPanel;
  }
}
