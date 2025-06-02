export class WaShowEvent extends Event {
  constructor() {
    super('wa-show', { bubbles: true, cancelable: true, composed: true });
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-show': WaShowEvent;
  }
}
