import WaFormatDate from './format-date.component.js';

export * from './format-date.component.js';
export default WaFormatDate;

WaFormatDate.define('wa-format-date');

declare global {
  interface HTMLElementTagNameMap {
    'wa-format-date': WaFormatDate;
  }
}
