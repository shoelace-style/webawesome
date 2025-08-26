import { expect } from '@open-wc/testing';
import { html } from 'lit';
import { fixtures } from '../../internal/test/fixture.js';
import type WaProgressRing from './progress-ring.js';

describe('<wa-progress-ring>', () => {
  let el: WaProgressRing;

  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      describe('when provided just a value parameter', () => {
        beforeEach(async () => {
          el = await fixture<WaProgressRing>(html`<wa-progress-ring value="25"></wa-progress-ring>`);
        });

        it('should pass accessibility tests', async () => {
          await expect(el).to.be.accessible();
        });
      });

      describe('when provided a title, and value parameter', () => {
        let base: HTMLDivElement;

        beforeEach(async () => {
          el = await fixture<WaProgressRing>(
            html`<wa-progress-ring title="Titled Progress Ring" value="25"></wa-progress-ring>`,
          );
          base = el.shadowRoot!.querySelector('[part~="base"]')!;
        });

        it('should pass accessibility tests', async () => {
          await expect(el).to.be.accessible();
        });

        it('uses the value parameter on the base, as aria-valuenow', () => {
          expect(base).attribute('aria-valuenow', '25');
        });

        it('translates the value parameter to a percentage, and uses translation on the base, as percentage css variable', () => {
          expect(base).attribute('style', '--percentage: 0.25');
        });
      });

      describe('when provided a ariaLabel, and value parameter', () => {
        beforeEach(async () => {
          el = await fixture<WaProgressRing>(
            html`<wa-progress-ring ariaLabel="Labelled Progress Ring" value="25"></wa-progress-ring>`,
          );
        });

        it('should pass accessibility tests', async () => {
          await expect(el).to.be.accessible();
        });
      });

      describe('when provided a ariaLabelledBy, and value parameter', () => {
        beforeEach(async () => {
          el = await fixture<WaProgressRing>(html`
            <label id="labelledby">Progress Ring Label</label>
            <wa-progress-ring ariaLabelledBy="labelledby" value="25"></wa-progress-ring>
          `);
        });

        it('should pass accessibility tests', async () => {
          await expect(el).to.be.accessible();
        });
      });
    });
  }
});
