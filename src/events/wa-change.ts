export type WaChangeEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-change': WaChangeEvent;
  }
}
