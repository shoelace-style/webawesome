import { expect, oneEvent } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit';
import sinon from 'sinon';
import { fixtures } from '../../internal/test/fixture.js';
import { runFormControlBaseTests } from '../../internal/test/form-control-base-tests.js';
import { clickOnElement } from '../../internal/test/pointer-utilities.js';
import { serialize } from '../../utilities/form.js';
import type WaSlider from './slider.js';

describe('<wa-slider>', () => {
  runFormControlBaseTests('wa-slider');

  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      it('should pass accessibility tests', async () => {
        const el = await fixture<WaSlider>(html`<wa-slider label="Name"></wa-slider>`);
        await expect(el).to.be.accessible();
      });

      it('default properties', async () => {
        const el = await fixture<WaSlider>(html` <wa-slider></wa-slider> `);

        expect(el.name).to.equal(null);
        expect(el.value).to.equal(0);
        expect(el.label).to.equal('');
        expect(el.hint).to.equal('');
        expect(el.disabled).to.be.false;
        expect(el.checkValidity()).to.be.true;
        expect(el.min).to.equal(0);
        expect(el.max).to.equal(100);
        expect(el.step).to.equal(1);
        expect(el.tooltipPlacement).to.equal('top');
        expect(el.defaultValue).to.equal(0);
      });

      it('should be disabled with the disabled attribute', async () => {
        const el = await fixture<WaSlider>(html` <wa-slider disabled></wa-slider> `);
        const input = el.shadowRoot!.querySelector<HTMLElement>("[role='slider']")!;

        expect(el.matches(':disabled')).to.be.true;
        expect(input.getAttribute('aria-disabled')).to.equal('true');
      });

      describe('when the value changes', () => {
        it('should emit change and input and decrease the value when pressing right arrow', async () => {
          const el = await fixture<WaSlider>(html` <wa-slider value="50"></wa-slider> `);
          const changeHandler = sinon.spy();
          const inputHandler = sinon.spy();

          el.addEventListener('change', changeHandler);
          el.addEventListener('input', inputHandler);
          el.focus();
          await sendKeys({ press: 'ArrowRight' });
          await el.updateComplete;

          expect(el.value).to.equal(51);
          expect(changeHandler).to.have.been.calledOnce;
          expect(inputHandler).to.have.been.calledOnce;
        });

        it('should not emit change or input when changing the value programmatically', async () => {
          const el = await fixture<WaSlider>(html` <wa-slider value="0"></wa-slider> `);

          el.addEventListener('change', () => expect.fail('change should not be emitted'));
          el.addEventListener('input', () => expect.fail('input should not be emitted'));
          el.value = 50;

          await el.updateComplete;
        });

        it('should not emit change or input when stepUp() is called programmatically', async () => {
          const el = await fixture<WaSlider>(html` <wa-slider step="2" value="2"></wa-slider> `);

          el.addEventListener('change', () => expect.fail('change should not be emitted'));
          el.addEventListener('input', () => expect.fail('input should not be emitted'));
          el.stepUp();
          await el.updateComplete;
        });

        it('should not emit change or input when stepDown() is called programmatically', async () => {
          const el = await fixture<WaSlider>(html` <wa-slider step="2" value="2"></wa-slider> `);

          el.addEventListener('change', () => expect.fail('change should not be emitted'));
          el.addEventListener('input', () => expect.fail('input should not be emitted'));
          el.stepDown();
          await el.updateComplete;
        });
      });

      describe('step', () => {
        it('should increment by step when stepUp() is called', async () => {
          const el = await fixture<WaSlider>(html` <wa-slider step="2" value="2"></wa-slider> `);

          el.stepUp();
          await el.updateComplete;
          expect(el.value).to.equal(4);
        });

        it('should decrement by step when stepDown() is called', async () => {
          const el = await fixture<WaSlider>(html` <wa-slider step="2" value="2"></wa-slider> `);

          el.stepDown();
          await el.updateComplete;
          expect(el.value).to.equal(0);
        });
      });

      describe('when submitting a form', () => {
        it('should serialize its name and value with FormData', async () => {
          const form = await fixture<HTMLFormElement>(html` <form><wa-slider name="a" value="1"></wa-slider></form> `);
          const formData = new FormData(form);
          expect(formData.get('a')).to.equal('1');
        });

        it('should serialize its name and value with JSON', async () => {
          const form = await fixture<HTMLFormElement>(html` <form><wa-slider name="a" value="1"></wa-slider></form> `);
          const json = serialize(form);
          expect(json.a).to.equal('1');
        });

        it('should be invalid when setCustomValidity() is called with a non-empty value', async () => {
          const slider = await fixture<HTMLFormElement>(html` <wa-slider></wa-slider> `);

          slider.setCustomValidity('Invalid selection');
          await slider.updateComplete;

          expect(slider.checkValidity()).to.be.false;
          expect(slider.customStates.has('invalid')).to.be.true;
          expect(slider.customStates.has('valid')).to.be.false;
          expect(slider.customStates.has('user-invalid')).to.be.false;
          expect(slider.customStates.has('user-valid')).to.be.false;

          await clickOnElement(slider);
          await slider.updateComplete;
          slider.blur();
          await slider.updateComplete;

          expect(slider.customStates.has('user-invalid')).to.be.true;
          expect(slider.customStates.has('user-valid')).to.be.false;
        });

        it('should receive validation attributes ("states") even when novalidate is used on the parent form', async () => {
          const el = await fixture<HTMLFormElement>(html` <form novalidate><wa-slider></wa-slider></form> `);
          const slider = el.querySelector<WaSlider>('wa-slider')!;

          slider.setCustomValidity('Invalid value');
          await slider.updateComplete;

          expect(slider.customStates.has('invalid')).to.be.true;
          expect(slider.customStates.has('valid')).to.be.false;
          expect(slider.customStates.has('user-invalid')).to.be.false;
          expect(slider.customStates.has('user-valid')).to.be.false;
        });

        it('should be present in form data when using the form attribute and located outside of a <form>', async () => {
          const el = await fixture<HTMLFormElement>(html`
            <div>
              <form id="f">
                <wa-button type="submit">Submit</wa-button>
              </form>
              <wa-slider form="f" name="a" value="50"></wa-slider>
            </div>
          `);
          const form = el.querySelector('form')!;
          const formData = new FormData(form);

          expect(formData.get('a')).to.equal('50');
        });
      });

      describe('when resetting a form', () => {
        it('should reset the element to its initial value', async () => {
          const form = await fixture<HTMLFormElement>(html`
            <form>
              <wa-slider name="a" value="99"></wa-slider>
              <wa-button type="reset">Reset</wa-button>
            </form>
          `);
          const button = form.querySelector('wa-button')!;
          const input = form.querySelector('wa-slider')!;
          input.value = 80;

          await input.updateComplete;

          setTimeout(() => button.click());
          await oneEvent(form, 'reset');
          await input.updateComplete;

          expect(input.value).to.equal(99);

          input.defaultValue = 0;

          setTimeout(() => button.click());
          await oneEvent(form, 'reset');
          await input.updateComplete;

          expect(input.value).to.equal(0);
        });
      });
    });
  }
});
