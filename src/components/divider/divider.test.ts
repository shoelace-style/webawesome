import { clientFixture, hydratedFixture } from '../../internal/test/fixture.js';
import { elementUpdated, expect } from '@open-wc/testing';
import { html } from 'lit';
import type WaDivider from './divider.js';

describe('<wa-divider>', () => {
  for (const fixture of [clientFixture, hydratedFixture]) {
    describe(`with "${fixture.type}" rendering`, () => {
      describe('defaults ', () => {
        it('passes accessibility test', async () => {
          const el = await fixture<WaDivider>(html` <wa-divider></wa-divider> `);
          await expect(el).to.be.accessible();
        });

        it('default properties', async () => {
          const el = await fixture<WaDivider>(html` <wa-divider></wa-divider> `);

          expect(el.vertical).to.be.false;
          expect(el.getAttribute('role')).to.equal('separator');
          expect(el.getAttribute('aria-orientation')).to.equal('horizontal');
        });
      });

      describe('vertical property change ', () => {
        it('aria-orientation is updated', async () => {
          const el = await fixture<WaDivider>(html` <wa-divider></wa-divider> `);

          el.vertical = true;
          await elementUpdated(el);

          expect(el.getAttribute('aria-orientation')).to.equal('vertical');
        });
      });
    });
  }
});
