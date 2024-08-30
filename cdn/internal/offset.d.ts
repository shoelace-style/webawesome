/**
 * Returns an element's offset relative to its parent. Similar to element.offsetTop and element.offsetLeft, except the
 * parent doesn't have to be positioned relative or absolute.
 *
 * NOTE: This was created to work around what appears to be a bug in Chrome where a slotted element's offsetParent seems
 * to ignore elements inside the surrounding shadow DOM: https://bugs.chromium.org/p/chromium/issues/detail?id=920069
 */
export declare function getOffset(element: HTMLElement, parent: HTMLElement): {
    top: number;
    left: number;
};
