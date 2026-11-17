import { aTimeout, expect, oneEvent, waitUntil } from '@open-wc/testing';
import { html, type TemplateResult } from 'lit';
import sinon from 'sinon';
import { fixtures } from '../../internal/test/fixture.js';
import type WaCounter from './counter.js';
import { getDuration } from './duration.js';

const second = 1000;
const minute = 60 * second;
const hour = 60 * minute;
const day = 24 * hour;

// Dates are set relative to the real clock. A small offset keeps the shown seconds stable while the fixture renders.
function ago(ms: number) {
  return new Date(Date.now() - ms - 100).toISOString();
}

function fromNow(ms: number) {
  return new Date(Date.now() + ms - 100).toISOString();
}

function getValues(el: WaCounter) {
  return [...el.shadowRoot!.querySelectorAll('[part~="value"]')].map(value => value.textContent);
}

// Leading zero units are hidden, so values are read by unit instead of by position
function getValue(el: WaCounter, unit: string) {
  return el.shadowRoot!.querySelector(`[part~="unit"]:has(slot[name="${unit}"]) [part~="value"]`)?.textContent;
}

// Reads the visible default label, not the hidden sizer
function getLabelText(container: Element) {
  return container.querySelector('.default-label > :first-child')!.textContent;
}

function getLabels(el: WaCounter) {
  return [...el.shadowRoot!.querySelectorAll('[part~="label"]')].map(getLabelText);
}

function getUnits(el: WaCounter) {
  return [...el.shadowRoot!.querySelectorAll<HTMLSlotElement>('[part~="unit"] slot')].map(slot => slot.name);
}

function getPhrase(el: WaCounter) {
  return el.shadowRoot!.querySelector('.wa-visually-hidden')!.textContent;
}

