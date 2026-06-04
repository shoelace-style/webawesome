export class WaViewChangeEvent extends Event {
  readonly detail: WaViewChangeEventDetail;

  constructor(detail: WaViewChangeEventDetail) {
    super('wa-view-change', { bubbles: true, cancelable: false, composed: true });
    this.detail = detail;
  }
}

interface WaViewChangeEventDetail {
  view: 'days' | 'months' | 'years';
  date: Date;
}

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-view-change': WaViewChangeEvent;
  }
}
