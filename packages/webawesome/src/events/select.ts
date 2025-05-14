import type WaMenuItem from '../components/menu-item/menu-item.js';

export class WaSelectEvent extends Event {
  readonly detail;

  constructor(detail: WaSelectEventDetail) {
    super('wa-select', { bubbles: true, cancelable: false, composed: true });
    this.detail = detail;
  }
}

interface WaSelectEventDetail {
  item: WaMenuItem;
}

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-select': WaSelectEvent;
  }
}
