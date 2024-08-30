interface WaHoverEventDetail {
    phase: 'start' | 'move' | 'end';
    value: number;
}
export declare class WaHoverEvent extends Event {
    readonly detail: WaHoverEventDetail;
    constructor(detail: WaHoverEventDetail);
}
declare global {
    interface GlobalEventHandlersEventMap {
        'wa-hover': WaHoverEvent;
    }
}
export {};
