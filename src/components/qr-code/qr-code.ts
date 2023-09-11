import WaQrCode from './qr-code.component.js';

export * from './qr-code.component.js';
export default WaQrCode;

WaQrCode.define('wa-qr-code');

declare global {
  interface HTMLElementTagNameMap {
    'wa-qr-code': WaQrCode;
  }
}
