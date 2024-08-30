import type WaMenuItem from '../components/menu-item/menu-item.js';
export declare class WaSelectEvent extends Event {
    readonly detail: WaSelectEventDetail;
    constructor(detail: WaSelectEventDetail);
}
interface WaSelectEventDetail {
    item: WaMenuItem;
}
declare global {
    interface GlobalEventHandlersEventMap {
        'wa-select': WaSelectEvent;
    }
}
export {};
