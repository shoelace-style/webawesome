import WaMenuLabel from './menu-label.component.js';

export * from './menu-label.component.js';
export default WaMenuLabel;

WaMenuLabel.define('wa-menu-label');

declare global {
  interface HTMLElementTagNameMap {
    'wa-menu-label': WaMenuLabel;
  }
}
