import { expect } from '@open-wc/testing';
import { html } from 'lit';
import { fixtures } from '../../internal/test/fixture.js';
import type WaSpinner from './spinner.js';

describe('<wa-spinner>', () => {
  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      describe('when provided no parameters', () => {
        it('should pass accessibility tests', async () => {
          const spinner = await fixture<WaSpinner>(html` <wa-spinner></wa-spinner> `);
          await expect(spinner).to.be.accessible();
        });

        it('should have a role of "status".', async () => {
          const spinner = await fixture<WaSpinner>(html` <wa-spinner></wa-spinner> `);
          const base = spinner.shadowRoot!.querySelector('[part~="base"]')!;
          expect(base).have.attribute('role', 'progressbar');
        });

        it('should have flex:none to prevent flex re-sizing', async () => {
          const spinner = await fixture<WaSpinner>(html` <wa-spinner></wa-spinner> `);

          // 0 0 auto is a compiled value for `none`
          expect(getComputedStyle(spinner).flex).to.equal('0 0 auto');
        });
      });

      describe('when --track-width is set', () => {
        it('should apply --track-width to the SVG circles', async () => {
          const spinner = await fixture<WaSpinner>(html`
            <wa-spinner style="font-size: 50px; --track-width: 4px;"></wa-spinner>
          `);
          const track = spinner.shadowRoot!.querySelector('.track')!;
          const indicator = spinner.shadowRoot!.querySelector('.indicator')!;
          expect(getComputedStyle(track).strokeWidth).to.equal('4px');
          expect(getComputedStyle(indicator).strokeWidth).to.equal('4px');
        });
      });
    });
  }
});
