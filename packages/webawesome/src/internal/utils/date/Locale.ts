import { Format as DateFormat } from './date.js';
import { Format as DateTimeFormat } from './datetime.js';
import type { Format } from './shared.js';
import { getFormat, utcFormat, utcParse } from './shared.js';
import { Format as TimeFormat } from './time.js';
import { DAYS_IN_WEEK, HOURS_IN_DAY, HOURS_OF_NOON, MONTHS_IN_YEAR, YEARS_IN_CENTURY } from './timestamps.js';
import { throwInvalidValue } from './utils.js';

// Support weak formatting, when units may start from 0 or 0 can be skipped
// so both values are the same: 01/01/2022 and 1/1/2022
// These expressions are different to ones defined for date.js and time.js, which are always strict

// Years, covers full year YYYY
const YYYY = '(\\d{1,4})';
// Years, covers 2-digit year
const YY = '(\\d{2})';
// Numeric months: 1, 01, 12
const MM = '([1-9]{1}|0[1-9]|1[0-2])';
// Days: 1, 01, 19, 29 or 31. Extra validation added to check for number of days after parsing
const DD = '([1-9]{1}|0[1-9]|1\\d{1}|2\\d{1}|3[0-1])';
// Hour system using 0–23; corresponds to 'H' in patterns. The 24 hour clock, with midnight starting at 0:00.
// This is used in Europe and most of the world
const H23 = '(\\d{1}|[0-1]\\d{1}|2[0-3])';
// Hour system using 1–12; corresponds to 'h' in patterns. The 12 hour clock, with midnight starting at 12:00 am.
// This is used in the USA
const H12 = '([1-9]{1}|0[1-9]|1[0-2])';
// Hour system using 1–24; corresponds to 'k' in pattern.
// The 24 hour clock, with midnight starting at 24:00.
const H24 = '([1-9]{1}|0[1-9]|1\\d{1}|2[0-4])';
// Hour system using 0–11; corresponds to 'K' in patterns.
// The 12 hour clock, with midnight starting at 0:00 am.
const H11 = '(\\d{1}|0\\d{1}|1[0-1])';
// Minutes
const mm = '(\\d{1}|[0-5]\\d{1})';
// Seconds
const ss = '(\\d{1}|[0-5]\\d{1})';
// Milliseconds to match fractionalSecond
const S = '(\\d{1})';
const SS = '(\\d{2})';
const SSS = '(\\d{3})';

const TwoDigit = '2-digit';
const Numeric = 'numeric';

interface FormattedNames {
  value: number;
  name: string;
}

// Fractional seconds are not supported in TypeScript Intl as of 2021
type DateTimeFormatPartTypes = Intl.DateTimeFormatPartTypes | 'fractionalSecond';
interface DateTimeFormatPart {
  type: DateTimeFormatPartTypes;
  value: string;
}

/**
 * Escape special characters for RegExp
 * @param str String to process
 * @returns string
 */
const regExpEscape = (str: string) => str.replace(/([^\w\s])/g, '\\$1').replace(/\s/g, '\\s');

/**
 * Escape list with literals to be used with RegExp
 * @param list A list with items
 * @returns escaped list
 */
const escapeList = (list: FormattedNames[]): string => {
  // There might be duplicates, which are not required in RegExp
  return `(${[...new Set(list.map(item => item.name))].map(item => regExpEscape(item)).join('|')})`;
};

class Locale {
  /**
   * Construct Locale object from options
   * @param options Format options
   * @param [locales] Locale or the default locale
   * @returns Locale object
   */
  public static fromOptions(options: Intl.DateTimeFormatOptions, locales?: string | string[]): Locale {
    const format = new Intl.DateTimeFormat(locales, {
      ...options,
      calendar: 'gregory', // Force Gregorian calendar
      numberingSystem: 'latn', // Force Latin numbering system
      timeZoneName: undefined, // Timezones are not supported
      timeZone: 'UTC' // must be provided as all calculations are done in UTC
    });
    return new Locale(format);
  }

