export class WaBeforePageChangeEvent extends Event {
  readonly detail: WaBeforePageChangeEventDetail;

  constructor(detail: WaBeforePageChangeEventDetail) {
    super('wa-before-page-change', { bubbles: true, cancelable: true, composed: true });
    this.detail = detail;
  }
}

interface WaBeforePageChangeEventDetail {
  /** The page that will become active if the event isn't canceled. */
  page: number;
  /** The current page size. */
  pageSize: number;
}

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-before-page-change': WaBeforePageChangeEvent;
  }
}
