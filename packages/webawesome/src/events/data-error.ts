export class WaDataErrorEvent extends Event {
  readonly detail: WaDataErrorEventDetail;

  constructor(detail: WaDataErrorEventDetail) {
    super('wa-data-error', { bubbles: true, cancelable: false, composed: true });
    this.detail = detail;
  }
}

interface WaDataErrorEventDetail {
  /** The error the data source rejected with. */
  error: unknown;
  /** The request that failed (without its abort signal). */
  request: {
    sort: { id: string; desc: boolean }[];
    filters: { id: string; value: unknown }[];
    search: string;
    page: number;
    pageSize: number;
  };
}

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-data-error': WaDataErrorEvent;
  }
}
