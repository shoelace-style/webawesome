import { expect } from '@open-wc/testing';
import { fixtures } from '../../internal/test/fixture.js';
import { html } from 'lit';

describe('<wa-page>', () => {
  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      it('should render a component', async () => {
        const el = await fixture(html` <wa-page></wa-page> `);

        expect(el).to.exist;
      });
    });
  }
});
