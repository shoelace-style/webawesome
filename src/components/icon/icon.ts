import WaIcon from './icon.component.js';

export * from './icon.component.js';
export default WaIcon;

WaIcon.define('wa-icon');

declare global {
  interface HTMLElementTagNameMap {
    'wa-icon': WaIcon;
  }
}