describe('<wa-counter>', () => {
  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      // Hydrated counters compute their values in the update after hydration
      async function createCounter(template: TemplateResult) {
        const el = await fixture<WaCounter>(template);
        await el.updateComplete;
        return el;
      }

      // Catches events dispatched during the first render, before a test can listen on the element
      let finishSpy: sinon.SinonSpy;

      beforeEach(() => {
        finishSpy = sinon.spy();
        document.addEventListener('wa-finish', finishSpy);
      });

      afterEach(() => {
        document.removeEventListener('wa-finish', finishSpy);
      });

      describe('defaults', () => {
        it('has the default property values', async () => {
          const el = await createCounter(html`<wa-counter></wa-counter>`);

          expect(el.date).to.be.undefined;
          expect(el.direction).to.equal('down');
          expect(el.label).to.equal('');
          expect(el.largestUnit).to.equal('days');
          expect(el.smallestUnit).to.equal('seconds');
          expect(el.format).to.equal('long');
          expect(el.withoutLabels).to.be.false;
          expect(el.delimiter).to.equal('');
          expect(el.paused).to.be.false;
          expect(el.valueFormatter).to.be.undefined;
        });

        it('shows zeros for days through seconds without a date', async () => {
          const el = await createCounter(html`<wa-counter lang="en"></wa-counter>`);

          expect(getUnits(el)).to.deep.equal(['days', 'hours', 'minutes', 'seconds']);
          expect(getValues(el)).to.deep.equal(['00', '00', '00', '00']);
          expect(getLabels(el)).to.deep.equal(['days', 'hours', 'minutes', 'seconds']);
          expect(el.customStates.has('finished')).to.be.false;
        });
      });

      it('renders no whitespace between elements', async () => {
        const el = await createCounter(html`<wa-counter delimiter=":"></wa-counter>`);
        const walker = document.createTreeWalker(el.shadowRoot!, NodeFilter.SHOW_TEXT);
        const whitespace: Node[] = [];

        while (walker.nextNode()) {
          if (walker.currentNode.parentElement?.localName !== 'style' && !walker.currentNode.textContent!.trim()) {
            whitespace.push(walker.currentNode);
          }
        }

        expect(whitespace).to.have.lengthOf(0);
      });

      describe('accessibility', () => {
        it('passes an accessibility audit', async () => {
          const el = await createCounter(html`<wa-counter label="Time left" date=${fromNow(day)}></wa-counter>`);
          await expect(el).to.be.accessible();
        });

        it('sets the timer role and label on the host', async () => {
          const el = await createCounter(html`<wa-counter label="Time left"></wa-counter>`);

          expect(el.internals.role).to.equal('timer');
          expect(el.internals.ariaLabel).to.equal('Time left');

          el.label = '';
          await el.updateComplete;
          expect(el.internals.ariaLabel).to.be.null;
        });

        it('hides the visible units and announces a readable phrase', async () => {
          const date = ago(2 * day + 3 * hour + 5 * minute + 9 * second);
          const el = await createCounter(html`<wa-counter lang="en" direction="up" date=${date}></wa-counter>`);

          expect(getPhrase(el)).to.equal('2 days 3 hours 5 minutes 9 seconds');
          el.shadowRoot!.querySelectorAll('[part~="unit"]').forEach(unit => {
            expect(unit.getAttribute('aria-hidden')).to.equal('true');
          });
        });

        it('drops leading zero units from the phrase and keeps inner zeros', async () => {
          const el = await createCounter(
            html`<wa-counter lang="en" direction="up" date=${ago(2 * second)} paused></wa-counter>`,
          );
          expect(getPhrase(el)).to.equal('2 seconds');

          el.date = ago(3 * hour + 9 * second);
          await el.updateComplete;
          expect(getPhrase(el)).to.equal('3 hours 0 minutes 9 seconds');
        });

        it('reads only the smallest unit when every value is zero', async () => {
          const el = await createCounter(html`<wa-counter lang="en"></wa-counter>`);
          expect(getPhrase(el)).to.equal('0 seconds');
        });
      });

      describe('units', () => {
        it('shows the range from largest-unit to smallest-unit', async () => {
          const el = await createCounter(
            html`<wa-counter lang="en" largest-unit="years" smallest-unit="minutes"></wa-counter>`,
          );
          expect(getUnits(el)).to.deep.equal(['years', 'months', 'days', 'hours', 'minutes']);
        });

        it('rolls time beyond the largest unit into it', async () => {
          const date = fromNow(2 * day + 3 * hour + 30 * minute);
          const el = await createCounter(
            html`<wa-counter largest-unit="hours" smallest-unit="minutes" date=${date}></wa-counter>`,
          );

          expect(getUnits(el)).to.deep.equal(['hours', 'minutes']);
          expect(getValues(el)).to.deep.equal(['51', '30']);
        });

        it('hides zero units ahead of the first non-zero unit and keeps inner zeros', async () => {
          const date = ago(3 * hour + 9 * second);
          const el = await createCounter(html`<wa-counter direction="up" date=${date} paused></wa-counter>`);

          expect(getUnits(el)).to.deep.equal(['hours', 'minutes', 'seconds']);
          expect(getValues(el)).to.deep.equal(['03', '00', '09']);

          el.date = ago(2 * day);
          await el.updateComplete;
          expect(getUnits(el)).to.deep.equal(['days', 'hours', 'minutes', 'seconds']);
        });

        it('keeps leading zero units without labels', async () => {
          const date = ago(3 * hour + 9 * second);
          const el = await createCounter(
            html`<wa-counter direction="up" date=${date} paused without-labels delimiter=":"></wa-counter>`,
          );

          expect(getValues(el)).to.deep.equal(['00', '03', '00', '09']);
          expect(el.shadowRoot!.querySelectorAll('[part~="delimiter"]')).to.have.lengthOf(3);
        });

        it('shows one fewer delimiter than units when leading zero units are hidden', async () => {
          const date = ago(3 * hour + 9 * second);
          const el = await createCounter(
            html`<wa-counter direction="up" date=${date} paused delimiter="·"></wa-counter>`,
          );

          expect(getUnits(el)).to.deep.equal(['hours', 'minutes', 'seconds']);
          expect(el.shadowRoot!.querySelectorAll('[part~="delimiter"]')).to.have.lengthOf(2);
          expect(el.shadowRoot!.querySelector('[part~="delimiter"]')!.previousElementSibling!.matches('.unit')).to.be
            .true;
        });

        it('falls back to the default range for an invalid unit', async () => {
          const el = await createCounter(html`<wa-counter largest-unit="weeks"></wa-counter>`);
          expect(getUnits(el)).to.deep.equal(['days', 'hours', 'minutes', 'seconds']);
        });

        it('falls back to the default range when the smallest unit is larger than the largest', async () => {
          const el = await createCounter(html`<wa-counter largest-unit="minutes" smallest-unit="days"></wa-counter>`);
          expect(getUnits(el)).to.deep.equal(['days', 'hours', 'minutes', 'seconds']);
        });
      });

      describe('counting down', () => {
        it('shows the time left', async () => {
          const date = fromNow(2 * day + 3 * hour + 5 * minute + 9 * second);
          const el = await createCounter(html`<wa-counter date=${date}></wa-counter>`);

          expect(getValues(el)).to.deep.equal(['02', '03', '05', '09']);
          expect(el.customStates.has('finished')).to.be.false;
        });

        it('ticks to zero, sets the finished state, and emits wa-finish once', async () => {
          const el = await createCounter(
            html`<wa-counter date=${new Date(Date.now() + 1200).toISOString()}></wa-counter>`,
          );
          expect(Number(getValue(el, 'seconds'))).to.be.greaterThan(0);

          // The zero is already rendered when the event is emitted
          let valuesAtFinish: (string | null)[] = [];
          el.addEventListener('wa-finish', () => (valuesAtFinish = getValues(el)), { once: true });
          await oneEvent(el, 'wa-finish');

          expect(valuesAtFinish).to.deep.equal(['00']);
          expect(el.customStates.has('finished')).to.be.true;

          // Re-rendering after the finish doesn't emit again
          await aTimeout(200);
          el.label = 'Done';
          await el.updateComplete;
          expect(finishSpy.callCount).to.equal(1);
        });

        it('rounds a countdown up to its smallest unit so zero arrives with the finish', async () => {
          const el = await createCounter(
            html`<wa-counter smallest-unit="minutes" date=${new Date(Date.now() + 20_000).toISOString()}></wa-counter>`,
          );

          expect(getValues(el)).to.deep.equal(['01']);
          expect(el.customStates.has('finished')).to.be.false;
        });

        it('shows zero and the finished state without emitting for a date in the past', async () => {
          const el = await createCounter(html`<wa-counter date=${ago(day)}></wa-counter>`);

          expect(getValues(el)).to.deep.equal(['00']);
          expect(el.customStates.has('finished')).to.be.true;
          expect(finishSpy.called).to.be.false;
        });

        it('clears the finished state and resumes when a new future date is set', async () => {
          const el = await createCounter(html`<wa-counter date=${ago(day)}></wa-counter>`);
          expect(el.customStates.has('finished')).to.be.true;

          el.date = new Date(Date.now() + hour + 10 * second);
          await el.updateComplete;
          expect(el.customStates.has('finished')).to.be.false;
          expect(getValue(el, 'hours')).to.equal('01');

          const seconds = getValue(el, 'seconds');
          await waitUntil(() => getValue(el, 'seconds') !== seconds, 'The counter did not tick', { timeout: 1500 });
          expect(finishSpy.called).to.be.false;
        });
      });

      describe('counting up', () => {
        it('counts up from a past date', async () => {
          const date = ago(day + 2 * hour + 3 * minute + 4 * second);
          const el = await createCounter(html`<wa-counter direction="up" date=${date}></wa-counter>`);

          expect(getValues(el)).to.deep.equal(['01', '02', '03', '04']);

          await waitUntil(() => getValue(el, 'seconds') === '05', 'The counter did not tick', { timeout: 1500 });
          expect(el.customStates.has('finished')).to.be.false;
        });

        it('counts up from the moment it starts without a date', async () => {
          const el = await createCounter(html`<wa-counter direction="up"></wa-counter>`);

          expect(getValues(el)).to.deep.equal(['00']);
          await waitUntil(() => getValue(el, 'seconds') === '01', 'The counter did not tick', { timeout: 1500 });
        });

        it('shows zero until a future date passes', async () => {
          const el = await createCounter(html`<wa-counter direction="up" date=${fromNow(hour)}></wa-counter>`);

          expect(getValues(el)).to.deep.equal(['00']);
          expect(el.customStates.has('finished')).to.be.false;
        });
      });

      it('shows zeros and does nothing else for an invalid date', async () => {
        const el = await createCounter(html`<wa-counter date="not-a-date"></wa-counter>`);

        expect(getValues(el)).to.deep.equal(['00', '00', '00', '00']);
        expect(el.customStates.has('finished')).to.be.false;
        expect(finishSpy.called).to.be.false;
      });

      describe('paused', () => {
        it('freezes the display and resumes from the time shown', async () => {
          const el = await createCounter(html`<wa-counter direction="up" date=${ago(5 * second)} paused></wa-counter>`);
          expect(getValue(el, 'seconds')).to.equal('05');

          await aTimeout(1100);
          expect(getValue(el, 'seconds')).to.equal('05');

          el.paused = false;
          await el.updateComplete;
          expect(getValue(el, 'seconds')).to.equal('05');
          await waitUntil(() => getValue(el, 'seconds') === '06', 'The counter did not resume', { timeout: 1200 });

          // Setting the date clears the time spent paused
          el.date = ago(minute);
          await el.updateComplete;
          expect(getValues(el)).to.deep.equal(['01', '00']);
        });
      });

      describe('labels', () => {
        it('uses long labels by default', async () => {
          const el = await createCounter(html`<wa-counter lang="en"></wa-counter>`);
          expect(getLabels(el)).to.deep.equal(['days', 'hours', 'minutes', 'seconds']);
        });

        it('uses short labels', async () => {
          const el = await createCounter(html`<wa-counter lang="en" format="short"></wa-counter>`);
          expect(getLabels(el)[1]).to.equal('hr');
        });

        it('uses narrow labels', async () => {
          const el = await createCounter(html`<wa-counter lang="en" format="narrow"></wa-counter>`);
          expect(getLabels(el)[1]).to.equal('h');
        });

        it('falls back to long labels for an invalid format', async () => {
          const el = await createCounter(html`<wa-counter lang="en" format="medium"></wa-counter>`);
          expect(getLabels(el)[1]).to.equal('hours');

          el.removeAttribute('format');
          await el.updateComplete;
          expect(getLabels(el)[1]).to.equal('hours');
        });

        it('uses singular labels for a value of one', async () => {
          const date = ago(day + hour + minute + second);
          const el = await createCounter(html`<wa-counter lang="en" direction="up" date=${date}></wa-counter>`);
          expect(getLabels(el)).to.deep.equal(['day', 'hour', 'minute', 'second']);
        });

        it('hides the labels with without-labels', async () => {
          const el = await createCounter(html`<wa-counter without-labels></wa-counter>`);
          const label = el.shadowRoot!.querySelector('[part~="label"]')!;

          expect(el.hasAttribute('without-labels')).to.be.true;
          expect(getComputedStyle(label).display).to.equal('none');
        });

        it('uses slotted content as custom labels', async () => {
          const el = await createCounter(html`<wa-counter lang="en"><span slot="days">Sleeps</span></wa-counter>`);
          const days = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="days"]')!;
          const hours = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="hours"]')!;

          expect(days.assignedElements()[0].textContent).to.equal('Sleeps');
          expect(hours.assignedElements()).to.have.lengthOf(0);
          expect(getLabelText(hours)).to.equal('hours');
        });

        it('keeps the width of a unit when its label changes between singular and plural', async () => {
          const el = await createCounter(
            html`<wa-counter lang="en" direction="up" date=${ago(second)} paused></wa-counter>`,
          );
          const unit = el.shadowRoot!.querySelector('[part~="unit"]:has(slot[name="seconds"])')!;
          expect(getLabels(el)).to.deep.equal(['second']);
          const singularWidth = unit.getBoundingClientRect().width;

          el.date = ago(2 * second);
          await el.updateComplete;
          expect(getLabels(el)).to.deep.equal(['seconds']);
          expect(unit.getBoundingClientRect().width).to.equal(singularWidth);
        });

        it('does not widen slotted labels', async () => {
          const el = await createCounter(html`<wa-counter lang="en"><span slot="seconds">s</span></wa-counter>`);
          const label = el.shadowRoot!.querySelectorAll('[part~="label"]')[3];
          const slotted = el.querySelector('[slot="seconds"]')!;

          expect(label.getBoundingClientRect().width).to.be.closeTo(slotted.getBoundingClientRect().width, 0.5);
        });
      });

      describe('delimiter', () => {
        it('shows no delimiters by default', async () => {
          const el = await createCounter(html`<wa-counter></wa-counter>`);
          expect(el.shadowRoot!.querySelectorAll('[part~="delimiter"]')).to.have.lengthOf(0);
        });

        it('shows a delimiter between each unit', async () => {
          const el = await createCounter(html`<wa-counter delimiter=":"></wa-counter>`);
          const delimiters = [...el.shadowRoot!.querySelectorAll('[part~="delimiter"]')];

          expect(delimiters.map(delimiter => delimiter.textContent)).to.deep.equal([':', ':', ':']);
          delimiters.forEach(delimiter => expect(delimiter.getAttribute('aria-hidden')).to.equal('true'));
        });
      });

      describe('direction', () => {
        it('lays out clock-style counters left to right and labeled counters right to left in RTL', async () => {
          const container = await fixture<HTMLElement>(
            html`<div dir="rtl"><wa-counter without-labels delimiter=":"></wa-counter><wa-counter></wa-counter></div>`,
          );
          const [clock, labeled] = [...container.querySelectorAll<WaCounter>('wa-counter')];
          await Promise.all([clock.updateComplete, labeled.updateComplete]);

          const position = (el: WaCounter, index: number) =>
            el.shadowRoot!.querySelectorAll('[part~="unit"]')[index].getBoundingClientRect().left;

          expect(position(clock, 0)).to.be.lessThan(position(clock, 3));
          expect(position(labeled, 0)).to.be.greaterThan(position(labeled, 3));
        });
      });

      describe('localization', () => {
        it('localizes labels in German', async () => {
          const el = await createCounter(html`<wa-counter lang="de" direction="up" date=${ago(2 * day)}></wa-counter>`);
          expect(getLabels(el)).to.deep.equal(['Tage', 'Stunden', 'Minuten', 'Sekunden']); // cspell:disable-line
        });

        it('localizes labels in Japanese', async () => {
          const el = await createCounter(html`<wa-counter lang="ja"></wa-counter>`);
          expect(getLabels(el)).to.deep.equal(['日', '時間', '分', '秒']);
        });

        it('localizes digits in Arabic', async () => {
          const el = await createCounter(
            html`<wa-counter lang="ar-EG" direction="up" date=${ago(2 * day)}></wa-counter>`,
          );
          expect(getValues(el)).to.deep.equal(['٠٢', '٠٠', '٠٠', '٠٠']);
        });
      });

      describe('valueFormatter', () => {
        it('formats each value with its unit', async () => {
          const el = await createCounter(html`<wa-counter direction="up" date=${ago(2 * day)}></wa-counter>`);
          const formatter = sinon.spy((value: number, unit: string) => `${unit}:${value}`);

          el.valueFormatter = formatter;
          await el.updateComplete;

          expect(getValues(el)).to.deep.equal(['days:2', 'hours:0', 'minutes:0', 'seconds:0']);
          expect(formatter.calledWith(2, 'days')).to.be.true;
        });

        it('renders an empty value when the formatter throws', async () => {
          const el = await createCounter(html`<wa-counter lang="en"></wa-counter>`);

          el.valueFormatter = () => {
            throw new Error('Oops');
          };
          await el.updateComplete;

          expect(getValues(el)).to.deep.equal(['', '', '', '']);
          expect(getLabels(el)).to.deep.equal(['days', 'hours', 'minutes', 'seconds']);
        });
      });

      describe('connection', () => {
        it('keeps counting while detached and stops its timer until reattached', async () => {
          const el = await createCounter(html`<wa-counter direction="up"></wa-counter>`);
          const parent = el.parentElement!;
          expect(getValue(el, 'seconds')).to.equal('00');

          el.remove();
          await aTimeout(1100);
          expect(getValue(el, 'seconds')).to.equal('00');

          parent.append(el);
          await el.updateComplete;
          expect(getValue(el, 'seconds')).to.equal('01');
          await waitUntil(() => getValue(el, 'seconds') === '02', 'The counter did not resume', { timeout: 1200 });
        });
      });
    });
  }
});

