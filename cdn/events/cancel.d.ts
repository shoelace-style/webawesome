export declare class WaCancelEvent extends Event {
    constructor();
}
declare global {
    interface GlobalEventHandlersEventMap {
        'wa-cancel': WaCancelEvent;
    }
}
