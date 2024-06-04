export class WaFinishEvent extends Event {
  constructor() {
    super('wa-finish', { bubbles: true, cancelable: false, composed: true });
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-finish': WaFinishEvent;
  }
}
