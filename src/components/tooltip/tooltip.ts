import WaTooltip from './tooltip.component.js';

export * from './tooltip.component.js';
export default WaTooltip;

WaTooltip.define('wa-tooltip');

declare global {
  interface HTMLElementTagNameMap {
    'wa-tooltip': WaTooltip;
  }
}
