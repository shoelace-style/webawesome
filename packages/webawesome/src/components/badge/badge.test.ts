import { aTimeout, expect } from '@open-wc/testing';
import { html } from 'lit';
import { fixtures } from '../../internal/test/fixture.js';
import type WaBadge from './badge.js';

const ignoredRules = ['color-contrast'];

describe('<wa-badge>', () => {
  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      describe('when provided no parameters', () => {
        it('should render the child content provided', async () => {
          const el = await fixture<WaBadge>(html` <wa-badge>Badge</wa-badge> `);
          expect(el.innerText).to.eq('Badge');
        });

        it('should pass accessibility tests with a role of status on the base part', async () => {
          const el = await fixture<WaBadge>(html` <wa-badge>Badge</wa-badge> `);
          const part = el.shadowRoot!.querySelector('[part~="base"]')!;
          expect(part.getAttribute('role')).to.eq('status');
          await expect(el).to.be.accessible({ ignoredRules });
        });

        it('should default to square styling, with the brand color', async () => {
          const el = await fixture<WaBadge>(html` <wa-badge>Badge</wa-badge> `);
          expect(el.getAttribute('variant')).to.eq('brand');
          expect(el.variant).to.eq('brand');
        });
      });

      describe('when provided a pill parameter', () => {
        it('should pass accessibility tests', async () => {
          const el = await fixture<WaBadge>(html` <wa-badge pill>Badge</wa-badge> `);
          await expect(el).to.be.accessible({ ignoredRules });
        });

        it('should have the pill attribute', async () => {
          const el = await fixture<WaBadge>(html` <wa-badge pill>Badge</wa-badge> `);
          expect(el.hasAttribute('pill')).to.be.true;
        });
      });

      describe('when provided a pulse parameter', () => {
        it('should pass accessibility tests', async () => {
          const el = await fixture<WaBadge>(html` <wa-badge pulse>Badge</wa-badge> `);
          await expect(el).to.be.accessible({ ignoredRules });
          await aTimeout(1);
        });

        it('should have the pulse attribute', async () => {
          const el = await fixture<WaBadge>(html` <wa-badge pulse>Badge</wa-badge> `);
          expect(el.hasAttribute('pulse')).to.be.true;
        });
      });

      ['brand', 'success', 'neutral', 'warning', 'danger'].forEach(variant => {
        describe(`when passed a variant attribute ${variant}`, () => {
          it('should pass accessibility tests', async () => {
            const el = await fixture<WaBadge>(html`<wa-badge variant="${variant}">Badge</wa-badge>`);
            await expect(el).to.be.accessible({ ignoredRules });
            await aTimeout(1);
          });

          it('should have the correct variant attribute', async () => {
            const el = await fixture<WaBadge>(html`<wa-badge variant="${variant}">Badge</wa-badge>`);
            expect(el.getAttribute('variant')).to.eq(variant);
          });
        });
      });
    });
  }
});
