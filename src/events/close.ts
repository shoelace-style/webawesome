export class WaCloseEvent extends Event {
  constructor() {
    super('wa-close', { bubbles: true, cancelable: false, composed: true });
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-close': WaCloseEvent;
  }
}
