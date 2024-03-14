import WaPage from './page.component.js';
export * from './page.component.js';
export default WaPage;
WaPage.define('wa-page');

declare global {
  interface HTMLElementTagNameMap {
    'wa-page': WaPage;
  }
}
