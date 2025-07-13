import type { PropertyValues, TemplateResult } from 'lit';
import { html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { repeat } from 'lit/directives/repeat.js';
import { utcFormat as format, getDaysInMonth, utcParse as parse, toSegment } from '../../internal/utils/date/date.js';
import { Locale } from '../../internal/utils/date/Locale.js';
import { addUnit, isAfter, isBefore, isToday } from '../../internal/utils/date/shared.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import '../icon/icon.js';
import styles from './calendar.css';

/**
 * @summary A calendar component that supports single date, multiple dates, and date range selection.
 * @documentation https://backers.webawesome.com/docs/components/calendar
 * @status experimental
 * @since 3.x
 *
 * @dependency wa-icon
 *
 * @event change - Emitted when the user commits an alteration to the control's value.
 * @event input - Emitted when the control receives input.
 *
 * @slots header - The header slot.
 *
 * @csspart base - The calendar's base wrapper.
 * @csspart heading - The calendar's heading - showing month and year.
 * @csspart weekday - The weekday header cells.
 * @csspart weeknumber-header - The week number header cell.
 * @csspart weeknumber - The week number cells.
 * @csspart day - The base part for all date cells.
 * @csspart today - The today's date cell.
 * @csspart selected - The selected date cell.
 * @csspart range-start - The start date of a range selection.
 * @csspart range-end - The end date of a range selection.
 * @csspart in-range - The dates within a range selection.
 * @csspart outside - The dates outside the current month.
 * @csspart disabled - The disabled date cells.
 */
@customElement('wa-calendar')
export default class WaCalendar extends WebAwesomeElement {
  static css = [styles];

  @state() protected currentDate = new Date();
  @state() protected focusedDate: Date | null = null;
  @state() protected localeFormatter: Locale;
  @state() private hoverDate: Date | null = null;
  @state() protected viewMode: 'calendar' | 'month' | 'year' = 'calendar';

  /** The type of calendar to display */
  @property({ reflect: true }) type: 'date' | 'multi' | 'range' = 'date';

  /** The selected date(s) in ISO format */
  @property({ attribute: false }) value = '';

  /** The number of months to display per page */
  @property({ type: Number }) months = 1;

  /** Whether to show days outside the month */
  @property({ type: Boolean, attribute: 'show-outside-days' }) showOutsideDays = false;

  /** Weather to show week numbers */
  @property({ type: Boolean, attribute: 'show-week-numbers' }) showWeekNumbers = false;

  /** Disables navigation */
  @property({ type: Boolean, attribute: 'disable-navigation' })
  disableNavigation = false;

  /** The first day of the week; 0 for Sunday, 1 for Monday. */
  @property({ type: Number, attribute: 'first-day-of-week' }) firstDayOfWeek = 1;

  /**
   * The minimum date selectable in the calendar. All dates are expected in ISO-8601 format (YYYY-MM-DD).
   * @default undefined
   */
  @property() min: string;

  /**
   * The maximum date selectable in the calendar. All dates are expected in ISO-8601 format (YYYY-MM-DD).
   * @default undefined
   */
  @property() max: string;

  /** The locale for formatting dates. If not set, will use the browser's locale */
  @property() locale: string | undefined;

  /** Makes the calendar readonly */
  @property({ type: Boolean, reflect: true }) readonly = false;

  /** Function to determine if a date is disallowed */
  @property({ attribute: false }) isDateDisallowed: ((date: Date) => boolean) | undefined;

  @property({ attribute: 'value', reflect: true }) defaultValue: string | null = this.getAttribute('value') || null;

  /** Customize the rendering of week-numbers */
  @property({ attribute: false }) weekNumberFormatter = (weekNumber: number) => `${weekNumber}`;

  /** Controls how the month/year selection is displayed */
  @property({ attribute: 'caption-layout' }) captionLayout: 'buttons' | 'dropdown' | 'none' = 'none';

  constructor() {
    super();
    this.localeFormatter = Locale.fromOptions({ weekday: 'short' }, this.locale || navigator.language);
  }

  connectedCallback() {
    super.connectedCallback();
  }

  updated(changedProperties: PropertyValues<this>) {
    super.updated(changedProperties);

    // 1. Process defaultValue -> value sync
    if (changedProperties.has('defaultValue')) {
      this.value = this.defaultValue || '';
    }

    // 2. Main logic to determine currentDate and focusedDate based on 'value' or 'type'
    // This block should run on initial render and when value/type change.
    if (changedProperties.has('value') || changedProperties.has('type')) {
      let newFocusedDate: Date | null = null;
      let newCurrentDate: Date | null = null;

      if (this.value) {
        let parsedValueDate: Date | null;
        if (this.type === 'range') {
          const [start] = this.value.split('/');
          parsedValueDate = start ? parse(start) : null;
        } else if (this.type === 'multi') {
          const [firstDate] = this.value.split(/[, ]+/).filter(Boolean);
          parsedValueDate = firstDate ? parse(firstDate) : null;
        } else {
          parsedValueDate = parse(this.value);
        }

        if (parsedValueDate && !Number.isNaN(parsedValueDate.getTime())) {
          newFocusedDate = parsedValueDate;
          newCurrentDate = parse({
            year: parsedValueDate.getUTCFullYear(),
            month: parsedValueDate.getUTCMonth(),
            day: 1,
          });
        }
      }

      // Apply newCurrentDate if it's different from the current one to avoid infinite loops.
      // This ensures the displayed month updates when a value is set/changed.
      if (
        newCurrentDate &&
        (newCurrentDate.getUTCFullYear() !== this.currentDate.getUTCFullYear() ||
          newCurrentDate.getUTCMonth() !== this.currentDate.getUTCMonth())
      ) {
        this.currentDate = newCurrentDate;
      } else if (!newCurrentDate && this.value === '') {
        // If value is cleared and no newCurrentDate, ensure currentDate is aligned to default or today.
        // If it's already set to a navigated month, keep it.
        // This prevents the calendar from jumping back to today if a value was cleared after navigation.
        // No explicit update to this.currentDate here; it's handled by navigation or initial constructor value.
      }

      // Set focusedDate based on the determined value or fallback to the first day of the current month.
      // We prioritize the newFocusedDate derived from 'value'.
      // If no valid newFocusedDate, fall back to the first day of the *current* `this.currentDate` month.
      // This is crucial for ensuring a `tabindex="0"` exists in the displayed month.
      this.focusedDate =
        newFocusedDate ||
        parse({ year: this.currentDate.getUTCFullYear(), month: this.currentDate.getUTCMonth(), day: 1 });
    }

    // Locale changes
    if (changedProperties.has('locale')) {
      this.localeFormatter = Locale.fromOptions({ weekday: 'short' }, this.locale || navigator.language);
      this.requestUpdate();
    }
  }

  /**
   * Gets the localized month names based on the current locale
   * @returns Array of month names in the current locale
   */
  protected get localizedMonthNames(): string[] {
    const monthFormatter = Locale.fromOptions({ month: 'long' }, this.locale || navigator.language);
    return monthFormatter.monthNames.map(month => month.name.charAt(0).toUpperCase() + month.name.slice(1));
  }

  /**
   * Gets the localized weekday names based on the current locale and first day of week
   * @returns Array of weekday names in the current locale
   */
  protected get localizedWeekDays(): string[] {
    const weekdays = this.localeFormatter.weekdayNames;
    const firstDay = this.firstDayOfWeek;
    return [...weekdays.slice(firstDay), ...weekdays.slice(0, firstDay)].map(
      day => day.name.charAt(0).toUpperCase() + day.name.slice(1),
    );
  }

  /**
   * Gets the weekdays for the calendar
   * @returns Array of weekday names
   */
  protected getWeekDays(): string[] {
    return this.localizedWeekDays;
  }

  /**
   * Gets all days for a given month, including padding days if showOutsideDays is true
   * @param year - The year to get days for
   * @param month - The month to get days for (0-11)
   * @returns Array of dates or null for padding days
   */
  protected getMonthDays(year: number, month: number): (Date | null)[] {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = parse({ year, month, day: 1 });
    const lastDay = parse({ year, month, day: daysInMonth });
    const firstDayOfWeek = this.firstDayOfWeek;
    const firstDayOfMonth = firstDay.getUTCDay();
    const offset = (firstDayOfMonth - firstDayOfWeek + 7) % 7;
    const lastDayOfWeek = (lastDay.getUTCDay() - firstDayOfWeek + 7) % 7;

    const days: (Date | null)[] = [];

    if (this.showOutsideDays) {
      const prevMonth = month === 0 ? 11 : month - 1;
      const prevMonthYear = month === 0 ? year - 1 : year;
      const prevMonthDays = getDaysInMonth(prevMonthYear, prevMonth);
      for (let i = offset - 1; i >= 0; i--) {
        days.push(parse({ year: prevMonthYear, month: prevMonth, day: prevMonthDays - i }));
      }
    } else {
      for (let i = 0; i < offset; i++) {
        days.push(null);
      }
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(parse({ year, month, day: i }));
    }

    if (this.showOutsideDays) {
      const nextMonth = month === 11 ? 0 : month + 1;
      const nextMonthYear = month === 11 ? year + 1 : year;
      for (let i = 1; i <= 6 - lastDayOfWeek; i++) {
        days.push(parse({ year: nextMonthYear, month: nextMonth, day: i }));
      }
    } else {
      for (let i = 0; i < 6 - lastDayOfWeek; i++) {
        days.push(null);
      }
    }
    return days;
  }

  /**
   * Calculates the week number for a given date
   * @param date - The date to calculate the week number for
   * @returns The week number (1-53)
   */
  protected getWeekNumber(date: Date): number {
    const segment = toSegment(date);
    const firstDayOfYear = parse({ year: segment.year, month: 0, day: 1 });
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getUTCDay() + 1) / 7);
  }

  /**
   * Checks if a date should be disabled based on min, max, readonly, and isDateDisallowed
   * @param date - The date to check
   * @returns True if the date should be disabled
   */
  protected isDateDisabled(date: Date): boolean {
    if (this.readonly) return true;
    if (this.min && date < new Date(this.min)) return true;
    if (this.max && date > new Date(this.max)) return true;
    if (this.isDateDisallowed?.(date)) return true;
    return false;
  }

  protected isDateOutsideMonth(date: Date, month: number): boolean {
    return date.getUTCMonth() !== month;
  }

  protected isDateToday(date: Date): boolean {
    return isToday(format(date));
  }

  private isSameDay(a: Date, b: Date): boolean {
    if (Number.isNaN(a.getTime()) || Number.isNaN(b.getTime())) return false;
    return format(a) === format(b);
  }

  protected isDateSelected(date: Date): boolean {
    switch (this.type) {
      case 'date': {
        if (!this.value) return false;
        const selected = parse(this.value);
        if (Number.isNaN(selected.getTime())) return false;
        return this.isSameDay(date, selected);
      }
      case 'multi': {
        if (!this.value) return false;
        const selectedDates = this.value
          .split(/[, ]+/)
          .filter(Boolean)
          .map(d => parse(d));
        return selectedDates.some(selected => !Number.isNaN(selected.getTime()) && this.isSameDay(date, selected));
      }
      case 'range': {
        const start = this.startDate;
        const end = this.endDate;
        if (!start || !end) return false;
        const dateStr = format(date);
        return !isAfter(dateStr, format(end)) && !isBefore(dateStr, format(start));
      }
      default:
        return false;
    }
  }

  protected get startDate(): Date | null {
    if (this.type !== 'range' || !this.value) return null;
    const [start] = this.value.split('/');
    return start ? parse(start) : null;
  }

  protected get endDate(): Date | null {
    if (this.type !== 'range' || !this.value) return null;
    const [, end] = this.value.split('/');
    return end ? parse(end) : null;
  }

  /**
   * Checks if a date is the start of a range selection
   * @param date - The date to check
   * @returns True if the date is the start of a range
   */
  protected isRangeStart(date: Date): boolean {
    if (this.type !== 'range') return false;

    // During range selection (first date clicked, second not yet),
    // determine the effective start date for visual purposes.
    if (this.startDate && !this.endDate && this.hoverDate) {
      const effectiveStart = this.startDate < this.hoverDate ? this.startDate : this.hoverDate;
      return this.isSameDay(date, effectiveStart);
    }
    // Otherwise, use the committed start date for a completed range
    const start = this.startDate;
    if (!start) return false;
    return this.isSameDay(date, start);
  }

  /**
   * Checks if a date is the end of a range selection
   * @param date - The date to check
   * @returns True if the date is the end of a range
   */
  protected isRangeEnd(date: Date): boolean {
    if (this.type !== 'range') return false;

    // During range selection (first date clicked, second not yet),
    // determine the effective end date for visual purposes.
    if (this.startDate && !this.endDate && this.hoverDate) {
      const effectiveEnd = this.startDate > this.hoverDate ? this.startDate : this.hoverDate;
      return this.isSameDay(date, effectiveEnd);
    }
    // Otherwise, use the committed end date for a completed range,
    // or the hovered date if only the start is present (for the case where hoverDate is later than startDate)
    const end = this.endDate || this.hoverDate;
    if (!end) return false;
    return this.isSameDay(date, end);
  }

  /**
   * Checks if a date is within a selected range (including hover preview)
   * @param date - The date to check
   * @returns True if the date is within the range
   */
  protected isDateInRange(date: Date): boolean {
    if (this.type !== 'range') return false;

    let start = this.startDate;
    let end = this.endDate;

    // If only the start date is selected and we are hovering,
    // use hoverDate as the provisional end to determine the preview range.
    if (start && !end && this.hoverDate) {
      // Ensure provisionalStart is always chronologically earlier and provisionalEnd is later
      const provisionalStart = start < this.hoverDate ? start : this.hoverDate;
      const provisionalEnd = start > this.hoverDate ? start : this.hoverDate;
      start = provisionalStart;
      end = provisionalEnd;
    }

    if (!start || !end) return false;

    const dateStr = format(date);
    const startStr = format(start);
    const endStr = format(end);

    // The start and end dates are now guaranteed to be in chronological order (start <= end)
    return dateStr > startStr && dateStr < endStr;
  }

  /**
   * Handles mouse hover over a date for range selection
   */
  protected handleDateHover(date: Date) {
    if (this.type !== 'range' || !this.startDate || this.endDate) return;
    this.hoverDate = date;
  }

  /**
   * Handles mouse leave from a date for range selection
   */
  protected handleDateLeave() {
    if (this.type !== 'range') return;
    this.hoverDate = null;
  }

  /**
   * Handles keyboard navigation for date selection
   * @param e - The keyboard event
   * @param date - The current focused date (the one with tabindex=0)
   */
  protected async handleKeyDown(e: KeyboardEvent, date: Date) {
    let newDate: Date;
    const dateStr = format(date);

    switch (e.key) {
      case 'ArrowRight':
        newDate = parse(addUnit(dateStr, 'day', 1));
        break;
      case 'ArrowLeft':
        newDate = parse(addUnit(dateStr, 'day', -1));
        break;
      case 'ArrowDown':
        newDate = parse(addUnit(dateStr, 'day', 7));
        break;
      case 'ArrowUp':
        newDate = parse(addUnit(dateStr, 'day', -7));
        break;
      case 'PageUp':
        newDate = parse(addUnit(dateStr, e.shiftKey ? 'year' : 'month', -1));
        break;
      case 'PageDown':
        newDate = parse(addUnit(dateStr, e.shiftKey ? 'year' : 'month', 1));
        break;
      case 'Home':
        // Go to the first day of the first displayed month.
        newDate = parse({ year: this.currentDate.getUTCFullYear(), month: this.currentDate.getUTCMonth(), day: 1 });
        break;
      case 'End':
        // Go to the last day of the last displayed month.
        newDate = parse({
          year: this.currentDate.getUTCFullYear(),
          month: this.currentDate.getUTCMonth() + this.months,
          day: 0,
        }); // Correctly targets last day of the last displayed month
        break;
      case 'Enter':
      case ' ':
        if (!this.readonly && !this.isDateDisabled(date)) {
          this.handleDateClick(date);
        }
        e.preventDefault();
        return;
      default:
        return;
    }

    const cleanedNewDate = new Date(newDate.getUTCFullYear(), newDate.getUTCMonth(), newDate.getUTCDate());

    if (!this.isDateDisabled(cleanedNewDate)) {
      this.focusedDate = cleanedNewDate;

      if (this.type === 'range' && this.startDate && !this.endDate) {
        this.hoverDate = cleanedNewDate;
      }

      // Determine the range of currently displayed months
      const firstDisplayedMonthStart = parse({
        year: this.currentDate.getUTCFullYear(),
        month: this.currentDate.getUTCMonth(),
        day: 1,
      });
      const lastDisplayedMonthEnd = parse({
        year: this.currentDate.getUTCFullYear(),
        month: this.currentDate.getUTCMonth() + this.months,
        day: 0,
      }); // Last day of the last displayed month

      // Check if the new focused date falls outside the current block of displayed months.
      const isNewDateBeforeFirstDisplayed = cleanedNewDate < firstDisplayedMonthStart;
      const isNewDateAfterLastDisplayed = cleanedNewDate > lastDisplayedMonthEnd;

      if (isNewDateBeforeFirstDisplayed || isNewDateAfterLastDisplayed) {
        // If outside, adjust currentDate to bring the new focusedDate into view.
        // For multi-month display, we want to align the first month of the view with the new focused month.
        this.currentDate = parse({
          year: cleanedNewDate.getUTCFullYear(),
          month: cleanedNewDate.getUTCMonth(),
          day: 1,
        });
      }
    }

    this.requestUpdate();
    await this.updateComplete;

    const newlyFocusedButton = this.shadowRoot?.querySelector('button[tabindex="0"]');
    if (newlyFocusedButton) {
      (newlyFocusedButton as HTMLElement).focus();
    }

    e.preventDefault();
  }

  /**
   * Handles date selection based on the calendar type
   * @param date - The selected date
   */
  protected handleDateClick(date: Date) {
    if (this.isDateDisabled(date)) return;

    this.focusedDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());

    switch (this.type) {
      case 'date': {
        this.value = format(date);
        this.defaultValue = this.value;
        break;
      }
      case 'multi': {
        const iso = format(date);
        const selectedDates = this.value.split(/[, ]+/).filter(Boolean);
        const index = selectedDates.indexOf(iso);
        if (index > -1) {
          selectedDates.splice(index, 1);
        } else {
          selectedDates.push(iso);
        }
        this.value = selectedDates.join(' ');
        this.defaultValue = this.value;
        break;
      }
      case 'range': {
        const iso = format(date);
        const start = this.startDate;
        const end = this.endDate;

        if (!start || (start && end)) {
          // If no start or both start/end are set, start a new range
          this.value = `${iso}/`;
          this.defaultValue = this.value;
          this.hoverDate = null; // Clear hoverDate when starting a new range
        } else if (start && !end) {
          // If only start is set, set the end of the range
          if (isBefore(iso, format(start))) {
            this.value = `${iso}/${format(start)}`;
          } else {
            this.value = `${format(start)}/${iso}`;
          }
          this.defaultValue = this.value;
          this.hoverDate = null; // Clear hoverDate when the range is completed
        }
        break;
      }
    }

    this.requestUpdate();

    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
  }

  /**
   * Navigates to the previous month(s)
   */
  protected handlePreviousMonth() {
    if (this.disableNavigation) return;
    const currentDateStr = format(this.currentDate);
    const newCurrentDate = parse(addUnit(currentDateStr, 'month', -this.months));
    this.currentDate = newCurrentDate;
    this.focusedDate = parse({ year: newCurrentDate.getUTCFullYear(), month: newCurrentDate.getUTCMonth(), day: 1 });
  }

  /**
   * Navigates to the next month(s)
   */
  protected handleNextMonth() {
    if (this.disableNavigation) return;
    const currentDateStr = format(this.currentDate);
    const newCurrentDate = parse(addUnit(currentDateStr, 'month', this.months));
    this.currentDate = newCurrentDate;
    this.focusedDate = parse({ year: newCurrentDate.getUTCFullYear(), month: newCurrentDate.getUTCMonth(), day: 1 });
  }

  /**
   * Renders a single month view
   * @param year - The year to render
   * @param month - The month to render (0-11)
   * @returns The rendered month template
   */
  protected renderMonth(year: number, month: number) {
    const days = this.getMonthDays(year, month);
    const weekDays = this.localizedWeekDays;
    const weeks: (Date | null)[][] = [];
    let currentWeek: (Date | null)[] = [];

    days.forEach(date => {
      currentWeek.push(date);
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    });

    if (currentWeek.length > 0) {
      weeks.push(currentWeek);
    }

    return html`
      <div class="calendar-month">
        <div class="calendar-grid">
          <table class="calendar-table">
            <thead>
              <tr>
                ${this.showWeekNumbers ? html`<th class="weeknumber" part="weeknumber-header"></th>` : nothing}
                ${repeat(
                  weekDays,
                  day => day,
                  day => html`<th part="weekday">${day}</th>`,
                )}
              </tr>
            </thead>

            <tbody>
              ${repeat(
                weeks,
                week => (week[0] ? format(week[0]) : String(Math.random())),
                week => html`
                  <tr>
                    ${this.showWeekNumbers
                      ? html`
                          <td class="weeknumber" part="weeknumber">
                            ${week.find(d => d)?.getDate()
                              ? /* biome-ignore lint/style/noNonNullAssertion: We know that at least one date exists in the week */
                                this.weekNumberFormatter(this.getWeekNumber(week.find(d => d)!))
                              : ''}
                          </td>
                        `
                      : nothing}
                    ${repeat(
                      week,
                      date => (date ? format(date) : String(Math.random())),
                      date =>
                        date
                          ? html`
                              <td>
                                <button
                                  class=${classMap({
                                    outside: this.isDateOutsideMonth(date, month),
                                    disabled: this.isDateDisabled(date),
                                    selected: this.isDateSelected(date),
                                    'in-range': this.isDateInRange(date),
                                    today: this.isDateToday(date),
                                    'range-start': this.isRangeStart(date),
                                    'range-end': this.isRangeEnd(date),
                                  })}
                                  part=${[
                                    'day',
                                    this.isDateToday(date) ? 'today' : '',
                                    this.isDateSelected(date) ? 'selected' : '',
                                    this.isRangeStart(date) ? 'range-start' : '',
                                    this.isRangeEnd(date) ? 'range-end' : '',
                                    this.isDateInRange(date) ? 'in-range' : '',
                                    this.isDateOutsideMonth(date, month) ? 'outside' : '',
                                    this.isDateDisabled(date) ? 'disabled' : '',
                                    this.isDateDisallowed?.(date) ? 'disallowed' : '',
                                  ]
                                    .filter(Boolean)
                                    .join(' ')}
                                  ?disabled=${this.isDateDisabled(date)}
                                  ?aria-disabled=${this.isDateDisabled(date) ? 'true' : undefined}
                                  ?aria-pressed=${this.isDateSelected(date) ? 'true' : undefined}
                                  aria-current=${this.isDateToday(date) ? 'date' : undefined}
                                  aria-label=${`${this.localizedMonthNames[date.getUTCMonth()]} ${date.getUTCDate()}`}
                                  tabindex=${this.focusedDate && this.isSameDay(date, this.focusedDate) ? 0 : -1}
                                  @click=${() => this.handleDateClick(date)}
                                  @keydown=${(e: KeyboardEvent) => this.handleKeyDown(e, date)}
                                  @mouseenter=${() => this.handleDateHover(date)}
                                  @mouseleave=${() => this.handleDateLeave()}
                                >
                                  ${date.getUTCDate()}
                                </button>
                              </td>
                            `
                          : html`<td></td>`,
                    )}
                  </tr>
                `,
              )}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  protected handleMonthYearClick() {
    if (this.captionLayout === 'none') return; // Do not switch view if captions are disabled
    this.viewMode = 'month';
  }

  protected handleYearClick() {
    if (this.captionLayout === 'none') return; // Do not switch view if captions are disabled
    this.viewMode = 'year';
  }

  // Modified handlers to accept a date if coming from a specific month's header
  protected handleMonthSelect(month: number) {
    this.currentDate = parse({ year: this.currentDate.getUTCFullYear(), month, day: 1 });
    this.viewMode = 'calendar';
  }

  // Modified handlers to accept a date if coming from a specific month's header
  protected handleYearSelect(year: number) {
    this.currentDate = parse({ year, month: this.currentDate.getUTCMonth(), day: 1 });
    this.viewMode = 'calendar';
  }

  protected handlePreviousYear() {
    this.currentDate = parse({
      year: this.currentDate.getUTCFullYear() - 1,
      month: this.currentDate.getUTCMonth(),
      day: 1,
    });
  }

  protected handleNextYear() {
    this.currentDate = parse({
      year: this.currentDate.getUTCFullYear() + 1,
      month: this.currentDate.getUTCMonth(),
      day: 1,
    });
  }

  protected handlePreviousYearRange() {
    const currentYear = this.currentDate.getUTCFullYear();
    this.currentDate = parse({ year: currentYear - 12, month: this.currentDate.getUTCMonth(), day: 1 });
  }

  protected handleNextYearRange() {
    const currentYear = this.currentDate.getUTCFullYear();
    this.currentDate = parse({ year: currentYear + 12, month: this.currentDate.getUTCMonth(), day: 1 });
  }

  /**
   * Renders the calendar component
   * @returns The rendered calendar template
   */
  render() {
    switch (this.viewMode) {
      case 'month':
        return this.renderMonthSelection();
      case 'year':
        return this.renderYearSelection();
      default:
        return this.renderCalendarView();
    }
  }

  protected renderMonthSelection() {
    const months = this.localizedMonthNames;
    const currentMonth = this.currentDate.getUTCMonth();
    const currentYear = this.currentDate.getUTCFullYear();

    return html`
      <div class="month-selection">
        <div class="header">
          <span class="current-year">${currentYear}</span>
          <div class="navigation">
            <button @click=${() => this.handlePreviousYear()}>
              <wa-icon name="chevron-left"></wa-icon>
            </button>
            <button @click=${() => this.handleNextYear()}>
              <wa-icon name="chevron-right"></wa-icon>
            </button>
          </div>
        </div>
        <div class="months-grid">
          ${months.map(
            (m, index) => html`
              <button
                class=${classMap({
                  'month-button': true,
                  selected: index === currentMonth,
                })}
                @click=${() => this.handleMonthSelect(index)}
              >
                ${m}
              </button>
            `,
          )}
        </div>
      </div>
    `;
  }

  protected renderYearSelection() {
    const currentYear = this.currentDate.getUTCFullYear();
    const startYear = currentYear - 5;
    const years = Array.from({ length: 12 }, (_, i) => startYear + i);

    return html`
      <div class="year-selection">
        <div class="header">
          <span class="year-range">${startYear}-${startYear + 11}</span>
          <div class="navigation">
            <button @click=${() => this.handlePreviousYearRange()}>
              <wa-icon name="chevron-left"></wa-icon>
            </button>
            <button @click=${() => this.handleNextYearRange()}>
              <wa-icon name="chevron-right"></wa-icon>
            </button>
          </div>
        </div>
        <div class="years-grid">
          ${years.map(
            year => html`
              <button
                class=${classMap({
                  'year-button': true,
                  selected: year === currentYear,
                })}
                @click=${() => this.handleYearSelect(year)}
              >
                ${year}
              </button>
            `,
          )}
        </div>
      </div>
    `;
  }

  protected renderCalendarView() {
    const year = this.currentDate.getUTCFullYear();
    const month = this.currentDate.getUTCMonth();
    const monthsArray = Array.from({ length: this.months }, (_, i) => parse({ year, month: month + i, day: 1 }));

    // Determine the content for the main header's center section
    let mainHeaderCenterContent: TemplateResult | string;
    if (this.months === 1) {
      // Single month view: apply captionLayout (buttons, dropdown, or none)
      switch (this.captionLayout) {
        case 'buttons':
          mainHeaderCenterContent = html`
            <div class="calendar-heading">
              <button @click=${this.handleMonthYearClick}>${this.localizedMonthNames[month]}</button>
              <button @click=${this.handleYearClick}>${year}</button>
            </div>
          `;
          break;
        case 'dropdown':
          mainHeaderCenterContent = html`
            <div class="calendar-heading">
              <select @change=${(e: Event) => this.handleMonthSelect(Number((e.target as HTMLSelectElement).value))}>
                ${this.localizedMonthNames.map(
                  (name, index) => html`<option value=${index} ?selected=${index === month}>${name}</option>`,
                )}
              </select>
              <select @change=${(e: Event) => this.handleYearSelect(Number((e.target as HTMLSelectElement).value))}>
                ${Array.from({ length: 12 }, (_, i) => year - 5 + i).map(
                  y => html`<option value=${y} ?selected=${y === year}>${y}</option>`,
                )}
              </select>
            </div>
          `;
          break;
        default:
          mainHeaderCenterContent = html`
            <div class="calendar-heading">${this.localizedMonthNames[month]} ${year}</div>
          `;
      }
    } else {
      // Multiple months view: always show simple range text
      const firstMonthDisplayed = monthsArray[0];
      const lastMonthDisplayed = monthsArray[monthsArray.length - 1];
      mainHeaderCenterContent = html`
        <div part="heading" class="calendar-heading main-heading">
          ${this.localizedMonthNames[firstMonthDisplayed.getUTCMonth()]} ${firstMonthDisplayed.getUTCFullYear()} –
          ${this.localizedMonthNames[lastMonthDisplayed.getUTCMonth()]} ${lastMonthDisplayed.getUTCFullYear()}
        </div>
      `;
    }

    return html`
      <div class="calendar-container">
        <div class="calendar-header">
          ${!this.disableNavigation
            ? html`
                <button
                  part="button previous"
                  class="navigation-button"
                  @click=${this.handlePreviousMonth}
                  aria-label="Previous month"
                >
                  <wa-icon name="chevron-left"></wa-icon>
                </button>
              `
            : nothing}
          ${mainHeaderCenterContent}
          ${!this.disableNavigation
            ? html`
                <button
                  part="button next"
                  class="navigation-button"
                  @click=${this.handleNextMonth}
                  aria-label="Next month"
                >
                  <wa-icon name="chevron-right"></wa-icon>
                </button>
              `
            : nothing}
        </div>
        <div class="calendar-months-row" style="display: flex; gap: 2em;">
          ${monthsArray.map(
            date => html`
              <div class="calendar-month-container">${this.renderMonth(date.getUTCFullYear(), date.getUTCMonth())}</div>
            `,
          )}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-calendar': WaCalendar;
  }
}
