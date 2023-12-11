import type WaMenuItem from '../components/menu-item/menu-item.js';

export type WaSelectEvent = CustomEvent<{ item: WaMenuItem }>;

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-select': WaSelectEvent;
  }
}
