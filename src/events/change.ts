export class WaChangeEvent extends Event {
  constructor() {
    super('wa-change', { bubbles: true, cancelable: false, composed: true });
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-change': WaChangeEvent;
  }
}
