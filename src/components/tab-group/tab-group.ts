import WaTabGroup from './tab-group.component.js';

export * from './tab-group.component.js';
export default WaTabGroup;

WaTabGroup.define('wa-tab-group');

declare global {
  interface HTMLElementTagNameMap {
    'wa-tab-group': WaTabGroup;
  }
}
