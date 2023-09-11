import WaMutationObserver from './mutation-observer.component.js';

export * from './mutation-observer.component.js';
export default WaMutationObserver;

WaMutationObserver.define('wa-mutation-observer');

declare global {
  interface HTMLElementTagNameMap {
    'wa-mutation-observer': WaMutationObserver;
  }
}
