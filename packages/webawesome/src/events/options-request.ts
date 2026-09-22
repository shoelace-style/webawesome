export class WaOptionsRequestEvent extends Event {
  readonly detail: WaOptionsRequestEventDetail;

  constructor(detail: WaOptionsRequestEventDetail) {
    super('wa-options-request', { bubbles: true, cancelable: false, composed: true });
    this.detail = detail;
  }
}

interface WaOptionsRequestEventDetail {
  /** The text the user has typed since opening. Empty on open and on `reload()` when closed. */
  query: string;
  /** Aborts when the request is superseded, or when the listbox closes or the control is disabled or disconnected. */
  signal: AbortSignal;
}

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-options-request': WaOptionsRequestEvent;
  }
}
