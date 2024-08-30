export declare class WaHideEvent extends Event {
    readonly detail: WaHideEventDetails | undefined;
    constructor(detail?: WaHideEventDetails);
}
interface WaHideEventDetails {
    source: Element;
}
declare global {
    interface GlobalEventHandlersEventMap {
        'wa-hide': WaHideEvent;
    }
}
export {};
