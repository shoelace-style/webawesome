import WaPopup from '../popup/popup.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import type { CSSResultGroup } from 'lit';
/**
 * @summary Tooltips display additional information based on a specific action.
 * @documentation https://backers.webawesome.com/docs/components/tooltip
 * @status stable
 * @since 2.0
 *
 * @dependency wa-popup
 *
 * @slot - The tooltip's default slot where any content should live. Interactive content should be avoided.
 *
 * @event wa-show - Emitted when the tooltip begins to show.
 * @event wa-after-show - Emitted after the tooltip has shown and all animations are complete.
 * @event wa-hide - Emitted when the tooltip begins to hide.
 * @event wa-after-hide - Emitted after the tooltip has hidden and all animations are complete.
 *
 * @csspart base - The component's base wrapper, an `<wa-popup>` element.
 * @csspart base__popup - The popup's exported `popup` part. Use this to target the tooltip's popup container.
 * @csspart base__arrow - The popup's exported `arrow` part. Use this to target the tooltip's arrow.
 * @csspart body - The tooltip's body where its content is rendered.
 *
 * @cssproperty --background-color - The tooltip's background color.
 * @cssproperty --border-radius - The radius of the tooltip's corners.
 * @cssproperty --content-color - The color of the tooltip's content.
 * @cssproperty --max-width - The maximum width of the tooltip before its content will wrap.
 * @cssproperty --padding - The padding within the tooltip.
 * @cssproperty --hide-delay - The amount of time to wait before hiding the tooltip when hovering.
 * @cssproperty --show-delay - The amount of time to wait before showing the tooltip when hovering.
 */
export default class WaTooltip extends WebAwesomeElement {
    static styles: CSSResultGroup;
    static dependencies: {
        'wa-popup': typeof WaPopup;
    };
    private hoverTimeout;
    private closeWatcher;
    defaultSlot: HTMLSlotElement;
    body: HTMLElement;
    popup: WaPopup;
    /**
     * The preferred placement of the tooltip. Note that the actual placement may vary as needed to keep the tooltip
     * inside of the viewport.
     */
    placement: 'top' | 'top-start' | 'top-end' | 'right' | 'right-start' | 'right-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end';
    /** Disables the tooltip so it won't show when triggered. */
    disabled: boolean;
    /** The distance in pixels from which to offset the tooltip away from its target. */
    distance: number;
    /** Indicates whether or not the tooltip is open. You can use this in lieu of the show/hide methods. */
    open: boolean;
    /** The distance in pixels from which to offset the tooltip along its target. */
    skidding: number;
    /** The amount of time to wait before showing the tooltip when the user mouses in. */
    showDelay: number;
    /** The amount of time to wait before hiding the tooltip when the user mouses out.. */
    hideDelay: number;
    /**
     * Controls how the tooltip is activated. Possible options include `click`, `hover`, `focus`, and `manual`. Multiple
     * options can be passed by separating them with a space. When manual is used, the tooltip must be activated
     * programmatically.
     */
    trigger: string;
    /**
     * Enable this option to prevent the tooltip from being clipped when the component is placed inside a container with
     * `overflow: auto|hidden|scroll`. Hoisting uses a fixed positioning strategy that works in many, but not all,
     * scenarios.
     */
    hoist: boolean;
    for: null | string;
    anchor: null | Element;
    private eventController;
    connectedCallback(): void;
    disconnectedCallback(): void;
    firstUpdated(): void;
    private handleBlur;
    private handleClick;
    private handleFocus;
    private handleDocumentKeyDown;
    private handleMouseOver;
    private handleMouseOut;
    private hasTrigger;
    handleOpenChange(): Promise<void>;
    handleForChange(): void;
    handleOptionsChange(): Promise<void>;
    handleDisabledChange(): void;
    /** Shows the tooltip. */
    show(): Promise<void>;
    /** Hides the tooltip */
    hide(): Promise<void>;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wa-tooltip': WaTooltip;
    }
}
