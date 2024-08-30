export declare class WaAfterCollapseEvent extends Event {
    constructor();
}
declare global {
    interface GlobalEventHandlersEventMap {
        'wa-after-collapse': WaAfterCollapseEvent;
    }
}
