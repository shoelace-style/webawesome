export type WaAfterShowEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-after-show': WaAfterShowEvent;
  }
}
