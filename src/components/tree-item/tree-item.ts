import WaTreeItem from './tree-item.component.js';

export * from './tree-item.component.js';
export default WaTreeItem;

WaTreeItem.define('wa-tree-item');

declare global {
  interface HTMLElementTagNameMap {
    'wa-tree-item': WaTreeItem;
  }
}
