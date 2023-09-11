import WaVisuallyHidden from './visually-hidden.component.js';

export * from './visually-hidden.component.js';
export default WaVisuallyHidden;

WaVisuallyHidden.define('wa-visually-hidden');

declare global {
  interface HTMLElementTagNameMap {
    'wa-visually-hidden': WaVisuallyHidden;
  }
}
