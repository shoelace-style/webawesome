export class WaIncludeErrorEvent extends Event {
  readonly detail: WaIncludeErrorDetail;

  constructor(detail: WaIncludeErrorDetail) {
    super('wa-include-error', { bubbles: true, cancelable: false, composed: true });
    this.detail = detail;
  }
}

interface WaIncludeErrorDetail {
  status: number;
}

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-include-error': WaIncludeErrorEvent;
  }
}
