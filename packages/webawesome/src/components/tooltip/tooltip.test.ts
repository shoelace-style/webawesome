import { aTimeout, expect, waitUntil } from '@open-wc/testing';
import { sendKeys, sendMouse } from '@web/test-runner-commands';
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

    it('should remain open when the pointer moves onto content forwarded through a parent slot', async () => {
      const el = await fixtures[0]<HTMLDivElement>(html`<div></div>`);
      const shadowRoot = el.attachShadow({ mode: 'open' });
      shadowRoot.innerHTML = `
        <wa-button id="forwarded-hover-btn">Hover me</wa-button>
        <wa-tooltip for="forwarded-hover-btn" trigger="hover" show-delay="0" hide-delay="0">
          <slot name="content"></slot>
        </wa-tooltip>
      `;

      const childLink = document.createElement('a');
      childLink.id = 'forwarded-tooltip-link';
      childLink.slot = 'content';
      childLink.href = '#';
      childLink.textContent = 'Forwarded link inside the tooltip';
      childLink.style.cssText = 'display: inline-block; padding: 1rem;';
      el.append(childLink);

      const tooltip = shadowRoot.querySelector<WaTooltip>('wa-tooltip')!;
      const anchor = shadowRoot.querySelector<HTMLElement>('#forwarded-hover-btn')!;
      expect(childLink.assignedSlot?.parentElement).to.equal(tooltip);
      await tooltip.updateComplete;

      await moveMouseOnElement(anchor);
      await waitUntil(() => tooltip.open);
      expect(tooltip.open).to.be.true;

      await moveMouseOnElement(childLink);
      await aTimeout(tooltip.hideDelay + 50);

      expect(tooltip.open).to.be.true;

      await moveMouseOnElement(document.body, 'top', 0, 0);
      await waitUntil(() => !tooltip.open);
      expect(tooltip.open).to.be.false;
    });
  });

  describe('light dismiss', () => {
    it('should hide when the anchor is clicked and stay hidden until the pointer leaves and re-enters', async () => {
      const el = await fixtures[0]<HTMLDivElement>(html`
        <div>
          <wa-button id="ld-btn">Hover me</wa-button>
          <wa-tooltip for="ld-btn" trigger="hover" show-delay="0" hide-delay="0">Tooltip</wa-tooltip>
        </div>
      `);
      const tooltip = el.querySelector<WaTooltip>('wa-tooltip')!;
      const anchor = el.querySelector<HTMLElement>('#ld-btn')!;

      await moveMouseOnElement(anchor);
      await waitUntil(() => tooltip.open);

      await clickOnElement(anchor);
      await waitUntil(() => !tooltip.open);

      // Simulate the pointer moving within the anchor. The tooltip must not reopen until it leaves.
      anchor.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
      await aTimeout(100);
      expect(tooltip.open).to.be.false;

      // Leaving and re-entering re-arms hover
      await moveMouseOnElement(document.body, 'top', 0, 0);
      await aTimeout(50);
      await moveMouseOnElement(anchor);
      await waitUntil(() => tooltip.open);
      expect(tooltip.open).to.be.true;
    });

    it('should cancel a pending show when the anchor is clicked before the show delay elapses', async () => {
      const el = await fixtures[0]<HTMLDivElement>(html`
        <div>
          <wa-button id="ld-delay-btn">Hover me</wa-button>
          <wa-tooltip for="ld-delay-btn" trigger="hover" show-delay="300">Tooltip</wa-tooltip>
        </div>
      `);
      const tooltip = el.querySelector<WaTooltip>('wa-tooltip')!;
      const anchor = el.querySelector<HTMLElement>('#ld-delay-btn')!;

      await moveMouseOnElement(anchor);
      await clickOnElement(anchor);
      await aTimeout(500);

      expect(tooltip.open).to.be.false;
    });

    it('should not show a focus-triggered tooltip when the anchor is clicked with the mouse', async () => {
      const el = await fixtures[0]<HTMLDivElement>(html`
        <div>
          <wa-button id="ld-focus-btn">Click me</wa-button>
          <wa-tooltip for="ld-focus-btn" trigger="focus">Tooltip</wa-tooltip>
        </div>
      `);
      const tooltip = el.querySelector<WaTooltip>('wa-tooltip')!;
      const anchor = el.querySelector<HTMLElement>('#ld-focus-btn')!;

      await clickOnElement(anchor);
      await aTimeout(150);

      expect(tooltip.open).to.be.false;
    });

    it('should hide when the tooltip itself is clicked', async () => {
      const el = await fixtures[0]<HTMLDivElement>(html`
        <div>
          <wa-button id="ld-body-btn">Hover me</wa-button>
          <wa-tooltip for="ld-body-btn" trigger="hover" show-delay="0" hide-delay="0">
            <span id="ld-tooltip-content" style="display: inline-block; padding: 1rem;">Tooltip content</span>
          </wa-tooltip>
        </div>
      `);
      const tooltip = el.querySelector<WaTooltip>('wa-tooltip')!;
      const anchor = el.querySelector<HTMLElement>('#ld-body-btn')!;
      const content = el.querySelector<HTMLElement>('#ld-tooltip-content')!;

      await moveMouseOnElement(anchor);
      await waitUntil(() => tooltip.open);

      await clickOnElement(content);
      await waitUntil(() => !tooltip.open);

      expect(tooltip.open).to.be.false;
    });

    it('should hide a click-triggered tooltip when clicking outside', async () => {
      const el = await fixtures[0]<HTMLDivElement>(html`
        <div>
          <wa-button id="ld-outside-btn">Click me</wa-button>
          <wa-tooltip for="ld-outside-btn" trigger="click">Tooltip</wa-tooltip>
        </div>
      `);
      const tooltip = el.querySelector<WaTooltip>('wa-tooltip')!;
      const anchor = el.querySelector<HTMLElement>('#ld-outside-btn')!;

      await clickOnElement(anchor);
      await waitUntil(() => tooltip.open);

      await sendMouse({ type: 'click', position: [window.innerWidth - 10, window.innerHeight - 10] });
      await waitUntil(() => !tooltip.open);

      expect(tooltip.open).to.be.false;
    });

    it('should not light dismiss a manual tooltip when clicking outside', async () => {
      const el = await fixtures[0]<HTMLDivElement>(html`
        <div>
          <wa-button id="ld-manual-btn">Manual</wa-button>
          <wa-tooltip for="ld-manual-btn" trigger="manual">Tooltip</wa-tooltip>
        </div>
      `);
      const tooltip = el.querySelector<WaTooltip>('wa-tooltip')!;

      tooltip.open = true;
      await waitUntil(() => tooltip.open);
      await aTimeout(200);

      await sendMouse({ type: 'click', position: [window.innerWidth - 10, window.innerHeight - 10] });
      await aTimeout(200);

      expect(tooltip.open).to.be.true;
    });

    it('should re-arm when the tooltip is detached and reattached after a light dismiss', async () => {
      const el = await fixtures[0]<HTMLDivElement>(html`
        <div>
          <wa-button id="ld-reattach-btn">Hover me</wa-button>
          <wa-tooltip for="ld-reattach-btn" trigger="hover" show-delay="0" hide-delay="0">Tooltip</wa-tooltip>
        </div>
      `);
      const tooltip = el.querySelector<WaTooltip>('wa-tooltip')!;
      const anchor = el.querySelector<HTMLElement>('#ld-reattach-btn')!;

      await moveMouseOnElement(anchor);
      await waitUntil(() => tooltip.open);
      await clickOnElement(anchor);
      await waitUntil(() => !tooltip.open);

      // Detach and reattach while the pointer is still over the anchor, so no mouseout fires
      tooltip.remove();
      el.appendChild(tooltip);
      await tooltip.updateComplete;

      anchor.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
      await waitUntil(() => tooltip.open);
      expect(tooltip.open).to.be.true;
    });

    it('should re-arm when the anchor changes after a light dismiss', async () => {
      const el = await fixtures[0]<HTMLDivElement>(html`
        <div>
          <wa-button id="ld-first-btn">First</wa-button>
          <wa-button id="ld-second-btn">Second</wa-button>
          <wa-tooltip for="ld-first-btn" trigger="hover" show-delay="0" hide-delay="0">Tooltip</wa-tooltip>
        </div>
      `);
      const tooltip = el.querySelector<WaTooltip>('wa-tooltip')!;
      const firstAnchor = el.querySelector<HTMLElement>('#ld-first-btn')!;
      const secondAnchor = el.querySelector<HTMLElement>('#ld-second-btn')!;

      await moveMouseOnElement(firstAnchor);
      await waitUntil(() => tooltip.open);
      await clickOnElement(firstAnchor);
      await waitUntil(() => !tooltip.open);

      tooltip.for = 'ld-second-btn';
      await tooltip.updateComplete;

      secondAnchor.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
      await waitUntil(() => tooltip.open);
      expect(tooltip.open).to.be.true;
    });

    it('should remain open when wa-hide is prevented', async () => {
      const el = await fixtures[0]<HTMLDivElement>(html`
        <div>
          <wa-button id="ld-prevent-btn">Hover me</wa-button>
          <wa-tooltip for="ld-prevent-btn" open>Tooltip</wa-tooltip>
        </div>
      `);
      const tooltip = el.querySelector<WaTooltip>('wa-tooltip')!;
      await tooltip.updateComplete;

      tooltip.addEventListener('wa-hide', event => event.preventDefault(), { once: true });
      tooltip.open = false;
      await aTimeout(200);

      expect(tooltip.open).to.be.true;

      const body = tooltip.shadowRoot!.querySelector<HTMLElement>('[part~="body"]')!;
      expect(body.hidden).to.be.false;
    });
  });

  describe('keyboard navigation', () => {
    it('should not close a manual tooltip on Escape', async () => {
      const el = await fixtures[0]<HTMLDivElement>(html`
        <div>
          <wa-button id="esc-manual-btn">Manual</wa-button>
          <wa-tooltip for="esc-manual-btn" trigger="manual">Tooltip content</wa-tooltip>
        </div>
      `);
      const tooltip = el.querySelector<WaTooltip>('wa-tooltip')!;

      tooltip.open = true;
      await waitUntil(() => tooltip.open);
      await aTimeout(200);

      await sendKeys({ press: 'Escape' });
      await aTimeout(200);

      expect(tooltip.open).to.be.true;
    });

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
