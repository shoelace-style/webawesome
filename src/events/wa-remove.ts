export type WaRemoveEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-remove': WaRemoveEvent;
  }
}
