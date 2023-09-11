import WaTree from './tree.component.js';

export * from './tree.component.js';
export default WaTree;

WaTree.define('wa-tree');

declare global {
  interface HTMLElementTagNameMap {
    'wa-tree': WaTree;
  }
}
