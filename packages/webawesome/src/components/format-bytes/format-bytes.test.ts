import { elementUpdated, expect } from '@open-wc/testing';
import { html } from 'lit';
import { fixtures } from '../../internal/test/fixture.js';
import type WaFormatBytes from './format-bytes.js';

describe('<wa-format-bytes>', () => {
  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      describe('properties', () => {
        it('should have correct default values', async () => {
          const el = await fixture<WaFormatBytes>(html`<wa-format-bytes></wa-format-bytes>`);

          expect(el.value).to.equal(0);
          expect(el.unit).to.equal('byte');
          expect(el.display).to.equal('short');
        });
      });

      describe('byte formatting', () => {
        const byteCases = [
          { value: 0, short: '0 byte', long: '0 bytes', narrow: '0B' },
          { value: 12, short: '12 byte', long: '12 bytes', narrow: '12B' },
          { value: 1200, short: '1.2 kB', long: '1.2 kilobytes', narrow: '1.2kB' },
          { value: 1200000, short: '1.2 MB', long: '1.2 megabytes', narrow: '1.2MB' },
          { value: 1200000000, short: '1.2 GB', long: '1.2 gigabytes', narrow: '1.2GB' },
          { value: 1200000000000, short: '1.2 TB', long: '1.2 terabytes', narrow: '1.2TB' },
          { value: 1200000000000000, short: '1.2 PB', long: '1.2 petabytes', narrow: '1.2PB' },
        ];

        byteCases.forEach(({ value, short, long, narrow }) => {
          it(`should format ${value} bytes correctly in short display`, async () => {
            const el = await fixture<WaFormatBytes>(html`<wa-format-bytes value="${value}"></wa-format-bytes>`);
            expect(el.shadowRoot?.textContent).to.equal(short);
          });

          it(`should format ${value} bytes correctly in long display`, async () => {
            const el = await fixture<WaFormatBytes>(
              html`<wa-format-bytes value="${value}" display="long"></wa-format-bytes>`
            );
            expect(el.shadowRoot?.textContent).to.equal(long);
          });

          it(`should format ${value} bytes correctly in narrow display`, async () => {
            const el = await fixture<WaFormatBytes>(
              html`<wa-format-bytes value="${value}" display="narrow"></wa-format-bytes>`
            );
            expect(el.shadowRoot?.textContent).to.equal(narrow);
          });
        });
      });

      describe('bit formatting', () => {
        const bitCases = [
          { value: 12, short: '12 bit', long: '12 bits', narrow: '12bit' },
          { value: 1200, short: '1.2 kb', long: '1.2 kilobits', narrow: '1.2kb' },
          { value: 1200000, short: '1.2 Mb', long: '1.2 megabits', narrow: '1.2Mb' },
          { value: 1200000000, short: '1.2 Gb', long: '1.2 gigabits', narrow: '1.2Gb' },
          { value: 1200000000000, short: '1.2 Tb', long: '1.2 terabits', narrow: '1.2Tb' },
        ];

        bitCases.forEach(({ value, short, long, narrow }) => {
          it(`should format ${value} bits correctly in short display`, async () => {
            const el = await fixture<WaFormatBytes>(
              html`<wa-format-bytes value="${value}" unit="bit"></wa-format-bytes>`
            );
            expect(el.shadowRoot?.textContent).to.equal(short);
          });

          it(`should format ${value} bits correctly in long display`, async () => {
            const el = await fixture<WaFormatBytes>(
              html`<wa-format-bytes value="${value}" unit="bit" display="long"></wa-format-bytes>`
            );
            expect(el.shadowRoot?.textContent).to.equal(long);
          });

          it(`should format ${value} bits correctly in narrow display`, async () => {
            const el = await fixture<WaFormatBytes>(
              html`<wa-format-bytes value="${value}" unit="bit" display="narrow"></wa-format-bytes>`
            );
            expect(el.shadowRoot?.textContent).to.equal(narrow);
          });
        });
      });

      describe('edge cases', () => {
        it('should return empty string for NaN values', async () => {
          const el = await fixture<WaFormatBytes>(html`<wa-format-bytes></wa-format-bytes>`);
          el.value = NaN;
          await elementUpdated(el);
          expect(el.shadowRoot?.textContent).to.equal('');
        });

        it('should update when properties change dynamically', async () => {
          const el = await fixture<WaFormatBytes>(html`<wa-format-bytes value="1200"></wa-format-bytes>`);
          expect(el.shadowRoot?.textContent).to.equal('1.2 kB');

          el.unit = 'bit';
          await elementUpdated(el);
          expect(el.shadowRoot?.textContent).to.equal('1.2 kb');

          el.display = 'long';
          await elementUpdated(el);
          expect(el.shadowRoot?.textContent).to.equal('1.2 kilobits');
        });
      });
    });
  }
});
