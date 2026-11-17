import type { PropertyValues } from 'lit';
import { html, isServer } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { WaFinishEvent } from '../../events/finish.js';
import { watch } from '../../internal/watch.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import visuallyHidden from '../../styles/component/visually-hidden.styles.js';
import { LocalizeController } from '../../utilities/localize.js';
import styles from './counter.styles.js';
import type { CounterUnit } from './duration.js';
import { counterUnits, getDuration, unitLengths } from './duration.js';

export type { CounterUnit };

const defaultUnits: CounterUnit[] = ['days', 'hours', 'minutes', 'seconds'];
const formatters = new Map<string, Intl.NumberFormat>();

/** Returns a cached number formatter, since counters format several values every second. */
function getFormatter(lang: string, options: Intl.NumberFormatOptions) {
  const key = lang + JSON.stringify(options);
  let formatter = formatters.get(key);

  if (!formatter) {
    formatter = new Intl.NumberFormat(lang, options);
    formatters.set(key, formatter);
  }

  return formatter;
}

/** Returns a number formatter for a unit, such as "5 days" or "5 hr". */
function getUnitFormatter(lang: string, unit: CounterUnit, unitDisplay: 'long' | 'short' | 'narrow') {
  return getFormatter(lang, { style: 'unit', unit: unit.slice(0, -1), unitDisplay });
}

/**
 * @summary Counters count down to a date or up from one, ticking through years, months, days, and smaller units. Use
 *  them for launch countdowns, sale timers, and showing how long something has been running.
 * @documentation https://webawesome.com/docs/components/counter
 * @status experimental
 * @since 3.15
 *
 * @slot years - A custom label for years.
 * @slot months - A custom label for months.
 * @slot days - A custom label for days.
 * @slot hours - A custom label for hours.
 * @slot minutes - A custom label for minutes.
 * @slot seconds - A custom label for seconds.
 *
 * @event wa-finish - Emitted when a running countdown reaches zero. Not emitted when the date had already passed.
 *
 * @csspart unit - The container that wraps each unit's value and label.
 * @csspart value - Each unit's value.
 * @csspart label - Each unit's label.
 * @csspart delimiter - The text shown between units.
 *
 * @cssstate finished - Applied when a countdown is at zero, including one whose date had already passed.
 *
 * @ssr - `<wa-counter>` renders zeros during SSR and doesn't start counting until it hydrates on the client, because the
 *  server can't know the user's clock.
 */
@customElement('wa-counter')
export default class WaCounter extends WebAwesomeElement {
  static css = [styles, visuallyHidden];

  private readonly localize = new LocalizeController(this);
  private isCountingDown = false;
  private pausedAt: number | null = null;
  private shift = 0;
  private startedAt = 0;
  private timeout: ReturnType<typeof setTimeout>;
  private values: Partial<Record<CounterUnit, number>> = {};

  /**
   * The date to count down to, or up from. When passing a string, it's strongly recommended to use the ISO 8601 format
   * to ensure timezones are handled correctly. To convert a date to this format in JavaScript, use
   * [`date.toISOString()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString).
   * When omitted and `direction` is `up`, the counter counts from the moment it starts.
   */
  @property() date: Date | string;

  /** The direction to count. Use `down` to count down to the date and `up` to count up from it. */
  @property({ reflect: true }) direction: 'down' | 'up' = 'down';

  /** A label that describes the counter to assistive devices. */
  @property() label = '';

  /**
   * The largest unit to show. Time beyond it rolls up into it, so two days show as 48 hours when this is `hours`. Units
   * at zero ahead of the first non-zero unit are hidden unless `without-labels` is set. Falls back to the default range
   * when either unit is invalid or the smallest unit is larger than the largest.
   */
  @property({ attribute: 'largest-unit' }) largestUnit: CounterUnit = 'days';

  /**
   * The smallest unit to show. Time below it is dropped. Falls back to the default range when either unit is invalid or
   * the smallest unit is larger than the largest.
   */
  @property({ attribute: 'smallest-unit' }) smallestUnit: CounterUnit = 'seconds';

  /** The formatting style of the unit labels. */
  @property() format: 'long' | 'short' | 'narrow' = 'long';

  /** Hides the unit labels. */
  @property({ attribute: 'without-labels', type: Boolean, reflect: true }) withoutLabels = false;

  /** Text to show between units, such as `:`. */
  @property() delimiter = '';

  /** Pauses the counter. When it's removed, counting continues from the time shown. */
  @property({ type: Boolean, reflect: true }) paused = false;

  /**
   * A custom formatting function to apply to each unit's value. It receives the value and its unit. Screen readers still
   * read the unformatted value. Must be set with JavaScript. Property only.
   */
  @property({ attribute: false }) valueFormatter: (value: number, unit: CounterUnit) => string;

  connectedCallback() {
    super.connectedCallback();

    if (isServer) {
      return;
    }

    this.startedAt ||= Date.now();

    // Resume after being moved or reattached
    if (this.hasUpdated) {
      this.tick();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearTimeout(this.timeout);
  }

  willUpdate(changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties);

    // The server can't know the user's clock, so the server and the first hydrated render both show zeros
    if (isServer || (this.didSSR && !this.hasUpdated)) {
      return;
    }

    if (changedProperties.has('date')) {
      this.shift = 0;
      this.pausedAt = null;
      this.isCountingDown = false;
    }

    // Shift the date by the time spent paused so counting continues from the time shown
    if (this.paused) {
      this.pausedAt ??= Date.now();
    } else if (this.pausedAt !== null) {
      this.shift += Date.now() - this.pausedAt;
      this.pausedAt = null;
    }

    this.tick();
  }

