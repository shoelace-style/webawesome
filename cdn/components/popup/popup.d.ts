import WebAwesomeElement from '../../internal/webawesome-element.js';
import type { CSSResultGroup } from 'lit';
export interface VirtualElement {
    getBoundingClientRect: () => DOMRect;
    contextElement?: Element;
}
/**
 * @summary Popup is a utility that lets you declaratively anchor "popup" containers to another element.
 * @documentation https://backers.webawesome.com/docs/components/popup
 * @status stable
 * @since 2.0
 *
 * @event wa-reposition - Emitted when the popup is repositioned. This event can fire a lot, so avoid putting expensive
 *  operations in your listener or consider debouncing it.
 *
 * @slot - The popup's content.
 * @slot anchor - The element the popup will be anchored to. If the anchor lives outside of the popup, you can use the
 *  `anchor` attribute or property instead.
 *
 * @csspart arrow - The arrow's container. Avoid setting `top|bottom|left|right` properties, as these values are
 *  assigned dynamically as the popup moves. This is most useful for applying a background color to match the popup, and
 *  maybe a border or box shadow.
 * @csspart popup - The popup's container. Useful for setting a background color, box shadow, etc.
 * @csspart hover-bridge - The hover bridge element. Only available when the `hover-bridge` option is enabled.
 *
 * @cssproperty [--arrow-size=6px] - The size of the arrow. Note that an arrow won't be shown unless the `arrow`
 *  attribute is used.
 * @cssproperty [--arrow-color=black] - The color of the arrow.
 * @cssproperty [--auto-size-available-width] - A read-only custom property that determines the amount of width the
 *  popup can be before overflowing. Useful for positioning child elements that need to overflow. This property is only
 *  available when using `auto-size`.
 * @cssproperty [--auto-size-available-height] - A read-only custom property that determines the amount of height the
 *  popup can be before overflowing. Useful for positioning child elements that need to overflow. This property is only
 *  available when using `auto-size`.
 * @cssproperty [--show-duration=100ms] - The show duration to use when applying built-in animation classes.
 * @cssproperty [--hide-duration=100ms] - The hide duration to use when applying built-in animation classes.
 */
export default class WaPopup extends WebAwesomeElement {
    static styles: CSSResultGroup;
    private anchorEl;
    private cleanup;
    /** A reference to the internal popup container. Useful for animating and styling the popup with JavaScript. */
    popup: HTMLElement;
    private arrowEl;
    /**
     * The element the popup will be anchored to. If the anchor lives outside of the popup, you can provide the anchor
     * element `id`, a DOM element reference, or a `VirtualElement`. If the anchor lives inside the popup, use the
     * `anchor` slot instead.
     */
    anchor: Element | string | VirtualElement;
    /**
     * Activates the positioning logic and shows the popup. When this attribute is removed, the positioning logic is torn
     * down and the popup will be hidden.
     */
    active: boolean;
    /**
     * The preferred placement of the popup. Note that the actual placement will vary as configured to keep the
     * panel inside of the viewport.
     */
    placement: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'right' | 'right-start' | 'right-end' | 'left' | 'left-start' | 'left-end';
    /**
     * Determines how the popup is positioned. The `absolute` strategy works well in most cases, but if overflow is
     * clipped, using a `fixed` position strategy can often workaround it.
     */
    strategy: 'absolute' | 'fixed';
    /** The distance in pixels from which to offset the panel away from its anchor. */
    distance: number;
    /** The distance in pixels from which to offset the panel along its anchor. */
    skidding: number;
    /**
     * Attaches an arrow to the popup. The arrow's size and color can be customized using the `--arrow-size` and
     * `--arrow-color` custom properties. For additional customizations, you can also target the arrow using
     * `::part(arrow)` in your stylesheet.
     */
    arrow: boolean;
    /**
     * The placement of the arrow. The default is `anchor`, which will align the arrow as close to the center of the
     * anchor as possible, considering available space and `arrow-padding`. A value of `start`, `end`, or `center` will
     * align the arrow to the start, end, or center of the popover instead.
     */
    arrowPlacement: 'start' | 'end' | 'center' | 'anchor';
    /**
     * The amount of padding between the arrow and the edges of the popup. If the popup has a border-radius, for example,
     * this will prevent it from overflowing the corners.
     */
    arrowPadding: number;
    /**
     * When set, placement of the popup will flip to the opposite site to keep it in view. You can use
     * `flipFallbackPlacements` to further configure how the fallback placement is determined.
     */
    flip: boolean;
    /**
     * If the preferred placement doesn't fit, popup will be tested in these fallback placements until one fits. Must be a
     * string of any number of placements separated by a space, e.g. "top bottom left". If no placement fits, the flip
     * fallback strategy will be used instead.
     * */
    flipFallbackPlacements: string;
    /**
     * When neither the preferred placement nor the fallback placements fit, this value will be used to determine whether
     * the popup should be positioned using the best available fit based on available space or as it was initially
     * preferred.
     */
    flipFallbackStrategy: 'best-fit' | 'initial';
    /**
     * The flip boundary describes clipping element(s) that overflow will be checked relative to when flipping. By
     * default, the boundary includes overflow ancestors that will cause the element to be clipped. If needed, you can
     * change the boundary by passing a reference to one or more elements to this property.
     */
    flipBoundary: Element | Element[];
    /** The amount of padding, in pixels, to exceed before the flip behavior will occur. */
    flipPadding: number;
    /** Moves the popup along the axis to keep it in view when clipped. */
    shift: boolean;
    /**
     * The shift boundary describes clipping element(s) that overflow will be checked relative to when shifting. By
     * default, the boundary includes overflow ancestors that will cause the element to be clipped. If needed, you can
     * change the boundary by passing a reference to one or more elements to this property.
     */
    shiftBoundary: Element | Element[];
    /** The amount of padding, in pixels, to exceed before the shift behavior will occur. */
    shiftPadding: number;
    /** When set, this will cause the popup to automatically resize itself to prevent it from overflowing. */
    autoSize: 'horizontal' | 'vertical' | 'both';
    /** Syncs the popup's width or height to that of the anchor element. */
    sync: 'width' | 'height' | 'both';
    /**
     * The auto-size boundary describes clipping element(s) that overflow will be checked relative to when resizing. By
     * default, the boundary includes overflow ancestors that will cause the element to be clipped. If needed, you can
     * change the boundary by passing a reference to one or more elements to this property.
     */
    autoSizeBoundary: Element | Element[];
    /** The amount of padding, in pixels, to exceed before the auto-size behavior will occur. */
    autoSizePadding: number;
    /**
     * When a gap exists between the anchor and the popup element, this option will add a "hover bridge" that fills the
     * gap using an invisible element. This makes listening for events such as `mouseenter` and `mouseleave` more sane
     * because the pointer never technically leaves the element. The hover bridge will only be drawn when the popover is
     * active.
     */
    hoverBridge: boolean;
    connectedCallback(): Promise<void>;
    disconnectedCallback(): void;
    updated(changedProps: Map<string, unknown>): Promise<void>;
    private handleAnchorChange;
    private start;
    private stop;
    /** Forces the popup to recalculate and reposition itself. */
    reposition(): void;
    private updateHoverBridge;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wa-popup': WaPopup;
    }
}
