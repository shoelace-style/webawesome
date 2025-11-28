export type WaDockTabShowEvent = CustomEvent<{ panelId: string; tabId: string }>;

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-dock-tab-show': WaDockTabShowEvent;
  }
}
