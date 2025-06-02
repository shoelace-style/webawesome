import type WaTreeItem from '../components/tree-item/tree-item.js';

export class WaSelectionChangeEvent extends Event {
  readonly detail: WaSelectionChangeEventDetail;

  constructor(detail: WaSelectionChangeEventDetail) {
    super('wa-selection-change', { bubbles: true, cancelable: false, composed: true });
    this.detail = detail;
  }
}

interface WaSelectionChangeEventDetail {
  selection: WaTreeItem[];
}

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-selection-change': WaSelectionChangeEvent;
  }
}
