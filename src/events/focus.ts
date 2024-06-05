export class WaFocusEvent extends Event {
  constructor() {
    super('wa-focus', { bubbles: true, cancelable: false, composed: true });
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-focus': WaFocusEvent;
  }
}
