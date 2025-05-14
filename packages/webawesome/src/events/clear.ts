export class WaClearEvent extends Event {
  constructor() {
    super('wa-clear', { bubbles: true, cancelable: false, composed: true });
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-clear': WaClearEvent;
  }
}
