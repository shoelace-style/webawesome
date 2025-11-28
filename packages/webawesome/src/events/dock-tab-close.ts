export type WaDockTabCloseEvent = CustomEvent<{ panelId: string; tabId: string }>;

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-dock-tab-close': WaDockTabCloseEvent;
  }
}
