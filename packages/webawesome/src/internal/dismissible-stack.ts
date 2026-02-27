/**
 * Shared dismissible stack for keyboard event coordination.
 *
 * Dismissible components (drawer, dialog, select, dropdown, tooltip, popover, color-picker) each attach their own
 * document keydown listener. Without coordination, all open dismissibles respond to the Escape key simultaneously,
 * causing nested dismissibles to all close at once.
 *
 * This maintains an ordered stack of open dismissibles. Each component registers itself when opening and unregisters
 * when closing. Before handling Escape, components call `isTopDismissible()` to confirm they are the topmost (most
 * recently opened) dismissible.
 */
const dismissibleStack: object[] = [];

/**
 * Registers a dismissible as open. Call this when the dismissible becomes visible.
 * The most recently registered dismissible is at the top.
 */
export function registerDismissible(key: object): void {
  dismissibleStack.push(key);
}

/**
 * Unregisters a dismissible. Call this when the dismissible closes or is removed from the DOM.
 */
export function unregisterDismissible(key: object): void {
  for (let i = dismissibleStack.length - 1; i >= 0; i--) {
    if (dismissibleStack[i] === key) {
      dismissibleStack.splice(i, 1);
      break;
    }
  }
}

/**
 * Returns true if the given key is the topmost registered dismissible.
 * Use this to guard Escape key handling so only the topmost dismissible responds.
 */
export function isTopDismissible(key: object): boolean {
  return dismissibleStack.length > 0 && dismissibleStack[dismissibleStack.length - 1] === key;
}
