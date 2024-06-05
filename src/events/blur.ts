export class WaBlurEvent extends Event {
  constructor() {
    super('wa-blur', { bubbles: true, cancelable: false, composed: true });
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-blur': WaBlurEvent;
  }
}
