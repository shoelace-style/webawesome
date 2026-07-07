export class WaContentChangeEvent extends Event {
  readonly detail: WaContentChangeEventDetails;

  constructor(detail: WaContentChangeEventDetails) {
    super('wa-content-change', { bubbles: true, cancelable: false, composed: true });
    this.detail = detail;
  }
}

interface WaContentChangeEventDetails {
  /** The elements currently shown after the selection. */
  items: Element[];
}

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-content-change': WaContentChangeEvent;
  }
}
