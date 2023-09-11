import WaDetails from './details.component.js';

export * from './details.component.js';
export default WaDetails;

WaDetails.define('wa-details');

declare global {
  interface HTMLElementTagNameMap {
    'wa-details': WaDetails;
  }
}
