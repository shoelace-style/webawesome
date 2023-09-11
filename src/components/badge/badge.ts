import WaBadge from './badge.component.js';

export * from './badge.component.js';
export default WaBadge;

WaBadge.define('wa-badge');

declare global {
  interface HTMLElementTagNameMap {
    'wa-badge': WaBadge;
  }
}
