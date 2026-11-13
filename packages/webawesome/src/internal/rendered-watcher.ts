import { isServer } from 'lit';

/**
 * Watches an element and reports when it stops or starts generating layout boxes, e.g. when third-party CSS applies
 * "display: none" to it or an ancestor. A ResizeObserver signals changes and getClientRects() determines the state,
 * since it distinguishes "not rendered" from "rendered at zero size". Visibility and opacity never count as hidden.
 */
export class RenderedWatcher {
  private observer: ResizeObserver | undefined;
  private initialCheckHandle: number | undefined;

  constructor(
    private readonly element: HTMLElement,
    private readonly callback: (isRendered: boolean) => void,
  ) {}

  /**
   * Starts watching and reports the current state on the next frame. Additional targets also act as change signals,
   * e.g. an internal element that always has a non-zero box when rendered.
   */
  start(...additionalTargets: Element[]) {
    if (isServer) {
      return;
    }

    this.observer ??= new ResizeObserver(() => this.check());

    this.observer.observe(this.element);

    for (const target of additionalTargets) {
      this.observer.observe(target);
    }

    // ResizeObserver doesn't deliver an initial observation for elements that aren't rendered, so check once in case
    // the element is already hidden. Deferred to the next frame because a synchronous layout flush here, right after
    // showModal(), can hang Firefox and WebKit.
    this.initialCheckHandle ??= requestAnimationFrame(() => {
      this.initialCheckHandle = undefined;
      this.check();
    });
  }

  /** Stops watching. */
  stop() {
    if (this.initialCheckHandle !== undefined) {
      cancelAnimationFrame(this.initialCheckHandle);
      this.initialCheckHandle = undefined;
    }

    this.observer?.disconnect();
  }

  private check() {
    this.callback(this.element.getClientRects().length > 0);
  }
}
