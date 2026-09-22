import { expect, html, waitUntil } from '@open-wc/testing';
import { fixtures } from '../../internal/test/fixture.js';
import type WaStep from './step.js';

function toRgb(color: string) {
  const probe = document.createElement('span');
  probe.style.color = color;
  document.body.append(probe);
  const rgb = getComputedStyle(probe).color;
  probe.remove();
  return rgb;
}

describe('<wa-step>', () => {
  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      it('should render as a listitem with the default number marker', async () => {
        const el = await fixture<WaStep>(html`<wa-step name="cart">Cart</wa-step>`);

        expect(el.getAttribute('role')).to.equal('listitem');
        expect(el.shadowRoot!.querySelector('[part~="marker"]')!.textContent!.trim()).to.equal('1');
      });

      it('should be accessible', async () => {
        // <wa-step> renders role="listitem", which ARIA requires to live inside a role="list" container. That's the
        // job <wa-stepper> normally does; provide one here since this test exercises the step in isolation.
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

      it('should reflect disabled to the disabled custom state and status text', async () => {
        const el = await fixture<WaStep>(html`<wa-step name="gift-wrap" disabled>Gift Wrap</wa-step>`);

        expect(el.hasAttribute('aria-disabled')).to.be.false;
        expect(el.customStates.has('disabled')).to.be.true;
        expect(el.shadowRoot!.querySelector('[part~="status"]')!.textContent!.trim()).to.equal('Disabled');
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

      describe('attention', () => {
        it('should animate the marker, not the whole step, when attention is set', async () => {
          const el = await fixture<WaStep>(html`<wa-step name="verify" attention="pulse">Verify email</wa-step>`);
          const marker = el.shadowRoot!.querySelector('.marker')!;

          expect(getComputedStyle(marker).animationName).to.equal('pulse');
          expect(getComputedStyle(el).animationName).to.equal('none');

          el.attention = 'bounce';
          await el.updateComplete;
          expect(getComputedStyle(marker).animationName).to.equal('bounce');
        });
      });

      describe('variant', () => {
        function markerBackground(el: WaStep) {
          return getComputedStyle(el.shadowRoot!.querySelector('.marker')!).backgroundColor;
        }

        it("should tint an untouched step's ring toward its variant, distinct from the neutral default", async () => {
          const neutral = await fixture<WaStep>(html`<wa-step name="cart">Cart</wa-step>`);
          const warning = await fixture<WaStep>(html`<wa-step name="cart" variant="warning">Cart</wa-step>`);
          const ringOf = (el: WaStep) => getComputedStyle(el.shadowRoot!.querySelector('.marker')!).borderColor;

          expect(markerBackground(neutral)).to.equal('rgba(0, 0, 0, 0)');
          expect(ringOf(warning)).to.not.equal(ringOf(neutral));
        });

        it('should keep the variant color on a completed step', async () => {
          const wrapper = await fixture<HTMLDivElement>(html`
            <div>
              <wa-step name="a" completed>Brand</wa-step>
              <wa-step name="b" completed variant="success">Success</wa-step>
              <wa-step name="c" variant="success">Upcoming success</wa-step>
            </div>
          `);

          const [brand, success, upcoming] = [...wrapper.querySelectorAll<WaStep>('wa-step')];
          const successFill = getComputedStyle(success).getPropertyValue('--wa-color-success-fill-normal').trim();

          expect(markerBackground(success)).to.not.equal(markerBackground(brand));
          expect(markerBackground(success)).to.not.equal(markerBackground(upcoming));
          expect(markerBackground(success)).to.equal(toRgb(successFill));
        });
      });
    });
  }
});
