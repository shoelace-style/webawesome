import '../../../dist/webawesome.js';
import { expect, fixture, html } from '@open-wc/testing';

describe('<wa-nav-item>', () => {
  it('should render a component', async () => {
    const el = await fixture(html` <wa-nav-item></wa-nav-item> `);

    expect(el).to.exist;
  });
});
