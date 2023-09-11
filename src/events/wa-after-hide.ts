export type WaAfterHideEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-after-hide': WaAfterHideEvent;
  }
}
