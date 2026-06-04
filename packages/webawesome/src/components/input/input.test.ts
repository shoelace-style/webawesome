import { aTimeout, expect, oneEvent, waitUntil } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit';
import sinon from 'sinon';
import { expectEvent } from '../../internal/test/expect-event.js';
import { fixtures } from '../../internal/test/fixture.js';
import { runFormControlBaseTests } from '../../internal/test/form-control-base-tests.js';
import { serialize } from '../../utilities/form.js';
import type WaInput from './input.js';

describe('<wa-input>', () => {
  runFormControlBaseTests('wa-input');

  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      describe('accessibility', () => {
        it('should pass accessibility tests', async () => {
          const el = await fixture<WaInput>(html`<wa-input label="Name"></wa-input>`);
          await expect(el).to.be.accessible();
        });

        it('should focus the input when clicking on the label', async () => {
          const el = await fixture<WaInput>(html`<wa-input label="Name"></wa-input>`);
          const label = el.shadowRoot!.querySelector('[part~="form-control-label"]')!;
          const focusHandler = sinon.spy();

          el.addEventListener('focus', focusHandler);
          (label as HTMLLabelElement).click();
          await waitUntil(() => focusHandler.calledOnce);

          expect(focusHandler).to.have.been.calledOnce;
        });
      });

      describe('properties', () => {
        it('should have correct default property values', async () => {
          const el = await fixture<WaInput>(html`<wa-input></wa-input>`);

          expect(el.type).to.equal('text');
          expect(el.size).to.equal('m');
          expect(el.name).to.equal(null);
          expect(el.value).to.equal(null);
          expect(el.defaultValue).to.equal(null);
          expect(el.title).to.equal('');
          expect(el.appearance).to.equal('outlined');
          expect(el.pill).to.equal(false);
          expect(el.label).to.equal('');
          expect(el.hint).to.equal('');
          expect(el.withClear).to.equal(false);
          expect(el.passwordToggle).to.equal(false);
          expect(el.passwordVisible).to.equal(false);
          expect(el.withoutSpinButtons).to.equal(false);
          expect(el.placeholder).to.equal('');
          expect(el.disabled).to.equal(false);
          expect(el.readonly).to.equal(false);
          expect(el.required).to.equal(false);
        });

        it('should reflect the title attribute to the internal input', async () => {
          const el = await fixture<WaInput>(html`<wa-input title="Test"></wa-input>`);
          const input = el.shadowRoot!.querySelector<HTMLInputElement>('input')!;
          expect(input.title).to.equal('Test');
        });

        it('should be disabled with the disabled attribute', async () => {
          const el = await fixture<WaInput>(html`<wa-input disabled></wa-input>`);
          const input = el.shadowRoot!.querySelector<HTMLInputElement>('input')!;
          expect(input.disabled).to.equal(true);
        });

        it('should reflect the readonly attribute to the internal input', async () => {
          const el = await fixture<WaInput>(html`<wa-input readonly></wa-input>`);
          const input = el.shadowRoot!.querySelector<HTMLInputElement>('input')!;
          expect(input.readOnly).to.equal(true);
        });

        it('should reflect the placeholder attribute', async () => {
          const el = await fixture<WaInput>(html`<wa-input placeholder="Enter text"></wa-input>`);
          const input = el.shadowRoot!.querySelector<HTMLInputElement>('input')!;
          expect(input.placeholder).to.equal('Enter text');
        });
      });

      describe('slots', () => {
        it('should show "has-label" class when label slot is populated', async () => {
          const el = await fixture<WaInput>(html`<wa-input><span slot="label">Name</span></wa-input>`);
          const label = el.shadowRoot!.querySelector('[part~="form-control-label"]')!;
          expect(label.classList.contains('has-label')).to.equal(true);
        });

        it('should show "has-label" class when label attribute is set', async () => {
          const el = await fixture<WaInput>(html`<wa-input label="Name"></wa-input>`);
          const label = el.shadowRoot!.querySelector('[part~="form-control-label"]')!;
          expect(label.classList.contains('has-label')).to.equal(true);
        });

        it('should not show "has-label" class when no label is provided', async () => {
          const el = await fixture<WaInput>(html`<wa-input></wa-input>`);
          const label = el.shadowRoot!.querySelector('[part~="form-control-label"]')!;
          expect(label.classList.contains('has-label')).to.equal(false);
        });

        it('should render the hint slot', async () => {
          const el = await fixture<WaInput>(html`<wa-input hint="Some hint"></wa-input>`);
          const hint = el.shadowRoot!.querySelector('[part~="hint"]')!;
          expect(hint.textContent).to.contain('Some hint');
        });
      });

      describe('events', () => {
        it('should emit input and change when the user types and blurs', async () => {
          const el = await fixture<WaInput>(html`<wa-input></wa-input>`);
          const inputHandler = sinon.spy();
          const changeHandler = sinon.spy();

          el.addEventListener('input', inputHandler);
          el.addEventListener('change', changeHandler);
          el.focus();
          await sendKeys({ type: 'abc' });
          el.blur();
          await el.updateComplete;

          expect(changeHandler).to.have.been.calledOnce;
          expect(inputHandler).to.have.been.calledThrice;
        });

        it('should not emit change or input when the value is set programmatically', async () => {
          const el = await fixture<WaInput>(html`<wa-input></wa-input>`);

          el.addEventListener('change', () => expect.fail('change should not be emitted'));
          el.addEventListener('input', () => expect.fail('input should not be emitted'));
          el.value = 'abc';

          await el.updateComplete;
        });

        it('should not emit change or input when calling setRangeText()', async () => {
          const el = await fixture<WaInput>(html`<wa-input value="hi there"></wa-input>`);

          el.addEventListener('change', () => expect.fail('change should not be emitted'));
          el.addEventListener('input', () => expect.fail('input should not be emitted'));
          el.focus();
          el.setSelectionRange(0, 2);
          el.setRangeText('hello');

          await el.updateComplete;
        });

        it('should emit wa-clear when the clear button is clicked', async () => {
          const el = await fixture<WaInput>(html`<wa-input with-clear value="hello"></wa-input>`);
          await el.updateComplete;

          const clearButton = el.shadowRoot!.querySelector<HTMLButtonElement>('[part~="clear-button"]')!;

          await expectEvent(el, 'wa-clear', () => clearButton.click());
          expect(el.value).to.equal('');
        });
      });

      describe('clearable', () => {
        it('should show the clear button when with-clear is set and input has a value', async () => {
          const el = await fixture<WaInput>(html`<wa-input with-clear value="test"></wa-input>`);
          await el.updateComplete;
          const clearButton = el.shadowRoot!.querySelector('[part~="clear-button"]');
          expect(clearButton).to.not.be.null;
        });

        it('should not show the clear button when the input is empty', async () => {
          const el = await fixture<WaInput>(html`<wa-input with-clear></wa-input>`);
          await el.updateComplete;
          const clearButton = el.shadowRoot!.querySelector('[part~="clear-button"]');
          expect(clearButton).to.be.null;
        });

        it('should not show the clear button when disabled', async () => {
          const el = await fixture<WaInput>(html`<wa-input with-clear value="test" disabled></wa-input>`);
          await el.updateComplete;
          const clearButton = el.shadowRoot!.querySelector('[part~="clear-button"]');
          expect(clearButton).to.be.null;
        });

        it('should not show the clear button when readonly', async () => {
          const el = await fixture<WaInput>(html`<wa-input with-clear value="test" readonly></wa-input>`);
          await el.updateComplete;
          const clearButton = el.shadowRoot!.querySelector('[part~="clear-button"]');
          expect(clearButton).to.be.null;
        });

        it('should clear the value and emit input and change after wa-clear', async () => {
          const el = await fixture<WaInput>(html`<wa-input with-clear value="hello"></wa-input>`);
          await el.updateComplete;

          const clearButton = el.shadowRoot!.querySelector<HTMLButtonElement>('[part~="clear-button"]')!;
          const inputHandler = sinon.spy();
          const changeHandler = sinon.spy();

          el.addEventListener('input', inputHandler);
          el.addEventListener('change', changeHandler);

          clearButton.click();
          await el.updateComplete;

          await waitUntil(() => inputHandler.calledOnce);
          expect(el.value).to.equal('');
          expect(inputHandler).to.have.been.calledOnce;
          expect(changeHandler).to.have.been.calledOnce;
        });
      });

      describe('password-toggle', () => {
        it('should show the password toggle button when type is password and password-toggle is set', async () => {
          const el = await fixture<WaInput>(html`<wa-input type="password" password-toggle></wa-input>`);
          await el.updateComplete;
          const toggleButton = el.shadowRoot!.querySelector('[part~="password-toggle-button"]');
          expect(toggleButton).to.not.be.null;
        });

        it('should toggle password visibility when the toggle button is clicked', async () => {
          const el = await fixture<WaInput>(html`<wa-input type="password" password-toggle></wa-input>`);
          await el.updateComplete;

          const toggleButton = el.shadowRoot!.querySelector<HTMLButtonElement>('[part~="password-toggle-button"]')!;
          const input = el.shadowRoot!.querySelector<HTMLInputElement>('input')!;

          expect(input.type).to.equal('password');

          toggleButton.click();
          await el.updateComplete;

          expect(input.type).to.equal('text');
          expect(el.passwordVisible).to.be.true;

          toggleButton.click();
          await el.updateComplete;

          expect(input.type).to.equal('password');
          expect(el.passwordVisible).to.be.false;
        });

        it('should not show the password toggle button when disabled', async () => {
          const el = await fixture<WaInput>(html`<wa-input type="password" password-toggle disabled></wa-input>`);
          await el.updateComplete;
          const toggleButton = el.shadowRoot!.querySelector('[part~="password-toggle-button"]');
          expect(toggleButton).to.be.null;
        });
      });

      describe('keyboard navigation', () => {
        it('should submit the form when pressing enter in a form without a submit button', async () => {
          const form = await fixture<HTMLFormElement>(html`<form><wa-input></wa-input></form>`);
          const input = form.querySelector('wa-input')!;
          const submitHandler = sinon.spy((event: SubmitEvent) => event.preventDefault());

          form.addEventListener('submit', submitHandler);
          input.focus();
          await sendKeys({ press: 'Enter' });
          await waitUntil(() => submitHandler.calledOnce);

          expect(submitHandler).to.have.been.calledOnce;
        });

        it('should prevent submission when pressing enter and canceling the keydown event', async () => {
          const form = await fixture<HTMLFormElement>(html`<form><wa-input></wa-input></form>`);
          const input = form.querySelector('wa-input')!;
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
      });

      describe('form integration', () => {
        it('should serialize its name and value with FormData', async () => {
          const form = await fixture<HTMLFormElement>(html`<form><wa-input name="a" value="1"></wa-input></form>`);
          const formData = new FormData(form);
          expect(formData.get('a')).to.equal('1');
        });

        it('should store on formData as an empty string', async () => {
          const form = await fixture<HTMLFormElement>(html`<form><wa-input name="a"></wa-input></form>`);
          const formData = new FormData(form);
          expect(formData.get('a')).to.equal('');
        });

        it('should serialize its name and value with JSON', async () => {
          const form = await fixture<HTMLFormElement>(html`<form><wa-input name="a" value="1"></wa-input></form>`);
          const json = serialize(form) as { a: '1' };
          expect(json.a).to.equal('1');
        });

        it('should not add a value to the form if disabled', async () => {
          const form = await fixture<HTMLFormElement>(
            html`<form><wa-input name="name" disabled required></wa-input></form>`,
          );
          const el = form.querySelector('wa-input')!;
          el.value = 'blah';
          await el.updateComplete;

          expect(new FormData(form).get('name')).to.equal(null);
          el.disabled = false;
          await el.updateComplete;
          expect(new FormData(form).get('name')).to.equal('blah');
        });

        it('should be present in form data when using the form attribute and located outside of a <form>', async () => {
          const el = await fixture<HTMLFormElement>(html`
            <div>
              <form id="f">
                <wa-button type="submit">Submit</wa-button>
              </form>
              <wa-input form="f" name="a" value="1"></wa-input>
            </div>
          `);
          const form = el.querySelector('form')!;
          const formData = new FormData(form);

          expect(formData.get('a')).to.equal('1');
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
              <wa-input form="f1" name="a" value="1"></wa-input>
            </div>
          `);
          const form = el.querySelector<HTMLFormElement>('#f2')!;
          const input = document.querySelector('wa-input')!;

          input.form = 'f2';
          await input.updateComplete;

          const formData = new FormData(form);

          expect(formData.get('a')).to.equal('1');
          expect(formData.get('b')).to.be.null;
          expect(formData.get('c')).to.equal('3');
        });

        it('should reset the element to its initial value', async () => {
          const form = await fixture<HTMLFormElement>(html`
            <form>
              <wa-input name="a" value="test"></wa-input>
              <wa-button type="reset">Reset</wa-button>
            </form>
          `);
          const button = form.querySelector('wa-button')!;
          const input = form.querySelector('wa-input')!;
          input.value = '1234';

          await input.updateComplete;
          setTimeout(() => button.click());
          await oneEvent(form, 'reset');
          await input.updateComplete;

          expect(input.value).to.equal('test');

          input.defaultValue = '';

          setTimeout(() => button.click());
          await oneEvent(form, 'reset');
          await input.updateComplete;

          expect(input.value).to.equal('');
        });

        it('should be invalid when the input is empty and form.reportValidity() is called', async () => {
          const form = await fixture<HTMLFormElement>(html`
            <form>
              <wa-input required value=""></wa-input>
              <wa-button type="submit">Submit</wa-button>
            </form>
          `);

          expect(form.reportValidity()).to.be.false;
        });

        it('should be invalid when the input is empty, reportValidity() is called, and the form has novalidate', async () => {
          const form = await fixture<HTMLFormElement>(html`
            <form novalidate>
              <wa-input required value=""></wa-input>
              <wa-button type="submit">Submit</wa-button>
            </form>
          `);

          expect(form.reportValidity()).to.be.false;
        });
      });

      describe('constraint validation', () => {
        it('should be valid by default', async () => {
          const el = await fixture<WaInput>(html`<wa-input></wa-input>`);
          expect(el.checkValidity()).to.be.true;
        });

        it('should be invalid when required and empty', async () => {
          const el = await fixture<WaInput>(html`<wa-input required></wa-input>`);
          expect(el.reportValidity()).to.be.false;
          expect(el.checkValidity()).to.be.false;
        });

        it('should be invalid when required and disabled is removed', async () => {
          const el = await fixture<WaInput>(html`<wa-input disabled required></wa-input>`);
          expect(el.checkValidity()).to.be.true;
          el.disabled = false;
          await el.updateComplete;
          expect(el.checkValidity()).to.be.false;
        });

        it('should be valid when required and value is set programmatically', async () => {
          const el = await fixture<WaInput>(html`<wa-input required></wa-input>`);
          expect(el.customStates.has('invalid')).to.be.true;
          el.value = 'foo';
          await el.updateComplete;
          expect(el.customStates.has('invalid')).to.be.false;
        });

        it('should be invalid when setCustomValidity() is called with a non-empty value', async () => {
          const el = await fixture<WaInput>(html`<wa-input></wa-input>`);

          el.setCustomValidity('Invalid selection');
          await el.updateComplete;

          expect(el.checkValidity()).to.be.false;
          expect(el.customStates.has('invalid')).to.be.true;
          expect(el.customStates.has('valid')).to.be.false;
          expect(el.customStates.has('user-invalid')).to.be.false;
          expect(el.customStates.has('user-valid')).to.be.false;

          el.focus();
          await sendKeys({ type: 'test' });
          await el.updateComplete;
          el.blur();
          await el.updateComplete;

          expect(el.customStates.has('user-invalid')).to.be.true;
          expect(el.customStates.has('user-valid')).to.be.false;
        });

        it('should validate against the pattern attribute', async () => {
          const el = await fixture<WaInput>(html`<wa-input required pattern="1234"></wa-input>`);

          el.focus();
          await el.updateComplete;
          expect(el.checkValidity()).to.be.false;

          await aTimeout(10);
          await sendKeys({ type: '1234' });
          await el.updateComplete;
          await aTimeout(10);

          expect(el.checkValidity()).to.be.true;
        });

        it('should be invalid when minlength is not met', async () => {
          const el = await fixture<WaInput>(html`<wa-input required minlength="3"></wa-input>`);

          el.focus();
          await el.updateComplete;
          expect(el.checkValidity()).to.be.false;

          await sendKeys({ type: '12' });
          await el.updateComplete;
          await aTimeout(10);

          expect(el.checkValidity()).to.be.false;
          expect(el.validity.tooShort).to.be.true;
        });

        it('should be invalid when maxlength is exceeded via user interaction', async () => {
          const el = await fixture<WaInput>(html`<wa-input required maxlength="3" value="Hello World"></wa-input>`);

          await el.updateComplete;

          // Programmatic values are valid until user interacts
          expect(el.checkValidity()).to.be.true;

          el.focus();
          await sendKeys({ press: 'ArrowRight' });
          await sendKeys({ press: 'Backspace' });
          await el.updateComplete;
          await aTimeout(10);

          expect(el.checkValidity()).to.be.false;
          expect(el.validity.tooLong).to.be.true;
        });
      });

      describe('CSS parts and states', () => {
        it('should receive the correct validation states when valid', async () => {
          const el = await fixture<WaInput>(html`<wa-input required value="a"></wa-input>`);

          expect(el.checkValidity()).to.be.true;
          expect(el.customStates.has('required')).to.be.true;
          expect(el.customStates.has('optional')).to.be.false;
          expect(el.customStates.has('invalid')).to.be.false;
          expect(el.customStates.has('valid')).to.be.true;
          expect(el.customStates.has('user-invalid')).to.be.false;
          expect(el.customStates.has('user-valid')).to.be.false;

          el.focus();
          await el.updateComplete;
          await sendKeys({ press: 'b' });
          await el.updateComplete;
          el.blur();
          await el.updateComplete;

          expect(el.checkValidity()).to.be.true;
          expect(el.customStates.has('user-invalid')).to.be.false;
          expect(el.customStates.has('user-valid')).to.be.true;
        });

        it('should receive the correct validation states when invalid', async () => {
          const el = await fixture<WaInput>(html`<wa-input required></wa-input>`);

          expect(el.customStates.has('required')).to.be.true;
          expect(el.customStates.has('optional')).to.be.false;
          expect(el.customStates.has('invalid')).to.be.true;
          expect(el.customStates.has('valid')).to.be.false;
          expect(el.customStates.has('user-invalid')).to.be.false;
          expect(el.customStates.has('user-valid')).to.be.false;

          el.focus();
          await el.updateComplete;
          await sendKeys({ press: 'a' });
          await sendKeys({ press: 'Backspace' });
          await el.updateComplete;
          el.blur();
          await el.updateComplete;

          expect(el.customStates.has('user-invalid')).to.be.true;
          expect(el.customStates.has('user-valid')).to.be.false;
        });

        it('should receive validation states even when novalidate is used on the parent form', async () => {
          const el = await fixture<HTMLFormElement>(html`<form novalidate><wa-input required></wa-input></form>`);
          const input = el.querySelector<WaInput>('wa-input')!;

          expect(input.customStates.has('required')).to.be.true;
          expect(input.customStates.has('optional')).to.be.false;
          expect(input.customStates.has('invalid')).to.be.true;
          expect(input.customStates.has('valid')).to.be.false;
          expect(input.customStates.has('user-invalid')).to.be.false;
          expect(input.customStates.has('user-valid')).to.be.false;
        });

        it('should have the blank state when the input is empty', async () => {
          const el = await fixture<WaInput>(html`<wa-input></wa-input>`);
          await el.updateComplete;
          expect(el.customStates.has('blank')).to.be.true;
        });

        it('should not have the blank state when the input has a value', async () => {
          const el = await fixture<WaInput>(html`<wa-input value="hello"></wa-input>`);
          await el.updateComplete;
          expect(el.customStates.has('blank')).to.be.false;
        });
      });

      describe('when type="number"', () => {
        it('should be valid when the value is within the boundary of a step', async () => {
          const el = await fixture<WaInput>(html`<wa-input type="number" step=".5" value="1.5"></wa-input>`);
          expect(el.checkValidity()).to.be.true;
        });

        it('should be invalid when the value is not within the boundary of a step', async () => {
          const el = await fixture<WaInput>(html`<wa-input type="number" step=".5" value="1.25"></wa-input>`);

          if (fixture.type === 'ssr-client-hydrated') {
            return;
          }

          expect(el.checkValidity()).to.be.false;
        });

        it('should update validity when step changes', async () => {
          const el = await fixture<WaInput>(html`<wa-input type="number" step=".5" value="1.5"></wa-input>`);
          expect(el.checkValidity()).to.be.true;

          el.step = 1;
          await el.updateComplete;

          if (fixture.type === 'ssr-client-hydrated') {
            return;
          }

          expect(el.checkValidity()).to.be.false;
        });

        it('should increment by step when stepUp() is called', async () => {
          const el = await fixture<WaInput>(html`<wa-input type="number" step="2" value="2"></wa-input>`);

          el.stepUp();
          await el.updateComplete;
          expect(el.value).to.equal('4');
        });

        it('should decrement by step when stepDown() is called', async () => {
          const el = await fixture<WaInput>(html`<wa-input type="number" step="2" value="2"></wa-input>`);

          el.stepDown();
          await el.updateComplete;
          expect(el.value).to.equal('0');
        });

        it('should not emit input or change when stepUp() is called programmatically', async () => {
          const el = await fixture<WaInput>(html`<wa-input type="number" step="2" value="2"></wa-input>`);

          el.addEventListener('change', () => expect.fail('change should not be emitted'));
          el.addEventListener('input', () => expect.fail('input should not be emitted'));
          el.stepUp();

          await el.updateComplete;
        });

        it('should not emit input or change when stepDown() is called programmatically', async () => {
          const el = await fixture<WaInput>(html`<wa-input type="number" step="2" value="2"></wa-input>`);

          el.addEventListener('change', () => expect.fail('change should not be emitted'));
          el.addEventListener('input', () => expect.fail('input should not be emitted'));
          el.stepDown();

          await el.updateComplete;
        });

        it('should return an empty string when the value is set to an invalid number', async () => {
          const el = await fixture<WaInput>(html`<wa-input type="number"></wa-input>`);

          el.value = 'not-a-valid-number';
          await el.updateComplete;

          expect(el.value).to.equal('');
        });

        it('should return an empty string when an invalid value is provided via the value attribute', async () => {
          const el = await fixture<WaInput>(html`<wa-input type="number" value="not-a-valid-number"></wa-input>`);
          await el.updateComplete;

          expect(el.value).to.equal('');
        });
      });

      describe('when type="date"', () => {
        it('should return an empty string when the value is set to an invalid date', async () => {
          const el = await fixture<WaInput>(html`<wa-input type="date"></wa-input>`);

          el.value = 'not-a-valid-date';
          await el.updateComplete;

          expect(el.value).to.equal('');
        });
      });

      describe('when type="time"', () => {
        it('should return an empty string when the value is set to an invalid time', async () => {
          const el = await fixture<WaInput>(html`<wa-input type="time"></wa-input>`);

          el.value = 'not-a-valid-time';
          await el.updateComplete;

          expect(el.value).to.equal('');
        });
      });

      describe('when type="datetime-local"', () => {
        it('should return an empty string when the value is set to an invalid datetime', async () => {
          const el = await fixture<WaInput>(html`<wa-input type="datetime-local"></wa-input>`);

          el.value = 'not-a-valid-datetime';
          await el.updateComplete;

          expect(el.value).to.equal('');
        });
      });

      describe('when using spellcheck', () => {
        it('should enable spellcheck when no attribute is present', async () => {
          const el = await fixture<WaInput>(html`<wa-input></wa-input>`);
          const input = el.shadowRoot!.querySelector<HTMLInputElement>('input')!;
          expect(input.getAttribute('spellcheck')).to.equal('true');
          expect(input.spellcheck).to.be.true;
        });

        it('should enable spellcheck when set to "true"', async () => {
          const el = await fixture<WaInput>(html`<wa-input spellcheck="true"></wa-input>`);
          const input = el.shadowRoot!.querySelector<HTMLInputElement>('input')!;
          expect(input.getAttribute('spellcheck')).to.equal('true');
          expect(input.spellcheck).to.be.true;
        });

        it('should disable spellcheck when set to "false"', async () => {
          const el = await fixture<WaInput>(html`<wa-input spellcheck="false"></wa-input>`);
          const input = el.shadowRoot!.querySelector<HTMLInputElement>('input')!;
          expect(input.getAttribute('spellcheck')).to.equal('false');
          expect(input.spellcheck).to.be.false;
        });
      });

      describe('methods', () => {
        it('should set replacement text in the correct location with setRangeText()', async () => {
          const el = await fixture<WaInput>(html`<wa-input value="test"></wa-input>`);

          el.focus();
          el.setSelectionRange(1, 3);
          el.setRangeText('boom');
          await el.updateComplete;
          expect(el.value).to.equal('tboomt'); // cspell:disable-line
        });
      });
    });
  }
});
