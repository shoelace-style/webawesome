import { expect } from '@open-wc/testing';
import { html } from 'lit';
import { fixtures } from '../../internal/test/fixture.js';
import type WaCopyButton from './copy-button.js';

// We use aria-live to announce labels via tooltips
const ignoredRules = ['button-name'];

describe('<wa-copy-button>', () => {
  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      describe('when provided no parameters', () => {
        it('should pass accessibility tests', async () => {
          const el = await fixture<WaCopyButton>(html`<wa-copy-button value="something"></wa-copy-button> `);
          await expect(el).to.be.accessible({ ignoredRules });
        });
      });
    });
  }
});
