import { expect, fixture, html } from '@open-wc/testing';

describe('<wa-video>', () => {
  it('should render a component', async () => {
    const el = await fixture(html` <wa-video></wa-video> `);

    expect(el).to.exist;
  });
});
