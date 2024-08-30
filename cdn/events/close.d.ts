export declare class WaCloseEvent extends Event {
    constructor();
}
declare global {
    interface GlobalEventHandlersEventMap {
        'wa-close': WaCloseEvent;
    }
}
