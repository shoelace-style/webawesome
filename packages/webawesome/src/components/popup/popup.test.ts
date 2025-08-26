import { expect } from '@open-wc/testing';
import { html } from 'lit';
import { fixtures } from '../../internal/test/fixture.js';
import type WaPopup from './popup.js';

describe('<wa-popup>', () => {
  let element: WaPopup;

  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      it('should render a component', async () => {
        const el = await fixture(html` <wa-popup></wa-popup> `);

        expect(el).to.exist;
      });

      it('should properly handle positioning when active changes', async () => {
        element = await fixture(html`<wa-popup></wa-popup>`);

        element.active = true;
        await element.updateComplete;

        // SImulate a scroll event
        const event = new Event('scroll');
        window.dispatchEvent(event);

        element.active = false;
        await element.updateComplete;

        // The component should not throw an error when the window is scrolled
        expect(() => {
          element.active = true;
          window.dispatchEvent(event);
        }).not.to.throw();
      });
    });
  }
});
