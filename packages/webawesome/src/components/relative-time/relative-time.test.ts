import { expect } from '@open-wc/testing';
import { html } from 'lit';
import sinon from 'sinon';
import { fixtures } from '../../internal/test/fixture.js';
import type WaRelativeTime from './relative-time.js';

const minuteMs = 60_000;
const hourMs = minuteMs * 60;
const dayMs = hourMs * 24;
const weekMs = dayMs * 7;
const monthMs = dayMs * 30;
const yearMs = dayMs * 365;

const currentTime = new Date('2023-06-15T12:00:00.000Z');

describe('<wa-relative-time>', () => {
  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      describe('properties', () => {
        it('should have correct default values', async () => {
          const el = await fixture<WaRelativeTime>(html`<wa-relative-time></wa-relative-time>`);

          expect(el.format).to.equal('long');
          expect(el.numeric).to.equal('auto');
          expect(el.sync).to.equal(false);
        });
      });

      describe('relative time formatting', () => {
        let clock: sinon.SinonFakeTimers;

        beforeEach(() => {
          clock = sinon.useFakeTimers(currentTime);
        });

        afterEach(() => {
          clock.restore();
        });

        const pastCases = [
          { offset: -minuteMs, expected: '1 minute ago' },
          { offset: -hourMs, expected: '1 hour ago' },
          { offset: -dayMs, expected: 'yesterday' },
          { offset: -4 * dayMs, expected: '4 days ago' },
          { offset: -weekMs, expected: 'last week' },
          { offset: -monthMs, expected: 'last month' },
          { offset: -yearMs, expected: 'last year' },
        ];

        pastCases.forEach(({ offset, expected }) => {
          it(`should show "${expected}" for past date`, async () => {
            const date = new Date(currentTime.getTime() + offset);
            const el = await fixture<WaRelativeTime>(
              html`<wa-relative-time lang="en-US" .date="${date}"></wa-relative-time>`,
            );
            await el.updateComplete;
            const timeEl = el.shadowRoot?.querySelector('time');
            expect(timeEl?.textContent).to.equal(expected);
          });
        });

        const futureCases = [
          { offset: minuteMs, expected: 'in 1 minute' },
          { offset: hourMs, expected: 'in 1 hour' },
          { offset: dayMs, expected: 'tomorrow' },
          { offset: weekMs, expected: 'next week' },
        ];

        futureCases.forEach(({ offset, expected }) => {
          it(`should show "${expected}" for future date`, async () => {
            const date = new Date(currentTime.getTime() + offset);
            const el = await fixture<WaRelativeTime>(
              html`<wa-relative-time lang="en-US" .date="${date}"></wa-relative-time>`,
            );
            await el.updateComplete;
            const timeEl = el.shadowRoot?.querySelector('time');
            expect(timeEl?.textContent).to.equal(expected);
          });
        });
      });

      describe('string date input', () => {
        let clock: sinon.SinonFakeTimers;

        beforeEach(() => {
          clock = sinon.useFakeTimers(currentTime);
        });

        afterEach(() => {
          clock.restore();
        });

        it('should accept ISO string dates', async () => {
          const date = new Date(currentTime.getTime() - dayMs).toISOString();
          const el = await fixture<WaRelativeTime>(
            html`<wa-relative-time lang="en-US" date="${date}"></wa-relative-time>`,
          );
          await el.updateComplete;
          const timeEl = el.shadowRoot?.querySelector('time');
          expect(timeEl?.textContent).to.equal('yesterday');
        });
      });

      describe('numeric property', () => {
        let clock: sinon.SinonFakeTimers;

        beforeEach(() => {
          clock = sinon.useFakeTimers(currentTime);
        });

        afterEach(() => {
          clock.restore();
        });

        it('should show human-readable form with numeric="auto"', async () => {
          const yesterday = new Date(currentTime.getTime() - dayMs);
          const el = await fixture<WaRelativeTime>(
            html`<wa-relative-time lang="en-US" numeric="auto" .date="${yesterday}"></wa-relative-time>`,
          );
          await el.updateComplete;
          const timeEl = el.shadowRoot?.querySelector('time');
          expect(timeEl?.textContent).to.equal('yesterday');
        });

        it('should always show numeric form with numeric="always"', async () => {
          const yesterday = new Date(currentTime.getTime() - dayMs);
          const el = await fixture<WaRelativeTime>(
            html`<wa-relative-time lang="en-US" numeric="always" .date="${yesterday}"></wa-relative-time>`,
          );
          await el.updateComplete;
          const timeEl = el.shadowRoot?.querySelector('time');
          expect(timeEl?.textContent).to.equal('1 day ago');
        });
      });

      describe('format property', () => {
        let clock: sinon.SinonFakeTimers;

        beforeEach(() => {
          clock = sinon.useFakeTimers(currentTime);
        });

        afterEach(() => {
          clock.restore();
        });

        it('should use long format by default', async () => {
          const twoYearsAgo = new Date(currentTime.getTime() - 2 * yearMs);
          const el = await fixture<WaRelativeTime>(
            html`<wa-relative-time lang="en-US" numeric="always" .date="${twoYearsAgo}"></wa-relative-time>`,
          );
          await el.updateComplete;
          const timeEl = el.shadowRoot?.querySelector('time');
          expect(timeEl?.textContent).to.equal('2 years ago');
        });

        it('should use short format', async () => {
          const twoYearsAgo = new Date(currentTime.getTime() - 2 * yearMs);
          const el = await fixture<WaRelativeTime>(
            html`<wa-relative-time
              lang="en-US"
              numeric="always"
              format="short"
              .date="${twoYearsAgo}"
            ></wa-relative-time>`,
          );
          await el.updateComplete;
          const timeEl = el.shadowRoot?.querySelector('time');
          expect(timeEl?.textContent).to.equal('2 yr. ago');
        });
      });

      describe('locale handling', () => {
        let clock: sinon.SinonFakeTimers;

        beforeEach(() => {
          clock = sinon.useFakeTimers(currentTime);
        });

        afterEach(() => {
          clock.restore();
        });

        it('should format according to the specified locale', async () => {
          const yesterday = new Date(currentTime.getTime() - dayMs);
          const el = await fixture<WaRelativeTime>(
            html`<wa-relative-time lang="de-DE" numeric="auto" .date="${yesterday}"></wa-relative-time>`,
          );
          await el.updateComplete;
          const timeEl = el.shadowRoot?.querySelector('time');
          expect(timeEl?.textContent).to.equal('gestern');
        });
      });

      describe('time element attributes', () => {
        let clock: sinon.SinonFakeTimers;

        beforeEach(() => {
          clock = sinon.useFakeTimers(currentTime);
        });

        afterEach(() => {
          clock.restore();
        });

        it('should set datetime attribute on the time element', async () => {
          const yesterday = new Date(currentTime.getTime() - dayMs);
          const el = await fixture<WaRelativeTime>(
            html`<wa-relative-time lang="en-US" .date="${yesterday}"></wa-relative-time>`,
          );
          await el.updateComplete;
          const timeEl = el.shadowRoot?.querySelector('time');
          expect(timeEl?.getAttribute('datetime')).to.equal(yesterday.toISOString());
        });
      });

      describe('sync property', () => {
        let clock: sinon.SinonFakeTimers;

        beforeEach(() => {
          clock = sinon.useFakeTimers(currentTime);
        });

        afterEach(() => {
          clock.restore();
        });

        it('should update the displayed value as time passes when sync is true', async () => {
          const yesterday = new Date(currentTime.getTime() - dayMs);
          const el = await fixture<WaRelativeTime>(
            html`<wa-relative-time lang="en-US" sync .date="${yesterday}"></wa-relative-time>`,
          );
          await el.updateComplete;
          const timeEl = el.shadowRoot?.querySelector('time');
          expect(timeEl?.textContent).to.equal('yesterday');

          clock.tick(dayMs);
          await el.updateComplete;

          const updatedTimeEl = el.shadowRoot?.querySelector('time');
          expect(updatedTimeEl?.textContent).to.equal('2 days ago');
        });
      });

      describe('edge cases', () => {
        it('should render nothing for an invalid date', async () => {
          const el = await fixture<WaRelativeTime>(
            html`<wa-relative-time lang="en-US" date="not-a-date"></wa-relative-time>`,
          );
          await el.updateComplete;
          const timeEl = el.shadowRoot?.querySelector('time');
          expect(timeEl).to.be.null;
        });
      });
    });
  }
});
