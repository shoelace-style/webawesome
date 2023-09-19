import WaNavItem from './nav-item.component.js';

export * from './nav-item.component.js';
export default WaNavItem;

WaNavItem.define('wa-nav-item');

declare global {
  interface HTMLElementTagNameMap {
    'wa-nav-item': WaNavItem;
  }
}
