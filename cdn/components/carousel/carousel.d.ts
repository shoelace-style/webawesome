import '../../internal/scrollend-polyfill.js';
import '../icon/icon.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import type { CSSResultGroup, PropertyValueMap } from 'lit';
/**
 * @summary Carousels display an arbitrary number of content slides along a horizontal or vertical axis.
 *
 * @since 2.2
 * @status experimental
 *
 * @dependency wa-icon
 *
 * @event {{ index: number, slide: WaCarouselItem }} wa-slide-change - Emitted when the active slide changes.
 *
 * @slot - The carousel's main content, one or more `<wa-carousel-item>` elements.
 * @slot next-icon - Optional next icon to use instead of the default. Works best with `<wa-icon>`.
 * @slot previous-icon - Optional previous icon to use instead of the default. Works best with `<wa-icon>`.
 *
 * @csspart base - The carousel's internal wrapper.
 * @csspart scroll-container - The scroll container that wraps the slides.
 * @csspart pagination - The pagination indicators wrapper.
 * @csspart pagination-item - The pagination indicator.
 * @csspart pagination-item--active - Applied when the item is active.
 * @csspart navigation - The navigation wrapper.
 * @csspart navigation-button - The navigation button.
 * @csspart navigation-button--previous - Applied to the previous button.
 * @csspart navigation-button--next - Applied to the next button.
 *
 * @cssproperty [--aspect-ratio=16/9] - The aspect ratio of each slide.
 * @cssproperty --navigation-color - The color of the navigation arrows.
 * @cssproperty --pagination-color - The color of the dots indicating the number of slides.
 * @cssproperty --pagination-color-active - The color of the dot indicating the active slide.
 * @cssproperty --scroll-hint - The amount of padding to apply to the scroll area, allowing adjacent slides to become
 *  partially visible as a scroll hint.
 * @cssproperty --slide-gap - The space between each slide.
 */
export default class WaCarousel extends WebAwesomeElement {
    static styles: CSSResultGroup;
    /** When set, allows the user to navigate the carousel in the same direction indefinitely. */
    loop: boolean;
    slides: number;
    currentSlide: number;
    /** When set, show the carousel's navigation. */
    navigation: boolean;
    /** When set, show the carousel's pagination indicators. */
    pagination: boolean;
    /** When set, the slides will scroll automatically when the user is not interacting with them.  */
    autoplay: boolean;
    /** Specifies the amount of time, in milliseconds, between each automatic scroll.  */
    autoplayInterval: number;
    /** Specifies how many slides should be shown at a given time.  */
    slidesPerPage: number;
    /**
     * Specifies the number of slides the carousel will advance when scrolling, useful when specifying a `slides-per-page`
     * greater than one. It can't be higher than `slides-per-page`.
     */
    slidesPerMove: number;
    /** Specifies the orientation in which the carousel will lay out.  */
    orientation: 'horizontal' | 'vertical';
    /** When set, it is possible to scroll through the slides by dragging them with the mouse. */
    mouseDragging: boolean;
    scrollContainer: HTMLElement;
    paginationContainer: HTMLElement;
    activeSlide: number;
    scrolling: boolean;
    dragging: boolean;
    private autoplayController;
    private readonly localize;
    private mutationObserver;
    connectedCallback(): void;
    disconnectedCallback(): void;
    protected firstUpdated(): void;
    protected willUpdate(changedProperties: PropertyValueMap<WaCarousel> | Map<PropertyKey, unknown>): void;
    private getPageCount;
    private getCurrentPage;
    private canScrollNext;
    private canScrollPrev;
    /** @internal Gets all carousel items. */
    private getSlides;
    private handleKeyDown;
    private handleMouseDragStart;
    private handleMouseDrag;
    private handleMouseDragEnd;
    private handleScroll;
    /** @internal Synchronizes the slides with the IntersectionObserver API. */
    private synchronizeSlides;
    private handleScrollEnd;
    private isCarouselItem;
    private handleSlotChange;
    initializeSlides(): void;
    private createClones;
    handelSlideChange(): void;
    updateSlidesSnap(): void;
    handleAutoplayChange(): void;
    /**
     * Move the carousel backward by `slides-per-move` slides.
     *
     * @param behavior - The behavior used for scrolling.
     */
    previous(behavior?: ScrollBehavior): void;
    /**
     * Move the carousel forward by `slides-per-move` slides.
     *
     * @param behavior - The behavior used for scrolling.
     */
    next(behavior?: ScrollBehavior): void;
    /**
     * Scrolls the carousel to the slide specified by `index`.
     *
     * @param index - The slide index.
     * @param behavior - The behavior used for scrolling.
     */
    goToSlide(index: number, behavior?: ScrollBehavior): void;
    private scrollToSlide;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wa-carousel': WaCarousel;
    }
}