describe('getDuration()', () => {
  it('splits a plain span into days through seconds', () => {
    const from = new Date(2026, 0, 1);
    const to = new Date(2026, 0, 3, 4, 5, 6);
    expect(getDuration(from, to, 'days', 'seconds')).to.deep.equal({ days: 2, hours: 4, minutes: 5, seconds: 6 });
  });

  it('returns zeros for equal dates', () => {
    const date = new Date(2026, 0, 1, 12);
    expect(getDuration(date, date, 'years', 'seconds')).to.deep.equal({
      years: 0,
      months: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
  });

  it('returns zeros when the end is before the start', () => {
    expect(getDuration(new Date(2026, 0, 2), new Date(2026, 0, 1), 'days', 'hours')).to.deep.equal({
      days: 0,
      hours: 0,
    });
  });

  it('splits a span into years through seconds', () => {
    const from = new Date(2020, 0, 15, 10);
    const to = new Date(2026, 2, 20, 12, 30);
    expect(getDuration(from, to, 'years', 'seconds')).to.deep.equal({
      years: 6,
      months: 2,
      days: 5,
      hours: 2,
      minutes: 30,
      seconds: 0,
    });
  });

  describe('rollover', () => {
    const from = new Date(2026, 0, 1);
    const to = new Date(2026, 0, 3, 4, 5, 6);

    it('rolls years into months', () => {
      expect(getDuration(new Date(2020, 0, 15), new Date(2026, 2, 20), 'months', 'days')).to.deep.equal({
        months: 74,
        days: 5,
      });
    });

    it('rolls months into days', () => {
      expect(getDuration(new Date(2026, 0, 1), new Date(2026, 1, 15), 'days', 'days')).to.deep.equal({ days: 45 });
    });

    it('rolls days into hours', () => {
      expect(getDuration(from, to, 'hours', 'seconds')).to.deep.equal({ hours: 52, minutes: 5, seconds: 6 });
    });

    it('rolls hours into minutes', () => {
      expect(getDuration(from, to, 'minutes', 'seconds')).to.deep.equal({ minutes: 3125, seconds: 6 });
    });

    it('rolls minutes into seconds', () => {
      expect(getDuration(from, to, 'seconds', 'seconds')).to.deep.equal({ seconds: 187506 });
    });
  });

  describe('truncation', () => {
    const from = new Date(2024, 2, 1);
    const to = new Date(2026, 0, 3, 4, 5, 6, 789);

    it('truncates below seconds', () => {
      expect(getDuration(new Date(2026, 0, 1), new Date(2026, 0, 1, 0, 0, 1, 999), 'days', 'seconds').seconds).to.equal(
        1,
      );
    });

    it('truncates below minutes', () => {
      expect(getDuration(from, to, 'years', 'minutes')).to.deep.equal({
        years: 1,
        months: 10,
        days: 2,
        hours: 4,
        minutes: 5,
      });
    });

    it('truncates below hours', () => {
      expect(getDuration(from, to, 'years', 'hours')).to.deep.equal({ years: 1, months: 10, days: 2, hours: 4 });
    });

    it('truncates below days', () => {
      expect(getDuration(from, to, 'years', 'days')).to.deep.equal({ years: 1, months: 10, days: 2 });
    });

    it('truncates below months', () => {
      expect(getDuration(from, to, 'years', 'months')).to.deep.equal({ years: 1, months: 10 });
    });

    it('truncates below years', () => {
      expect(getDuration(new Date(2020, 0, 15), new Date(2026, 0, 14), 'years', 'years')).to.deep.equal({ years: 5 });
    });
  });

  describe('early years', () => {
    it('handles years 0 to 99 without negative values', () => {
      const from = new Date(2000, 5, 15);
      const to = new Date(2026, 5, 15);
      from.setFullYear(50);

      expect(getDuration(from, to, 'years', 'days')).to.deep.equal({ years: 1976, months: 0, days: 0 });
    });
  });

  describe('calendar months', () => {
    it('clamps to the end of a shorter month', () => {
      expect(getDuration(new Date(2026, 0, 31), new Date(2026, 1, 28), 'months', 'days')).to.deep.equal({
        months: 1,
        days: 0,
      });
      expect(getDuration(new Date(2026, 0, 31), new Date(2026, 1, 27), 'months', 'days')).to.deep.equal({
        months: 0,
        days: 27,
      });
      expect(getDuration(new Date(2026, 4, 31), new Date(2026, 5, 30), 'months', 'days')).to.deep.equal({
        months: 1,
        days: 0,
      });
    });

    it('steps months from the start date rather than from a clamped month', () => {
      expect(getDuration(new Date(2026, 4, 31), new Date(2026, 6, 30), 'months', 'days')).to.deep.equal({
        months: 1,
        days: 30,
      });
      expect(getDuration(new Date(2026, 4, 31), new Date(2026, 6, 31), 'months', 'days')).to.deep.equal({
        months: 2,
        days: 0,
      });
    });

    it('steps months back from the end date for a countdown so the days never grow back', () => {
      const to = new Date(2027, 2, 1);
      const left = (from: Date) => getDuration(from, to, 'months', 'days', true);

      expect(left(new Date(2027, 0, 29))).to.deep.equal({ months: 1, days: 3 });
      expect(left(new Date(2027, 0, 30))).to.deep.equal({ months: 1, days: 2 });
      expect(left(new Date(2027, 0, 31))).to.deep.equal({ months: 1, days: 1 });
      expect(left(new Date(2027, 1, 1))).to.deep.equal({ months: 1, days: 0 });
      expect(left(new Date(2027, 1, 2))).to.deep.equal({ months: 0, days: 27 });
    });

    it('rounds a countdown up when the smallest unit is months or years', () => {
      const to = new Date(2027, 2, 1);

      expect(getDuration(new Date(2027, 1, 9), to, 'years', 'months', true)).to.deep.equal({ years: 0, months: 1 });
      expect(getDuration(new Date(2027, 1, 1), to, 'years', 'months', true)).to.deep.equal({ years: 0, months: 1 });
      expect(getDuration(new Date(2026, 2, 1, 0, 0, 1), to, 'years', 'months', true)).to.deep.equal({
        years: 1,
        months: 0,
      });
      expect(getDuration(new Date(2027, 1, 9), to, 'years', 'years', true)).to.deep.equal({ years: 1 });
      expect(getDuration(new Date(2025, 9, 1), to, 'years', 'years', true)).to.deep.equal({ years: 2 });
      expect(getDuration(to, to, 'years', 'months', true)).to.deep.equal({ years: 0, months: 0 });
    });

    it('counts a month only once its time of day has passed', () => {
      expect(getDuration(new Date(2025, 0, 15, 12), new Date(2026, 0, 15, 8), 'years', 'hours')).to.deep.equal({
        years: 0,
        months: 11,
        days: 30,
        hours: 20,
      });
    });

    it('handles leap years', () => {
      expect(getDuration(new Date(2024, 0, 31), new Date(2024, 1, 29), 'months', 'days')).to.deep.equal({
        months: 1,
        days: 0,
      });
      expect(getDuration(new Date(2024, 1, 1), new Date(2024, 2, 1), 'days', 'days')).to.deep.equal({ days: 29 });
      expect(getDuration(new Date(2024, 1, 29), new Date(2025, 1, 28), 'years', 'days')).to.deep.equal({
        years: 1,
        months: 0,
        days: 0,
      });
      expect(getDuration(new Date(2024, 1, 29), new Date(2025, 2, 1), 'years', 'days')).to.deep.equal({
        years: 1,
        months: 0,
        days: 1,
      });
    });

    it('crosses year boundaries', () => {
      expect(
        getDuration(new Date(2025, 11, 31, 23, 59, 59), new Date(2026, 0, 1, 0, 0, 1), 'years', 'seconds'),
      ).to.deep.equal({
        years: 0,
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 2,
      });
      expect(getDuration(new Date(2025, 11, 15), new Date(2026, 0, 14), 'years', 'days')).to.deep.equal({
        years: 0,
        months: 0,
        days: 30,
      });
      expect(getDuration(new Date(2025, 11, 15), new Date(2026, 0, 15), 'years', 'days')).to.deep.equal({
        years: 0,
        months: 1,
        days: 0,
      });
    });
  });

  describe('daylight saving time', () => {
    // Finds a local day that isn't 24 hours long, if the time zone has one
    function findTransition() {
      for (let index = 0; index < 366; index++) {
        const start = new Date(2026, 0, index + 1);
        const end = new Date(2026, 0, index + 2);
        if (end.getTime() - start.getTime() !== day) {
          return { start, end };
        }
      }
      return null;
    }

    it('measures days and hours as real elapsed time across a transition', function () {
      const transition = findTransition();
      if (!transition) {
        this.skip();
      }

      const { start, end } = transition!;
      const result = getDuration(start, end, 'days', 'seconds');
      const total = result.days! * day + result.hours! * hour + result.minutes! * minute + result.seconds! * second;

      expect(total).to.equal(end.getTime() - start.getTime());
      Object.values(result).forEach(value => expect(value).to.be.at.least(0));
    });

    it('counts whole calendar months across a transition', function () {
      const transition = findTransition();
      if (!transition) {
        this.skip();
      }

      const month = transition!.start.getMonth();
      expect(getDuration(new Date(2026, month, 1), new Date(2026, month + 1, 1), 'months', 'seconds')).to.deep.equal({
        months: 1,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });
    });

    it('never goes negative for times of day around a transition', function () {
      const transition = findTransition();
      if (!transition) {
        this.skip();
      }

      const { start } = transition!;
      for (let minutes = 0; minutes < 24 * 60; minutes += 15) {
        const to = new Date(start.getFullYear(), start.getMonth(), start.getDate(), 0, minutes);
        const from = new Date(start.getFullYear(), start.getMonth() - 1, start.getDate(), 0, minutes);
        const result = getDuration(from, to, 'years', 'seconds');

        Object.values(result).forEach(value => expect(value).to.be.at.least(0));
        expect(result.months! * 31 + result.days!).to.be.at.most(31);
      }
    });
  });
});
