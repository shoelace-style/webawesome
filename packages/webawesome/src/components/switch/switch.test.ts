import { aTimeout, expect, oneEvent, waitUntil } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit';
import sinon from 'sinon';
import { fixtures } from '../../internal/test/fixture.js';
import { runFormControlBaseTests } from '../../internal/test/form-control-base-tests.js';
import type WaSwitch from './switch.js';

describe('<wa-switch>', () => {
  runFormControlBaseTests('wa-switch');

  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      it('should pass accessibility tests', async () => {
        const el = await fixture<WaSwitch>(html` <wa-switch>Switch</wa-switch> `);
        await expect(el).to.be.accessible();
      });

      it('default properties', async () => {
        const el = await fixture<WaSwitch>(html` <wa-switch></wa-switch> `);

        expect(el.name).to.equal(null);
        expect(el.value).to.equal('on');
        expect(el.title).to.equal('');
        expect(el.disabled).to.be.false;
        expect(el.required).to.be.false;
        expect(el.checked).to.be.false;
        expect(el.defaultChecked).to.be.false;
        expect(el.hint).to.equal('');
      });

      it('should have title if title attribute is set', async () => {
        const el = await fixture<WaSwitch>(html` <wa-switch title="Test"></wa-switch> `);
        const input = el.shadowRoot!.querySelector('input')!;

        expect(input.title).to.equal('Test');
      });

      it('should be disabled with the disabled attribute', async () => {
        const el = await fixture<WaSwitch>(html` <wa-switch disabled></wa-switch> `);
        const input = el.shadowRoot!.querySelector<HTMLInputElement>('input')!;

        expect(input.disabled).to.be.true;
      });

      it('should be valid by default', async () => {
        const el = await fixture<WaSwitch>(html` <wa-switch></wa-switch> `);

        expect(el.checkValidity()).to.be.true;
      });

      it('should emit change and input when clicked', async () => {
        const el = await fixture<WaSwitch>(html` <wa-switch></wa-switch> `);
        const changeHandler = sinon.spy();
        const inputHandler = sinon.spy();

        el.addEventListener('change', changeHandler);
        el.addEventListener('input', inputHandler);
        el.click();
        await el.updateComplete;

        expect(changeHandler).to.have.been.calledOnce;
        expect(inputHandler).to.have.been.calledOnce;
        expect(el.checked).to.be.true;
      });

      it('should emit change when toggled with spacebar', async () => {
        const el = await fixture<WaSwitch>(html` <wa-switch></wa-switch> `);
        const changeHandler = sinon.spy();
        const inputHandler = sinon.spy();

        el.addEventListener('change', changeHandler);
        el.addEventListener('input', inputHandler);
        el.focus();
        await sendKeys({ press: ' ' });

        expect(changeHandler).to.have.been.calledOnce;
        expect(inputHandler).to.have.been.calledOnce;
        expect(el.checked).to.be.true;
      });

      it('should emit change and input when toggled with the right arrow', async () => {
        const el = await fixture<WaSwitch>(html` <wa-switch></wa-switch> `);
        const changeHandler = sinon.spy();
        const inputHandler = sinon.spy();

        el.addEventListener('change', changeHandler);
        el.addEventListener('input', inputHandler);
        el.focus();
        await sendKeys({ press: 'ArrowRight' });
        await el.updateComplete;

        expect(changeHandler).to.have.been.calledOnce;
        expect(inputHandler).to.have.been.calledOnce;
        expect(el.checked).to.be.true;
      });

      it('should emit change and input when toggled with the left arrow', async () => {
        const el = await fixture<WaSwitch>(html` <wa-switch checked></wa-switch> `);
        const changeHandler = sinon.spy();
        const inputHandler = sinon.spy();

        el.addEventListener('change', changeHandler);
        el.addEventListener('input', inputHandler);
        el.focus();
        await sendKeys({ press: 'ArrowLeft' });
        await el.updateComplete;

        expect(changeHandler).to.have.been.calledOnce;
        expect(inputHandler).to.have.been.calledOnce;
        expect(el.checked).to.be.false;
      });

      it('should not emit change or input when checked is set by JavaScript', async () => {
        const el = await fixture<WaSwitch>(html` <wa-switch></wa-switch> `);
        el.addEventListener('change', () => expect.fail('change incorrectly emitted'));
        el.addEventListener('input', () => expect.fail('input incorrectly emitted'));
        el.checked = true;
        await el.updateComplete;
        el.checked = false;
        await el.updateComplete;
      });

      it('should hide the native input with the correct positioning to scroll correctly when contained in an overflow', async () => {
        //
        // See: https://github.com/shoelace-style/shoelace/issues/1169
        //
        const el = await fixture<WaSwitch>(html` <wa-switch></wa-switch> `);
        const label = el.shadowRoot!.querySelector('.switch')!;
        const input = el.shadowRoot!.querySelector('.input')!;

        const labelPosition = getComputedStyle(label).position;
        const inputPosition = getComputedStyle(input).position;

        expect(labelPosition).to.equal('relative');
        expect(inputPosition).to.equal('absolute');
      });

      describe('when submitting a form', () => {
        it('should submit the correct value when a value is provided', async () => {
          const form = await fixture<HTMLFormElement>(html`
            <form>
              <wa-switch name="a" value="1" checked></wa-switch>
              <wa-button type="submit">Submit</wa-button>
            </form>
          `);
          const button = form.querySelector('wa-button')!;
          const submitHandler = sinon.spy((event: SubmitEvent) => {
            formData = new FormData(form);
            event.preventDefault();
          });
          let formData: FormData;

          form.addEventListener('submit', submitHandler);
          button.click();

          await waitUntil(() => submitHandler.calledOnce);

          expect(formData!.get('a')).to.equal('1');
        });

        it('should submit "on" when no value is provided', async () => {
          const form = await fixture<HTMLFormElement>(html`
            <form>
              <wa-switch name="a" checked></wa-switch>
              <wa-button type="submit">Submit</wa-button>
            </form>
          `);
          const button = form.querySelector('wa-button')!;
          const submitHandler = sinon.spy((event: SubmitEvent) => {
            formData = new FormData(form);
            event.preventDefault();
          });
          let formData: FormData;

          form.addEventListener('submit', submitHandler);
          button.click();

          await waitUntil(() => submitHandler.calledOnce);

          expect(formData!.get('a')).to.equal('on');
        });

        it('should show a constraint validation error when setCustomValidity() is called', async () => {
          const form = await fixture<HTMLFormElement>(html`
            <form>
              <wa-switch name="a" value="1" checked></wa-switch>
              <wa-button type="submit">Submit</wa-button>
            </form>
          `);
          const button = form.querySelector('wa-button')!;
          const waSwitch = form.querySelector('wa-switch')!;
          const submitHandler = sinon.spy((event: SubmitEvent) => event.preventDefault());

          // Submitting the form after setting custom validity should not trigger the handler
          waSwitch.setCustomValidity('Invalid selection');
          form.addEventListener('submit', submitHandler);
          button.click();
          await aTimeout(100);

          expect(submitHandler).to.not.have.been.called;
        });

        it('should be invalid when required and unchecked', async () => {
          const waSwitch = await fixture<HTMLFormElement>(html` <wa-switch required></wa-switch> `);
          expect(waSwitch.checkValidity()).to.be.false;
        });

        it('should be valid when required and checked', async () => {
          const waSwitch = await fixture<HTMLFormElement>(html` <wa-switch required checked></wa-switch> `);
          expect(waSwitch.checkValidity()).to.be.true;
        });

        it('should be present in form data when using the form attribute and located outside of a <form>', async () => {
          const el = await fixture<HTMLFormElement>(html`
            <div>
              <form id="f">
                <wa-button type="submit">Submit</wa-button>
              </form>
              <wa-switch form="f" name="a" value="1" checked></wa-switch>
            </div>
          `);
          const form = el.querySelector('form')!;
          const formData = new FormData(form);

          expect(formData.get('a')).to.equal('1');
        });

        it('should receive validation attributes ("states") even when novalidate is used on the parent form', async () => {
          const el = await fixture<HTMLFormElement>(html` <form novalidate><wa-switch required></wa-switch></form> `);
          const waSwitch = el.querySelector<WaSwitch>('wa-switch')!;

          expect(waSwitch.customStates.has('required')).to.be.true;
          expect(waSwitch.customStates.has('optional')).to.be.false;
          expect(waSwitch.customStates.has('invalid')).to.be.true;
          expect(waSwitch.customStates.has('valid')).to.be.false;
          expect(waSwitch.customStates.has('user-invalid')).to.be.false;
          expect(waSwitch.customStates.has('user-valid')).to.be.false;
        });
      });

      describe('when resetting a form', () => {
        it('should reset the element to its initial value', async () => {
          const form = await fixture<HTMLFormElement>(html`
            <form>
              <wa-switch name="a" value="1" checked></wa-switch>
              <wa-button type="reset">Reset</wa-button>
            </form>
          `);
          const button = form.querySelector('wa-button')!;
          const switchEl = form.querySelector('wa-switch')!;
          switchEl.checked = false;

          await switchEl.updateComplete;
          setTimeout(() => button.click());

          await oneEvent(form, 'reset');
          await switchEl.updateComplete;

          expect(switchEl.checked).to.true;

          switchEl.defaultChecked = false;

          setTimeout(() => button.click());
          await oneEvent(form, 'reset');
          await switchEl.updateComplete;

          expect(switchEl.checked).to.false;
        });
      });

      it('should not jump the page to the bottom when focusing a switch at the bottom of an element with overflow: auto;', async () => {
        // https://github.com/shoelace-style/shoelace/issues/1169
        const el = await fixture<HTMLDivElement>(html`
          <div style="display: flex; flex-direction: column; overflow: auto; max-height: 400px;">
            <wa-switch>Switch</wa-switch>
            <wa-switch>Switch</wa-switch>
            <wa-switch>Switch</wa-switch>
            <wa-switch>Switch</wa-switch>
            <wa-switch>Switch</wa-switch>
            <wa-switch>Switch</wa-switch>
            <wa-switch>Switch</wa-switch>
            <wa-switch>Switch</wa-switch>
            <wa-switch>Switch</wa-switch>
            <wa-switch>Switch</wa-switch>
            <wa-switch>Switch</wa-switch>
            <wa-switch>Switch</wa-switch>
            <wa-switch>Switch</wa-switch>
            <wa-switch>Switch</wa-switch>
            <wa-switch>Switch</wa-switch>
            <wa-switch>Switch</wa-switch>
            <wa-switch>Switch</wa-switch>
            <wa-switch>Switch</wa-switch>
            <wa-switch>Switch</wa-switch>
            <wa-switch>Switch</wa-switch>
            <wa-switch>Switch</wa-switch>
            <wa-switch>Switch</wa-switch>
            <wa-switch>Switch</wa-switch>
            <wa-switch>Switch</wa-switch>
            <wa-switch>Switch</wa-switch>
            <wa-switch>Switch</wa-switch>
            <wa-switch>Switch</wa-switch>
            <wa-switch>Switch</wa-switch>
            <wa-switch>Switch</wa-switch>
            <wa-switch>Switch</wa-switch>
            <wa-switch>Switch</wa-switch>
            <wa-switch>Switch</wa-switch>
            <wa-switch>Switch</wa-switch>
            <wa-switch>Switch</wa-switch>
            <wa-switch>Switch</wa-switch>
            <wa-switch>Switch</wa-switch>
            <wa-switch>Switch</wa-switch>
            <wa-switch>Switch</wa-switch>
            <wa-switch>Switch</wa-switch>
            <wa-switch>Switch</wa-switch>
            <wa-switch>Switch</wa-switch>
          </div>
          ;
        `);

        const switches = el.querySelectorAll<WaSwitch>('wa-switch');
        const lastSwitch = switches[switches.length - 1];

        expect(window.scrollY).to.equal(0);
        // Without these 2 timeouts, tests will pass unexpectedly in Safari.
        await aTimeout(10);
        lastSwitch.focus();
        await aTimeout(10);
        expect(window.scrollY).to.equal(0);
      });

      // https://github.com/shoelace-style/webawesome-alpha/discussions/124
      it('Should properly flag changes to checked and reflect', async () => {
        const el = await fixture<WaSwitch>(html`<wa-switch></wa-switch>`);
        await el.updateComplete;
        expect(el.checked).to.equal(false);

        el.checked = true;

        await el.updateComplete;

        expect(el.checked).to.equal(true);
      });
    });
  }
});
