export type WaAfterExpandEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-after-expand': WaAfterExpandEvent;
  }
}
