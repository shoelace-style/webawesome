export class WaLazyLoadEvent extends Event {
  constructor() {
    super('wa-lazy-load', { bubbles: true, cancelable: false, composed: true });
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-lazy-load': WaLazyLoadEvent;
  }
}
