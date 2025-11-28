import type { DropZone } from '../components/dock-panel/dock-panel.ts';

export type WaDockTabMoveEvent = CustomEvent<{
  tabId: string;
  sourcePanelId: string;
  targetPanelId: string;
  dropZone: DropZone;
}>;

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-dock-tab-move': WaDockTabMoveEvent;
  }
}
