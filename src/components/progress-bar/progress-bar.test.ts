import { expect } from '@open-wc/testing';
import { html } from 'lit';
import { fixtures } from '../../internal/test/fixture.js';
import type WaProgressBar from './progress-bar.js';

describe('<wa-progress-bar>', () => {
  let el: WaProgressBar;

  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      describe('when provided just a value parameter', () => {
        beforeEach(async () => {
          el = await fixture<WaProgressBar>(html`<wa-progress-bar value="25"></wa-progress-bar>`);
        });

        it('should pass accessibility tests', async () => {
          await expect(el).to.be.accessible();
        });
      });

      describe('when provided a title, and value parameter', () => {
        let base: HTMLDivElement;
        let indicator: HTMLDivElement;

        beforeEach(async () => {
          el = await fixture<WaProgressBar>(
            html`<wa-progress-bar title="Titled Progress Ring" value="25"></wa-progress-bar>`,
          );
          base = el.shadowRoot!.querySelector('[part~="base"]')!;
          indicator = el.shadowRoot!.querySelector('[part~="indicator"]')!;
        });

        it('should pass accessibility tests', async () => {
          await expect(el).to.be.accessible();
        });

        it('uses the value parameter on the base, as aria-valuenow', () => {
          expect(base.getAttribute('aria-valuenow')).to.equal('25');
        });

        it('uses the value parameter to set the custom property on the indicator', async () => {
          await new Promise(requestAnimationFrame);
          expect(el.style.getPropertyValue('--percentage')).to.equal('25%');
        });
      });

      describe('when provided an indeterminate parameter', () => {
        let base: HTMLDivElement;

        beforeEach(async () => {
          el = await fixture<WaProgressBar>(
            html`<wa-progress-bar title="Titled Progress Ring" indeterminate></wa-progress-bar>`,
          );
          base = el.shadowRoot!.querySelector('[part~="base"]')!;
        });

        it('should pass accessibility tests', async () => {
          await expect(el).to.be.accessible();
        });

        it('should set the indeterminate attribute on the host', () => {
          expect(el.hasAttribute('indeterminate')).to.be.true;
        });
      });

      describe('when provided a ariaLabel, and value parameter', () => {
        beforeEach(async () => {
          el = await fixture<WaProgressBar>(
            html`<wa-progress-bar ariaLabel="Labelled Progress Ring" value="25"></wa-progress-bar>`,
          );
        });

        it('should pass accessibility tests', async () => {
          await expect(el).to.be.accessible();
        });
      });

      describe('when provided a ariaLabelledBy, and value parameter', () => {
        beforeEach(async () => {
          el = await fixture<WaProgressBar>(html`
            <label id="labelledby">Progress Ring Label</label>
            <wa-progress-bar ariaLabelledBy="labelledby" value="25"></wa-progress-bar>
          `);
        });

        it('should pass accessibility tests', async () => {
          await expect(el).to.be.accessible();
        });
      });
    });
  }
});
