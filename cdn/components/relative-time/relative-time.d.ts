import WebAwesomeElement from '../../internal/webawesome-element.js';
/**
 * @summary Outputs a localized time phrase relative to the current date and time.
 * @documentation https://backers.webawesome.com/docs/components/relative-time
 * @status stable
 * @since 2.0
 */
export default class WaRelativeTime extends WebAwesomeElement {
    private readonly localize;
    private updateTimeout;
    private isoTime;
    private relativeTime;
    /**
     * The date from which to calculate time from. If not set, the current date and time will be used. When passing a
     * string, it's strongly recommended to use the ISO 8601 format to ensure timezones are handled correctly. To convert
     * a date to this format in JavaScript, use [`date.toISOString()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString).
     */
    date: Date | string;
    /** The formatting style to use. */
    format: 'long' | 'short' | 'narrow';
    /**
     * When `auto`, values such as "yesterday" and "tomorrow" will be shown when possible. When `always`, values such as
     * "1 day ago" and "in 1 day" will be shown.
     */
    numeric: 'always' | 'auto';
    /** Keep the displayed value up to date as time passes. */
    sync: boolean;
    disconnectedCallback(): void;
    render(): "" | import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wa-relative-time': WaRelativeTime;
    }
}
