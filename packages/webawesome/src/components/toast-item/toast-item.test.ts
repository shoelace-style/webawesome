import { aTimeout, expect, waitUntil } from '@open-wc/testing';
import { html } from 'lit';
import sinon from 'sinon';
import { fixtures } from '../../internal/test/fixture.js';
import { clickOnElement, moveMouseOnElement } from '../../internal/test/pointer-utilities.js';
import type WaToastItem from './toast-item.js';

describe('<wa-toast-item>', () => {
  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      describe('accessibility', () => {
        it('should be accessible', async () => {
          const el = await fixture<WaToastItem>(html`<wa-toast-item>Test message</wa-toast-item>`);
          await el.updateComplete;

          await expect(el).to.be.accessible();
        });
      });

      describe('variants', () => {
        // For some reason SSR tests tend to fail in these `for ()` loops in CI, so this should help fix them.
        const variants = ['brand', 'success', 'warning', 'danger', 'neutral'] as const;
        for (const variant of variants) {
          it(`should properly render ${variant}`, async () => {
            const el = await fixture<WaToastItem>(
              html`<wa-toast-item variant="${variant}">Test message</wa-toast-item>`,
            );
            await el.updateComplete;
            expect(el.variant).to.equal(variant);
            expect(el.getAttribute('variant')).to.equal(variant);
          });
        }

        it('should default to neutral variant', async () => {
          const el = await fixture<WaToastItem>(html`<wa-toast-item>Test message</wa-toast-item>`);
          await el.updateComplete;

          expect(el.variant).to.equal('neutral');
        });
      });

      describe('sizes', () => {
        const sizes = ['xs', 's', 'm', 'l', 'xl'] as const;
        for (const size of sizes) {
          it(`should properly render ${size}`, async () => {
            const el = await fixture<WaToastItem>(html`<wa-toast-item size="${size}">Test message</wa-toast-item>`);
            await el.updateComplete;

            expect(el.size).to.equal(size);
            expect(el.getAttribute('size')).to.equal(size);
          });
        }

        it('should default to medium size', async () => {
          const el = await fixture<WaToastItem>(html`<wa-toast-item>Test message</wa-toast-item>`);
          await el.updateComplete;

          expect(el.size).to.equal('m');
        });
      });

      describe('duration', () => {
        it('should default to 5000ms duration', async () => {
          const el = await fixture<WaToastItem>(html`<wa-toast-item>Test message</wa-toast-item>`);
          await el.updateComplete;

          expect(el.duration).to.equal(5000);
        });

        it('should accept custom duration', async () => {
          const el = await fixture<WaToastItem>(html`<wa-toast-item duration="3000">Test message</wa-toast-item>`);
          await el.updateComplete;

          expect(el.duration).to.equal(3000);
        });

        it('should show progress ring when duration is set', async () => {
          const el = await fixture<WaToastItem>(html`<wa-toast-item duration="5000">Test message</wa-toast-item>`);
          await el.updateComplete;

          const toastItemElement = el.shadowRoot!.querySelector('.toast-item');
          expect(toastItemElement?.classList.contains('toast-item--has-duration')).to.be.true;
        });

        it('should not show progress ring when duration is 0', async () => {
          const el = await fixture<WaToastItem>(html`<wa-toast-item duration="0">Test message</wa-toast-item>`);
          await el.updateComplete;

          const toastItemElement = el.shadowRoot!.querySelector('.toast-item');
          expect(toastItemElement?.classList.contains('toast-item--has-duration')).to.be.false;
        });
      });

      describe('events', () => {
        it('should emit wa-show and wa-after-show when startTimer() is called', async () => {
          const el = await fixture<WaToastItem>(html`<wa-toast-item>Test message</wa-toast-item>`);
          const showHandler = sinon.spy();
          const afterShowHandler = sinon.spy();

          el.addEventListener('wa-show', showHandler);
          el.addEventListener('wa-after-show', afterShowHandler);
          el.startTimer();

          await waitUntil(() => showHandler.calledOnce);
          await waitUntil(() => afterShowHandler.calledOnce);

          expect(showHandler).to.have.been.calledOnce;
          expect(afterShowHandler).to.have.been.calledOnce;
        });

        it('should emit wa-hide and wa-after-hide when hide() is called', async () => {
          const el = await fixture<WaToastItem>(html`<wa-toast-item>Test message</wa-toast-item>`);
          const hideHandler = sinon.spy();
          const afterHideHandler = sinon.spy();

          el.addEventListener('wa-hide', hideHandler);
          el.addEventListener('wa-after-hide', afterHideHandler);
          el.hide();

          await waitUntil(() => hideHandler.calledOnce);
          await waitUntil(() => afterHideHandler.calledOnce);

          expect(hideHandler).to.have.been.calledOnce;
          expect(afterHideHandler).to.have.been.calledOnce;
        });

        it('should not show when wa-show is prevented', async () => {
          const el = await fixture<WaToastItem>(html`<wa-toast-item>Test message</wa-toast-item>`);
          const afterShowHandler = sinon.spy();

          el.addEventListener('wa-show', event => event.preventDefault());
          el.addEventListener('wa-after-show', afterShowHandler);
          el.startTimer();

          await aTimeout(300);

          expect(afterShowHandler).to.not.have.been.called;
        });

        it('should not hide when wa-hide is prevented', async () => {
          const el = await fixture<WaToastItem>(html`<wa-toast-item>Test message</wa-toast-item>`);
          const afterHideHandler = sinon.spy();

          el.addEventListener('wa-hide', event => event.preventDefault());
          el.addEventListener('wa-after-hide', afterHideHandler);
          await el.startTimer();
          el.hide();

          await aTimeout(300);

          expect(afterHideHandler).to.not.have.been.called;
        });
      });

      describe('close button', () => {
        it('should hide when close button is clicked', async () => {
          const el = await fixture<WaToastItem>(html`<wa-toast-item duration="0">Test message</wa-toast-item>`);
          const hideHandler = sinon.spy();

          el.addEventListener('wa-hide', hideHandler);

          const closeButton = el.shadowRoot!.querySelector<HTMLButtonElement>('[part="close-button"]')!;
          await clickOnElement(closeButton);

          await waitUntil(() => hideHandler.calledOnce);
          expect(hideHandler).to.have.been.calledOnce;
        });
      });

      describe('timer behavior', () => {
        it('should auto-dismiss after duration expires', async () => {
          const el = await fixture<WaToastItem>(html`<wa-toast-item duration="100">Test message</wa-toast-item>`);
          const hideHandler = sinon.spy();

          el.addEventListener('wa-hide', hideHandler);
          el.startTimer();

          await waitUntil(() => hideHandler.calledOnce, 'Expected wa-hide to be called', { timeout: 500 });
          expect(hideHandler).to.have.been.calledOnce;
        });

        it('should not auto-dismiss when duration is 0', async () => {
          const el = await fixture<WaToastItem>(html`<wa-toast-item duration="0">Test message</wa-toast-item>`);
          const hideHandler = sinon.spy();

          el.addEventListener('wa-hide', hideHandler);
          el.startTimer();

          await aTimeout(200);

          expect(hideHandler).to.not.have.been.called;
        });

        it('should stop timer when stopTimer() is called', async () => {
          const el = await fixture<WaToastItem>(html`<wa-toast-item duration="100">Test message</wa-toast-item>`);
          const hideHandler = sinon.spy();

          el.addEventListener('wa-hide', hideHandler);
          el.startTimer();
          el.stopTimer();

          await aTimeout(200);

          expect(hideHandler).to.not.have.been.called;
        });
      });

      describe('hover behavior', () => {
        it('should pause timer on mouse enter and reset on leave', async () => {
          const el = await fixture<WaToastItem>(html`<wa-toast-item duration="200">Test message</wa-toast-item>`);
          const hideHandler = sinon.spy();

          el.addEventListener('wa-hide', hideHandler);
          el.startTimer();

          // Hover over the element to pause
          await moveMouseOnElement(el);
          el.dispatchEvent(new PointerEvent('pointerenter', { pointerType: 'mouse', bubbles: true }));

          // Wait longer than the original duration
          await aTimeout(300);

          // Should not have hidden yet since we're hovering
          expect(hideHandler).to.not.have.been.called;

          // Leave the element to resume
          el.dispatchEvent(new PointerEvent('pointerleave', { bubbles: true }));

          // Now it should eventually hide
          await waitUntil(() => hideHandler.calledOnce, 'Expected wa-hide to be called after mouse leave', {
            timeout: 500,
          });
          expect(hideHandler).to.have.been.calledOnce;
        });

        it('should not pause timer for touch events', async () => {
          const el = await fixture<WaToastItem>(html`<wa-toast-item duration="100">Test message</wa-toast-item>`);
          const hideHandler = sinon.spy();

          el.addEventListener('wa-hide', hideHandler);
          el.startTimer();

          // Simulate touch pointer event
          el.dispatchEvent(new PointerEvent('pointerenter', { pointerType: 'touch', bubbles: true }));

          // Should still hide since touch doesn't pause
          await waitUntil(() => hideHandler.calledOnce, 'Expected wa-hide to be called', { timeout: 500 });
          expect(hideHandler).to.have.been.calledOnce;
        });
      });

      describe('focus behavior', () => {
        it('should pause timer when close button receives focus and resume on blur', async () => {
          const el = await fixture<WaToastItem>(html`<wa-toast-item duration="200">Test message</wa-toast-item>`);
          const hideHandler = sinon.spy();

          el.addEventListener('wa-hide', hideHandler);
          el.startTimer();

          // Focus the close button to pause
          const closeButton = el.shadowRoot!.querySelector<HTMLButtonElement>('[part="close-button"]')!;
          closeButton.focus();

          // Wait longer than the original duration
          await aTimeout(300);

          // Should not have hidden yet since close button is focused
          expect(hideHandler).to.not.have.been.called;

          // Blur the close button to resume
          closeButton.blur();

          // Now it should eventually hide
          await waitUntil(() => hideHandler.calledOnce, 'Expected wa-hide to be called after focus leaves', {
            timeout: 500,
          });
          expect(hideHandler).to.have.been.calledOnce;
        });

        it('should not resume timer when focus leaves but mouse is still hovering', async () => {
          const el = await fixture<WaToastItem>(html`<wa-toast-item duration="200">Test message</wa-toast-item>`);
          const hideHandler = sinon.spy();

          el.addEventListener('wa-hide', hideHandler);
          el.startTimer();

          // Hover over the element
          el.dispatchEvent(new PointerEvent('pointerenter', { pointerType: 'mouse', bubbles: true }));

          // Also focus the close button
          const closeButton = el.shadowRoot!.querySelector<HTMLButtonElement>('[part="close-button"]')!;
          closeButton.focus();

          // Blur the close button (but still hovering)
          closeButton.blur();

          // Wait longer than the original duration
          await aTimeout(300);

          // Should not have hidden because mouse is still hovering
          expect(hideHandler).to.not.have.been.called;

          // Leave the element to fully resume
          el.dispatchEvent(new PointerEvent('pointerleave', { bubbles: true }));

          // Now it should eventually hide
          await waitUntil(() => hideHandler.calledOnce, 'Expected wa-hide to be called after both leave', {
            timeout: 500,
          });
          expect(hideHandler).to.have.been.calledOnce;
        });
      });

      describe('icon slot', () => {
        it('should show icon when slot is used', async () => {
          const el = await fixture<WaToastItem>(html`
            <wa-toast-item>
              <wa-icon slot="icon" name="check"></wa-icon>
              Test message
            </wa-toast-item>
          `);
          await el.updateComplete;

          const toastItemElement = el.shadowRoot!.querySelector('.toast-item');
          expect(toastItemElement?.classList.contains('toast-item--has-icon')).to.be.true;
        });

        it('should not have icon class when no icon slot is used', async () => {
          const el = await fixture<WaToastItem>(html`<wa-toast-item>Test message</wa-toast-item>`);
          await el.updateComplete;

          const toastItemElement = el.shadowRoot!.querySelector('.toast-item');
          expect(toastItemElement?.classList.contains('toast-item--has-icon')).to.be.false;
        });
      });

      describe('content slot', () => {
        it('should render text content', async () => {
          const el = await fixture<WaToastItem>(html`<wa-toast-item>Test message</wa-toast-item>`);
          await el.updateComplete;

          expect(el.textContent?.trim()).to.equal('Test message');
        });

        it('should render HTML content', async () => {
          const el = await fixture<WaToastItem>(html` <wa-toast-item> <strong>Bold</strong> message </wa-toast-item> `);
          await el.updateComplete;

          const strong = el.querySelector('strong');
          expect(strong).to.exist;
          expect(strong?.textContent).to.equal('Bold');
        });
      });

      describe('cleanup on disconnect', () => {
        it('should stop timer when disconnected', async () => {
          const el = await fixture<WaToastItem>(html`<wa-toast-item duration="200">Test message</wa-toast-item>`);
          const hideHandler = sinon.spy();

          el.addEventListener('wa-hide', hideHandler);
          await el.startTimer();

          // Remove from DOM
          el.remove();

          await aTimeout(300);

          // Timer should have been stopped, so no hide event
          expect(hideHandler).to.not.have.been.called;
        });
      });
    });
  }
});
