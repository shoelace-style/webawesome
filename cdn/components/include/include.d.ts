import WebAwesomeElement from '../../internal/webawesome-element.js';
import type { CSSResultGroup } from 'lit';
/**
 * @summary Includes give you the power to embed external HTML files into the page.
 * @documentation https://backers.webawesome.com/docs/components/include
 * @status stable
 * @since 2.0
 *
 * @event wa-load - Emitted when the included file is loaded.
 * @event {{ status: number }} wa-error - Emitted when the included file fails to load due to an error.
 */
export default class WaInclude extends WebAwesomeElement {
    static styles: CSSResultGroup;
    /**
     * The location of the HTML file to include. Be sure you trust the content you are including as it will be executed as
     * code and can result in XSS attacks.
     */
    src: string;
    /** The fetch mode to use. */
    mode: 'cors' | 'no-cors' | 'same-origin';
    /**
     * Allows included scripts to be executed. Be sure you trust the content you are including as it will be executed as
     * code and can result in XSS attacks.
     */
    allowScripts: boolean;
    private executeScript;
    handleSrcChange(): Promise<void>;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wa-include': WaInclude;
    }
}
