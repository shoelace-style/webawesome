import WebAwesomeElement from '../../internal/webawesome-element.js';
/**
 * @summary Formats a number using the specified locale and options.
 * @documentation https://backers.webawesome.com/docs/components/format-number
 * @status stable
 * @since 2.0
 */
export default class WaFormatNumber extends WebAwesomeElement {
    private readonly localize;
    /** The number to format. */
    value: number;
    /** The formatting style to use. */
    type: 'currency' | 'decimal' | 'percent';
    /** Turns off grouping separators. */
    noGrouping: boolean;
    /** The [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code to use when formatting. */
    currency: string;
    /** How to display the currency. */
    currencyDisplay: 'symbol' | 'narrowSymbol' | 'code' | 'name';
    /** The minimum number of integer digits to use. Possible values are 1-21. */
    minimumIntegerDigits: number;
    /** The minimum number of fraction digits to use. Possible values are 0-20. */
    minimumFractionDigits: number;
    /** The maximum number of fraction digits to use. Possible values are 0-0. */
    maximumFractionDigits: number;
    /** The minimum number of significant digits to use. Possible values are 1-21. */
    minimumSignificantDigits: number;
    /** The maximum number of significant digits to use,. Possible values are 1-21. */
    maximumSignificantDigits: number;
    render(): string;
}
declare global {
    interface HTMLElementTagNameMap {
        'wa-format-number': WaFormatNumber;
    }
}
