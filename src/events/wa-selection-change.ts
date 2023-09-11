import type WaTreeItem from '../components/tree-item/tree-item';

export type WaSelectionChangeEvent = CustomEvent<{ selection: WaTreeItem[] }>;

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-selection-change': WaSelectionChangeEvent;
  }
}
