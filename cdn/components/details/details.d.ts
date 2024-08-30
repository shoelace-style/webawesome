import '../icon/icon.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import type { CSSResultGroup } from 'lit';
/**
 * @summary Details show a brief summary and expand to show additional content.
 * @documentation https://backers.webawesome.com/docs/components/details
 * @status stable
 * @since 2.0
 *
 * @dependency wa-icon
 *
 * @slot - The details' main content.
 * @slot summary - The details' summary. Alternatively, you can use the `summary` attribute.
 * @slot expand-icon - Optional expand icon to use instead of the default. Works best with `<wa-icon>`.
 * @slot collapse-icon - Optional collapse icon to use instead of the default. Works best with `<wa-icon>`.
 *
 * @event wa-show - Emitted when the details opens.
 * @event wa-after-show - Emitted after the details opens and all animations are complete.
 * @event wa-hide - Emitted when the details closes.
 * @event wa-after-hide - Emitted after the details closes and all animations are complete.
 *
 * @csspart base - The component's base wrapper.
 * @csspart header - The header that wraps both the summary and the expand/collapse icon.
 * @csspart summary - The container that wraps the summary.
 * @csspart summary-icon - The container that wraps the expand/collapse icons.
 * @csspart content - The details content.
 *
 * @cssproperty --background-color - The details' background color.
 * @cssproperty --border-color - The details' border color.
 * @cssproperty --border-radius - The radius for the details' corners. Expects a single value.
 * @cssproperty --border-style - The style of the details' borders.
 * @cssproperty --border-width - The width of the details' borders. Expects a single value.
 * @cssproperty --icon-color - The color of the details' icon.
 * @cssproperty --spacing - The amount of space around and between the details' content. Expects a single value.
 * @cssproperty [--show-duration=200ms] - The show duration to use when applying built-in animation classes.
 * @cssproperty [--hide-duration=200ms] - The hide duration to use when applying built-in animation classes.
 */
export default class WaDetails extends WebAwesomeElement {
    static styles: CSSResultGroup;
    details: HTMLDetailsElement;
    header: HTMLElement;
    body: HTMLElement;
    expandIconSlot: HTMLSlotElement;
    detailsObserver: MutationObserver;
    /**
     * Indicates whether or not the details is open. You can toggle this attribute to show and hide the details, or you
     * can use the `show()` and `hide()` methods and this attribute will reflect the details' open state.
     */
    open: boolean;
    /** The summary to show in the header. If you need to display HTML, use the `summary` slot instead. */
    summary: string;
    /** Disables the details so it can't be toggled. */
    disabled: boolean;
    firstUpdated(): void;
    disconnectedCallback(): void;
    private handleSummaryClick;
    private handleSummaryKeyDown;
    handleOpenChange(): Promise<void>;
    /** Shows the details. */
    show(): Promise<void>;
    /** Hides the details */
    hide(): Promise<void>;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wa-details': WaDetails;
    }
}