  /**
   * Locale `Intl.DateTimeFormat` object
   */
  public readonly formatter;

  /**
   * Locale `formatter` resolved options
   */
  public readonly options;

  private readonly hourCycle;
  private readonly fractionalSecondDigits;

  /**
   * Create the Locale object
   * @param formatter Date time format
   */
  constructor(formatter: Intl.DateTimeFormat) {
    if (!(formatter instanceof Intl.DateTimeFormat)) {
      throw new Error(
        'Invalid constructor parameters provided. formatter should be an instance of Intl.DateTimeFormat'
      );
    }

    this.formatter = formatter;
    this.options = formatter.resolvedOptions();

    const options = this.options;

    this.hourCycle = this.resolveHourCycle(options);

    // FractionalSecondDigits is not supported in older browsers. Therefore keep the default
    this.fractionalSecondDigits = options.fractionalSecondDigits ? options.fractionalSecondDigits : 0;

    // Do validations early
    if (options.calendar !== 'gregory') {
      throw new Error(
        'Only Gregorian calendar is supported. Specify calendar option for locale, e.g. "th-u-ca-gregory"'
      );
    }

    if (options.numberingSystem !== 'latn') {
      throw new Error(
        'Only Latin symbols supported. Specify calendar option for numbering symbols, e.g. "ar-u-nu-latn"'
      );
    }

    if (options.timeZone !== 'UTC') {
      throw new Error("Only UTC timezone supported. Specify `timeZone: 'UTC'` in formatter options.");
    }
  }

  /**
   * Hour cycle is not supported in older browsers. Therefore keep the default
   * @param options Format options
   * @return hourCycle
   */
  private resolveHourCycle(
    options: Intl.ResolvedDateTimeFormatOptions
  ): Intl.ResolvedDateTimeFormatOptions['hourCycle'] {
    if (options.hourCycle) {
      return options.hourCycle;
    }

    return options.hour12 ? 'h12' : 'h23';
  }

  /**
   * Get months names for the specified formatter
   * @returns names Month names
   */
  private formatMonthNames(): FormattedNames[] {
    const monthsNames: FormattedNames[] = [];
    for (let value = 0; value < MONTHS_IN_YEAR; value += 1) {
      const date = Date.UTC(2018, value, 1); // January - February
      const monthPart = this.formatter.formatToParts(date).find(part => part.type === 'month');
      if (monthPart) {
        monthsNames.push({
          value,
          name: monthPart.value.toLowerCase()
        });
      }
    }
    return monthsNames;
  }

  /**
   * Get weekday names for the specified formatter
   * @returns names Weekday names
   */
  private formatWeekdayNames(): FormattedNames[] {
    const weekdayNames: FormattedNames[] = [];
    for (let value = 0; value < DAYS_IN_WEEK; value += 1) {
      const date = Date.UTC(2018, 0, value); // Sunday - Saturday
      const weekdayPart = this.formatter.formatToParts(date).find(part => part.type === 'weekday');
      if (weekdayPart) {
        weekdayNames.push({
          value,
          name: weekdayPart.value.toLowerCase()
        });
      }
    }
    return weekdayNames;
  }

  /**
   * Get period names for the specified formatter
   * @returns names Period names
   */
  private formatPeriodNames(): FormattedNames[] {
    const periodNames: FormattedNames[] = [];
    for (let i = 0; i < HOURS_IN_DAY; i += 1) {
      // The period is unknown as it can be different per locale, e.g. for en-GB:
      // AM, PM, 'at night', 'in the morning', 'noon', 'in the afternoon', 'in the evening'
      const date = Date.UTC(2018, 0, 1, i);
      const parts = this.formatter.formatToParts(date);
      const dayPeriodPart = parts.find(part => part.type === 'dayPeriod');
      const hourPart = parts.find(part => part.type === 'hour');
      if (hourPart && dayPeriodPart) {
        periodNames.push({
          value: Number(hourPart.value),
          name: dayPeriodPart.value.toLowerCase()
        });
      }
    }
    return periodNames;
  }

