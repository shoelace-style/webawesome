export class WaResizeEvent extends Event {
  readonly detail: WaResizeEventDetail;

  constructor(detail: WaResizeEventDetail) {
    super('wa-resize', { bubbles: true, cancelable: false, composed: true });
    this.detail = detail;
  }
}

interface WaResizeEventDetail {
  entries: ResizeObserverEntry[];
}

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-resize': WaResizeEvent;
  }
}
