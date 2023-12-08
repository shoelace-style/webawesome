import '../../../dist/webawesome.js';
import { expect, fixture, html } from '@open-wc/testing';
import type WaMenuLabel from './menu-label.js';

describe('<wa-menu-label>', () => {
  it('passes accessibility test', async () => {
    const el = await fixture<WaMenuLabel>(html` <wa-menu-label>Test</wa-menu-label> `);
    await expect(el).to.be.accessible();
  });
});
