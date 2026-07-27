export class WaCompleteEvent extends Event {
  constructor() {
    super('wa-complete', { bubbles: true, cancelable: true, composed: true });
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-complete': WaCompleteEvent;
  }
}
