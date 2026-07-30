export class WaRowExpandEvent extends Event {
  readonly detail: WaRowExpandEventDetail;

  constructor(detail: WaRowExpandEventDetail) {
    super('wa-row-expand', { bubbles: true, cancelable: false, composed: true });
    this.detail = detail;
  }
}

interface WaRowExpandEventDetail {
  row: Record<string, unknown>;
}

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-row-expand': WaRowExpandEvent;
  }
}
