import '../../../dist/webawesome.js';
import { expect, fixture, html } from '@open-wc/testing';

describe('<wa-popup>', () => {
  it('should render a component', async () => {
    const el = await fixture(html` <wa-popup></wa-popup> `);

    expect(el).to.exist;
  });
});
