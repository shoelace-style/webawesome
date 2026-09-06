import { customElement, property } from 'lit/decorators.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import { LocalizeController } from '../../utilities/localize.js';

const numberFormatters = new Map<string, Intl.NumberFormat>();

/**
 * @summary Formats a number for display using the specified locale and options, including currency, percent, and unit
 *  styles. Powered by the Intl.NumberFormat API.
 * @documentation https://webawesome.com/docs/components/format-number
 * @status stable
 * @since 2.0
 */
@customElement('wa-format-number')
export default class WaFormatNumber extends WebAwesomeElement {
  static get styles() {
    return [];
  }

  private readonly localize = new LocalizeController(this);

  /** The number to format. */
  @property({ type: Number }) value = 0;

  /** The formatting style to use. */
  @property() type: 'currency' | 'decimal' | 'percent' = 'decimal';

  /** Turns off grouping separators. */
  @property({ attribute: 'without-grouping', type: Boolean }) withoutGrouping = false;

  /** The [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code to use when formatting. */
  @property() currency = 'USD';

  /** How to display the currency. */
  @property({ attribute: 'currency-display' }) currencyDisplay: 'symbol' | 'narrowSymbol' | 'code' | 'name' = 'symbol';

  /** The minimum number of integer digits to use. Possible values are 1-21. */
  @property({ attribute: 'minimum-integer-digits', type: Number }) minimumIntegerDigits: number;

  /** The minimum number of fraction digits to use. Possible values are 0-100. */
  @property({ attribute: 'minimum-fraction-digits', type: Number }) minimumFractionDigits: number;

  /** The maximum number of fraction digits to use. Possible values are 0-100. */
  @property({ attribute: 'maximum-fraction-digits', type: Number }) maximumFractionDigits: number;

  /** The minimum number of significant digits to use. Possible values are 1-21. */
  @property({ attribute: 'minimum-significant-digits', type: Number }) minimumSignificantDigits: number;

  /** The maximum number of significant digits to use,. Possible values are 1-21. */
  @property({ attribute: 'maximum-significant-digits', type: Number }) maximumSignificantDigits: number;

  private formatNumber(value: number, options: Intl.NumberFormatOptions) {
    const number = Number(value);
    if (isNaN(number)) {
      return '';
    }

    const locale = this.localize.lang();
    // Only cache primitive option values. Objects can change their coercion between renders, and JSON would collapse
    // non-finite numbers into null. Let Intl handle these values directly, including any validation errors.
    const cacheable = Object.values(options).every(
      value =>
        value === undefined ||
        typeof value === 'string' ||
        typeof value === 'boolean' ||
        (typeof value === 'number' && Number.isFinite(value)),
    );
    if (!cacheable) {
      return new Intl.NumberFormat(locale, options).format(number);
    }

    const key = JSON.stringify([locale, options]);
    let formatter = numberFormatters.get(key);
    if (!formatter) {
      formatter = new Intl.NumberFormat(locale, options);
      // Bound the shared cache so long-lived pages and SSR processes cannot accumulate unlimited formatters.
      if (numberFormatters.size >= 100) {
        numberFormatters.clear();
      }
      numberFormatters.set(key, formatter);
    }

    return formatter.format(number);
  }

  render() {
    if (isNaN(this.value)) {
      return '';
    }

    return this.formatNumber(this.value, {
      style: this.type,
      currency: this.currency,
      currencyDisplay: this.currencyDisplay,
      useGrouping: !this.withoutGrouping,
      minimumIntegerDigits: this.minimumIntegerDigits,
      minimumFractionDigits: this.minimumFractionDigits,
      maximumFractionDigits: this.maximumFractionDigits,
      minimumSignificantDigits: this.minimumSignificantDigits,
      maximumSignificantDigits: this.maximumSignificantDigits,
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-format-number': WaFormatNumber;
  }
}
