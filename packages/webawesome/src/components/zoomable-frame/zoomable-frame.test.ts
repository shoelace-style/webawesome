import { expect, fixture, html } from '@open-wc/testing';

describe('<wa-zoomable-frame>', () => {
  it('should render a component', async () => {
    const el = await fixture(html` <wa-zoomable-frame></wa-zoomable-frame> `);

    expect(el).to.exist;
  });
});
