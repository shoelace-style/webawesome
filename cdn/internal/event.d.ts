/** Waits for a specific event to be emitted from an element. Ignores events that bubble up from child elements. */
export declare function waitForEvent(el: HTMLElement, eventName: string): Promise<void>;
