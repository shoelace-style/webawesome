export class WaFocusDayEvent extends Event {
  readonly detail: WaFocusDayEventDetail;

  constructor(detail: WaFocusDayEventDetail) {
    super('wa-focus-day', { bubbles: true, cancelable: false, composed: true });
    this.detail = detail;
  }
}

interface WaFocusDayEventDetail {
  date: Date;
}

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-focus-day': WaFocusDayEvent;
  }
}
