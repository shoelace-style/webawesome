export class WaInputEvent extends Event {
  constructor() {
    super('wa-input', { bubbles: true, cancelable: false, composed: true });
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-input': WaInputEvent;
  }
}
