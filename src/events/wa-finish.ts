export type WaFinishEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-finish': WaFinishEvent;
  }
}
