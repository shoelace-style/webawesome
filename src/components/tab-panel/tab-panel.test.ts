import { aTimeout, expect } from '@open-wc/testing';
import { html } from 'lit';
import { fixtures } from '../../internal/test/fixture.js';
import type WaTabPanel from './tab-panel.js';

describe('<wa-tab-panel>', () => {
  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      it('passes accessibility test', async () => {
        const el = await fixture<WaTabPanel>(html` <wa-tab-panel>Test</wa-tab-panel> `);
        await expect(el).to.be.accessible();
      });

      it('default properties', async () => {
        const el = await fixture<WaTabPanel>(html` <wa-tab-panel>Test</wa-tab-panel> `);

        expect(el.id).to.not.be.empty;
        expect(el.name).to.equal('');
        expect(el.active).to.equal(false);
        expect(el.getAttribute('role')).to.equal('tabpanel');
        expect(el.getAttribute('aria-hidden')).to.equal('true');
      });

      it('properties should reflect', async () => {
        const el = await fixture<WaTabPanel>(html` <wa-tab-panel>Test</wa-tab-panel> `);

        el.name = 'test';
        el.active = true;
        await aTimeout(100);
        expect(el.getAttribute('name')).to.equal('test');
        expect(el.hasAttribute('active')).to.equal(true);
      });

      it('changing active should always update aria-hidden role', async () => {
        const el = await fixture<WaTabPanel>(html` <wa-tab-panel>Test</wa-tab-panel> `);

        el.active = true;
        await aTimeout(100);
        expect(el.getAttribute('aria-hidden')).to.equal('false');
      });

      it('passed id should be used', async () => {
        const el = await fixture<WaTabPanel>(html` <wa-tab-panel id="test-id">Test</wa-tab-panel> `);

        expect(el.id).to.equal('test-id');
      });
    });
  }
});
