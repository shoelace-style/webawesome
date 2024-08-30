export declare class WaErrorEvent extends Event {
    constructor();
}
declare global {
    interface GlobalEventHandlersEventMap {
        'wa-error': WaErrorEvent;
    }
}
