export class WaStartEvent extends Event {
  constructor() {
    super('wa-start', { bubbles: true, cancelable: false, composed: true });
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-start': WaStartEvent;
  }
}
