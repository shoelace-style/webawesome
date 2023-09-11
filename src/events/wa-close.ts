export type WaCloseEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-close': WaCloseEvent;
  }
}
