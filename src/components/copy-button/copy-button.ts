import WaCopyButton from './copy-button.component.js';

export * from './copy-button.component.js';
export default WaCopyButton;

WaCopyButton.define('wa-copy-button');

declare global {
  interface HTMLElementTagNameMap {
    'wa-copy-button': WaCopyButton;
  }
}
