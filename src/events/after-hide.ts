export class WaAfterHideEvent extends Event {
  constructor() {
    super('wa-after-hide', { bubbles: true, cancelable: false, composed: true });
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-after-hide': WaAfterHideEvent;
  }
}
