export class WaTabHideEvent extends Event {
  readonly detail: WaTabHideEventDetail;

  constructor(detail: WaTabHideEventDetail) {
    super('wa-tab-hide', { bubbles: true, cancelable: false, composed: true });
    this.detail = detail;
  }
}

interface WaTabHideEventDetail {
  name: string;
}

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-tab-hide': WaTabHideEvent;
  }
}
