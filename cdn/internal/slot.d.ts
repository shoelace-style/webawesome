import type { ReactiveController, ReactiveControllerHost } from 'lit';
/** A reactive controller that determines when slots exist. */
export declare class HasSlotController implements ReactiveController {
    host: ReactiveControllerHost & Element;
    slotNames: string[];
    constructor(host: ReactiveControllerHost & Element, ...slotNames: string[]);
    private hasDefaultSlot;
    private hasNamedSlot;
    test(slotName: string): boolean;
    hostConnected(): void;
    hostDisconnected(): void;
    private handleSlotChange;
}
/**
 * Given a slot, this function iterates over all of its assigned element and text nodes and returns the concatenated
 * HTML as a string. This is useful because we can't use slot.innerHTML as an alternative.
 */
export declare function getInnerHTML(slot: HTMLSlotElement): string;
/**
 * Given a slot, this function iterates over all of its assigned text nodes and returns the concatenated text as a
 * string. This is useful because we can't use slot.textContent as an alternative.
 */
export declare function getTextContent(slot: HTMLSlotElement | undefined | null): string;
