export declare class WaInputEvent extends Event {
    constructor();
}
declare global {
    interface GlobalEventHandlersEventMap {
        'wa-input': WaInputEvent;
    }
}
