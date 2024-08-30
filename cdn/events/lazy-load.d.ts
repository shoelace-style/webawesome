export declare class WaLazyLoadEvent extends Event {
    constructor();
}
declare global {
    interface GlobalEventHandlersEventMap {
        'wa-lazy-load': WaLazyLoadEvent;
    }
}
