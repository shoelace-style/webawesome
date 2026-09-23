/**
 * Returns an element's offset relative to its parent. Similar to element.offsetTop and element.offsetLeft, except the
 * parent doesn't have to be positioned relative or absolute.
 *
 * NOTE: This was created to work around what appears to be a bug in Chrome where a slotted element's offsetParent seems
 * to ignore elements inside the surrounding shadow DOM: https://bugs.chromium.org/p/chromium/issues/detail?id=920069
 */
export function getOffset(element: HTMLElement, parent: HTMLElement) {
  return {
    top: Math.round(element.getBoundingClientRect().top - parent.getBoundingClientRect().top),
    left: Math.round(element.getBoundingClientRect().left - parent.getBoundingClientRect().left),
  };
}

/** Returns true when a mouse or pointer event's coordinates fall within the element's border box. */
export function isEventInsideRect(event: MouseEvent, el: Element) {
  const rect = el.getBoundingClientRect();
  return (
    event.clientX >= rect.left &&
    event.clientX <= rect.right &&
    event.clientY >= rect.top &&
    event.clientY <= rect.bottom
  );
}
