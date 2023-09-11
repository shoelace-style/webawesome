export type WaTabHideEvent = CustomEvent<{ name: string }>;

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-tab-hide': WaTabHideEvent;
  }
}
