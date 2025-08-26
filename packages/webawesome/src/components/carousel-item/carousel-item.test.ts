import { expect } from '@open-wc/testing';
import { html } from 'lit';
import { fixtures } from '../../internal/test/fixture.js';

describe('<wa-carousel-item>', () => {
  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      it('should render a component', async () => {
        const el = await fixture(html`<wa-carousel-item></wa-carousel-item> `);

        expect(el).to.exist;
      });

      it('should pass accessibility tests', async () => {
        // Arrange
        const el = await fixture(html`<wa-carousel-item></wa-carousel-item>`);

        // Assert
        await expect(el).to.be.accessible();
      });
    });
  }
});
