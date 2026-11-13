export class WaRowCollapseEvent extends Event {
  readonly detail: WaRowCollapseEventDetail;

  constructor(detail: WaRowCollapseEventDetail) {
    super('wa-row-collapse', { bubbles: true, cancelable: false, composed: true });
    this.detail = detail;
  }
}

interface WaRowCollapseEventDetail {
  row: Record<string, unknown>;
}

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-row-collapse': WaRowCollapseEvent;
  }
}
