export class WaRowSelectEvent extends Event {
  readonly detail: WaRowSelectEventDetail;

  constructor(detail: WaRowSelectEventDetail) {
    super('wa-row-select', { bubbles: true, cancelable: false, composed: true });
    this.detail = detail;
  }
}

interface WaRowSelectEventDetail {
  selectedKeys: (string | number)[];
  selectedRows: Record<string, unknown>[];
}

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-row-select': WaRowSelectEvent;
  }
}
