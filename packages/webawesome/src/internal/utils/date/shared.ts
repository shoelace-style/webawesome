/**
 * A list of shared functions across date, datetime and time
 */

import type { Segment as DateSegment, InputFormat as InputDateFormat } from './date.js';
import {
  Format as DateFormat,
  format as formatDate,
  getFormat as getDateFormat,
  getDaysInMonth,
  isValid as isValidDate,
  parse as parseDate,
  toSegment as toDateSegment,
  utcFormat as utcFormatDate,
  utcParse as utcParseDate
} from './date.js';
import type { Segment as DateTimeSegment, InputFormat as InputDateTimeFormat } from './datetime.js';
import {
  Format as DateTimeFormat,
  format as formatDateTime,
  getFormat as getDateTimeFormat,
  isValid as isValidDateTime,
  parse as parseDateTime,
  toSegment as toDateTimeSegment,
  utcFormat as utcFormatDateTime,
  utcParse as utcParseDateTime
} from './datetime.js';
import type { InputFormat as InputTimeFormat, Segment as TimeSegment } from './time.js';
import {
  addOffset as addTimeOffset,
  format as formatTime,
  getFormat as getTimeFormat,
  isValid as isValidTime,
  parse as parseTime,
  Format as TimeFormat,
  toSegment as toTimeSegment,
  utcFormat as utcFormatTime,
  utcParse as utcParseTime
} from './time.js';
import {
  HOURS_IN_DAY,
  HOURS_OF_NOON,
  MILLISECONDS_IN_SECOND,
  MINUTES_IN_HOUR,
  MONTHS_IN_YEAR,
  SECONDS_IN_MINUTE
} from './timestamps.js';
import { throwInvalidFormat, throwInvalidUnit, throwInvalidValue } from './utils.js';

type Format = InputTimeFormat | InputDateFormat | InputDateTimeFormat;
type Unit = 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second' | 'millisecond';

type Segment =
  | DateTimeSegment
  | (TimeSegment & {
      year?: number;
      month?: number;
      day?: number;
    })
  | (DateSegment & {
      hours?: number;
      minutes?: number;
      seconds?: number;
      milliseconds?: number;
    });

const isTime = (value: string | Segment): boolean => {
  if (typeof value === 'string') {
    return isValidTime(value);
  }

  return (
    value.year === undefined &&
    value.month === undefined &&
    value.day === undefined &&
    value.hours !== undefined &&
    value.minutes !== undefined
  );
};

const isDate = (value: string | Segment): boolean => {
  if (typeof value === 'string') {
    return isValidDate(value);
  }

  return (
    value.year !== undefined &&
    value.month !== undefined &&
    value.day !== undefined &&
    value.hours === undefined &&
    value.minutes === undefined &&
    value.seconds === undefined &&
    value.milliseconds === undefined
  );
};

const isDateTime = (value: string | Segment): boolean => {
  if (typeof value === 'string') {
    return isValidDateTime(value);
  }

  return (
    value.year !== undefined &&
    value.month !== undefined &&
    value.day !== undefined &&
    value.hours !== undefined &&
    value.minutes !== undefined
  );
};

/**
 * Parse value into segment
 * @param value A valid Date or Segment
 * @param isUTC Local or UTC
 * @returns segment Date segment
 */
const toSegment = (value: string | Date, isUTC = false): Segment => {
  if (value instanceof Date) {
    return toDateTimeSegment(value, isUTC);
  }

  if (isTime(value)) {
    return toTimeSegment(value, isUTC);
  }

  if (isDate(value)) {
    return toDateSegment(value, isUTC);
  }

  if (isDateTime(value)) {
    return toDateTimeSegment(value, isUTC);
  }

  throw throwInvalidValue(value);
};

/**
 * @private
 * @param value A valid Date or Segment
 * @param [format] Date format
 * @param isUTC Local or UTC
 * @returns A formatted date
 */
