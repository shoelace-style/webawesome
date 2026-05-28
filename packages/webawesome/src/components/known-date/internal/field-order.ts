/**
 * Locale-aware field ordering for `<wa-known-date>`'s three fields.
 *
 * The control renders day, month, and year in the order the locale presents them (`MDY` for en-US,
 * `DMY` for en-GB/de-DE, `YMD` for ja-JP/ISO locales). We derive that order by probing
 * `Intl.DateTimeFormat.formatToParts()` for a date whose parts are mutually unambiguous, then reading
 * back which field appears first, second, and third. Only the order is taken from the locale — the
 * fields themselves are always day/month/year.
 */

export type SegmentField = 'year' | 'month' | 'day';

const orderCache = new Map<string, SegmentField[]>();

/** The day/month/year order for a locale. Cache key is the full locale string (`en-GB` ≠ `en-US`). */
export function localeFieldOrder(locale: string): SegmentField[] {
  const key = locale || 'en';
  const cached = orderCache.get(key);
  if (cached) return cached;

  const formatter = new Intl.DateTimeFormat(key, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    calendar: 'gregory',
    numberingSystem: 'latn',
  });
  const parts = formatter.formatToParts(new Date(2026, 0, 23));

  const order: SegmentField[] = [];
  for (const part of parts) {
    if (part.type === 'year' || part.type === 'month' || part.type === 'day') {
      order.push(part.type);
    }
  }

  // Defensive fallback: if the probe somehow yielded the wrong number of fields, use the en-US order.
  const resolved = order.length === 3 ? order : (['month', 'day', 'year'] as SegmentField[]);
  orderCache.set(key, resolved);
  return resolved;
}
