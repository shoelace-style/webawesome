import { elementUpdated, expect } from '@open-wc/testing';
import { html } from 'lit';
import { fixtures } from '../../internal/test/fixture.js';
import type WaDivider from './divider.js';

describe('<wa-divider>', () => {
  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      describe('accessibility', () => {
        it('should pass accessibility tests', async () => {
          const el = await fixture<WaDivider>(html`<wa-divider></wa-divider>`);
          await expect(el).to.be.accessible();
        });

        it('should have role="separator"', async () => {
          const el = await fixture<WaDivider>(html`<wa-divider></wa-divider>`);
          expect(el.getAttribute('role')).to.equal('separator');
        });

        it('should set aria-orientation to match orientation', async () => {
          const el = await fixture<WaDivider>(html`<wa-divider></wa-divider>`);
          expect(el.getAttribute('aria-orientation')).to.equal('horizontal');
        });
      });

      describe('properties', () => {
        it('should default orientation to "horizontal"', async () => {
          const el = await fixture<WaDivider>(html`<wa-divider></wa-divider>`);
          expect(el.orientation).to.equal('horizontal');
          expect(el.getAttribute('orientation')).to.equal('horizontal');
        });

        it('should reflect orientation to an attribute', async () => {
          const el = await fixture<WaDivider>(html`<wa-divider orientation="vertical"></wa-divider>`);
          expect(el.orientation).to.equal('vertical');
          expect(el.getAttribute('orientation')).to.equal('vertical');
        });

        it('should update aria-orientation when orientation changes', async () => {
          const el = await fixture<WaDivider>(html`<wa-divider></wa-divider>`);
          el.orientation = 'vertical';
          await elementUpdated(el);
          expect(el.getAttribute('aria-orientation')).to.equal('vertical');
        });
      });
    });
  }
});
