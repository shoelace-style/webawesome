import { clientFixture, hydratedFixture } from '../../internal/test/fixture.js';
import { expect } from '@open-wc/testing';
import { html } from "lit"
import type WaCallout from './callout.js';

describe("<wa-callout>", () => {
  for (const fixture of [clientFixture, hydratedFixture]) {
    describe(`with "${fixture.type}" rendering`, () => {
      it('Should properly render callout variants', async () => {
        const variants = ['brand', 'success', 'neutral', 'warning', 'danger'];

        for (const variant of variants) {
          const callout = await fixture<WaCallout>(html`<wa-callout variant="${variant}">I am a callout</wa-callout>`);
          const base = callout.shadowRoot!.querySelector<HTMLElement>('[part="base"]')!;

          expect(base).to.have.class(`callout--${variant}`);
          await expect(callout).to.be.accessible();
        }
      });
    })
  }
})
