export class WaSelectEvent extends Event {
  readonly detail;

  constructor(detail: WaSelectEventDetail) {
    super('wa-select', { bubbles: true, cancelable: false, composed: true });
    this.detail = detail;
  }
}

interface WaSelectEventDetail {
  item: Element;
}

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-select': WaSelectEvent;
  }
}
