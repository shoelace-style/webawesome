import { elementUpdated, expect, waitUntil } from '@open-wc/testing';
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

      describe('label', () => {
        it('should not set with-label when the default slot is empty', async () => {
          const el = await fixture<WaDivider>(html`<wa-divider> </wa-divider>`);
          expect(el.withLabel).to.be.false;
          expect(el.hasAttribute('with-label')).to.be.false;
        });

        it('should set with-label when a label is slotted in', async () => {
          // Slotted content can't be detected on the server, which is what the with-label attribute is for
          if (fixture.type === 'ssr-client-hydrated') {
            return;
          }

          const el = await fixture<WaDivider>(html`<wa-divider>OR</wa-divider>`);
          await elementUpdated(el);
          expect(el.withLabel).to.be.true;
          expect(el.hasAttribute('with-label')).to.be.true;
        });

        it('should pass accessibility tests with a label', async () => {
          const el = await fixture<WaDivider>(html`<wa-divider with-label>OR</wa-divider>`);
          await expect(el).to.be.accessible();
        });

        it('should update with-label when the label is added and removed', async () => {
          const el = await fixture<WaDivider>(html`<wa-divider></wa-divider>`);

          el.textContent = 'OR';
          await waitUntil(() => el.withLabel);
          expect(el.hasAttribute('with-label')).to.be.true;

          el.textContent = '';
          await waitUntil(() => !el.withLabel);
          expect(el.hasAttribute('with-label')).to.be.false;
        });

        it('should center the label between two lines when horizontal', async () => {
          const el = await fixture<WaDivider>(html`<wa-divider with-label style="width: 400px;">OR</wa-divider>`);
          await elementUpdated(el);

          const host = el.getBoundingClientRect();
          const label = el.shadowRoot!.querySelector('slot')!.getBoundingClientRect();
          const before = label.left - host.left;
          const after = host.right - label.right;

          expect(getComputedStyle(el).borderTopWidth).to.equal('0px');
          expect(before).to.be.greaterThan(0);
          expect(Math.abs(before - after)).to.be.lessThan(1);
        });

        it('should center the label between two lines when vertical', async () => {
          const el = await fixture<WaDivider>(
            html`<wa-divider orientation="vertical" with-label style="height: 200px;">OR</wa-divider>`,
          );
          await elementUpdated(el);

          const host = el.getBoundingClientRect();
          const label = el.shadowRoot!.querySelector('slot')!.getBoundingClientRect();
          const before = label.top - host.top;
          const after = host.bottom - label.bottom;

          expect(getComputedStyle(el).borderInlineStartWidth).to.equal('0px');
          expect(before).to.be.greaterThan(0);
          expect(Math.abs(before - after)).to.be.lessThan(1);
        });
      });
    });
  }
});
