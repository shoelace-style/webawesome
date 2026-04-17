import { aTimeout, expect } from '@open-wc/testing';
import { html } from 'lit';
import { fixtures } from '../../internal/test/fixture.js';
import type WaScroller from './scroller.js';

describe('<wa-scroller>', () => {
  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      describe('accessibility', () => {
        it('should render a component', async () => {
          const el = await fixture<WaScroller>(html` <wa-scroller></wa-scroller> `);

          expect(el).to.exist;
        });

        it('should have a region role on the content container', async () => {
          const el = await fixture<WaScroller>(html` <wa-scroller></wa-scroller> `);

          const content = el.shadowRoot!.querySelector('#content')!;
          expect(content).to.have.attribute('role', 'region');
        });

        it('should have an aria-label on the content container', async () => {
          const el = await fixture<WaScroller>(html` <wa-scroller></wa-scroller> `);

          const content = el.shadowRoot!.querySelector('#content')!;
          expect(content).to.have.attribute('aria-label');
        });

        it('should set aria-orientation based on orientation property', async () => {
          const el = await fixture<WaScroller>(html` <wa-scroller orientation="vertical"></wa-scroller> `);

          const content = el.shadowRoot!.querySelector('#content')!;
          expect(content).to.have.attribute('aria-orientation', 'vertical');
        });
      });

      describe('properties', () => {
        describe('orientation', () => {
          it('should default to horizontal', async () => {
            const el = await fixture<WaScroller>(html` <wa-scroller></wa-scroller> `);
            expect(el.orientation).to.equal('horizontal');
          });

          it('should reflect the orientation attribute', async () => {
            const el = await fixture<WaScroller>(html` <wa-scroller orientation="vertical"></wa-scroller> `);
            expect(el).to.have.attribute('orientation', 'vertical');
          });
        });

        describe('without-scrollbar', () => {
          it('should default to false', async () => {
            const el = await fixture<WaScroller>(html` <wa-scroller></wa-scroller> `);
            expect(el.withoutScrollbar).to.be.false;
          });

          it('should reflect the without-scrollbar attribute', async () => {
            const el = await fixture<WaScroller>(html` <wa-scroller without-scrollbar></wa-scroller> `);
            expect(el.withoutScrollbar).to.be.true;
            expect(el).to.have.attribute('without-scrollbar');
          });
        });

        describe('without-shadow', () => {
          it('should default to false', async () => {
            const el = await fixture<WaScroller>(html` <wa-scroller></wa-scroller> `);
            expect(el.withoutShadow).to.be.false;
          });

          it('should reflect the without-shadow attribute', async () => {
            const el = await fixture<WaScroller>(html` <wa-scroller without-shadow></wa-scroller> `);
            expect(el.withoutShadow).to.be.true;
            expect(el).to.have.attribute('without-shadow');
          });

          it('should not render shadow elements when without-shadow is set', async () => {
            const el = await fixture<WaScroller>(html` <wa-scroller without-shadow></wa-scroller> `);

            expect(el.shadowRoot!.querySelector('#start-shadow')).to.not.exist;
            expect(el.shadowRoot!.querySelector('#end-shadow')).to.not.exist;
          });

          it('should render shadow elements by default', async () => {
            const el = await fixture<WaScroller>(html` <wa-scroller></wa-scroller> `);

            expect(el.shadowRoot!.querySelector('#start-shadow')).to.exist;
            expect(el.shadowRoot!.querySelector('#end-shadow')).to.exist;
          });
        });
      });

      describe('slots', () => {
        it('should render slotted content', async () => {
          const el = await fixture<WaScroller>(html`
            <wa-scroller>
              <div>Content</div>
            </wa-scroller>
          `);

          const slot = el.shadowRoot!.querySelector('slot:not([name])')!;
          expect(slot).to.exist;
        });
      });

      describe('scroll behavior', () => {
        it('should set tabindex to 0 when content is scrollable', async () => {
          const el = await fixture<WaScroller>(html`
            <wa-scroller style="width: 100px;">
              <div style="width: 500px; white-space: nowrap;">
                This is long content that should cause scrolling to occur within the scroller component
              </div>
            </wa-scroller>
          `);

          await aTimeout(50);
          await el.updateComplete;

          const content = el.shadowRoot!.querySelector('#content')!;
          expect(content).to.have.attribute('tabindex', '0');
        });

        it('should set tabindex to -1 when content is not scrollable', async () => {
          const el = await fixture<WaScroller>(html`
            <wa-scroller style="width: 500px;">
              <div style="width: 50px;">Short</div>
            </wa-scroller>
          `);

          await aTimeout(50);
          await el.updateComplete;

          const content = el.shadowRoot!.querySelector('#content')!;
          expect(content).to.have.attribute('tabindex', '-1');
        });
      });

      describe('CSS parts and states', () => {
        it('should expose the content part', async () => {
          const el = await fixture<WaScroller>(html` <wa-scroller></wa-scroller> `);

          const content = el.shadowRoot!.querySelector('[part="content"]')!;
          expect(content).to.exist;
        });
      });
    });
  }
});
