export class WaRemoveEvent extends Event {
  constructor() {
    super('wa-remove', { bubbles: true, cancelable: false, composed: true });
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-remove': WaRemoveEvent;
  }
}
