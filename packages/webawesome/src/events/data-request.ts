export class WaDataRequestEvent extends Event {
  readonly detail: WaDataRequestEventDetail;

  constructor(detail: WaDataRequestEventDetail) {
    super('wa-data-request', { bubbles: true, cancelable: false, composed: true });
    this.detail = detail;
  }
}

interface WaDataRequestEventDetail {
  sort: { id: string; desc: boolean }[];
  filters: { id: string; value: unknown }[];
  search: string;
  page: number;
  pageSize: number;
  signal: AbortSignal;
}

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-data-request': WaDataRequestEvent;
  }
}
