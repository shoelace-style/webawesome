export type WaLazyChangeEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-lazy-change': WaLazyChangeEvent;
  }
}
