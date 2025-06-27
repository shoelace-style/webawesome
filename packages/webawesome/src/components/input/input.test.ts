// eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
import { aTimeout, expect, oneEvent, waitUntil } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands'; // must come from the same module
import { html } from 'lit';
import sinon from 'sinon';
import { serialize } from '../../../dist-cdn/webawesome.js';
import { fixtures } from '../../internal/test/fixture.js';
import { runFormControlBaseTests } from '../../internal/test/form-control-base-tests.js';
import { isSafari } from '../../internal/test/pointer-utilities.js';
import type WaInput from './input.js';

describe('<wa-input>', () => {
  runFormControlBaseTests('wa-input');

  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      it('should pass accessibility tests', async () => {
        const el = await fixture<WaInput>(html` <wa-input label="Name"></wa-input> `);
        await expect(el).to.be.accessible();
      });

      it('default properties', async () => {
        const el = await fixture<WaInput>(html` <wa-input></wa-input> `);

        expect(el.type).to.equal('text');
        expect(el.size).to.equal('medium');
        expect(el.name).to.equal(null);
        expect(el.value).to.equal(null);
        expect(el.defaultValue).to.equal(null);
        expect(el.title).to.equal('');
        expect(el.appearance).to.equal('outlined'); // Added
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
      });

      it('should have title if title attribute is set', async () => {
        const el = await fixture<WaInput>(html` <wa-input title="Test"></wa-input> `);
        await el.updateComplete;
        const input = el.shadowRoot!.querySelector<HTMLInputElement>('input')!;
        expect(input.title).to.equal('Test');
      });

      it('should be disabled with the disabled attribute', async () => {
        const el = await fixture<WaInput>(html` <wa-input disabled></wa-input> `);
        await el.updateComplete;
        const input = el.shadowRoot!.querySelector<HTMLInputElement>('input')!;
        expect(input.disabled).to.equal(true);
      });

      it('should focus the input when clicking on the label', async () => {
        const el = await fixture<WaInput>(html` <wa-input label="Name"></wa-input> `);
        const label = el.shadowRoot!.querySelector('[part~="form-control-label"]')!;
        const focusHandler = sinon.spy();

        el.addEventListener('focus', focusHandler);
        (label as HTMLLabelElement).click();
        await waitUntil(() => focusHandler.calledOnce);

        expect(focusHandler).to.have.been.calledOnce;
      });

      describe('when using constraint validation', () => {
        it('should be valid by default', async () => {
          const el = await fixture<WaInput>(html` <wa-input></wa-input> `);
          expect(el.checkValidity()).to.be.true;
        });

        it('should be invalid when required and empty', async () => {
          const el = await fixture<WaInput>(html` <wa-input required></wa-input> `);
          expect(el.reportValidity()).to.be.false;
          expect(el.checkValidity()).to.be.false;
        });

        it('should be invalid when required and disabled is removed', async () => {
          const el = await fixture<WaInput>(html` <wa-input disabled required></wa-input>`);
          // Should be valid while disabled
          expect(el.checkValidity()).to.be.true;
          el.disabled = false;
          await el.updateComplete;
          // Should be invalid while enabled
          expect(el.checkValidity()).to.be.false;
        });

        it('should not add a value to the form if disabled', async () => {
          const form = await fixture<HTMLFormElement>(
            html` <form><wa-input name="name" disabled required></wa-input></form>`,
          );
          const el = form.querySelector('wa-input')!;
          el.value = 'blah';
          await el.updateComplete;

          expect(new FormData(form).get('name')).to.equal(null);
          el.disabled = false;
          await el.updateComplete;
          // Should be invalid while enabled
          expect(new FormData(form).get('name')).to.equal('blah');
        });

        it('should receive the correct validation attributes ("states") when valid', async () => {
          const el = await fixture<WaInput>(html` <wa-input required value="a"></wa-input> `);

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

        it('should receive the correct validation attributes ("states") when invalid', async () => {
          const el = await fixture<WaInput>(html` <wa-input required></wa-input> `);

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

        it('should receive validation attributes ("states") even when novalidate is used on the parent form', async () => {
          const el = await fixture<HTMLFormElement>(html` <form novalidate><wa-input required></wa-input></form> `);
          const input = el.querySelector<WaInput>('wa-input')!;

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
          const form = await fixture<HTMLFormElement>(html` <form><wa-input name="a" value="1"></wa-input></form> `);
          const formData = new FormData(form);
          expect(formData.get('a')).to.equal('1');
        });

        it('should serialize its name and value with JSON', async () => {
          const form = await fixture<HTMLFormElement>(html` <form><wa-input name="a" value="1"></wa-input></form> `);
          const json = serialize(form) as { a: '1' };
          expect(json.a).to.equal('1');
        });

        it('should submit the form when pressing enter in a form without a submit button', async () => {
          const form = await fixture<HTMLFormElement>(html` <form><wa-input></wa-input></form> `);
          const input = form.querySelector('wa-input')!;
          const submitHandler = sinon.spy((event: SubmitEvent) => event.preventDefault());

          form.addEventListener('submit', submitHandler);
          input.focus();
          await sendKeys({ press: 'Enter' });
          await waitUntil(() => submitHandler.calledOnce);

          expect(submitHandler).to.have.been.calledOnce;
        });

        it('should prevent submission when pressing enter in an input and canceling the keydown event', async () => {
          const form = await fixture<HTMLFormElement>(html` <form><wa-input></wa-input></form> `);
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

        it('should be invalid when setCustomValidity() is called with a non-empty value', async () => {
          const input = await fixture<HTMLFormElement>(html` <wa-input></wa-input> `);

          input.setCustomValidity('Invalid selection');
          await input.updateComplete;

          expect(input.checkValidity()).to.be.false;
          expect(input.customStates.has('invalid')).to.be.true;
          expect(input.customStates.has('valid')).to.be.false;
          expect(input.customStates.has('user-invalid')).to.be.false;
          expect(input.customStates.has('user-valid')).to.be.false;

          input.focus();
          await sendKeys({ type: 'test' });
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
              <wa-input form="f" name="a" value="1"></wa-input>
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
      });

      describe('when calling HTMLFormElement.reportValidity()', () => {
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

        it('should be invalid when a native input is empty and form.reportValidity() is called', async () => {
          const form = await fixture<HTMLFormElement>(html`
            <form>
              <input required value="" />
              <wa-button type="submit">Submit</wa-button>
            </form>
          `);

          expect(form.reportValidity()).to.be.false;
        });
      });

      describe('when the value changes', () => {
        it('should emit change and input when the user types in the input', async () => {
          const el = await fixture<WaInput>(html` <wa-input></wa-input> `);
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
          const el = await fixture<WaInput>(html` <wa-input></wa-input> `);

          el.addEventListener('change', () => expect.fail('change should not be emitted'));
          el.addEventListener('input', () => expect.fail('input should not be emitted'));
          el.value = 'abc';

          await el.updateComplete;
        });

        it('should not emit change or input when calling setRangeText()', async () => {
          const el = await fixture<WaInput>(html` <wa-input value="hi there"></wa-input> `);

          el.addEventListener('change', () => expect.fail('change should not be emitted'));
          el.addEventListener('input', () => expect.fail('input should not be emitted'));
          el.focus();
          el.setSelectionRange(0, 2);
          el.setRangeText('hello');

          await el.updateComplete;
        });
      });

      describe('when type="number"', () => {
        it('should be valid when the value is within the boundary of a step', async () => {
          const el = await fixture<WaInput>(html` <wa-input type="number" step=".5" value="1.5"></wa-input> `);
          expect(el.checkValidity()).to.be.true;
        });

        it('should be invalid when the value is not within the boundary of a step', async () => {
          const el = await fixture<WaInput>(html` <wa-input type="number" step=".5" value="1.25"></wa-input> `);

          // @TODO: Figure out why this fails in SSR.
          if (fixture.type === 'ssr-client-hydrated') {
            return;
          }

          expect(el.checkValidity()).to.be.false;
        });

        it('should update validity when step changes', async () => {
          const el = await fixture<WaInput>(html` <wa-input type="number" step=".5" value="1.5"></wa-input> `);
          expect(el.checkValidity()).to.be.true;

          el.step = 1;
          await el.updateComplete;

          // @TODO: Figure out why this fails in SSR.
          if (fixture.type === 'ssr-client-hydrated') {
            return;
          }

          expect(el.checkValidity()).to.be.false;
        });

        it('should increment by step when stepUp() is called', async () => {
          const el = await fixture<WaInput>(html` <wa-input type="number" step="2" value="2"></wa-input> `);

          el.stepUp();
          await el.updateComplete;
          expect(el.value).to.equal('4');
        });

        it('should decrement by step when stepDown() is called', async () => {
          const el = await fixture<WaInput>(html` <wa-input type="number" step="2" value="2"></wa-input> `);

          el.stepDown();
          await el.updateComplete;
          expect(el.value).to.equal('0');
        });

        it('should not emit input or change when stepUp() is called programmatically', async () => {
          const el = await fixture<WaInput>(html` <wa-input type="number" step="2" value="2"></wa-input> `);

          el.addEventListener('change', () => expect.fail('change should not be emitted'));
          el.addEventListener('input', () => expect.fail('input should not be emitted'));
          el.stepUp();

          await el.updateComplete;
        });

        it('should not emit input and change when stepDown() is called programmatically', async () => {
          const el = await fixture<WaInput>(html` <wa-input type="number" step="2" value="2"></wa-input> `);

          el.addEventListener('change', () => expect.fail('change should not be emitted'));
          el.addEventListener('input', () => expect.fail('input should not be emitted'));
          el.stepDown();

          await el.updateComplete;
        });
      });

      describe('when using spellcheck', () => {
        it('should enable spellcheck when no attribute is present', async () => {
          const el = await fixture<WaInput>(html` <wa-input></wa-input> `);
          const input = el.shadowRoot!.querySelector<HTMLInputElement>('input')!;
          expect(input.getAttribute('spellcheck')).to.equal('true');
          expect(input.spellcheck).to.be.true;
        });

        it('should enable spellcheck when set to "true"', async () => {
          const el = await fixture<WaInput>(html` <wa-input spellcheck="true"></wa-input> `);
          const input = el.shadowRoot!.querySelector<HTMLInputElement>('input')!;
          expect(input.getAttribute('spellcheck')).to.equal('true');
          expect(input.spellcheck).to.be.true;
        });

        it('should disable spellcheck when set to "false"', async () => {
          const el = await fixture<WaInput>(html` <wa-input spellcheck="false"></wa-input> `);
          const input = el.shadowRoot!.querySelector<HTMLInputElement>('input')!;
          expect(input.getAttribute('spellcheck')).to.equal('false');
          expect(input.spellcheck).to.be.false;
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

      describe('when using the setRangeText() function', () => {
        it('should set replacement text in the correct location', async () => {
          const el = await fixture<WaInput>(html` <wa-input value="test"></wa-input> `);

          el.focus();
          el.setSelectionRange(1, 3);
          el.setRangeText('boom');
          await el.updateComplete;
          expect(el.value).to.equal('tboomt'); // cspell:disable-line
        });
      });

      it('Should be invalid if the pattern is invalid', async () => {
        const el = await fixture<WaInput>(html` <wa-input required pattern="1234"></wa-input> `);

        el.input.focus();
        await el.updateComplete;
        expect(el.checkValidity()).to.be.false;

        await aTimeout(10);
        await sendKeys({ type: '1234' });
        await el.updateComplete;
        await aTimeout(10);

        // For some reason this is only required in Safari.
        if (isSafari) {
          el.setCustomValidity('');
        }

        expect(el.checkValidity()).to.be.true;
      });

      it('Should be invalid if minlength is not met', async () => {
        const el = await fixture<WaInput>(html` <wa-input required minlength="3"></wa-input> `);

        el.input.focus();
        await el.updateComplete;
        expect(el.checkValidity()).to.be.false;

        await sendKeys({ type: '12' });
        await el.updateComplete;
        await aTimeout(10);

        expect(el.checkValidity()).to.be.false;
        expect(el.validity.tooShort).to.be.true;
      });

      it('Should be invalid if maxlength is not met', async () => {
        const el = await fixture<WaInput>(html` <wa-input required maxlength="3" value="Hello World"></wa-input> `);

        await el.updateComplete;

        // There's a fun problem around programmaticly setting values and default values from attributes.
        // The TLDR is this input is valid, until the user starts typing.
        expect(el.checkValidity()).to.be.true;

        el.input.focus();
        await sendKeys({ press: 'ArrowRight' });
        await sendKeys({ press: 'Backspace' });
        await el.updateComplete;
        await aTimeout(10);

        expect(el.checkValidity()).to.be.false;
        expect(el.validity.tooLong).to.be.true;
      });
    });
  }
});
