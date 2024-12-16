import { expect, oneEvent } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit';
import sinon from 'sinon';
import { clickOnElement } from '../../internal/test.js';
import { fixtures } from '../../internal/test/fixture.js';
import { runFormControlBaseTests } from '../../internal/test/form-control-base-tests.js';
import { serialize } from '../../utilities/form.js';
import type WaRange from './range.js';

describe('<wa-range>', () => {
  runFormControlBaseTests('wa-range');

  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      it('should pass accessibility tests', async () => {
        const el = await fixture<WaRange>(html`<wa-range label="Name"></wa-range>`);
        await expect(el).to.be.accessible();
      });

      it('default properties', async () => {
        const el = await fixture<WaRange>(html` <wa-range></wa-range> `);

        expect(el.name).to.equal('');
        expect(el.value).to.equal(0);
        expect(el.title).to.equal('');
        expect(el.label).to.equal('');
        expect(el.hint).to.equal('');
        expect(el.disabled).to.be.false;
        expect(el.checkValidity()).to.be.true;
        expect(el.min).to.equal(0);
        expect(el.max).to.equal(100);
        expect(el.step).to.equal(1);
        expect(el.tooltip).to.equal('top');
        expect(el.defaultValue).to.equal(0);
      });

      it('should have title if title attribute is set', async () => {
        const el = await fixture<WaRange>(html` <wa-range title="Test"></wa-range> `);
        const input = el.shadowRoot!.querySelector('input')!;

        expect(input.title).to.equal('Test');
      });

      it('should be disabled with the disabled attribute', async () => {
        const el = await fixture<WaRange>(html` <wa-range disabled></wa-range> `);
        const input = el.shadowRoot!.querySelector<HTMLInputElement>('[part~="input"]')!;

        expect(input.disabled).to.be.true;
      });

      describe('when the value changes', () => {
        it('should emit wa-change and wa-input when the value changes from clicking the slider', async () => {
          const el = await fixture<WaRange>(html` <wa-range value="0"></wa-range> `);
          const changeHandler = sinon.spy();
          const inputHandler = sinon.spy();

          el.addEventListener('wa-change', changeHandler);
          el.addEventListener('wa-input', inputHandler);
          await clickOnElement(el, 'right');
          await el.updateComplete;

          expect(el.value).to.equal(100);
          expect(changeHandler).to.have.been.calledOnce;
          expect(inputHandler).to.have.been.calledOnce;
        });

        it('should emit wa-change and wa-input and decrease the value when pressing left arrow', async () => {
          const el = await fixture<WaRange>(html` <wa-range value="50"></wa-range> `);
          const changeHandler = sinon.spy();
          const inputHandler = sinon.spy();

          el.addEventListener('wa-change', changeHandler);
          el.addEventListener('wa-input', inputHandler);
          el.focus();
          await sendKeys({ press: 'ArrowLeft' });
          await el.updateComplete;

          expect(el.value).to.equal(49);
          expect(changeHandler).to.have.been.calledOnce;
          expect(inputHandler).to.have.been.calledOnce;
        });

        it('should emit wa-change and wa-input and decrease the value when pressing right arrow', async () => {
          const el = await fixture<WaRange>(html` <wa-range value="50"></wa-range> `);
          const changeHandler = sinon.spy();
          const inputHandler = sinon.spy();

          el.addEventListener('wa-change', changeHandler);
          el.addEventListener('wa-input', inputHandler);
          el.focus();
          await sendKeys({ press: 'ArrowRight' });
          await el.updateComplete;

          expect(el.value).to.equal(51);
          expect(changeHandler).to.have.been.calledOnce;
          expect(inputHandler).to.have.been.calledOnce;
        });

        it('should not emit wa-change or wa-input when changing the value programmatically', async () => {
          const el = await fixture<WaRange>(html` <wa-range value="0"></wa-range> `);

          el.addEventListener('wa-change', () => expect.fail('wa-change should not be emitted'));
          el.addEventListener('wa-input', () => expect.fail('wa-input should not be emitted'));
          el.value = 50;

          await el.updateComplete;
        });

        it('should not emit wa-change or wa-input when stepUp() is called programmatically', async () => {
          const el = await fixture<WaRange>(html` <wa-range step="2" value="2"></wa-range> `);

          el.addEventListener('wa-change', () => expect.fail('wa-change should not be emitted'));
          el.addEventListener('wa-input', () => expect.fail('wa-input should not be emitted'));
          el.stepUp();
          await el.updateComplete;
        });

        it('should not emit wa-change or wa-input when stepDown() is called programmatically', async () => {
          const el = await fixture<WaRange>(html` <wa-range step="2" value="2"></wa-range> `);

          el.addEventListener('wa-change', () => expect.fail('wa-change should not be emitted'));
          el.addEventListener('wa-input', () => expect.fail('wa-input should not be emitted'));
          el.stepDown();
          await el.updateComplete;
        });
      });

      describe('step', () => {
        it('should increment by step when stepUp() is called', async () => {
          const el = await fixture<WaRange>(html` <wa-range step="2" value="2"></wa-range> `);

          el.stepUp();
          await el.updateComplete;
          expect(el.value).to.equal(4);
        });

        it('should decrement by step when stepDown() is called', async () => {
          const el = await fixture<WaRange>(html` <wa-range step="2" value="2"></wa-range> `);

          el.stepDown();
          await el.updateComplete;
          expect(el.value).to.equal(0);
        });
      });

      describe('when submitting a form', () => {
        it('should serialize its name and value with FormData', async () => {
          const form = await fixture<HTMLFormElement>(html` <form><wa-range name="a" value="1"></wa-range></form> `);
          const formData = new FormData(form);
          expect(formData.get('a')).to.equal('1');
        });

        it('should serialize its name and value with JSON', async () => {
          const form = await fixture<HTMLFormElement>(html` <form><wa-range name="a" value="1"></wa-range></form> `);
          const json = serialize(form);
          expect(json.a).to.equal('1');
        });

        it('should be invalid when setCustomValidity() is called with a non-empty value', async () => {
          const range = await fixture<HTMLFormElement>(html` <wa-range></wa-range> `);

          range.setCustomValidity('Invalid selection');
          await range.updateComplete;

          expect(range.checkValidity()).to.be.false;
          expect(range.hasAttribute('data-wa-invalid')).to.be.true;
          expect(range.hasAttribute('data-wa-valid')).to.be.false;
          expect(range.hasAttribute('data-wa-user-invalid')).to.be.false;
          expect(range.hasAttribute('data-wa-user-valid')).to.be.false;

          await clickOnElement(range);
          await range.updateComplete;
          range.blur();
          await range.updateComplete;

          expect(range.hasAttribute('data-wa-user-invalid')).to.be.true;
          expect(range.hasAttribute('data-wa-user-valid')).to.be.false;
        });

        it('should receive validation attributes ("states") even when novalidate is used on the parent form', async () => {
          const el = await fixture<HTMLFormElement>(html` <form novalidate><wa-range></wa-range></form> `);
          const range = el.querySelector<WaRange>('wa-range')!;

          range.setCustomValidity('Invalid value');
          await range.updateComplete;

          expect(range.hasAttribute('data-wa-invalid')).to.be.true;
          expect(range.hasAttribute('data-wa-valid')).to.be.false;
          expect(range.hasAttribute('data-wa-user-invalid')).to.be.false;
          expect(range.hasAttribute('data-wa-user-valid')).to.be.false;
        });

        it('should be present in form data when using the form attribute and located outside of a <form>', async () => {
          const el = await fixture<HTMLFormElement>(html`
            <div>
              <form id="f">
                <wa-button type="submit">Submit</wa-button>
              </form>
              <wa-range form="f" name="a" value="50"></wa-range>
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
              <wa-range name="a" value="99"></wa-range>
              <wa-button type="reset">Reset</wa-button>
            </form>
          `);
          const button = form.querySelector('wa-button')!;
          const input = form.querySelector('wa-range')!;
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
