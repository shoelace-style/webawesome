import { expect, fixture, html } from '@open-wc/testing';
import '../../../dist/webawesome.js';

describe('<wa-scroller>', () => {
  it('should render a component', async () => {
    const el = await fixture(html` <wa-scroller></wa-scroller> `);

    expect(el).to.exist;
  });
});
