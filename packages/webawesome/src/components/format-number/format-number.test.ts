import { expect } from '@open-wc/testing';
import { html } from 'lit';
import { fixtures } from '../../internal/test/fixture.js';
import type WaFormatNumber from './format-number.js';

describe('<wa-format-number>', () => {
  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      describe('defaults ', () => {
        it('default properties', async () => {
          const el = await fixture<WaFormatNumber>(html` <wa-format-number></wa-format-number> `);
          expect(el.value).to.equal(0);

          expect(el.lang).to.be.undefined;
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

      describe('lang property', () => {
        ['de', 'de-CH', 'fr', 'es', 'he', 'ja', 'nl', 'pl', 'pt', 'ru'].forEach(lang => {
          it(`number has correct language format: ${lang}`, async () => {
            const el = await fixture<WaFormatNumber>(html`
              <wa-format-number value="1000" lang="${lang}"></wa-format-number>
            `);
            const expected = new Intl.NumberFormat(lang, { style: 'decimal', useGrouping: true }).format(1000);
            expect(el.shadowRoot?.textContent).to.equal(expected);
          });
        });
      });

      describe('type property', () => {
        ['currency', 'decimal', 'percent'].forEach(type => {
          it(`number has correct type format: ${type}`, async () => {
            const el = await fixture<WaFormatNumber>(html`
              <wa-format-number value="1000" type="${type}"></wa-format-number>
            `);
            const expected = new Intl.NumberFormat('en-US', { style: type, currency: 'USD' }).format(1000);
            expect(el.shadowRoot?.textContent).to.equal(expected);
          });
        });
      });

      describe('withoutGrouping property', () => {
        it(`number has correct grouping format: no grouping`, async () => {
          const el = await fixture<WaFormatNumber>(html`
            <wa-format-number value="1000" without-grouping></wa-format-number>
          `);
          const expected = new Intl.NumberFormat('en-US', { useGrouping: false }).format(1000);
          expect(el.shadowRoot?.textContent).to.equal(expected);
        });

        it(`number has correct grouping format: grouping`, async () => {
          const el = await fixture<WaFormatNumber>(html` <wa-format-number value="1000"></wa-format-number> `);
          const expected = new Intl.NumberFormat('en-US', { useGrouping: true }).format(1000);
          expect(el.shadowRoot?.textContent).to.equal(expected);
        });
      });

      describe('currency property', () => {
        ['USD', 'CAD', 'AUD', 'UAH'].forEach(currency => {
          it(`number has correct type format: ${currency}`, async () => {
            const el = await fixture<WaFormatNumber>(html`
              <wa-format-number value="1000" currency="${currency}"></wa-format-number>
            `);
            const expected = new Intl.NumberFormat('en-US', { style: 'decimal', currency: currency }).format(1000);
            expect(el.shadowRoot?.textContent).to.equal(expected);
          });
        });
      });

      describe('currencyDisplay property', () => {
        ['symbol', 'narrowSymbol', 'code', 'name'].forEach(currencyDisplay => {
          it(`number has correct type format: ${currencyDisplay}`, async () => {
            const el = await fixture<WaFormatNumber>(html`
              <wa-format-number value="1000" currency-display="${currencyDisplay}"></wa-format-number>
            `);
            const expected = new Intl.NumberFormat('en-US', {
              style: 'decimal',
              currencyDisplay: currencyDisplay,
            }).format(1000);
            expect(el.shadowRoot?.textContent).to.equal(expected);
          });
        });
      });

      describe('minimumIntegerDigits property', () => {
        [4, 5, 6].forEach(minDigits => {
          it(`number has correct type format: ${minDigits}`, async () => {
            const el = await fixture<WaFormatNumber>(html`
              <wa-format-number value="1000" minimum-integer-digits="${minDigits}"></wa-format-number>
            `);
            const expected = new Intl.NumberFormat('en-US', {
              style: 'decimal',
              currencyDisplay: 'symbol',
              minimumIntegerDigits: minDigits,
            }).format(1000);
            expect(el.shadowRoot?.textContent).to.equal(expected);
          });
        });
      });

      describe('minimumFractionDigits property', () => {
        [4, 5, 6].forEach(minFractionDigits => {
          it(`number has correct type format: ${minFractionDigits}`, async () => {
            const el = await fixture<WaFormatNumber>(html`
              <wa-format-number value="1000" minimum-fraction-digits="${minFractionDigits}"></wa-format-number>
            `);
            const expected = new Intl.NumberFormat('en-US', {
              style: 'decimal',
              currencyDisplay: 'symbol',
              minimumFractionDigits: minFractionDigits,
            }).format(1000);
            expect(el.shadowRoot?.textContent).to.equal(expected);
          });
        });
      });

      describe('maximumFractionDigits property', () => {
        [4, 5, 6].forEach(maxFractionDigits => {
          it(`number has correct type format: ${maxFractionDigits}`, async () => {
            const el = await fixture<WaFormatNumber>(html`
              <wa-format-number value="1000" maximum-fraction-digits="${maxFractionDigits}"></wa-format-number>
            `);
            const expected = new Intl.NumberFormat('en-US', {
              style: 'decimal',
              currencyDisplay: 'symbol',
              maximumFractionDigits: maxFractionDigits,
            }).format(1000);
            expect(el.shadowRoot?.textContent).to.equal(expected);
          });
        });
      });

      describe('minimumSignificantDigits property', () => {
        [4, 5, 6].forEach(minSignificantDigits => {
          it(`number has correct type format: ${minSignificantDigits}`, async () => {
            const el = await fixture<WaFormatNumber>(html`
              <wa-format-number value="1000" minimum-significant-digits="${minSignificantDigits}"></wa-format-number>
            `);
            const expected = new Intl.NumberFormat('en-US', {
              style: 'decimal',
              currencyDisplay: 'symbol',
              minimumSignificantDigits: minSignificantDigits,
            }).format(1000);
            expect(el.shadowRoot?.textContent).to.equal(expected);
          });
        });
      });

      describe('maximumSignificantDigits property', () => {
        [4, 5, 6].forEach(maxSignificantDigits => {
          it(`number has correct type format: ${maxSignificantDigits}`, async () => {
            const el = await fixture<WaFormatNumber>(html`
              <wa-format-number value="1000" maximum-significant-digits="${maxSignificantDigits}"></wa-format-number>
            `);
            const expected = new Intl.NumberFormat('en-US', {
              style: 'decimal',
              currencyDisplay: 'symbol',
              maximumSignificantDigits: maxSignificantDigits,
            }).format(1000);
            expect(el.shadowRoot?.textContent).to.equal(expected);
          });
        });
      });
    });
  }
});
