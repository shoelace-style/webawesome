/**
 * Shared overlay stack for keyboard event coordination.
 *
 * Overlay components (drawer, dialog, select, dropdown, tooltip, popover, color-picker) each
 * attach their own document keydown listener. Without coordination, all open overlays respond
 * to the Escape key simultaneously — causing nested overlays to all close at once.
 *
 * This maintains an ordered stack of open overlays. Each component registers itself when
 * opening and unregisters when closing. Before handling Escape, components call `isTopOverlay()`
 * to confirm they are the topmost (most recently opened) overlay.
 *
 * Modeled after the `scroll.ts` lock pattern.
 */

const overlayStack: object[] = [];

/**
 * Registers an overlay as open. Call this when the overlay becomes visible.
 * The most recently registered overlay is at the top.
 */
export function registerOverlay(key: object): void {
  overlayStack.push(key);
}

/**
 * Unregisters an overlay. Call this when the overlay closes or is removed from the DOM.
 */
export function unregisterOverlay(key: object): void {
  for (let i = overlayStack.length - 1; i >= 0; i--) {
    if (overlayStack[i] === key) {
      overlayStack.splice(i, 1);
      break;
    }
  }
}

/**
 * Returns true if the given key is the topmost registered overlay.
 * Use this to guard Escape key handling so only the topmost overlay responds.
 */
export function isTopOverlay(key: object): boolean {
  return overlayStack.length > 0 && overlayStack[overlayStack.length - 1] === key;
}
