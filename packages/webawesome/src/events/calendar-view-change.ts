export class WaCalendarViewChangeEvent extends Event {
  readonly detail: WaCalendarViewChangeEventDetail;

  constructor(detail: WaCalendarViewChangeEventDetail) {
    super('wa-calendar-view-change', { bubbles: true, cancelable: false, composed: true });
    this.detail = detail;
  }
}

interface WaCalendarViewChangeEventDetail {
  view: 'days' | 'months' | 'years';
  date: Date;
}

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-calendar-view-change': WaCalendarViewChangeEvent;
  }
}
