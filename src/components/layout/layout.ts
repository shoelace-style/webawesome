import WaLayout from './layout.component.js';
export * from './layout.component.js';
export default WaLayout;
WaLayout.define('wa-layout');

declare global {
  interface HTMLElementTagNameMap {
    'wa-layout': WaLayout;
  }
}
