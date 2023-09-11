import '../../../dist/webawesome.js';
import { expect, fixture, html } from '@open-wc/testing';
import type WaCopyButton from './copy-button.js';

// We use aria-live to announce labels via tooltips
const ignoredRules = ['button-name'];

describe('<wa-copy-button>', () => {
  let el: WaCopyButton;

  describe('when provided no parameters', () => {
    before(async () => {
      el = await fixture(html`<wa-copy-button value="something"></wa-copy-button> `);
    });

    it('should pass accessibility tests', async () => {
      await expect(el).to.be.accessible({ ignoredRules });
    });
  });
});