const formatAll = (value: Segment | Date, isUTC: boolean, format: Format = DateTimeFormat.yyyMMddTHHmm): string => {
  let segment: Segment;
  if (value instanceof Date) {
    segment = toSegment(value, isUTC);
  } else {
    segment = value;
  }

  const { year = 0, month = 0, day = 0, hours = 0, minutes = 0, seconds = 0, milliseconds = 0 } = segment;

  const dateTimeSegment = { year, month, day, hours, minutes, seconds, milliseconds };

  switch (format) {
    case DateTimeFormat.yyyMMddTHHmm:
    case DateTimeFormat.yyyMMddTHHmmss:
    case DateTimeFormat.yyyMMddTHHmmssSSS:
      return isUTC ? utcFormatDateTime(dateTimeSegment, format) : formatDateTime(dateTimeSegment, format);
    case TimeFormat.HHmm:
    case TimeFormat.HHmmss:
    case TimeFormat.HHmmssSSS: {
      const timeSegment = { hours, minutes, seconds, milliseconds };
      return isUTC ? utcFormatTime(timeSegment, format) : formatTime(timeSegment, format);
    }
    case DateFormat.yyyyMMdd:
    case DateFormat.yyyyMM:
    case DateFormat.yyyy: {
      const dateSegment = { year, month, day };
      return isUTC ? utcFormatDate(dateSegment, format) : formatDate(dateSegment, format);
    }
    // no default
  }

  // eslint-disable-next-line @typescript-eslint/no-throw-literal
  throw throwInvalidFormat(format);
};

/**
 * Format Date or Segment to Local formatted string.
 * @param value A valid Date or Segment
 * @param [format='yyyy-MM-dd'T'HH:mm'] format
 * @returns A formatted string
 */
const format = (value: Segment | Date, dateFormat: Format = DateTimeFormat.yyyMMddTHHmm): string =>
  formatAll(value, false, dateFormat);

/**
 * Format Date or Segment to UTC formatted string.
 * @param value A valid Date or Segment
 * @param [format='yyyy-MM-dd'T'HH:mm'] format
 * @returns A formatted string
 */
const utcFormat = (value: Segment | Date, dateTimeFormat: Format = DateTimeFormat.yyyMMddTHHmm): string =>
  formatAll(value, true, dateTimeFormat);

/**
 * @private
 * @param value A Date string or Segment
 * @param isUTC Local or UTC
 * @returns A Date
 */
const parseAll = (value: string | Segment, isUTC: boolean): Date => {
  let segment: Segment;
  if (typeof value === 'string') {
    segment = toSegment(value, isUTC);
  } else {
    segment = value;
  }

  const { year = 0, month = 0, day = 0, hours = 0, minutes = 0, seconds = 0, milliseconds = 0 } = segment;

  if (isTime(segment)) {
    const timeSegment = { hours, minutes, seconds, milliseconds };
    return isUTC ? utcParseTime(timeSegment) : parseTime(timeSegment);
  }

  if (isDate(segment)) {
    const dateSegment = { year, month, day };
    return isUTC ? utcParseDate(dateSegment) : parseDate(dateSegment);
  }

  if (isDateTime(segment)) {
    const dateTimeSegment = { year, month, day, hours, minutes, seconds, milliseconds };
    return isUTC ? utcParseDateTime(dateTimeSegment) : parseDateTime(dateTimeSegment);
  }

  return new Date(Number.NaN);
};

/**
 * Get Local Date object from value string or Segment.
 * @param value Value to parse or Segment
 * @returns parsed Date or Invalid Date
 */
const parse = (value: string | Segment): Date => parseAll(value, false);

/**
 * Get UTC Date object from value string or Segment.
 * @param value Value to parse or Segment
 * @returns parsed Date or Invalid Date
 */
const utcParse = (value: string | Segment): Date => parseAll(value, true);

/**
 * Try to guess value format
 * @param value Value to test
 * @returns format Format
 */
const getFormat = (value: string): Format | null => {
  if (isValidTime(value)) {
    return getTimeFormat(value);
  }
  if (isValidDate(value)) {
    return getDateFormat(value);
  }
  if (isValidDateTime(value)) {
    return getDateTimeFormat(value);
  }

  return null;
};

/**
 * Is the first date after the second one?
 * @param value the date that should be after the other one to return true
 * @param compare the date to compare with
 * @returns the first date is after the second date
 */
const isAfter = (value: string, compare: string): boolean => {
  const date = utcParse(value);
  const compareDate = utcParse(compare);
  return date.getTime() > compareDate.getTime();
};

/**
 * Is the first date before the second one?
 * @param value the date that should be before the other one to return true
 * @param compare the date to compare with
 * @returns the first date is before the second date
 */
const isBefore = (value: string, compare: string): boolean => {
  const date = utcParse(value);
  const compareDate = utcParse(compare);
  return date.getTime() < compareDate.getTime();
};

