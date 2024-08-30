import type WaTreeItem from '../components/tree-item/tree-item.js';
export declare class WaSelectionChangeEvent extends Event {
    readonly detail: WaSelectionChangeEventDetail;
    constructor(detail: WaSelectionChangeEventDetail);
}
interface WaSelectionChangeEventDetail {
    selection: WaTreeItem[];
}
declare global {
    interface GlobalEventHandlersEventMap {
        'wa-selection-change': WaSelectionChangeEvent;
    }
}
export {};
