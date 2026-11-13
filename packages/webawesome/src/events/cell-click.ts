export class WaCellClickEvent extends Event {
  readonly detail: WaCellClickEventDetail;

  constructor(detail: WaCellClickEventDetail) {
    super('wa-cell-click', { bubbles: true, cancelable: false, composed: true });
    this.detail = detail;
  }
}

interface WaCellClickEventDetail {
  /** The id of the clicked cell's column. */
  column: string;
  /** The cell's accessor value. */
  value: unknown;
  /** The row object the cell belongs to. */
  row: Record<string, unknown>;
  /** The row's display index (post sort, filter, and pagination). */
  rowIndex: number;
}

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-cell-click': WaCellClickEvent;
  }
}
