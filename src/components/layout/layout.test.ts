import '../../../dist/shoelace.js';
import { expect, fixture, html } from '@open-wc/testing';

describe('<sl-layout>', () => {
  it('should render a component', async () => {
    const el = await fixture(html` <sl-layout></sl-layout> `);

    expect(el).to.exist;
  });
});
