import { clientFixture, hydratedFixture } from '../../internal/test/fixture.js';
import { expect } from '@open-wc/testing';
import { html } from "lit"
import type WaCopyButton from './copy-button.js';

// We use aria-live to announce labels via tooltips
const ignoredRules = ['button-name'];

describe('<wa-copy-button>', () => {
  let el: WaCopyButton;

  for (const fixture of [clientFixture, hydratedFixture]) {
    describe(`with "${fixture.type}" rendering`, () => {
      describe('when provided no parameters', () => {
        beforeEach(async () => {
          el = await fixture(html`<wa-copy-button value="something"></wa-copy-button> `);
        });

        it('should pass accessibility tests', async () => {
          await expect(el).to.be.accessible({ ignoredRules });
        });
      });
    })
  }
});
