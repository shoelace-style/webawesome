export class WaAfterExpandEvent extends Event {
  constructor() {
    super('wa-after-expand', { bubbles: true, cancelable: false, composed: true });
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-after-expand': WaAfterExpandEvent;
  }
}
