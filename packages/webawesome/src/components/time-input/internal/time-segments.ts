/**
 * Pure, DOM-free model for the **segmented** time input of `<wa-time-input>`. Plays the same role for time-input as
 * `date-input/internal/segments.ts` does for date-input — only this one is wired to the generic
 * `SegmentedFieldController` via the `timeSegmentRules()` factory below.
 *
 * A `<wa-time-input>` renders hour, minute, optional seconds, and optional AM/PM as discrete spinbutton segments in
 * the user's locale order, separated by inert literal text (`:`, NBSPs, locale-specific glyphs). Each segment is edited
 * independently: digits fill the focused segment with auto-advance, Arrow Up/Down step within bounds, and AM/PM toggles
 * via `a`/`p` keys or arrow stepping.
 *
 * Wire format mirrors HTML `<input type="time">`: `HH:mm` for whole-minute steps, `HH:mm:ss` for sub-minute steps,
 * `HH:mm:ss.sss` for fractional-second steps. The wire value is always 24-hour even when the UI is 12-hour.
 */

import type {
  SegmentLayout,
  SegmentRules,
  TypeDigitResult,
} from '../../../internal/segmented-field/segmented-field-controller.js';

export type TimeField = 'hour' | 'minute' | 'second' | 'dayPeriod';

/** Partially- or fully-entered time. `null` means the segment is empty. */
export interface TimeSegments {
  /** Hour in display units: 0–23 when `hour12` is false, 1–12 when true. */
  hour: number | null;
  minute: number | null;
  /** Whole seconds. `null` when the seconds segment isn't shown or hasn't been entered. */
  second: number | null;
  /** 0 = AM, 1 = PM. `null` when the segment isn't shown or hasn't been entered. */
  dayPeriod: 0 | 1 | null;
}

export interface BuildLayoutOptions {
  hour12: boolean;
  withSeconds: boolean;
}

const layoutCache = new Map<string, SegmentLayout>();

/** Clear the layout cache (intended for tests). */
export function clearTimeSegmentLayoutCache(): void {
  layoutCache.clear();
}

/**
 * Build (and cache) the segment layout for a locale by probing `Intl.DateTimeFormat.formatToParts`. Literal parts
 * (colons, NBSPs) are preserved verbatim so locale-specific separators render correctly. Digits are forced to Latin
 * via `numberingSystem: 'latn'` — the wire value is always ASCII; only segment order and AM/PM glyphs vary by locale.
 *
 * Cache key: `${locale}|${hour12}|${withSeconds}`.
 */
export function buildTimeSegmentLayout(locale: string, opts: BuildLayoutOptions): SegmentLayout {
  const key = `${locale || 'en'}|${opts.hour12 ? 12 : 24}|${opts.withSeconds ? 1 : 0}`;
  const cached = layoutCache.get(key);
  if (cached) return cached;

  const formatter = new Intl.DateTimeFormat(locale || 'en', {
    hour: '2-digit',
    minute: '2-digit',
    second: opts.withSeconds ? '2-digit' : undefined,
    hour12: opts.hour12,
    calendar: 'gregory',
    numberingSystem: 'latn',
  });
  // A time whose parts are all distinct so we can map them back to fields.
  const probeDate = new Date(2026, 0, 1, 13, 45, 30);
  const parts = formatter.formatToParts(probeDate);

  const tokens: SegmentLayout['tokens'] = [];
  const order: TimeField[] = [];
  for (const part of parts) {
    if (part.type === 'hour') {
      tokens.push({ kind: 'segment', field: 'hour' });
      order.push('hour');
    } else if (part.type === 'minute') {
      tokens.push({ kind: 'segment', field: 'minute' });
      order.push('minute');
    } else if (part.type === 'second') {
      tokens.push({ kind: 'segment', field: 'second' });
      order.push('second');
    } else if (part.type === 'dayPeriod') {
      tokens.push({ kind: 'segment', field: 'dayPeriod' });
      order.push('dayPeriod');
    } else if (part.type === 'literal') {
      tokens.push({ kind: 'literal', text: part.value });
    }
  }

  // Defensive fallback: if the runtime returned an unexpected shape, build a sensible default.
  const expectedSegments = 2 + (opts.withSeconds ? 1 : 0) + (opts.hour12 ? 1 : 0);
  if (order.length !== expectedSegments) {
    const fallbackTokens: SegmentLayout['tokens'] = [
      { kind: 'segment', field: 'hour' },
      { kind: 'literal', text: ':' },
      { kind: 'segment', field: 'minute' },
    ];
    const fallbackOrder: TimeField[] = ['hour', 'minute'];
    if (opts.withSeconds) {
      fallbackTokens.push({ kind: 'literal', text: ':' });
      fallbackTokens.push({ kind: 'segment', field: 'second' });
      fallbackOrder.push('second');
    }
    if (opts.hour12) {
      fallbackTokens.push({ kind: 'literal', text: ' ' });
      fallbackTokens.push({ kind: 'segment', field: 'dayPeriod' });
      fallbackOrder.push('dayPeriod');
    }
    const fallback: SegmentLayout = { tokens: fallbackTokens, order: fallbackOrder };
    layoutCache.set(key, fallback);
    return fallback;
  }

  const layout: SegmentLayout = { tokens, order };
  layoutCache.set(key, layout);
  return layout;
}

