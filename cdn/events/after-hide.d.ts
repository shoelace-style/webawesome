export declare class WaAfterHideEvent extends Event {
    constructor();
}
declare global {
    interface GlobalEventHandlersEventMap {
        'wa-after-hide': WaAfterHideEvent;
    }
}
