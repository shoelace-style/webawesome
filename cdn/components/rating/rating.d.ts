import '../icon/icon.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import type { CSSResultGroup } from 'lit';
/**
 * @summary Ratings give users a way to quickly view and provide feedback.
 * @documentation https://backers.webawesome.com/docs/components/rating
 * @status stable
 * @since 2.0
 *
 * @dependency wa-icon
 *
 * @event wa-change - Emitted when the rating's value changes.
 * @event {{ phase: 'start' | 'move' | 'end', value: number }} wa-hover - Emitted when the user hovers over a value. The
 *  `phase` property indicates when hovering starts, moves to a new value, or ends. The `value` property tells what the
 *  rating's value would be if the user were to commit to the hovered value.
 *
 * @csspart base - The component's base wrapper.
 *
 * @cssproperty --symbol-color - The inactive color for symbols.
 * @cssproperty --symbol-color-active - The active color for symbols.
 * @cssproperty --symbol-size - The size of symbols.
 * @cssproperty --symbol-spacing - The spacing to use around symbols.
 */
export default class WaRating extends WebAwesomeElement {
    static styles: CSSResultGroup;
    rating: HTMLElement;
    private hoverValue;
    private isHovering;
    /** A label that describes the rating to assistive devices. */
    label: string;
    /** The current rating. */
    value: number;
    /** The highest rating to show. */
    max: number;
    /**
     * The precision at which the rating will increase and decrease. For example, to allow half-star ratings, set this
     * attribute to `0.5`.
     */
    precision: number;
    /** Makes the rating readonly. */
    readonly: boolean;
    /** Disables the rating. */
    disabled: boolean;
    /**
     * A function that customizes the symbol to be rendered. The first and only argument is the rating's current value.
     * The function should return a string containing trusted HTML of the symbol to render at the specified value. Works
     * well with `<wa-icon>` elements.
     */
    getSymbol: (value: number) => string;
    private getValueFromMousePosition;
    private getValueFromTouchPosition;
    private getValueFromXCoordinate;
    private handleClick;
    private setValue;
    private handleKeyDown;
    private handleMouseEnter;
    private handleMouseMove;
    private handleMouseLeave;
    private handleTouchStart;
    private handleTouchMove;
    private handleTouchEnd;
    private roundToPrecision;
    handleHoverValueChange(): void;
    handleIsHoveringChange(): void;
    /** Sets focus on the rating. */
    focus(options?: FocusOptions): void;
    /** Removes focus from the rating. */
    blur(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wa-rating': WaRating;
    }
}