/** Resolve whether a locale defaults to 12-hour clock. Used when `hourFormat='auto'`. */
export function resolveHour12(locale: string): boolean {
  try {
    const probe = new Intl.DateTimeFormat(locale || 'en', { hour: 'numeric' });
    return probe.resolvedOptions().hour12 ?? false;
  } catch {
    return false;
  }
}

/** Format the localized AM/PM string for a given `dayPeriod` value (0=AM, 1=PM). Falls back to "AM"/"PM". */
export function formatDayPeriod(locale: string, period: 0 | 1): string {
  try {
    const formatter = new Intl.DateTimeFormat(locale || 'en', { hour: 'numeric', hour12: true });
    const date = new Date(2026, 0, 1, period === 0 ? 9 : 15);
    const parts = formatter.formatToParts(date);
    const dp = parts.find(p => p.type === 'dayPeriod');
    return dp?.value || (period === 0 ? 'AM' : 'PM');
  } catch {
    return period === 0 ? 'AM' : 'PM';
  }
}

//
// Bounds
//

export function timeSegmentBounds(field: TimeField, hour12: boolean): { min: number; max: number } {
  if (field === 'hour') return hour12 ? { min: 1, max: 12 } : { min: 0, max: 23 };
  if (field === 'minute' || field === 'second') return { min: 0, max: 59 };
  return { min: 0, max: 1 }; // dayPeriod
}

//
// Stepping
//

/**
 * Step a segment by `delta` (+1 / -1). Hour, minute, second **wrap** within their bounds with **no carry** into other
 * fields (mirrors native `<input type="time">`). DayPeriod toggles. In 12-hour mode, stepping the hour does not toggle
 * AM/PM — matches Chrome and React Aria. Empty segments seed from `now` (or 12/0 for hour, 0 for minute/second, AM for
 * dayPeriod).
 */
export function stepTimeSegment(
  segments: TimeSegments,
  field: TimeField,
  delta: -1 | 1,
  hour12: boolean,
  now: Date = new Date(),
): TimeSegments {
  const next = { ...segments };
  const current = segments[field];

  if (field === 'dayPeriod') {
    const seed: 0 | 1 = current == null ? (now.getHours() < 12 ? 0 : 1) : (current as 0 | 1);
    next.dayPeriod = seed === 0 ? 1 : 0;
    return next;
  }

  const { min, max } = timeSegmentBounds(field, hour12);
  if (current == null) {
    // Seed from `now`.
    if (field === 'hour') {
      const h24 = now.getHours();
      next.hour = hour12 ? h24 % 12 || 12 : h24;
    } else if (field === 'minute') {
      next.minute = now.getMinutes();
    } else {
      next.second = now.getSeconds();
    }
    return next;
  }

  const span = max - min + 1;
  const stepped = (((((current as number) - min + delta) % span) + span) % span) + min;
  if (field === 'hour') next.hour = stepped;
  else if (field === 'minute') next.minute = stepped;
  else next.second = stepped;
  return next;
}

//
// Digit typing
//

