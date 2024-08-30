export declare class WaTabShowEvent extends Event {
    readonly detail: WaTabShowEventDetail;
    constructor(detail: WaTabShowEventDetail);
}
interface WaTabShowEventDetail {
    name: string;
}
declare global {
    interface GlobalEventHandlersEventMap {
        'wa-tab-show': WaTabShowEvent;
    }
}
export {};
