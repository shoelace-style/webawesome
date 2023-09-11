import WaTextarea from './textarea.component.js';

export * from './textarea.component.js';
export default WaTextarea;

WaTextarea.define('wa-textarea');

declare global {
  interface HTMLElementTagNameMap {
    'wa-textarea': WaTextarea;
  }
}
