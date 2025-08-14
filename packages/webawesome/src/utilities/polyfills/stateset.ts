/**
 * A Set-like class that manages custom states for DOM elements.
 * Extends the native Set to provide state management functionality
 * that can work with either DOM attributes or an existing Set.
 */
export class StateSet extends Set<string> {
  private _el: Element;

  private _existing: null | Set<string> = null;

  /**
   * Creates a new StateSet instance.
   * @param el - The DOM element to manage states for
   * @param existing - An optional existing Set to use for state storage
   */
  constructor(el: Element, existing: Set<string> | null = null) {
    super();
    this._el = el;
    this._existing = existing;
  }

  /**
   * Adds a state to the set and applies it to the element or existing set.
   * @param state - The state name to add
   * @returns The StateSet instance for method chaining
   */
  add(state: string) {
    super.add(state);
    const existing = this._existing;
    if (existing) {
      try {
        existing.add(state);
      } catch {
        existing.add(`--${state}`);
      }
    } else {
      this._el.setAttribute(`state-${state}`, '');
    }
    return this;
  }

  /**
   * Removes a state from the set and from the element or existing set.
   * @param state - The state name to remove
   * @returns Always returns true (for Set compatibility)
   */
  delete(state: string) {
    super.delete(state);
    const existing = this._existing;
    if (existing) {
      existing.delete(state);
      existing.delete(`--${state}`);
    } else {
      this._el.removeAttribute(`state-${state}`);
    }
    return true;
  }

  /**
   * Checks if a state exists in the set.
   * @param state - The state name to check
   * @returns True if the state exists, false otherwise
   */
  has(state: string) {
    return super.has(state);
  }

  /**
   * Removes all states from the set and from the element or existing set.
   */
  clear() {
    for (const state of this) this.delete(state);
  }
}

/**
 * Monkey-patch CSSStyleSheet.prototype.replaceSync to transform :state() selectors
 * into a :where() selector that supports multiple fallback syntaxes for better compatibility.
 */
const replaceSync = CSSStyleSheet.prototype.replaceSync;
Object.defineProperty(CSSStyleSheet.prototype, 'replaceSync', {
  value: function (text: string) {
    text = text.replace(/:state\(([^)]+)\)/g, ':where(:state($1), :--$1, [state-$1])');
    replaceSync.call(this, text);
  },
});
