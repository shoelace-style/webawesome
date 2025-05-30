import { elementUpdated, expect } from '@open-wc/testing';
import { html } from 'lit';
import { fixtures } from '../../internal/test/fixture.js';
import type WaDivider from './divider.js';

describe('<wa-divider>', () => {
  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      describe('defaults ', () => {
        it('default properties', async () => {
          const el = await fixture<WaDivider>(html` <wa-divider></wa-divider> `);

          expect(el.orientation).to.equal('horizontal');
          expect(el.getAttribute('role')).to.equal('separator');
          expect(el.getAttribute('aria-orientation')).to.equal('horizontal');
        });

        it('passes accessibility test', async () => {
          const el = await fixture<WaDivider>(html` <wa-divider></wa-divider> `);
          await expect(el).to.be.accessible();
        });
      });

      describe('vertical property change ', () => {
        it('aria-orientation is updated', async () => {
          const el = await fixture<WaDivider>(html` <wa-divider></wa-divider> `);

          el.orientation = 'vertical';
          await elementUpdated(el);

          expect(el.getAttribute('aria-orientation')).to.equal('vertical');
        });
      });
    });
  }
});
