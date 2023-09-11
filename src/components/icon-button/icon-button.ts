import WaIconButton from './icon-button.component.js';

export * from './icon-button.component.js';
export default WaIconButton;

WaIconButton.define('wa-icon-button');

declare global {
  interface HTMLElementTagNameMap {
    'wa-icon-button': WaIconButton;
  }
}
