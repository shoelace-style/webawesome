/**
 * Returns the first and last bounding elements that are tabbable. This is more performant than checking every single
 * element because it short-circuits after finding the first and last ones.
 */
export declare function getTabbableBoundary(root: HTMLElement | ShadowRoot): {
    start: HTMLElement;
    end: HTMLElement;
};
export declare function getTabbableElements(root: HTMLElement | ShadowRoot): HTMLElement[];
