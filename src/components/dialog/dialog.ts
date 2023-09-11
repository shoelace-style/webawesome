import WaDialog from './dialog.component.js';

export * from './dialog.component.js';
export default WaDialog;

WaDialog.define('wa-dialog');

declare global {
  interface HTMLElementTagNameMap {
    'wa-dialog': WaDialog;
  }
}
