import { expect, waitUntil } from '@open-wc/testing';
import { html } from 'lit';
import sinon from 'sinon';
import { sendKeys } from '@web/test-runner-commands';
import { fixtures } from '../../internal/test/fixture.js';
import { expectEvent } from '../../internal/test/expect-event.js';
import { clickOnElement } from '../../internal/test/pointer-utilities.js';
import type WaDetails from './details.js';

describe('<wa-details>', () => {
  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      describe('accessibility', () => {
        it('should be accessible when closed', async () => {
          const el = await fixture<WaDetails>(html`<wa-details summary="Test">Test text</wa-details>`);
          await expect(el).to.be.accessible();
        });

        it('should be accessible when open', async () => {
          const el = await fixture<WaDetails>(html`<wa-details open summary="Test">Test text</wa-details>`);
          await expect(el).to.be.accessible();
        });

        it('should set aria-expanded to false when closed', async () => {
          const el = await fixture<WaDetails>(html`<wa-details summary="Test">Test text</wa-details>`);
          const header = el.shadowRoot!.querySelector('summary')!;
          expect(header.getAttribute('aria-expanded')).to.equal('false');
        });

        it('should set aria-expanded to true when open', async () => {
          const el = await fixture<WaDetails>(html`<wa-details open summary="Test">Test text</wa-details>`);
          const header = el.shadowRoot!.querySelector('summary')!;
          expect(header.getAttribute('aria-expanded')).to.equal('true');
        });

        it('should set aria-disabled when disabled', async () => {
          const el = await fixture<WaDetails>(html`<wa-details disabled summary="Test">Test text</wa-details>`);
          const header = el.shadowRoot!.querySelector('summary')!;
          expect(header.getAttribute('aria-disabled')).to.equal('true');
        });

        it('should set tabindex to -1 when disabled', async () => {
          const el = await fixture<WaDetails>(html`<wa-details disabled summary="Test">Test text</wa-details>`);
          const header = el.shadowRoot!.querySelector('summary')!;
          expect(header.getAttribute('tabindex')).to.equal('-1');
        });
      });

      describe('properties', () => {
        it('should default open to false', async () => {
          const el = await fixture<WaDetails>(html`<wa-details summary="Test">Content</wa-details>`);
          expect(el.open).to.be.false;
        });

        it('should default disabled to false', async () => {
          const el = await fixture<WaDetails>(html`<wa-details summary="Test">Content</wa-details>`);
          expect(el.disabled).to.be.false;
        });

        it('should default appearance to outlined', async () => {
          const el = await fixture<WaDetails>(html`<wa-details summary="Test">Content</wa-details>`);
          expect(el.appearance).to.equal('outlined');
        });

        it('should default iconPlacement to end', async () => {
          const el = await fixture<WaDetails>(html`<wa-details summary="Test">Content</wa-details>`);
          expect(el.iconPlacement).to.equal('end');
        });

        it('should reflect the open property', async () => {
          const el = await fixture<WaDetails>(html`<wa-details summary="Test">Content</wa-details>`);
          el.open = true;
          await el.updateComplete;
          expect(el.hasAttribute('open')).to.be.true;
        });

        it('should reflect the disabled property', async () => {
          const el = await fixture<WaDetails>(html`<wa-details summary="Test">Content</wa-details>`);
          el.disabled = true;
          await el.updateComplete;
          expect(el.hasAttribute('disabled')).to.be.true;
        });

        it('should reflect the name property', async () => {
          const el = await fixture<WaDetails>(html`<wa-details summary="Test">Content</wa-details>`);
          el.name = 'test';
          await el.updateComplete;
          expect(el.getAttribute('name')).to.equal('test');
        });

        it('should reflect the appearance property', async () => {
          const el = await fixture<WaDetails>(html`<wa-details summary="Test">Content</wa-details>`);
          el.appearance = 'filled';
          await el.updateComplete;
          expect(el.getAttribute('appearance')).to.equal('filled');
        });

        it('should reflect the iconPlacement property', async () => {
          const el = await fixture<WaDetails>(html`<wa-details summary="Test">Content</wa-details>`);
          el.iconPlacement = 'start';
          await el.updateComplete;
          expect(el.getAttribute('icon-placement')).to.equal('start');
        });

        it('should be visible with the open attribute', async () => {
          const el = await fixture<WaDetails>(html`
            <wa-details open>
              This is some content inside the details component for testing purposes.
            </wa-details>
          `);
          const body = el.shadowRoot!.querySelector<HTMLElement>('.body')!;
          expect(parseInt(getComputedStyle(body).height)).to.be.greaterThan(0);
        });

        it('should not be visible without the open attribute', async () => {
          const el = await fixture<WaDetails>(html`
            <wa-details summary="click me">
              This is some content inside the details component for testing purposes.
            </wa-details>
          `);
          const body = el.shadowRoot!.querySelector<HTMLElement>('.body')!;
          expect(parseInt(getComputedStyle(body).height)).to.equal(0);
        });

        it('should not toggle when disabled', async () => {
          const el = await fixture<WaDetails>(html`
            <wa-details summary="Test" disabled>Content</wa-details>
          `);
          await el.show();
          expect(el.open).to.be.false;
        });

        it('should use the summary attribute as the header text', async () => {
          const el = await fixture<WaDetails>(html`<wa-details summary="My Summary">Content</wa-details>`);
          const summarySlot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="summary"]')!;
          expect(summarySlot.textContent).to.contain('My Summary');
        });
      });

      describe('events', () => {
        it('should emit wa-show and wa-after-show when calling show()', async () => {
          const el = await fixture<WaDetails>(html`<wa-details summary="Test">Content</wa-details>`);

          await expectEvent(el, ['wa-show', 'wa-after-show'], () => el.show());
        });

        it('should emit wa-hide and wa-after-hide when calling hide()', async () => {
          const el = await fixture<WaDetails>(html`<wa-details open summary="Test">Content</wa-details>`);

          await expectEvent(el, ['wa-hide', 'wa-after-hide'], () => el.hide());
        });

        it('should emit wa-show and wa-after-show when setting open = true', async () => {
          const el = await fixture<WaDetails>(html`<wa-details summary="Test">Content</wa-details>`);

          await expectEvent(el, ['wa-show', 'wa-after-show'], () => {
            el.open = true;
          });
        });

        it('should emit wa-hide and wa-after-hide when setting open = false', async () => {
          const el = await fixture<WaDetails>(html`<wa-details open summary="Test">Content</wa-details>`);

          await expectEvent(el, ['wa-hide', 'wa-after-hide'], () => {
            el.open = false;
          });
        });

        it('should not open when preventing wa-show', async () => {
          const el = await fixture<WaDetails>(html`<wa-details summary="Test">Content</wa-details>`);
          el.addEventListener('wa-show', (event: Event) => event.preventDefault());

          el.open = true;
          await waitUntil(() => el.open === false);
          expect(el.open).to.be.false;
        });

        it('should not close when preventing wa-hide', async () => {
          const el = await fixture<WaDetails>(html`<wa-details open summary="Test">Content</wa-details>`);
          el.addEventListener('wa-hide', (event: Event) => event.preventDefault());

          el.open = false;
          await waitUntil(() => el.open === true);
          expect(el.open).to.be.true;
        });
      });

      describe('slots', () => {
        it('should render the default slot content', async () => {
          const el = await fixture<WaDetails>(html`<wa-details open summary="Test"><span id="content">Hello</span></wa-details>`);
          const content = el.querySelector('#content');
          expect(content).to.exist;
          expect(content!.textContent).to.equal('Hello');
        });

        it('should render the summary slot', async () => {
          const el = await fixture<WaDetails>(html`
            <wa-details>
              <span slot="summary">Custom Summary</span>
              Content
            </wa-details>
          `);
          const slottedSummary = el.querySelector('[slot="summary"]');
          expect(slottedSummary).to.exist;
          expect(slottedSummary!.textContent).to.equal('Custom Summary');
        });
      });

      describe('keyboard navigation', () => {
        it('should toggle open when pressing Enter on the header', async () => {
          const el = await fixture<WaDetails>(html`<wa-details summary="Test">Content</wa-details>`);
          const header = el.shadowRoot!.querySelector('summary')!;
          header.focus();

          await expectEvent(el, 'wa-show', () => sendKeys({ press: 'Enter' }));
          expect(el.open).to.be.true;
        });

        it('should toggle open when pressing Space on the header', async () => {
          const el = await fixture<WaDetails>(html`<wa-details summary="Test">Content</wa-details>`);
          const header = el.shadowRoot!.querySelector('summary')!;
          header.focus();

          await expectEvent(el, 'wa-show', () => sendKeys({ press: ' ' }));
          expect(el.open).to.be.true;
        });

        it('should close when pressing Enter on an open details', async () => {
          const el = await fixture<WaDetails>(html`<wa-details open summary="Test">Content</wa-details>`);
          const header = el.shadowRoot!.querySelector('summary')!;
          header.focus();

          await expectEvent(el, 'wa-hide', () => sendKeys({ press: 'Enter' }));
          expect(el.open).to.be.false;
        });

        it('should open when pressing ArrowDown', async () => {
          const el = await fixture<WaDetails>(html`<wa-details summary="Test">Content</wa-details>`);
          const header = el.shadowRoot!.querySelector('summary')!;
          header.focus();

          await expectEvent(el, 'wa-show', () => sendKeys({ press: 'ArrowDown' }));
          expect(el.open).to.be.true;
        });

        it('should open when pressing ArrowRight', async () => {
          const el = await fixture<WaDetails>(html`<wa-details summary="Test">Content</wa-details>`);
          const header = el.shadowRoot!.querySelector('summary')!;
          header.focus();

          await expectEvent(el, 'wa-show', () => sendKeys({ press: 'ArrowRight' }));
          expect(el.open).to.be.true;
        });

        it('should close when pressing ArrowUp', async () => {
          const el = await fixture<WaDetails>(html`<wa-details open summary="Test">Content</wa-details>`);
          const header = el.shadowRoot!.querySelector('summary')!;
          header.focus();

          await expectEvent(el, 'wa-hide', () => sendKeys({ press: 'ArrowUp' }));
          expect(el.open).to.be.false;
        });

        it('should close when pressing ArrowLeft', async () => {
          const el = await fixture<WaDetails>(html`<wa-details open summary="Test">Content</wa-details>`);
          const header = el.shadowRoot!.querySelector('summary')!;
          header.focus();

          await expectEvent(el, 'wa-hide', () => sendKeys({ press: 'ArrowLeft' }));
          expect(el.open).to.be.false;
        });

        it('should toggle on click', async () => {
          const el = await fixture<WaDetails>(html`<wa-details summary="Test">Content</wa-details>`);
          const header = el.shadowRoot!.querySelector('summary')!;

          await expectEvent(el, 'wa-show', () => clickOnElement(header));
          expect(el.open).to.be.true;

          await expectEvent(el, 'wa-hide', () => clickOnElement(header));
          expect(el.open).to.be.false;
        });

        it('should not toggle on click when disabled', async () => {
          const el = await fixture<WaDetails>(html`<wa-details summary="Test" disabled>Content</wa-details>`);
          const header = el.shadowRoot!.querySelector('summary')!;

          const showSpy = sinon.spy();
          el.addEventListener('wa-show', showSpy);
          await clickOnElement(header);
          await el.updateComplete;

          expect(showSpy).not.to.have.been.called;
          expect(el.open).to.be.false;
        });
      });

      describe('accordion behavior (name grouping)', () => {
        it('should close other details with the same name when one opens', async () => {
          const container = await fixture<HTMLDivElement>(html`
            <div>
              <wa-details name="group" open summary="First">First content</wa-details>
              <wa-details name="group" summary="Second">Second content</wa-details>
            </div>
          `);
          const first = container.querySelectorAll('wa-details')[0];
          const second = container.querySelectorAll('wa-details')[1];

          expect(first.open).to.be.true;

          second.open = true;
          await waitUntil(() => first.open === false);

          expect(first.open).to.be.false;
          expect(second.open).to.be.true;
        });
      });

      describe('rapid toggling', () => {
        it('should keep body in sync when hiding is interrupted by showing', async () => {
          const el = await fixture<WaDetails>(html`
            <wa-details open summary="Test">Content for testing rapid toggle.</wa-details>
          `);
          const body = el.shadowRoot!.querySelector<HTMLElement>('.body')!;

          el.open = false;
          await new Promise(resolve => setTimeout(resolve, 20));
          el.open = true;

          await new Promise(resolve => setTimeout(resolve, 300));

          expect(el.open).to.be.true;
          expect(body.style.height).to.equal('auto');
        });

        it('should keep body in sync when showing is interrupted by hiding', async () => {
          const el = await fixture<WaDetails>(html`
            <wa-details summary="Test">Content for testing rapid toggle.</wa-details>
          `);
          const body = el.shadowRoot!.querySelector<HTMLElement>('.body')!;

          el.open = true;
          await new Promise(resolve => setTimeout(resolve, 20));
          el.open = false;

          await new Promise(resolve => setTimeout(resolve, 300));

          expect(el.open).to.be.false;
          expect(parseInt(getComputedStyle(body).height)).to.equal(0);
        });

        it('should only fire the final after event when animation is interrupted', async () => {
          const el = await fixture<WaDetails>(html`
            <wa-details open summary="Test">Content for testing rapid toggle.</wa-details>
          `);
          const afterShowSpy = sinon.spy();
          const afterHideSpy = sinon.spy();
          el.addEventListener('wa-after-show', afterShowSpy);
          el.addEventListener('wa-after-hide', afterHideSpy);

          el.open = false;
          await new Promise(resolve => setTimeout(resolve, 20));
          el.open = true;

          await new Promise(resolve => setTimeout(resolve, 300));

          expect(afterShowSpy.callCount).to.equal(1);
          expect(afterHideSpy.callCount).to.equal(0);
        });
      });

      describe('CSS parts and states', () => {
        it('should expose the base part', async () => {
          const el = await fixture<WaDetails>(html`<wa-details summary="Test">Content</wa-details>`);
          expect(el.shadowRoot!.querySelector('[part~="base"]')).to.exist;
        });

        it('should expose the header part', async () => {
          const el = await fixture<WaDetails>(html`<wa-details summary="Test">Content</wa-details>`);
          expect(el.shadowRoot!.querySelector('[part~="header"]')).to.exist;
        });

        it('should expose the summary part', async () => {
          const el = await fixture<WaDetails>(html`<wa-details summary="Test">Content</wa-details>`);
          expect(el.shadowRoot!.querySelector('[part~="summary"]')).to.exist;
        });

        it('should expose the icon part', async () => {
          const el = await fixture<WaDetails>(html`<wa-details summary="Test">Content</wa-details>`);
          expect(el.shadowRoot!.querySelector('[part~="icon"]')).to.exist;
        });

        it('should expose the content part', async () => {
          const el = await fixture<WaDetails>(html`<wa-details summary="Test">Content</wa-details>`);
          expect(el.shadowRoot!.querySelector('[part~="content"]')).to.exist;
        });
      });

      it('should be the correct size after opening more than one instance', async () => {
        const container = await fixture<HTMLDivElement>(html`
          <div>
            <wa-details>
              <div style="height: 200px;"></div>
            </wa-details>
            <wa-details>
              <div style="height: 400px;"></div>
            </wa-details>
          </div>
        `);
        const first = container.querySelectorAll('wa-details')[0];
        const second = container.querySelectorAll('wa-details')[1];
        const firstBody = first.shadowRoot!.querySelector('.body')!;
        const secondBody = second.shadowRoot!.querySelector('.body')!;

        await first.show();
        await second.show();

        expect(firstBody.clientHeight).to.equal(232);
        expect(secondBody.clientHeight).to.equal(432);
      });
    });
  }
});
