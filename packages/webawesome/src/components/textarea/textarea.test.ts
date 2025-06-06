import { expect, oneEvent, waitUntil } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit';
import sinon from 'sinon';
import { fixtures } from '../../internal/test/fixture.js';
import { runFormControlBaseTests } from '../../internal/test/form-control-base-tests.js';
import { serialize } from '../../utilities/form.js';
import type WaTextarea from './textarea.js';

describe('<wa-textarea>', () => {
  runFormControlBaseTests('wa-textarea');

  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      it('should pass accessibility tests', async () => {
        const el = await fixture<WaTextarea>(html` <wa-textarea label="Name"></wa-textarea> `);
        await expect(el).to.be.accessible();
      });

      it('default properties', async () => {
        const el = await fixture<WaTextarea>(html` <wa-textarea></wa-textarea> `);

        expect(el.size).to.equal('medium');
        expect(el.name).to.equal(null);
        expect(el.value).to.equal('');
        expect(el.defaultValue).to.equal('');
        expect(el.title).to.equal('');
        expect(el.appearance).to.equal('outlined');
        expect(el.label).to.equal('');
        expect(el.hint).to.equal('');
        expect(el.placeholder).to.equal('');
        expect(el.rows).to.equal(4);
        expect(el.resize).to.equal('vertical');
        expect(el.disabled).to.be.false;
        expect(el.readonly).to.be.false;
        expect(el.minlength).to.be.undefined;
        expect(el.maxlength).to.be.undefined;
        expect(el.required).to.be.false;
        expect(el.autocapitalize).to.be.undefined;
        expect(el.autocorrect).to.be.undefined;
        expect(el.autocomplete).to.be.undefined;
        expect(el.autofocus).to.be.undefined;
        expect(el.enterkeyhint).to.be.undefined;
        expect(el.spellcheck).to.be.true;
        expect(el.inputmode).to.be.undefined;
      });

      it('should have title if title attribute is set', async () => {
        const el = await fixture<WaTextarea>(html` <wa-textarea title="Test"></wa-textarea> `);
        const textarea = el.shadowRoot!.querySelector('textarea')!;

        expect(textarea.title).to.equal('Test');
      });

      it('should be disabled with the disabled attribute', async () => {
        const el = await fixture<WaTextarea>(html` <wa-textarea disabled></wa-textarea> `);
        const textarea = el.shadowRoot!.querySelector<HTMLTextAreaElement>('[part~="textarea"]')!;

        expect(textarea.disabled).to.be.true;
      });

      it('should focus the textarea when clicking on the label', async () => {
        const el = await fixture<WaTextarea>(html` <wa-textarea label="Name"></wa-textarea> `);
        const label = el.shadowRoot!.querySelector('[part~="label"]')!;
        const submitHandler = sinon.spy();

        el.addEventListener('focus', submitHandler);
        (label as HTMLLabelElement).click();
        await waitUntil(() => submitHandler.calledOnce);

        expect(submitHandler).to.have.been.calledOnce;
      });

      describe('when the value changes', () => {
        it('should emit change and input when the user types in the textarea', async () => {
          const el = await fixture<WaTextarea>(html` <wa-textarea></wa-textarea> `);
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
          const el = await fixture<WaTextarea>(html` <wa-textarea></wa-textarea> `);

          el.addEventListener('change', () => expect.fail('change should not be emitted'));
          el.addEventListener('input', () => expect.fail('input should not be emitted'));
          el.value = 'abc';

          await el.updateComplete;
        });

        it('should not emit change or input when calling setRangeText()', async () => {
          const el = await fixture<WaTextarea>(html` <wa-textarea value="hi there"></wa-textarea> `);

          el.addEventListener('change', () => expect.fail('change should not be emitted'));
          el.addEventListener('input', () => expect.fail('input should not be emitted'));
          el.focus();
          el.setSelectionRange(0, 2);
          el.setRangeText('hello');

          await el.updateComplete;
        });
      });

      describe('when using constraint validation', () => {
        it('should be valid by default', async () => {
          const el = await fixture<WaTextarea>(html` <wa-textarea></wa-textarea> `);

          expect(el.checkValidity()).to.be.true;
        });

        it('should be invalid when required and empty', async () => {
          const el = await fixture<WaTextarea>(html` <wa-textarea required></wa-textarea> `);

          expect(el.checkValidity()).to.be.false;
        });

        it('should be invalid when required and after removing disabled ', async () => {
          const el = await fixture<WaTextarea>(html` <wa-textarea disabled required></wa-textarea> `);

          el.disabled = false;
          await el.updateComplete;

          expect(el.checkValidity()).to.be.false;
        });

        it('should be invalid when required and disabled is removed', async () => {
          const el = await fixture<WaTextarea>(html` <wa-textarea disabled required></wa-textarea> `);
          el.disabled = false;
          await el.updateComplete;
          expect(el.checkValidity()).to.be.false;
        });

        it('should receive the correct validation attributes ("states") when valid', async () => {
          const el = await fixture<WaTextarea>(html` <wa-textarea required value="a"></wa-textarea> `);

          expect(el.checkValidity()).to.be.true;
          expect(el.customStates.has('required')).to.be.true;
          expect(el.customStates.has('optional')).to.be.false;
          expect(el.customStates.has('invalid')).to.be.false;
          expect(el.customStates.has('valid')).to.be.true;
          expect(el.customStates.has('user-invalid')).to.be.false;
          expect(el.customStates.has('user-valid')).to.be.false;

          el.focus();
          await sendKeys({ press: 'b' });
          await el.updateComplete;
          el.blur();
          await el.updateComplete;

          expect(el.checkValidity()).to.be.true;
          expect(el.customStates.has('user-invalid')).to.be.false;
          expect(el.customStates.has('user-valid')).to.be.true;
        });

        it('should receive the correct validation attributes ("states") when invalid', async () => {
          const el = await fixture<WaTextarea>(html` <wa-textarea required></wa-textarea> `);

          expect(el.customStates.has('required')).to.be.true;
          expect(el.customStates.has('optional')).to.be.false;
          expect(el.customStates.has('invalid')).to.be.true;
          expect(el.customStates.has('valid')).to.be.false;
          expect(el.customStates.has('user-invalid')).to.be.false;
          expect(el.customStates.has('user-valid')).to.be.false;

          el.focus();
          await sendKeys({ press: 'a' });
          await sendKeys({ press: 'Backspace' });
          await el.updateComplete;
          el.blur();
          await el.updateComplete;

          expect(el.customStates.has('user-invalid')).to.be.true;
          expect(el.customStates.has('user-valid')).to.be.false;
        });

        it('should receive validation attributes ("states") even when novalidate is used on the parent form', async () => {
          const el = await fixture<HTMLFormElement>(html`
            <form novalidate><wa-textarea required></wa-textarea></form>
          `);
          const textarea = el.querySelector<WaTextarea>('wa-textarea')!;

          expect(textarea.customStates.has('required')).to.be.true;
          expect(textarea.customStates.has('optional')).to.be.false;
          expect(textarea.customStates.has('invalid')).to.be.true;
          expect(textarea.customStates.has('valid')).to.be.false;
          expect(textarea.customStates.has('user-invalid')).to.be.false;
          expect(textarea.customStates.has('user-valid')).to.be.false;
        });
      });

      describe('when submitting a form', () => {
        it('should submit an empty value when initial value is set and then deleted', async () => {
          const form = await fixture<HTMLFormElement>(html`
            <form><wa-textarea name="a" value="1"></wa-textarea></form>
          `);
          const textarea = form.querySelector('wa-textarea')!;

          textarea.focus();
          textarea.select();
          await sendKeys({ press: 'Backspace' });
          await textarea.updateComplete;

          const formData = new FormData(form);
          expect(formData.get('a')).to.equal('');
        });

        it('should serialize its name and value with FormData', async () => {
          const form = await fixture<HTMLFormElement>(html`
            <form><wa-textarea name="a" value="1"></wa-textarea></form>
          `);
          const formData = new FormData(form);
          expect(formData.get('a')).to.equal('1');
        });

        it('should serialize its name and value with JSON', async () => {
          const form = await fixture<HTMLFormElement>(html`
            <form><wa-textarea name="a" value="1"></wa-textarea></form>
          `);
          const json = serialize(form);
          expect(json.a).to.equal('1');
        });

        it('should be invalid when setCustomValidity() is called with a non-empty value', async () => {
          const textarea = await fixture<HTMLFormElement>(html`<wa-textarea></wa-textarea>`);

          textarea.setCustomValidity('Invalid selection');
          await textarea.updateComplete;

          expect(textarea.checkValidity()).to.be.false;
          expect(textarea.customStates.has('invalid')).to.be.true;
          expect(textarea.customStates.has('valid')).to.be.false;
          expect(textarea.customStates.has('user-invalid')).to.be.false;
          expect(textarea.customStates.has('user-valid')).to.be.false;

          textarea.focus();
          await sendKeys({ type: 'test' });
          await textarea.updateComplete;
          textarea.blur();
          await textarea.updateComplete;

          expect(textarea.customStates.has('user-invalid')).to.be.true;
          expect(textarea.customStates.has('user-valid')).to.be.false;
        });

        it('should be present in form data when using the form attribute and located outside of a <form>', async () => {
          const el = await fixture<HTMLFormElement>(html`
            <div>
              <form id="f">
                <wa-button type="submit">Submit</wa-button>
              </form>
              <wa-textarea form="f" name="a" value="1"></wa-textarea>
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
              <wa-textarea name="a" value="test"></wa-textarea>
              <wa-button type="reset">Reset</wa-button>
            </form>
          `);
          const button = form.querySelector('wa-button')!;
          const textarea = form.querySelector('wa-textarea')!;
          textarea.value = '1234';

          await textarea.updateComplete;

          setTimeout(() => button.click());
          await oneEvent(form, 'reset');
          await textarea.updateComplete;

          expect(textarea.value).to.equal('test');

          textarea.defaultValue = '';

          setTimeout(() => button.click());
          await oneEvent(form, 'reset');
          await textarea.updateComplete;

          expect(textarea.value).to.equal('');
        });
      });

      describe('when using spellcheck', () => {
        it('should enable spellcheck when no attribute is present', async () => {
          const el = await fixture<WaTextarea>(html` <wa-textarea></wa-textarea> `);
          const textarea = el.shadowRoot!.querySelector<HTMLTextAreaElement>('textarea')!;
          expect(textarea.getAttribute('spellcheck')).to.equal('true');
          expect(textarea.spellcheck).to.be.true;
        });

        it('should enable spellcheck when set to "true"', async () => {
          const el = await fixture<WaTextarea>(html` <wa-textarea spellcheck="true"></wa-textarea> `);
          const textarea = el.shadowRoot!.querySelector<HTMLTextAreaElement>('textarea')!;
          expect(textarea.getAttribute('spellcheck')).to.equal('true');
          expect(textarea.spellcheck).to.be.true;
        });

        it('should disable spellcheck when set to "false"', async () => {
          const el = await fixture<WaTextarea>(html` <wa-textarea spellcheck="false"></wa-textarea> `);
          const textarea = el.shadowRoot!.querySelector<HTMLTextAreaElement>('textarea')!;
          expect(textarea.getAttribute('spellcheck')).to.equal('false');
          expect(textarea.spellcheck).to.be.false;
        });
      });

      describe('when using the setRangeText() function', () => {
        it('should set replacement text in the correct location', async () => {
          const el = await fixture<WaTextarea>(html` <wa-textarea value="test"></wa-textarea> `);

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
