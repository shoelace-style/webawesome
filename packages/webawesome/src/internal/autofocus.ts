import type { ReactiveElement } from 'lit';
import { isServer } from 'lit';
import { allDefined } from '../utilities/defined.js';

// Like a browser, autofocus at most once per document. The first focus, from an autofocus or anything else, ends it.
let isDone = false;

if (!isServer) {
  document.addEventListener('focusin', () => (isDone = true), { capture: true, once: true });
}

/**
 * Focuses an element that has the `autofocus` attribute, under the rules browsers apply to the attribute.
 *
 * Browsers apply `autofocus` early in the page load and skip an element that can't take focus yet. A component that
 * the autoloader defines after that point can be left unfocused. `WebAwesomeElement` calls this after a component's
 * first render.
 *
 * Like a browser, this does nothing once anything in the document has taken focus, when the URL's fragment points to
 * an element, or in a cross-origin frame. It also does nothing once the user has interacted with the page.
 */
export async function autofocus(element: HTMLElement) {
  // An ancestor that isn't defined yet hasn't hidden its content (a closed dialog, an inactive tab panel). Focusing
  // the element before the ancestor is defined scrolls the page to content that the ancestor then hides.
  // `allDefined()` also waits one frame. `<wa-select>` and `<wa-time-input>` need that frame, because the element they
  // focus isn't rendered during `firstUpdated()`. An ancestor that's never defined never resolves, so it never focuses.
  await allDefined({
    match: tagName => tagName.startsWith('wa-') && element.closest(tagName) !== null,
    root: element.getRootNode() as Document | ShadowRoot,
    timeout: Infinity,
  });

  let topDocument: Document;
  try {
    topDocument = window.top!.document;
  } catch {
    // Reading the top document throws in a cross-origin frame, where browsers ignore `autofocus`.
    return;
  }

  const hasFocus = topDocument.activeElement !== topDocument.body;
  const hasTarget = [document, topDocument].some(doc => doc.querySelector(':target'));
  // Catches a click or key press from before this module loaded, which the focusin listener missed. Activation in a
  // frame also activates the top window.
  const hasInteracted = window.top!.navigator.userActivation?.hasBeenActive;

  if (!isDone && !hasFocus && !hasTarget && !hasInteracted) {
    // A popover is shown in-viewport, so focusing inside it must never scroll the page.
    element.focus({ preventScroll: element.closest('wa-popover') !== null });
  }
}

/**
 * Focuses a container's first `[autofocus]` element when the container opens. A Web Awesome element is focused after
 * it's defined and rendered, since it can't take focus before that. Resolves to `false` when there's no such element.
 */
export async function focusAutofocusChild(container: HTMLElement, options?: FocusOptions) {
  const element = container.querySelector<HTMLElement>('[autofocus]');
  if (!element) return false;

  if (element.localName.startsWith('wa-')) {
    await customElements.whenDefined(element.localName);
    await (element as Partial<ReactiveElement>).updateComplete;
  }

  element.focus(options);
  return true;
}
