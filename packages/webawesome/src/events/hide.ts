export class WaHideEvent extends Event {
  readonly detail: WaHideEventDetails | undefined;

  constructor(detail?: WaHideEventDetails, { cancelable = true }: { cancelable?: boolean } = {}) {
    super('wa-hide', { bubbles: true, cancelable, composed: true });
    this.detail = detail;
  }
}

interface WaHideEventDetails {
  source: Element;
}

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-hide': WaHideEvent;
  }
}