  firstUpdated(changedProperties: PropertyValues<this>) {
    super.firstUpdated(changedProperties);

    // Start counting once hydration has finished
    if (this.didSSR) {
      this.updateComplete.then(() => this.requestUpdate());
    }
  }

  /** Returns the units to show, largest to smallest. */
  private getUnits() {
    const start = counterUnits.indexOf(this.largestUnit);
    const end = counterUnits.indexOf(this.smallestUnit);
    return start < 0 || end < 0 || start > end ? defaultUnits : counterUnits.slice(start, end + 1);
  }

  /** Computes the values from the clock, re-renders when one changes, and schedules the next tick. */
  private tick() {
    clearTimeout(this.timeout);

    const base = this.date ? new Date(this.date).getTime() : this.direction === 'up' ? this.startedAt : NaN;
    const target = base + this.shift;
    const now = this.pausedAt ?? Date.now();
    const isDown = this.direction !== 'up';
    const diff = isDown ? target - now : now - target;
    const units = this.getUnits();
    // Countdowns round up to the smallest unit so zero arrives with the finish. Count-ups round down.
    const step = (isDown && unitLengths[units[units.length - 1]]) || 1000;
    const shown = Math.max(0, (isDown ? Math.ceil(diff / step) : Math.floor(diff / step)) * step);
    const isFinished = isDown && shown === 0;
    let values: Partial<Record<CounterUnit, number>> = {};

    if (!isNaN(diff)) {
      const from = isDown ? target - shown : target;
      values = getDuration(new Date(from), new Date(from + shown), units[0], units[units.length - 1], isDown);
    }

    if (counterUnits.some(unit => values[unit] !== this.values[unit])) {
      this.values = values;
      this.requestUpdate();
    }

    this.customStates.set('finished', isFinished);

    if (!isNaN(diff) && !isFinished && this.pausedAt === null && this.isConnected) {
      // Wake at the next whole second of the difference so the display changes on time and counters stay in step
      const delay = isDown ? diff % step || step : 1000 - (((diff % 1000) + 1000) % 1000);
      this.timeout = setTimeout(() => this.tick(), delay);
    }

    // Only a countdown that reaches zero while running finishes, not one that starts at zero
    if (isFinished && this.isCountingDown) {
      // Wait for the zeros to render so listeners see the finished counter
      this.updateComplete.then(() => this.dispatchEvent(new WaFinishEvent()));
    }
    this.isCountingDown = isDown && shown > 0;
  }

  private formatValue(lang: string, value: number, unit: CounterUnit) {
    if (typeof this.valueFormatter === 'function') {
      try {
        return this.valueFormatter(value, unit);
      } catch {
        return '';
      }
    }

    return getFormatter(lang, { minimumIntegerDigits: 2 }).format(value);
  }

  /** Returns the localized label for a unit, pluralized for its value. */
  private getLabel(lang: string, value: number, unit: CounterUnit) {
    const unitDisplay = this.format === 'short' || this.format === 'narrow' ? this.format : 'long';

    return getUnitFormatter(lang, unit, unitDisplay)
      .formatToParts(value)
      .filter(part => part.type === 'unit')
      .map(part => part.value)
      .join('');
  }

  @watch('label')
  handleLabelChange() {
    if (this.internals) {
      this.internals.role = 'timer';
      this.internals.ariaLabel = this.label || null;
    }
  }

  render() {
    const lang = this.localize.lang();
    const units = this.getUnits();
    // Skip leading zero units, but keep the smallest unit when everything is zero
    const firstNonZero = units.findIndex(unit => this.values[unit]);
    const spokenUnits = units.slice(firstNonZero < 0 ? -1 : firstNonZero);
    const phrase = spokenUnits
      .map(unit => getUnitFormatter(lang, unit, 'long').format(this.values[unit] ?? 0))
      .join(' ');

    // Clock-style counters keep every unit so the digits hold their place. So does a counter with no time to show,
    // which keeps the server render and an empty counter the same size as a running one.
    const hasValues = Object.keys(this.values).length > 0;
    const shownUnits = this.withoutLabels || !hasValues ? units : spokenUnits;

    // Every unit reserves room for the widest label of any unit, so the units are evenly spaced and a unit doesn't
    // resize when its label changes between plural forms
    const widestLabels = units.map(unit =>
      [0, 1, 2, 5]
        .map(sample => this.getLabel(lang, sample, unit))
        .reduce((widest, sample) => (sample.length > widest.length ? sample : widest)),
    );
    const sizerSpans = widestLabels.map(label => html`<span class="sizer" aria-hidden="true">${label}</span>`);

    // No whitespace between elements so the template is safe inside white-space: pre
    const unitTemplates = shownUnits.map((unit, index) => {
      const value = this.values[unit] ?? 0;
      const label = this.getLabel(lang, value, unit);
      const delimiterSpan = html`<span part="delimiter" class="delimiter" aria-hidden="true">${this.delimiter}</span>`;
      const valueSpan = html`<span part="value" class="value">${this.formatValue(lang, value, unit)}</span>`;
      const defaultLabel = html`<span class="default-label"><span>${label}</span>${sizerSpans}</span>`;
      const labelSpan = html`<span part="label" class="label"><slot name=${unit}>${defaultLabel}</slot></span>`;
      const unitSpan = html`<span part="unit" class="unit" aria-hidden="true">${valueSpan}${labelSpan}</span>`;

      return index > 0 && this.delimiter ? html`${delimiterSpan}${unitSpan}` : unitSpan;
    });

    return html`<span class="wa-visually-hidden">${phrase}</span>${unitTemplates}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-counter': WaCounter;
  }
}
