export type WaRequestCloseEvent = CustomEvent<{ source: 'close-button' | 'keyboard' | 'overlay' }>;

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-request-close': WaRequestCloseEvent;
  }
}
