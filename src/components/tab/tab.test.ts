import { expect } from '@open-wc/testing';
import { html } from 'lit';
import { fixtures } from '../../internal/test/fixture.js';
import type WaTab from './tab.js';

describe('<wa-tab>', () => {
  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      it('passes accessibility test', async () => {
        const el = await fixture<WaTab>(html`
          <wa-tab-group>
            <wa-tab>Test</wa-tab>
          </wa-tab-group>
        `);
        await expect(el).to.be.accessible();
      });

      it('should render default tab', async () => {
        const el = await fixture<WaTab>(html` <wa-tab>Test</wa-tab> `);

        const base = el.shadowRoot!.querySelector<HTMLElement>('[part~="base"]')!;

        expect(el.getAttribute('role')).to.equal('tab');
        expect(el.getAttribute('aria-disabled')).to.equal('false');
        expect(el.getAttribute('aria-selected')).to.equal('false');
        expect(el.getAttribute('tabindex')).to.equal('0');
        expect(base.getAttribute('class')).to.equal(' tab ');
        expect(el.active).to.equal(false);
        expect(el.disabled).to.equal(false);
      });

      it('should disable tab by attribute', async () => {
        const el = await fixture<WaTab>(html` <wa-tab disabled>Test</wa-tab> `);

        const base = el.shadowRoot!.querySelector<HTMLElement>('[part~="base"]')!;

        expect(el.disabled).to.equal(true);
        expect(el.getAttribute('aria-disabled')).to.equal('true');
        expect(el.getAttribute('tabindex')).to.equal('-1');
      });

      it('should set active tab by attribute', async () => {
        const el = await fixture<WaTab>(html` <wa-tab active>Test</wa-tab> `);

        const base = el.shadowRoot!.querySelector<HTMLElement>('[part~="base"]')!;

        expect(el.active).to.equal(true);
        expect(el.getAttribute('aria-selected')).to.equal('true');
        expect(base.getAttribute('class')).to.equal(' tab tab-active ');
        expect(el.getAttribute('tabindex')).to.equal('0');
      });
    });
  }
});
