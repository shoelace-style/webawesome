import { expect } from '@open-wc/testing';
import { html } from 'lit';
import { fixtures } from '../../internal/test/fixture.js';
import type WaSkeleton from './skeleton.js';

describe('<wa-skeleton>', () => {
  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      it('should render default skeleton', async () => {
        const el = await fixture<WaSkeleton>(html` <wa-skeleton></wa-skeleton> `);

        await expect(el).to.be.accessible();

        const indicator = el.shadowRoot!.querySelector<HTMLElement>('[part~="indicator"]')!;

        expect(el.getAttribute('effect')).to.equal('none');
        expect(indicator.getAttribute('class')).to.equal('indicator');
      });

      it('should set pulse effect by attribute', async () => {
        const el = await fixture<WaSkeleton>(html` <wa-skeleton effect="none"></wa-skeleton> `);
        const indicator = el.shadowRoot!.querySelector<HTMLElement>('[part~="indicator"]')!;
        const cs = getComputedStyle(indicator);

        expect(el.getAttribute('effect')).to.equal('none');
        expect(cs.animationName).to.equal('none');
      });

      it('should set pulse effect by attribute', async () => {
        const el = await fixture<WaSkeleton>(html` <wa-skeleton effect="pulse"></wa-skeleton> `);
        const indicator = el.shadowRoot!.querySelector<HTMLElement>('[part~="indicator"]')!;
        const cs = getComputedStyle(indicator);

        expect(el.getAttribute('effect')).to.equal('pulse');
        expect(cs.animationName).to.equal('pulse');
      });

      it('should set sheen effect by attribute', async () => {
        const el = await fixture<WaSkeleton>(html` <wa-skeleton effect="sheen"></wa-skeleton> `);
        const indicator = el.shadowRoot!.querySelector<HTMLElement>('[part~="indicator"]')!;
        const cs = getComputedStyle(indicator);

        expect(el.getAttribute('effect')).to.equal('sheen');
        expect(cs.animationName).to.equal('sheen');
      });
    });
  }
});
