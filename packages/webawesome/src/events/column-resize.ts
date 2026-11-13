export class WaColumnResizeEvent extends Event {
  readonly detail: WaColumnResizeEventDetail;

  constructor(detail: WaColumnResizeEventDetail) {
    super('wa-column-resize', { bubbles: true, cancelable: false, composed: true });
    this.detail = detail;
  }
}

interface WaColumnResizeEventDetail {
  /** The id of the column being resized. */
  column: string;
  /** The column's new width in pixels. */
  width: number;
  /** `false` during a live drag; `true` once the drag (or keyboard resize) settles. Persist on `true`. */
  finished: boolean;
}

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-column-resize': WaColumnResizeEvent;
  }
}
