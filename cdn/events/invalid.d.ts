export declare class WaInvalidEvent extends Event {
    constructor();
}
declare global {
    interface GlobalEventHandlersEventMap {
        'wa-invalid': WaInvalidEvent;
    }
}
