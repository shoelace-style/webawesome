export class WaSuggestionsErrorEvent extends Event {
  readonly detail: WaSuggestionsErrorEventDetail;

  constructor(detail: WaSuggestionsErrorEventDetail) {
    super('wa-suggestions-error', { bubbles: true, cancelable: false, composed: true });
    this.detail = detail;
  }
}

interface WaSuggestionsErrorEventDetail {
  /** The error the data source rejected with. */
  error: unknown;
  /** The request that failed (without its abort signal). */
  request: {
    /** The trigger character of the source that failed. */
    trigger: string;
    query: string;
  };
}

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-suggestions-error': WaSuggestionsErrorEvent;
  }
}
