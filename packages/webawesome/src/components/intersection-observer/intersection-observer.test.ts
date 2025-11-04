import { expect, fixture, html } from '@open-wc/testing';

describe('<wa-intersection-observer>', () => {
  it('should render a component', async () => {
    const el = await fixture(html` <wa-intersection-observer></wa-intersection-observer> `);

    expect(el).to.exist;
  });
});
