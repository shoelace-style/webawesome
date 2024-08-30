export declare class WaLoadEvent extends Event {
    constructor();
}
declare global {
    interface GlobalEventHandlersEventMap {
        'wa-load': WaLoadEvent;
    }
}
