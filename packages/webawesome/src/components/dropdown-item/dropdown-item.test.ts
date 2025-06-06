import { expect, fixture, html } from '@open-wc/testing';

describe('<wa-dropdown-item>', () => {
  it('should render a component', async () => {
    const el = await fixture(html` <wa-dropdown-item></wa-dropdown-item> `);

    expect(el).to.exist;
  });
});
