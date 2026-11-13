export class WaCellContextmenuEvent extends Event {
  readonly detail: WaCellContextmenuEventDetail;

  constructor(detail: WaCellContextmenuEventDetail) {
    super('wa-cell-contextmenu', { bubbles: true, cancelable: true, composed: true });
    this.detail = detail;
  }
}

interface WaCellContextmenuEventDetail {
  /** The id of the cell's column. */
  column: string;
  /** The cell's accessor value. */
  value: unknown;
  /** The row object the cell belongs to. */
  row: Record<string, unknown>;
  /** The row's display index (post sort, filter, and pagination). */
  rowIndex: number;
  /** The originating event: a `PointerEvent` for right-clicks, a `KeyboardEvent` for Shift+F10 / the menu key. */
  originalEvent: Event;
}

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-cell-contextmenu': WaCellContextmenuEvent;
  }
}
