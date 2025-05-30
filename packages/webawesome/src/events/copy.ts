export class WaCopyEvent extends Event {
  readonly detail: WaCopyErrorEventDetail;
  constructor(detail: WaCopyErrorEventDetail) {
    super('wa-copy', { bubbles: true, cancelable: false, composed: true });
    this.detail = detail;
  }
}

interface WaCopyErrorEventDetail {
  /** The value  that occurred while copying. */
  value: string;
}

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-copy': WaCopyEvent;
  }
}
