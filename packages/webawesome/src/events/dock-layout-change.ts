import type { DockPanelNode } from '../components/dock-panel/dock-panel.ts';

export type WaDockLayoutChangeEvent = CustomEvent<{ layout: DockPanelNode }>;

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-dock-layout-change': WaDockLayoutChangeEvent;
  }
}
