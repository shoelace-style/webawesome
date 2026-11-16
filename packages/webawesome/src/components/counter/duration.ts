export type CounterUnit = 'years' | 'months' | 'days' | 'hours' | 'minutes' | 'seconds';

/** Every unit, largest to smallest. */
export const counterUnits: CounterUnit[] = ['years', 'months', 'days', 'hours', 'minutes', 'seconds'];

/** The fixed-length units in milliseconds. Months and years vary, so they have no fixed length. */
export const unitLengths: Partial<Record<CounterUnit, number>> &
  Record<'days' | 'hours' | 'minutes' | 'seconds', number> = {
  days: 86_400_000,
  hours: 3_600_000,
  minutes: 60_000,
  seconds: 1000,
};

/**
 * Splits the time between two dates into units from `largest` to `smallest`. Time beyond the largest unit rolls up into
 * it and time below the smallest unit is truncated. An end date before the start date is treated as equal.
 *
 * Years and months follow the local calendar, so a month from Jan 31 is Feb 28 (or 29) and "3 months until" a local date
 * matches what a wall calendar says. Days and smaller units are exact elapsed time measured from the last whole month,
 * so a day is always 24 real hours. Across a DST change the hours show the real time left (a span with a spring-forward
 * night is one hour shorter) and no value can go negative.
 */
export function getDuration(
  from: Date,
  to: Date,
  largest: CounterUnit,
  smallest: CounterUnit,
): Partial<Record<CounterUnit, number>> {
  const shown = counterUnits.slice(counterUnits.indexOf(largest), counterUnits.indexOf(smallest) + 1);
  const result: Partial<Record<CounterUnit, number>> = {};
  let anchor = from;

  if (to < from) {
    to = from;
  }

  if (largest === 'years' || largest === 'months') {
    // Count calendar months, then step back one if the last month isn't complete yet.
    let months = (to.getFullYear() - from.getFullYear()) * 12 + to.getMonth() - from.getMonth();
    if (addMonths(from, months) > to) {
      months--;
    }
    anchor = addMonths(from, months);

    if (largest === 'years') {
      result.years = Math.floor(months / 12);
      months %= 12;
    }
    if (shown.includes('months')) {
      result.months = months;
    }
  }

  let rest = to.getTime() - anchor.getTime();
  for (const unit of ['days', 'hours', 'minutes', 'seconds'] as const) {
    if (shown.includes(unit)) {
      result[unit] = Math.floor(rest / unitLengths[unit]);
      rest %= unitLengths[unit];
    }
  }

  return result;
}

/** Adds calendar months in local time, clamping to the last day of a shorter month. */
function addMonths(date: Date, months: number) {
  // Setters are used because the Date constructor maps years 0 to 99 onto 1900 to 1999.
  const result = new Date(date.getTime());
  result.setFullYear(date.getFullYear(), date.getMonth() + months, 1);

  const lastDay = new Date(result.getTime());
  lastDay.setMonth(lastDay.getMonth() + 1, 0);
  result.setDate(Math.min(date.getDate(), lastDay.getDate()));

  return result;
}
