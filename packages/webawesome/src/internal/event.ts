/** Waits for a specific event to be emitted from an element. Ignores events that bubble up from child elements. */
export function waitForEvent(el: HTMLElement, eventName: string) {
  return new Promise<void>(resolve => {
    function done(event: Event) {
      if (event.target === el) {
        el.removeEventListener(eventName, done);
        resolve();
      }
    }

    el.addEventListener(eventName, done);
  });
}

export function getTargetElement(event: Event) {
  if (event.target instanceof Node) {
    switch (event.target.nodeType) {
      case Node.TEXT_NODE:
      case Node.COMMENT_NODE:
        return event.target.parentNode as Element;
      case Node.ELEMENT_NODE:
        return event.target as Element;
    }
  }

  return null;
}