/**
 * Are the given dates in the same day?
 * @param value the first date to check
 * @param compare the second date to check
 * @returns the dates are in the same day
 */
const isSameDay = (value: string, compare: string): boolean => {
  const valueSegment = toSegment(value);
  const compareSegment = toSegment(compare);
  return (
    valueSegment.year === compareSegment.year &&
    valueSegment.month === compareSegment.month &&
    valueSegment.day === compareSegment.day
  );
};

/**
 * Are the given dates in the same month?
 * @param value the first date to check
 * @param compare the second date to check
 * @returns the dates are in the same month
 */
const isSameMonth = (value: string, compare: string): boolean => {
  const valueSegment = toSegment(value);
  const compareSegment = toSegment(compare);
  return valueSegment.year === compareSegment.year && valueSegment.month === compareSegment.month;
};

/**
 * Are the given dates in the same year?
 * @param value the first date to check
 * @param compare the second date to check
 * @returns the dates are in the same year
 */
const isSameYear = (value: string, compare: string): boolean => {
  const valueSegment = toSegment(value);
  const compareSegment = toSegment(compare);
  return valueSegment.year === compareSegment.year;
};

/**
 * Is the given date today?
 * @param value the date to check
 * @returns the date is today
 */
const isToday = (value: string): boolean => {
  const today = format(new Date()); // must be local time
  return isSameDay(value, today);
};

/**
 * Is the given date this month?
 * @param value the date to check
 * @returns the date is this month
 */
const isThisMonth = (value: string): boolean => {
  const today = format(new Date()); // must be local time
  return isSameMonth(value, today);
};

/**
 * Is the given date this year?
 * @param value the date to check
 * @returns the date is this year
 */
const isThisYear = (value: string): boolean => {
  const today = format(new Date()); // must be local time
  return isSameYear(value, today);
};

/**
 * Does the given date fall on a weekend?
 * @param value the date to check
 * @returns the date falls on a weekend
 */
const isWeekend = (value: string): boolean => {
  const date = utcParse(value);
  const day = date.getUTCDay();
  return day === 0 || day === 6;
};

/**
 * Add the specified number of units to the given date
 * @param value The date to be changed
 * @param unit The unit: `year`, `month`, `day`, `hour`, `minute`, `second` or `millisecond`
 * @param amount The amount of units to be added, e.g. 1 to increase or -1 to decrease
 * @returns date The new date
 */
const addUnit = (value: string, unit: Unit, amount: number): string => {
  if (!amount) {
    return value;
  }

  const valueFormat = getFormat(value);

  if (!valueFormat) {
    throw throwInvalidValue(value);
  }

  let date = utcParse(value);
  switch (unit) {
    case 'year':
      date.setUTCFullYear(date.getUTCFullYear() + amount);
      break;
    case 'month': {
      const dayOfMonth = date.getUTCDate();
      const endOfDesiredMonth = new Date(date.getTime());
      endOfDesiredMonth.setUTCMonth(date.getUTCMonth() + amount + 1, 0);
      const daysInMonth = endOfDesiredMonth.getUTCDate();

      if (dayOfMonth >= daysInMonth) {
        date = endOfDesiredMonth;
      } else {
        date.setUTCFullYear(endOfDesiredMonth.getUTCFullYear(), endOfDesiredMonth.getUTCMonth(), dayOfMonth);
      }
      break;
    }
    case 'day':
      date.setUTCDate(date.getUTCDate() + amount);
      break;
    case 'hour':
      date.setUTCHours(date.getUTCHours() + amount);
      break;
    case 'minute':
      date.setUTCMinutes(date.getUTCMinutes() + amount);
      break;
    case 'second':
      date.setUTCSeconds(date.getUTCSeconds() + amount);
      break;
    case 'millisecond':
      date.setUTCMilliseconds(date.getUTCMilliseconds() + amount);
      break;
    default:
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw throwInvalidUnit(unit);
  }

  return utcFormat(date, valueFormat);
};

/**
 * Add the specified number of months to the given date
 * @param value the date to be changed
 * @param amount the amount of months to be added
 * @returns the new date with the months added
 */
const addMonths = (value: string, amount: number): string => addUnit(value, 'month', amount);

/**
 * Subtract the specified number of months to the given date
 * @param value the date to be changed
 * @param amount the amount of months to be subtracted
 * @returns the new date with the months subtracted
 */
const subMonths = (value: string, amount: number): string => addMonths(value, -amount);

