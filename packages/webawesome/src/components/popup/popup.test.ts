import { aTimeout, expect } from '@open-wc/testing';
import { html } from 'lit';
import { fixtures } from '../../internal/test/fixture.js';
import type WaPopup from './popup.js';

describe('<wa-popup>', () => {
  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      describe('properties', () => {
        it('should have correct default property values', async () => {
          const el = await fixture<WaPopup>(html`<wa-popup></wa-popup>`);

          expect(el.active).to.be.false;
          expect(el.placement).to.equal('top');
          expect(el.distance).to.equal(0);
          expect(el.skidding).to.equal(0);
          expect(el.arrow).to.be.false;
          expect(el.arrowPlacement).to.equal('anchor');
          expect(el.arrowPadding).to.equal(10);
          expect(el.flip).to.be.false;
          expect(el.flipFallbackStrategy).to.equal('best-fit');
          expect(el.flipPadding).to.equal(0);
          expect(el.shift).to.be.false;
          expect(el.shiftPadding).to.equal(0);
          expect(el.autoSizePadding).to.equal(0);
          expect(el.hoverBridge).to.be.false;
          expect(el.boundary).to.equal('viewport');
        });

        it('should reflect the "active" property to an attribute', async () => {
          const el = await fixture<WaPopup>(html`<wa-popup></wa-popup>`);

          expect(el.hasAttribute('active')).to.be.false;

          el.active = true;
          await el.updateComplete;
          expect(el.hasAttribute('active')).to.be.true;

          el.active = false;
          await el.updateComplete;
          expect(el.hasAttribute('active')).to.be.false;
        });

        it('should reflect the "placement" property to an attribute', async () => {
          const el = await fixture<WaPopup>(html`<wa-popup></wa-popup>`);

          expect(el.getAttribute('placement')).to.equal('top');

          el.placement = 'bottom';
          await el.updateComplete;
          expect(el.getAttribute('placement')).to.equal('bottom');
        });

        it('should accept all valid placement values', async () => {
          const el = await fixture<WaPopup>(html`<wa-popup></wa-popup>`);

          const placements = [
            'top',
            'top-start',
            'top-end',
            'bottom',
            'bottom-start',
            'bottom-end',
            'right',
            'right-start',
            'right-end',
            'left',
            'left-start',
            'left-end',
          ] as const;

          for (const placement of placements) {
            el.placement = placement;
            await el.updateComplete;
            expect(el.placement).to.equal(placement);
          }
        });

        it('should set the anchor property to an element reference', async () => {
          const el = await fixture<WaPopup>(html`
            <div>
              <span id="my-anchor">Anchor</span>
              <wa-popup></wa-popup>
            </div>
          `);

          const popup = el.querySelector<WaPopup>('wa-popup')!;
          const anchor = el.querySelector<HTMLElement>('#my-anchor')!;

          popup.anchor = anchor;
          await popup.updateComplete;
          expect(popup.anchor).to.equal(anchor);
        });

        it('should set the anchor property to a string id', async () => {
          const el = await fixture<WaPopup>(html`
            <div>
              <span id="my-anchor">Anchor</span>
              <wa-popup anchor="my-anchor"></wa-popup>
            </div>
          `);

          const popup = el.querySelector<WaPopup>('wa-popup')!;
          expect(popup.anchor).to.equal('my-anchor');
        });

        it('should set the arrow property', async () => {
          const el = await fixture<WaPopup>(html`<wa-popup arrow></wa-popup>`);
          expect(el.arrow).to.be.true;
        });

        it('should set the flip property', async () => {
          const el = await fixture<WaPopup>(html`<wa-popup flip></wa-popup>`);
          expect(el.flip).to.be.true;
        });

        it('should set the shift property', async () => {
          const el = await fixture<WaPopup>(html`<wa-popup shift></wa-popup>`);
          expect(el.shift).to.be.true;
        });

        it('should set the distance property', async () => {
          const el = await fixture<WaPopup>(html`<wa-popup distance="10"></wa-popup>`);
          expect(el.distance).to.equal(10);
        });

        it('should set the skidding property', async () => {
          const el = await fixture<WaPopup>(html`<wa-popup skidding="5"></wa-popup>`);
          expect(el.skidding).to.equal(5);
        });

        it('should set the hover-bridge property', async () => {
          const el = await fixture<WaPopup>(html`<wa-popup hover-bridge></wa-popup>`);
          expect(el.hoverBridge).to.be.true;
        });
      });

      describe('events', () => {
        it('should emit wa-reposition when active and repositioned', async () => {
          const el = await fixture<WaPopup>(html`
            <div>
              <span id="anchor" style="display: inline-block; width: 50px; height: 50px;">Anchor</span>
              <wa-popup anchor="anchor">
                <div style="width: 100px; height: 100px;">Popup content</div>
              </wa-popup>
            </div>
          `);

          const popup = el.querySelector<WaPopup>('wa-popup')!;

          let repositionFired = false;
          popup.addEventListener('wa-reposition', () => {
            repositionFired = true;
          });

          popup.active = true;
          await popup.updateComplete;
          await aTimeout(50);

          expect(repositionFired).to.be.true;
        });
      });

      describe('slots', () => {
        it('should render slotted content in the default slot', async () => {
          const el = await fixture<WaPopup>(html`
            <wa-popup>
              <div id="popup-content">Popup content</div>
            </wa-popup>
          `);

          const content = el.querySelector('#popup-content');
          expect(content).to.exist;
          expect(content!.textContent).to.equal('Popup content');
        });

        it('should render slotted content in the anchor slot', async () => {
          const el = await fixture<WaPopup>(html`
            <wa-popup>
              <span slot="anchor">Anchor</span>
              <div>Popup content</div>
            </wa-popup>
          `);

          const anchor = el.querySelector('[slot="anchor"]');
          expect(anchor).to.exist;
          expect(anchor!.textContent).to.equal('Anchor');
        });
      });

      describe('CSS parts and states', () => {
        it('should expose the "popup" CSS part', async () => {
          const el = await fixture<WaPopup>(html`<wa-popup></wa-popup>`);

          const popupPart = el.shadowRoot!.querySelector('[part~="popup"]');
          expect(popupPart).to.exist;
        });

        it('should expose the "arrow" CSS part when arrow is enabled', async () => {
          const el = await fixture<WaPopup>(html`<wa-popup arrow></wa-popup>`);

          const arrowPart = el.shadowRoot!.querySelector('[part~="arrow"]');
          expect(arrowPart).to.exist;
        });

        it('should not render the arrow when arrow is disabled', async () => {
          const el = await fixture<WaPopup>(html`<wa-popup></wa-popup>`);

          const arrowPart = el.shadowRoot!.querySelector('[part~="arrow"]');
          expect(arrowPart).to.not.exist;
        });

        it('should expose the "hover-bridge" CSS part', async () => {
          const el = await fixture<WaPopup>(html`<wa-popup></wa-popup>`);

          const hoverBridgePart = el.shadowRoot!.querySelector('[part~="hover-bridge"]');
          expect(hoverBridgePart).to.exist;
        });
      });

      describe('behavior', () => {
        it('should not throw when active changes rapidly', async () => {
          const el = await fixture<WaPopup>(html`<wa-popup></wa-popup>`);

          expect(() => {
            el.active = true;
            el.active = false;
            el.active = true;
          }).not.to.throw();

          await el.updateComplete;
        });

        it('should handle positioning when active changes with scroll events', async () => {
          const el = await fixture<WaPopup>(html`<wa-popup></wa-popup>`);

          el.active = true;
          await el.updateComplete;

          const event = new Event('scroll');
          window.dispatchEvent(event);

          el.active = false;
          await el.updateComplete;

          expect(() => {
            el.active = true;
            window.dispatchEvent(event);
          }).not.to.throw();
        });

        it('should set data-current-placement when active with a valid anchor', async () => {
          const el = await fixture<WaPopup>(html`
            <div>
              <span id="anchor" style="display: inline-block; width: 50px; height: 50px;">Anchor</span>
              <wa-popup anchor="anchor" placement="bottom">
                <div style="width: 100px; height: 100px;">Popup content</div>
              </wa-popup>
            </div>
          `);

          const popup = el.querySelector<WaPopup>('wa-popup')!;
          popup.active = true;
          await popup.updateComplete;
          await aTimeout(50);

          expect(popup.hasAttribute('data-current-placement')).to.be.true;
        });
      });
    });
  }
});
