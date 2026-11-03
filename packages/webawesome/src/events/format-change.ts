export class WaFormatChangeEvent extends Event {
  constructor() {
    super('wa-format-change', { bubbles: true, cancelable: false, composed: true });
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-format-change': WaFormatChangeEvent;
  }
}
