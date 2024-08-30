import WebAwesomeElement from '../../internal/webawesome-element.js';
import type { CSSResultGroup } from 'lit';
/**
 * @summary Tab panels are used inside [tab groups](/docs/components/tab-group) to display tabbed content.
 * @documentation https://backers.webawesome.com/docs/components/tab-panel
 * @status stable
 * @since 2.0
 *
 * @slot - The tab panel's content.
 *
 * @csspart base - The component's base wrapper.
 *
 * @cssproperty --padding - The tab panel's padding.
 */
export default class WaTabPanel extends WebAwesomeElement {
    static styles: CSSResultGroup;
    private readonly attrId;
    private readonly componentId;
    /** The tab panel's name. */
    name: string;
    /** When true, the tab panel will be shown. */
    active: boolean;
    connectedCallback(): void;
    handleActiveChange(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wa-tab-panel': WaTabPanel;
    }
}
