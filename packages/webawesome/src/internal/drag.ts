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
export function drag(container: HTMLElement, options?: Partial<DragOptions>) {
  function move(pointerEvent: PointerEvent) {
    const dims = container.getBoundingClientRect();
    const defaultView = container.ownerDocument.defaultView!;
    const offsetX = dims.left + defaultView.pageXOffset;
    const offsetY = dims.top + defaultView.pageYOffset;
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

const supportsTouch = typeof window !== 'undefined' && 'ontouchstart' in window;

/**
 * Attaches the necessary events to make an element draggable.
 *
 * This by itself will not make the element draggable, but it provides the events and callbacks necessary to facilitate
 * dragging. Use the `clientX` and `clientY` arguments of each callback to update the UI as desired when dragging.
 *
 * Drag functionality will be enabled as soon as the constructor is called. A `start()` and `stop()` method can be used
 * to start and stop it, if needed.
 *
 * @usage
 *
 * const draggable = new DraggableElement(element, {
 *   start: (clientX, clientY) => { ... },
 *   move: (clientX, clientY) => { ... },
 *   stop: (clientX, clientY) => { ... }
 * });
 */
export class DraggableElement {
  private element: Element;
  private isActive = false;
  private isDragging = false;
  private options: DraggableElementOptions;

  constructor(el: Element, options: Partial<DraggableElementOptions>) {
    this.element = el;
    this.options = {
      start: () => undefined,
      stop: () => undefined,
      move: () => undefined,
      ...options,
    };

    this.start();
  }

  private handleDragStart = (event: PointerEvent | TouchEvent) => {
    const clientX = supportsTouch && 'touches' in event ? event.touches[0].clientX : (event as PointerEvent).clientX;
    const clientY = supportsTouch && 'touches' in event ? event.touches[0].clientY : (event as PointerEvent).clientY;

    // Prevent scrolling while dragging
    event.preventDefault();

    if (
      this.isDragging ||
      // Prevent right-clicks from triggering drags
      (!supportsTouch && (event as PointerEvent).buttons > 1)
    ) {
      return;
    }

    this.isDragging = true;

    document.addEventListener('pointerup', this.handleDragStop);
    document.addEventListener('pointermove', this.handleDragMove);
    document.addEventListener('touchend', this.handleDragStop);
    document.addEventListener('touchmove', this.handleDragMove);
    this.options.start(clientX, clientY);
  };

  private handleDragStop = (event: PointerEvent | TouchEvent) => {
    const clientX = supportsTouch && 'touches' in event ? event.touches[0].clientX : (event as PointerEvent).clientX;
    const clientY = supportsTouch && 'touches' in event ? event.touches[0].clientY : (event as PointerEvent).clientY;

    this.isDragging = false;
    document.removeEventListener('pointerup', this.handleDragStop);
    document.removeEventListener('pointermove', this.handleDragMove);
    document.removeEventListener('touchend', this.handleDragStop);
    document.removeEventListener('touchmove', this.handleDragMove);
    this.options.stop(clientX, clientY);
  };

  private handleDragMove = (event: PointerEvent | TouchEvent) => {
    const clientX = supportsTouch && 'touches' in event ? event.touches[0].clientX : (event as PointerEvent).clientX;
    const clientY = supportsTouch && 'touches' in event ? event.touches[0].clientY : (event as PointerEvent).clientY;

    // Prevent text selection while dragging
    window.getSelection()?.removeAllRanges();

    this.options.move(clientX, clientY);
  };

  /** Start listening to drags. */
  public start() {
    if (!this.isActive) {
      this.element.addEventListener('pointerdown', this.handleDragStart);
      if (supportsTouch) {
        this.element.addEventListener('touchstart', this.handleDragStart);
      }
      this.isActive = true;
    }
  }

  /** Stop listening to drags. */
  public stop() {
    document.removeEventListener('pointerup', this.handleDragStop);
    document.removeEventListener('pointermove', this.handleDragMove);
    document.removeEventListener('touchend', this.handleDragStop);
    document.removeEventListener('touchmove', this.handleDragMove);
    this.element.removeEventListener('pointerdown', this.handleDragStart);
    if (supportsTouch) {
      this.element.removeEventListener('touchstart', this.handleDragStart);
    }
    this.isActive = false;
    this.isDragging = false;
  }

  /** Starts or stops the drag listeners. */
  public toggle(isActive?: boolean) {
    const isGoingToBeActive = isActive !== undefined ? isActive : !this.isActive;

    if (isGoingToBeActive) {
      this.start();
    } else {
      this.stop();
    }
  }
}

export interface DraggableElementOptions {
  /** Runs when dragging starts. */
  start: (clientX: number, clientY: number) => void;
  /** Runs as the user is dragging. This may execute often, so avoid expensive operations. */
  move: (clientX: number, clientY: number) => void;
  /** Runs when dragging ends. */
  stop: (clientX: number, clientY: number) => void;
}
