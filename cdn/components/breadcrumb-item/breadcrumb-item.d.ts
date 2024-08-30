import WebAwesomeElement from '../../internal/webawesome-element.js';
import type { CSSResultGroup } from 'lit';
/**
 * @summary Breadcrumb Items are used inside [breadcrumbs](/docs/components/breadcrumb) to represent different links.
 * @documentation https://backers.webawesome.com/docs/components/breadcrumb-item
 * @status stable
 * @since 2.0
 *
 * @slot - The breadcrumb item's label.
 * @slot prefix - An optional prefix, usually an icon or icon button.
 * @slot suffix - An optional suffix, usually an icon or icon button.
 * @slot separator - The separator to use for the breadcrumb item. This will only change the separator for this item. If
 * you want to change it for all items in the group, set the separator on `<wa-breadcrumb>` instead.
 *
 * @csspart base - The component's base wrapper.
 * @csspart label - The breadcrumb item's label.
 * @csspart prefix - The container that wraps the prefix.
 * @csspart suffix - The container that wraps the suffix.
 * @csspart separator - The container that wraps the separator.
 */
export default class WaBreadcrumbItem extends WebAwesomeElement {
    static styles: CSSResultGroup;
    defaultSlot: HTMLSlotElement;
    private renderType;
    /**
     * Optional URL to direct the user to when the breadcrumb item is activated. When set, a link will be rendered
     * internally. When unset, a button will be rendered instead.
     */
    href?: string;
    /** Tells the browser where to open the link. Only used when `href` is set. */
    target?: '_blank' | '_parent' | '_self' | '_top';
    /** The `rel` attribute to use on the link. Only used when `href` is set. */
    rel: string;
    private setRenderType;
    hrefChanged(): void;
    handleSlotChange(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wa-breadcrumb-item': WaBreadcrumbItem;
    }
}
