export declare class WaClearEvent extends Event {
    constructor();
}
declare global {
    interface GlobalEventHandlersEventMap {
        'wa-clear': WaClearEvent;
    }
}
