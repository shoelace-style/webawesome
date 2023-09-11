import type WaMenuItem from '../components/menu-item/menu-item';

export type WaSelectEvent = CustomEvent<{ item: WaMenuItem }>;

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-select': WaSelectEvent;
  }
}
