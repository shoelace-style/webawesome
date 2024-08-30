export declare class WaChangeEvent extends Event {
    constructor();
}
declare global {
    interface GlobalEventHandlersEventMap {
        'wa-change': WaChangeEvent;
    }
}
