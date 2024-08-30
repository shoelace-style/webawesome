import WebAwesomeElement from '../../internal/webawesome-element.js';
/**
 * @summary Formats a number as a human readable bytes value.
 * @documentation https://backers.webawesome.com/docs/components/format-bytes
 * @status stable
 * @since 2.0
 */
export default class WaFormatBytes extends WebAwesomeElement {
    private readonly localize;
    /** The number to format in bytes. */
    value: number;
    /** The type of unit to display. */
    unit: 'byte' | 'bit';
    /** Determines how to display the result, e.g. "100 bytes", "100 b", or "100b". */
    display: 'long' | 'short' | 'narrow';
    render(): string;
}
declare global {
    interface HTMLElementTagNameMap {
        'wa-format-bytes': WaFormatBytes;
    }
}
