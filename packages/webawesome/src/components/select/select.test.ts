import { aTimeout, expect, waitUntil } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit';
import sinon from 'sinon';
import { fixtures } from '../../internal/test/fixture.js';
import { runFormControlBaseTests } from '../../internal/test/form-control-base-tests.js';
import { clickOnElement } from '../../internal/test/pointer-utilities.js';
import { serialize } from '../../utilities/form.js';
import type WaOption from '../option/option.js';
import type WaSelect from './select.js';

describe('<wa-select>', () => {
  runFormControlBaseTests('wa-select');

  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      describe('accessibility', () => {
        it('should pass accessibility tests when closed', async () => {
          await customElements.whenDefined('wa-option');
          const select = await fixture<WaSelect>(html`
            <wa-select label="Select one">
              <wa-option value="option-1">Option 1</wa-option>
              <wa-option value="option-2">Option 2</wa-option>
              <wa-option value="option-3">Option 3</wa-option>
            </wa-select>
          `);
          await expect(select).to.be.accessible();
        });

        it('should pass accessibility tests when open', async () => {
          const select = await fixture<WaSelect>(html`
            <wa-select label="Select one">
              <wa-option value="option-1">Option 1</wa-option>
              <wa-option value="option-2">Option 2</wa-option>
              <wa-option value="option-3">Option 3</wa-option>
            </wa-select>
          `);

          await select.show();
          await expect(select).to.be.accessible();
        });
      });

      it('should be disabled with the disabled attribute', async () => {
        const el = await fixture<WaSelect>(html`
          <wa-select disabled>
            <wa-option value="option-1">Option 1</wa-option>
            <wa-option value="option-2">Option 2</wa-option>
            <wa-option value="option-3">Option 3</wa-option>
          </wa-select>
        `);
        expect(el.displayInput.disabled).to.be.true;
      });

      it('should show a placeholder when no options are selected', async () => {
        const el = await fixture<WaSelect>(html`
          <wa-select placeholder="Select one">
            <wa-option value="option-1">Option 1</wa-option>
            <wa-option value="option-2">Option 2</wa-option>
            <wa-option value="option-3">Option 3</wa-option>
          </wa-select>
        `);
        const displayInput = el.shadowRoot!.querySelector<HTMLInputElement>('[part~="display-input"]')!;

        expect(getComputedStyle(displayInput).opacity).to.not.equal('0');
        expect(displayInput.placeholder).to.equal('Select one');
      });

      it('should show a placeholder when no options are selected and multiple is set', async () => {
        const el = await fixture<WaSelect>(html`
          <wa-select placeholder="Select a few" multiple>
            <wa-option value="option-1">Option 1</wa-option>
            <wa-option value="option-2">Option 2</wa-option>
            <wa-option value="option-3">Option 3</wa-option>
          </wa-select>
        `);
        const displayInput = el.shadowRoot!.querySelector<HTMLInputElement>('[part~="display-input"]')!;

        expect(getComputedStyle(displayInput).opacity).to.not.equal('0');
        expect(displayInput.placeholder).to.equal('Select a few');
      });

      it('should not allow selection when the option is disabled', async () => {
        const el = await fixture<WaSelect>(html`
          <wa-select value="option-1">
            <wa-option value="option-1">Option 1</wa-option>
            <wa-option value="option-2" disabled>Option 2</wa-option>
          </wa-select>
        `);
        const disabledOption = el.querySelector('wa-option[disabled]')!;

        await el.show();
        await clickOnElement(disabledOption);
        await el.updateComplete;

        expect(el.value).to.equal('option-1');
      });

      it('should focus the select when clicking on the label', async () => {
        const el = await fixture<WaSelect>(html`
          <wa-select label="Select One">
            <wa-option value="option-1">Option 1</wa-option>
            <wa-option value="option-2">Option 2</wa-option>
            <wa-option value="option-3">Option 3</wa-option>
          </wa-select>
        `);
        const label = el.shadowRoot!.querySelector('[part~="form-control-label"]')!;
        const submitHandler = sinon.spy();

        el.addEventListener('focus', submitHandler);
        (label as HTMLLabelElement).click();
        await waitUntil(() => submitHandler.calledOnce);

        expect(submitHandler).to.have.been.calledOnce;
      });

      describe('when the value changes', () => {
        it('should emit change when the value is changed with the mouse', async () => {
          const el = await fixture<WaSelect>(html`
            <wa-select value="option-1">
              <wa-option value="option-1">Option 1</wa-option>
              <wa-option value="option-2">Option 2</wa-option>
              <wa-option value="option-3">Option 3</wa-option>
            </wa-select>
          `);

          expect(el.value).to.equal('option-1');
          expect(el.defaultValue).to.equal('option-1');
          expect(el.displayInput.value).to.equal('Option 1');

          const secondOption = el.querySelectorAll<WaOption>('wa-option')[1];
          const changeHandler = sinon.spy();
          const inputHandler = sinon.spy();

          el.addEventListener('change', changeHandler);
          el.addEventListener('input', inputHandler);

          await el.show();
          await clickOnElement(secondOption);
          await el.updateComplete;

          expect(changeHandler).to.have.been.calledOnce;
          expect(inputHandler).to.have.been.calledOnce;
          expect(el.value).to.equal('option-2');
        });

        it('should emit change and input when the value is changed with the keyboard', async () => {
          const el = await fixture<WaSelect>(html`
            <wa-select value="option-1">
              <wa-option value="option-1">Option 1</wa-option>
              <wa-option value="option-2">Option 2</wa-option>
              <wa-option value="option-3">Option 3</wa-option>
            </wa-select>
          `);
          const changeHandler = sinon.spy();
          const inputHandler = sinon.spy();

          el.addEventListener('change', changeHandler);
          el.addEventListener('input', inputHandler);

          el.focus();
          await el.updateComplete;
          await sendKeys({ press: ' ' }); // open the dropdown
          await aTimeout(500); // wait for the dropdown to open
          await sendKeys({ press: 'ArrowDown' }); // move selection to the second option
          await el.updateComplete;
          await sendKeys({ press: 'ArrowDown' }); // move selection to the third option
          await el.updateComplete;
          el.focus(); // For some reason, the browser loses focus before we press enter. Refocus the select.
          await sendKeys({ press: 'Enter' }); // commit the selection
          await el.updateComplete;

          expect(changeHandler).to.have.been.calledOnce;
          expect(inputHandler).to.have.been.calledOnce;
          expect(el.value).to.equal('option-3');
        });

        it('should not emit change or input when the value is changed programmatically', async () => {
          const el = await fixture<WaSelect>(html`
            <wa-select value="option-1">
              <wa-option value="option-1">Option 1</wa-option>
              <wa-option value="option-2">Option 2</wa-option>
              <wa-option value="option-3">Option 3</wa-option>
            </wa-select>
          `);

          el.addEventListener('change', () => expect.fail('change should not be emitted'));
          el.addEventListener('input', () => expect.fail('input should not be emitted'));
          el.value = 'option-2';

          await el.updateComplete;
        });

        it('should emit change and input with the correct validation message when the value changes', async () => {
          const el = await fixture<WaSelect>(html`
            <wa-select required>
              <wa-option value="option-1">Option 1</wa-option>
              <wa-option value="option-2">Option 2</wa-option>
              <wa-option value="option-3">Option 3</wa-option>
            </wa-select>
          `);
          const option2 = el.querySelectorAll('wa-option')[1];
          const handler = sinon.spy((event: CustomEvent) => {
            if (el.validationMessage) {
              expect.fail(`Validation message should be empty when ${event.type} is emitted and a value is set`);
            }
          });

          el.addEventListener('change', handler);
          el.addEventListener('input', handler);

          await clickOnElement(el);
          await aTimeout(500);
          await clickOnElement(option2);
          await el.updateComplete;

          expect(handler).to.be.calledTwice;
        });
      });

      // This can happen in on Microsoft Edge auto-filling an associated input element in the same form
      // https://github.com/shoelace-style/shoelace/issues/2117
      it('should not throw on incomplete events', async () => {
        const el = await fixture<WaSelect>(html`
          <wa-select required>
            <wa-option value="option-1">Option 1</wa-option>
          </wa-select>
        `);

        const event = new KeyboardEvent('keydown');
        Object.defineProperty(event, 'target', { writable: false, value: el });
        Object.defineProperty(event, 'key', { writable: false, value: undefined });

        /**
         * If Edge does autofill, it creates a broken KeyboardEvent
         * which is missing the key value.
         * Using the normal dispatch mechanism does not allow to do this
         * Thus passing the event directly to the private method for testing
         *
         * @ts-expect-error - private property */
        el.handleDocumentKeyDown(event);
      });

      it('should open the listbox when any letter key is pressed with wa-select is on focus', async () => {
        const el = await fixture<WaSelect>(html`
          <wa-select>
            <wa-option value="option-1">Option 1</wa-option>
            <wa-option value="option-2">Option 2</wa-option>
            <wa-option value="option-3">Option 3</wa-option>
          </wa-select>
        `);
        const displayInput = el.shadowRoot!.querySelector<HTMLSelectElement>('.display-input')!;

        el.focus();
        await sendKeys({ press: 'r' });
        await el.updateComplete;

        expect(displayInput.getAttribute('aria-expanded')).to.equal('true');
      });

      it('should not open the listbox when ctrl + R is pressed with wa-select is on focus', async () => {
        const el = await fixture<WaSelect>(html`
          <wa-select>
            <wa-option value="option-1">Option 1</wa-option>
            <wa-option value="option-2">Option 2</wa-option>
            <wa-option value="option-3">Option 3</wa-option>
          </wa-select>
        `);
        const displayInput = el.shadowRoot!.querySelector<HTMLSelectElement>('.display-input')!;

        el.focus();
        await sendKeys({ down: 'Control' });
        await sendKeys({ press: 'r' });
        await sendKeys({ up: 'Control' });
        await el.updateComplete;
        expect(displayInput.getAttribute('aria-expanded')).to.equal('false');
      });

      describe('when using constraint validation', () => {
        it('should be valid by default', async () => {
          const el = await fixture<HTMLFormElement>(html`
            <form>
              <wa-select>
                <wa-option value="option-1">Option 1</wa-option>
                <wa-option value="option-2">Option 2</wa-option>
                <wa-option value="option-3">Option 3</wa-option>
              </wa-select>
            </form>
          `);
          const select = el.querySelector<WaSelect>('wa-select')!;
          expect(select.checkValidity()).to.be.true;
        });

        it('should be invalid when required and empty', async () => {
          const el = await fixture<HTMLFormElement>(html`
            <form>
              <wa-select required>
                <wa-option value="option-1">Option 1</wa-option>
                <wa-option value="option-2">Option 2</wa-option>
                <wa-option value="option-3">Option 3</wa-option>
              </wa-select>
            </form>
          `);
          const select = el.querySelector<WaSelect>('wa-select')!;
          expect(select.checkValidity()).to.be.false;
        });

        it('should focus on the displayInput when constraint validation occurs', async () => {
          const el = await fixture<HTMLFormElement>(html`
            <form>
              <wa-select required>
                <wa-option value="option-1">Option 1</wa-option>
                <wa-option value="option-2">Option 2</wa-option>
                <wa-option value="option-3">Option 3</wa-option>
              </wa-select>
            </form>
          `);
          const select = el.querySelector<WaSelect>('wa-select')!;
          el.requestSubmit();
          expect(select.shadowRoot!.activeElement).to.equal(select.displayInput);
        });

        it('should receive the correct validation attributes ("states") when valid', async () => {
          const el = await fixture<WaSelect>(html`
            <wa-select label="Select one" required value="option-1">
              <wa-option value="option-1">Option 1</wa-option>
              <wa-option value="option-2">Option 2</wa-option>
              <wa-option value="option-3">Option 3</wa-option>
            </wa-select>
          `);
          const secondOption = el.querySelectorAll('wa-option')[1];

          expect(el.checkValidity()).to.be.true;
          expect(el.customStates.has('required')).to.be.true;
          expect(el.customStates.has('optional')).to.be.false;
          expect(el.customStates.has('invalid')).to.be.false;
          expect(el.customStates.has('valid')).to.be.true;
          expect(el.customStates.has('user-invalid')).to.be.false;
          expect(el.customStates.has('user-valid')).to.be.false;

          await el.show();
          await clickOnElement(secondOption);
          await el.updateComplete;
          el.blur();
          await el.updateComplete;

          expect(el.checkValidity()).to.be.true;
          expect(el.customStates.has('user-invalid')).to.be.false;
          expect(el.customStates.has('user-valid')).to.be.true;
        });

        it('should receive the correct validation attributes ("states") when invalid', async () => {
          const el = await fixture<WaSelect>(html`
            <wa-select label="Select one" required>
              <wa-option value="option-1">Option 1</wa-option>
              <wa-option value="option-2">Option 2</wa-option>
              <wa-option value="option-3">Option 3</wa-option>
            </wa-select>
          `);
          const secondOption = el.querySelectorAll('wa-option')[1];

          expect(el.customStates.has('required')).to.be.true;
          expect(el.customStates.has('optional')).to.be.false;
          expect(el.customStates.has('invalid')).to.be.true;
          expect(el.customStates.has('valid')).to.be.false;
          expect(el.customStates.has('user-invalid')).to.be.false;
          expect(el.customStates.has('user-valid')).to.be.false;

          await el.show();
          await clickOnElement(secondOption);
          el.value = '';
          await el.updateComplete;
          el.blur();
          await el.updateComplete;

          expect(el.customStates.has('user-invalid')).to.be.true;
          expect(el.customStates.has('user-valid')).to.be.false;
        });

        it('should receive validation attributes ("states") even when novalidate is used on the parent form', async () => {
          const el = await fixture<HTMLFormElement>(html`
            <form novalidate>
              <wa-select required>
                <wa-option value="option-1">Option 1</wa-option>
                <wa-option value="option-2">Option 2</wa-option>
                <wa-option value="option-3">Option 3</wa-option>
              </wa-select>
            </form>
          `);
          const select = el.querySelector<WaSelect>('wa-select')!;

          expect(select.customStates.has('required')).to.be.true;
          expect(select.customStates.has('optional')).to.be.false;
          expect(select.customStates.has('invalid')).to.be.true;
          expect(select.customStates.has('valid')).to.be.false;
          expect(select.customStates.has('user-invalid')).to.be.false;
          expect(select.customStates.has('user-valid')).to.be.false;
        });
      });

      describe('when submitting a form', () => {
        it('should serialize its name and value with FormData', async () => {
          const form = await fixture<HTMLFormElement>(html`
            <form>
              <wa-select name="a" value="option-1">
                <wa-option value="option-1">Option 1</wa-option>
                <wa-option value="option-2">Option 2</wa-option>
                <wa-option value="option-3">Option 3</wa-option>
              </wa-select>
            </form>
          `);
          const formData = new FormData(form);
          expect(formData.get('a')).to.equal('option-1');
        });

        it('should serialize its name and value in FormData when multiple options are selected', async () => {
          const form = await fixture<HTMLFormElement>(html`
            <form>
              <wa-select name="a" multiple>
                <wa-option value="option-1">Option 1</wa-option>
                <wa-option value="option-2" selected>Option 2</wa-option>
                <wa-option value="option-3" selected>Option 3</wa-option>
              </wa-select>
            </form>
          `);
          const formData = new FormData(form);
          expect(formData.getAll('a')).to.include('option-2');
          expect(formData.getAll('a')).to.include('option-3');
        });

        it('should serialize its name and value in JSON', async () => {
          const form = await fixture<HTMLFormElement>(html`
            <form>
              <wa-select name="a" value="option-1">
                <wa-option value="option-1">Option 1</wa-option>
                <wa-option value="option-2">Option 2</wa-option>
                <wa-option value="option-3">Option 3</wa-option>
              </wa-select>
            </form>
          `);
          const json = serialize(form);
          expect(json.a).to.equal('option-1');
        });

        it('should serialize its name and value in JSON when multiple options are selected', async () => {
          const form = await fixture<HTMLFormElement>(html`
            <form>
              <wa-select name="a" multiple>
                <wa-option value="option-1">Option 1</wa-option>
                <wa-option value="option-2" selected>Option 2</wa-option>
                <wa-option value="option-3" selected>Option 3</wa-option>
              </wa-select>
            </form>
          `);

          const json = serialize(form);
          expect(JSON.stringify(json)).to.equal(JSON.stringify({ a: ['option-2', 'option-3'] }));
        });

        it('should be present in form data when using the form attribute and located outside of a <form>', async () => {
          const el = await fixture<HTMLFormElement>(html`
            <div>
              <form id="f">
                <wa-button type="submit">Submit</wa-button>
              </form>
              <wa-select form="f" name="a" value="option-1">
                <wa-option value="option-1">Option 1</wa-option>
                <wa-option value="option-2">Option 2</wa-option>
                <wa-option value="option-3">Option 3</wa-option>
              </wa-select>
            </div>
          `);
          const form = el.querySelector('form')!;
          const formData = new FormData(form);

          expect(formData.get('a')).to.equal('option-1');
        });
      });

      describe('when resetting a form', () => {
        it('should reset the element to its initial value', async () => {
          const form = await fixture<HTMLFormElement>(html`
            <form>
              <wa-select value="option-1">
                <wa-option value="option-1">Option 1</wa-option>
                <wa-option value="option-2">Option 2</wa-option>
                <wa-option value="option-3">Option 3</wa-option>
              </wa-select>
              <wa-button type="reset">Reset</wa-button>
            </form>
          `);

          const resetButton = form.querySelector('wa-button')!;
          const select = form.querySelector('wa-select')!;

          select.value = 'option-3';
          await select.updateComplete;
          expect(select.value).to.equal('option-3');

          const resetSpy = sinon.spy();
          form.addEventListener('reset', () => {
            resetSpy();
          });
          // clickOnElement causes some weird behavior where the `reset` event never fires.
          // Maybe one day in the future this can go back to using the `clickOnElement`.
          // await clickOnElement(resetButton);
          resetButton.click();
          await select.updateComplete;

          expect(resetSpy).to.have.been.calledOnce;
          expect(select.value).to.equal('option-1');
        });
      });

      it('should update the display label when an option changes', async () => {
        const el = await fixture<WaSelect>(html`
          <wa-select value="option-1">
            <wa-option value="option-1">Option 1</wa-option>
            <wa-option value="option-2">Option 2</wa-option>
            <wa-option value="option-3">Option 3</wa-option>
          </wa-select>
        `);
        const displayInput = el.shadowRoot!.querySelector<HTMLSelectElement>('.display-input')!;
        const option = el.querySelector('wa-option')!;

        expect(displayInput.value).to.equal('Option 1');

        option.textContent = 'updated';
        await aTimeout(250);
        await el.updateComplete;

        expect(displayInput.value).to.equal('updated');
      });

      it('should emit focus and blur when receiving and losing focus', async () => {
        const el = await fixture<WaSelect>(html`
          <wa-select value="option-1">
            <wa-option value="option-1">Option 1</wa-option>
            <wa-option value="option-2">Option 2</wa-option>
            <wa-option value="option-3">Option 3</wa-option>
          </wa-select>
        `);
        const focusHandler = sinon.spy();
        const blurHandler = sinon.spy();

        el.addEventListener('focus', focusHandler);
        el.addEventListener('blur', blurHandler);

        el.focus();
        await el.updateComplete;
        el.blur();
        await el.updateComplete;

        expect(focusHandler).to.have.been.calledOnce;
        expect(blurHandler).to.have.been.calledOnce;
      });

      it('should emit wa-clear when the clear button is clicked', async () => {
        const el = await fixture<WaSelect>(html`
          <wa-select value="option-1" with-clear>
            <wa-option value="option-1">Option 1</wa-option>
            <wa-option value="option-2">Option 2</wa-option>
            <wa-option value="option-3">Option 3</wa-option>
          </wa-select>
        `);
        const clearHandler = sinon.spy();
        const clearButton = el.shadowRoot!.querySelector('[part~="clear-button"]')!;

        el.addEventListener('wa-clear', clearHandler);
        await el.show();
        await clickOnElement(clearButton);
        await el.updateComplete;

        expect(clearHandler).to.have.been.calledOnce;
      });

      it('should emit change and input when a tag is removed', async () => {
        const el = await fixture<WaSelect>(html`
          <wa-select multiple>
            <wa-option value="option-1" selected>Option 1</wa-option>
            <wa-option value="option-2" selected>Option 2</wa-option>
            <wa-option value="option-3" selected>Option 3</wa-option>
          </wa-select>
        `);
        const changeHandler = sinon.spy();
        const inputHandler = sinon.spy();
        const tag = el.shadowRoot!.querySelector('[part~="tag"]')!;
        const removeButton = tag.shadowRoot!.querySelector('[part~="remove-button"]')!;

        el.addEventListener('change', changeHandler);
        el.addEventListener('input', inputHandler);

        // The offsets are a funky hack for Firefox.
        await clickOnElement(removeButton, 'center', 1, 1);
        await el.updateComplete;
        await aTimeout(1);

        expect(changeHandler).to.have.been.calledOnce;
        expect(inputHandler).to.have.been.calledOnce;
      });

      it('should emit wa-show, wa-after-show, wa-hide, and wa-after-hide events when the listbox opens and closes', async () => {
        const el = await fixture<WaSelect>(html`
          <wa-select value="option-1">
            <wa-option value="option-1">Option 1</wa-option>
            <wa-option value="option-2">Option 2</wa-option>
            <wa-option value="option-3">Option 3</wa-option>
          </wa-select>
        `);
        const showHandler = sinon.spy();
        const afterShowHandler = sinon.spy();
        const hideHandler = sinon.spy();
        const afterHideHandler = sinon.spy();

        el.addEventListener('wa-show', showHandler);
        el.addEventListener('wa-after-show', afterShowHandler);
        el.addEventListener('wa-hide', hideHandler);
        el.addEventListener('wa-after-hide', afterHideHandler);

        await el.show();
        expect(showHandler).to.have.been.calledOnce;
        expect(afterShowHandler).to.have.been.calledOnce;

        await el.hide();
        expect(hideHandler).to.have.been.calledOnce;
        expect(afterHideHandler).to.have.been.calledOnce;
      });

      it('should have rounded tags when using the pill attribute', async () => {
        const el = await fixture<WaSelect>(html`
          <wa-select multiple pill>
            <wa-option value="option-1" selected>Option 1</wa-option>
            <wa-option value="option-2" selected>Option 2</wa-option>
            <wa-option value="option-3">Option 3</wa-option>
          </wa-select>
        `);
        const tag = el.shadowRoot!.querySelector('[part~="tag"]')!;

        expect(tag.hasAttribute('pill')).to.be.true;
      });

      describe('With lazily loaded options', () => {
        describe('With no existing options', () => {
          it('Should wait to select the option when the option exists for single select', async () => {
            const form = await fixture<HTMLFormElement>(
              html`<form><wa-select name="select" value="option-1"></wa-select></form>`,
            );
            const el = form.querySelector<WaSelect>('wa-select')!;

            expect(el.defaultValue).to.equal('option-1');
            expect(el.value).to.equal('');
            expect(new FormData(form).get('select')).equal('');

            const option = document.createElement('wa-option');
            option.value = 'option-1';
            option.innerText = 'Option 1';
            el.append(option);

            await aTimeout(10);
            await el.updateComplete;
            expect(el.optionValues ? [...el.optionValues] : []).to.have.members(['option-1']);
            expect(el.value).to.equal('option-1');
            expect(new FormData(form).get('select')).equal('option-1');
          });

          it('Should wait to select the option when the option exists for multiple select', async () => {
            const form = await fixture<HTMLFormElement>(
              html`<form><wa-select name="select" value="option-1" multiple></wa-select></form>`,
            );

            const el = form.querySelector<WaSelect>('wa-select')!;
            expect(Array.isArray(el.value)).to.equal(true);
            expect(el.value!.length).to.equal(0);

            const option = document.createElement('wa-option');
            option.value = 'option-1';
            option.innerText = 'Option 1';
            el.append(option);

            await aTimeout(10);
            await el.updateComplete;
            expect(el.value!.length).to.equal(1);
            expect(el.value).to.have.members(['option-1']);
            expect(new FormData(form).getAll('select')).have.members(['option-1']);
          });
        });

        describe('With existing options', () => {
          it('Should not select the option if options already exist for single select', async () => {
            const form = await fixture<HTMLFormElement>(
              html` <form>
                <wa-select name="select" value="foo">
                  <wa-option value="bar">Bar</wa-option>
                  <wa-option value="baz">Baz</wa-option>
                </wa-select>
              </form>`,
            );

            const el = form.querySelector<WaSelect>('wa-select')!;
            expect(el.value).to.equal('');
            expect(new FormData(form).get('select')).to.equal('');

            const option = document.createElement('wa-option');
            option.value = 'foo';
            option.innerText = 'Foo';
            el.append(option);

            await aTimeout(10);
            await el.updateComplete;
            expect(el.value).to.equal('foo');
            expect(new FormData(form).get('select')).to.equal('foo');
          });

          it('Should not select the option if options already exists for multiple select', async () => {
            const form = await fixture<HTMLFormElement>(
              html` <form>
                <wa-select name="select" multiple>
                  <wa-option value="bar">Bar</wa-option>
                  <wa-option value="baz">Baz</wa-option>
                  <wa-option value="foo" selected>Foo</wa-option>
                </wa-select>
              </form>`,
            );

            const el = form.querySelector<WaSelect>('wa-select')!;
            expect(el.value).to.be.an('array');
            expect(el.value!.length).to.equal(1);
            expect(el.value).to.have.members(['foo']);
            expect(new FormData(form).getAll('select')).to.have.members(['foo']);
          });

          it('Should only select the existing options if options already exists for multiple select', async () => {
            const form = await fixture<HTMLFormElement>(
              html` <form>
                <wa-select name="select" multiple>
                  <wa-option value="bar" selected>Bar</wa-option>
                  <wa-option value="baz" selected>Baz</wa-option>
                </wa-select>
              </form>`,
            );

            const el = form.querySelector<WaSelect>('wa-select')!;
            expect(el.optionValues ? [...el.optionValues] : []).to.have.members(['bar', 'baz']);
            expect(el.optionValues?.size).to.equal(2);
            expect(el.value).to.have.members(['bar', 'baz']);
            expect(el.value!.length).to.equal(2);
            expect(new FormData(form).getAll('select')).to.have.members(['bar', 'baz']);

            const option = document.createElement('wa-option');
            option.value = 'foo';
            option.innerText = 'Foo';
            option.selected = true;
            el.append(option);

            await aTimeout(10);
            await el.updateComplete;
            expect(el.value).to.have.members(['bar', 'baz', 'foo']);
            expect(new FormData(form).getAll('select')).to.have.members(['bar', 'baz', 'foo']);
          });
        });

        describe('With setting the value via JS', () => {
          it('Should preserve value even if not returned', async () => {
            const form = await fixture<HTMLFormElement>(
              html` <form>
                <wa-select name="select">
                  <wa-option value="bar">Bar</wa-option>
                  <wa-option value="baz">Baz</wa-option>
                </wa-select>
              </form>`,
            );

            const el = form.querySelector<WaSelect>('wa-select')!;
            expect(el.value).to.equal('');

            el.value = 'foo';
            await aTimeout(10);
            await el.updateComplete;
            expect(el.value).to.equal('');

            const option = document.createElement('wa-option');
            option.value = 'foo';
            option.innerText = 'Foo';
            el.append(option);

            await aTimeout(10);
            await el.updateComplete;
            expect(el.value).to.equal('foo');
          });
        });
      });

      describe('with selected attribute', () => {
        it('should select options using the selected attribute for single select', async () => {
          const el = await fixture<WaSelect>(html`
            <wa-select>
              <wa-option value="option-1">Option 1</wa-option>
              <wa-option value="option-2" selected>Option 2</wa-option>
              <wa-option value="option-3">Option 3</wa-option>
            </wa-select>
          `);

          expect(el.value).to.equal('option-2');
          expect(el.displayInput.value).to.equal('Option 2');
        });

        it('should select multiple options using the selected attribute', async () => {
          const el = await fixture<WaSelect>(html`
            <wa-select multiple>
              <wa-option value="option-1" selected>Option 1</wa-option>
              <wa-option value="option-2">Option 2</wa-option>
              <wa-option value="option-3" selected>Option 3</wa-option>
            </wa-select>
          `);

          expect(el.value).to.have.members(['option-1', 'option-3']);
          expect(el.value).to.have.length(2);
        });

        it('should handle options with spaces in values', async () => {
          const el = await fixture<WaSelect>(html`
            <wa-select>
              <wa-option value="option with spaces">Option with spaces</wa-option>
              <wa-option value="another option" selected>Another option</wa-option>
            </wa-select>
          `);

          expect(el.value).to.equal('another option');
          expect(el.displayInput.value).to.equal('Another option');
        });

        it('should handle multiple options with spaces in values', async () => {
          const el = await fixture<WaSelect>(html`
            <wa-select multiple>
              <wa-option value="option with spaces" selected>Option with spaces</wa-option>
              <wa-option value="another option">Another option</wa-option>
              <wa-option value="third option" selected>Third option</wa-option>
            </wa-select>
          `);

          expect(el.value).to.have.members(['option with spaces', 'third option']);
          expect(el.value).to.have.length(2);
        });

        it('should serialize options with spaces correctly in FormData', async () => {
          const form = await fixture<HTMLFormElement>(html`
            <form>
              <wa-select name="test" multiple>
                <wa-option value="option with spaces" selected>Option with spaces</wa-option>
                <wa-option value="another option" selected>Another option</wa-option>
              </wa-select>
            </form>
          `);

          const formData = new FormData(form);
          const values = formData.getAll('test');
          expect(values).to.have.members(['option with spaces', 'another option']);
        });
      });

      // https://github.com/shoelace-style/webawesome-alpha/issues/263
      it('should allow interaction after being disabled and re-enabled', async () => {
        const el = await fixture<WaSelect>(html`
          <wa-select label="Select one">
            <wa-option value="option-1">Option 1</wa-option>
            <wa-option value="option-2">Option 2</wa-option>
            <wa-option value="option-3">Option 3</wa-option>
          </wa-select>
        `);
        const popup = el.shadowRoot!.querySelector('wa-popup');

        // First disable the select
        el.disabled = true;
        await el.updateComplete;

        // Wait 500ms
        await aTimeout(500);

        // Re-enable the select
        el.disabled = false;
        await el.updateComplete;

        // Click on the select to open the dropdown
        await clickOnElement(el, 'center', 0, 8); // centered + 8px down into the listbox
        await el.updateComplete;
        await aTimeout(500); // wait to make sure the listbox doesn't close afterwards

        // Get the popup element and check its active state
        expect(popup?.active).to.be.true;
      });
    });
  }
});
