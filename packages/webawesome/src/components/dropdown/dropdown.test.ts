import { expect, fixture, html } from '@open-wc/testing';

describe('<wa-dropdown>', () => {
  it('should render a component', async () => {
    const el = await fixture(html` <wa-dropdown></wa-dropdown> `);

    expect(el).to.exist;
  });
});
