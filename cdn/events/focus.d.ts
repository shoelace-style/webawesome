export declare class WaFocusEvent extends Event {
    constructor();
}
declare global {
    interface GlobalEventHandlersEventMap {
        'wa-focus': WaFocusEvent;
    }
}
