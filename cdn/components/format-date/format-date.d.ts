import WebAwesomeElement from '../../internal/webawesome-element.js';
/**
 * @summary Formats a date/time using the specified locale and options.
 * @documentation https://backers.webawesome.com/docs/components/format-date
 * @status stable
 * @since 2.0
 */
export default class WaFormatDate extends WebAwesomeElement {
    private readonly localize;
    /**
     * The date/time to format. If not set, the current date and time will be used. When passing a string, it's strongly
     * recommended to use the ISO 8601 format to ensure timezones are handled correctly. To convert a date to this format
     * in JavaScript, use [`date.toISOString()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString).
     */
    date: Date | string;
    /** The format for displaying the weekday. */
    weekday: 'narrow' | 'short' | 'long';
    /** The format for displaying the era. */
    era: 'narrow' | 'short' | 'long';
    /** The format for displaying the year. */
    year: 'numeric' | '2-digit';
    /** The format for displaying the month. */
    month: 'numeric' | '2-digit' | 'narrow' | 'short' | 'long';
    /** The format for displaying the day. */
    day: 'numeric' | '2-digit';
    /** The format for displaying the hour. */
    hour: 'numeric' | '2-digit';
    /** The format for displaying the minute. */
    minute: 'numeric' | '2-digit';
    /** The format for displaying the second. */
    second: 'numeric' | '2-digit';
    /** The format for displaying the time. */
    timeZoneName: 'short' | 'long';
    /** The time zone to express the time in. */
    timeZone: string;
    /** The format for displaying the hour. */
    hourFormat: 'auto' | '12' | '24';
    render(): import("lit-html").TemplateResult<1> | undefined;
}
declare global {
    interface HTMLElementTagNameMap {
        'wa-format-date': WaFormatDate;
    }
}
