import { expect, html, waitUntil } from '@open-wc/testing';
import { fixtures } from '../../internal/test/fixture.js';
import type WaStep from './step.js';

describe('<wa-step>', () => {
  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      it('should render as a listitem with the default number marker', async () => {
        const el = await fixture<WaStep>(html`<wa-step name="cart">Cart</wa-step>`);

        expect(el.getAttribute('role')).to.equal('listitem');
        expect(el.shadowRoot!.querySelector('[part~="marker"]')!.textContent!.trim()).to.equal('1');
      });

      it('should be accessible', async () => {
        // <wa-step> renders role="listitem", which ARIA requires to live inside a role="list" container — the job
        // <wa-stepper> normally does. Provide one here since this test exercises the step in isolation.
        const wrapper = await fixture<HTMLDivElement>(
          html`<div role="list"><wa-step name="cart" completed>Cart</wa-step></div>`,
        );
        await expect(wrapper).to.be.accessible();
      });

      it('should show a checkmark instead of the number when completed', async () => {
        const el = await fixture<WaStep>(html`<wa-step name="cart" completed>Cart</wa-step>`);

        expect(el.customStates.has('completed')).to.be.true;
        expect(el.shadowRoot!.querySelector('[part~="marker"] wa-icon')).to.exist;
      });

      it('should show a spinner when loading', async () => {
        const el = await fixture<WaStep>(html`<wa-step name="shipping" loading>Shipping</wa-step>`);

        expect(el.customStates.has('loading')).to.be.true;
        expect(el.getAttribute('aria-busy')).to.equal('true');
        expect(el.shadowRoot!.querySelector('[part~="marker"] wa-spinner')).to.exist;
      });

      it('should reflect disabled to aria-disabled and the disabled custom state', async () => {
        const el = await fixture<WaStep>(html`<wa-step name="gift-wrap" disabled>Gift Wrap</wa-step>`);

        expect(el.getAttribute('aria-disabled')).to.equal('true');
        expect(el.customStates.has('disabled')).to.be.true;
        expect(el.tabIndex).to.equal(-1);
      });

      it('should set aria-current="step" only while active', async () => {
        const el = await fixture<WaStep>(html`<wa-step name="shipping">Shipping</wa-step>`);

        expect(el.hasAttribute('aria-current')).to.be.false;

        el.active = true;
        await el.updateComplete;
        expect(el.getAttribute('aria-current')).to.equal('step');

        el.active = false;
        await el.updateComplete;
        expect(el.hasAttribute('aria-current')).to.be.false;
      });

      it('should let a slotted bullet replace the default marker content', async () => {
        const el = await fixture<WaStep>(
          html`<wa-step name="submit" completed><wa-icon slot="bullet" name="rocket"></wa-icon>Submit</wa-step>`,
        );

        const bulletSlot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="bullet"]')!;
        const assigned = bulletSlot.assignedElements();
        expect(assigned).to.have.lengthOf(1);
        expect(assigned[0].getAttribute('name')).to.equal('rocket');
      });

      it('should hide the description container when nothing is slotted', async () => {
        const el = await fixture<WaStep>(html`<wa-step name="cart">Cart</wa-step>`);
        await waitUntil(() => el.shadowRoot!.querySelector('[part~="description"]')!.hasAttribute('hidden'));
      });

      it('should show the description container when content is slotted', async () => {
        const el = await fixture<WaStep>(
          html`<wa-step name="cart" with-description>Cart<span slot="description">3 items</span></wa-step>`,
        );
        await waitUntil(() => !el.shadowRoot!.querySelector('[part~="description"]')!.hasAttribute('hidden'));
      });

      describe('marker color custom properties', () => {
        function markerBackground(el: WaStep) {
          return getComputedStyle(el.shadowRoot!.querySelector('.marker')!).backgroundColor;
        }

        it('should let --marker-background-color override the default fill', async () => {
          const el = await fixture<WaStep>(html`<wa-step name="cart">Cart</wa-step>`);

          el.style.setProperty('--marker-background-color', 'rgb(255, 0, 0)');

          // A custom property change on the host crossing into its own shadow tree isn't reflected synchronously
          // (or even after a single requestAnimationFrame) in a *derived* property that references it via var() —
          // a real, if surprising, browser timing quirk, not something this component controls. Polling is the
          // correct way to observe it, matching how the rest of this suite handles eventually-consistent state.
          await waitUntil(() => markerBackground(el) === 'rgb(255, 0, 0)');
        });

        it("should tint an untouched step's marker toward its variant, distinct from the neutral default", async () => {
          const neutral = await fixture<WaStep>(html`<wa-step name="cart">Cart</wa-step>`);
          const danger = await fixture<WaStep>(html`<wa-step name="cart" variant="danger">Cart</wa-step>`);

          expect(markerBackground(danger)).to.not.equal(markerBackground(neutral));
        });

        it('should let --marker-background-color win over a variant tint', async () => {
          // Regression: --marker-background-color must NOT be given a default value anywhere (e.g. on <wa-stepper>),
          // since var(--marker-background-color, <variant-tint-fallback>) only ever falls through to the tint when
          // the property is genuinely unset. A stray default would resolve first and hide the tint permanently.
          const el = await fixture<WaStep>(html`<wa-step name="cart" variant="danger">Cart</wa-step>`);
          const tinted = markerBackground(el);

          el.style.setProperty('--marker-background-color', 'rgb(255, 0, 0)');

          await waitUntil(() => markerBackground(el) === 'rgb(255, 0, 0)');
          expect(markerBackground(el)).to.not.equal(tinted);
        });
      });
    });
  }
});