  /**
   * Get period names for the specified formatter
   * @returns names Period names
   */
  private formatEraNames(): FormattedNames[] {
    const eraNames: FormattedNames[] = [];
    const dates = [utcParse('-0001-01-01').getTime(), Date.UTC(2018, 0, 1)];
    for (let i = 0; i <= 1; i += 1) {
      const value = dates[i];
      const era = this.formatter.formatToParts(value).find(part => part.type === 'era');
      if (era) {
        eraNames.push({
          value,
          name: era.value.toLowerCase()
        });
      }
    }
    return eraNames;
  }

  private _regExp: RegExp | null = null;
  /**
   * Get regular expression for the format
   */
  private get regExp(): RegExp {
    if (this._regExp) {
      this._regExp.lastIndex = 0;
      return this._regExp;
    }
    const parts = this.parts;

    let str = '';

    for (const part of parts) {
      switch (part.type) {
        case 'year':
          str += this.yearRegExp;
          break;
        case 'month':
          str += this.monthRegExp;
          break;
        case 'day':
          str += this.dayRegExp;
          break;
        case 'hour':
          str += this.hourRegExp;
          break;
        case 'minute':
          str += this.minuteRegExp;
          break;
        case 'second':
          str += this.secondRegExp;
          break;
        case 'fractionalSecond':
          str += this.fractionalSecondRegExp;
          break;
        case 'weekday':
          str += this.weekdayRegExp;
          break;
        case 'dayPeriod':
          str += this.dayPeriodRegExp;
          break;
        case 'literal':
          str += this.getLiteralRegExp(part.value);
          break;
        case 'era':
          str += this.eraRegExp;
          break;
        case 'timeZoneName':
          throw new Error('Parsing timezones is ambiguous. Make sure that `timeZoneName` option is not provided');
        default:
          throw new Error('Unknown format provided');
      }
    }

    this._regExp = new RegExp(`^${str}$`, 'i');
    return this._regExp;
  }

  private get yearRegExp(): string {
    return this.options.year === TwoDigit ? YY : YYYY;
  }

  private get monthRegExp(): string {
    const options = this.options;
    if (options.month === TwoDigit || options.month === Numeric) {
      return MM;
    }
    return escapeList(this.monthNames);
  }

  private get dayRegExp(): string {
    return DD;
  }

  private get hourRegExp(): string {
    switch (this.hourCycle) {
      case 'h12':
        return H12;
      case 'h11':
        return H11;
      case 'h24':
        return H24;
      default:
        return H23;
    }
  }

  private get minuteRegExp(): string {
    return mm;
  }

  private get secondRegExp(): string {
    return ss;
  }

  private get fractionalSecondRegExp(): string {
    const ms = this.fractionalSecondDigits;
    if (ms === 1) {
      return S;
    } else if (ms === 2) {
      return SS;
    }

    return SSS;
  }

  private get weekdayRegExp(): string {
    return escapeList(this.weekdayNames);
  }

  private get dayPeriodRegExp(): string {
    return escapeList(this.periodNames);
  }

  private getLiteralRegExp(literal: string): string {
    return `(${regExpEscape(literal.toLowerCase())})`;
  }

  private get eraRegExp(): string {
    return escapeList(this.eraNames);
  }

  private _monthNames: FormattedNames[] | null = null;
  /**
   * Get month names
   */
  public get monthNames(): FormattedNames[] {
    if (this._monthNames) {
      return this._monthNames;
    }
    this._monthNames = this.formatMonthNames();
    return this._monthNames;
  }

