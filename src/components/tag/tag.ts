import WaTag from './tag.component.js';

export * from './tag.component.js';
export default WaTag;

WaTag.define('wa-tag');

declare global {
  interface HTMLElementTagNameMap {
    'wa-tag': WaTag;
  }
}
