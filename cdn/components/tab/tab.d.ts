import WebAwesomeElement from '../../internal/webawesome-element.js';
import type { CSSResultGroup } from 'lit';
/**
 * @summary Tabs are used inside [tab groups](/docs/components/tab-group) to represent and activate [tab panels](/docs/components/tab-panel).
 * @documentation https://backers.webawesome.com/docs/components/tab
 * @status stable
 * @since 2.0
 *
 * @slot - The tab's label.
 *
 * @cssproperty --active-tab-color - The color of the active tab's label.
 *
 * @csspart base - The component's base wrapper.
 * @csspart close-button - The close button, an `<wa-icon-button>`.
 * @csspart close-button__base - The close button's exported `base` part.
 */
export default class WaTab extends WebAwesomeElement {
    static styles: CSSResultGroup;
    private readonly attrId;
    private readonly componentId;
    tab: HTMLElement;
    /** The name of the tab panel this tab is associated with. The panel must be located in the same tab group. */
    panel: string;
    /** @internal Draws the tab in an active state. */
    active: boolean;
    /** Disables the tab and prevents selection. */
    disabled: boolean;
    /**
     * @internal
     * Need to wrap in a `@property()` otherwise NextJS blows up.
     */
    tabIndex: number;
    connectedCallback(): void;
    handleActiveChange(): void;
    handleDisabledChange(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wa-tab': WaTab;
    }
}
