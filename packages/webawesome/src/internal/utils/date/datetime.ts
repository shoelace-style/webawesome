import type { Segment as DateSegment } from './date.js';
import {
  Format as DateFormat,
  format as formatDate,
  isValid as isValidDate,
  toSegment as toDateSegment,
  utcFormat as utcFormatDate
} from './date.js';
import type { Segment as TimeSegment } from './time.js';
import {
  format as formatTime,
  getFormat as getTimeFormat,
  isValid as isValidTime,
  Format as TimeFormat,
  toSegment as toTimeSegment,
  utcFormat as utcFormatTime
} from './time.js';
import { throwInvalidFormat } from './utils.js';

/*
 * DateTime segment
 */
type Segment = DateSegment & TimeSegment;

/**
 * DateTime format:
 * - yyyy-MM-dd'T'HH:mm (e.g. 1988-04-21T00:00, 0030-04-30T23:59, -0002-12-31T13:32)
 * - yyyy-MM-dd'T'HH:mm:ss (e.g. 1988-04-21T00:00:00, 0030-04-30T23:59:59, -0002-12-31T13:32:30)
 * - yyyy-MM-dd'T'HH:mm:ss.SSS (e.g. 1988-04-21T00:00:00.000, 0030-04-30T23:59:59.999, -0002-12-31T13:32:30.378)
 */
enum Format {
  /**
   * yyyy-MM-dd'T'HH:mm (e.g. 1988-04-21T00:00, 0030-04-30T23:59, -0002-12-31T13:32)
   */
  yyyMMddTHHmm = "yyyy-MM-dd'T'HH:mm",
  /**
   * yyyy-MM-dd'T'HH:mm:ss (e.g. 1988-04-21T00:00:00, 0030-04-30T23:59:59, -0002-12-31T13:32:30)
   */
  yyyMMddTHHmmss = "yyyy-MM-dd'T'HH:mm:ss",
  /**
   * yyyy-MM-dd'T'HH:mm:ss.SSS (e.g. 1988-04-21T00:00:00.000, 0030-04-30T23:59:59.999, -0002-12-31T13:32:30.378)
   */
  yyyMMddTHHmmssSSS = "yyyy-MM-dd'T'HH:mm:ss.SSS"
}

type InputFormat = Format | keyof typeof Format;

/**
 * Split datetime into date and time segments
 * @param value Datetime string
 * @returns object containing date and time
 */
const split = (value: string): { date: string; time: string } => {
  const dateTimeSplit = value.split('T');
  return {
    date: dateTimeSplit[0],
    time: dateTimeSplit[1]
  };
};

/**
 * Try to guess datetime format
 * @param value Value to test
 * @returns format DateTime format
 */
const getFormat = (value: string): Format | null => {
  const { date, time } = split(value);

  if (!date || !time || !isValidDate(date, DateFormat.yyyyMMdd) || !isValidTime(time)) {
    return null;
  }

  const timeFormat = getTimeFormat(time);

  switch (timeFormat) {
    case TimeFormat.HHmmssSSS:
      return Format.yyyMMddTHHmmssSSS;
    case TimeFormat.HHmmss:
      return Format.yyyMMddTHHmmss;
    default:
      return Format.yyyMMddTHHmm;
  }
};

/**
 * Check if passed value is a valid date time string.
 * For instance: 1988-04-21T00:00, 0030-04-30T23:59.59, -0002-12-31T13:32:30.378
 * @param value Value to check
 * @param [format] The format to validate value against. If not defined, try to guess the format
 * @returns value is valid.
 */
const isValid = (value: string, format?: InputFormat | null): boolean => {
  const { date, time } = split(value);
  if (!date || !time || !isValidDate(date, DateFormat.yyyyMMdd) || !isValidTime(time)) {
    return false;
  }
  const timeFormat = getTimeFormat(time);
  const defaultFormat = getFormat(value);

  return (
    (timeFormat === TimeFormat.HHmm && defaultFormat === Format.yyyMMddTHHmm) ||
    (timeFormat === TimeFormat.HHmmss && defaultFormat === Format.yyyMMddTHHmmss) ||
    (timeFormat === TimeFormat.HHmmssSSS && format === Format.yyyMMddTHHmmssSSS)
  );
};

/**
 * Get Local/UTC values segments of DateTime object or value string
 * @param value Valid datetime or a string in a format 1988-04-21T00:00, 0030-04-30T23:59.59, -0002-12-31T13:32:30.378
 * @param [isUTC=false] True to get UTC values, false to get Local values
 * @returns Segment
 */
