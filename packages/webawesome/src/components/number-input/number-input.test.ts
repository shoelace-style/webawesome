import { expect, oneEvent, waitUntil } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit';
import sinon from 'sinon';
import { fixtures } from '../../internal/test/fixture.js';
import { runFormControlBaseTests } from '../../internal/test/form-control-base-tests.js';
import { serialize } from '../../utilities/form.js';
import type WaNumberInput from './number-input.js';

describe('<wa-number-input>', () => {
  runFormControlBaseTests('wa-number-input');

  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      it('should pass accessibility tests', async () => {
        const el = await fixture<WaNumberInput>(html` <wa-number-input label="Quantity"></wa-number-input> `);
        await expect(el).to.be.accessible();
      });

      it('default properties', async () => {
        const el = await fixture<WaNumberInput>(html` <wa-number-input></wa-number-input> `);

        expect(el.size).to.equal('medium');
        expect(el.name).to.equal(null);
        expect(el.value).to.equal(null);
        expect(el.defaultValue).to.equal(null);
        expect(el.title).to.equal('');
        expect(el.appearance).to.equal('outlined');
        expect(el.pill).to.equal(false);
        expect(el.label).to.equal('');
        expect(el.hint).to.equal('');
        expect(el.placeholder).to.equal('');
        expect(el.disabled).to.equal(false);
        expect(el.readonly).to.equal(false);
        expect(el.required).to.equal(false);
        expect(el.min).to.be.undefined;
        expect(el.max).to.be.undefined;
        expect(el.step).to.equal(1);
        expect(el.withoutSteppers).to.equal(false);
        expect(el.inputmode).to.equal('numeric');
      });

      it('should have title if title attribute is set', async () => {
        const el = await fixture<WaNumberInput>(html` <wa-number-input title="Test"></wa-number-input> `);
        await el.updateComplete;
        const input = el.shadowRoot!.querySelector<HTMLInputElement>('input')!;
        expect(input.title).to.equal('Test');
      });

      it('should have label with "has-label" class if label has a slotted element', async () => {
        const el = await fixture<WaNumberInput>(html`
          <wa-number-input><span slot="label">Quantity</span></wa-number-input>
        `);
        await el.updateComplete;
        const label = el.shadowRoot!.querySelector('[part~="form-control-label"]')!;
        expect(label.classList.contains('has-label')).to.equal(true);
      });

      it('should have label with "has-label" class if label is provided as an attribute', async () => {
        const el = await fixture<WaNumberInput>(html` <wa-number-input label="Quantity"></wa-number-input> `);
        await el.updateComplete;
        const label = el.shadowRoot!.querySelector('[part~="form-control-label"]')!;
        expect(label.classList.contains('has-label')).to.equal(true);
      });

      it('should not have "has-label" class on label if no label content is provided', async () => {
        const el = await fixture<WaNumberInput>(html` <wa-number-input></wa-number-input> `);
        await el.updateComplete;
        const label = el.shadowRoot!.querySelector('[part~="form-control-label"]')!;
        expect(label.classList.contains('has-label')).to.equal(false);
      });

      it('should be disabled with the disabled attribute', async () => {
        const el = await fixture<WaNumberInput>(html` <wa-number-input disabled></wa-number-input> `);
        await el.updateComplete;
        const input = el.shadowRoot!.querySelector<HTMLInputElement>('input')!;
        expect(input.disabled).to.equal(true);
      });

      it('should focus the input when clicking on the label', async () => {
        const el = await fixture<WaNumberInput>(html` <wa-number-input label="Quantity"></wa-number-input> `);
        const label = el.shadowRoot!.querySelector('[part~="form-control-label"]')!;
        const focusHandler = sinon.spy();

        el.addEventListener('focus', focusHandler);
        (label as HTMLLabelElement).click();
        await waitUntil(() => focusHandler.calledOnce);

        expect(focusHandler).to.have.been.calledOnce;
      });

      describe('when using constraint validation', () => {
        it('should be valid by default', async () => {
          const el = await fixture<WaNumberInput>(html` <wa-number-input></wa-number-input> `);
          expect(el.checkValidity()).to.be.true;
        });

        it('should be invalid when required and empty', async () => {
          const el = await fixture<WaNumberInput>(html` <wa-number-input required></wa-number-input> `);
          expect(el.reportValidity()).to.be.false;
          expect(el.checkValidity()).to.be.false;
        });

        it('should be invalid when required and disabled is removed', async () => {
          const el = await fixture<WaNumberInput>(html` <wa-number-input disabled required></wa-number-input>`);
          expect(el.checkValidity()).to.be.true;
          el.disabled = false;
          await el.updateComplete;
          expect(el.checkValidity()).to.be.false;
        });

        it('should not add a value to the form if disabled', async () => {
          const form = await fixture<HTMLFormElement>(
            html` <form><wa-number-input name="quantity" disabled required></wa-number-input></form>`,
          );
          const el = form.querySelector('wa-number-input')!;
          el.value = '5';
          await el.updateComplete;

          expect(new FormData(form).get('quantity')).to.equal(null);
          el.disabled = false;
          await el.updateComplete;
          expect(new FormData(form).get('quantity')).to.equal('5');
        });

        it('should receive the correct validation attributes ("states") when valid', async () => {
          const el = await fixture<WaNumberInput>(html` <wa-number-input required value="5"></wa-number-input> `);

          expect(el.checkValidity()).to.be.true;
          expect(el.customStates.has('required')).to.be.true;
          expect(el.customStates.has('optional')).to.be.false;
          expect(el.customStates.has('invalid')).to.be.false;
          expect(el.customStates.has('valid')).to.be.true;
          expect(el.customStates.has('user-invalid')).to.be.false;
          expect(el.customStates.has('user-valid')).to.be.false;

          el.focus();
          await el.updateComplete;
          await sendKeys({ press: 'ArrowUp' });
          await el.updateComplete;
          el.blur();
          await el.updateComplete;

          expect(el.checkValidity()).to.be.true;
          expect(el.customStates.has('user-invalid')).to.be.false;
          expect(el.customStates.has('user-valid')).to.be.true;
        });

        it('should receive the correct validation attributes ("states") when invalid', async () => {
          const el = await fixture<WaNumberInput>(html` <wa-number-input required></wa-number-input> `);

          expect(el.customStates.has('required')).to.be.true;
          expect(el.customStates.has('optional')).to.be.false;
          expect(el.customStates.has('invalid')).to.be.true;
          expect(el.customStates.has('valid')).to.be.false;
          expect(el.customStates.has('user-invalid')).to.be.false;
          expect(el.customStates.has('user-valid')).to.be.false;

          el.focus();
          await el.updateComplete;
          await sendKeys({ type: '5' });
          await sendKeys({ press: 'Backspace' });
          await el.updateComplete;
          el.blur();
          await el.updateComplete;

          expect(el.customStates.has('user-invalid')).to.be.true;
          expect(el.customStates.has('user-valid')).to.be.false;
        });

        it('should receive validation attributes ("states") even when novalidate is used on the parent form', async () => {
          const el = await fixture<HTMLFormElement>(html`
            <form novalidate><wa-number-input required></wa-number-input></form>
          `);
          const input = el.querySelector<WaNumberInput>('wa-number-input')!;

          expect(input.customStates.has('required')).to.be.true;
          expect(input.customStates.has('optional')).to.be.false;
          expect(input.customStates.has('invalid')).to.be.true;
          expect(input.customStates.has('valid')).to.be.false;
          expect(input.customStates.has('user-invalid')).to.be.false;
          expect(input.customStates.has('user-valid')).to.be.false;
        });
      });

      describe('when submitting a form', () => {
        it('should serialize its name and value with FormData', async () => {
          const form = await fixture<HTMLFormElement>(html`
            <form><wa-number-input name="a" value="1"></wa-number-input></form>
          `);
          const formData = new FormData(form);
          expect(formData.get('a')).to.equal('1');
        });

        it('should serialize its name and value with JSON', async () => {
          const form = await fixture<HTMLFormElement>(html`
            <form><wa-number-input name="a" value="1"></wa-number-input></form>
          `);
          const json = serialize(form) as { a: '1' };
          expect(json.a).to.equal('1');
        });

        it('should submit the form when pressing enter in a form without a submit button', async () => {
          const form = await fixture<HTMLFormElement>(html` <form><wa-number-input></wa-number-input></form> `);
          const input = form.querySelector('wa-number-input')!;
          const submitHandler = sinon.spy((event: SubmitEvent) => event.preventDefault());

          form.addEventListener('submit', submitHandler);
          input.focus();
          await sendKeys({ press: 'Enter' });
          await waitUntil(() => submitHandler.calledOnce);

          expect(submitHandler).to.have.been.calledOnce;
        });

        it('should prevent submission when pressing enter in an input and canceling the keydown event', async () => {
          const form = await fixture<HTMLFormElement>(html` <form><wa-number-input></wa-number-input></form> `);
          const input = form.querySelector('wa-number-input')!;
          const submitHandler = sinon.spy((event: SubmitEvent) => event.preventDefault());
          const keydownHandler = sinon.spy((event: KeyboardEvent) => {
            if (event.key === 'Enter') {
              event.preventDefault();
            }
          });

          form.addEventListener('submit', submitHandler);
          input.addEventListener('keydown', keydownHandler);
          input.focus();
          await sendKeys({ press: 'Enter' });
          await waitUntil(() => keydownHandler.calledOnce);

          expect(keydownHandler).to.have.been.calledOnce;
          expect(submitHandler).to.not.have.been.called;
        });

        it('should be invalid when setCustomValidity() is called with a non-empty value', async () => {
          const input = await fixture<HTMLFormElement>(html` <wa-number-input></wa-number-input> `);

          input.setCustomValidity('Invalid selection');
          await input.updateComplete;

          expect(input.checkValidity()).to.be.false;
          expect(input.customStates.has('invalid')).to.be.true;
          expect(input.customStates.has('valid')).to.be.false;
          expect(input.customStates.has('user-invalid')).to.be.false;
          expect(input.customStates.has('user-valid')).to.be.false;

          input.focus();
          await sendKeys({ type: '5' });
          await input.updateComplete;
          input.blur();
          await input.updateComplete;

          expect(input.customStates.has('user-invalid')).to.be.true;
          expect(input.customStates.has('user-valid')).to.be.false;
        });

        it('should be present in form data when using the form attribute and located outside of a <form>', async () => {
          const el = await fixture<HTMLFormElement>(html`
            <div>
              <form id="f">
                <wa-button type="submit">Submit</wa-button>
              </form>
              <wa-number-input form="f" name="a" value="1"></wa-number-input>
            </div>
          `);
          const form = el.querySelector('form')!;
          const formData = new FormData(form);

          expect(formData.get('a')).to.equal('1');
        });
      });

      describe('when resetting a form', () => {
        it('should reset the element to its initial value', async () => {
          const form = await fixture<HTMLFormElement>(html`
            <form>
              <wa-number-input name="a" value="5"></wa-number-input>
              <wa-button type="reset">Reset</wa-button>
            </form>
          `);
          const button = form.querySelector('wa-button')!;
          const input = form.querySelector('wa-number-input')!;
          input.value = '99';

          await input.updateComplete;

          setTimeout(() => button.click());
          await oneEvent(form, 'reset');
          await input.updateComplete;

          expect(input.value).to.equal('5');

          input.defaultValue = '';

          setTimeout(() => button.click());
          await oneEvent(form, 'reset');
          await input.updateComplete;

          expect(input.value).to.equal('');
        });
      });

      describe('when calling HTMLFormElement.reportValidity()', () => {
        it('should be invalid when the input is empty and form.reportValidity() is called', async () => {
          const form = await fixture<HTMLFormElement>(html`
            <form>
              <wa-number-input required value=""></wa-number-input>
              <wa-button type="submit">Submit</wa-button>
            </form>
          `);

          expect(form.reportValidity()).to.be.false;
        });

        it('should be invalid when the input is empty, reportValidity() is called, and the form has novalidate', async () => {
          const form = await fixture<HTMLFormElement>(html`
            <form novalidate>
              <wa-number-input required value=""></wa-number-input>
              <wa-button type="submit">Submit</wa-button>
            </form>
          `);

          expect(form.reportValidity()).to.be.false;
        });
      });

      describe('when the value changes', () => {
        it('should emit change and input when the user types in the input', async () => {
          const el = await fixture<WaNumberInput>(html` <wa-number-input></wa-number-input> `);
          const inputHandler = sinon.spy();
          const changeHandler = sinon.spy();

          el.addEventListener('input', inputHandler);
          el.addEventListener('change', changeHandler);
          el.focus();
          await sendKeys({ type: '123' });
          el.blur();
          await el.updateComplete;

          expect(changeHandler).to.have.been.calledOnce;
          expect(inputHandler).to.have.been.calledThrice;
        });

        it('should not emit change or input when the value is set programmatically', async () => {
          const el = await fixture<WaNumberInput>(html` <wa-number-input></wa-number-input> `);

          el.addEventListener('change', () => expect.fail('change should not be emitted'));
          el.addEventListener('input', () => expect.fail('input should not be emitted'));
          el.value = '123';

          await el.updateComplete;
        });
      });

      describe('step functionality', () => {
        it('should be valid when the value is within the boundary of a step', async () => {
          const el = await fixture<WaNumberInput>(html` <wa-number-input step=".5" value="1.5"></wa-number-input> `);
          expect(el.checkValidity()).to.be.true;
        });

        it('should be invalid when the value is not within the boundary of a step', async () => {
          const el = await fixture<WaNumberInput>(html` <wa-number-input step=".5" value="1.25"></wa-number-input> `);

          if (fixture.type === 'ssr-client-hydrated') {
            return;
          }

          expect(el.checkValidity()).to.be.false;
        });

        it('should update validity when step changes', async () => {
          const el = await fixture<WaNumberInput>(html` <wa-number-input step=".5" value="1.5"></wa-number-input> `);
          expect(el.checkValidity()).to.be.true;

          el.step = 1;
          await el.updateComplete;

          if (fixture.type === 'ssr-client-hydrated') {
            return;
          }

          expect(el.checkValidity()).to.be.false;
        });

        it('should increment by step when stepUp() is called', async () => {
          const el = await fixture<WaNumberInput>(html` <wa-number-input step="2" value="2"></wa-number-input> `);

          el.stepUp();
          await el.updateComplete;
          expect(el.value).to.equal('4');
        });

        it('should decrement by step when stepDown() is called', async () => {
          const el = await fixture<WaNumberInput>(html` <wa-number-input step="2" value="2"></wa-number-input> `);

          el.stepDown();
          await el.updateComplete;
          expect(el.value).to.equal('0');
        });

        it('should not emit input or change when stepUp() is called programmatically', async () => {
          const el = await fixture<WaNumberInput>(html` <wa-number-input step="2" value="2"></wa-number-input> `);

          el.addEventListener('change', () => expect.fail('change should not be emitted'));
          el.addEventListener('input', () => expect.fail('input should not be emitted'));
          el.stepUp();

          await el.updateComplete;
        });

        it('should not emit input and change when stepDown() is called programmatically', async () => {
          const el = await fixture<WaNumberInput>(html` <wa-number-input step="2" value="2"></wa-number-input> `);

          el.addEventListener('change', () => expect.fail('change should not be emitted'));
          el.addEventListener('input', () => expect.fail('input should not be emitted'));
          el.stepDown();

          await el.updateComplete;
        });
      });

      describe('stepper buttons', () => {
        it('should show stepper buttons by default', async () => {
          const el = await fixture<WaNumberInput>(html` <wa-number-input></wa-number-input> `);
          const incrementButton = el.shadowRoot!.querySelector('[part~="stepper-increment"]');
          const decrementButton = el.shadowRoot!.querySelector('[part~="stepper-decrement"]');

          expect(incrementButton).to.exist;
          expect(decrementButton).to.exist;
        });

        it('should hide stepper buttons when without-steppers is set', async () => {
          const el = await fixture<WaNumberInput>(html` <wa-number-input without-steppers></wa-number-input> `);
          const incrementButton = el.shadowRoot!.querySelector('[part~="stepper-increment"]');
          const decrementButton = el.shadowRoot!.querySelector('[part~="stepper-decrement"]');

          expect(incrementButton).to.not.exist;
          expect(decrementButton).to.not.exist;
        });

        it('should increment value when increment button is clicked', async () => {
          const el = await fixture<WaNumberInput>(html` <wa-number-input value="5"></wa-number-input> `);
          const incrementButton = el.shadowRoot!.querySelector<HTMLButtonElement>('[part~="stepper-increment"]')!;
          const inputHandler = sinon.spy();
          const changeHandler = sinon.spy();

          el.addEventListener('input', inputHandler);
          el.addEventListener('change', changeHandler);

          incrementButton.click();
          await el.updateComplete;

          expect(el.value).to.equal('6');
          expect(inputHandler).to.have.been.calledOnce;
          expect(changeHandler).to.have.been.calledOnce;
        });

        it('should decrement value when decrement button is clicked', async () => {
          const el = await fixture<WaNumberInput>(html` <wa-number-input value="5"></wa-number-input> `);
          const decrementButton = el.shadowRoot!.querySelector<HTMLButtonElement>('[part~="stepper-decrement"]')!;
          const inputHandler = sinon.spy();
          const changeHandler = sinon.spy();

          el.addEventListener('input', inputHandler);
          el.addEventListener('change', changeHandler);

          decrementButton.click();
          await el.updateComplete;

          expect(el.value).to.equal('4');
          expect(inputHandler).to.have.been.calledOnce;
          expect(changeHandler).to.have.been.calledOnce;
        });

        it('should not change value when stepper buttons are clicked and input is disabled', async () => {
          const el = await fixture<WaNumberInput>(html` <wa-number-input value="5" disabled></wa-number-input> `);
          const incrementButton = el.shadowRoot!.querySelector<HTMLButtonElement>('[part~="stepper-increment"]')!;
          const decrementButton = el.shadowRoot!.querySelector<HTMLButtonElement>('[part~="stepper-decrement"]')!;

          incrementButton.click();
          await el.updateComplete;
          expect(el.value).to.equal('5');

          decrementButton.click();
          await el.updateComplete;
          expect(el.value).to.equal('5');
        });

        it('should not change value when stepper buttons are clicked and input is readonly', async () => {
          const el = await fixture<WaNumberInput>(html` <wa-number-input value="5" readonly></wa-number-input> `);
          const incrementButton = el.shadowRoot!.querySelector<HTMLButtonElement>('[part~="stepper-increment"]')!;
          const decrementButton = el.shadowRoot!.querySelector<HTMLButtonElement>('[part~="stepper-decrement"]')!;

          incrementButton.click();
          await el.updateComplete;
          expect(el.value).to.equal('5');

          decrementButton.click();
          await el.updateComplete;
          expect(el.value).to.equal('5');
        });

        it('should disable increment button when value is at max', async () => {
          const el = await fixture<WaNumberInput>(html` <wa-number-input value="10" max="10"></wa-number-input> `);
          const incrementButton = el.shadowRoot!.querySelector<HTMLButtonElement>('[part~="stepper-increment"]')!;

          expect(incrementButton.disabled).to.be.true;
        });

        it('should disable decrement button when value is at min', async () => {
          const el = await fixture<WaNumberInput>(html` <wa-number-input value="0" min="0"></wa-number-input> `);
          const decrementButton = el.shadowRoot!.querySelector<HTMLButtonElement>('[part~="stepper-decrement"]')!;

          expect(decrementButton.disabled).to.be.true;
        });
      });

      describe('min and max constraints', () => {
        it('should be invalid when value is below min', async () => {
          const el = await fixture<WaNumberInput>(html` <wa-number-input min="5" value="3"></wa-number-input> `);

          if (fixture.type === 'ssr-client-hydrated') {
            return;
          }

          expect(el.checkValidity()).to.be.false;
        });

        it('should be invalid when value is above max', async () => {
          const el = await fixture<WaNumberInput>(html` <wa-number-input max="10" value="15"></wa-number-input> `);

          if (fixture.type === 'ssr-client-hydrated') {
            return;
          }

          expect(el.checkValidity()).to.be.false;
        });

        it('should be valid when value is within min and max', async () => {
          const el = await fixture<WaNumberInput>(html`
            <wa-number-input min="0" max="10" value="5"></wa-number-input>
          `);
          expect(el.checkValidity()).to.be.true;
        });
      });

      it('should submit with the correct form when the form attribute changes', async () => {
        const el = await fixture<HTMLFormElement>(html`
          <div>
            <form id="f1">
              <input type="hidden" name="b" value="2" />
              <wa-button type="submit">Submit</wa-button>
            </form>
            <form id="f2">
              <input type="hidden" name="c" value="3" />
              <wa-button type="submit">Submit</wa-button>
            </form>
            <wa-number-input form="f1" name="a" value="1"></wa-number-input>
          </div>
        `);
        const form = el.querySelector<HTMLFormElement>('#f2')!;
        const input = document.querySelector('wa-number-input')!;

        input.form = 'f2';
        await input.updateComplete;

        const formData = new FormData(form);

        expect(formData.get('a')).to.equal('1');
        expect(formData.get('b')).to.be.null;
        expect(formData.get('c')).to.equal('3');
      });

      describe('keyboard interactions', () => {
        it('should increment value when ArrowUp is pressed', async () => {
          const el = await fixture<WaNumberInput>(html` <wa-number-input value="5"></wa-number-input> `);

          el.focus();
          await sendKeys({ press: 'ArrowUp' });
          await el.updateComplete;

          expect(el.value).to.equal('6');
        });

        it('should decrement value when ArrowDown is pressed', async () => {
          const el = await fixture<WaNumberInput>(html` <wa-number-input value="5"></wa-number-input> `);

          el.focus();
          await sendKeys({ press: 'ArrowDown' });
          await el.updateComplete;

          expect(el.value).to.equal('4');
        });
      });
    });
  }
});
