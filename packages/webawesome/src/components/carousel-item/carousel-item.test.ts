import { expect } from '@open-wc/testing';
import { html } from 'lit';
import { fixtures } from '../../internal/test/fixture.js';
import type WaCarouselItem from './carousel-item.js';

describe('<wa-carousel-item>', () => {
  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      describe('accessibility', () => {
        it('should pass accessibility tests', async () => {
          const el = await fixture<WaCarouselItem>(html` <wa-carousel-item>Slide content</wa-carousel-item> `);
          await expect(el).to.be.accessible();
        });

        it('should have role="group"', async () => {
          const el = await fixture<WaCarouselItem>(html` <wa-carousel-item></wa-carousel-item> `);
          expect(el.getAttribute('role')).to.equal('group');
        });
      });

      describe('properties', () => {
        it('should render successfully', async () => {
          const el = await fixture<WaCarouselItem>(html` <wa-carousel-item></wa-carousel-item> `);
          expect(el).to.be.instanceOf(HTMLElement);
        });
      });

      describe('slots', () => {
        it('should render default slot content', async () => {
          const el = await fixture<WaCarouselItem>(html`
            <wa-carousel-item><p>Slide content</p></wa-carousel-item>
          `);
          const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot:not([name])');
          expect(slot).to.not.be.null;
          const assignedNodes = slot!.assignedNodes({ flatten: true });
          expect(assignedNodes.length).to.be.greaterThan(0);
        });
      });
    });
  }
});
