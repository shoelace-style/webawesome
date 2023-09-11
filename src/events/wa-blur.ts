export type WaBlurEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-blur': WaBlurEvent;
  }
}
