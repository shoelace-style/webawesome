export class WaCollapseEvent extends Event {
  constructor() {
    super('wa-collapse', { bubbles: true, cancelable: false, composed: true });
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-collapse': WaCollapseEvent;
  }
}
