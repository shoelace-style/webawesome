export declare class WaShowEvent extends Event {
    constructor();
}
declare global {
    interface GlobalEventHandlersEventMap {
        'wa-show': WaShowEvent;
    }
}
