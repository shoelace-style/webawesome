export declare class WaStartEvent extends Event {
    constructor();
}
declare global {
    interface GlobalEventHandlersEventMap {
        'wa-start': WaStartEvent;
    }
}
