import { expect, fixture, html } from '@open-wc/testing';

describe('<wa-sample-component>', () => {
  it('should render a component', async () => {
    const el = await fixture(html` <wa-sample-component></wa-sample-component> `);

    expect(el).to.exist;
  });
});
