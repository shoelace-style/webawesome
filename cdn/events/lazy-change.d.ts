export declare class WaLazyChangeEvent extends Event {
    constructor();
}
declare global {
    interface GlobalEventHandlersEventMap {
        'wa-lazy-change': WaLazyChangeEvent;
    }
}
