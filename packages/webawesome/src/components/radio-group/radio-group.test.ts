import { aTimeout, expect, oneEvent } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit';
import sinon from 'sinon';
// import { clickOnElement } from '../../internal/test.js';
import { fixtures } from '../../internal/test/fixture.js';
import { runFormControlBaseTests } from '../../internal/test/form-control-base-tests.js';
import type WaRadio from '../radio/radio.js';
import type WaRadioGroup from './radio-group.js';

describe('<wa-radio-group>', () => {
  runFormControlBaseTests('wa-radio-group');

  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      describe('validation tests', () => {
        it('should be invalid initially when required and no radio is checked', async () => {
          const radioGroup = await fixture<WaRadioGroup>(html`
            <wa-radio-group required>
              <wa-radio value="1"></wa-radio>
              <wa-radio value="2"></wa-radio>
            </wa-radio-group>
          `);

          expect(radioGroup.checkValidity()).to.be.false;
        });

        it('should become valid when an option is checked', async () => {
          const radioGroup = await fixture<WaRadioGroup>(html`
            <wa-radio-group required>
              <wa-radio value="1"></wa-radio>
              <wa-radio value="2"></wa-radio>
            </wa-radio-group>
          `);

          radioGroup.value = '1';
          await radioGroup.updateComplete;

          expect(radioGroup.checkValidity()).to.be.true;
        });

        it(`should be valid when required and one radio is checked`, async () => {
          const el = await fixture<WaRadioGroup>(html`
            <wa-radio-group label="Select an option" value="1" required>
              <wa-radio name="option" value="1">Option 1</wa-radio>
              <wa-radio name="option" value="2">Option 2</wa-radio>
              <wa-radio name="option" value="3">Option 3</wa-radio>
            </wa-radio-group>
          `);

          expect(el.checkValidity()).to.be.true;
        });

        it(`should be invalid when required and no radios are checked`, async () => {
          const el = await fixture<WaRadioGroup>(html`
            <wa-radio-group label="Select an option" required>
              <wa-radio name="option" value="1">Option 1</wa-radio>
              <wa-radio name="option" value="2">Option 2</wa-radio>
              <wa-radio name="option" value="3">Option 3</wa-radio>
            </wa-radio-group>
          `);

          expect(el.checkValidity()).to.be.false;
        });

        it(`should be valid when required and a different radio is checked`, async () => {
          const el = await fixture<WaRadioGroup>(html`
            <wa-radio-group label="Select an option" value="3" required>
              <wa-radio name="option" value="1">Option 1</wa-radio>
              <wa-radio name="option" value="2">Option 2</wa-radio>
              <wa-radio name="option" value="3">Option 3</wa-radio>
            </wa-radio-group>
          `);

          expect(el.checkValidity()).to.be.true;
        });

        it(`should be invalid when custom validity is set`, async () => {
          const el = await fixture<WaRadioGroup>(html`
            <wa-radio-group label="Select an option">
              <wa-radio name="option" value="1">Option 1</wa-radio>
              <wa-radio name="option" value="2">Option 2</wa-radio>
              <wa-radio name="option" value="3">Option 3</wa-radio>
            </wa-radio-group>
          `);

          el.setCustomValidity('Error');

          expect(el.checkValidity()).to.be.false;
        });

        it('should receive the correct validation attributes ("states") when valid', async () => {
          const radioGroup = await fixture<WaRadioGroup>(html`
            <wa-radio-group value="1" required>
              <wa-radio value="1"></wa-radio>
              <wa-radio value="2"></wa-radio>
            </wa-radio-group>
          `);
          const secondRadio = radioGroup.querySelectorAll('wa-radio')[1];

          expect(radioGroup.checkValidity()).to.be.true;
          expect(radioGroup.customStates.has('required')).to.be.true;
          expect(radioGroup.customStates.has('optional')).to.be.false;
          expect(radioGroup.customStates.has('invalid')).to.be.false;
          expect(radioGroup.customStates.has('valid')).to.be.true;
          expect(radioGroup.customStates.has('user-invalid')).to.be.false;
          expect(radioGroup.customStates.has('user-valid')).to.be.false;

          // TODO: Go back to clickOnElement when we can determine why CI is not cleaning up elements.
          // await clickOnElement(secondRadio);
          secondRadio.click();
          await secondRadio.updateComplete;
          await radioGroup.updateComplete;

          expect(radioGroup.checkValidity()).to.be.true;
          expect(radioGroup.customStates.has('user-invalid')).to.be.false;
          expect(radioGroup.customStates.has('user-valid')).to.be.true;
        });

        it('should receive the correct validation attributes ("states") when invalid', async () => {
          const radioGroup = await fixture<WaRadioGroup>(html`
            <wa-radio-group required>
              <wa-radio value="1"></wa-radio>
              <wa-radio value="2"></wa-radio>
            </wa-radio-group>
          `);
          const secondRadio = radioGroup.querySelectorAll('wa-radio')[1];

          expect(radioGroup.customStates.has('required')).to.be.true;
          expect(radioGroup.customStates.has('optional')).to.be.false;
          expect(radioGroup.customStates.has('invalid')).to.be.true;
          expect(radioGroup.customStates.has('valid')).to.be.false;
          expect(radioGroup.customStates.has('user-invalid')).to.be.false;
          expect(radioGroup.customStates.has('user-valid')).to.be.false;

          // TODO: Go back to clickOnElement when we can determine why CI is not cleaning up elements.
          // await clickOnElement(secondRadio);
          secondRadio.click();
          await radioGroup.updateComplete;
          radioGroup.value = '';
          await radioGroup.updateComplete;

          expect(radioGroup.customStates.has('user-invalid')).to.be.true;
          expect(radioGroup.customStates.has('user-valid')).to.be.false;
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

          // Submitting the form after setting custom validity should not trigger the handler
          radioGroup.setCustomValidity('Invalid selection');
          form.addEventListener('submit', submitHandler);
          button.click();

          await aTimeout(100);

          expect(submitHandler).to.not.have.been.called;
        });
      });
    });

    describe('when resetting a form', () => {
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

    describe('when submitting a form', () => {
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
    });

    describe('when handling focus', () => {
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

      // Tests for focus and label actions with radio buttons
      ['focus', 'label'].forEach(actionType => {
        describe(`when using ${actionType}`, () => {
          it('should do nothing if all elements are disabled', async () => {
            const el = await fixture<WaRadioGroup>(html`
              <wa-radio-group>
                <wa-radio id="radio-0" value="0" disabled></wa-radio>
                <wa-radio id="radio-1" value="1" disabled></wa-radio>
                <wa-radio id="radio-2" value="2" disabled></wa-radio>
                <wa-radio id="radio-3" value="3" disabled></wa-radio>
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

          it('should focus the first radio that is enabled when the group receives focus', async () => {
            const el = await fixture<WaRadioGroup>(html`
              <wa-radio-group>
                <wa-radio id="radio-0" value="0" disabled></wa-radio>
                <wa-radio id="radio-1" value="1"></wa-radio>
                <wa-radio id="radio-2" value="2"></wa-radio>
                <wa-radio id="radio-3" value="3"></wa-radio>
              </wa-radio-group>
            `);

            const invalidFocusHandler = sinon.spy();
            const validFocusHandler = sinon.spy();

            const disabledRadio = el.querySelector('#radio-0')!;
            const validRadio = el.querySelector('#radio-1')!;

            disabledRadio.addEventListener('focus', invalidFocusHandler);
            validRadio.addEventListener('focus', validFocusHandler);

            expect(invalidFocusHandler).to.not.have.been.called;
            expect(validFocusHandler).to.not.have.been.called;

            await doAction(el, actionType);

            expect(invalidFocusHandler).to.not.have.been.called;
            expect(validFocusHandler).to.have.been.called;
          });

          it('should focus the currently enabled radio when the group receives focus', async () => {
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

            expect(invalidFocusHandler).to.not.have.been.called;
            expect(validFocusHandler).to.not.have.been.called;

            await doAction(el, actionType);

            expect(invalidFocusHandler).to.not.have.been.called;
            expect(validFocusHandler).to.have.been.called;
          });
        });
      });
    });

    describe('when the value changes', () => {
      it('should emit change when toggled with the arrow keys', async () => {
        const radioGroup = await fixture<WaRadioGroup>(html`
          <wa-radio-group>
            <wa-radio id="radio-1" value="1"></wa-radio>
            <wa-radio id="radio-2" value="2"></wa-radio>
          </wa-radio-group>
        `);
        const firstRadio = radioGroup.querySelector<WaRadio>('#radio-1')!;
        const changeHandler = sinon.spy();
        const inputHandler = sinon.spy();

        radioGroup.addEventListener('change', changeHandler);
        radioGroup.addEventListener('input', inputHandler);
        firstRadio.focus();
        await sendKeys({ press: 'ArrowRight' });
        await radioGroup.updateComplete;

        expect(changeHandler).to.have.been.calledOnce;
        expect(inputHandler).to.have.been.calledOnce;
        expect(radioGroup.value).to.equal('2');
      });

      it('should emit change and input when clicked', async () => {
        const radioGroup = await fixture<WaRadioGroup>(html`
          <wa-radio-group>
            <wa-radio id="radio-1" value="1"></wa-radio>
            <wa-radio id="radio-2" value="2"></wa-radio>
          </wa-radio-group>
        `);
        const radio = radioGroup.querySelector<WaRadio>('#radio-1')!;
        setTimeout(() => radio.click());
        const event = await oneEvent(radioGroup, 'change');
        expect(event.target).to.equal(radioGroup);
        expect(radioGroup.value).to.equal('1');
      });

      it('should emit change and input when toggled with spacebar', async () => {
        const radioGroup = await fixture<WaRadioGroup>(html`
          <wa-radio-group>
            <wa-radio id="radio-1" value="1"></wa-radio>
            <wa-radio id="radio-2" value="2"></wa-radio>
          </wa-radio-group>
        `);
        const radio = radioGroup.querySelector<WaRadio>('#radio-1')!;
        radio.focus();
        setTimeout(() => sendKeys({ press: ' ' }));
        const event = await oneEvent(radioGroup, 'change');
        expect(event.target).to.equal(radioGroup);
        expect(radioGroup.value).to.equal('1');
      });

      it('should not emit change or input when the value is changed programmatically', async () => {
        const radioGroup = await fixture<WaRadioGroup>(html`
          <wa-radio-group value="1">
            <wa-radio id="radio-1" value="1"></wa-radio>
            <wa-radio id="radio-2" value="2"></wa-radio>
          </wa-radio-group>
        `);

        radioGroup.addEventListener('change', () => expect.fail('change should not be emitted'));
        radioGroup.addEventListener('input', () => expect.fail('input should not be emitted'));
        radioGroup.value = '2';
        await radioGroup.updateComplete;
      });

      // I think we can delete this?? We no longer need to have a hidden form control to mimic formAssociation.
      it.skip('should relatively position content to prevent visually hidden scroll bugs', async () => {
        //
        // See https://github.com/shoelace-style/shoelace/issues/1380
        //
        const radioGroup = await fixture<WaRadioGroup>(html`
          <wa-radio-group value="1">
            <wa-radio id="radio-1" value="1"></wa-radio>
          </wa-radio-group>
        `);

        const formControl = radioGroup.shadowRoot!.querySelector('.form-control')!;
        const visuallyHidden = radioGroup.shadowRoot!.querySelector('.visually-hidden')!;

        expect(getComputedStyle(formControl).position).to.equal('relative');
        expect(getComputedStyle(visuallyHidden).position).to.equal('absolute');
      });

      /**
       * @see https://github.com/shoelace-style/shoelace/issues/1361
       * This isn't really possible to test right now due to importing "shoelace.js" which
       * auto-defines all of our components up front. This should be tested if we ever split
       * to non-auto-defining components and not auto-defining for tests.
       */
      it.skip('should sync up radios and radio buttons if defined after radio group', async () => {
        // customElements.define("wa-radio-group", WaRadioGroup)
        //
        // const radioGroup = await fixture<WaRadioGroup>(html`
        //   <wa-radio-group value="1">
        //     <wa-radio id="radio-1" value="1"></wa-radio>
        //     <wa-radio id="radio-2" value="2"></wa-radio>
        //   </wa-radio-group>
        // `);
        //
        // await aTimeout(1)
        //
        // customElements.define("wa-radio-button", WaRadioButton)
        //
        // expect(radioGroup.querySelector("wa-radio")?.getAttribute("aria-checked")).to.equal("false")
        //
        // await aTimeout(1)
        //
        // customElements.define("wa-radio", WaRadio)
        //
        // await aTimeout(1)
        //
        // expect(radioGroup.querySelector("wa-radio")?.getAttribute("aria-checked")).to.equal("true")
      });
    });
  }
});