/**
 * Apply a digit to a time segment. Per-field rules:
 *
 * - **Hour (24-hour, 0–23):** empty + `3..9` commits + advances; empty + `0..2` buffers; buffer `0`/`1` + any digit
 *   combines to `0d`/`1d` (advance); buffer `2` + `0..3` combines to `20..23` (advance); buffer `2` + `4..9` replaces.
 *   `00` stays buffered at `0`.
 * - **Hour (12-hour, 1–12):** same algorithm as the date-input's month (1–12).
 * - **Minute / Second (0–59):** empty + `6..9` commits + advances; empty + `0..5` buffers; buffer + any digit combines
 *   to `0d..59` (advance); buffer + overflow digit replaces.
 *
 * Returns the same `TypeDigitResult` shape the controller expects.
 */
export function typeTimeDigit(field: TimeField, buffer: string, digit: string, hour12: boolean): TypeDigitResult {
  if (!/^[0-9]$/.test(digit)) return { value: bufferToValue(buffer), buffer, advance: false };
  if (field === 'dayPeriod') return { value: bufferToValue(buffer), buffer, advance: false };

  if (field === 'hour') {
    if (hour12) return typeNumericSegment(buffer, digit, 1, 12);
    return typeNumericSegment(buffer, digit, 0, 23);
  }
  // Minute and second: 0–59.
  return typeNumericSegment(buffer, digit, 0, 59);
}

/**
 * Shared digit logic for any two-digit `[min, max]` segment. Same algorithm as the date-input's month/day rule,
 * generalized to arbitrary bounds.
 */
