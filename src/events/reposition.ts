export class WaRepositionEvent extends Event {
  constructor() {
    super('wa-reposition', { bubbles: true, cancelable: false, composed: true });
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-reposition': WaRepositionEvent;
  }
}
