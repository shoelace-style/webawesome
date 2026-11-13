import { allDefined } from '../utilities/defined.js';

/**
 * Focuses an element that has the `autofocus` attribute, under the rules browsers apply to the attribute.
 *
 * Browsers apply `autofocus` early in the page load and skip an element that can't take focus yet. A component that
 * the autoloader defines after that point can be left unfocused. `WebAwesomeElement` calls this after a component's
 * first render.
 *
 * Like a browser, this does nothing when another element has focus, when the URL's fragment points to an element, or
 * in a cross-origin frame. One rule differs from a browser's. The element takes focus from its own ancestor, because a
 * dialog that opens before its `autofocus` element is ready takes the focus itself.
 */
export async function autofocus(element: HTMLElement) {
  // An ancestor that isn't defined yet hasn't hidden its content (a closed dialog, an inactive tab panel). Focusing
  // the element before the ancestor is defined scrolls the page to content that the ancestor then hides.
  // `allDefined()` also waits one frame. `<wa-select>` and `<wa-time-input>` need that frame, because the element they
  // focus isn't rendered during `firstUpdated()`.
  await allDefined({ match: tagName => tagName.startsWith('wa-') && element.closest(tagName) !== null });

  let topDocument: Document;
  try {
    topDocument = window.top!.document;
  } catch {
    // Reading the top document throws in a cross-origin frame, where browsers ignore `autofocus`.
    return;
  }

  const focused = topDocument.activeElement;
  const hasFocus = focused !== topDocument.body && !focused?.contains(element);
  const hasTarget = [document, topDocument].some(doc => doc.querySelector(':target'));

  if (!hasFocus && !hasTarget) {
    element.focus();
  }
}
