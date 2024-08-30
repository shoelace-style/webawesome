/**
 * Wait until an element has stopped scrolling
 * This considers the element to have stopped scrolling, as soon as it did not change its
 * scroll position for 20 successive animation frames
 * @param {HTMLElement} element - The element which is scrolled
 * @param {numeric} timeoutInMs - A timeout in ms. If the timeout has elapsed, the promise rejects
 * @returns A promise which resolves after the scrolling has stopped
 */
export declare const waitForScrollingToEnd: (element: Element, timeoutInMs?: number) => Promise<void>;
