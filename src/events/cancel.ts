export class WaCancelEvent extends Event {
  constructor() {
    super('wa-cancel', { bubbles: true, cancelable: false, composed: true });
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-cancel': WaCancelEvent;
  }
}
