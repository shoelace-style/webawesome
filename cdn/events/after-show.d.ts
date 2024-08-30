export declare class WaAfterShowEvent extends Event {
    constructor();
}
declare global {
    interface GlobalEventHandlersEventMap {
        'wa-after-show': WaAfterShowEvent;
    }
}
