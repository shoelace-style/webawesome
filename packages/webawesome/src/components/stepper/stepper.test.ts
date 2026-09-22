import { aTimeout, expect, html, waitUntil } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
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
 * happens one tick after the fixture resolves, to avoid racing each step's own hydration. See the comment on
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

        it('should render a labeled group, not a landmark, when the steps are not interactive', async () => {
          const el = await fixture<WaStepper>(html`
            <wa-stepper label="Checkout">
              <wa-step name="cart">Cart</wa-step>
            </wa-stepper>
          `);

          const wrapper = el.shadowRoot!.querySelector('[part~="stepper"]')!;
          expect(wrapper.localName).to.equal('div');
          expect(wrapper.getAttribute('role')).to.equal('group');
          expect(wrapper.getAttribute('aria-label')).to.equal('Checkout');
          expect(el.shadowRoot!.querySelector('nav')).to.not.exist;
        });

        it('should render a <nav> landmark when clickable', async () => {
          const el = await fixture<WaStepper>(html`
            <wa-stepper label="Checkout" clickable>
              <wa-step name="cart">Cart</wa-step>
            </wa-stepper>
          `);

          const wrapper = el.shadowRoot!.querySelector('[part~="stepper"]')!;
          expect(wrapper.localName).to.equal('nav');
          expect(wrapper.getAttribute('aria-label')).to.equal('Checkout');
        });

        it('should fall back to a localized label when the label attribute is unset', async () => {
          const el = await fixture<WaStepper>(html`
            <wa-stepper>
              <wa-step name="cart">Cart</wa-step>
            </wa-stepper>
          `);

          const label = el.shadowRoot!.querySelector('[part~="stepper"]')!.getAttribute('aria-label');
          expect(label).to.be.ok;
          expect(label).to.not.equal('');
        });
      });

      describe('announcements', () => {
        it('should announce the new step position via the shared live region', async () => {
          const el = await fixture<WaStepper>(html`
            <wa-stepper active="cart">
              <wa-step name="cart">Cart</wa-step>
              <wa-step name="shipping">Shipping</wa-step>
            </wa-stepper>
          `);

          // The shared log keeps each announcement for a few seconds, so count nodes rather than reading the last one:
          // a stale node from an earlier test would otherwise let this pass without a new announcement.
          const log = document.body.querySelector('[role="log"][aria-live="polite"]');
          const countBefore = log?.childElementCount ?? 0;

          el.goTo('shipping');
          await el.updateComplete;

          const logAfter = document.body.querySelector('[role="log"][aria-live="polite"]')!;
          expect(logAfter.childElementCount).to.equal(countBefore + 1);
          expect(logAfter.lastElementChild!.textContent).to.equal('Step 2 of 2');
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
        it('should emit a cancelable wa-before-step-change before changing, then wa-step-change', async () => {
          const el = await fixture<WaStepper>(html`
            <wa-stepper active="cart">
              <wa-step name="cart">Cart</wa-step>
              <wa-step name="shipping">Shipping</wa-step>
            </wa-stepper>
          `);

          const beforeSpy = sinon.spy();
          const changeSpy = sinon.spy();
          el.addEventListener('wa-before-step-change', beforeSpy);
          el.addEventListener('wa-step-change', changeSpy);

          el.goTo('shipping');
          await waitUntil(() => changeSpy.called);

          expect(beforeSpy.calledOnce).to.be.true;
          expect(beforeSpy.firstCall.args[0].detail.step.name).to.equal('shipping');
          expect(beforeSpy.firstCall.args[0].detail.previousStep.name).to.equal('cart');
          expect(changeSpy.calledOnce).to.be.true;
        });

        it('should not change the active step when wa-before-step-change is canceled', async () => {
          const el = await fixture<WaStepper>(html`
            <wa-stepper active="cart">
              <wa-step name="cart">Cart</wa-step>
              <wa-step name="shipping">Shipping</wa-step>
            </wa-stepper>
          `);

          el.addEventListener('wa-before-step-change', event => event.preventDefault());

          el.goTo('shipping');
          await el.updateComplete;

          expect(el.active).to.equal('cart');
        });
      });

      describe('nesting', () => {
        it('should scope its step collection to its own children, not a stepper nested in a description slot', async () => {
          const el = await whenSynced(
            await fixture<WaStepper>(html`
              <wa-stepper active="a">
                <wa-step name="a" with-description>
                  A
                  <div slot="description">
                    <wa-stepper active="x">
                      <wa-step name="x">X</wa-step>
                      <wa-step name="y">Y</wa-step>
                    </wa-stepper>
                  </div>
                </wa-step>
                <wa-step name="b">B</wa-step>
              </wa-stepper>
            `),
          );

          // getSteps() uses querySelectorAll, so it isn't scoping-aware; the summary text is, since it's driven by
          // the component's own (slot-scoped) internal step count.
          expect(el.shadowRoot!.querySelector('[part~="summary"]')!.textContent!.trim()).to.equal('Step 1 of 2');
          expect(el.active).to.equal('a');

          const inner = el.querySelector<WaStepper>('wa-stepper');
          await waitUntil(() => getSteps(inner!).some(step => step.active));
          expect(getSteps(inner!)).to.have.lengthOf(2);
        });
      });

      describe('linear mode', () => {
        it('should lock every step past the first incomplete one', async () => {
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
          expect(review.customStates.has('locked')).to.be.true;
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
        const endFill = (step: WaStep) =>
          getComputedStyle(step.shadowRoot!.querySelector('.connector-end')!).backgroundColor;
        const token = (name: string) => {
          const probe = document.createElement('span');
          probe.style.color = `var(${name})`;
          document.body.append(probe);
          const rgb = getComputedStyle(probe).color;
          probe.remove();
          return rgb;
        };

        it('should color the connector after every completed step and no others', async () => {
          const el = await whenSynced(
            await fixture<WaStepper>(html`
              <wa-stepper active="payment">
                <wa-step name="cart" completed>Cart</wa-step>
                <wa-step name="shipping">Shipping</wa-step>
                <wa-step name="payment">Payment</wa-step>
              </wa-stepper>
            `),
          );

          const [cart, shipping, payment] = getSteps(el);
          expect(endFill(cart)).to.equal(token('--wa-color-brand-fill-normal'));
          expect(endFill(shipping)).to.equal(token('--wa-color-neutral-fill-normal'));
          expect(endFill(payment)).to.equal(token('--wa-color-neutral-fill-normal'));
        });

        it('should color the connector after a completed step even when the active step is behind it', async () => {
          const el = await whenSynced(
            await fixture<WaStepper>(html`
              <wa-stepper active="cart">
                <wa-step name="cart">Cart</wa-step>
                <wa-step name="shipping" completed>Shipping</wa-step>
                <wa-step name="payment">Payment</wa-step>
              </wa-stepper>
            `),
          );

          const [cart, shipping] = getSteps(el);
          expect(endFill(cart)).to.equal(token('--wa-color-neutral-fill-normal'));
          expect(endFill(shipping)).to.equal(token('--wa-color-brand-fill-normal'));
        });

        it('should hand the previous variant to the half-connector leading in', async () => {
          const el = await whenSynced(
            await fixture<WaStepper>(html`
              <wa-stepper active="payment">
                <wa-step name="cart" completed variant="success">Cart</wa-step>
                <wa-step name="shipping" completed>Shipping</wa-step>
                <wa-step name="payment">Payment</wa-step>
              </wa-stepper>
            `),
          );

          const [cart, shipping, payment] = getSteps(el);
          const startFill = (step: WaStep) =>
            getComputedStyle(step.shadowRoot!.querySelector('.connector-start')!).backgroundColor;
          const token = (name: string) => {
            const probe = document.createElement('span');
            probe.style.color = `var(${name})`;
            document.body.append(probe);
            const rgb = getComputedStyle(probe).color;
            probe.remove();
            return rgb;
          };

          expect(startFill(cart)).to.equal(token('--wa-color-neutral-fill-normal'));
          expect(startFill(shipping)).to.equal(token('--wa-color-success-fill-normal'));
          expect(startFill(payment)).to.equal(token('--wa-color-brand-fill-normal'));
        });

        it('should not apply --connector-color-active to a connector-start whose previous step is not completed', async () => {
          // Regression test: a --connector-color-active override set on the stepper (e.g. to give a "transit line"
          // example a distinct completed color) must not leak onto the connector-start half of a step whose
          // previous step isn't completed, even though that override is inherited by every step in the shadow tree.
          const el = await whenSynced(
            await fixture<WaStepper>(html`
              <wa-stepper active="shipping" style="--connector-color-active: rgb(1, 2, 3)">
                <wa-step name="cart" completed>Cart</wa-step>
                <wa-step name="shipping">Shipping</wa-step>
                <wa-step name="payment">Payment</wa-step>
              </wa-stepper>
            `),
          );

          const [, shipping, payment] = getSteps(el);
          const startFill = (step: WaStep) =>
            getComputedStyle(step.shadowRoot!.querySelector('.connector-start')!).backgroundColor;

          // shipping's previous step (cart) IS completed, so its connector-start correctly picks up the override.
          expect(startFill(shipping)).to.equal('rgb(1, 2, 3)');
          // payment's previous step (shipping) is NOT completed, so its connector-start must not pick up the
          // override, matching the plain, uncompleted color its neighboring connector-end (drawn by shipping) uses.
          expect(startFill(payment)).to.equal(endFill(shipping));
        });

        it('should size the connector with --connector-width in both orientations', async () => {
          const thickness = (el: WaStepper) => {
            const [first] = getSteps(el);
            const rect = first.shadowRoot!.querySelector('.connector-end')!.getBoundingClientRect();
            return el.orientation === 'vertical' ? rect.width : rect.height;
          };

          const row = await whenSynced(
            await fixture<WaStepper>(html`
              <wa-stepper active="cart" style="--connector-width: 6px">
                <wa-step name="cart">Cart</wa-step>
                <wa-step name="shipping">Shipping</wa-step>
              </wa-stepper>
            `),
          );
          expect(thickness(row)).to.equal(6);

          const column = await whenSynced(
            await fixture<WaStepper>(html`
              <wa-stepper orientation="vertical" active="cart" style="--connector-width: 6px">
                <wa-step name="cart">Cart</wa-step>
                <wa-step name="shipping">Shipping</wa-step>
              </wa-stepper>
            `),
          );
          expect(thickness(column)).to.equal(6);
        });
      });

      describe('long labels', () => {
        it('should keep long words whole and never let labels overlap', async () => {
          const wrapper = await fixture<HTMLDivElement>(html`
            <div style="width: 200px">
              <wa-stepper active="a">
                <wa-step name="a">Knightsbridge</wa-step>
                <wa-step name="b">Hammersmith</wa-step>
                <wa-step name="c">Cockfosters</wa-step>
              </wa-stepper>
            </div>
          `);
          const el = wrapper.querySelector('wa-stepper')!;
          await whenSynced(el);

          const [a, b] = getSteps(el);
          const labelEl = a.shadowRoot!.querySelector<HTMLElement>('[part~="label"]')!;
          const labelA = labelEl.getBoundingClientRect();
          const labelB = b.shadowRoot!.querySelector('[part~="label"]')!.getBoundingClientRect();
          const oneLine = parseFloat(getComputedStyle(labelEl).lineHeight);

          expect(labelA.right).to.be.at.most(labelB.left);
          expect(labelA.height).to.be.closeTo(oneLine, 1);
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

        it('should set the loading state without propagating aria-busy to the host', async () => {
          const el = await fixture<WaStepper>(html`
            <wa-stepper active="shipping">
              <wa-step name="cart" completed>Cart</wa-step>
              <wa-step name="shipping" loading>Shipping</wa-step>
            </wa-stepper>
          `);

          await waitUntil(() => el.customStates.has('loading'));
          expect(el.hasAttribute('aria-busy')).to.be.false;
          expect(getSteps(el)[1].getAttribute('aria-busy')).to.equal('true');
        });

        it('should recompute the completed state when a slotted step changes on the client', async () => {
          // Exercises the MutationObserver path (as opposed to the initial sync above), so it's meaningful only for
          // a live client. Skip it for the SSR-hydrated fixture, which already covers the initial-sync case.
          if (fixture.type !== 'client-only') return;

          const el = await fixture<WaStepper>(html`
            <wa-stepper active="shipping">
              <wa-step name="cart" completed>Cart</wa-step>
              <wa-step name="shipping">Shipping</wa-step>
            </wa-stepper>
          `);

          expect(el.customStates.has('completed')).to.be.false;

          const shipping = getSteps(el)[1];
          shipping.completed = true;
          await shipping.updateComplete;
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

        it('should render no focusable controls when not clickable', async () => {
          const el = await whenSynced(
            await fixture<WaStepper>(html`
              <wa-stepper active="cart">
                <wa-step name="cart">Cart</wa-step>
                <wa-step name="shipping">Shipping</wa-step>
              </wa-stepper>
            `),
          );

          getSteps(el).forEach(step => {
            expect(step.shadowRoot!.querySelector('button')).to.not.exist;
            expect(step.hasAttribute('tabindex')).to.be.false;
          });
        });

        it('should put aria-current on the button, not the host, when clickable', async () => {
          const el = await whenSynced(
            await fixture<WaStepper>(html`
              <wa-stepper active="shipping" clickable>
                <wa-step name="cart" completed>Cart</wa-step>
                <wa-step name="shipping">Shipping</wa-step>
              </wa-stepper>
            `),
          );

          const [cart, shipping] = getSteps(el);
          expect(shipping.hasAttribute('aria-current')).to.be.false;
          expect(shipping.shadowRoot!.querySelector('[part~="button"]')!.getAttribute('aria-current')).to.equal('step');
          expect(cart.shadowRoot!.querySelector('[part~="button"]')!.hasAttribute('aria-current')).to.be.false;
        });

        it('should render each step as a button when clickable, disabling disabled and locked ones', async () => {
          const el = await whenSynced(
            await fixture<WaStepper>(html`
              <wa-stepper active="cart" clickable linear>
                <wa-step name="cart" completed>Cart</wa-step>
                <wa-step name="gift-wrap" disabled>Gift Wrap</wa-step>
                <wa-step name="shipping">Shipping</wa-step>
              </wa-stepper>
            `),
          );

          const buttons = getSteps(el).map(
            step => step.shadowRoot!.querySelector<HTMLButtonElement>('[part~="button"]')!,
          );
          expect(buttons.every(button => button?.localName === 'button')).to.be.true;
          expect(buttons[0].disabled).to.be.false;
          expect(buttons[1].disabled).to.be.true;
          expect(buttons[2].disabled).to.be.true;
        });

        it('activating the button with the keyboard should change the active step', async () => {
          const el = await whenSynced(
            await fixture<WaStepper>(html`
              <wa-stepper active="cart" clickable>
                <wa-step name="cart">Cart</wa-step>
                <wa-step name="shipping">Shipping</wa-step>
              </wa-stepper>
            `),
          );

          const shipping = getSteps(el)[1];
          const button = shipping.shadowRoot!.querySelector<HTMLButtonElement>('[part~="button"]')!;
          button.focus();
          expect(shipping.shadowRoot!.activeElement).to.equal(button);

          await sendKeys({ press: 'Enter' });
          await waitUntil(() => el.active === 'shipping');
        });
      });

      describe('size and variant', () => {
        it('should scale the marker with the font size', async () => {
          const wrapper = await fixture<HTMLDivElement>(html`
            <div>
              <wa-stepper active="cart" style="font-size: 12px"><wa-step name="cart">Cart</wa-step></wa-stepper>
              <wa-stepper active="cart"><wa-step name="cart">Cart</wa-step></wa-stepper>
              <wa-stepper active="cart" style="font-size: 20px"><wa-step name="cart">Cart</wa-step></wa-stepper>
            </div>
          `);

          const steppers = [...wrapper.querySelectorAll<WaStepper>('wa-stepper')];
          await Promise.all(steppers.map(stepper => whenSynced(stepper)));
          const [small, medium, large] = steppers.map(
            stepper =>
              stepper.querySelector('wa-step')!.shadowRoot!.querySelector('[part~="marker"]')!.getBoundingClientRect()
                .width,
          );

          expect(small).to.be.lessThan(medium);
          expect(medium).to.be.lessThan(large);
        });

        it('should keep the number in the marker whatever the variant', async () => {
          const el = await whenSynced(
            await fixture<WaStepper>(html`
              <wa-stepper active="cart">
                <wa-step name="cart">Cart</wa-step>
                <wa-step name="shipping" variant="warning">Shipping</wa-step>
                <wa-step name="payment" variant="danger">Payment</wa-step>
              </wa-stepper>
            `),
          );

          const [, shipping, payment] = getSteps(el);
          expect(shipping.shadowRoot!.querySelector('[part~="marker"] wa-icon')).to.not.exist;
          expect(payment.shadowRoot!.querySelector('[part~="marker"]')!.textContent!.trim()).to.equal('3');
          expect(payment.shadowRoot!.querySelector('[part~="status"]')!.textContent!.trim()).to.equal('Not completed');
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
              <button data-stepper="previous checkout">Back</button>
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

      describe('responsive layout', () => {
        function isStacked(el: WaStepper) {
          return getSteps(el).every(step => step.hasAttribute('data-wa-step-vertical'));
        }

        it('should stack an auto stepper that is too narrow to give each step room', async () => {
          const wrapper = await fixture<HTMLDivElement>(html`
            <div style="width: 240px">
              <wa-stepper active="cart" orientation="auto">
                <wa-step name="cart" completed>Cart</wa-step>
                <wa-step name="shipping">Shipping</wa-step>
                <wa-step name="payment">Payment</wa-step>
              </wa-stepper>
            </div>
          `);

          const el = await whenSynced(wrapper.querySelector('wa-stepper')!);
          await waitUntil(() => isStacked(el));
          expect(el.customStates.has('stacked')).to.be.true;

          wrapper.style.width = '640px';
          await waitUntil(() => !isStacked(el));
          expect(el.customStates.has('stacked')).to.be.false;
        });

        it('should never stack by default', async () => {
          const wrapper = await fixture<HTMLDivElement>(html`
            <div style="width: 240px">
              <wa-stepper active="cart">
                <wa-step name="cart" completed>Cart</wa-step>
                <wa-step name="shipping">Shipping</wa-step>
                <wa-step name="payment">Payment</wa-step>
              </wa-stepper>
            </div>
          `);

          const el = await whenSynced(wrapper.querySelector('wa-stepper')!);
          await aTimeout(50);
          expect(isStacked(el)).to.be.false;
        });

        it('should wrap long labels instead of overflowing', async () => {
          const wrapper = await fixture<HTMLDivElement>(html`
            <div style="width: 420px">
              <wa-stepper active="cart" orientation="horizontal">
                <wa-step name="cart">Cart</wa-step>
                <wa-step name="shipping">Shipping address and delivery preferences</wa-step>
                <wa-step name="payment">Payment</wa-step>
              </wa-stepper>
            </div>
          `);

          const el = await whenSynced(wrapper.querySelector('wa-stepper')!);
          const steps = el.shadowRoot!.querySelector<HTMLElement>('[part~="steps"]')!;
          const label = getSteps(el)[1].shadowRoot!.querySelector('[part~="label"]')!.getBoundingClientRect();
          const marker = getSteps(el)[1].shadowRoot!.querySelector('[part~="marker"]')!.getBoundingClientRect();

          expect(steps.scrollWidth).to.be.at.most(steps.clientWidth + 1);
          expect(label.height).to.be.greaterThan(marker.height);
        });
      });

      describe('vertical layout', () => {
        it('should stack the description under the label', async () => {
          const el = await whenSynced(
            await fixture<WaStepper>(html`
              <wa-stepper orientation="vertical" active="plan">
                <wa-step name="plan">
                  Plan
                  <span slot="description">Outline the piece</span>
                </wa-step>
                <wa-step name="write">Write</wa-step>
              </wa-stepper>
            `),
          );

          const [plan] = getSteps(el);
          const label = plan.shadowRoot!.querySelector('[part~="label"]')!.getBoundingClientRect();
          const description = plan.shadowRoot!.querySelector('[part~="description"]')!.getBoundingClientRect();

          expect(description.top).to.be.at.least(label.bottom);
          expect(Math.round(description.left)).to.equal(Math.round(label.left));
        });

        it('should run the connector from one marker to the next', async () => {
          const el = await whenSynced(
            await fixture<WaStepper>(html`
              <wa-stepper orientation="vertical" active="plan">
                <wa-step name="plan">
                  Plan
                  <span slot="description">Outline the piece and gather sources</span>
                </wa-step>
                <wa-step name="write">Write</wa-step>
              </wa-stepper>
            `),
          );

          const [plan, write] = getSteps(el);
          const planMarker = plan.shadowRoot!.querySelector('[part~="marker"]')!.getBoundingClientRect();
          const writeMarker = write.shadowRoot!.querySelector('[part~="marker"]')!.getBoundingClientRect();
          const connectors = [...plan.shadowRoot!.querySelectorAll<HTMLElement>('[part~="connector"]')]
            .map(connector => connector.getBoundingClientRect())
            .filter(rect => rect.height > 0);

          expect(connectors).to.have.lengthOf(1);
          const [connector] = connectors;
          const span = writeMarker.top - planMarker.bottom;

          expect(connector.top).to.be.at.least(planMarker.bottom);
          expect(connector.bottom).to.be.at.most(writeMarker.top);
          expect(connector.height).to.be.at.least(span * 0.6);
        });
      });

      describe('assistive text', () => {
        it('should describe each step as completed, not completed, or locked', async () => {
          const el = await whenSynced(
            await fixture<WaStepper>(html`
              <wa-stepper active="shipping" linear>
                <wa-step name="cart" completed>Cart</wa-step>
                <wa-step name="shipping">Shipping</wa-step>
                <wa-step name="payment">Payment</wa-step>
              </wa-stepper>
            `),
          );

          const [cart, shipping, payment] = getSteps(el);
          const statusOf = (step: WaStep) => step.shadowRoot!.querySelector('[part~="status"]')!.textContent!.trim();

          expect(statusOf(cart)).to.equal('Completed');
          expect(statusOf(shipping)).to.equal('');
          expect(statusOf(payment)).to.equal('Locked');
          expect(payment.hasAttribute('aria-disabled')).to.be.false;
          expect(shipping.hasAttribute('aria-disabled')).to.be.false;
        });

        it('should describe a pending step as not completed', async () => {
          const el = await whenSynced(
            await fixture<WaStepper>(html`
              <wa-stepper active="cart">
                <wa-step name="cart">Cart</wa-step>
                <wa-step name="shipping">Shipping</wa-step>
              </wa-stepper>
            `),
          );

          const [, shipping] = getSteps(el);
          expect(shipping.shadowRoot!.querySelector('[part~="status"]')!.textContent!.trim()).to.equal('Not completed');
        });

        it('should announce the current position as "Step X of Y"', async () => {
          const el = await whenSynced(
            await fixture<WaStepper>(html`
              <wa-stepper active="shipping">
                <wa-step name="cart" completed>Cart</wa-step>
                <wa-step name="shipping">Shipping</wa-step>
                <wa-step name="payment">Payment</wa-step>
              </wa-stepper>
            `),
          );

          const summary = el.shadowRoot!.querySelector('[part~="summary"]')!;
          expect(summary.textContent!.trim()).to.equal('Step 2 of 3');

          el.next();
          await waitUntil(() => summary.textContent!.trim() === 'Step 3 of 3');
        });
      });
    });
  }
});
