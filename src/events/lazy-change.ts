export class WaLazyChangeEvent extends Event {
  constructor() {
    super('wa-lazy-change', { bubbles: true, cancelable: false, composed: true });
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-lazy-change': WaLazyChangeEvent;
  }
}
