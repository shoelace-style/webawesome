import { aTimeout, expect, oneEvent } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit';
import sinon from 'sinon';
import { fixtures } from '../../internal/test/fixture.js';
import { expectEvent } from '../../internal/test/expect-event.js';
import { runFormControlBaseTests } from '../../internal/test/form-control-base-tests.js';
import type WaRadio from '../radio/radio.js';
import type WaRadioGroup from './radio-group.js';

describe('<wa-radio-group>', () => {
  runFormControlBaseTests('wa-radio-group');

  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      describe('accessibility', () => {
        it('should have role="radiogroup" on the fieldset', async () => {
          const el = await fixture<WaRadioGroup>(html`
            <wa-radio-group label="Test">
              <wa-radio value="1">One</wa-radio>
              <wa-radio value="2">Two</wa-radio>
            </wa-radio-group>
          `);
          const fieldset = el.shadowRoot!.querySelector('fieldset')!;
          expect(fieldset.getAttribute('role')).to.equal('radiogroup');
        });
      });

      describe('properties', () => {
        it('should have correct default property values', async () => {
          const el = await fixture<WaRadioGroup>(html`
            <wa-radio-group>
              <wa-radio value="1"></wa-radio>
            </wa-radio-group>
          `);
          expect(el.label).to.equal('');
          expect(el.hint).to.equal('');
          expect(el.disabled).to.be.false;
          expect(el.required).to.be.false;
          expect(el.orientation).to.equal('vertical');
        });

        it('should set value by attribute', async () => {
          const el = await fixture<WaRadioGroup>(html`
            <wa-radio-group value="2">
              <wa-radio value="1">One</wa-radio>
              <wa-radio value="2">Two</wa-radio>
            </wa-radio-group>
          `);
          expect(el.value).to.equal('2');
        });

        it('should check the correct radio when value is set', async () => {
          const el = await fixture<WaRadioGroup>(html`
            <wa-radio-group value="2">
              <wa-radio value="1">One</wa-radio>
              <wa-radio value="2">Two</wa-radio>
            </wa-radio-group>
          `);
          const radios = el.querySelectorAll('wa-radio');
          expect(radios[0].checked).to.be.false;
          expect(radios[1].checked).to.be.true;
        });
      });

      describe('validation', () => {
        it('should be invalid initially when required and no radio is checked', async () => {
          const el = await fixture<WaRadioGroup>(html`
            <wa-radio-group required>
              <wa-radio value="1"></wa-radio>
              <wa-radio value="2"></wa-radio>
            </wa-radio-group>
          `);
          expect(el.checkValidity()).to.be.false;
        });

        it('should become valid when an option is checked', async () => {
          const el = await fixture<WaRadioGroup>(html`
            <wa-radio-group required>
              <wa-radio value="1"></wa-radio>
              <wa-radio value="2"></wa-radio>
            </wa-radio-group>
          `);
          el.value = '1';
          await el.updateComplete;
          expect(el.checkValidity()).to.be.true;
        });

        it('should be valid when required and one radio is checked', async () => {
          const el = await fixture<WaRadioGroup>(html`
            <wa-radio-group label="Select an option" value="1" required>
              <wa-radio value="1">Option 1</wa-radio>
              <wa-radio value="2">Option 2</wa-radio>
              <wa-radio value="3">Option 3</wa-radio>
            </wa-radio-group>
          `);
          expect(el.checkValidity()).to.be.true;
        });

        it('should be invalid when required and no radios are checked', async () => {
          const el = await fixture<WaRadioGroup>(html`
            <wa-radio-group label="Select an option" required>
              <wa-radio value="1">Option 1</wa-radio>
              <wa-radio value="2">Option 2</wa-radio>
              <wa-radio value="3">Option 3</wa-radio>
            </wa-radio-group>
          `);
          expect(el.checkValidity()).to.be.false;
        });

        it('should be valid when required and a different radio is checked', async () => {
          const el = await fixture<WaRadioGroup>(html`
            <wa-radio-group label="Select an option" value="3" required>
              <wa-radio value="1">Option 1</wa-radio>
              <wa-radio value="2">Option 2</wa-radio>
              <wa-radio value="3">Option 3</wa-radio>
            </wa-radio-group>
          `);
          expect(el.checkValidity()).to.be.true;
        });

        it('should be invalid when custom validity is set', async () => {
          const el = await fixture<WaRadioGroup>(html`
            <wa-radio-group label="Select an option">
              <wa-radio value="1">Option 1</wa-radio>
              <wa-radio value="2">Option 2</wa-radio>
              <wa-radio value="3">Option 3</wa-radio>
            </wa-radio-group>
          `);
          el.setCustomValidity('Error');
          expect(el.checkValidity()).to.be.false;
        });

        it('should receive the correct validation attributes ("states") when valid', async () => {
          const el = await fixture<WaRadioGroup>(html`
            <wa-radio-group value="1" required>
              <wa-radio value="1"></wa-radio>
              <wa-radio value="2"></wa-radio>
            </wa-radio-group>
          `);
          const secondRadio = el.querySelectorAll('wa-radio')[1];

          expect(el.checkValidity()).to.be.true;
          expect(el.customStates.has('required')).to.be.true;
          expect(el.customStates.has('optional')).to.be.false;
          expect(el.customStates.has('invalid')).to.be.false;
          expect(el.customStates.has('valid')).to.be.true;
          expect(el.customStates.has('user-invalid')).to.be.false;
          expect(el.customStates.has('user-valid')).to.be.false;

          secondRadio.click();
          await secondRadio.updateComplete;
          await el.updateComplete;

          expect(el.checkValidity()).to.be.true;
          expect(el.customStates.has('user-invalid')).to.be.false;
          expect(el.customStates.has('user-valid')).to.be.true;
        });

        it('should receive the correct validation attributes ("states") when invalid', async () => {
          const el = await fixture<WaRadioGroup>(html`
            <wa-radio-group required>
              <wa-radio value="1"></wa-radio>
              <wa-radio value="2"></wa-radio>
            </wa-radio-group>
          `);
          const secondRadio = el.querySelectorAll('wa-radio')[1];

          expect(el.customStates.has('required')).to.be.true;
          expect(el.customStates.has('optional')).to.be.false;
          expect(el.customStates.has('invalid')).to.be.true;
          expect(el.customStates.has('valid')).to.be.false;
          expect(el.customStates.has('user-invalid')).to.be.false;
          expect(el.customStates.has('user-valid')).to.be.false;

          secondRadio.click();
          await el.updateComplete;
          el.value = '';
          await el.updateComplete;

          expect(el.customStates.has('user-invalid')).to.be.true;
          expect(el.customStates.has('user-valid')).to.be.false;
        });

        it('should receive validation attributes ("states") even when novalidate is used on the parent form', async () => {
          const el = await fixture<HTMLFormElement>(html`
            <form novalidate>
              <wa-radio-group required>
                <wa-radio value="1"></wa-radio>
                <wa-radio value="2"></wa-radio>
              </wa-radio-group>
            </form>
          `);
          const radioGroup = el.querySelector<WaRadioGroup>('wa-radio-group')!;

          expect(radioGroup.customStates.has('required')).to.be.true;
          expect(radioGroup.customStates.has('optional')).to.be.false;
          expect(radioGroup.customStates.has('invalid')).to.be.true;
          expect(radioGroup.customStates.has('valid')).to.be.false;
          expect(radioGroup.customStates.has('user-invalid')).to.be.false;
          expect(radioGroup.customStates.has('user-valid')).to.be.false;
        });

        it('should show a constraint validation error when setCustomValidity() is called', async () => {
          const form = await fixture<HTMLFormElement>(html`
            <form>
              <wa-radio-group value="1">
                <wa-radio id="radio-1" name="a" value="1"></wa-radio>
                <wa-radio id="radio-2" name="a" value="2"></wa-radio>
              </wa-radio-group>
              <wa-button type="submit">Submit</wa-button>
            </form>
          `);
          const button = form.querySelector('wa-button')!;
          const radioGroup = form.querySelector<WaRadioGroup>('wa-radio-group')!;
          const submitHandler = sinon.spy((event: SubmitEvent) => event.preventDefault());

          radioGroup.setCustomValidity('Invalid selection');
          form.addEventListener('submit', submitHandler);
          button.click();

          await aTimeout(100);

          expect(submitHandler).to.not.have.been.called;
        });
      });

      describe('events', () => {
        it('should emit change and input when toggled with arrow keys', async () => {
          const el = await fixture<WaRadioGroup>(html`
            <wa-radio-group>
              <wa-radio id="radio-1" value="1"></wa-radio>
              <wa-radio id="radio-2" value="2"></wa-radio>
            </wa-radio-group>
          `);
          const firstRadio = el.querySelector<WaRadio>('#radio-1')!;

          await expectEvent(el, ['change', 'input'], async () => {
            firstRadio.focus();
            await sendKeys({ press: 'ArrowRight' });
            await el.updateComplete;
          });

          expect(el.value).to.equal('2');
        });

        it('should emit change and input when clicked', async () => {
          const el = await fixture<WaRadioGroup>(html`
            <wa-radio-group>
              <wa-radio id="radio-1" value="1"></wa-radio>
              <wa-radio id="radio-2" value="2"></wa-radio>
            </wa-radio-group>
          `);
          const radio = el.querySelector<WaRadio>('#radio-1')!;
          setTimeout(() => radio.click());
          const event = await oneEvent(el, 'change');
          expect(event.target).to.equal(el);
          expect(el.value).to.equal('1');
        });

        it('should emit change and input when toggled with spacebar', async () => {
          const el = await fixture<WaRadioGroup>(html`
            <wa-radio-group>
              <wa-radio id="radio-1" value="1"></wa-radio>
              <wa-radio id="radio-2" value="2"></wa-radio>
            </wa-radio-group>
          `);
          const radio = el.querySelector<WaRadio>('#radio-1')!;
          radio.focus();
          setTimeout(() => sendKeys({ press: ' ' }));
          const event = await oneEvent(el, 'change');
          expect(event.target).to.equal(el);
          expect(el.value).to.equal('1');
        });

        it('should not emit change or input when the value is changed programmatically', async () => {
          const el = await fixture<WaRadioGroup>(html`
            <wa-radio-group value="1">
              <wa-radio id="radio-1" value="1"></wa-radio>
              <wa-radio id="radio-2" value="2"></wa-radio>
            </wa-radio-group>
          `);

          el.addEventListener('change', () => expect.fail('change should not be emitted'));
          el.addEventListener('input', () => expect.fail('input should not be emitted'));
          el.value = '2';
          await el.updateComplete;
        });
      });

      describe('keyboard navigation', () => {
        it('should wrap from last to first radio with ArrowRight', async () => {
          const el = await fixture<WaRadioGroup>(html`
            <wa-radio-group value="2">
              <wa-radio value="1"></wa-radio>
              <wa-radio value="2"></wa-radio>
            </wa-radio-group>
          `);
          const secondRadio = el.querySelectorAll('wa-radio')[1];
          secondRadio.focus();
          await sendKeys({ press: 'ArrowRight' });
          await el.updateComplete;
          expect(el.value).to.equal('1');
        });

        it('should wrap from first to last radio with ArrowLeft', async () => {
          const el = await fixture<WaRadioGroup>(html`
            <wa-radio-group value="1">
              <wa-radio value="1"></wa-radio>
              <wa-radio value="2"></wa-radio>
            </wa-radio-group>
          `);
          const firstRadio = el.querySelectorAll('wa-radio')[0];
          firstRadio.focus();
          await sendKeys({ press: 'ArrowLeft' });
          await el.updateComplete;
          expect(el.value).to.equal('2');
        });

        it('should skip disabled radios', async () => {
          const el = await fixture<WaRadioGroup>(html`
            <wa-radio-group value="1">
              <wa-radio value="1"></wa-radio>
              <wa-radio value="2" disabled></wa-radio>
              <wa-radio value="3"></wa-radio>
            </wa-radio-group>
          `);
          const firstRadio = el.querySelectorAll('wa-radio')[0];
          firstRadio.focus();
          await sendKeys({ press: 'ArrowRight' });
          await el.updateComplete;
          expect(el.value).to.equal('3');
        });
      });

      describe('focus handling', () => {
        const doAction = async (instance: WaRadioGroup, type: string) => {
          if (type === 'focus') {
            instance.focus();
            await instance.updateComplete;
            return;
          }

          const label = instance.shadowRoot!.querySelector<HTMLLabelElement>('#label')!;
          label.click();
          await instance.updateComplete;
        };

        ['focus', 'label'].forEach(actionType => {
          describe(`when using ${actionType}`, () => {
            it('should do nothing if all elements are disabled', async () => {
              const el = await fixture<WaRadioGroup>(html`
                <wa-radio-group>
                  <wa-radio id="radio-0" value="0" disabled></wa-radio>
                  <wa-radio id="radio-1" value="1" disabled></wa-radio>
                  <wa-radio id="radio-2" value="2" disabled></wa-radio>
                </wa-radio-group>
              `);

              const validFocusHandler = sinon.spy();

              Array.from(el.querySelectorAll<WaRadio>('wa-radio')).forEach(radio =>
                radio.addEventListener('focus', validFocusHandler),
              );

              expect(validFocusHandler).to.not.have.been.called;
              await doAction(el, actionType);
              expect(validFocusHandler).to.not.have.been.called;
            });

            it('should focus the first enabled radio when the group receives focus', async () => {
              const el = await fixture<WaRadioGroup>(html`
                <wa-radio-group>
                  <wa-radio id="radio-0" value="0" disabled></wa-radio>
                  <wa-radio id="radio-1" value="1"></wa-radio>
                  <wa-radio id="radio-2" value="2"></wa-radio>
                </wa-radio-group>
              `);

              const invalidFocusHandler = sinon.spy();
              const validFocusHandler = sinon.spy();

              const disabledRadio = el.querySelector('#radio-0')!;
              const validRadio = el.querySelector('#radio-1')!;

              disabledRadio.addEventListener('focus', invalidFocusHandler);
              validRadio.addEventListener('focus', validFocusHandler);

              await doAction(el, actionType);

              expect(invalidFocusHandler).to.not.have.been.called;
              expect(validFocusHandler).to.have.been.called;
            });

            it('should focus the checked radio when the group receives focus', async () => {
              const el = await fixture<WaRadioGroup>(html`
                <wa-radio-group value="2">
                  <wa-radio id="radio-0" value="0" disabled></wa-radio>
                  <wa-radio id="radio-1" value="1"></wa-radio>
                  <wa-radio id="radio-2" value="2" checked></wa-radio>
                  <wa-radio id="radio-3" value="3"></wa-radio>
                </wa-radio-group>
              `);

              const invalidFocusHandler = sinon.spy();
              const validFocusHandler = sinon.spy();

              const disabledRadio = el.querySelector('#radio-0')!;
              const validRadio = el.querySelector('#radio-2')!;

              disabledRadio.addEventListener('focus', invalidFocusHandler);
              validRadio.addEventListener('focus', validFocusHandler);

              await doAction(el, actionType);

              expect(invalidFocusHandler).to.not.have.been.called;
              expect(validFocusHandler).to.have.been.called;
            });
          });
        });
      });

      describe('form integration', () => {
        it('should submit the correct value when a value is provided', async () => {
          const form = await fixture<HTMLFormElement>(html`
            <form>
              <wa-radio-group name="a" value="1">
                <wa-radio id="radio-1" value="1"></wa-radio>
                <wa-radio id="radio-2" value="2"></wa-radio>
                <wa-radio id="radio-3" value="3"></wa-radio>
              </wa-radio-group>
            </form>
          `);

          const radio = form.querySelectorAll('wa-radio')[1];
          radio.click();
          await form.querySelector('wa-radio-group')?.updateComplete;

          const formData = new FormData(form);
          expect(formData.get('a')).to.equal('2');
        });

        it('should be present in form data when using the form attribute and located outside of a <form>', async () => {
          const el = await fixture<HTMLFormElement>(html`
            <div>
              <form id="f">
                <wa-button type="submit">Submit</wa-button>
              </form>
              <wa-radio-group form="f" name="a" value="1">
                <wa-radio id="radio-1" value="1"></wa-radio>
                <wa-radio id="radio-2" value="2"></wa-radio>
                <wa-radio id="radio-3" value="3"></wa-radio>
              </wa-radio-group>
            </div>
          `);
          const form = el.querySelector('form')!;
          const formData = new FormData(form);
          expect(formData.get('a')).to.equal('1');
        });

        it('should reset the element to its initial value', async () => {
          const form = await fixture<HTMLFormElement>(html`
            <form>
              <wa-radio-group value="1">
                <wa-radio value="1"></wa-radio>
                <wa-radio value="2"></wa-radio>
              </wa-radio-group>
              <wa-button type="reset">Reset</wa-button>
            </form>
          `);
          const button = form.querySelector('wa-button')!;
          const radioGroup = form.querySelector('wa-radio-group')!;
          radioGroup.value = '2';

          await radioGroup.updateComplete;
          setTimeout(() => button.click());

          await oneEvent(form, 'reset');
          await radioGroup.updateComplete;

          expect(radioGroup.value).to.equal('1');
        });
      });

      describe('regression tests', () => {
        // https://github.com/shoelace-style/webawesome/issues/1273
        it('should respond to attribute changes if the value has not changed', async () => {
          const el = await fixture<WaRadioGroup>(html`
            <wa-radio-group value="2">
              <wa-radio value="0">0</wa-radio>
              <wa-radio value="1">1</wa-radio>
              <wa-radio value="2">2</wa-radio>
              <wa-radio value="3">3</wa-radio>
              <wa-radio value="4">4</wa-radio>
            </wa-radio-group>
          `);

          expect(el.querySelectorAll('wa-radio')[2].checked).to.equal(true);
          el.setAttribute('value', '4');
          await el.updateComplete;
          expect(el.value).to.equal('4');
          expect(el.querySelectorAll('wa-radio')[4].checked).to.equal(true);
        });

        // https://github.com/shoelace-style/webawesome/issues/1273
        it('should not respond to attribute changes if the value has changed', async () => {
          const el = await fixture<WaRadioGroup>(html`
            <wa-radio-group value="2">
              <wa-radio value="0">0</wa-radio>
              <wa-radio value="1">1</wa-radio>
              <wa-radio value="2">2</wa-radio>
              <wa-radio value="3">3</wa-radio>
              <wa-radio value="4">4</wa-radio>
            </wa-radio-group>
          `);
          expect(el.querySelectorAll('wa-radio')[2].checked).to.equal(true);
          el.value = 4;
          await el.updateComplete;
          el.setAttribute('value', '3');
          await el.updateComplete;
          expect(el.value).to.equal('4');
          expect(el.defaultValue).to.equal('3');
          expect(el.querySelectorAll('wa-radio')[4].checked).to.equal(true);
        });
      });
    });
  }
});
