import WaMenuItem from './menu-item.component.js';

export * from './menu-item.component.js';
export default WaMenuItem;

WaMenuItem.define('wa-menu-item');

declare global {
  interface HTMLElementTagNameMap {
    'wa-menu-item': WaMenuItem;
  }
}
