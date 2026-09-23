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

        it('should render the label part on a wrapper, not the slot', async () => {
          const el = await fixture<WaDivider>(html`<wa-divider with-label>OR</wa-divider>`);
          const part = el.shadowRoot!.querySelector('[part="label"]')!;
          expect(part.tagName).to.not.equal('SLOT');
          expect(part.querySelector('slot')).to.exist;
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
          const label = el.shadowRoot!.querySelector('[part="label"]')!.getBoundingClientRect();
          const before = label.left - host.left;
          const after = host.right - label.right;

          expect(getComputedStyle(el).borderTopWidth).to.equal('0px');
          expect(before).to.be.greaterThan(0);
          expect(Math.abs(before - after)).to.be.lessThan(1);
        });

        it('should name the separator after the slotted text', async () => {
          const el = await fixture<WaDivider>(html`<wa-divider with-label>OR</wa-divider>`);
          await elementUpdated(el);
          expect(el.internals.ariaLabel).to.equal('OR');
        });

        it('should leave an author aria-label in place', async () => {
          const el = await fixture<WaDivider>(html`<wa-divider with-label aria-label="Featured">OR</wa-divider>`);
          await elementUpdated(el);
          expect(el.getAttribute('aria-label')).to.equal('Featured');
        });

        it('should center the label between two lines when vertical', async () => {
          const el = await fixture<WaDivider>(
            html`<wa-divider orientation="vertical" with-label style="height: 200px;">OR</wa-divider>`,
          );
          await elementUpdated(el);

          const host = el.getBoundingClientRect();
          const label = el.shadowRoot!.querySelector('[part="label"]')!.getBoundingClientRect();
          const before = label.top - host.top;
          const after = host.bottom - label.bottom;

          expect(getComputedStyle(el).borderInlineStartWidth).to.equal('0px');
          expect(before).to.be.greaterThan(0);
          expect(Math.abs(before - after)).to.be.lessThan(1);
        });
      });

      describe('label placement', () => {
        it('should default label-placement to "center"', async () => {
          const el = await fixture<WaDivider>(html`<wa-divider>OR</wa-divider>`);
          expect(el.labelPlacement).to.equal('center');
          expect(el.getAttribute('label-placement')).to.equal('center');
        });

        it('should reflect label-placement to an attribute', async () => {
          const el = await fixture<WaDivider>(html`<wa-divider label-placement="end">OR</wa-divider>`);
          expect(el.labelPlacement).to.equal('end');
          expect(el.getAttribute('label-placement')).to.equal('end');
        });

        it('should inset a start label by --label-offset when horizontal', async () => {
          const el = await fixture<WaDivider>(
            html`<wa-divider
              with-label
              label-placement="start"
              style="width: 400px; --label-offset: 24px; --label-spacing: 0;"
              >OR</wa-divider
            >`,
          );
          await elementUpdated(el);

          const host = el.getBoundingClientRect();
          const label = el.shadowRoot!.querySelector('[part="label"]')!.getBoundingClientRect();
          expect(Math.abs(label.left - host.left - 24)).to.be.lessThan(1);
        });

        it('should inset an end label by --label-offset when horizontal', async () => {
          const el = await fixture<WaDivider>(
            html`<wa-divider
              with-label
              label-placement="end"
              style="width: 400px; --label-offset: 24px; --label-spacing: 0;"
              >OR</wa-divider
            >`,
          );
          await elementUpdated(el);

          const host = el.getBoundingClientRect();
          const label = el.shadowRoot!.querySelector('[part="label"]')!.getBoundingClientRect();
          expect(Math.abs(host.right - label.right - 24)).to.be.lessThan(1);
        });

        it('should inset a start label by --label-offset when vertical', async () => {
          const el = await fixture<WaDivider>(
            html`<wa-divider
              orientation="vertical"
              with-label
              label-placement="start"
              style="height: 200px; --label-offset: 24px; --label-spacing: 0;"
              >OR</wa-divider
            >`,
          );
          await elementUpdated(el);

          const host = el.getBoundingClientRect();
          const label = el.shadowRoot!.querySelector('[part="label"]')!.getBoundingClientRect();
          expect(Math.abs(label.top - host.top - 24)).to.be.lessThan(1);
        });

        it('should inset an end label by --label-offset when vertical', async () => {
          const el = await fixture<WaDivider>(
            html`<wa-divider
              orientation="vertical"
              with-label
              label-placement="end"
              style="height: 200px; --label-offset: 24px; --label-spacing: 0;"
              >OR</wa-divider
            >`,
          );
          await elementUpdated(el);

          const host = el.getBoundingClientRect();
          const label = el.shadowRoot!.querySelector('[part="label"]')!.getBoundingClientRect();
          expect(Math.abs(host.bottom - label.bottom - 24)).to.be.lessThan(1);
        });

        it('should not collapse either line below --label-offset when the label is centered', async () => {
          const el = await fixture<WaDivider>(
            html`<wa-divider with-label style="width: 400px; --label-offset: 24px; --label-spacing: 0;"
              >OR</wa-divider
            >`,
          );
          await elementUpdated(el);

          const host = el.getBoundingClientRect();
          const label = el.shadowRoot!.querySelector('[part="label"]')!.getBoundingClientRect();
          expect(label.left - host.left).to.be.greaterThan(24);
        });
      });
    });
  }
});
