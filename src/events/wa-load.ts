export type WaLoadEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-load': WaLoadEvent;
  }
}
