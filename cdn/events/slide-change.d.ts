import type WaCarouselItem from '../components/carousel-item/carousel-item.js';
export declare class WaSlideChangeEvent extends Event {
    readonly detail: WaSlideChangeEventDetails;
    constructor(detail: WaSlideChangeEventDetails);
}
interface WaSlideChangeEventDetails {
    index: number;
    slide: WaCarouselItem;
}
declare global {
    interface GlobalEventHandlersEventMap {
        'wa-slide-change': WaSlideChangeEvent;
    }
}
export {};
