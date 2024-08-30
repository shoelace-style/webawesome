export declare class WaRepositionEvent extends Event {
    constructor();
}
declare global {
    interface GlobalEventHandlersEventMap {
        'wa-reposition': WaRepositionEvent;
    }
}
