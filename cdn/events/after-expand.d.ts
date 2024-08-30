export declare class WaAfterExpandEvent extends Event {
    constructor();
}
declare global {
    interface GlobalEventHandlersEventMap {
        'wa-after-expand': WaAfterExpandEvent;
    }
}
