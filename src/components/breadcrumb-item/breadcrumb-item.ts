import WaBreadcrumbItem from './breadcrumb-item.component.js';

export * from './breadcrumb-item.component.js';
export default WaBreadcrumbItem;

WaBreadcrumbItem.define('wa-breadcrumb-item');

declare global {
  interface HTMLElementTagNameMap {
    'wa-breadcrumb-item': WaBreadcrumbItem;
  }
}
