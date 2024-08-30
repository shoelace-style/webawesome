export declare class WaResizeEvent extends Event {
    readonly detail: WaResizeEventDetail;
    constructor(detail: WaResizeEventDetail);
}
interface WaResizeEventDetail {
    entries: ResizeObserverEntry[];
}
declare global {
    interface GlobalEventHandlersEventMap {
        'wa-resize': WaResizeEvent;
    }
}
export {};
