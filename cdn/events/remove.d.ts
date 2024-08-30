export declare class WaRemoveEvent extends Event {
    constructor();
}
declare global {
    interface GlobalEventHandlersEventMap {
        'wa-remove': WaRemoveEvent;
    }
}
