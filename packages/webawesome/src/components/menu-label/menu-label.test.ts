import { expect } from '@open-wc/testing';
import { html } from 'lit';
import { fixtures } from '../../internal/test/fixture.js';
import type WaMenuLabel from './menu-label.js';

describe('<wa-menu-label>', () => {
  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      it('passes accessibility test', async () => {
        const el = await fixture<WaMenuLabel>(html` <wa-menu-label>Test</wa-menu-label> `);
        await expect(el).to.be.accessible();
      });
    });
  }
});
