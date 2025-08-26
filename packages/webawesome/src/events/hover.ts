interface WaHoverEventDetail {
  phase: 'start' | 'move' | 'end';
  value: number;
}

export class WaHoverEvent extends Event {
  readonly detail: WaHoverEventDetail;

  constructor(detail: WaHoverEventDetail) {
    super('wa-hover', { bubbles: true, cancelable: false, composed: true });
    this.detail = detail;
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-hover': WaHoverEvent;
  }
}
