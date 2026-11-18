import { expect } from '@open-wc/testing';
import { html } from 'lit';
import { fixtures } from '../../internal/test/fixture.js';
import type WaSpinner from './spinner.js';

describe('<wa-spinner>', () => {
  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      describe('accessibility', () => {
        it('should pass accessibility tests', async () => {
          const el = await fixture<WaSpinner>(html`<wa-spinner></wa-spinner>`);
          await expect(el).to.be.accessible();
        });

        it('should have role="progressbar" on the spinner part', async () => {
          const el = await fixture<WaSpinner>(html`<wa-spinner></wa-spinner>`);
          const spinner = el.shadowRoot!.querySelector('[part~="spinner"]')!;
          expect(spinner).to.have.attribute('role', 'progressbar');
        });

        it('should have an aria-label for loading', async () => {
          const el = await fixture<WaSpinner>(html`<wa-spinner></wa-spinner>`);
          const spinner = el.shadowRoot!.querySelector('[part~="spinner"]')!;
          expect(spinner).to.have.attribute('aria-label');
        });
      });

      describe('CSS parts', () => {
        it('should expose the "spinner" part and keep the deprecated base part', async () => {
          const el = await fixture<WaSpinner>(html`<wa-spinner></wa-spinner>`);
          const wrapper = el.shadowRoot!.querySelector('[part~="spinner"]');
          expect(wrapper).to.exist;
          expect(wrapper!.matches('[part~="base"]')).to.be.true;
        });
      });

      describe('rendering', () => {
        it('should have flex:none to prevent flex re-sizing', async () => {
          const el = await fixture<WaSpinner>(html`<wa-spinner></wa-spinner>`);
          // 0 0 auto is the computed value for `none`
          expect(getComputedStyle(el).flex).to.equal('0 0 auto');
        });
      });
    });
  }
});
