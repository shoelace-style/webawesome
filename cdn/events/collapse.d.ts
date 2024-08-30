export declare class WaCollapseEvent extends Event {
    constructor();
}
declare global {
    interface GlobalEventHandlersEventMap {
        'wa-collapse': WaCollapseEvent;
    }
}
