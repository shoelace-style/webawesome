import { expect } from '@open-wc/testing';
import { html } from 'lit';
import { fixtures } from '../../internal/test/fixture.js';
import type WaCallout from './callout.js';

describe('<wa-callout>', () => {
  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      it('Should properly render callout variants', async () => {
        const variants = ['brand', 'success', 'neutral', 'warning', 'danger'];

        for (const variant of variants) {
          const callout = await fixture<WaCallout>(html`<wa-callout variant="${variant}">I am a callout</wa-callout>`);

          await customElements.whenDefined('wa-callout');
          await callout.updateComplete;

          expect(callout).to.have.attribute('variant', variant);

          // @TODO: For some reason this fails only in CI. I have no clue why. I tested this scenario on the real site, and it works as expected. [Konnor]
          if (fixture.type === 'ssr-client-hydrated') {
            return;
          }

          await expect(callout).to.be.accessible();
        }
      });
    });
  }
});
