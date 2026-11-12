import { expect, waitUntil } from '@open-wc/testing';
import { resetMouse, sendKeys, sendMouse } from '@web/test-runner-commands';
import { html } from 'lit';
import { expectEvent } from '../../internal/test/expect-event.js';
import { fixtures } from '../../internal/test/fixture.js';
import { moveMouseOnElement } from '../../internal/test/pointer-utilities.js';
import type WaComparison from './comparison.js';

describe('<wa-comparison>', () => {
  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      describe('accessibility', () => {
        it('should have a handle with role="scrollbar"', async () => {
          const el = await fixture<WaComparison>(html`
            <wa-comparison>
              <div slot="before"></div>
              <div slot="after"></div>
            </wa-comparison>
          `);

          const handle = el.shadowRoot!.querySelector<HTMLElement>('[part~="handle"]')!;
          expect(handle.getAttribute('role')).to.equal('scrollbar');
          expect(handle.getAttribute('aria-valuenow')).to.equal('50');
          expect(handle.getAttribute('aria-valuemin')).to.equal('0');
          expect(handle.getAttribute('aria-valuemax')).to.equal('100');
          expect(handle.getAttribute('aria-controls')).to.equal('comparison');
          expect(handle.getAttribute('tabindex')).to.equal('0');
        });

        it('should update aria-valuenow when position changes', async () => {
          const el = await fixture<WaComparison>(html`
            <wa-comparison position="30">
              <div slot="before"></div>
              <div slot="after"></div>
            </wa-comparison>
          `);

          const handle = el.shadowRoot!.querySelector<HTMLElement>('[part~="handle"]')!;
          expect(handle.getAttribute('aria-valuenow')).to.equal('30');
        });
      });

      describe('properties', () => {
        it('should have a default position of 50', async () => {
          const el = await fixture<WaComparison>(html`
            <wa-comparison>
              <div slot="before"></div>
              <div slot="after"></div>
            </wa-comparison>
          `);

          expect(el.position).to.equal(50);
        });

        it('should reflect position to attribute', async () => {
          const el = await fixture<WaComparison>(html`
            <wa-comparison>
              <div slot="before"></div>
              <div slot="after"></div>
            </wa-comparison>
          `);

          el.position = 25;
          await el.updateComplete;
          expect(el.getAttribute('position')).to.equal('25');
        });

        it('should accept position via attribute', async () => {
          const el = await fixture<WaComparison>(html`
            <wa-comparison position="10">
              <div slot="before"></div>
              <div slot="after"></div>
            </wa-comparison>
          `);

          expect(el.position).to.equal(10);
        });

        it('should apply clip-path to the after panel based on position', async () => {
          const el = await fixture<WaComparison>(html`
            <wa-comparison position="75">
              <div slot="before"></div>
              <div slot="after"></div>
            </wa-comparison>
          `);

          const afterPart = el.shadowRoot!.querySelector<HTMLElement>('[part~="after"]')!;
          expect(afterPart.getAttribute('style')).to.equal('clip-path:inset(0 25% 0 0);');
        });
      });

      describe('events', () => {
        it('should emit change event when position is set programmatically', async () => {
          const el = await fixture<WaComparison>(html`
            <wa-comparison>
              <div slot="before"></div>
              <div slot="after"></div>
            </wa-comparison>
          `);

          await expectEvent(el, 'change', () => {
            el.position = 40;
          });
        });

        it('should emit change event on keyboard interaction', async () => {
          const el = await fixture<WaComparison>(html`
            <wa-comparison>
              <div slot="before"></div>
              <div slot="after"></div>
            </wa-comparison>
          `);

          const handle = el.shadowRoot!.querySelector<HTMLElement>('[part~="handle"]')!;
          handle.focus();

          await expectEvent(el, 'change', async () => {
            await sendKeys({ press: 'ArrowRight' });
          });
        });
      });

      describe('slots', () => {
        it('should render before and after slots', async () => {
          const el = await fixture<WaComparison>(html`
            <wa-comparison>
              <div slot="before">Before</div>
              <div slot="after">After</div>
            </wa-comparison>
          `);

          const beforeSlot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="before"]')!;
          const afterSlot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="after"]')!;
          expect(beforeSlot).to.exist;
          expect(afterSlot).to.exist;
        });

        it('should render a handle slot with default icon', async () => {
          const el = await fixture<WaComparison>(html`
            <wa-comparison>
              <div slot="before"></div>
              <div slot="after"></div>
            </wa-comparison>
          `);

          const handleSlot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="handle"]')!;
          expect(handleSlot).to.exist;
          expect(handleSlot.assignedElements().length).to.equal(0);
        });

        it('should accept custom handle content', async () => {
          const el = await fixture<WaComparison>(html`
            <wa-comparison>
              <div slot="before"></div>
              <div slot="after"></div>
              <span slot="handle">Custom</span>
            </wa-comparison>
          `);

          const handleSlot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="handle"]')!;
          expect(handleSlot.assignedElements().length).to.equal(1);
        });
      });

      describe('keyboard navigation', () => {
        it('should increment position by 1 on ArrowRight', async () => {
          const el = await fixture<WaComparison>(html`
            <wa-comparison>
              <div slot="before"></div>
              <div slot="after"></div>
            </wa-comparison>
          `);

          const handle = el.shadowRoot!.querySelector<HTMLElement>('[part~="handle"]')!;
          handle.focus();
          await sendKeys({ press: 'ArrowRight' });
          await el.updateComplete;

          expect(el.position).to.equal(51);
        });

        it('should decrement position by 1 on ArrowLeft', async () => {
          const el = await fixture<WaComparison>(html`
            <wa-comparison>
              <div slot="before"></div>
              <div slot="after"></div>
            </wa-comparison>
          `);

          const handle = el.shadowRoot!.querySelector<HTMLElement>('[part~="handle"]')!;
          handle.focus();
          await sendKeys({ press: 'ArrowLeft' });
          await el.updateComplete;

          expect(el.position).to.equal(49);
        });

        it('should increment position by 10 on Shift+ArrowRight', async () => {
          const el = await fixture<WaComparison>(html`
            <wa-comparison>
              <div slot="before"></div>
              <div slot="after"></div>
            </wa-comparison>
          `);

          const handle = el.shadowRoot!.querySelector<HTMLElement>('[part~="handle"]')!;
          handle.focus();
          await sendKeys({ press: 'Shift+ArrowRight' });
          await el.updateComplete;

          expect(el.position).to.equal(60);
        });

        it('should decrement position by 10 on Shift+ArrowLeft', async () => {
          const el = await fixture<WaComparison>(html`
            <wa-comparison>
              <div slot="before"></div>
              <div slot="after"></div>
            </wa-comparison>
          `);

          const handle = el.shadowRoot!.querySelector<HTMLElement>('[part~="handle"]')!;
          handle.focus();
          await sendKeys({ press: 'Shift+ArrowLeft' });
          await el.updateComplete;

          expect(el.position).to.equal(40);
        });

        it('should set position to 0 on Home', async () => {
          const el = await fixture<WaComparison>(html`
            <wa-comparison>
              <div slot="before"></div>
              <div slot="after"></div>
            </wa-comparison>
          `);

          const handle = el.shadowRoot!.querySelector<HTMLElement>('[part~="handle"]')!;
          handle.focus();
          await sendKeys({ press: 'Home' });
          await el.updateComplete;

          expect(el.position).to.equal(0);
        });

        it('should set position to 100 on End', async () => {
          const el = await fixture<WaComparison>(html`
            <wa-comparison>
              <div slot="before"></div>
              <div slot="after"></div>
            </wa-comparison>
          `);

          const handle = el.shadowRoot!.querySelector<HTMLElement>('[part~="handle"]')!;
          handle.focus();
          await sendKeys({ press: 'End' });
          await el.updateComplete;

          expect(el.position).to.equal(100);
        });

        it('should clamp position at 0 when pressing ArrowLeft at minimum', async () => {
          const el = await fixture<WaComparison>(html`
            <wa-comparison position="0">
              <div slot="before"></div>
              <div slot="after"></div>
            </wa-comparison>
          `);

          const handle = el.shadowRoot!.querySelector<HTMLElement>('[part~="handle"]')!;
          handle.focus();
          await sendKeys({ press: 'ArrowLeft' });
          await el.updateComplete;

          expect(el.position).to.equal(0);
        });

        it('should clamp position at 100 when pressing ArrowRight at maximum', async () => {
          const el = await fixture<WaComparison>(html`
            <wa-comparison position="100">
              <div slot="before"></div>
              <div slot="after"></div>
            </wa-comparison>
          `);

          const handle = el.shadowRoot!.querySelector<HTMLElement>('[part~="handle"]')!;
          handle.focus();
          await sendKeys({ press: 'ArrowRight' });
          await el.updateComplete;

          expect(el.position).to.equal(100);
        });
      });

      describe('drag interaction', () => {
        // https://github.com/shoelace-style/webawesome/issues/2983
        it('should not click the element around it when a drag is released outside', async () => {
          const card = await fixture<HTMLDivElement>(html`
            <div style="display: flex; gap: 40px; padding: 20px;">
              <span style="display: inline-block; width: 80px; height: 40px;">Label</span>
              <wa-comparison style="width: 200px;">
                <div slot="before" style="height: 100px;"></div>
                <div slot="after" style="height: 100px;"></div>
              </wa-comparison>
            </div>
          `);
          const el = card.querySelector('wa-comparison')!;
          const targets: string[] = [];
          card.addEventListener('click', event => targets.push((event.target as Element).localName));

          try {
            await moveMouseOnElement(el.shadowRoot!.querySelector('[part~="handle"]')!);
            await sendMouse({ type: 'down' });
            await moveMouseOnElement(card.querySelector('span')!);
            await sendMouse({ type: 'up' });
          } finally {
            await resetMouse();
          }

          await waitUntil(() => targets.length > 0, 'The release did not fire a click');
          expect(targets).to.deep.equal(['wa-comparison']);
        });
      });

      describe('CSS parts and states', () => {
        it('should expose the expected CSS parts', async () => {
          const el = await fixture<WaComparison>(html`
            <wa-comparison>
              <div slot="before"></div>
              <div slot="after"></div>
            </wa-comparison>
          `);

          expect(el.shadowRoot!.querySelector('[part~="comparison"]')!.matches('[part~="base"]')).to.be.true;
          expect(el.shadowRoot!.querySelector('[part~="before"]')).to.exist;
          expect(el.shadowRoot!.querySelector('[part~="after"]')).to.exist;
          expect(el.shadowRoot!.querySelector('[part~="divider"]')).to.exist;
          expect(el.shadowRoot!.querySelector('[part~="handle"]')).to.exist;
        });
      });
    });
  }
});
