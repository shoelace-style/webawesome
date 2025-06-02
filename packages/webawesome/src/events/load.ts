export class WaLoadEvent extends Event {
  constructor() {
    super('wa-load', { bubbles: true, cancelable: false, composed: true });
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-load': WaLoadEvent;
  }
}
