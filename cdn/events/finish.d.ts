export declare class WaFinishEvent extends Event {
    constructor();
}
declare global {
    interface GlobalEventHandlersEventMap {
        'wa-finish': WaFinishEvent;
    }
}