  private _weekdayNames: FormattedNames[] | null = null;
  /**
   * Get weekday names
   */
  public get weekdayNames(): FormattedNames[] {
    if (this._weekdayNames) {
      return this._weekdayNames;
    }
    this._weekdayNames = this.formatWeekdayNames();
    return this._weekdayNames;
  }

  private _periodNames: FormattedNames[] | null = null;
  /**
   * Get period names
   */
  private get periodNames(): FormattedNames[] {
    if (this._periodNames) {
      return this._periodNames;
    }
    this._periodNames = this.formatPeriodNames();
    return this._periodNames;
  }

  private _eraNames: FormattedNames[] | null = null;
  /**
   * Get era names
   */
  private get eraNames(): FormattedNames[] {
    if (this._eraNames) {
      return this._eraNames;
    }
    this._eraNames = this.formatEraNames();
    return this._eraNames;
  }

  private _parts: DateTimeFormatPart[] | null = null;
  /**
   * Get parts for formatter
   */
  private get parts(): DateTimeFormatPart[] {
    if (this._parts) {
      return this._parts;
    }
    this._parts = this.formatter.formatToParts(Date.UTC(2018, 0, 1));
    return this._parts;
  }

  private _resolvedFormat: Format | null = null;
  /**
   * Get resolved ISO string format
   */
  public get isoFormat(): Format {
    if (this._resolvedFormat) {
      return this._resolvedFormat;
    }

    const options = this.options;

    const day = options.day !== undefined || options.dateStyle !== undefined;
    const month = day || options.month !== undefined;
    const year = day || month || options.year !== undefined;
    const millisecond = options.fractionalSecondDigits !== undefined;
    const second =
      millisecond ||
      options.second !== undefined ||
      options.timeStyle === 'full' ||
      options.timeStyle === 'long' ||
      options.timeStyle === 'medium';
    const minute = second || options.minute !== undefined || options.timeStyle === 'short';
    const hour = minute || options.hour !== undefined;

    if (hour && !year) {
      // time only formats
      this._resolvedFormat = millisecond ? TimeFormat.HHmmssSSS : second ? TimeFormat.HHmmss : TimeFormat.HHmm;
    } else if (year && !hour) {
      // date only
      this._resolvedFormat = day ? DateFormat.yyyyMMdd : month ? DateFormat.yyyyMM : DateFormat.yyyy;
    } else {
      // datetime or ambiguous
      this._resolvedFormat = millisecond
        ? DateTimeFormat.yyyMMddTHHmmssSSS
        : second
          ? DateTimeFormat.yyyMMddTHHmmss
          : DateTimeFormat.yyyMMddTHHmm;
    }

    return this._resolvedFormat;
  }

