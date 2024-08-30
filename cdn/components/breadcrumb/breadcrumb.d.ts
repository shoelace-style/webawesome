import '../icon/icon.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import type { CSSResultGroup } from 'lit';
/**
 * @summary Breadcrumbs provide a group of links so users can easily navigate a website's hierarchy.
 * @documentation https://backers.webawesome.com/docs/components/breadcrumb
 * @status stable
 * @since 2.0
 *
 * @slot - One or more breadcrumb items to display.
 * @slot separator - The separator to use between breadcrumb items. Works best with `<wa-icon>`.
 *
 * @dependency wa-icon
 *
 * @csspart base - The component's base wrapper.
 */
export default class WaBreadcrumb extends WebAwesomeElement {
    static styles: CSSResultGroup;
    private readonly localize;
    private separatorDir;
    defaultSlot: HTMLSlotElement;
    separatorSlot: HTMLSlotElement;
    /**
     * The label to use for the breadcrumb control. This will not be shown on the screen, but it will be announced by
     * screen readers and other assistive devices to provide more context for users.
     */
    label: string;
    private getSeparator;
    private handleSlotChange;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wa-breadcrumb': WaBreadcrumb;
    }
}
