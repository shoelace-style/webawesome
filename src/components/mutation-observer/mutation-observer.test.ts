import { clientFixture, hydratedFixture } from '../../internal/test/fixture.js';
import { expect } from '@open-wc/testing';
import { html } from "lit"

describe('<wa-mutation-observer>', () => {
  for (const fixture of [clientFixture, hydratedFixture]) {
    describe(`with "${fixture.type}" rendering`, () => {
      it('should render a component', async () => {
        const el = await fixture(html` <wa-mutation-observer></wa-mutation-observer> `);

        expect(el).to.exist;
      });
    })
  }
});