  /**
   * Try to parse localised date string into ISO date/time/datetime string
   * Throw an error if value is invalid
   * @param value Localised date
   * @param [referenceDate=0] Reference UTC date or time to resolve ambiguous strings.
   * @returns ISO date/time/datetime string
   */
  public parse(value: string, referenceDate: string | number | Date = 0): string {
    const refDate = typeof referenceDate === 'string' ? utcParse(referenceDate) : new Date(referenceDate);

    // format reference date to exclude excessive information
    const formattedReferenceDate = utcParse(utcFormat(refDate, this.isoFormat));

    const trimmedValue = value.trim(); // weak formatting
    const regExp = this.regExp;

    const matches = regExp.exec(value);

    if (!trimmedValue || matches === null) {
      throw throwInvalidValue(trimmedValue);
    }

    const options = this.options;
    const parts = this.parts;
    let year = formattedReferenceDate.getUTCFullYear();
    let month = formattedReferenceDate.getUTCMonth();
    let day = formattedReferenceDate.getUTCDay();
    let hours = formattedReferenceDate.getUTCHours();
    let minutes = formattedReferenceDate.getUTCMinutes();
    let seconds = formattedReferenceDate.getUTCSeconds();
    let milliseconds = formattedReferenceDate.getUTCMilliseconds();

    let weekDay = '';
    let referenceDay = Number.NaN;
    let dayPeriod = '';
    let era = -1;

    for (let i = 0; i < parts.length; i += 1) {
      const part = parts[i];
      const match = matches[i + 1].toLowerCase(); // regexp 0 is full string
      switch (part.type) {
        case 'year':
          year = Number(match);
          break;
        case 'month':
          if (options.month === Numeric || options.month === TwoDigit) {
            month = Number(match) - 1; // month is 0 based
          } else {
            const monthItem = this.monthNames.find(item => item.name === match);
            if (monthItem) {
              month = monthItem.value;
            }
          }
          break;
        case 'day':
          referenceDay = Number(match);
          break;
        case 'weekday':
          weekDay = match;
          break;
        case 'hour':
          hours = Number(match);
          break;
        case 'minute':
          minutes = Number(match);
          break;
        case 'second':
          seconds = Number(match);
          break;
        case 'fractionalSecond':
          milliseconds = Number(match);
          break;
        case 'dayPeriod':
          dayPeriod = match;
          break;
        case 'era':
          era = this.eraNames.findIndex(item => item.name === match);
          break;
        // no default
      }
    }

    // 2 digit year is ambiguous. Resolve from reference date
    if (options.year === TwoDigit) {
      const referenceYear = formattedReferenceDate.getUTCFullYear();
      year = referenceYear - (referenceYear % YEARS_IN_CENTURY) + year;
    }

    // Era, just flip to negative if BC. Add 1 year, because year 0 = 1 BC
    if (era === 0) {
      year = year * -1 + 1;
    }

    // Adjust hour cycles to h23 format
    if (options.hour12) {
      // Minutes needs to be taken into account, e.g.:
      // 12:00 - noon; 11:59 - in the morning; 12:01 - in the afternoon
      hours = this.periodNames.findIndex((period, index) => {
        let periodName = period.name;
        // Noon is a special case, when hours=12, seconds=0, minutes=0
        if (index === HOURS_OF_NOON && (minutes !== 0 || seconds !== 0)) {
          periodName = this.periodNames[index + 1].name;
        }
        return periodName === dayPeriod && period.value === hours;
      });
      if (hours === -1) {
        throwInvalidValue(trimmedValue);
      }
    } else if (this.hourCycle === 'h24') {
      // midnight at 24:00 (h24) = 00:00 (h23)
      hours = hours === HOURS_IN_DAY ? 0 : hours;
    }

    // Resolve false positives,
    if (!weekDay && !Number.isNaN(referenceDay)) {
      // day provided, weekday is not
      day = referenceDay;
    } else if (weekDay && Number.isNaN(referenceDay)) {
      // Ambiguous format, so pick the first available day
      // that match the weekday, year and month
      referenceDay = 1;
      let utcWeekDay = utcParse({ year, month, day: referenceDay }).getUTCDay();
      for (let i = 0; i < DAYS_IN_WEEK; i += 1) {
        if (this.weekdayNames.find(item => item.name === weekDay && item.value === utcWeekDay)) {
          break;
        }
        utcWeekDay += 1;
        referenceDay += 1;
      }
    } else if (weekDay && !Number.isNaN(referenceDay)) {
      day = referenceDay;
      // both provided, make sure that these values match
      // there might be more than 1 match (e.g. T can mean Tuesday or Thursday)
      const utcWeekDay = utcParse({ year, month, day }).getUTCDay();
      if (!this.weekdayNames.some(item => item.name === weekDay && item.value === utcWeekDay)) {
        throwInvalidValue(trimmedValue);
      }
    }

    const date = utcFormat(
      {
        year,
        month,
        day,
        hours,
        minutes,
        seconds,
        milliseconds
      },
      this.isoFormat
    );

    // Make sure the generated date is valid.
    if (!getFormat(date)) {
      throwInvalidValue(trimmedValue);
    }

    return date;
  }
}

export { Locale };
