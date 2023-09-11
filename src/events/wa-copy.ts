export type WaCopyEvent = CustomEvent<{ value: string }>;

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-copy': WaCopyEvent;
  }
}
