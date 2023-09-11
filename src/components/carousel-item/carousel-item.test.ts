import '../../../dist/webawesome.js';
import { expect, fixture, html } from '@open-wc/testing';

describe('<wa-carousel-item>', () => {
  it('should render a component', async () => {
    const el = await fixture(html` <wa-carousel-item></wa-carousel-item> `);

    expect(el).to.exist;
  });

  it('should pass accessibility tests', async () => {
    // Arrange
    const el = await fixture(html` <div role="list"><wa-carousel-item></wa-carousel-item></div> `);

    // Assert
    await expect(el).to.be.accessible();
  });
});
