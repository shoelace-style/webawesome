interface DragOptions {
    /** Callback that runs as dragging occurs. */
    onMove: (x: number, y: number) => void;
    /** Callback that runs when dragging stops. */
    onStop: () => void;
    /**
     * When an initial event is passed, the first drag will be triggered immediately using the coordinates therein. This
     * is useful when the drag is initiated by a mousedown/touchstart event but you want the initial "click" to activate
     * a drag (e.g. positioning a handle initially at the click target).
     */
    initialEvent: PointerEvent;
}
/** Begins listening for dragging. */
export declare function drag(container: HTMLElement, options?: Partial<DragOptions>): void;
export {};
