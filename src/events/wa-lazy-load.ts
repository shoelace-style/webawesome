export type WaLazyLoadEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-lazy-load': WaLazyLoadEvent;
  }
}
