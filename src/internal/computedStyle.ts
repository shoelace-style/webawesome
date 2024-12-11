// Cached computed style calls.
// computedStyle calls are "live" so they only need to be retrieved once for an element.
export const computedStyleMap = new WeakMap<Element, CSSStyleDeclaration>();

export function getComputedStyle(el: Element): CSSStyleDeclaration | null {
  let computedStyle: undefined | CSSStyleDeclaration = computedStyleMap.get(el);

  if (!computedStyle && globalThis.window) {
    computedStyle = window.getComputedStyle(el);
    computedStyleMap.set(el, computedStyle);
  }

  return computedStyle ?? null;
}
