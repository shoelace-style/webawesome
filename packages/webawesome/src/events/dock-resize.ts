export type WaDockResizeEvent = CustomEvent<{ parentId: string; sizes: number[] }>;

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-dock-resize': WaDockResizeEvent;
  }
}
