export type WaAfterCollapseEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-after-collapse': WaAfterCollapseEvent;
  }
}
