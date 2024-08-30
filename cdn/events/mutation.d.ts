export declare class WaMutationEvent extends Event {
    readonly detail: WaMutationEventDetail;
    constructor(detail: WaMutationEventDetail);
}
interface WaMutationEventDetail {
    mutationList: MutationRecord[];
}
declare global {
    interface GlobalEventHandlersEventMap {
        'wa-mutation': WaMutationEvent;
    }
}
export {};
