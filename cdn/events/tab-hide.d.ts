export declare class WaTabHideEvent extends Event {
    readonly detail: WaTabHideEventDetail;
    constructor(detail: WaTabHideEventDetail);
}
interface WaTabHideEventDetail {
    name: string;
}
declare global {
    interface GlobalEventHandlersEventMap {
        'wa-tab-hide': WaTabHideEvent;
    }
}
export {};
