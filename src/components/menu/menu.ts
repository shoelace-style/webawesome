import WaMenu from './menu.component.js';

export * from './menu.component.js';
export default WaMenu;

WaMenu.define('wa-menu');

declare global {
  interface HTMLElementTagNameMap {
    'wa-menu': WaMenu;
  }
}
