export declare class WaIncludeErrorEvent extends Event {
    readonly detail: WaIncludeErrorDetail;
    constructor(detail: WaIncludeErrorDetail);
}
interface WaIncludeErrorDetail {
    status: number;
}
declare global {
    interface GlobalEventHandlersEventMap {
        'wa-include-error': WaIncludeErrorEvent;
    }
}
export {};
