export class WaErrorEvent extends Event {
  constructor() {
    super('wa-error', { bubbles: true, cancelable: false, composed: true });
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-error': WaErrorEvent;
  }
}
