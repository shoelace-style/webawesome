import { expect } from '@open-wc/testing';
import {
  buildTimeSegmentLayout,
  clearTimeSegmentLayoutCache,
  dayPeriodFromKey,
  formatDayPeriod,
  formatTimeSegmentText,
  isTimeComplete,
  isTimeEmpty,
  resolveHour12,
  stepTimeSegment,
  timeSegmentBounds,
  timeSegmentsToWire,
  typeTimeDigit,
  wireToTimeSegments,
  withSecondsForStep,
  type TimeSegments,
} from './time-segments.js';

describe('time-segments model', () => {
  beforeEach(() => clearTimeSegmentLayoutCache());

  describe('buildTimeSegmentLayout', () => {
    const fields = (locale: string, hour12: boolean, withSeconds: boolean) =>
      buildTimeSegmentLayout(locale, { hour12, withSeconds }).order.join(',');

    it('uses hour,minute,dayPeriod for en-US 12-hour', () => {
      expect(fields('en-US', true, false)).to.equal('hour,minute,dayPeriod');
    });

    it('uses hour,minute for en-GB 24-hour', () => {
      expect(fields('en-GB', false, false)).to.equal('hour,minute');
    });

    it('includes second segment when withSeconds is true', () => {
      expect(fields('en-GB', false, true)).to.equal('hour,minute,second');
      expect(fields('en-US', true, true)).to.equal('hour,minute,second,dayPeriod');
    });

    it('produces the expected number of segments for various locales', () => {
      for (const locale of ['en-US', 'en-GB', 'de-DE', 'ja-JP', 'fr-FR', 'ar-EG', 'ko-KR']) {
        const layout24 = buildTimeSegmentLayout(locale, { hour12: false, withSeconds: false });
        expect(layout24.order.filter(f => f === 'hour' || f === 'minute')).to.have.length(2);
        const layout12 = buildTimeSegmentLayout(locale, { hour12: true, withSeconds: true });
        expect(layout12.order).to.include.members(['hour', 'minute', 'second', 'dayPeriod']);
      }
    });

    it('preserves locale literals (colons / NBSPs) between segments', () => {
      const layout = buildTimeSegmentLayout('en-US', { hour12: true, withSeconds: false });
      const literals = layout.tokens.filter(t => t.kind === 'literal').map(t => (t as { text: string }).text);
      expect(literals.some(l => l.includes(':'))).to.equal(true);
    });

    it('caches per (locale, hour12, withSeconds) combination', () => {
      const a = buildTimeSegmentLayout('en-US', { hour12: true, withSeconds: false });
      const b = buildTimeSegmentLayout('en-US', { hour12: true, withSeconds: false });
      expect(a).to.equal(b);
      expect(buildTimeSegmentLayout('en-US', { hour12: false, withSeconds: false })).to.not.equal(a);
      expect(buildTimeSegmentLayout('en-US', { hour12: true, withSeconds: true })).to.not.equal(a);
    });
  });

  describe('resolveHour12', () => {
    it('returns true for en-US', () => {
      expect(resolveHour12('en-US')).to.equal(true);
    });
    it('returns false for en-GB', () => {
      // en-GB is 24-hour by default in modern Intl.
      expect(resolveHour12('en-GB')).to.equal(false);
    });
    it('returns false for ja-JP', () => {
      expect(resolveHour12('ja-JP')).to.equal(false);
    });
    it('returns false for an unknown locale', () => {
      // Implementation-defined; the function shouldn't throw.
      expect(typeof resolveHour12('xx-XX')).to.equal('boolean');
    });
  });

  describe('formatDayPeriod', () => {
    it('returns "AM"/"PM" for English locales', () => {
      const am = formatDayPeriod('en-US', 0);
      const pm = formatDayPeriod('en-US', 1);
      expect(am).to.match(/AM/i);
      expect(pm).to.match(/PM/i);
    });
  });

  describe('timeSegmentBounds', () => {
    it('hour 12-hour is 1–12, hour 24-hour is 0–23', () => {
      expect(timeSegmentBounds('hour', true)).to.deep.equal({ min: 1, max: 12 });
      expect(timeSegmentBounds('hour', false)).to.deep.equal({ min: 0, max: 23 });
    });
    it('minute / second are 0–59', () => {
      expect(timeSegmentBounds('minute', false)).to.deep.equal({ min: 0, max: 59 });
      expect(timeSegmentBounds('second', false)).to.deep.equal({ min: 0, max: 59 });
    });
    it('dayPeriod is 0–1', () => {
      expect(timeSegmentBounds('dayPeriod', true)).to.deep.equal({ min: 0, max: 1 });
    });
  });

  describe('stepTimeSegment', () => {
    const now = new Date(2026, 0, 1, 14, 30, 15);

    it('wraps hour 23 → 0 in 24-hour mode', () => {
      const next = stepTimeSegment({ hour: 23, minute: 0, second: null, dayPeriod: null }, 'hour', 1, false, now);
      expect(next.hour).to.equal(0);
    });

    it('wraps hour 12 → 1 in 12-hour mode and does NOT toggle dayPeriod', () => {
      const next = stepTimeSegment({ hour: 12, minute: 0, second: null, dayPeriod: 1 }, 'hour', 1, true, now);
      expect(next.hour).to.equal(1);
      expect(next.dayPeriod).to.equal(1); // PM stays PM
    });

    it('wraps hour 1 → 12 going down in 12-hour mode', () => {
      const next = stepTimeSegment({ hour: 1, minute: 0, second: null, dayPeriod: 0 }, 'hour', -1, true, now);
      expect(next.hour).to.equal(12);
    });

    it('wraps minute 59 → 0 with no carry into hour', () => {
      const next = stepTimeSegment({ hour: 10, minute: 59, second: null, dayPeriod: null }, 'minute', 1, false, now);
      expect(next.minute).to.equal(0);
      expect(next.hour).to.equal(10);
    });

    it('wraps minute 0 → 59 going down', () => {
      const next = stepTimeSegment({ hour: 10, minute: 0, second: null, dayPeriod: null }, 'minute', -1, false, now);
      expect(next.minute).to.equal(59);
    });

    it('wraps second 59 → 0 with no carry', () => {
      const next = stepTimeSegment({ hour: 10, minute: 30, second: 59, dayPeriod: null }, 'second', 1, false, now);
      expect(next.second).to.equal(0);
      expect(next.minute).to.equal(30);
    });

    it('toggles dayPeriod AM ↔ PM', () => {
      let next = stepTimeSegment({ hour: 9, minute: 0, second: null, dayPeriod: 0 }, 'dayPeriod', 1, true, now);
      expect(next.dayPeriod).to.equal(1);
      next = stepTimeSegment({ ...next }, 'dayPeriod', -1, true, now);
      expect(next.dayPeriod).to.equal(0);
    });

    it('seeds an empty hour from now', () => {
      const next = stepTimeSegment({ hour: null, minute: null, second: null, dayPeriod: null }, 'hour', 1, false, now);
      expect(next.hour).to.equal(14);
    });

    it('seeds an empty 12-hour hour from now (PM noon → 12 + period 1)', () => {
      const next = stepTimeSegment({ hour: null, minute: null, second: null, dayPeriod: null }, 'hour', 1, true, now);
      // 14:30 → 12-hour: 2 PM
      expect(next.hour).to.equal(2);
    });

    it('seeds an empty dayPeriod from now', () => {
      const morning = new Date(2026, 0, 1, 9, 0);
      const evening = new Date(2026, 0, 1, 19, 0);
      const am = stepTimeSegment(
        { hour: null, minute: null, second: null, dayPeriod: null },
        'dayPeriod',
        1,
        true,
        morning,
      );
      // Empty + now is AM → toggle to PM
      expect(am.dayPeriod).to.equal(1);
      const pm = stepTimeSegment(
        { hour: null, minute: null, second: null, dayPeriod: null },
        'dayPeriod',
        1,
        true,
        evening,
      );
      // Empty + now is PM → toggle to AM
      expect(pm.dayPeriod).to.equal(0);
    });
  });

  describe('typeTimeDigit — hour (24-hour, 0–23)', () => {
    it('commits + advances on digits that cannot start a 2-digit hour', () => {
      // d * 10 > 23 → commit immediately. 3 * 10 = 30 > 23, so 3 commits.
      expect(typeTimeDigit('hour', '', '3', false)).to.deep.equal({ value: 3, buffer: '', advance: true });
      expect(typeTimeDigit('hour', '', '9', false)).to.deep.equal({ value: 9, buffer: '', advance: true });
    });

    it('buffers 0/1/2 (a second digit is possible)', () => {
      expect(typeTimeDigit('hour', '', '0', false)).to.deep.equal({ value: 0, buffer: '0', advance: false });
      expect(typeTimeDigit('hour', '', '1', false)).to.deep.equal({ value: 1, buffer: '1', advance: false });
      expect(typeTimeDigit('hour', '', '2', false)).to.deep.equal({ value: 2, buffer: '2', advance: false });
    });

    it('completes 1d → 10–19 and advances', () => {
      expect(typeTimeDigit('hour', '1', '0', false)).to.deep.equal({ value: 10, buffer: '', advance: true });
      expect(typeTimeDigit('hour', '1', '9', false)).to.deep.equal({ value: 19, buffer: '', advance: true });
    });

    it('completes 2d → 20–23 and advances', () => {
      expect(typeTimeDigit('hour', '2', '0', false)).to.deep.equal({ value: 20, buffer: '', advance: true });
      expect(typeTimeDigit('hour', '2', '3', false)).to.deep.equal({ value: 23, buffer: '', advance: true });
    });

    it('replaces on overflow: 2 then 5 → hour 5', () => {
      expect(typeTimeDigit('hour', '2', '5', false)).to.deep.equal({ value: 5, buffer: '', advance: true });
    });

    it('completes 0d → 0–9 and advances', () => {
      expect(typeTimeDigit('hour', '0', '5', false)).to.deep.equal({ value: 5, buffer: '', advance: true });
    });
  });

  describe('typeTimeDigit — hour (12-hour, 1–12)', () => {
    it('commits 2..9 immediately', () => {
      expect(typeTimeDigit('hour', '', '5', true)).to.deep.equal({ value: 5, buffer: '', advance: true });
    });

    it('buffers 1 (could become 10/11/12)', () => {
      expect(typeTimeDigit('hour', '', '1', true)).to.deep.equal({ value: 1, buffer: '1', advance: false });
    });

    it('completes 1d → 10/11/12 and advances', () => {
      expect(typeTimeDigit('hour', '1', '0', true)).to.deep.equal({ value: 10, buffer: '', advance: true });
      expect(typeTimeDigit('hour', '1', '2', true)).to.deep.equal({ value: 12, buffer: '', advance: true });
    });

    it('replaces on overflow: 1 then 3 → hour 3', () => {
      expect(typeTimeDigit('hour', '1', '3', true)).to.deep.equal({ value: 3, buffer: '', advance: true });
    });
  });

  describe('typeTimeDigit — minute / second (0–59)', () => {
    it('commits + advances on 6..9', () => {
      expect(typeTimeDigit('minute', '', '6', false)).to.deep.equal({ value: 6, buffer: '', advance: true });
      expect(typeTimeDigit('second', '', '9', false)).to.deep.equal({ value: 9, buffer: '', advance: true });
    });

    it('buffers 0..5', () => {
      expect(typeTimeDigit('minute', '', '0', false)).to.deep.equal({ value: 0, buffer: '0', advance: false });
      expect(typeTimeDigit('minute', '', '5', false)).to.deep.equal({ value: 5, buffer: '5', advance: false });
    });

    it('completes 5d → 50–59 and advances', () => {
      expect(typeTimeDigit('minute', '5', '9', false)).to.deep.equal({ value: 59, buffer: '', advance: true });
    });

    it('completes 0d → 0–9 and advances', () => {
      expect(typeTimeDigit('minute', '0', '7', false)).to.deep.equal({ value: 7, buffer: '', advance: true });
    });
  });

  describe('typeTimeDigit — dayPeriod', () => {
    it('does not respond to digits', () => {
      expect(typeTimeDigit('dayPeriod', '', '5', true)).to.deep.equal({ value: null, buffer: '', advance: false });
    });
  });

  describe('dayPeriodFromKey', () => {
    it('maps a/A → 0 (AM), p/P → 1 (PM)', () => {
      expect(dayPeriodFromKey('a')).to.equal(0);
      expect(dayPeriodFromKey('A')).to.equal(0);
      expect(dayPeriodFromKey('p')).to.equal(1);
      expect(dayPeriodFromKey('P')).to.equal(1);
    });
    it('returns null for other keys', () => {
      expect(dayPeriodFromKey('m')).to.equal(null);
      expect(dayPeriodFromKey(' ')).to.equal(null);
    });
  });

  describe('isTimeComplete / isTimeEmpty', () => {
    it('detects complete 24-hour time', () => {
      const s: TimeSegments = { hour: 10, minute: 30, second: null, dayPeriod: null };
      expect(isTimeComplete(s, { hour12: false, withSeconds: false })).to.equal(true);
    });

    it('requires seconds when withSeconds=true', () => {
      const s: TimeSegments = { hour: 10, minute: 30, second: null, dayPeriod: null };
      expect(isTimeComplete(s, { hour12: false, withSeconds: true })).to.equal(false);
    });

    it('requires dayPeriod when hour12=true', () => {
      const s: TimeSegments = { hour: 10, minute: 30, second: null, dayPeriod: null };
      expect(isTimeComplete(s, { hour12: true, withSeconds: false })).to.equal(false);
    });

    it('detects empty', () => {
      expect(isTimeEmpty({ hour: null, minute: null, second: null, dayPeriod: null })).to.equal(true);
      expect(isTimeEmpty({ hour: 1, minute: null, second: null, dayPeriod: null })).to.equal(false);
    });
  });

  describe('timeSegmentsToWire (24-hour mode)', () => {
    it('formats HH:mm', () => {
      const w = timeSegmentsToWire(
        { hour: 9, minute: 5, second: null, dayPeriod: null },
        { hour12: false, withSeconds: false },
      );
      expect(w).to.equal('09:05');
    });

    it('formats HH:mm:ss with seconds', () => {
      const w = timeSegmentsToWire(
        { hour: 23, minute: 5, second: 7, dayPeriod: null },
        { hour12: false, withSeconds: true },
      );
      expect(w).to.equal('23:05:07');
    });

    it('returns empty for incomplete', () => {
      expect(
        timeSegmentsToWire(
          { hour: 9, minute: null, second: null, dayPeriod: null },
          { hour12: false, withSeconds: false },
        ),
      ).to.equal('');
    });
  });

  describe('timeSegmentsToWire (12-hour mode)', () => {
    it('1 PM → 13:00', () => {
      const w = timeSegmentsToWire(
        { hour: 1, minute: 0, second: null, dayPeriod: 1 },
        { hour12: true, withSeconds: false },
      );
      expect(w).to.equal('13:00');
    });

    it('12 AM → 00:00', () => {
      const w = timeSegmentsToWire(
        { hour: 12, minute: 0, second: null, dayPeriod: 0 },
        { hour12: true, withSeconds: false },
      );
      expect(w).to.equal('00:00');
    });

    it('12 PM → 12:00', () => {
      const w = timeSegmentsToWire(
        { hour: 12, minute: 0, second: null, dayPeriod: 1 },
        { hour12: true, withSeconds: false },
      );
      expect(w).to.equal('12:00');
    });

    it('11:59 PM → 23:59', () => {
      const w = timeSegmentsToWire(
        { hour: 11, minute: 59, second: null, dayPeriod: 1 },
        { hour12: true, withSeconds: false },
      );
      expect(w).to.equal('23:59');
    });
  });

  describe('wireToTimeSegments', () => {
    it('parses HH:mm', () => {
      expect(wireToTimeSegments('09:30', { hour12: false, withSeconds: false })).to.deep.equal({
        hour: 9,
        minute: 30,
        second: null,
        dayPeriod: null,
      });
    });

    it('parses HH:mm:ss', () => {
      expect(wireToTimeSegments('14:05:07', { hour12: false, withSeconds: true })).to.deep.equal({
        hour: 14,
        minute: 5,
        second: 7,
        dayPeriod: null,
      });
    });

    it('parses HH:mm:ss.sss (truncating fractional seconds)', () => {
      expect(wireToTimeSegments('14:05:07.500', { hour12: false, withSeconds: true })).to.deep.equal({
        hour: 14,
        minute: 5,
        second: 7,
        dayPeriod: null,
      });
    });

    it('converts 13:00 to 1 PM in 12-hour mode', () => {
      expect(wireToTimeSegments('13:00', { hour12: true, withSeconds: false })).to.deep.equal({
        hour: 1,
        minute: 0,
        second: null,
        dayPeriod: 1,
      });
    });

    it('converts 00:00 to 12 AM in 12-hour mode', () => {
      expect(wireToTimeSegments('00:00', { hour12: true, withSeconds: false })).to.deep.equal({
        hour: 12,
        minute: 0,
        second: null,
        dayPeriod: 0,
      });
    });

    it('converts 12:00 to 12 PM in 12-hour mode', () => {
      expect(wireToTimeSegments('12:00', { hour12: true, withSeconds: false })).to.deep.equal({
        hour: 12,
        minute: 0,
        second: null,
        dayPeriod: 1,
      });
    });

    it('returns all-null for an empty string', () => {
      expect(wireToTimeSegments('', { hour12: false, withSeconds: false })).to.deep.equal({
        hour: null,
        minute: null,
        second: null,
        dayPeriod: null,
      });
    });

    it('returns all-null for an invalid string', () => {
      expect(wireToTimeSegments('99:99', { hour12: false, withSeconds: false })).to.deep.equal({
        hour: null,
        minute: null,
        second: null,
        dayPeriod: null,
      });
    });
  });

  describe('round-trip (wire ↔ segments)', () => {
    const cases: Array<{ wire: string; hour12: boolean; withSeconds: boolean }> = [
      { wire: '00:00', hour12: false, withSeconds: false },
      { wire: '23:59', hour12: false, withSeconds: false },
      { wire: '12:34:56', hour12: false, withSeconds: true },
      { wire: '00:00', hour12: true, withSeconds: false },
      { wire: '12:00', hour12: true, withSeconds: false },
      { wire: '13:30', hour12: true, withSeconds: false },
    ];
    for (const { wire, hour12, withSeconds } of cases) {
      it(`round-trips ${wire} (hour12=${hour12}, withSeconds=${withSeconds})`, () => {
        const opts = { hour12, withSeconds };
        const segments = wireToTimeSegments(wire, opts);
        expect(timeSegmentsToWire(segments, opts)).to.equal(wire);
      });
    }
  });

  describe('formatTimeSegmentText', () => {
    it('zero-pads hour/minute/second values', () => {
      expect(formatTimeSegmentText('hour', 7, '', 'HH', 'en-US')).to.equal('07');
      expect(formatTimeSegmentText('minute', 3, '', 'MM', 'en-US')).to.equal('03');
    });

    it('shows the placeholder for empty segments', () => {
      expect(formatTimeSegmentText('hour', null, '', 'HH', 'en-US')).to.equal('HH');
    });

    it('formats dayPeriod as localized AM/PM', () => {
      expect(formatTimeSegmentText('dayPeriod', 0, '', '--', 'en-US')).to.match(/AM/i);
      expect(formatTimeSegmentText('dayPeriod', 1, '', '--', 'en-US')).to.match(/PM/i);
    });

    it('shows the placeholder for empty dayPeriod', () => {
      expect(formatTimeSegmentText('dayPeriod', null, '', '--', 'en-US')).to.equal('--');
    });

    it('shows raw buffer mid-entry, zero-padded', () => {
      expect(formatTimeSegmentText('hour', null, '1', 'HH', 'en-US')).to.equal('01');
    });
  });

  describe('withSecondsForStep', () => {
    it('returns false for step >= 60 and divisible by 60', () => {
      expect(withSecondsForStep(60)).to.equal(false);
      expect(withSecondsForStep(300)).to.equal(false);
      expect(withSecondsForStep(3600)).to.equal(false);
    });
    it('returns true for sub-minute steps', () => {
      expect(withSecondsForStep(1)).to.equal(true);
      expect(withSecondsForStep(5)).to.equal(true);
      expect(withSecondsForStep(30)).to.equal(true);
    });
    it("returns true for 'any'", () => {
      expect(withSecondsForStep('any')).to.equal(true);
    });
    it('returns true for steps that are not divisible by 60', () => {
      expect(withSecondsForStep(90)).to.equal(true);
    });
    it('returns false for invalid steps', () => {
      expect(withSecondsForStep(0)).to.equal(false);
      expect(withSecondsForStep(-1)).to.equal(false);
    });
  });
});
