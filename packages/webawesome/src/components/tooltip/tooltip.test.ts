import { aTimeout, expect, waitUntil } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit';
import sinon from 'sinon';
import { expectEvent } from '../../internal/test/expect-event.js';
import { fixtures } from '../../internal/test/fixture.js';
import { clickOnElement, moveMouseOnElement } from '../../internal/test/pointer-utilities.js';
import type WaTooltip from './tooltip.js';

describe('<wa-tooltip>', () => {
  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      describe('accessibility', () => {
        it('should add aria-labelledby to the anchor element', async () => {
          const el = await fixture<HTMLDivElement>(html`
            <div>
              <wa-button id="my-button">Hover Me</wa-button>
              <wa-tooltip for="my-button">This is a tooltip</wa-tooltip>
            </div>
          `);
          const tooltip = el.querySelector<WaTooltip>('wa-tooltip')!;
          const anchor = el.querySelector<HTMLElement>('#my-button')!;
          await tooltip.updateComplete;

          const labelledBy = anchor.getAttribute('aria-labelledby');
          expect(labelledBy).to.include(tooltip.id);
        });
      });

      describe('properties', () => {
        it('should render a component', async () => {
          const el = await fixture(html`
            <div>
              <wa-button id="btn">Hover</wa-button>
              <wa-tooltip for="btn">Tooltip</wa-tooltip>
            </div>
          `);
          expect(el.querySelector('wa-tooltip')).to.exist;
        });

        it('should be visible with the open attribute', async () => {
          const el = await fixture<HTMLDivElement>(html`
            <div>
              <wa-tooltip open for="wa-button">This is a tooltip</wa-tooltip>
              <wa-button id="wa-button">Hover Me</wa-button>
            </div>
          `);
          const tooltip = el.querySelector<WaTooltip>('wa-tooltip')!;
          const body = tooltip.shadowRoot!.querySelector<HTMLElement>('[part~="body"]')!;
          expect(body.hidden).to.be.false;
        });

        it('should not be visible without the open attribute', async () => {
          const el = await fixture<HTMLDivElement>(html`
            <div>
              <wa-tooltip for="wa-button">This is a tooltip</wa-tooltip>
              <wa-button id="wa-button">Hover Me</wa-button>
            </div>
          `);
          const tooltip = el.querySelector<WaTooltip>('wa-tooltip')!;
          const body = tooltip.shadowRoot!.querySelector<HTMLElement>('[part~="body"]')!;
          expect(body.hidden).to.be.true;
        });

        it('should default placement to top', async () => {
          const el = await fixture<HTMLDivElement>(html`
            <div>
              <wa-button id="btn">Hover</wa-button>
              <wa-tooltip for="btn">Tooltip</wa-tooltip>
            </div>
          `);
          const tooltip = el.querySelector<WaTooltip>('wa-tooltip')!;
          expect(tooltip.placement).to.equal('top');
        });

        it('should accept a custom placement', async () => {
          const el = await fixture<HTMLDivElement>(html`
            <div>
              <wa-button id="btn">Hover</wa-button>
              <wa-tooltip for="btn" placement="bottom-end">Tooltip</wa-tooltip>
            </div>
          `);
          const tooltip = el.querySelector<WaTooltip>('wa-tooltip')!;
          expect(tooltip.placement).to.equal('bottom-end');
        });

        it('should default distance to 8', async () => {
          const el = await fixture<HTMLDivElement>(html`
            <div>
              <wa-button id="btn">Hover</wa-button>
              <wa-tooltip for="btn">Tooltip</wa-tooltip>
            </div>
          `);
          const tooltip = el.querySelector<WaTooltip>('wa-tooltip')!;
          expect(tooltip.distance).to.equal(8);
        });

        it('should accept a custom distance', async () => {
          const el = await fixture<HTMLDivElement>(html`
            <div>
              <wa-button id="btn">Hover</wa-button>
              <wa-tooltip for="btn" distance="20">Tooltip</wa-tooltip>
            </div>
          `);
          const tooltip = el.querySelector<WaTooltip>('wa-tooltip')!;
          expect(tooltip.distance).to.equal(20);
        });

        it('should accept skidding property', async () => {
          const el = await fixture<HTMLDivElement>(html`
            <div>
              <wa-button id="btn">Hover</wa-button>
              <wa-tooltip for="btn" skidding="10">Tooltip</wa-tooltip>
            </div>
          `);
          const tooltip = el.querySelector<WaTooltip>('wa-tooltip')!;
          expect(tooltip.skidding).to.equal(10);
        });

        it('should default disabled to false', async () => {
          const el = await fixture<HTMLDivElement>(html`
            <div>
              <wa-button id="btn">Hover</wa-button>
              <wa-tooltip for="btn">Tooltip</wa-tooltip>
            </div>
          `);
          const tooltip = el.querySelector<WaTooltip>('wa-tooltip')!;
          expect(tooltip.disabled).to.be.false;
        });

        it('should accept the disabled property', async () => {
          const el = await fixture<HTMLDivElement>(html`
            <div>
              <wa-button id="btn">Hover</wa-button>
              <wa-tooltip for="btn" disabled>Tooltip</wa-tooltip>
            </div>
          `);
          const tooltip = el.querySelector<WaTooltip>('wa-tooltip')!;
          expect(tooltip.disabled).to.be.true;
        });

        it('should default trigger to "hover focus"', async () => {
          const el = await fixture<HTMLDivElement>(html`
            <div>
              <wa-button id="btn">Hover</wa-button>
              <wa-tooltip for="btn">Tooltip</wa-tooltip>
            </div>
          `);
          const tooltip = el.querySelector<WaTooltip>('wa-tooltip')!;
          expect(tooltip.trigger).to.equal('hover focus');
        });

        it('should accept a custom trigger', async () => {
          const el = await fixture<HTMLDivElement>(html`
            <div>
              <wa-button id="btn">Click</wa-button>
              <wa-tooltip for="btn" trigger="click">Tooltip</wa-tooltip>
            </div>
          `);
          const tooltip = el.querySelector<WaTooltip>('wa-tooltip')!;
          expect(tooltip.trigger).to.equal('click');
        });

        it('should accept the without-arrow property', async () => {
          const el = await fixture<HTMLDivElement>(html`
            <div>
              <wa-button id="btn">Hover</wa-button>
              <wa-tooltip for="btn" without-arrow>Tooltip</wa-tooltip>
            </div>
          `);
          const tooltip = el.querySelector<WaTooltip>('wa-tooltip')!;
          expect(tooltip.withoutArrow).to.be.true;
        });

        it('should show when open initially', async () => {
          const el = await fixture<HTMLDivElement>(html`
            <div>
              <wa-tooltip for="wa-button" open>This is a tooltip</wa-tooltip>
              <wa-button id="wa-button">Hover Me</wa-button>
            </div>
          `);
          const tooltip = el.querySelector<WaTooltip>('wa-tooltip')!;
          const body = tooltip.shadowRoot!.querySelector<HTMLElement>('[part~="body"]')!;
          await tooltip.updateComplete;
          expect(body.hidden).to.be.false;
        });
      });

      describe('events', () => {
        it('should emit wa-show and wa-after-show when calling show()', async () => {
          const el = await fixture<HTMLDivElement>(html`
            <div>
              <wa-tooltip for="wa-button">This is a tooltip</wa-tooltip>
              <wa-button id="wa-button">Hover Me</wa-button>
            </div>
          `);
          const tooltip = el.querySelector<WaTooltip>('wa-tooltip')!;

          await expectEvent(tooltip, ['wa-show', 'wa-after-show'], () => {
            tooltip.show();
          });

          const body = tooltip.shadowRoot!.querySelector<HTMLElement>('[part~="body"]')!;
          expect(body.hidden).to.be.false;
        });

        it('should emit wa-hide and wa-after-hide when calling hide()', async () => {
          const el = await fixture<HTMLDivElement>(html`
            <div>
              <wa-tooltip for="wa-button" open>This is a tooltip</wa-tooltip>
              <wa-button id="wa-button">Hover Me</wa-button>
            </div>
          `);
          const tooltip = el.querySelector<WaTooltip>('wa-tooltip')!;
          await tooltip.updateComplete;

          await expectEvent(tooltip, ['wa-hide', 'wa-after-hide'], () => {
            tooltip.hide();
          });

          const body = tooltip.shadowRoot!.querySelector<HTMLElement>('[part~="body"]')!;
          expect(body.hidden).to.be.true;
        });

        it('should emit wa-show and wa-after-show when setting open = true', async () => {
          const el = await fixture<HTMLDivElement>(html`
            <div>
              <wa-tooltip for="wa-button">This is a tooltip</wa-tooltip>
              <wa-button id="wa-button">Hover Me</wa-button>
            </div>
          `);
          const tooltip = el.querySelector<WaTooltip>('wa-tooltip')!;

          await expectEvent(tooltip, ['wa-show', 'wa-after-show'], () => {
            tooltip.open = true;
          });

          const body = tooltip.shadowRoot!.querySelector<HTMLElement>('[part~="body"]')!;
          expect(body.hidden).to.be.false;
        });

        it('should emit wa-hide and wa-after-hide when setting open = false', async () => {
          const el = await fixture<HTMLDivElement>(html`
            <div>
              <wa-tooltip for="wa-button" open>This is a tooltip</wa-tooltip>
              <wa-button id="wa-button">Hover Me</wa-button>
            </div>
          `);
          const tooltip = el.querySelector<WaTooltip>('wa-tooltip')!;
          await tooltip.updateComplete;

          await expectEvent(tooltip, ['wa-hide', 'wa-after-hide'], () => {
            tooltip.open = false;
          });

          const body = tooltip.shadowRoot!.querySelector<HTMLElement>('[part~="body"]')!;
          expect(body.hidden).to.be.true;
        });

        it('should not fire wa-after-show when wa-show is prevented', async () => {
          const el = await fixture<HTMLDivElement>(html`
            <div>
              <wa-tooltip for="wa-button">This is a tooltip</wa-tooltip>
              <wa-button id="wa-button">Hover Me</wa-button>
            </div>
          `);
          const tooltip = el.querySelector<WaTooltip>('wa-tooltip')!;
          const afterShowSpy = sinon.spy();

          tooltip.addEventListener('wa-show', event => event.preventDefault());
          tooltip.addEventListener('wa-after-show', afterShowSpy);

          tooltip.open = true;
          await aTimeout(200);

          expect(afterShowSpy.callCount).to.equal(0);
          expect(tooltip.open).to.be.false;
        });
      });

      describe('disabled behavior', () => {
        it('should hide the tooltip when it becomes disabled while open', async () => {
          const el = await fixture<HTMLDivElement>(html`
            <div>
              <wa-tooltip for="wa-button" open>This is a tooltip</wa-tooltip>
              <wa-button id="wa-button">Hover Me</wa-button>
            </div>
          `);
          const tooltip = el.querySelector<WaTooltip>('wa-tooltip')!;
          await tooltip.updateComplete;

          const hideHandler = sinon.spy();
          const afterHideHandler = sinon.spy();
          tooltip.addEventListener('wa-hide', hideHandler);
          tooltip.addEventListener('wa-after-hide', afterHideHandler);

          tooltip.disabled = true;

          await waitUntil(() => hideHandler.calledOnce);
          await waitUntil(() => afterHideHandler.calledOnce);

          expect(hideHandler).to.have.been.calledOnce;
          expect(afterHideHandler).to.have.been.calledOnce;

          const body = tooltip.shadowRoot!.querySelector<HTMLElement>('[part~="body"]')!;
          expect(body.hidden).to.be.true;
        });

        it('should not show when disabled and open is set to true', async () => {
          const el = await fixture<HTMLDivElement>(html`
            <div>
              <wa-tooltip for="wa-button" disabled>This is a tooltip</wa-tooltip>
              <wa-button id="wa-button">Hover Me</wa-button>
            </div>
          `);
          const tooltip = el.querySelector<WaTooltip>('wa-tooltip')!;

          tooltip.open = true;
          await aTimeout(200);

          const body = tooltip.shadowRoot!.querySelector<HTMLElement>('[part~="body"]')!;
          expect(body.hidden).to.be.true;
        });
      });

      describe('slots', () => {
        it('should accept content in the default slot', async () => {
          const el = await fixture<HTMLDivElement>(html`
            <div>
              <wa-button id="btn">Hover</wa-button>
              <wa-tooltip for="btn">
                <strong>Bold tooltip</strong>
              </wa-tooltip>
            </div>
          `);
          const tooltip = el.querySelector<WaTooltip>('wa-tooltip')!;
          const content = tooltip.querySelector('strong');
          expect(content).to.exist;
          expect(content!.textContent).to.equal('Bold tooltip');
        });
      });

      describe('CSS parts and states', () => {
        it('should expose the base CSS part', async () => {
          const el = await fixture<HTMLDivElement>(html`
            <div>
              <wa-button id="btn">Hover</wa-button>
              <wa-tooltip for="btn">Tooltip</wa-tooltip>
            </div>
          `);
          const tooltip = el.querySelector<WaTooltip>('wa-tooltip')!;
          const base = tooltip.shadowRoot!.querySelector('[part~="base"]');
          expect(base).to.exist;
        });

        it('should expose the body CSS part', async () => {
          const el = await fixture<HTMLDivElement>(html`
            <div>
              <wa-button id="btn">Hover</wa-button>
              <wa-tooltip for="btn">Tooltip</wa-tooltip>
            </div>
          `);
          const tooltip = el.querySelector<WaTooltip>('wa-tooltip')!;
          const body = tooltip.shadowRoot!.querySelector('[part~="body"]');
          expect(body).to.exist;
        });

        it('should not accept user selection on the tooltip body', async () => {
          const el = await fixture<HTMLDivElement>(html`
            <div>
              <wa-tooltip for="wa-button" open>This is a tooltip</wa-tooltip>
              <wa-button id="wa-button">Hover Me</wa-button>
            </div>
          `);
          const tooltip = el.querySelector<WaTooltip>('wa-tooltip')!;
          const tooltipBody = tooltip.shadowRoot!.querySelector('.body')!;
          const userSelect =
            getComputedStyle(tooltipBody).userSelect || (getComputedStyle(tooltipBody) as any).webkitUserSelect;
          expect(userSelect).to.equal('none');
        });
      });
    });
  }

  describe('trigger interactions', () => {
    it('should show on click when trigger is "click"', async () => {
      const el = await fixtures[0]<HTMLDivElement>(html`
        <div>
          <wa-button id="click-btn">Click me</wa-button>
          <wa-tooltip for="click-btn" trigger="click">Click tooltip</wa-tooltip>
        </div>
      `);
      const tooltip = el.querySelector<WaTooltip>('wa-tooltip')!;
      const anchor = el.querySelector<HTMLElement>('#click-btn')!;

      await clickOnElement(anchor);
      await waitUntil(() => tooltip.open);

      expect(tooltip.open).to.be.true;

      // Click again to close
      await clickOnElement(anchor);
      await waitUntil(() => !tooltip.open);

      expect(tooltip.open).to.be.false;
    });

    it('should show on focus when trigger includes "focus"', async () => {
      const el = await fixtures[0]<HTMLDivElement>(html`
        <div>
          <wa-button id="focus-btn">Focus me</wa-button>
          <wa-tooltip for="focus-btn" trigger="focus" show-delay="0">Focus tooltip</wa-tooltip>
        </div>
      `);
      const tooltip = el.querySelector<WaTooltip>('wa-tooltip')!;
      const anchor = el.querySelector<HTMLElement>('#focus-btn')!;

      anchor.focus();
      await waitUntil(() => tooltip.open);

      expect(tooltip.open).to.be.true;
    });

    it('should not show when trigger is "manual"', async () => {
      const el = await fixtures[0]<HTMLDivElement>(html`
        <div>
          <wa-button id="manual-btn">Manual</wa-button>
          <wa-tooltip for="manual-btn" trigger="manual">Manual tooltip</wa-tooltip>
        </div>
      `);
      const tooltip = el.querySelector<WaTooltip>('wa-tooltip')!;
      const anchor = el.querySelector<HTMLElement>('#manual-btn')!;

      await clickOnElement(anchor);
      await aTimeout(200);

      expect(tooltip.open).to.be.false;

      // Should only open programmatically
      tooltip.open = true;
      await waitUntil(() => tooltip.open);
      expect(tooltip.open).to.be.true;
    });

    it('should remain open when the pointer moves onto a slotted child element of the tooltip', async () => {
      const el = await fixtures[0]<HTMLDivElement>(html`
        <div>
          <wa-button id="hover-child-btn">Hover me</wa-button>
          <wa-tooltip for="hover-child-btn" trigger="hover" show-delay="0" hide-delay="0">
            <a href="#" id="tooltip-link" style="display: inline-block; padding: 1rem;">A link inside the tooltip</a>
          </wa-tooltip>
        </div>
      `);
      const tooltip = el.querySelector<WaTooltip>('wa-tooltip')!;
      const anchor = el.querySelector<HTMLElement>('#hover-child-btn')!;
      const childLink = el.querySelector<HTMLElement>('#tooltip-link')!;

      // Open the tooltip by hovering its anchor, so a real pointer is positioned over the trigger.
      await moveMouseOnElement(anchor);
      await waitUntil(() => tooltip.open);
      expect(tooltip.open).to.be.true;

      // Move the pointer off the anchor and onto a slotted child element of the tooltip. This generates a real
      // `mouseout` whose `relatedTarget` is the slotted child, which the tooltip should recognize as "still within me"
      // and stay open. (Synthetic MouseEvents can't set relatedTarget, so a real pointer move is required to exercise
      // the fix.)
      await moveMouseOnElement(childLink);
      await aTimeout(tooltip.hideDelay + 50);

      expect(tooltip.open).to.be.true;

      // Move the pointer fully away and confirm it now hides, proving the test isn't a false positive.
      await moveMouseOnElement(document.body, 'top', 0, 0);
      await waitUntil(() => !tooltip.open);
      expect(tooltip.open).to.be.false;
    });
  });

  describe('keyboard navigation', () => {
    it('should close on Escape when open', async () => {
      const el = await fixtures[0]<HTMLDivElement>(html`
        <div>
          <wa-button id="esc-btn">Button</wa-button>
          <wa-tooltip for="esc-btn" trigger="click">Tooltip content</wa-tooltip>
        </div>
      `);
      const tooltip = el.querySelector<WaTooltip>('wa-tooltip')!;

      tooltip.open = true;
      await waitUntil(() => tooltip.open);
      await aTimeout(200);

      await sendKeys({ press: 'Escape' });
      await waitUntil(() => !tooltip.open);

      expect(tooltip.open).to.be.false;
    });
  });

  describe('dismissible stack', () => {
    it('should only close the tooltip when pressing Escape with a popover open underneath', async () => {
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

      const popover = el.querySelector<any>('#test-popover')!;
      const tooltip = el.querySelector<WaTooltip>('#test-tooltip')!;

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
