import WaDivider from './divider.component.js';

export * from './divider.component.js';
export default WaDivider;

WaDivider.define('wa-divider');

declare global {
  interface HTMLElementTagNameMap {
    'wa-divider': WaDivider;
  }
}
