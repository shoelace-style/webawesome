import { aTimeout, elementUpdated, expect } from '@open-wc/testing';
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
        it('should preserve locale normalization, invalid-language fallback, and numbering-system extensions', async () => {
          const el = await fixture<WaFormatNumber>(
            html`<wa-format-number lang="en" value="1234.5"></wa-format-number>`,
          );
          for (const [lang, expectedLang] of [
            ['en_US', 'en-US'],
            ['auto', 'en'],
            ['en-u-nu-arab', 'en-u-nu-arab'],
          ]) {
            el.lang = lang;
            await elementUpdated(el);
            expect(el.shadowRoot?.textContent).to.equal(new Intl.NumberFormat(expectedLang).format(el.value));
          }
        });

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
        it('should reuse formatting settings without reusing the formatted value', async () => {
          const el = await fixture<WaFormatNumber>(
            html`<wa-format-number lang="nb-NO" type="currency" currency="NOK"></wa-format-number>`,
          );
          const formatter = new Intl.NumberFormat('nb-NO', { style: 'currency', currency: 'NOK' });

          for (const value of [1234.5, -0, Infinity, -Infinity, NaN, -9876.5]) {
            el.value = value;
            await elementUpdated(el);
            expect(el.shadowRoot?.textContent).to.equal(isNaN(value) ? '' : formatter.format(value));
          }
        });

        it('should respond to changes in every formatting option and the locale', async () => {
          const el = await fixture<WaFormatNumber>(
            html`<wa-format-number lang="en-US" value="1234.56789"></wa-format-number>`,
          );
          const changes: Partial<WaFormatNumber>[] = [
            { type: 'currency' },
            { currency: 'NOK' },
            { currencyDisplay: 'name' },
            { withoutGrouping: true },
            { minimumIntegerDigits: 6 },
            { minimumFractionDigits: 4 },
            { maximumFractionDigits: 5 },
            { minimumSignificantDigits: 8 },
            { maximumSignificantDigits: 9 },
            { lang: 'de-DE' },
            { type: 'percent' },
          ];

          for (const change of changes) {
            Object.assign(el, change);
            await elementUpdated(el);
            const expected = new Intl.NumberFormat(el.lang, {
              style: el.type,
              currency: el.currency,
              currencyDisplay: el.currencyDisplay,
              useGrouping: !el.withoutGrouping,
              minimumIntegerDigits: el.minimumIntegerDigits,
              minimumFractionDigits: el.minimumFractionDigits,
              maximumFractionDigits: el.maximumFractionDigits,
              minimumSignificantDigits: el.minimumSignificantDigits,
              maximumSignificantDigits: el.maximumSignificantDigits,
            }).format(el.value);
            expect(el.shadowRoot?.textContent).to.equal(expected);
          }
        });

        it('should use the new document language while retaining explicit element languages', async () => {
          const originalLang = document.documentElement.lang;
          const el = await fixture<WaFormatNumber>(html`<wa-format-number value="1234.5"></wa-format-number>`);
          try {
            for (const lang of ['nb-NO', 'de-DE', 'en-US']) {
              document.documentElement.lang = lang;
              await aTimeout(0);
              await elementUpdated(el);
              expect(el.shadowRoot?.textContent).to.equal(new Intl.NumberFormat(lang).format(el.value));
            }

            el.lang = 'fr-FR';
            document.documentElement.lang = 'nb-NO';
            await aTimeout(0);
            await elementUpdated(el);
            expect(el.shadowRoot?.textContent).to.equal(new Intl.NumberFormat('fr-FR').format(el.value));
          } finally {
            document.documentElement.lang = originalLang;
            await aTimeout(0);
          }
        });

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

  describe('formatter reuse', () => {
    it('should share formatters across instances and value changes', () => {
      const original = Intl.NumberFormat;
      let constructions = 0;
      Intl.NumberFormat = new Proxy(original, {
        construct(target, args, newTarget) {
          constructions++;
          return Reflect.construct(target, args, newTarget);
        },
      });

      try {
        for (let i = 0; i < 10; i++) {
          const el = document.createElement('wa-format-number');
          el.lang = 'en-x-reuse';
          el.value = i + 0.25;
          expect(el.render()).to.equal(new original('en').format(el.value));
          el.value += 1;
          expect(el.render()).to.equal(new original('en').format(el.value));
        }
        expect(constructions).to.equal(1);
      } finally {
        Intl.NumberFormat = original;
      }
    });

    it('should evict older formatters once the shared cache reaches its limit', () => {
      const original = Intl.NumberFormat;
      let constructions = 0;
      Intl.NumberFormat = new Proxy(original, {
        construct(target, args, newTarget) {
          constructions++;
          return Reflect.construct(target, args, newTarget);
        },
      });

      try {
        const el = document.createElement('wa-format-number');
        el.lang = 'en-x-bound';
        el.render();
        el.render();
        expect(constructions).to.equal(1);

        for (let i = 0; i < 100; i++) {
          el.lang = `en-x-bound${i}`;
          el.render();
        }
        expect(constructions).to.equal(101);

        el.lang = 'en-x-bound';
        el.render();
        expect(constructions).to.equal(102);
      } finally {
        Intl.NumberFormat = original;
      }
    });

    it('should preserve Intl coercion for null and mutable object options', () => {
      const el = document.createElement('wa-format-number');
      el.lang = 'en-US';
      el.value = 1.23456;
      expect(el.render()).to.equal('1.235');

      el.maximumFractionDigits = null as unknown as number;
      expect(el.render()).to.equal('1');

      let digits = 1;
      el.maximumFractionDigits = { valueOf: () => digits } as unknown as number;
      expect(el.render()).to.equal('1.2');
      digits = 3;
      expect(el.render()).to.equal('1.235');
    });

    it('should not suppress Intl validation errors after warming the cache', () => {
      const el = document.createElement('wa-format-number');
      el.lang = 'en-US';
      el.value = 1.23456;
      expect(el.render()).to.equal('1.235');

      for (const digits of [NaN, Infinity, -Infinity, -1]) {
        el.maximumFractionDigits = digits;
        expect(() => el.render()).to.throw(RangeError);
      }
      el.maximumFractionDigits = undefined!;
      expect(el.render()).to.equal('1.235');
    });
  });
});
