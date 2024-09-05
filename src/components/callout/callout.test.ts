import { expect } from '@open-wc/testing';
import { fixtures } from '../../internal/test/fixture.js';
import { html } from 'lit';
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

          const base = callout.shadowRoot!.querySelector<HTMLElement>('[part="base"]')!;

          expect(base).to.have.class(`callout--${variant}`);
          await expect(callout).to.be.accessible();
        }
      });
    });
  }
});
