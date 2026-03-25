export class WaCreateEvent extends Event {
  readonly detail;

  constructor(detail: WaCreateEventDetail) {
    super('wa-create', { bubbles: true, cancelable: true, composed: true });
    this.detail = detail;
  }
}

export interface WaCreateEventDetail {
  inputValue: string;
}

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-create': WaCreateEvent;
  }
}
