/**
 * Prevents body scrolling. Keeps track of which elements requested a lock so multiple levels of locking are possible
 * without premature unlocking.
 */
export declare function lockBodyScrolling(lockingEl: HTMLElement): void;
/**
 * Unlocks body scrolling. Scrolling will only be unlocked once all elements that requested a lock call this method.
 */
export declare function unlockBodyScrolling(lockingEl: HTMLElement): void;
/** Scrolls an element into view of its container. If the element is already in view, nothing will happen. */
export declare function scrollIntoView(element: HTMLElement, container: HTMLElement, direction?: 'horizontal' | 'vertical' | 'both', behavior?: 'smooth' | 'auto'): void;
