export class WaInvalidEvent extends Event {
  constructor() {
    super('wa-invalid', { bubbles: true, cancelable: false, composed: true });
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-invalid': WaInvalidEvent;
  }
}
