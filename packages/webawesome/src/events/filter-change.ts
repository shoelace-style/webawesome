export class WaFilterChangeEvent extends Event {
  readonly detail: WaFilterChangeEventDetail;

  constructor(detail: WaFilterChangeEventDetail) {
    super('wa-filter-change', { bubbles: true, cancelable: false, composed: true });
    this.detail = detail;
  }
}

interface WaFilterChangeEventDetail {
  search: string;
  filters: { id: string; value: unknown }[];
}

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-filter-change': WaFilterChangeEvent;
  }
}
