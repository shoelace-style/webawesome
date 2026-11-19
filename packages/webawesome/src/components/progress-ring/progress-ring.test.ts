import { expect } from '@open-wc/testing';
import { html } from 'lit';
import { fixtures } from '../../internal/test/fixture.js';
import type WaProgressRing from './progress-ring.js';

describe('<wa-progress-ring>', () => {
  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      describe('accessibility', () => {
        it('should be accessible with default properties', async () => {
          const el = await fixture<WaProgressRing>(html`<wa-progress-ring value="25"></wa-progress-ring>`);
          await expect(el).to.be.accessible();
        });

        it('should be accessible with a custom label', async () => {
          const el = await fixture<WaProgressRing>(
            html`<wa-progress-ring value="50" label="Loading"></wa-progress-ring>`,
          );
          await expect(el).to.be.accessible();
        });
      });

      describe('properties', () => {
        it('should have default property values', async () => {
          const el = await fixture<WaProgressRing>(html`<wa-progress-ring></wa-progress-ring>`);

          expect(el.value).to.equal(0);
          expect(el.label).to.equal('');
        });

        it('should reflect the value attribute', async () => {
          const el = await fixture<WaProgressRing>(html`<wa-progress-ring value="75"></wa-progress-ring>`);
          expect(el.value).to.equal(75);
          expect(el.getAttribute('value')).to.equal('75');
        });

        it('should set aria-valuenow from value', async () => {
          const el = await fixture<WaProgressRing>(html`<wa-progress-ring value="25"></wa-progress-ring>`);
          const progressRing = el.shadowRoot!.querySelector('[part~="progress-ring"]')!;
          expect(progressRing.getAttribute('aria-valuenow')).to.equal('25');
        });

        it('should set the --percentage CSS variable based on value', async () => {
          const el = await fixture<WaProgressRing>(html`<wa-progress-ring value="25"></wa-progress-ring>`);
          const progressRing = el.shadowRoot!.querySelector('[part~="progress-ring"]')!;
          expect(progressRing.getAttribute('style')).to.equal('--percentage:0.25;');
        });

        it('should use custom label for aria-label when provided', async () => {
          const el = await fixture<WaProgressRing>(
            html`<wa-progress-ring value="50" label="Uploading"></wa-progress-ring>`,
          );
          const progressRing = el.shadowRoot!.querySelector('[part~="progress-ring"]')!;
          expect(progressRing.getAttribute('aria-label')).to.equal('Uploading');
        });

        it('should have proper ARIA progressbar role', async () => {
          const el = await fixture<WaProgressRing>(html`<wa-progress-ring value="50"></wa-progress-ring>`);
          const progressRing = el.shadowRoot!.querySelector('[part~="progress-ring"]')!;
          expect(progressRing.getAttribute('role')).to.equal('progressbar');
          expect(progressRing.getAttribute('aria-valuemin')).to.equal('0');
          expect(progressRing.getAttribute('aria-valuemax')).to.equal('100');
        });

        it('should update aria-valuenow when value changes', async () => {
          const el = await fixture<WaProgressRing>(html`<wa-progress-ring value="25"></wa-progress-ring>`);
          el.value = 75;
          await el.updateComplete;
          const progressRing = el.shadowRoot!.querySelector('[part~="progress-ring"]')!;
          expect(progressRing.getAttribute('aria-valuenow')).to.equal('75');
        });
      });

      describe('slots', () => {
        it('should render the default slot for the label', async () => {
          const el = await fixture<WaProgressRing>(html`<wa-progress-ring value="50">50%</wa-progress-ring>`);
          const slot = el.shadowRoot!.querySelector('slot');
          expect(slot).to.exist;
        });
      });

      describe('CSS parts', () => {
        it('should expose the "progress-ring" part and keep the deprecated base part', async () => {
          const el = await fixture<WaProgressRing>(html`<wa-progress-ring value="50"></wa-progress-ring>`);
          const wrapper = el.shadowRoot!.querySelector('[part~="progress-ring"]');
          expect(wrapper).to.exist;
          expect(wrapper!.matches('[part~="base"]')).to.be.true;
        });

        it('should have a track part', async () => {
          const el = await fixture<WaProgressRing>(html`<wa-progress-ring value="50"></wa-progress-ring>`);
          expect(el.shadowRoot!.querySelector('[part~="track"]')).to.exist;
        });

        it('should have an indicator part', async () => {
          const el = await fixture<WaProgressRing>(html`<wa-progress-ring value="50"></wa-progress-ring>`);
          expect(el.shadowRoot!.querySelector('[part~="indicator"]')).to.exist;
        });

        it('should have a label part', async () => {
          const el = await fixture<WaProgressRing>(html`<wa-progress-ring value="50"></wa-progress-ring>`);
          expect(el.shadowRoot!.querySelector('[part~="label"]')).to.exist;
        });
      });
    });
  }
});
