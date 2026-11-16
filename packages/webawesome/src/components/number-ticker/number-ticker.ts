import { html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { WaFinishEvent } from '../../events/finish.js';
import { prefersReducedMotion } from '../../internal/animate.js';
import { watch } from '../../internal/watch.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import visuallyHidden from '../../styles/component/visually-hidden.styles.js';
import { LocalizeController } from '../../utilities/localize.js';
import styles from './number-ticker.styles.js';

const DEFAULT_EASING = 'cubic-bezier(0.16, 1, 0.3, 1)';

function decimalPlaces(n: number) {
  // toPrecision drops float noise like 0.1 + 0.2. toLocaleString avoids exponent notation.
  const text = Number(Number(n).toPrecision(15)).toLocaleString('en', {
    maximumFractionDigits: 20,
    useGrouping: false,
  });
  return text.split('.')[1]?.length ?? 0;
}

/**
 * @summary Number tickers count up or down to a value when they scroll into view, formatted with the Intl.NumberFormat
 *  API. Use them for dashboard stats, landing page metrics, and running totals.
 * @documentation https://webawesome.com/docs/components/number-ticker
 * @status stable
 * @since 3.15
 *
 * @event wa-finish - Emitted when the ticker finishes counting.
 *
 * @ssr - `<wa-number-ticker>` renders its start value during SSR, but won't start counting until it hydrates on the
 *  client and scrolls into view.
 */
@customElement('wa-number-ticker')
export default class WaNumberTicker extends WebAwesomeElement {
  static css = [styles, visuallyHidden];

  private readonly localize = new LocalizeController(this);
  private observer?: IntersectionObserver;
  private isIntersecting = false;
  private isPending = true;
  private animation?: Animation;
  private frame = 0;

  /** The number currently shown. Null until counting begins, so the start value shows instead. */
  @state() private displayValue: number | null = null;

  /**
   * The number to count to. Once the ticker has started, changing it counts from the number currently displayed to the
   * new value.
   */
  @property({ type: Number }) value = 0;

  /** The number to count from on the first run and when `restart()` is called. */
  @property({ attribute: 'start-value', type: Number }) startValue = 0;

  /** The number of milliseconds each count takes. Set to `0` to skip the animation. */
  @property({ type: Number }) duration = 2000;

  /** The number of milliseconds to wait before counting from the start value. Later value changes aren't delayed. */
  @property({ type: Number }) delay = 0;

  /**
   * The easing function to use for counting. Accepts any CSS easing function, such as `linear`, `ease-in-out`,
   * `cubic-bezier()`, `steps()`, or `linear()`. Invalid values fall back to the default.
   */
  @property() easing = DEFAULT_EASING;

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

  /**
   * The minimum number of fraction digits to use. Possible values are 0-100. If only one fraction digit option is set,
   * it's used for both.
   */
  @property({ attribute: 'minimum-fraction-digits', type: Number }) minimumFractionDigits: number;

  /**
   * The maximum number of fraction digits to use. Possible values are 0-100. If only one fraction digit option is set,
   * it's used for both.
   */
  @property({ attribute: 'maximum-fraction-digits', type: Number }) maximumFractionDigits: number;

  /** The minimum number of significant digits to use. Possible values are 1-21. */
  @property({ attribute: 'minimum-significant-digits', type: Number }) minimumSignificantDigits: number;

  /** The maximum number of significant digits to use. Possible values are 1-21. */
  @property({ attribute: 'maximum-significant-digits', type: Number }) maximumSignificantDigits: number;

  /**
   * A custom formatting function to apply to the number. When set, the formatting properties are ignored. Must be set
   * with JavaScript. Property only.
   */
  @property({ attribute: false }) valueFormatter: (value: number) => string;

  connectedCallback() {
    super.connectedCallback();
    this.observer = new IntersectionObserver(entries => {
      this.isIntersecting = entries[entries.length - 1].isIntersecting;
      if (this.isIntersecting && this.isPending) this.start();
    });
    this.observer.observe(this);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.observer?.disconnect();
    this.isIntersecting = false;
    // Resume an interrupted run on reconnect. A finished ticker stays finished.
    if (this.animation) this.isPending = true;
    this.stop();
  }

  @watch('value')
  handleValueChange() {
    this.requestRun();
  }

  /** Plays the ticker again from `startValue` to `value`. */
  restart() {
    this.stop();
    this.displayValue = null;
    this.requestRun();
  }

  private requestRun() {
    this.isPending = true;
    // A run in progress picks up the new value even when offscreen.
    if (this.isIntersecting || this.animation) this.start();
  }

  private start() {
    const from = this.displayValue ?? this.startValue;
    const to = this.value;
    // The delay only applies when counting from the start value, not to later value changes.
    const delay = this.displayValue === null && Number.isFinite(this.delay) ? this.delay : 0;

    this.stop();
    this.isPending = false;

    if (prefersReducedMotion() || !(this.duration > 0) || from === to) {
      this.finish();
      return;
    }

    const options = { duration: this.duration, delay, fill: 'both' } as const;
    let animation: Animation;
    try {
      animation = this.animate(null, { ...options, easing: this.easing });
    } catch {
      // Invalid easing.
      animation = this.animate(null, { ...options, easing: DEFAULT_EASING });
    }
    this.animation = animation;

    // The effect's computed progress is already eased. Idle means something else canceled the animation.
    const tick = () => {
      if (animation.playState === 'finished' || animation.playState === 'idle') {
        this.finish();
        return;
      }
      // Leave displayValue null during the delay so a run that's interrupted then keeps its delay.
      if (Number(animation.currentTime) >= delay) {
        const progress = animation.effect?.getComputedTiming().progress ?? 0;
        this.displayValue = from + (to - from) * progress;
      }
      this.frame = requestAnimationFrame(tick);
    };
    tick();
  }

  private async finish() {
    this.stop();
    this.displayValue = this.value;
    await this.updateComplete;
    // Skip the event if a newer run started while rendering.
    if (this.animation || this.isPending) return;
    this.dispatchEvent(new WaFinishEvent());
  }

  private stop() {
    cancelAnimationFrame(this.frame);
    this.animation?.cancel();
    this.animation = undefined;
  }

  private format(n: number) {
    if (isNaN(n)) return '';

    try {
      if (typeof this.valueFormatter === 'function') return this.valueFormatter(n);

      // Plain decimals keep a steady number of decimal places while counting.
      const hasDigitOptions = [
        this.minimumFractionDigits,
        this.maximumFractionDigits,
        this.minimumSignificantDigits,
        this.maximumSignificantDigits,
      ].some(digits => digits != null);
      const decimals =
        this.type === 'decimal' && !hasDigitOptions
          ? Math.max(decimalPlaces(this.startValue), decimalPlaces(this.value))
          : undefined;

      const options: Intl.NumberFormatOptions = {
        style: this.type,
        currency: this.currency,
        currencyDisplay: this.currencyDisplay,
        useGrouping: !this.withoutGrouping,
        minimumIntegerDigits: this.minimumIntegerDigits,
        // When only one fraction digit option is set, use it for both so the width stays steady.
        minimumFractionDigits: decimals ?? this.minimumFractionDigits ?? this.maximumFractionDigits,
        maximumFractionDigits: decimals ?? this.maximumFractionDigits ?? this.minimumFractionDigits,
        minimumSignificantDigits: this.minimumSignificantDigits,
        maximumSignificantDigits: this.maximumSignificantDigits,
      };
      const text = this.localize.number(n, options);

      // A negative number that rounds to zero formats as -0. Show plain zero instead.
      return n < 0 && text === this.localize.number(-0, options) ? this.localize.number(0, options) : text;
    } catch {
      // Invalid formatting options or a throwing formatter. Render nothing instead of throwing every frame.
      return '';
    }
  }

  render() {
    const shown = this.format(this.displayValue ?? this.startValue);
    const final = this.format(this.value);

    // Once settled, render the number once so it isn't duplicated when selected and copied.
    if (shown === final) return html`<span>${final}</span>`;

    // No whitespace between the spans so it doesn't render inside white-space: pre.
    return html`<span aria-hidden="true">${shown}</span><span class="wa-visually-hidden">${final}</span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-number-ticker': WaNumberTicker;
  }
}
