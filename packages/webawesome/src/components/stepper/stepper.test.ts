import { expect, html, waitUntil } from '@open-wc/testing';
import sinon from 'sinon';
import { fixtures } from '../../internal/test/fixture.js';
import type WaStep from '../step/step.js';
import type WaStepper from './stepper.js';

function getSteps(el: WaStepper) {
  return [...el.querySelectorAll<WaStep>('wa-step')];
}

function getActiveStep(el: WaStepper) {
  return getSteps(el).find(step => step.active);
}

/**
 * Waits for the stepper's initial step sync (position/active/locked) to land. For SSR-hydrated fixtures this
 * happens one tick after the fixture resolves, to avoid racing each step's own hydration — see the comment on
 * `WaStepper.firstUpdated()`.
 */
async function whenSynced(el: WaStepper) {
  await waitUntil(() => getSteps(el).some(step => step.active));
  return el;
}

describe('<wa-stepper>', () => {
  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      describe('active step resolution', () => {
        it('should fall back to the first step when active is unset', async () => {
          const el = await whenSynced(
            await fixture<WaStepper>(html`
              <wa-stepper>
                <wa-step name="cart">Cart</wa-step>
                <wa-step name="shipping">Shipping</wa-step>
              </wa-stepper>
            `),
          );

          expect(getActiveStep(el)?.name).to.equal('cart');
        });

        it('should warn and fall back to the first step when active names an unknown step', async () => {
          const warn = sinon.stub(console, 'warn');

          const el = await whenSynced(
            await fixture<WaStepper>(html`
              <wa-stepper active="nope">
                <wa-step name="cart">Cart</wa-step>
                <wa-step name="shipping">Shipping</wa-step>
              </wa-stepper>
            `),
          );

          expect(getActiveStep(el)?.name).to.equal('cart');
          expect(warn.called).to.be.true;

          warn.restore();
        });

        it('should mark exactly one step aria-current="step"', async () => {
          const el = await whenSynced(
            await fixture<WaStepper>(html`
              <wa-stepper active="shipping">
                <wa-step name="cart" completed>Cart</wa-step>
                <wa-step name="shipping">Shipping</wa-step>
                <wa-step name="payment">Payment</wa-step>
              </wa-stepper>
            `),
          );

          const current = getSteps(el).filter(step => step.getAttribute('aria-current') === 'step');
          expect(current).to.have.lengthOf(1);
          expect(current[0].name).to.equal('shipping');
        });
      });

      describe('accessibility', () => {
        it('should be accessible', async () => {
          const el = await fixture<WaStepper>(html`
            <wa-stepper active="shipping" label="Checkout">
              <wa-step name="cart" completed>Cart</wa-step>
              <wa-step name="shipping">Shipping</wa-step>
              <wa-step name="payment">Payment</wa-step>
            </wa-stepper>
          `);

          await expect(el).to.be.accessible();
        });

        it('should render a <nav> landmark labeled by the label attribute', async () => {
          const el = await fixture<WaStepper>(html`
            <wa-stepper label="Checkout">
              <wa-step name="cart">Cart</wa-step>
            </wa-stepper>
          `);

          expect(el.shadowRoot!.querySelector('nav')!.getAttribute('aria-label')).to.equal('Checkout');
        });
      });

      describe('methods', () => {
        it('next() and previous() should move the active step', async () => {
          const el = await fixture<WaStepper>(html`
            <wa-stepper active="cart">
              <wa-step name="cart">Cart</wa-step>
              <wa-step name="shipping">Shipping</wa-step>
              <wa-step name="payment">Payment</wa-step>
            </wa-stepper>
          `);

          el.next();
          await el.updateComplete;
          expect(el.active).to.equal('shipping');

          el.next();
          await el.updateComplete;
          expect(el.active).to.equal('payment');

          // next() at the last step is a no-op
          el.next();
          await el.updateComplete;
          expect(el.active).to.equal('payment');

          el.previous();
          await el.updateComplete;
          expect(el.active).to.equal('shipping');
        });

        it('goTo() should jump directly to a named step', async () => {
          const el = await fixture<WaStepper>(html`
            <wa-stepper active="cart">
              <wa-step name="cart">Cart</wa-step>
              <wa-step name="shipping">Shipping</wa-step>
              <wa-step name="payment">Payment</wa-step>
            </wa-stepper>
          `);

          el.goTo('payment');
          await el.updateComplete;
          expect(el.active).to.equal('payment');
        });

        it('goTo() should no-op for an unknown or disabled step', async () => {
          const el = await fixture<WaStepper>(html`
            <wa-stepper active="cart">
              <wa-step name="cart">Cart</wa-step>
              <wa-step name="gift-wrap" disabled>Gift Wrap</wa-step>
            </wa-stepper>
          `);

          el.goTo('nope');
          await el.updateComplete;
          expect(el.active).to.equal('cart');

          el.goTo('gift-wrap');
          await el.updateComplete;
          expect(el.active).to.equal('cart');
        });
      });

      describe('events', () => {
        it('should emit a cancelable wa-step-change before changing, then wa-after-step-change', async () => {
          const el = await fixture<WaStepper>(html`
            <wa-stepper active="cart">
              <wa-step name="cart">Cart</wa-step>
              <wa-step name="shipping">Shipping</wa-step>
            </wa-stepper>
          `);

          const changeSpy = sinon.spy();
          const afterSpy = sinon.spy();
          el.addEventListener('wa-step-change', changeSpy);
          el.addEventListener('wa-after-step-change', afterSpy);

          el.goTo('shipping');
          await waitUntil(() => afterSpy.called);

          expect(changeSpy.calledOnce).to.be.true;
          expect(changeSpy.firstCall.args[0].detail.step.name).to.equal('shipping');
          expect(changeSpy.firstCall.args[0].detail.previousStep.name).to.equal('cart');
          expect(afterSpy.calledOnce).to.be.true;
        });

        it('should not change the active step when wa-step-change is canceled', async () => {
          const el = await fixture<WaStepper>(html`
            <wa-stepper active="cart">
              <wa-step name="cart">Cart</wa-step>
              <wa-step name="shipping">Shipping</wa-step>
            </wa-stepper>
          `);

          el.addEventListener('wa-step-change', event => event.preventDefault());

          el.goTo('shipping');
          await el.updateComplete;

          expect(el.active).to.equal('cart');
        });
      });

      describe('linear mode', () => {
        it('should mark only the step right after the active one as locked', async () => {
          const el = await whenSynced(
            await fixture<WaStepper>(html`
              <wa-stepper active="shipping" linear>
                <wa-step name="cart" completed>Cart</wa-step>
                <wa-step name="shipping">Shipping</wa-step>
                <wa-step name="payment">Payment</wa-step>
                <wa-step name="review">Review</wa-step>
              </wa-stepper>
            `),
          );

          const [cart, shipping, payment, review] = getSteps(el);
          expect(cart.customStates.has('locked')).to.be.false;
          expect(shipping.customStates.has('locked')).to.be.false;
          expect(payment.customStates.has('locked')).to.be.true;
          expect(review.customStates.has('locked')).to.be.false;
        });

        it('should no-op when jumping past the locked boundary', async () => {
          const el = await fixture<WaStepper>(html`
            <wa-stepper active="shipping" linear>
              <wa-step name="cart" completed>Cart</wa-step>
              <wa-step name="shipping">Shipping</wa-step>
              <wa-step name="payment">Payment</wa-step>
            </wa-stepper>
          `);

          el.goTo('payment');
          await el.updateComplete;
          expect(el.active).to.equal('shipping');
        });

        it('should allow navigating back to an earlier, completed step', async () => {
          const el = await fixture<WaStepper>(html`
            <wa-stepper active="shipping" linear>
              <wa-step name="cart" completed>Cart</wa-step>
              <wa-step name="shipping">Shipping</wa-step>
              <wa-step name="payment">Payment</wa-step>
            </wa-stepper>
          `);

          el.goTo('cart');
          await el.updateComplete;
          expect(el.active).to.equal('cart');
        });
      });

      describe('connector coloring', () => {
        it('should color every connector at or before the active step, and none after it, regardless of completed', async () => {
          // "completed" is set on cart only, but that shouldn't matter — coloring tracks the active step's
          // position, not the `completed` attribute.
          const el = await whenSynced(
            await fixture<WaStepper>(html`
              <wa-stepper active="shipping">
                <wa-step name="cart" completed>Cart</wa-step>
                <wa-step name="shipping">Shipping</wa-step>
                <wa-step name="payment">Payment</wa-step>
              </wa-stepper>
            `),
          );

          const [cart, shipping, payment] = getSteps(el);
          expect(cart.customStates.has('connector-active')).to.be.true;
          expect(shipping.customStates.has('connector-active')).to.be.true;
          expect(payment.customStates.has('connector-active')).to.be.false;
        });

        it('should turn the connector after the active step gray even when the active step itself is completed', async () => {
          const el = await whenSynced(
            await fixture<WaStepper>(html`
              <wa-stepper active="cart">
                <wa-step name="cart" completed>Cart</wa-step>
                <wa-step name="shipping">Shipping</wa-step>
                <wa-step name="payment">Payment</wa-step>
              </wa-stepper>
            `),
          );

          const [, shipping, payment] = getSteps(el);
          expect(shipping.customStates.has('connector-active')).to.be.false;
          expect(payment.customStates.has('connector-active')).to.be.false;
        });

        it('should color the connector leading into the active step even when nothing is completed', async () => {
          const el = await whenSynced(
            await fixture<WaStepper>(html`
              <wa-stepper active="payment">
                <wa-step name="cart">Cart</wa-step>
                <wa-step name="shipping">Shipping</wa-step>
                <wa-step name="payment">Payment</wa-step>
              </wa-stepper>
            `),
          );

          const [, shipping, payment] = getSteps(el);
          expect(shipping.customStates.has('connector-active')).to.be.true;
          expect(payment.customStates.has('connector-active')).to.be.true;
        });
      });

      describe('stepper-level custom states', () => {
        it('should NOT set the completed state when a step is incomplete', async () => {
          const el = await fixture<WaStepper>(html`
            <wa-stepper active="shipping">
              <wa-step name="cart" completed>Cart</wa-step>
              <wa-step name="shipping">Shipping</wa-step>
            </wa-stepper>
          `);

          await waitUntil(() => getSteps(el).some(step => step.active));
          expect(el.customStates.has('completed')).to.be.false;
        });

        it('should set the completed state once every step is completed', async () => {
          const el = await fixture<WaStepper>(html`
            <wa-stepper active="shipping">
              <wa-step name="cart" completed>Cart</wa-step>
              <wa-step name="shipping" completed>Shipping</wa-step>
            </wa-stepper>
          `);

          await waitUntil(() => el.customStates.has('completed'));
        });

        it('should set the loading state and aria-busy when any step is loading', async () => {
          const el = await fixture<WaStepper>(html`
            <wa-stepper active="shipping">
              <wa-step name="cart" completed>Cart</wa-step>
              <wa-step name="shipping" loading>Shipping</wa-step>
            </wa-stepper>
          `);

          await waitUntil(() => el.customStates.has('loading'));
          expect(el.getAttribute('aria-busy')).to.equal('true');
        });

        it('should recompute the completed state when a slotted step changes on the client', async () => {
          // Exercises the MutationObserver path (as opposed to the initial sync above), so it's meaningful only for
          // a live client — skip it for the SSR-hydrated fixture, which already covers the initial-sync case.
          if (fixture.type !== 'client-only') return;

          const el = await fixture<WaStepper>(html`
            <wa-stepper active="shipping">
              <wa-step name="cart" completed>Cart</wa-step>
              <wa-step name="shipping">Shipping</wa-step>
            </wa-stepper>
          `);

          expect(el.customStates.has('completed')).to.be.false;

          getSteps(el)[1].completed = true;
          await waitUntil(() => el.customStates.has('completed'));
        });
      });

      describe('interaction', () => {
        it('clicking a step should not activate it by default', async () => {
          const el = await fixture<WaStepper>(html`
            <wa-stepper active="cart">
              <wa-step name="cart">Cart</wa-step>
              <wa-step name="shipping">Shipping</wa-step>
            </wa-stepper>
          `);

          getSteps(el)[1].click();
          await el.updateComplete;
          expect(el.active).to.equal('cart');
        });

        it('clicking a step should activate it when clickable', async () => {
          const el = await fixture<WaStepper>(html`
            <wa-stepper active="cart" clickable>
              <wa-step name="cart">Cart</wa-step>
              <wa-step name="shipping">Shipping</wa-step>
            </wa-stepper>
          `);

          getSteps(el)[1].click();
          await el.updateComplete;
          expect(el.active).to.equal('shipping');
        });

        it('clicking a disabled step should not activate it, even when clickable', async () => {
          const el = await fixture<WaStepper>(html`
            <wa-stepper active="cart" clickable>
              <wa-step name="cart">Cart</wa-step>
              <wa-step name="gift-wrap" disabled>Gift Wrap</wa-step>
            </wa-stepper>
          `);

          getSteps(el)[1].click();
          await el.updateComplete;
          expect(el.active).to.equal('cart');
        });

        it('a disabled step should not be focusable by mouse click', async () => {
          // A tabindex="-1" element (needed to keep it out of the roving-tabindex target) is still focusable by
          // mouse click in every browser — only Tab skips it. The stepper prevents the default mousedown action for
          // disabled steps specifically to stop that; some browsers (e.g. Safari) would otherwise show a focus ring
          // on a step that's supposed to be entirely non-interactive.
          const el = await fixture<WaStepper>(html`
            <wa-stepper active="cart">
              <wa-step name="cart">Cart</wa-step>
              <wa-step name="gift-wrap" disabled>Gift Wrap</wa-step>
            </wa-stepper>
          `);

          const giftWrap = getSteps(el)[1];
          const mousedownEvent = new MouseEvent('mousedown', { bubbles: true, cancelable: true });
          giftWrap.dispatchEvent(mousedownEvent);

          expect(mousedownEvent.defaultPrevented).to.be.true;
        });

        it('ArrowRight should move focus without changing the active step', async () => {
          const el = await fixture<WaStepper>(html`
            <wa-stepper active="cart">
              <wa-step name="cart">Cart</wa-step>
              <wa-step name="shipping">Shipping</wa-step>
            </wa-stepper>
          `);

          const [cart, shipping] = getSteps(el);
          cart.focus();

          cart.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
          await el.updateComplete;

          expect(el.active).to.equal('cart');
          expect(document.activeElement).to.equal(shipping);
        });

        it('Enter on a focused step should not activate it by default', async () => {
          const el = await fixture<WaStepper>(html`
            <wa-stepper active="cart">
              <wa-step name="cart">Cart</wa-step>
              <wa-step name="shipping">Shipping</wa-step>
            </wa-stepper>
          `);

          const [, shipping] = getSteps(el);
          shipping.focus();

          shipping.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
          await el.updateComplete;

          expect(el.active).to.equal('cart');
        });

        it('Enter on a focused step should activate it when clickable', async () => {
          const el = await fixture<WaStepper>(html`
            <wa-stepper active="cart" clickable>
              <wa-step name="cart">Cart</wa-step>
              <wa-step name="shipping">Shipping</wa-step>
            </wa-stepper>
          `);

          const [, shipping] = getSteps(el);
          shipping.focus();

          shipping.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
          await el.updateComplete;

          expect(el.active).to.equal('shipping');
        });
      });

      describe('data-stepper invokers', () => {
        it('should call next()/previous()/goTo() on the stepper matching the given id', async () => {
          const wrapper = await fixture<HTMLDivElement>(html`
            <div>
              <wa-stepper id="checkout" active="cart">
                <wa-step name="cart">Cart</wa-step>
                <wa-step name="shipping">Shipping</wa-step>
                <wa-step name="payment">Payment</wa-step>
              </wa-stepper>
              <button data-stepper="next checkout">Next</button>
              <button data-stepper="prev checkout">Back</button>
              <button data-stepper="goto checkout payment">Skip to payment</button>
            </div>
          `);

          const stepper = wrapper.querySelector<WaStepper>('#checkout')!;
          const [nextButton, prevButton, gotoButton] = [...wrapper.querySelectorAll<HTMLButtonElement>('button')];

          nextButton.click();
          await waitUntil(() => stepper.active === 'shipping');

          prevButton.click();
          await waitUntil(() => stepper.active === 'cart');

          gotoButton.click();
          await waitUntil(() => stepper.active === 'payment');
        });

        it('should warn and no-op when the id does not match a stepper', async () => {
          const warn = sinon.stub(console, 'warn');

          const wrapper = await fixture<HTMLDivElement>(html`
            <div>
              <wa-stepper id="checkout" active="cart">
                <wa-step name="cart">Cart</wa-step>
                <wa-step name="shipping">Shipping</wa-step>
              </wa-stepper>
              <button data-stepper="next nope">Next</button>
            </div>
          `);

          const stepper = wrapper.querySelector<WaStepper>('#checkout')!;
          wrapper.querySelector('button')!.click();
          await stepper.updateComplete;

          expect(stepper.active).to.equal('cart');
          expect(warn.called).to.be.true;

          warn.restore();
        });
      });
    });
  }
});
