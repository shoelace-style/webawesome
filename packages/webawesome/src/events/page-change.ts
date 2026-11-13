export class WaPageChangeEvent extends Event {
  readonly detail: WaPageChangeEventDetail;

  constructor(detail: WaPageChangeEventDetail) {
    super('wa-page-change', { bubbles: true, cancelable: false, composed: true });
    this.detail = detail;
  }
}

interface WaPageChangeEventDetail {
  page: number;
  pageSize: number;
}

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-page-change': WaPageChangeEvent;
  }
}
