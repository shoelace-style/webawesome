import { expect } from '@open-wc/testing';
import { html } from 'lit';
import { fixtures } from '../../internal/test/fixture.js';
import type WaProgressBar from './progress-bar.js';

describe('<wa-progress-bar>', () => {
  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      describe('accessibility', () => {
        it('should be accessible with default properties', async () => {
          const el = await fixture<WaProgressBar>(html`<wa-progress-bar value="25"></wa-progress-bar>`);
          await expect(el).to.be.accessible();
        });

        it('should be accessible when indeterminate', async () => {
          const el = await fixture<WaProgressBar>(html`<wa-progress-bar indeterminate></wa-progress-bar>`);
          await expect(el).to.be.accessible();
        });

        it('should be accessible with a custom label', async () => {
          const el = await fixture<WaProgressBar>(
            html`<wa-progress-bar value="50" label="Loading files"></wa-progress-bar>`
          );
          await expect(el).to.be.accessible();
        });
      });

      describe('properties', () => {
        it('should have default property values', async () => {
          const el = await fixture<WaProgressBar>(html`<wa-progress-bar></wa-progress-bar>`);

          expect(el.value).to.equal(0);
          expect(el.indeterminate).to.equal(false);
          expect(el.label).to.equal('');
        });

        it('should reflect the value attribute', async () => {
          const el = await fixture<WaProgressBar>(html`<wa-progress-bar value="50"></wa-progress-bar>`);
          expect(el.value).to.equal(50);
          expect(el.getAttribute('value')).to.equal('50');
        });

        it('should set aria-valuenow from value', async () => {
          const el = await fixture<WaProgressBar>(html`<wa-progress-bar value="75"></wa-progress-bar>`);
          const base = el.shadowRoot!.querySelector('[part~="base"]')!;
          expect(base.getAttribute('aria-valuenow')).to.equal('75');
        });

        it('should set the --percentage custom property from value', async () => {
          const el = await fixture<WaProgressBar>(html`<wa-progress-bar value="25"></wa-progress-bar>`);
          await new Promise(requestAnimationFrame);
          expect(el.style.getPropertyValue('--percentage')).to.equal('25%');
        });

        it('should clamp value between 0 and 100', async () => {
          const el = await fixture<WaProgressBar>(html`<wa-progress-bar value="150"></wa-progress-bar>`);
          await new Promise(requestAnimationFrame);
          expect(el.style.getPropertyValue('--percentage')).to.equal('100%');
        });

        it('should reflect the indeterminate attribute', async () => {
          const el = await fixture<WaProgressBar>(html`<wa-progress-bar indeterminate></wa-progress-bar>`);
          expect(el.indeterminate).to.equal(true);
          expect(el.hasAttribute('indeterminate')).to.be.true;
        });

        it('should set aria-valuenow to 0 when indeterminate', async () => {
          const el = await fixture<WaProgressBar>(html`<wa-progress-bar indeterminate></wa-progress-bar>`);
          const base = el.shadowRoot!.querySelector('[part~="base"]')!;
          expect(base.getAttribute('aria-valuenow')).to.equal('0');
        });

        it('should use custom label for aria-label when provided', async () => {
          const el = await fixture<WaProgressBar>(
            html`<wa-progress-bar value="50" label="Uploading"></wa-progress-bar>`
          );
          const base = el.shadowRoot!.querySelector('[part~="base"]')!;
          expect(base.getAttribute('aria-label')).to.equal('Uploading');
        });

        it('should hide the label slot when indeterminate', async () => {
          const el = await fixture<WaProgressBar>(
            html`<wa-progress-bar indeterminate>50%</wa-progress-bar>`
          );
          const label = el.shadowRoot!.querySelector('[part~="label"]');
          expect(label).to.be.null;
        });

        it('should have proper ARIA progressbar role', async () => {
          const el = await fixture<WaProgressBar>(html`<wa-progress-bar value="50"></wa-progress-bar>`);
          const base = el.shadowRoot!.querySelector('[part~="base"]')!;
          expect(base.getAttribute('role')).to.equal('progressbar');
          expect(base.getAttribute('aria-valuemin')).to.equal('0');
          expect(base.getAttribute('aria-valuemax')).to.equal('100');
        });
      });

      describe('slots', () => {
        it('should render the default slot for the label', async () => {
          const el = await fixture<WaProgressBar>(html`<wa-progress-bar value="50">50%</wa-progress-bar>`);
          const slot = el.shadowRoot!.querySelector('slot');
          expect(slot).to.exist;
        });
      });

      describe('CSS parts', () => {
        it('should have a base part', async () => {
          const el = await fixture<WaProgressBar>(html`<wa-progress-bar value="50"></wa-progress-bar>`);
          expect(el.shadowRoot!.querySelector('[part~="base"]')).to.exist;
        });

        it('should have an indicator part', async () => {
          const el = await fixture<WaProgressBar>(html`<wa-progress-bar value="50"></wa-progress-bar>`);
          expect(el.shadowRoot!.querySelector('[part~="indicator"]')).to.exist;
        });

        it('should have a label part when not indeterminate', async () => {
          const el = await fixture<WaProgressBar>(html`<wa-progress-bar value="50">50%</wa-progress-bar>`);
          expect(el.shadowRoot!.querySelector('[part~="label"]')).to.exist;
        });
      });
    });
  }
});
