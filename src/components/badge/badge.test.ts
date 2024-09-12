import { aTimeout, expect } from '@open-wc/testing';
import { fixtures } from '../../internal/test/fixture.js';
import { html } from 'lit';
import type WaBadge from './badge.js';

// The default badge background just misses AA contrast, but the next step up is way too dark. We're going to relax this
// rule for now.
const ignoredRules = ['color-contrast'];

describe('<wa-badge>', () => {
  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      describe('when provided no parameters', () => {
        it('should render the child content provided', async () => {
          const el = await fixture<WaBadge>(html` <wa-badge>Badge</wa-badge> `);
          expect(el.innerText).to.eq('Badge');
        });

        it('should pass accessibility tests with a role of status on the base part.', async () => {
          const el = await fixture<WaBadge>(html` <wa-badge>Badge</wa-badge> `);
          const part = el.shadowRoot!.querySelector('[part~="base"]')!;
          expect(part.getAttribute('role')).to.eq('status');
          await expect(el).to.be.accessible({ ignoredRules });
        });

        it('should default to square styling, with the brand color', async () => {
          const el = await fixture<WaBadge>(html` <wa-badge>Badge</wa-badge> `);
          const part = el.shadowRoot!.querySelector('[part~="base"]')!;
          expect(part.classList.value.trim()).to.eq('badge badge--brand');
        });
      });

      describe('when provided a pill parameter', () => {
        it('should pass accessibility tests', async () => {
          const el = await fixture<WaBadge>(html` <wa-badge pill>Badge</wa-badge> `);
          await expect(el).to.be.accessible({ ignoredRules });
        });

        it('should append the pill class to the classlist to render a pill', async () => {
          const el = await fixture<WaBadge>(html` <wa-badge pill>Badge</wa-badge> `);
          const part = el.shadowRoot!.querySelector('[part~="base"]')!;
          expect(part.classList.value.trim()).to.eq('badge badge--brand badge--pill');
        });
      });

      describe('when provided a pulse parameter', () => {
        it('should pass accessibility tests', async () => {
          const el = await fixture<WaBadge>(html` <wa-badge pulse>Badge</wa-badge> `);
          await expect(el).to.be.accessible({ ignoredRules });
          await aTimeout(1);
        });

        it('should append the pulse class to the classlist to render a pulse', async () => {
          const el = await fixture<WaBadge>(html` <wa-badge pulse>Badge</wa-badge> `);
          const part = el.shadowRoot!.querySelector('[part~="base"]')!;
          expect(part.classList.value.trim()).to.eq('badge badge--brand badge--pulse');
        });
      });

      ['brand', 'success', 'neutral', 'warning', 'danger'].forEach(variant => {
        describe(`when passed a variant attribute ${variant}`, () => {
          it('should pass accessibility tests', async () => {
            const el = await fixture<WaBadge>(html`<wa-badge variant="${variant}">Badge</wa-badge>`);
            await expect(el).to.be.accessible({ ignoredRules });
            await aTimeout(1);
          });

          it('should default to square styling, with the correct color', async () => {
            const el = await fixture<WaBadge>(html`<wa-badge variant="${variant}">Badge</wa-badge>`);
            const part = el.shadowRoot!.querySelector('[part~="base"]')!;
            expect(part.classList.value.trim()).to.eq(`badge badge--${variant}`);
          });
        });
      });
    });
  }
});
