import {
  MILLISECONDS_IN_DAY,
  MILLISECONDS_IN_HOUR,
  MILLISECONDS_IN_MINUTE,
  MILLISECONDS_IN_SECOND
} from './timestamps.js';
import { padNumber, throwInvalidFormat, throwInvalidValue } from './utils.js';

/**
 * Time segment
 */
interface Segment {
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

/**
 * Time format:
 * - HH:mm (e.g. 00:00, 23:59)
 * - HH:mm:ss (e.g. 00:00:00, 23:59:59)
 * - HH:mm:ss.SSS (e.g. 00:00:00.000, 23:59:59.000)
 */
enum Format {
  /**
   * HH:mm (e.g. 00:00, 23:59)
   */
  HHmm = 'HH:mm',
  /**
   * HH:mm:ss (e.g. 00:00:00, 23:59:59)
   */
  HHmmss = 'HH:mm:ss',
  /**
   * HH:mm:ss.SSS (e.g. 00:00:00.000, 23:59:59.000)
   */
  HHmmssSSS = 'HH:mm:ss.SSS'
}

type InputFormat = Format | keyof typeof Format;

/**
 * Regular expression to check for valid time
 */
const HHmm_REGEXP = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/;
const HHmmss_REGEXP = /^([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/;
const HHmmssSSS_REGEXP = /^([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])\.([0-9][0-9][0-9])$/;

const padHour = (hour: number): string => padNumber(hour, 2);
const padMinute = (minute: number): string => padNumber(minute, 2);
const padSecond = (second: number): string => padNumber(second, 2);
const padMillisecond = (millisecond: number): string => padNumber(millisecond, 3);

/**
 * Try to guess time format
 * @param value Value to test
 * @returns format Time format or undefined
 */
const getFormat = (value: string): Format | null => {
  if (HHmmssSSS_REGEXP.test(value)) {
    return Format.HHmmssSSS;
  }
  if (HHmmss_REGEXP.test(value)) {
    return Format.HHmmss;
  }
  if (HHmm_REGEXP.test(value)) {
    return Format.HHmm;
  }

  return null;
};

/**
 * Check if passed value is a valid time string.
 * For instance: 10:00, 23:59:59, 23:59:59.000
 * @param value Value to check
 * @param [format] The format to validate value against. If not defined, try to guess the format
 * @returns value is valid.
 */
const isValid = (value: string, format?: InputFormat | null): boolean => {
  const detectedFormat = format || getFormat(value);

  switch (detectedFormat) {
    case Format.HHmmss:
      return HHmmss_REGEXP.test(value);
    case Format.HHmmssSSS:
      return HHmmssSSS_REGEXP.test(value);
    case Format.HHmm:
      return HHmm_REGEXP.test(value);
    // no default
  }

  return false;
};

/**
 * Get Local/UTC values segments of Date object or value string
 * @param value Valid date or a string in a format 10:00, 23:59:59 or 23:59:59.999
 * @param [isUTC=false] True to get UTC values, false to get Local values
 * @returns Segment
 */
const toSegment = (value: string | Date, isUTC = false): Segment => {
  if (value instanceof Date) {
    const hours = isUTC ? value.getUTCHours() : value.getHours();
    const minutes = isUTC ? value.getUTCMinutes() : value.getMinutes();
    const seconds = isUTC ? value.getUTCSeconds() : value.getSeconds();
    const milliseconds = isUTC ? value.getUTCMilliseconds() : value.getMilliseconds();
    return { hours, minutes, seconds, milliseconds };
  }

  const msSplit = value.split('.');
  const split = (msSplit[0] || '').split(':');

  return {
    hours: Number(split[0]) || 0,
    minutes: Number(split[1]) || 0,
    seconds: Number(split[2]) || 0,
    milliseconds: Number(msSplit[1]) || 0
  };
};

/**
 * @private
 * @param value A valid Date or Segment
 * @param format Time format
 * @param isUTC Local or UTC
 * @returns A formatted time
 */
const formatTime = (value: Segment | Date, format: InputFormat, isUTC: boolean): string => {
  const segment: Segment = value instanceof Date ? toSegment(value, isUTC) : value;
  switch (format) {
    case Format.HHmmss:
      return `${padHour(segment.hours)}:${padMinute(segment.minutes)}:${padSecond(segment.seconds || 0)}`;
    case Format.HHmmssSSS:
      return `${padHour(segment.hours)}:${padMinute(segment.minutes)}:${padSecond(
        segment.seconds || 0
      )}.${padMillisecond(segment.milliseconds || 0)}`;
    case Format.HHmm:
      return `${padHour(segment.hours)}:${padMinute(segment.minutes)}`;
    // no default
  }

  throw throwInvalidFormat(format);
};

/**
 * Format Date or Segment to Local Time string.
 * @param value A valid Date or Segment
 * @param [format='HH:mm'] Time format, one of 'HH:mm' | 'HH:mm:ss' | 'HH:mm:ss.SSS'
 * @returns A formatted time
 */
const format = (value: Segment | Date, dateFormat: InputFormat = Format.HHmm): string =>
  formatTime(value, dateFormat, false);

/**
 * Format Date or Segment to UTC Time string.
 * @param value A valid Date or Segment
 * @param [format='HH:mm'] Time format, one of 'HH:mm' | 'HH:mm:ss' | 'HH:mm:ss.SSS'
 * @returns A formatted time
 */
const utcFormat = (value: Segment | Date, dateTimeFormat: InputFormat = Format.HHmm): string =>
  formatTime(value, dateTimeFormat, true);

/**
 * @private
 * @param value A Time string or Segment
 * @param isUTC Local or UTC
 * @returns A Date object
 */
const parseTime = (value: string | Segment, isUTC: boolean): Date => {
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
    date.setUTCHours(segment.hours, segment.minutes, segment.seconds, segment.milliseconds);
  } else {
    // the code for Local Dates is inconsistent across different browsers
    date = new Date();
    date.setHours(segment.hours, segment.minutes, segment.seconds, segment.milliseconds);
  }
  return date;
};

/**
 * Get Local Date object from value string or Segment.
 * @param value Value to parse, Segment or 'HH:mm' | 'HH:mm:ss' | 'HH:mm:ss.SSS'
 * @returns parsed date or invalid date
 */
const parse = (value: string | Segment): Date => parseTime(value, false);

/**
 * Get UTC Date object from value string or Segment.
 * @param value Value to parse, Segment or 'HH:mm' | 'HH:mm:ss' | 'HH:mm:ss.SSS'
 * @returns parsed date or invalid date
 */
const utcParse = (value: string | Segment): Date => parseTime(value, true);

/**
 * Add offset in milliseconds to the value
 * @param value the time
 * @param amount number of milliseconds to add
 * @returns new value
 */
const addOffset = (value: string, amount: number): string => {
  if (!amount) {
    return value;
  }

  const detectedFormat = getFormat(value);

  if (!detectedFormat) {
    throw throwInvalidValue(value);
  }

  const segment = toSegment(value);
  let duration =
    segment.hours * MILLISECONDS_IN_HOUR +
    segment.minutes * MILLISECONDS_IN_MINUTE +
    (segment.seconds || 0) * MILLISECONDS_IN_SECOND +
    (segment.milliseconds || 0) +
    amount;

  duration %= MILLISECONDS_IN_DAY;
  if (duration < 0) {
    duration = MILLISECONDS_IN_DAY + duration;
  }

  return formatTime(
    {
      hours: Math.floor((duration / MILLISECONDS_IN_HOUR) % 24),
      minutes: Math.floor((duration / MILLISECONDS_IN_MINUTE) % 60),
      seconds: Math.floor((duration / MILLISECONDS_IN_SECOND) % 60),
      milliseconds: Math.floor(duration % 1000)
    },
    detectedFormat,
    false
  );
};

/**
 * Subtract offset in milliseconds from the value
 * @param value the time
 * @param amount number of milliseconds to subtract
 * @returns new value
 */
const subOffset = (value: string, amount: number): string => addOffset(value, -amount);

export { Format, isValid, toSegment, format, utcFormat, addOffset, subOffset, getFormat, parse, utcParse };
export type { Segment, InputFormat };
