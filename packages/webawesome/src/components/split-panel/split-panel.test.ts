import { aTimeout, expect } from '@open-wc/testing';
import { resetMouse, sendKeys } from '@web/test-runner-commands';
import { html } from 'lit';
import { expectEvent } from '../../internal/test/expect-event.js';
import { fixtures } from '../../internal/test/fixture.js';
import { dragElement } from '../../internal/test/pointer-utilities.js';
import type WaSplitPanel from './split-panel.js';

describe('<wa-split-panel>', () => {
  afterEach(async () => {
    // eslint-disable-next-line
    await resetMouse().catch(() => {});
  });

  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      describe('accessibility', () => {
        it('should be accessible', async () => {
          const el = await fixture<WaSplitPanel>(
            html`<wa-split-panel>
              <div slot="start">Start</div>
              <div slot="end">End</div>
            </wa-split-panel>`,
          );

          await expect(el).to.be.accessible();
        });

        it('should have a divider with role="separator"', async () => {
          const el = await fixture<WaSplitPanel>(
            html`<wa-split-panel>
              <div slot="start">Start</div>
              <div slot="end">End</div>
            </wa-split-panel>`,
          );

          const divider = el.shadowRoot!.querySelector('[part="divider"]')!;
          expect(divider.getAttribute('role')).to.equal('separator');
          expect(divider.getAttribute('aria-valuenow')).to.equal('50');
          expect(divider.getAttribute('aria-valuemin')).to.equal('0');
          expect(divider.getAttribute('aria-valuemax')).to.equal('100');
        });

        it('should not have tabindex on divider when disabled', async () => {
          const el = await fixture<WaSplitPanel>(
            html`<wa-split-panel disabled>
              <div slot="start">Start</div>
              <div slot="end">End</div>
            </wa-split-panel>`,
          );

          const divider = el.shadowRoot!.querySelector('[part="divider"]')!;
          expect(divider.hasAttribute('tabindex')).to.be.false;
        });
      });

      describe('properties', () => {
        it('should have a default position of 50', async () => {
          const el = await fixture<WaSplitPanel>(html`<wa-split-panel></wa-split-panel>`);
          expect(el.position).to.equal(50);
        });

        it('should reflect position to attribute', async () => {
          const el = await fixture<WaSplitPanel>(html`<wa-split-panel></wa-split-panel>`);
          el.position = 25;
          await el.updateComplete;
          expect(el.getAttribute('position')).to.equal('25');
        });

        it('should accept position via attribute', async () => {
          const el = await fixture<WaSplitPanel>(html`<wa-split-panel position="25"></wa-split-panel>`);
          expect(el.position).to.equal(25);
        });

        it('should default orientation to horizontal', async () => {
          const el = await fixture<WaSplitPanel>(html`<wa-split-panel></wa-split-panel>`);
          expect(el.orientation).to.equal('horizontal');
        });

        it('should reflect orientation to attribute', async () => {
          const el = await fixture<WaSplitPanel>(
            html`<wa-split-panel orientation="vertical"></wa-split-panel>`,
          );
          expect(el.getAttribute('orientation')).to.equal('vertical');
        });

        it('should default disabled to false', async () => {
          const el = await fixture<WaSplitPanel>(html`<wa-split-panel></wa-split-panel>`);
          expect(el.disabled).to.be.false;
        });

        it('should reflect disabled to attribute', async () => {
          const el = await fixture<WaSplitPanel>(html`<wa-split-panel disabled></wa-split-panel>`);
          expect(el.hasAttribute('disabled')).to.be.true;
        });

        it('should update positionInPixels when position changes', async () => {
          const el = await fixture<WaSplitPanel>(
            html`<wa-split-panel>
              <div slot="start">Start</div>
              <div slot="end">End</div>
            </wa-split-panel>`,
          );

          el.position = 25;
          await el.updateComplete;
          expect(el.positionInPixels).to.be.a('number');
          expect(el.positionInPixels).to.be.greaterThan(0);
        });

        it('should default snapThreshold to 12', async () => {
          const el = await fixture<WaSplitPanel>(html`<wa-split-panel></wa-split-panel>`);
          expect(el.snapThreshold).to.equal(12);
        });
      });

      describe('events', () => {
        it('should emit wa-reposition when position changes', async () => {
          const el = await fixture<WaSplitPanel>(
            html`<wa-split-panel>
              <div slot="start">Start</div>
              <div slot="end">End</div>
            </wa-split-panel>`,
          );

          await expectEvent(el, 'wa-reposition', () => {
            el.position = 10;
          });
        });
      });

      describe('slots', () => {
        it('should render start and end slots', async () => {
          const el = await fixture<WaSplitPanel>(
            html`<wa-split-panel>
              <div slot="start">Start</div>
              <div slot="end">End</div>
            </wa-split-panel>`,
          );

          expect(el).to.contain.text('Start');
          expect(el).to.contain.text('End');
        });

        it('should render a divider slot', async () => {
          const el = await fixture<WaSplitPanel>(
            html`<wa-split-panel>
              <div slot="start">Start</div>
              <div slot="end">End</div>
            </wa-split-panel>`,
          );

          const dividerSlot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="divider"]')!;
          expect(dividerSlot).to.exist;
        });
      });

      describe('keyboard navigation', () => {
        it('should move position left on ArrowLeft in horizontal mode', async () => {
          const el = await fixture<WaSplitPanel>(
            html`<wa-split-panel>
              <div slot="start">Start</div>
              <div slot="end">End</div>
            </wa-split-panel>`,
          );

          const divider = el.shadowRoot!.querySelector<HTMLElement>('[part="divider"]')!;
          divider.focus();
          await sendKeys({ press: 'ArrowLeft' });
          await el.updateComplete;

          expect(el.position).to.equal(49);
        });

        it('should move position right on ArrowRight in horizontal mode', async () => {
          const el = await fixture<WaSplitPanel>(
            html`<wa-split-panel>
              <div slot="start">Start</div>
              <div slot="end">End</div>
            </wa-split-panel>`,
          );

          const divider = el.shadowRoot!.querySelector<HTMLElement>('[part="divider"]')!;
          divider.focus();
          await sendKeys({ press: 'ArrowRight' });
          await el.updateComplete;

          expect(el.position).to.equal(51);
        });

        it('should move position by 10 with Shift+Arrow', async () => {
          const el = await fixture<WaSplitPanel>(
            html`<wa-split-panel>
              <div slot="start">Start</div>
              <div slot="end">End</div>
            </wa-split-panel>`,
          );

          const divider = el.shadowRoot!.querySelector<HTMLElement>('[part="divider"]')!;
          divider.focus();
          await sendKeys({ press: 'Shift+ArrowRight' });
          await el.updateComplete;

          expect(el.position).to.equal(60);
        });

        it('should set position to 0 on Home', async () => {
          const el = await fixture<WaSplitPanel>(
            html`<wa-split-panel>
              <div slot="start">Start</div>
              <div slot="end">End</div>
            </wa-split-panel>`,
          );

          const divider = el.shadowRoot!.querySelector<HTMLElement>('[part="divider"]')!;
          divider.focus();
          await sendKeys({ press: 'Home' });
          await el.updateComplete;

          expect(el.position).to.equal(0);
        });

        it('should set position to 100 on End', async () => {
          const el = await fixture<WaSplitPanel>(
            html`<wa-split-panel>
              <div slot="start">Start</div>
              <div slot="end">End</div>
            </wa-split-panel>`,
          );

          const divider = el.shadowRoot!.querySelector<HTMLElement>('[part="divider"]')!;
          divider.focus();
          await sendKeys({ press: 'End' });
          await el.updateComplete;

          expect(el.position).to.equal(100);
        });

        it('should not respond to keyboard when disabled', async () => {
          const el = await fixture<WaSplitPanel>(
            html`<wa-split-panel disabled>
              <div slot="start">Start</div>
              <div slot="end">End</div>
            </wa-split-panel>`,
          );

          // Divider has no tabindex when disabled, so we dispatch the event directly
          const divider = el.shadowRoot!.querySelector<HTMLElement>('[part="divider"]')!;
          divider.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
          await el.updateComplete;

          expect(el.position).to.equal(50);
        });

        it('should move position up on ArrowUp in vertical mode', async () => {
          const el = await fixture<WaSplitPanel>(
            html`<wa-split-panel orientation="vertical" style="height: 400px;">
              <div slot="start">Start</div>
              <div slot="end">End</div>
            </wa-split-panel>`,
          );

          const divider = el.shadowRoot!.querySelector<HTMLElement>('[part="divider"]')!;
          divider.focus();
          await sendKeys({ press: 'ArrowUp' });
          await el.updateComplete;

          expect(el.position).to.equal(49);
        });

        it('should move position down on ArrowDown in vertical mode', async () => {
          const el = await fixture<WaSplitPanel>(
            html`<wa-split-panel orientation="vertical" style="height: 400px;">
              <div slot="start">Start</div>
              <div slot="end">End</div>
            </wa-split-panel>`,
          );

          const divider = el.shadowRoot!.querySelector<HTMLElement>('[part="divider"]')!;
          divider.focus();
          await sendKeys({ press: 'ArrowDown' });
          await el.updateComplete;

          expect(el.position).to.equal(51);
        });

        it('should collapse and expand on Enter', async () => {
          const el = await fixture<WaSplitPanel>(
            html`<wa-split-panel>
              <div slot="start">Start</div>
              <div slot="end">End</div>
            </wa-split-panel>`,
          );

          const divider = el.shadowRoot!.querySelector<HTMLElement>('[part="divider"]')!;
          divider.focus();

          // Collapse
          await sendKeys({ press: 'Enter' });
          await el.updateComplete;
          // Wait for requestAnimationFrame that sets isCollapsed
          await aTimeout(50);
          expect(el.position).to.equal(0);

          // Expand back
          await sendKeys({ press: 'Enter' });
          await el.updateComplete;
          expect(el.position).to.equal(50);
        });
      });

      describe('drag interaction', () => {
        it('can be resized using the mouse horizontally', async () => {
          const el = await fixture<WaSplitPanel>(
            html`<wa-split-panel>
              <div slot="start">Start</div>
              <div slot="end">End</div>
            </wa-split-panel>`,
          );

          const positionInPixels = Math.round(el.positionInPixels);
          const divider = el.shadowRoot!.querySelector('[part="divider"]')!;

          await dragElement(divider, -30);

          const positionInPixelsAfterDrag = Math.round(el.positionInPixels);
          expect(positionInPixelsAfterDrag).to.equal(positionInPixels - 30);
        });

        it('cannot be resized if disabled', async () => {
          const el = await fixture<WaSplitPanel>(
            html`<wa-split-panel disabled>
              <div slot="start">Start</div>
              <div slot="end">End</div>
            </wa-split-panel>`,
          );

          const positionInPixels = Math.round(el.positionInPixels);
          const divider = el.shadowRoot!.querySelector('[part="divider"]')!;

          await dragElement(divider, -30);

          const positionInPixelsAfterDrag = Math.round(el.positionInPixels);
          expect(positionInPixelsAfterDrag).to.equal(positionInPixels);
        });

        it('can be resized using the mouse vertically', async () => {
          const el = await fixture<WaSplitPanel>(
            html`<wa-split-panel orientation="vertical" style="height: 400px;">
              <div slot="start">Start</div>
              <div slot="end">End</div>
            </wa-split-panel>`,
          );

          const positionInPixels = Math.round(el.positionInPixels);
          const divider = el.shadowRoot!.querySelector('[part="divider"]')!;

          await dragElement(divider, 0, -30);

          const positionInPixelsAfterDrag = Math.round(el.positionInPixels);
          expect(positionInPixelsAfterDrag).to.equal(positionInPixels - 30);
        });

        it('should snap to predefined positions', async () => {
          const el = await fixture<WaSplitPanel>(
            html`<wa-split-panel>
              <div slot="start">Start</div>
              <div slot="end">End</div>
            </wa-split-panel>`,
          );

          const positionInPixels = Math.round(el.positionInPixels);
          el.snap = `${positionInPixels - 40}px`;

          const divider = el.shadowRoot!.querySelector('[part="divider"]')!;
          await dragElement(divider, -30);

          const positionInPixelsAfterDrag = Math.round(el.positionInPixels);
          expect(positionInPixelsAfterDrag).to.equal(positionInPixels - 40);
        });
      });

      describe('CSS parts and states', () => {
        it('should expose the expected CSS parts', async () => {
          const el = await fixture<WaSplitPanel>(
            html`<wa-split-panel>
              <div slot="start">Start</div>
              <div slot="end">End</div>
            </wa-split-panel>`,
          );

          expect(el.shadowRoot!.querySelector('[part~="start"]')).to.exist;
          expect(el.shadowRoot!.querySelector('[part~="end"]')).to.exist;
          expect(el.shadowRoot!.querySelector('[part~="divider"]')).to.exist;
        });
      });
    });
  }
});
