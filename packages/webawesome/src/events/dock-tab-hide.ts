export type WaDockTabHideEvent = CustomEvent<{ panelId: string; tabId: string }>;

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-dock-tab-hide': WaDockTabHideEvent;
  }
}
