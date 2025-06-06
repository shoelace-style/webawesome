import { expect, fixture, html } from '@open-wc/testing';

describe('<wa-popover>', () => {
  it('should render a component', async () => {
    const el = await fixture(html` <wa-popover></wa-popover> `);

    expect(el).to.exist;
  });
});
