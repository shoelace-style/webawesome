export type WaTabShowEvent = CustomEvent<{ name: string }>;

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-tab-show': WaTabShowEvent;
  }
}
