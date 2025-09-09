/** Emitted when an element's intersection state changes. */
export class WaIntersectEvent extends Event {
  readonly detail?: WaIntersectEventDetail;

  constructor(detail?: WaIntersectEventDetail) {
    super('wa-intersect', { bubbles: false, cancelable: false, composed: true });
    this.detail = detail;
  }
}

interface WaIntersectEventDetail {
  entry?: IntersectionObserverEntry;
}

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-intersect': WaIntersectEvent;
  }
}
