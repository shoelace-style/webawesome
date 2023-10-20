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
export function drag(container, options) {
  /**
   * @param {PointerEvent} pointerEvent
   */
  function move(pointerEvent) {
    const dims = container.getBoundingClientRect();
    const defaultView = container.ownerDocument.defaultView;
    const offsetX = dims.left + (defaultView?.pageXOffset || 0);
    const offsetY = dims.top + (defaultView?.pageYOffset || 0);
    const x = pointerEvent.pageX - offsetX;
    const y = pointerEvent.pageY - offsetY;

    if (options?.onMove) {
      options.onMove(x, y);
    }
  }

  function stop() {
    document.removeEventListener('pointermove', move);
    document.removeEventListener('pointerup', stop);

    if (options?.onStop) {
      options.onStop();
    }
  }

  document.addEventListener('pointermove', move, { passive: true });
  document.addEventListener('pointerup', stop);

  // If an initial event is set, trigger the first drag immediately
  if (options?.initialEvent instanceof PointerEvent) {
    move(options.initialEvent);
  }
}

