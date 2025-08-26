export class WaAfterShowEvent extends Event {
  constructor() {
    super('wa-after-show', { bubbles: true, cancelable: false, composed: true });
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-after-show': WaAfterShowEvent;
  }
}
