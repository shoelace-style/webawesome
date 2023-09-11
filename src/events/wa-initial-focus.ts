export type WaInitialFocusEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-initial-focus': WaInitialFocusEvent;
  }
}