function typeNumericSegment(buffer: string, digit: string, min: number, max: number): TypeDigitResult {
  const d = Number(digit);

  if (buffer === '') {
    // First digit. If no second digit could produce a value <= max, commit + advance.
    if (d === 0 && min === 0) return { value: 0, buffer: '0', advance: false };
    if (d === 0) return { value: null, buffer: '0', advance: false };
    if (d * 10 > max) {
      return { value: clamp(d, min, max), buffer: '', advance: true };
    }
    return { value: d, buffer: digit, advance: false };
  }

  const combined = Number(buffer + digit);
  if (combined >= min && combined <= max) {
    return { value: combined, buffer: '', advance: true };
  }
  if (buffer === '0' && d === 0) {
    return { value: min === 0 ? 0 : null, buffer: '0', advance: false };
  }
  // Combination overflows — replace.
  return typeNumericSegment('', digit, min, max);
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/** Interpret a raw digit buffer as its numeric value. */
export function bufferToValue(buffer: string): number | null {
  if (!buffer) return null;
  const n = Number(buffer);
  return Number.isFinite(n) ? n : null;
}

/** Set AM/PM directly via keystroke (`a`/`A`/`p`/`P`). Returns the new `dayPeriod` value or `null` for no-op. */
export function dayPeriodFromKey(key: string): 0 | 1 | null {
  if (key === 'a' || key === 'A') return 0;
  if (key === 'p' || key === 'P') return 1;
  return null;
}

//
// Display
//

export function formatTimeSegmentText(
  field: TimeField,
  value: number | null,
  buffer: string,
  placeholder: string,
  locale: string,
): string {
  if (field === 'dayPeriod') {
    if (value == null) return placeholder;
    return formatDayPeriod(locale, value as 0 | 1);
  }
  if (buffer) return buffer.padStart(2, '0');
  if (value == null) return placeholder;
  return String(value).padStart(2, '0');
}

//
// Wire format conversion
//

export interface WireOptions {
  hour12: boolean;
  withSeconds: boolean;
}

/** True if every required segment is filled. */
export function isTimeComplete(segments: TimeSegments, opts: WireOptions): boolean {
  if (segments.hour == null || segments.minute == null) return false;
  if (opts.withSeconds && segments.second == null) return false;
  if (opts.hour12 && segments.dayPeriod == null) return false;
  return true;
}

/** True if no segment is filled. */
export function isTimeEmpty(segments: TimeSegments): boolean {
  return segments.hour == null && segments.minute == null && segments.second == null && segments.dayPeriod == null;
}

/**
 * Convert a display-segment group to the canonical HTML `<input type="time">` wire format:
 *  - `HH:mm` when `withSeconds` is false.
 *  - `HH:mm:ss` when `withSeconds` is true.
 *
 * Always 24-hour zero-padded. Returns `''` for incomplete groups.
 */
export function timeSegmentsToWire(segments: TimeSegments, opts: WireOptions): string {
  if (!isTimeComplete(segments, opts)) return '';
  let h24 = segments.hour!;
  if (opts.hour12) {
    const period = segments.dayPeriod!;
    // 12 AM → 0, 12 PM → 12, otherwise add 12 if PM.
    h24 = h24 === 12 ? (period === 0 ? 0 : 12) : period === 1 ? h24 + 12 : h24;
  }
  if (h24 < 0 || h24 > 23) return '';
  const min = segments.minute!;
  if (min < 0 || min > 59) return '';
  const hh = String(h24).padStart(2, '0');
  const mm = String(min).padStart(2, '0');
  if (!opts.withSeconds) return `${hh}:${mm}`;
  const sec = segments.second!;
  if (sec < 0 || sec > 59) return '';
  const ss = String(sec).padStart(2, '0');
  return `${hh}:${mm}:${ss}`;
}

/**
 * Parse the canonical HTML wire format into display segments. Accepts the spec's `HH:mm`, `HH:mm:ss`, and
 * `HH:mm:ss.sss` forms. Returns all-null segments for an empty/invalid string. The fractional component (if any) is
 * preserved on the seconds segment as a whole second (rounded down).
 */
export function wireToTimeSegments(wire: string | null | undefined, opts: WireOptions): TimeSegments {
  const empty: TimeSegments = { hour: null, minute: null, second: null, dayPeriod: null };
  if (!wire) return empty;
  const match = /^(\d{1,2}):(\d{2})(?::(\d{2}(?:\.\d+)?))?$/.exec(wire);
  if (!match) return empty;
  const h24 = Number(match[1]);
  const min = Number(match[2]);
  const sec = match[3] != null ? Math.trunc(Number(match[3])) : null;
  if (!Number.isFinite(h24) || !Number.isFinite(min)) return empty;
  if (h24 < 0 || h24 > 23 || min < 0 || min > 59) return empty;
  if (sec != null && (sec < 0 || sec > 59)) return empty;

  let displayHour: number;
  let dayPeriod: 0 | 1 | null = null;
  if (opts.hour12) {
    dayPeriod = h24 >= 12 ? 1 : 0;
    displayHour = h24 % 12 || 12;
  } else {
    displayHour = h24;
  }
  return {
    hour: displayHour,
    minute: min,
    second: opts.withSeconds ? (sec ?? 0) : null,
    dayPeriod: opts.hour12 ? dayPeriod : null,
  };
}

//
// Step-attribute → format derivation
//

/**
 * Resolve whether the seconds segment should be shown given a `step` value (in seconds, per HTML spec). Mirrors native
 * `<input type="time">`: `step >= 60` and divisible by 60 → no seconds; otherwise → seconds shown. `'any'` → seconds
 * shown (matches modern Chromium).
 */
export function withSecondsForStep(step: number | 'any'): boolean {
  if (step === 'any') return true;
  if (!Number.isFinite(step) || step <= 0) return false;
  return step < 60 || step % 60 !== 0;
}

//
// Controller integration
//

/**
 * Build the `SegmentRules` object the generic `SegmentedFieldController` expects, wired to a host's segment-store
 * getter/setter. Lets the host say "rules: timeSegmentRules({ getSegments, setSegments, hour12, now })" and the
 * controller handles all the rest.
 */
export function timeSegmentRules(opts: {
  getSegments: (group: string) => TimeSegments;
  setSegments: (group: string, next: TimeSegments) => void;
  hour12: () => boolean;
  now?: () => Date;
}): SegmentRules {
  const now = opts.now ?? (() => new Date());
  return {
    typeDigit: (group, field, buffer, digit) => {
      const result = typeTimeDigit(field as TimeField, buffer, digit, opts.hour12());
      const segments = opts.getSegments(group);
      const next: TimeSegments = { ...segments, [field]: result.value };
      opts.setSegments(group, next);
      return result;
    },
    step: (group, field, delta) => {
      const next = stepTimeSegment(opts.getSegments(group), field as TimeField, delta, opts.hour12(), now());
      opts.setSegments(group, next);
      return { value: next[field as TimeField] };
    },
    bounds: (_g, field) => timeSegmentBounds(field as TimeField, opts.hour12()),
    commitBuffer: (group, field, buffer) => {
      const value = bufferToValue(buffer);
      const segments = opts.getSegments(group);
      opts.setSegments(group, { ...segments, [field]: value });
      return value;
    },
    clear: (group, field) => {
      const segments = opts.getSegments(group);
      if (segments[field as TimeField] == null) return false;
      opts.setSegments(group, { ...segments, [field]: null });
      return true;
    },
  };
}
