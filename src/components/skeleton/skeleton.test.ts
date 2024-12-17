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

        const base = el.shadowRoot!.querySelector<HTMLElement>('[part~="base"]')!;
        const indicator = el.shadowRoot!.querySelector<HTMLElement>('[part~="indicator"]')!;

        expect(base.getAttribute('class')).to.equal(' skeleton ');
        expect(indicator.getAttribute('class')).to.equal('skeleton__indicator');
      });

      it('should set pulse effect by attribute', async () => {
        const el = await fixture<WaSkeleton>(html` <wa-skeleton effect="pulse"></wa-skeleton> `);

        const base = el.shadowRoot!.querySelector<HTMLElement>('[part~="base"]')!;

        expect(base.getAttribute('class')).to.equal(' skeleton skeleton--pulse ');
      });

      it('should set sheen effect by attribute', async () => {
        const el = await fixture<WaSkeleton>(html` <wa-skeleton effect="sheen"></wa-skeleton> `);

        const base = el.shadowRoot!.querySelector<HTMLElement>('[part~="base"]')!;

        expect(base.getAttribute('class')).to.equal(' skeleton skeleton--sheen ');
      });
    });
  }
});
