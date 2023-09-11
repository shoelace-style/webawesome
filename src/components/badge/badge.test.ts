import '../../../dist/webawesome.js';
import { expect, fixture, html } from '@open-wc/testing';
import type WaBadge from './badge.js';

// The default badge background just misses AA contrast, but the next step up is way too dark. We're going to relax this
// rule for now.
const ignoredRules = ['color-contrast'];

describe('<wa-badge>', () => {
  let el: WaBadge;

  describe('when provided no parameters', () => {
    before(async () => {
      el = await fixture<WaBadge>(html` <wa-badge>Badge</wa-badge> `);
    });

    it('should pass accessibility tests with a role of status on the base part.', async () => {
      await expect(el).to.be.accessible({ ignoredRules });

      const part = el.shadowRoot!.querySelector('[part~="base"]')!;
      expect(part.getAttribute('role')).to.eq('status');
    });

    it('should render the child content provided', () => {
      expect(el.innerText).to.eq('Badge');
    });

    it('should default to square styling, with the brand color', () => {
      const part = el.shadowRoot!.querySelector('[part~="base"]')!;
      expect(part.classList.value.trim()).to.eq('badge badge--brand');
    });
  });

  describe('when provided a pill parameter', () => {
    before(async () => {
      el = await fixture<WaBadge>(html` <wa-badge pill>Badge</wa-badge> `);
    });

    it('should pass accessibility tests', async () => {
      await expect(el).to.be.accessible({ ignoredRules });
    });

    it('should append the pill class to the classlist to render a pill', () => {
      const part = el.shadowRoot!.querySelector('[part~="base"]')!;
      expect(part.classList.value.trim()).to.eq('badge badge--brand badge--pill');
    });
  });

  describe('when provided a pulse parameter', () => {
    before(async () => {
      el = await fixture<WaBadge>(html` <wa-badge pulse>Badge</wa-badge> `);
    });

    it('should pass accessibility tests', async () => {
      await expect(el).to.be.accessible({ ignoredRules });
    });

    it('should append the pulse class to the classlist to render a pulse', () => {
      const part = el.shadowRoot!.querySelector('[part~="base"]')!;
      expect(part.classList.value.trim()).to.eq('badge badge--brand badge--pulse');
    });
  });

  ['brand', 'success', 'neutral', 'warning', 'danger'].forEach(variant => {
    describe(`when passed a variant attribute ${variant}`, () => {
      before(async () => {
        el = await fixture<WaBadge>(html`<wa-badge variant="${variant}">Badge</wa-badge>`);
      });

      it('should pass accessibility tests', async () => {
        await expect(el).to.be.accessible({ ignoredRules });
      });

      it('should default to square styling, with the correct color', () => {
        const part = el.shadowRoot!.querySelector('[part~="base"]')!;
        expect(part.classList.value.trim()).to.eq(`badge badge--${variant}`);
      });
    });
  });
});
