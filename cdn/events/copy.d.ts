export declare class WaCopyEvent extends Event {
    readonly detail: WaCopyErrorEventDetail;
    constructor(detail: WaCopyErrorEventDetail);
}
interface WaCopyErrorEventDetail {
    /** The value  that occurred while copying. */
    value: string;
}
declare global {
    interface GlobalEventHandlersEventMap {
        'wa-copy': WaCopyEvent;
    }
}
export {};
