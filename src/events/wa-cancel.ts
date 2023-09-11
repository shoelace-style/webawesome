export type WaCancelEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-cancel': WaCancelEvent;
  }
}
