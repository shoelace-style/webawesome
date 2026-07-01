export class WaCompleteEvent extends Event {
  constructor() {
    super('wa-complete', { bubbles: true, cancelable: false, composed: true });
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-complete': WaCompleteEvent;
  }
}
