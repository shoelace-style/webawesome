import { aTimeout, expect, waitUntil } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit';
import sinon from 'sinon';
import { expectEvent } from '../../internal/test/expect-event.js';
import { fixtures } from '../../internal/test/fixture.js';
import { clickOnElement } from '../../internal/test/pointer-utilities.js';
import type WaPopover from './popover.js';

describe('<wa-popover>', () => {
  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      describe('accessibility', () => {
        it('should use a dialog element internally', async () => {
          const el = await fixture<HTMLDivElement>(html`
            <div>
              <wa-button id="anchor">Anchor</wa-button>
              <wa-popover for="anchor">Popover content</wa-popover>
            </div>
          `);
          const popover = el.querySelector<WaPopover>('wa-popover')!;
          await popover.updateComplete;
          const dialog = popover.shadowRoot!.querySelector('dialog');
          expect(dialog).to.exist;
        });
      });

      describe('properties', () => {
        it('should render a component', async () => {
          const el = await fixture(html`<wa-popover></wa-popover>`);
          expect(el).to.exist;
        });

        it('should default to closed', async () => {
          const el = await fixture<HTMLDivElement>(html`
            <div>
              <wa-button id="anchor">Anchor</wa-button>
              <wa-popover for="anchor">Content</wa-popover>
            </div>
          `);
          const popover = el.querySelector<WaPopover>('wa-popover')!;
          expect(popover.open).to.be.false;
        });

        it('should default placement to top', async () => {
          const el = await fixture<HTMLDivElement>(html`
            <div>
              <wa-button id="anchor">Anchor</wa-button>
              <wa-popover for="anchor">Content</wa-popover>
            </div>
          `);
          const popover = el.querySelector<WaPopover>('wa-popover')!;
          expect(popover.placement).to.equal('top');
        });

        it('should accept a custom placement', async () => {
          const el = await fixture<HTMLDivElement>(html`
            <div>
              <wa-button id="anchor">Anchor</wa-button>
              <wa-popover for="anchor" placement="bottom-start">Content</wa-popover>
            </div>
          `);
          const popover = el.querySelector<WaPopover>('wa-popover')!;
          expect(popover.placement).to.equal('bottom-start');
        });

        it('should default distance to 8', async () => {
          const el = await fixture<HTMLDivElement>(html`
            <div>
              <wa-button id="anchor">Anchor</wa-button>
              <wa-popover for="anchor">Content</wa-popover>
            </div>
          `);
          const popover = el.querySelector<WaPopover>('wa-popover')!;
          expect(popover.distance).to.equal(8);
        });

        it('should accept a custom distance', async () => {
          const el = await fixture<HTMLDivElement>(html`
            <div>
              <wa-button id="anchor">Anchor</wa-button>
              <wa-popover for="anchor" distance="20">Content</wa-popover>
            </div>
          `);
          const popover = el.querySelector<WaPopover>('wa-popover')!;
          expect(popover.distance).to.equal(20);
        });

        it('should accept skidding property', async () => {
          const el = await fixture<HTMLDivElement>(html`
            <div>
              <wa-button id="anchor">Anchor</wa-button>
              <wa-popover for="anchor" skidding="15">Content</wa-popover>
            </div>
          `);
          const popover = el.querySelector<WaPopover>('wa-popover')!;
          expect(popover.skidding).to.equal(15);
        });

        it('should accept the for property', async () => {
          const el = await fixture<HTMLDivElement>(html`
            <div>
              <wa-button id="my-anchor">Anchor</wa-button>
              <wa-popover for="my-anchor">Content</wa-popover>
            </div>
          `);
          const popover = el.querySelector<WaPopover>('wa-popover')!;
          expect(popover.for).to.equal('my-anchor');
        });

        it('should accept without-arrow property', async () => {
          const el = await fixture<HTMLDivElement>(html`
            <div>
              <wa-button id="anchor">Anchor</wa-button>
              <wa-popover for="anchor" without-arrow>Content</wa-popover>
            </div>
          `);
          const popover = el.querySelector<WaPopover>('wa-popover')!;
          expect(popover.withoutArrow).to.be.true;
        });
      });

      describe('events', () => {
        it('should fire wa-show and wa-after-show when opening via open property', async () => {
          const el = await fixture<HTMLDivElement>(html`
            <div>
              <wa-button id="anchor">Anchor</wa-button>
              <wa-popover for="anchor">Content</wa-popover>
            </div>
          `);
          const popover = el.querySelector<WaPopover>('wa-popover')!;

          await expectEvent(popover, ['wa-show', 'wa-after-show'], () => {
            popover.open = true;
          });

          expect(popover.open).to.be.true;
        });

        it('should fire wa-hide and wa-after-hide when closing via open property', async () => {
          const el = await fixture<HTMLDivElement>(html`
            <div>
              <wa-button id="anchor">Anchor</wa-button>
              <wa-popover for="anchor" open>Content</wa-popover>
            </div>
          `);
          const popover = el.querySelector<WaPopover>('wa-popover')!;
          await popover.updateComplete;
          await aTimeout(200);

          await expectEvent(popover, ['wa-hide', 'wa-after-hide'], () => {
            popover.open = false;
          });

          expect(popover.open).to.be.false;
        });

        it('should fire wa-show and wa-after-show when calling show()', async () => {
          const el = await fixture<HTMLDivElement>(html`
            <div>
              <wa-button id="anchor">Anchor</wa-button>
              <wa-popover for="anchor">Content</wa-popover>
            </div>
          `);
          const popover = el.querySelector<WaPopover>('wa-popover')!;

          await expectEvent(popover, ['wa-show', 'wa-after-show'], () => {
            popover.show();
          });

          expect(popover.open).to.be.true;
        });

        it('should fire wa-hide and wa-after-hide when calling hide()', async () => {
          const el = await fixture<HTMLDivElement>(html`
            <div>
              <wa-button id="anchor">Anchor</wa-button>
              <wa-popover for="anchor" open>Content</wa-popover>
            </div>
          `);
          const popover = el.querySelector<WaPopover>('wa-popover')!;
          await popover.updateComplete;
          await aTimeout(200);

          await expectEvent(popover, ['wa-hide', 'wa-after-hide'], () => {
            popover.hide();
          });

          expect(popover.open).to.be.false;
        });

        it('should not fire wa-after-show when wa-show is prevented', async () => {
          const el = await fixture<HTMLDivElement>(html`
            <div>
              <wa-button id="anchor">Anchor</wa-button>
              <wa-popover for="anchor">Content</wa-popover>
            </div>
          `);
          const popover = el.querySelector<WaPopover>('wa-popover')!;
          const afterShowSpy = sinon.spy();

          popover.addEventListener('wa-show', event => event.preventDefault());
          popover.addEventListener('wa-after-show', afterShowSpy);

          popover.open = true;
          await aTimeout(200);

          expect(afterShowSpy.callCount).to.equal(0);
          expect(popover.open).to.be.false;
        });

        it('should not fire wa-after-hide when wa-hide is prevented', async () => {
          const el = await fixture<HTMLDivElement>(html`
            <div>
              <wa-button id="anchor">Anchor</wa-button>
              <wa-popover for="anchor" open>Content</wa-popover>
            </div>
          `);
          const popover = el.querySelector<WaPopover>('wa-popover')!;
          await popover.updateComplete;
          await aTimeout(200);

          const afterHideSpy = sinon.spy();
          popover.addEventListener('wa-hide', event => event.preventDefault());
          popover.addEventListener('wa-after-hide', afterHideSpy);

          popover.open = false;
          await aTimeout(200);

          expect(afterHideSpy.callCount).to.equal(0);
          expect(popover.open).to.be.true;
        });
      });

      describe('slots', () => {
        it('should accept content in the default slot', async () => {
          const el = await fixture<HTMLDivElement>(html`
            <div>
              <wa-button id="anchor">Anchor</wa-button>
              <wa-popover for="anchor">
                <p>Hello world</p>
              </wa-popover>
            </div>
          `);
          const popover = el.querySelector<WaPopover>('wa-popover')!;
          const content = popover.querySelector('p');
          expect(content).to.exist;
          expect(content!.textContent).to.equal('Hello world');
        });
      });

      describe('keyboard navigation', () => {
        it('should close on Escape', async () => {
          const el = await fixture<HTMLDivElement>(html`
            <div>
              <wa-button id="anchor">Anchor</wa-button>
              <wa-popover for="anchor">Content</wa-popover>
            </div>
          `);
          const popover = el.querySelector<WaPopover>('wa-popover')!;

          popover.open = true;
          await waitUntil(() => popover.open);
          await aTimeout(200);

          await sendKeys({ press: 'Escape' });
          await waitUntil(() => !popover.open);

          expect(popover.open).to.be.false;
        });
      });

      describe('CSS parts and states', () => {
        it('should expose the dialog CSS part', async () => {
          const el = await fixture<HTMLDivElement>(html`
            <div>
              <wa-button id="anchor">Anchor</wa-button>
              <wa-popover for="anchor">Content</wa-popover>
            </div>
          `);
          const popover = el.querySelector<WaPopover>('wa-popover')!;
          const dialog = popover.shadowRoot!.querySelector('[part~="dialog"]');
          expect(dialog).to.exist;
        });

        it('should expose the body CSS part', async () => {
          const el = await fixture<HTMLDivElement>(html`
            <div>
              <wa-button id="anchor">Anchor</wa-button>
              <wa-popover for="anchor">Content</wa-popover>
            </div>
          `);
          const popover = el.querySelector<WaPopover>('wa-popover')!;
          const body = popover.shadowRoot!.querySelector('[part~="body"]');
          expect(body).to.exist;
        });

        it('should expose the popup CSS part', async () => {
          const el = await fixture<HTMLDivElement>(html`
            <div>
              <wa-button id="anchor">Anchor</wa-button>
              <wa-popover for="anchor">Content</wa-popover>
            </div>
          `);
          const popover = el.querySelector<WaPopover>('wa-popover')!;
          const popup = popover.shadowRoot!.querySelector('[part~="popup"]');
          expect(popup).to.exist;
        });
      });
    });
  }

  describe('trigger interaction', () => {
    it('should toggle open when the anchor is clicked', async () => {
      const el = await fixtures[0]<HTMLDivElement>(html`
        <div>
          <wa-button id="anchor">Anchor</wa-button>
          <wa-popover for="anchor">Content</wa-popover>
        </div>
      `);
      const popover = el.querySelector<WaPopover>('wa-popover')!;
      const anchor = el.querySelector<HTMLElement>('#anchor')!;

      await clickOnElement(anchor);
      await waitUntil(() => popover.open);
      expect(popover.open).to.be.true;

      await aTimeout(200);

      await clickOnElement(anchor);
      await waitUntil(() => !popover.open);
      expect(popover.open).to.be.false;
    });

    it('should close when clicking outside', async () => {
      const el = await fixtures[0]<HTMLDivElement>(html`
        <div style="padding: 200px;">
          <wa-button id="anchor">Anchor</wa-button>
          <wa-popover for="anchor">Content</wa-popover>
        </div>
      `);
      const popover = el.querySelector<WaPopover>('wa-popover')!;

      popover.open = true;
      await waitUntil(() => popover.open);
      await aTimeout(200);

      // Click outside the popover
      await clickOnElement(el, 'top');
      await waitUntil(() => !popover.open);

      expect(popover.open).to.be.false;
    });

    it('should close when a data-popover="close" button is clicked', async () => {
      const el = await fixtures[0]<HTMLDivElement>(html`
        <div>
          <wa-button id="anchor">Anchor</wa-button>
          <wa-popover for="anchor">
            <button data-popover="close">Close me</button>
          </wa-popover>
        </div>
      `);
      const popover = el.querySelector<WaPopover>('wa-popover')!;

      popover.open = true;
      await waitUntil(() => popover.open);
      await aTimeout(200);

      const closeButton = popover.querySelector<HTMLElement>('[data-popover="close"]')!;
      await clickOnElement(closeButton);
      await waitUntil(() => !popover.open);

      expect(popover.open).to.be.false;
    });
  });

  describe('dismissible stack', () => {
    it('should only close the dropdown when pressing Escape on a popover with a dropdown inside', async () => {
      const el = await fixtures[0]<HTMLDivElement>(html`
        <div>
          <wa-button id="popover-anchor">Open Popover</wa-button>
          <wa-popover id="test-popover" for="popover-anchor">
            <div style="padding: 1rem;">
              <wa-dropdown id="test-dropdown">
                <wa-button slot="trigger" caret>Open Dropdown</wa-button>
                <wa-dropdown-item>Item 1</wa-dropdown-item>
              </wa-dropdown>
            </div>
          </wa-popover>
        </div>
      `);

      const popover = el.querySelector<WaPopover>('#test-popover')!;
      const dropdown = el.querySelector<any>('#test-dropdown')!;

      popover.open = true;
      await waitUntil(() => popover.open);
      await aTimeout(200);

      dropdown.open = true;
      await waitUntil(() => dropdown.open);
      await aTimeout(200);

      await sendKeys({ press: 'Escape' });
      await aTimeout(200);

      expect(dropdown.open).to.be.false;
      expect(popover.open).to.be.true;
    });

    it('should only close the tooltip when pressing Escape on a popover with a tooltip inside', async () => {
      const el = await fixtures[0]<HTMLDivElement>(html`
        <div>
          <wa-button id="popover-anchor">Open Popover</wa-button>
          <wa-popover id="test-popover" for="popover-anchor">
            <div style="padding: 1rem;">
              <wa-button id="tooltip-anchor">Hover me</wa-button>
              <wa-tooltip id="test-tooltip" for="tooltip-anchor" trigger="click">Tooltip content</wa-tooltip>
            </div>
          </wa-popover>
        </div>
      `);

      const popover = el.querySelector<WaPopover>('#test-popover')!;
      const tooltip = el.querySelector<any>('#test-tooltip')!;

      popover.open = true;
      await waitUntil(() => popover.open);
      await aTimeout(200);

      tooltip.open = true;
      await waitUntil(() => tooltip.open);
      await aTimeout(200);

      await sendKeys({ press: 'Escape' });
      await aTimeout(200);

      expect(tooltip.open).to.be.false;
      expect(popover.open).to.be.true;
    });
  });
});
