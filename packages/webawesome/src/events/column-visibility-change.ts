export class WaColumnVisibilityChangeEvent extends Event {
  readonly detail: WaColumnVisibilityChangeEventDetail;

  constructor(detail: WaColumnVisibilityChangeEventDetail) {
    super('wa-column-visibility-change', { bubbles: true, cancelable: false, composed: true });
    this.detail = detail;
  }
}

interface WaColumnVisibilityChangeEventDetail {
  /** The id of the column whose visibility changed. */
  column: string;
  /** Whether the column is now visible. */
  visible: boolean;
}

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-column-visibility-change': WaColumnVisibilityChangeEvent;
  }
}
