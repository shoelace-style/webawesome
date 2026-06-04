/**
 * Pure, DOM-free helpers for `<wa-known-date>`'s three-field model.
 *
 * Each field stores the user's raw digit string (so `'07'` and `'7'` are preserved verbatim while typing).
 * Only `partsToIso` normalizes the trio into a canonical `YYYY-MM-DD` string, and only when every field
 * is filled AND the combination is a real calendar date.
 */

export interface DateParts {
  day: string;
  month: string;
  year: string;
}

export const EMPTY_PARTS: DateParts = { day: '', month: '', year: '' };

/** True when every field is filled. (Does not imply the combination is a valid calendar date.) */
export function isComplete(parts: DateParts): boolean {
  return parts.day !== '' && parts.month !== '' && parts.year !== '';
}

/** True when no field is filled. */
export function isEmpty(parts: DateParts): boolean {
  return parts.day === '' && parts.month === '' && parts.year === '';
}

/**
 * Compose three field strings into a canonical ISO `YYYY-MM-DD`. Returns `''` when:
 *  - any field is empty,
 *  - any field isn't a positive integer in its bounds (year 1–9999, month 1–12, day 1–31), or
 *  - the combination is not a real calendar date (Feb 30, Feb 29 in a non-leap year, …).
 */
export function partsToIso(parts: DateParts): string {
  if (!isComplete(parts)) return '';
  const year = Number(parts.year);
  const month = Number(parts.month);
  const day = Number(parts.day);
  if (!Number.isInteger(year) || year < 1 || year > 9999) return '';
  if (!Number.isInteger(month) || month < 1 || month > 12) return '';
  if (!Number.isInteger(day) || day < 1 || day > 31) return '';
  // The JS Date constructor maps years 0–99 to 1900+, so we set the full year explicitly. The roundtrip
  // check catches non-existent dates (Feb 30 rolls to Mar 2, Feb 29 in non-leap rolls to Mar 1).
  const date = new Date(2000, month - 1, day);
  date.setFullYear(year);
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) return '';
  return `${String(year).padStart(4, '0')}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

/** Split an ISO `YYYY-MM-DD` into three zero-padded field strings. Returns `EMPTY_PARTS` for an empty string. */
export function isoToParts(iso: string): DateParts {
  if (!iso) return { ...EMPTY_PARTS };
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return { ...EMPTY_PARTS };
  return { year: match[1], month: match[2], day: match[3] };
}
