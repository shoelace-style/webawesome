/**
 * Pad a number with 0
 * @param number Number to pad
 * @param size Size of end string
 * @returns padded string
 */
const padNumber = (number: number, size: number): string => {
  let s = `${Math.abs(number)}`;
  while (s.length < size) {
    s = `0${s}`;
  }
  return `${number < 0 ? '-' : ''}${s}`;
};

/**
 * Throw invalid format error
 * @param format Invalid format
 * @returns {void}
 */
const throwInvalidFormat = (format: string): void => {
  throw new Error(`Invalid format provided: '${format}'`);
};

/**
 * Throw invalid value error
 * @param value Invalid value
 * @returns {void}
 */
const throwInvalidValue = (value: string): void => {
  throw new Error(`Invalid value provided: '${value}'`);
};

/**
 * Throw invalid unit error
 * @param unit Invalid unit
 * @returns {void}
 */
const throwInvalidUnit = (unit: string): void => {
  throw new Error(`Invalid unit provided: '${unit}'`);
};

export { padNumber, throwInvalidFormat, throwInvalidValue, throwInvalidUnit };