const toSegment = (value: string | Date, isUTC = false): Segment => {
  let date = value;
  let time = value;

  if (typeof value === 'string') {
    const valueSplit = split(value);
    date = valueSplit.date;
    time = valueSplit.time;
  }

  return {
    ...toDateSegment(date, isUTC),
    ...toTimeSegment(time, isUTC)
  };
};

/**
 * @private
 * @param value A valid Date or Segment
 * @param format DateTime format
 * @param isUTC Local or UTC
 * @returns A formatted date time
 */
const formatDateTime = (value: Segment | Date, format: InputFormat, isUTC: boolean): string => {
  const segment: Segment = value instanceof Date ? toSegment(value, isUTC) : value;
  const dateSegment: DateSegment = {
    year: segment.year,
    month: segment.month,
    day: segment.day
  };
  const timeSegment: TimeSegment = {
    hours: segment.hours,
    minutes: segment.minutes,
    seconds: segment.seconds,
    milliseconds: segment.milliseconds
  };

  const dateFormat = DateFormat.yyyyMMdd;
  const date = isUTC ? utcFormatDate(dateSegment, dateFormat) : formatDate(dateSegment, dateFormat);

  let timeFormat: TimeFormat;
  switch (format) {
    case Format.yyyMMddTHHmmssSSS:
      timeFormat = TimeFormat.HHmmssSSS;
      break;
    case Format.yyyMMddTHHmmss:
      timeFormat = TimeFormat.HHmmss;
      break;
    case Format.yyyMMddTHHmm:
      timeFormat = TimeFormat.HHmm;
      break;
    default:
      throw throwInvalidFormat(format);
  }
  const time = isUTC ? utcFormatTime(timeSegment, timeFormat) : formatTime(timeSegment, timeFormat);
  return `${date}T${time}`;
};

/**
 * Format Date or Segment to Local Date Time string.
 * @param value A valid Date or Segment
 * @param [format='yyyy-MM-dd'T'HH:mm'] Date Time format
 * @returns A formatted time
 */
const format = (value: Segment | Date, dateFormat: InputFormat = Format.yyyMMddTHHmm): string =>
  formatDateTime(value, dateFormat, false);

/**
 * Format Date or Segment to UTC Date Time string.
 * @param value A valid Date or Segment
 * @param [format='yyyy-MM-dd'T'HH:mm'] Date Time format
 * @returns A formatted time
 */
const utcFormat = (value: Segment | Date, dateTimeFormat: InputFormat = Format.yyyMMddTHHmm): string =>
  formatDateTime(value, dateTimeFormat, true);

/**
 * @private
 * @param value A Date string or Segment
 * @param isUTC Local or UTC
 * @returns A DateTime object
 */
const parseDateTime = (value: string | Segment, isUTC: boolean): Date => {
  let parsedValue: Segment;
  if (typeof value === 'string') {
    const valid = isValid(value);
    if (!valid) {
      return new Date(Number.NaN);
    }
    parsedValue = toSegment(value, isUTC);
  } else {
    parsedValue = value;
  }

  let date: Date;
  if (isUTC) {
    date = new Date(0);
    date.setUTCFullYear(parsedValue.year, parsedValue.month, parsedValue.day);
    date.setUTCHours(parsedValue.hours, parsedValue.minutes, parsedValue.seconds, parsedValue.milliseconds);
  } else {
    // the code for Local Dates is inconsistent across different browsers
    date = new Date();
    date.setFullYear(parsedValue.year, parsedValue.month, parsedValue.day);
    date.setHours(parsedValue.hours, parsedValue.minutes, parsedValue.seconds, parsedValue.milliseconds);
  }
  return date;
};

/**
 * Get Local Date object from value string or Segment.
 * @param value Value to parse, Segment or 'yyyy-MM-dd\'T\'HH:mm' | 'yyyy-MM-dd\'T\'HH:mm:ss' | 'yyyy-MM-dd\'T\'HH:mm:ss.SSS'
 * @returns parsed date or invalid date
 */
const parse = (value: string | Segment): Date => parseDateTime(value, false);

/**
 * Get UTC Date object from value string or Segment.
 * @param value Value to parse, Segment or 'yyyy-MM-dd\'T\'HH:mm' | 'yyyy-MM-dd\'T\'HH:mm:ss' | 'yyyy-MM-dd\'T\'HH:mm:ss.SSS'
 * @returns parsed date or invalid date
 */
const utcParse = (value: string | Segment): Date => parseDateTime(value, true);

export { Format, getFormat, isValid, toSegment, format, utcFormat, parse, utcParse, split };
export type { Segment, InputFormat };
