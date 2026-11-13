export class WaSortChangeEvent extends Event {
  readonly detail: WaSortChangeEventDetail;

  constructor(detail: WaSortChangeEventDetail) {
    super('wa-sort-change', { bubbles: true, cancelable: false, composed: true });
    this.detail = detail;
  }
}

interface WaSortChangeEventDetail {
  sort: { id: string; desc: boolean }[];
}

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-sort-change': WaSortChangeEvent;
  }
}
