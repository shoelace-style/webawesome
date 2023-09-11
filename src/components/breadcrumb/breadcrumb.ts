import WaBreadcrumb from './breadcrumb.component.js';

export * from './breadcrumb.component.js';
export default WaBreadcrumb;

WaBreadcrumb.define('wa-breadcrumb');

declare global {
  interface HTMLElementTagNameMap {
    'wa-breadcrumb': WaBreadcrumb;
  }
}
