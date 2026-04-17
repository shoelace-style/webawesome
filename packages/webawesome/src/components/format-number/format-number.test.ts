import { elementUpdated, expect } from '@open-wc/testing';
import { html } from 'lit';
import { fixtures } from '../../internal/test/fixture.js';
import type WaFormatNumber from './format-number.js';

describe('<wa-format-number>', () => {
  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      describe('properties', () => {
        it('should have correct default values', async () => {
          const el = await fixture<WaFormatNumber>(html`<wa-format-number></wa-format-number>`);

          expect(el.value).to.equal(0);
          expect(el.type).to.equal('decimal');
          expect(el.withoutGrouping).to.be.false;
          expect(el.currency).to.equal('USD');
          expect(el.currencyDisplay).to.equal('symbol');
          expect(el.minimumIntegerDigits).to.be.undefined;
          expect(el.minimumFractionDigits).to.be.undefined;
          expect(el.maximumFractionDigits).to.be.undefined;
          expect(el.minimumSignificantDigits).to.be.undefined;
          expect(el.maximumSignificantDigits).to.be.undefined;
        });
      });

      describe('type formatting', () => {
        it('should format as decimal by default', async () => {
          const el = await fixture<WaFormatNumber>(html`<wa-format-number value="1000"></wa-format-number>`);
          const expected = new Intl.NumberFormat('en-US', { style: 'decimal', useGrouping: true }).format(1000);
          expect(el.shadowRoot?.textContent).to.equal(expected);
        });

        it('should format as currency', async () => {
          const el = await fixture<WaFormatNumber>(
            html`<wa-format-number value="1000" type="currency"></wa-format-number>`,
          );
          const expected = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(1000);
          expect(el.shadowRoot?.textContent).to.equal(expected);
        });

        it('should format as percent', async () => {
          const el = await fixture<WaFormatNumber>(
            html`<wa-format-number value="0.5" type="percent"></wa-format-number>`,
          );
          const expected = new Intl.NumberFormat('en-US', { style: 'percent' }).format(0.5);
          expect(el.shadowRoot?.textContent).to.equal(expected);
        });
      });

      describe('locale formatting', () => {
        ['de', 'fr', 'ja', 'ru'].forEach(lang => {
          it(`should format correctly for locale: ${lang}`, async () => {
            const el = await fixture<WaFormatNumber>(
              html`<wa-format-number value="1000" lang="${lang}"></wa-format-number>`,
            );
            const expected = new Intl.NumberFormat(lang, { style: 'decimal', useGrouping: true }).format(1000);
            expect(el.shadowRoot?.textContent).to.equal(expected);
          });
        });
      });

      describe('grouping', () => {
        it('should use grouping separators by default', async () => {
          const el = await fixture<WaFormatNumber>(html`<wa-format-number value="1000"></wa-format-number>`);
          const expected = new Intl.NumberFormat('en-US', { useGrouping: true }).format(1000);
          expect(el.shadowRoot?.textContent).to.equal(expected);
        });

        it('should omit grouping separators when without-grouping is set', async () => {
          const el = await fixture<WaFormatNumber>(
            html`<wa-format-number value="1000" without-grouping></wa-format-number>`,
          );
          const expected = new Intl.NumberFormat('en-US', { useGrouping: false }).format(1000);
          expect(el.shadowRoot?.textContent).to.equal(expected);
        });
      });

      describe('currency options', () => {
        ['USD', 'CAD', 'EUR', 'GBP'].forEach(currency => {
          it(`should format with currency: ${currency}`, async () => {
            const el = await fixture<WaFormatNumber>(
              html`<wa-format-number value="1000" type="currency" currency="${currency}"></wa-format-number>`,
            );
            const expected = new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(1000);
            expect(el.shadowRoot?.textContent).to.equal(expected);
          });
        });

        (['symbol', 'narrowSymbol', 'code', 'name'] as const).forEach(display => {
          it(`should format with currency display: ${display}`, async () => {
            const el = await fixture<WaFormatNumber>(
              html`<wa-format-number value="1000" type="currency" currency-display="${display}"></wa-format-number>`,
            );
            const expected = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              currencyDisplay: display,
            }).format(1000);
            expect(el.shadowRoot?.textContent).to.equal(expected);
          });
        });
      });

      describe('digit options', () => {
        it('should respect minimum-integer-digits', async () => {
          const el = await fixture<WaFormatNumber>(
            html`<wa-format-number value="5" minimum-integer-digits="4"></wa-format-number>`,
          );
          const expected = new Intl.NumberFormat('en-US', { minimumIntegerDigits: 4 }).format(5);
          expect(el.shadowRoot?.textContent).to.equal(expected);
        });

        it('should respect minimum-fraction-digits', async () => {
          const el = await fixture<WaFormatNumber>(
            html`<wa-format-number value="1.5" minimum-fraction-digits="3"></wa-format-number>`,
          );
          const expected = new Intl.NumberFormat('en-US', { minimumFractionDigits: 3 }).format(1.5);
          expect(el.shadowRoot?.textContent).to.equal(expected);
        });

        it('should respect maximum-fraction-digits', async () => {
          const el = await fixture<WaFormatNumber>(
            html`<wa-format-number value="1.23456" maximum-fraction-digits="2"></wa-format-number>`,
          );
          const expected = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(1.23456);
          expect(el.shadowRoot?.textContent).to.equal(expected);
        });

        it('should respect minimum-significant-digits', async () => {
          const el = await fixture<WaFormatNumber>(
            html`<wa-format-number value="1000" minimum-significant-digits="5"></wa-format-number>`,
          );
          const expected = new Intl.NumberFormat('en-US', { minimumSignificantDigits: 5 }).format(1000);
          expect(el.shadowRoot?.textContent).to.equal(expected);
        });

        it('should respect maximum-significant-digits', async () => {
          const el = await fixture<WaFormatNumber>(
            html`<wa-format-number value="123456" maximum-significant-digits="3"></wa-format-number>`,
          );
          const expected = new Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(123456);
          expect(el.shadowRoot?.textContent).to.equal(expected);
        });
      });

      describe('edge cases', () => {
        it('should return empty string for NaN values', async () => {
          const el = await fixture<WaFormatNumber>(html`<wa-format-number></wa-format-number>`);
          el.value = NaN;
          await elementUpdated(el);
          expect(el.shadowRoot?.textContent).to.equal('');
        });

        it('should format zero correctly', async () => {
          const el = await fixture<WaFormatNumber>(html`<wa-format-number value="0"></wa-format-number>`);
          const expected = new Intl.NumberFormat('en-US', { style: 'decimal' }).format(0);
          expect(el.shadowRoot?.textContent).to.equal(expected);
        });

        it('should format negative numbers', async () => {
          const el = await fixture<WaFormatNumber>(html`<wa-format-number value="-1234"></wa-format-number>`);
          const expected = new Intl.NumberFormat('en-US', { style: 'decimal', useGrouping: true }).format(-1234);
          expect(el.shadowRoot?.textContent).to.equal(expected);
        });
      });
    });
  }
});
