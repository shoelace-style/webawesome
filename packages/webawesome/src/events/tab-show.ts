export class WaTabShowEvent extends Event {
  readonly detail: WaTabShowEventDetail;

  constructor(detail: WaTabShowEventDetail) {
    super('wa-tab-show', { bubbles: true, cancelable: false, composed: true });
    this.detail = detail;
  }
}

interface WaTabShowEventDetail {
  name: string;
}

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-tab-show': WaTabShowEvent;
  }
}
