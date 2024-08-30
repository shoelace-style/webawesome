export declare class WaExpandEvent extends Event {
    constructor();
}
declare global {
    interface GlobalEventHandlersEventMap {
        'wa-expand': WaExpandEvent;
    }
}
