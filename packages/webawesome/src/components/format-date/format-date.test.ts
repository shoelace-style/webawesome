import { expect } from '@open-wc/testing';
import { html } from 'lit';
import sinon from 'sinon';
import { fixtures } from '../../internal/test/fixture.js';
import type WaFormatDate from './format-date.js';

// Use a fixed date for all tests to avoid timezone/time-of-day flakiness
const testDate = new Date(2023, 0, 15, 14, 30, 45); // Jan 15, 2023, 2:30:45 PM local time

describe('<wa-format-date>', () => {
  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      describe('properties', () => {
        let clock: sinon.SinonFakeTimers;

        beforeEach(() => {
          clock = sinon.useFakeTimers({ now: new Date() });
        });

        afterEach(() => {
          clock.restore();
        });

        it('should have correct default values', async () => {
          const el = await fixture<WaFormatDate>(html`<wa-format-date></wa-format-date>`);

          expect(el.date).to.deep.equal(new Date());
          expect(el.weekday).to.be.undefined;
          expect(el.era).to.be.undefined;
          expect(el.year).to.be.undefined;
          expect(el.month).to.be.undefined;
          expect(el.day).to.be.undefined;
          expect(el.hour).to.be.undefined;
          expect(el.minute).to.be.undefined;
          expect(el.second).to.be.undefined;
          expect(el.timeZoneName).to.be.undefined;
          expect(el.timeZone).to.be.undefined;
          expect(el.hourFormat).to.equal('auto');
        });
      });

      describe('locale formatting', () => {
        const langs = ['de', 'de-CH', 'fr', 'es', 'he', 'ja', 'nl', 'pl', 'pt', 'ru'];

        langs.forEach(lang => {
          it(`should format correctly for locale: ${lang}`, async () => {
            const el = await fixture<WaFormatDate>(
              html`<wa-format-date .date="${testDate}" lang="${lang}"></wa-format-date>`
            );
            const expected = new Intl.DateTimeFormat(lang).format(testDate);
            expect(el.shadowRoot?.textContent?.trim()).to.equal(expected);
          });
        });
      });

      describe('weekday property', () => {
        (['narrow', 'short', 'long'] as const).forEach(format => {
          it(`should format weekday as: ${format}`, async () => {
            const el = await fixture<WaFormatDate>(
              html`<wa-format-date .date="${testDate}" weekday="${format}"></wa-format-date>`
            );
            const expected = new Intl.DateTimeFormat('en-US', { weekday: format }).format(testDate);
            expect(el.shadowRoot?.textContent?.trim()).to.equal(expected);
          });
        });
      });

      describe('era property', () => {
        (['narrow', 'short', 'long'] as const).forEach(format => {
          it(`should format era as: ${format}`, async () => {
            const el = await fixture<WaFormatDate>(
              html`<wa-format-date .date="${testDate}" era="${format}"></wa-format-date>`
            );
            const expected = new Intl.DateTimeFormat('en-US', { era: format }).format(testDate);
            expect(el.shadowRoot?.textContent?.trim()).to.equal(expected);
          });
        });
      });

      describe('year property', () => {
        (['numeric', '2-digit'] as const).forEach(format => {
          it(`should format year as: ${format}`, async () => {
            const el = await fixture<WaFormatDate>(
              html`<wa-format-date .date="${testDate}" year="${format}"></wa-format-date>`
            );
            const expected = new Intl.DateTimeFormat('en-US', { year: format }).format(testDate);
            expect(el.shadowRoot?.textContent?.trim()).to.equal(expected);
          });
        });
      });

      describe('month property', () => {
        (['numeric', '2-digit', 'narrow', 'short', 'long'] as const).forEach(format => {
          it(`should format month as: ${format}`, async () => {
            const el = await fixture<WaFormatDate>(
              html`<wa-format-date .date="${testDate}" month="${format}"></wa-format-date>`
            );
            const expected = new Intl.DateTimeFormat('en-US', { month: format }).format(testDate);
            expect(el.shadowRoot?.textContent?.trim()).to.equal(expected);
          });
        });
      });

      describe('day property', () => {
        (['numeric', '2-digit'] as const).forEach(format => {
          it(`should format day as: ${format}`, async () => {
            const el = await fixture<WaFormatDate>(
              html`<wa-format-date .date="${testDate}" day="${format}"></wa-format-date>`
            );
            const expected = new Intl.DateTimeFormat('en-US', { day: format }).format(testDate);
            expect(el.shadowRoot?.textContent?.trim()).to.equal(expected);
          });
        });
      });

      describe('hour property', () => {
        (['numeric', '2-digit'] as const).forEach(format => {
          it(`should format hour as: ${format}`, async () => {
            const el = await fixture<WaFormatDate>(
              html`<wa-format-date .date="${testDate}" hour="${format}"></wa-format-date>`
            );
            const expected = new Intl.DateTimeFormat('en-US', { hour: format }).format(testDate);
            expect(el.shadowRoot?.textContent?.trim()).to.equal(expected);
          });
        });
      });

      describe('minute property', () => {
        (['numeric', '2-digit'] as const).forEach(format => {
          it(`should format minute as: ${format}`, async () => {
            const el = await fixture<WaFormatDate>(
              html`<wa-format-date .date="${testDate}" minute="${format}"></wa-format-date>`
            );
            const expected = new Intl.DateTimeFormat('en-US', { minute: format }).format(testDate);
            expect(el.shadowRoot?.textContent?.trim()).to.equal(expected);
          });
        });
      });

      describe('second property', () => {
        (['numeric', '2-digit'] as const).forEach(format => {
          it(`should format second as: ${format}`, async () => {
            const el = await fixture<WaFormatDate>(
              html`<wa-format-date .date="${testDate}" second="${format}"></wa-format-date>`
            );
            const expected = new Intl.DateTimeFormat('en-US', { second: format }).format(testDate);
            expect(el.shadowRoot?.textContent?.trim()).to.equal(expected);
          });
        });
      });

      describe('time zone options', () => {
        (['short', 'long'] as const).forEach(format => {
          it(`should display time zone name as: ${format}`, async () => {
            const el = await fixture<WaFormatDate>(
              html`<wa-format-date .date="${testDate}" time-zone-name="${format}"></wa-format-date>`
            );
            const expected = new Intl.DateTimeFormat('en-US', { timeZoneName: format }).format(testDate);
            expect(el.shadowRoot?.textContent?.trim()).to.equal(expected);
          });
        });

        ['America/New_York', 'America/Los_Angeles', 'Europe/Zurich'].forEach(tz => {
          it(`should format in time zone: ${tz}`, async () => {
            const el = await fixture<WaFormatDate>(
              html`<wa-format-date .date="${testDate}" time-zone="${tz}"></wa-format-date>`
            );
            const expected = new Intl.DateTimeFormat('en-US', { timeZone: tz }).format(testDate);
            expect(el.shadowRoot?.textContent?.trim()).to.equal(expected);
          });
        });
      });

      describe('hour format property', () => {
        it('should use auto hour format by default', async () => {
          const el = await fixture<WaFormatDate>(
            html`<wa-format-date .date="${testDate}" hour="numeric"></wa-format-date>`
          );
          const expected = new Intl.DateTimeFormat('en-US', { hour: 'numeric' }).format(testDate);
          expect(el.shadowRoot?.textContent?.trim()).to.equal(expected);
        });

        it('should use 12-hour format', async () => {
          const el = await fixture<WaFormatDate>(
            html`<wa-format-date .date="${testDate}" hour="numeric" hour-format="12"></wa-format-date>`
          );
          const expected = new Intl.DateTimeFormat('en-US', { hour: 'numeric', hour12: true }).format(testDate);
          expect(el.shadowRoot?.textContent?.trim()).to.equal(expected);
        });

        it('should use 24-hour format', async () => {
          const el = await fixture<WaFormatDate>(
            html`<wa-format-date .date="${testDate}" hour="numeric" hour-format="24"></wa-format-date>`
          );
          const expected = new Intl.DateTimeFormat('en-US', { hour: 'numeric', hour12: false }).format(testDate);
          expect(el.shadowRoot?.textContent?.trim()).to.equal(expected);
        });
      });

      describe('CSS parts and states', () => {
        it('should render a time element with datetime attribute', async () => {
          const el = await fixture<WaFormatDate>(html`<wa-format-date .date="${testDate}"></wa-format-date>`);
          const timeEl = el.shadowRoot?.querySelector('time');
          expect(timeEl).to.exist;
          expect(timeEl?.getAttribute('datetime')).to.equal(testDate.toISOString());
        });
      });

      describe('edge cases', () => {
        it('should handle string date input', async () => {
          const isoString = testDate.toISOString();
          const el = await fixture<WaFormatDate>(
            html`<wa-format-date date="${isoString}"></wa-format-date>`
          );
          const expected = new Intl.DateTimeFormat('en-US').format(new Date(isoString));
          expect(el.shadowRoot?.textContent?.trim()).to.equal(expected);
        });

        it('should render nothing for invalid date', async () => {
          const el = await fixture<WaFormatDate>(
            html`<wa-format-date date="not-a-date"></wa-format-date>`
          );
          // Invalid date renders undefined, so no <time> element
          const timeEl = el.shadowRoot?.querySelector('time');
          expect(timeEl).to.be.null;
        });

        it('should format with multiple options combined', async () => {
          const el = await fixture<WaFormatDate>(
            html`<wa-format-date
              .date="${testDate}"
              weekday="long"
              year="numeric"
              month="long"
              day="numeric"
            ></wa-format-date>`
          );
          const expected = new Intl.DateTimeFormat('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }).format(testDate);
          expect(el.shadowRoot?.textContent?.trim()).to.equal(expected);
        });
      });
    });
  }
});
