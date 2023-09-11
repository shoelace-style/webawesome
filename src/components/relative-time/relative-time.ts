import WaRelativeTime from './relative-time.component.js';

export * from './relative-time.component.js';
export default WaRelativeTime;

WaRelativeTime.define('wa-relative-time');

declare global {
  interface HTMLElementTagNameMap {
    'wa-relative-time': WaRelativeTime;
  }
}
