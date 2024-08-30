export declare class WaBlurEvent extends Event {
    constructor();
}
declare global {
    interface GlobalEventHandlersEventMap {
        'wa-blur': WaBlurEvent;
    }
}
