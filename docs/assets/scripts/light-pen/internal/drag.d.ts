/**
 * @typedef {object} DragOptions
 * @property {(x: number, y: number) => void} onMove - Callback that runs as dragging occurs.
 * @property {() => void} onStop - Callback that runs when dragging stops.
 * @property {PointerEvent} initialEvent - When an initial event is passed, the first drag will be triggered immediately using the coordinates therein. This is useful when the drag is initiated by a mousedown/touchstart event but you want the initial "click" to activate a drag (e.g. resizePositioning a handle initially at the click target).
 */
/**
 * @param {HTMLElement} container
 * @param {Partial<DragOptions>} [options]

 */
export function drag(container: HTMLElement, options?: Partial<DragOptions> | undefined): void;
export type DragOptions = {
    /**
     * - Callback that runs as dragging occurs.
     */
    onMove: (x: number, y: number) => void;
    /**
     * - Callback that runs when dragging stops.
     */
    onStop: () => void;
    /**
     * - When an initial event is passed, the first drag will be triggered immediately using the coordinates therein. This is useful when the drag is initiated by a mousedown/touchstart event but you want the initial "click" to activate a drag (e.g. resizePositioning a handle initially at the click target).
     */
    initialEvent: PointerEvent;
};