/**
 * Returns `true` or `false` depending on whether the hours are before, or, after noon
 * @param value the time to check
 * @returns Result
 */
const isAM = (value: string): boolean => {
  const segment = toSegment(value);
  return (segment.hours || 0) < HOURS_OF_NOON;
};

/**
 * Returns opposite of isAM
 * @param value the time to check
 * @returns Result
 */
const isPM = (value: string): boolean => {
  return !isAM(value);
};

/**
 * Add offset in milliseconds to the value
 * @param value the time
 * @param amount number of milliseconds to add
 * @returns new value
 */
const addDateTimeOffset = (value: string, amount: number): string => {
  if (!amount) {
    return value;
  }

  const valueFormat = getFormat(value);
  if (!valueFormat) {
    throw throwInvalidValue(value);
  }
  const date = utcParse(value);
  const offsetDate = new Date(date.getTime() + amount);

  return utcFormat(offsetDate, valueFormat);
};

/**
 * Add offset in milliseconds to the value
 * @param value the time
 * @param amount number of milliseconds to add
 * @returns new value
 */
const addOffset = (value: string, amount: number): string =>
  isTime(value) ? addTimeOffset(value, amount) : addDateTimeOffset(value, amount);

/**
 * Subtract offset in milliseconds from the value
 * @param value the time
 * @param amount number of milliseconds to subtract
 * @returns new value
 */
const subOffset = (value: string, amount: number): string => addOffset(value, -amount);

/**
 * Cycles through the unit by a specified amount, not affecting any other part of the date
 * @param value The date to be changed
 * @param unit The unit: `year`, `month`, `day`, `hour`, `minute`, `second` or `millisecond`
 * @param amount The amount of units to be iterated, e.g. 1 to go up or -1 to go down
 * @returns date The new date
 */
const iterateUnit = (value: string, unit: Unit, amount: number): string => {
  if (!amount) {
    return value;
  }

  const valueFormat = getFormat(value);

  if (!valueFormat) {
    throw throwInvalidValue(value);
  }

  const date = utcParse(value);
  switch (unit) {
    case 'year':
      date.setUTCFullYear(date.getUTCFullYear() + amount);
      break;
    case 'month': {
      // If there are too many days, switch to max available
      const nextMonth = (date.getUTCMonth() + ((MONTHS_IN_YEAR + amount) % MONTHS_IN_YEAR)) % MONTHS_IN_YEAR;
      const daysInNextMonth = getDaysInMonth(date.getUTCFullYear(), nextMonth);
      if (date.getUTCDate() > daysInNextMonth) {
        date.setUTCDate(daysInNextMonth);
      }
      date.setUTCMonth(nextMonth);
      break;
    }
    case 'day': {
      // Days start from 1
      const daysInMonth = getDaysInMonth(date.getUTCFullYear(), date.getUTCMonth());
      date.setUTCDate(((date.getUTCDate() - 1 + ((daysInMonth + amount) % daysInMonth)) % daysInMonth) + 1);
      break;
    }
    case 'hour':
      date.setUTCHours((date.getUTCHours() + ((HOURS_IN_DAY + amount) % HOURS_IN_DAY)) % HOURS_IN_DAY);
      break;
    case 'minute':
      date.setUTCMinutes((date.getUTCMinutes() + ((MINUTES_IN_HOUR + amount) % MINUTES_IN_HOUR)) % MINUTES_IN_HOUR);
      break;
    case 'second':
      date.setUTCSeconds(
        (date.getUTCSeconds() + ((SECONDS_IN_MINUTE + amount) % SECONDS_IN_MINUTE)) % SECONDS_IN_MINUTE
      );
      break;
    case 'millisecond':
      date.setUTCMilliseconds(
        (date.getUTCMilliseconds() + ((MILLISECONDS_IN_SECOND + amount) % MILLISECONDS_IN_SECOND)) %
          MILLISECONDS_IN_SECOND
      );
      break;
    default:
      throw throwInvalidUnit(unit);
  }
  return utcFormat(date, valueFormat);
};

export {
  isAfter,
  isBefore,
  isAM,
  isPM,
  addOffset,
  subOffset,
  format,
  utcFormat,
  parse,
  utcParse,
  getFormat,
  isSameDay,
  isSameMonth,
  isSameYear,
  isToday,
  isThisMonth,
  isThisYear,
  addMonths,
  subMonths,
  isWeekend,
  addUnit,
  iterateUnit,
  toSegment
};
export type { Format, Unit };
