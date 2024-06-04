export class WaExpandEvent extends Event {
  constructor() {
    super('wa-expand', { bubbles: true, cancelable: false, composed: true });
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-expand': WaExpandEvent;
  }
}
