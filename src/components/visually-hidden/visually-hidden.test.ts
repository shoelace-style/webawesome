import { expect } from '@open-wc/testing';
import { fixtures } from '../../internal/test/fixture.js';
import { html } from 'lit';

describe('<wa-visually-hidden>', () => {
  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      it('should render but not display visually hidden content', async () => {
        const el = await fixture(html`
          <wa-visually-hidden>
            <a href="#">Skip to main content</a>
          </wa-visually-hidden>
        `);

        const { width, height, overflow, clipPath } = getComputedStyle(el);

        expect(width).to.equal('1px');
        expect(height).to.equal('1px');
        expect(overflow).to.equal('hidden');
        expect(clipPath).to.equal('inset(50%)');
      });

      // should show visually hidden content when focused
      it('should show visually hidden content when focused', async () => {
        const el = await fixture(html`
          <wa-visually-hidden>
            <a href="#">Skip to main content</a>
          </wa-visually-hidden>
        `);

        const a = el.querySelector('a')!;
        a.focus();

        const { width, height, overflow, clipPath } = getComputedStyle(el);

        expect(width).not.to.equal('1px');
        expect(height).not.to.equal('1px');
        expect(overflow).not.to.equal('hidden');
        expect(clipPath).not.to.equal('inset(50%)');
      });
    });
  }
});
