import WaNavGroup from './nav-group.component.js';

export * from './nav-group.component.js';
export default WaNavGroup;

WaNavGroup.define('wa-nav-group');

declare global {
  interface HTMLElementTagNameMap {
    'wa-nav-group': WaNavGroup;
  }
}
