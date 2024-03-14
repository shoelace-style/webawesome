import '../../../dist/webawesome.js';
import { expect, fixture, html } from '@open-wc/testing';

describe('<wa-page>', () => {
  it('should render a component', async () => {
    const el = await fixture(html` <wa-page></wa-page> `);

    expect(el).to.exist;
  });
});
