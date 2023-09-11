import WaSkeleton from './skeleton.component.js';

export * from './skeleton.component.js';
export default WaSkeleton;

WaSkeleton.define('wa-skeleton');

declare global {
  interface HTMLElementTagNameMap {
    'wa-skeleton': WaSkeleton;
  }
}
