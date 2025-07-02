import { padNumber, throwInvalidFormat } from './utils.js';

/**
 * Date segment
 */
interface Segment {
  /**
   * Year, e.g. 2020, 30, -2
   */
  year: number;
  /**
   * Month, e.g. 0, 1, 11
   */
  month: number;
  /**
   * Day of the month, e.g. 1, 28, 31
   */
  day: number;
}

/**
 * Date format:
 * - yyyy-MM-dd (e.g. 2020-06-30, 0030-04-30, -0002-12-31)
 * - yyyy-MM (e.g. 2020-06, 0030-04, -0002-12)
 * - yyyy (e.g. 2020, 0030, -0002)
 */
enum Format {
  yyyy = 'yyyy',
  yyyyMM = 'yyyy-MM',
  yyyyMMdd = 'yyyy-MM-dd'
}

type InputFormat = Format | keyof typeof Format;

const yyyy_REGEXP = /^-?\d+$/;
const yyyyMM_REGEXP = /^-?\d+-(0[1-9]|1[0-2])$/;
const yyyyMMdd_REGEXP = /^-?\d+-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/; // validate number of days separately via the table

const padYear = (year: number): string => padNumber(year, year >= 0 ? 4 : 6);
const padMonth = (month: number): string => padNumber(month + 1, 2);
const padDay = (day: number): string => padNumber(day, 2);

/**
 * Get Local/UTC values segments of Date object or value string
 * @param value Valid date or a string in a format 2019, 2019-12 or 2019-12-31
 * @param [isUTC=false] True to get UTC values, false to get Local values
 * @returns Segment
 */
const toSegment = (value: string | Date, isUTC = false): Segment => {
  if (value instanceof Date) {
    const year = isUTC ? value.getUTCFullYear() : value.getFullYear();
    const month = isUTC ? value.getUTCMonth() : value.getMonth();
    const day = isUTC ? value.getUTCDate() : value.getDate();
    return { year, month, day };
  }

  const split = value.split('-');

  if (value.startsWith('-')) {
    /* must be negative */
    split.shift();
    split[0] = `-${split[0]}`;
  }

  return {
    year: Number(split[0]),
    month: Number(split[1]) - 1 || 0,
    day: Number(split[2]) || 1
  };
};

/**
 * @private
 * @param value A valid Date or Segment
 * @param format Date format
 * @param isUTC Local or UTC
 * @returns A formatted date
 */
const formatDate = (value: Segment | Date, format: InputFormat, isUTC: boolean): string => {
  const segment: Segment = value instanceof Date ? toSegment(value, isUTC) : value;
  switch (format) {
    case Format.yyyy:
      return `${padYear(segment.year)}`;
    case Format.yyyyMM:
      return `${padYear(segment.year)}-${padMonth(segment.month)}`;
    case Format.yyyyMMdd:
      return `${padYear(segment.year)}-${padMonth(segment.month)}-${padDay(segment.day)}`;
    // no default
  }

  throw throwInvalidFormat(format);
};

/**
 * Format Date or Segment to Local Date string.
 * @param value A valid Date or Segment
 * @param [format='yyyy-MM-dd'] Date format, one of 'yyyy-MM-dd' | 'yyyy-MM' | 'yyyy'
 * @returns A formatted date
 */
const format = (value: Segment | Date, dateFormat: InputFormat = Format.yyyyMMdd): string =>
  formatDate(value, dateFormat, false);

/**
 * Format Date or Segment to UTC Date string.
 * @param value A valid Date or Segment
 * @param [format='yyyy-MM-dd'] Date format, one of 'yyyy-MM-dd' | 'yyyy-MM' | 'yyyy'
 * @returns A formatted date
 */
const utcFormat = (value: Segment | Date, dateTimeFormat: InputFormat = Format.yyyyMMdd): string =>
  formatDate(value, dateTimeFormat, true);

/**
 * Try to guess date format
 * @param value Value to test
 * @returns format Date format
 */
const getFormat = (value: string): Format | null => {
  if (yyyyMMdd_REGEXP.test(value)) {
    return Format.yyyyMMdd;
  }
  if (yyyyMM_REGEXP.test(value)) {
    return Format.yyyyMM;
  }
  if (yyyy_REGEXP.test(value)) {
    return Format.yyyy;
  }

  return null;
};

/**
 * Return true if value confirms ta a passed format
 * @param value Value to check
 * @param [format] The format to validate value against. If not defined, try to guess the format
 * @returns true if value format is correct
 */
const isValid = (value: string, inputFormat?: InputFormat | null): boolean => {
  const detectedFormat = inputFormat || getFormat(value);

  if (detectedFormat === Format.yyyy) {
    return yyyy_REGEXP.test(value);
  } else if (detectedFormat === Format.yyyyMM) {
    return yyyyMM_REGEXP.test(value);
  } else if (detectedFormat === Format.yyyyMMdd && yyyyMMdd_REGEXP.test(value)) {
    const segment = toSegment(value);
    return segment.day <= getDaysInMonth(segment.year, segment.month); // number of days
  }

  return false;
};

/**
 * @private
 * @param value A Date string or Segment
 * @param isUTC Local or UTC
 * @returns A Date object
 */
const parseDate = (value: string | Segment, isUTC: boolean): Date => {
  let segment: Segment;
  if (typeof value === 'string') {
    const valid = isValid(value);
    if (!valid) {
      return new Date(Number.NaN);
    }
    segment = toSegment(value, isUTC);
  } else {
    segment = value;
  }

  let date: Date;
  if (isUTC) {
    date = new Date(0);
    date.setUTCFullYear(segment.year, segment.month, segment.day);
    date.setUTCHours(0, 0, 0, 0);
  } else {
    // the code for Local Dates is inconsistent across different browsers
    date = new Date();
    date.setFullYear(segment.year, segment.month, segment.day);
    date.setHours(0, 0, 0, 0);
  }
  return date;
};

/**
 * Get Local Date object from value string or Segment.
 * @param value Value to parse, Segment or 'yyyy-MM-dd' | 'yyyy-MM' | 'yyyy'
 * @returns parsed date or invalid date
 */
const parse = (value: string | Segment): Date => parseDate(value, false);

/**
 * Get UTC Date object from value string or Segment.
 * @param value Value to parse, Segment or 'yyyy-MM-dd' | 'yyyy-MM' | 'yyyy'
 * @returns parsed date or invalid date
 */
const utcParse = (value: string | Segment): Date => parseDate(value, true);

/**
 * Get number of day in a month
 * @param year A year to check
 * @param month A month to check
 * @returns the number of days in month
 */
const getDaysInMonth = (year: number, month: number): number => {
  const lastDayOfMonth = utcParse({ year, month: month + 1, day: 0 });
  return lastDayOfMonth.getUTCDate();
};

export { Format, toSegment, getFormat, format, utcFormat, parse, utcParse, isValid, getDaysInMonth };
export type { Segment, InputFormat };
