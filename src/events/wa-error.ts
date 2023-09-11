export type WaErrorEvent = CustomEvent<{ status?: number }>;

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-error': WaErrorEvent;
  }
}
