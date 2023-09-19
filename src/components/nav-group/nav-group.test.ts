import '../../../dist/webawesome.js';
import { expect, fixture, html } from '@open-wc/testing';

describe('<wa-nav-group>', () => {
  it('should render a component', async () => {
    const el = await fixture(html` <wa-nav-group></wa-nav-group> `);

    expect(el).to.exist;
  });
});
