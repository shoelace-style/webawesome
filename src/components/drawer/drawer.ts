import WaDrawer from './drawer.component.js';

export * from './drawer.component.js';
export default WaDrawer;

WaDrawer.define('wa-drawer');

declare global {
  interface HTMLElementTagNameMap {
    'wa-drawer': WaDrawer;
  }
}
