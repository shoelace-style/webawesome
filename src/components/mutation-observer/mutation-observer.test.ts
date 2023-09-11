import '../../../dist/webawesome.js';
import { expect, fixture, html } from '@open-wc/testing';

describe('<wa-mutation-observer>', () => {
  it('should render a component', async () => {
    const el = await fixture(html` <wa-mutation-observer></wa-mutation-observer> `);

    expect(el).to.exist;
  });
});
