import type { ReactiveController, ReactiveElement } from 'lit';
interface ScrollHost extends ReactiveElement {
    scrollContainer: HTMLElement;
}
/**
 * A controller for handling scrolling and mouse dragging.
 */
export declare class ScrollController<T extends ScrollHost> implements ReactiveController {
    private host;
    dragging: boolean;
    scrolling: boolean;
    mouseDragging: boolean;
    constructor(host: T);
    hostConnected(): Promise<void>;
    hostDisconnected(): void;
    handleScroll: () => void;
    handleScrollEnd: () => void;
    handlePointerDown: (event: PointerEvent) => void;
    handlePointerMove: (event: PointerEvent) => void;
    handlePointerUp: (event: PointerEvent) => void;
    handleDragStart(): void;
    handleDrag(event: PointerEvent): void;
    handleDragEnd(): void;
}
export {};
