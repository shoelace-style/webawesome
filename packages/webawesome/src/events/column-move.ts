export class WaColumnMoveEvent extends Event {
  readonly detail: WaColumnMoveEventDetail;

  constructor(detail: WaColumnMoveEventDetail) {
    super('wa-column-move', { bubbles: true, cancelable: false, composed: true });
    this.detail = detail;
  }
}

interface WaColumnMoveEventDetail {
  /** The id of the column being moved. */
  column: string;
  /** The column's new index in the display order. */
  toIndex: number;
  /** The full new column order, as an array of column ids. */
  columnOrder: string[];
  /** `false` during a live drag; `true` once the drag (or keyboard move) settles. Persist on `true`. */
  finished: boolean;
}

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-column-move': WaColumnMoveEvent;
  }
}
