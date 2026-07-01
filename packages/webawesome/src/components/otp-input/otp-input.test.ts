import { expect, oneEvent, waitUntil } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit';
import sinon from 'sinon';
import { fixtures } from '../../internal/test/fixture.js';
import { runFormControlBaseTests } from '../../internal/test/form-control-base-tests.js';
import { serialize } from '../../utilities/form.js';
import type WaOtpInput from './otp-input.js';

describe('<wa-otp-input>', () => {
  runFormControlBaseTests('wa-otp-input');

  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      describe('defaults', () => {
        it('should have correct default property values', async () => {
          const el = await fixture<WaOtpInput>(html`<wa-otp-input></wa-otp-input>`);

          expect(el.length).to.equal(6);
          expect(el.value).to.equal('');
          expect(el.appearance).to.equal('outlined');
          expect(el.type).to.equal('numeric');
          expect(el.mask).to.equal(false);
          expect(el.case).to.equal('preserve');
          expect(el.size).to.equal('medium');
          expect(el.label).to.equal('');
          expect(el.hint).to.equal('');
          expect(el.format).to.equal('');
          expect(el.autocomplete).to.equal('one-time-code');
          expect(el.disabled).to.equal(false);
          expect(el.required).to.equal(false);
          expect(el.readonly).to.equal(false);
          expect(el.autofocus).to.equal(false);
          expect(el.placeholder).to.equal('');
        });

        it('should render the correct number of segments', async () => {
          const el = await fixture<WaOtpInput>(html`<wa-otp-input length="4"></wa-otp-input>`);
          const segments = el.shadowRoot!.querySelectorAll('[part~="segment"]');
          expect(segments.length).to.equal(4);
        });
      });

      describe('label and hint', () => {
        it('should render a label when the label attribute is set', async () => {
          const el = await fixture<WaOtpInput>(html`<wa-otp-input label="Code"></wa-otp-input>`);
          const label = el.shadowRoot!.querySelector('[part~="label"]')!;
          expect(label.textContent?.trim()).to.equal('Code');
        });

        it('should render hint text when the hint attribute is set', async () => {
          const el = await fixture<WaOtpInput>(html`<wa-otp-input hint="6 digits"></wa-otp-input>`);
          const hint = el.shadowRoot!.querySelector('[part~="hint"]')!;
          expect(hint.textContent?.trim()).to.equal('6 digits');
        });
      });

      describe('value', () => {
        it('should reflect a prefilled value in the segments', async () => {
          const el = await fixture<WaOtpInput>(html`<wa-otp-input value="123"></wa-otp-input>`);
          expect(el.value).to.equal('123');
        });

        it('should filter non-numeric characters when type is numeric', async () => {
          const el = await fixture<WaOtpInput>(html`<wa-otp-input type="numeric"></wa-otp-input>`);
          el.value = 'ab12cd';
          expect(el.value).to.equal('12');
        });

        it('should filter non-alpha characters when type is alpha', async () => {
          const el = await fixture<WaOtpInput>(html`<wa-otp-input type="alpha" length="4"></wa-otp-input>`);
          el.value = 'a1b2';
          expect(el.value).to.equal('ab');
        });

        it('should allow letters and digits when type is alphanumeric', async () => {
          const el = await fixture<WaOtpInput>(html`<wa-otp-input type="alphanumeric" length="4"></wa-otp-input>`);
          el.value = 'a1b2';
          expect(el.value).to.equal('a1b2');
        });

        it('should uppercase when case is upper', async () => {
          const el = await fixture<WaOtpInput>(
            html`<wa-otp-input type="alpha" case="upper" length="3"></wa-otp-input>`,
          );
          el.value = 'abc';
          expect(el.value).to.equal('ABC');
        });

        it('should lowercase when case is lower', async () => {
          const el = await fixture<WaOtpInput>(
            html`<wa-otp-input type="alpha" case="lower" length="3"></wa-otp-input>`,
          );
          el.value = 'ABC';
          expect(el.value).to.equal('abc');
        });

        it('should truncate the value to effectiveLength', async () => {
          const el = await fixture<WaOtpInput>(html`<wa-otp-input length="4"></wa-otp-input>`);
          el.value = '123456';
          expect(el.value).to.equal('1234');
        });
      });

      describe('format', () => {
        it('should derive length from the format string', async () => {
          const el = await fixture<WaOtpInput>(html`<wa-otp-input format="### ###"></wa-otp-input>`);
          const segments = el.shadowRoot!.querySelectorAll('[part~="segment"]');
          expect(segments.length).to.equal(6);
        });

        it('should render separators from the format string', async () => {
          const el = await fixture<WaOtpInput>(html`<wa-otp-input format="###-###"></wa-otp-input>`);
          const separators = el.shadowRoot!.querySelectorAll('[part~="segment-separator"]');
          expect(separators.length).to.equal(1);
          expect(separators[0].textContent).to.equal('-');
        });

        it('should accept a value up to the number of # in format', async () => {
          const el = await fixture<WaOtpInput>(html`<wa-otp-input format="####-####"></wa-otp-input>`);
          el.value = '12345678';
          expect(el.value).to.equal('12345678');
        });
      });

      describe('events', () => {
        it('should fire an input event when typing', async () => {
          const el = await fixture<WaOtpInput>(html`<wa-otp-input></wa-otp-input>`);
          el.focus();
          const spy = sinon.spy();
          el.addEventListener('input', spy);
          await sendKeys({ type: '1' });
          expect(spy).to.have.been.called;
        });

        it('should fire a change event when value changes on blur', async () => {
          const el = await fixture<WaOtpInput>(html`<wa-otp-input></wa-otp-input>`);
          el.focus();
          await sendKeys({ type: '1' });
          const changePromise = oneEvent(el, 'change');
          el.blur();
          await changePromise;
        });

        it('should fire wa-complete once when all segments are filled', async () => {
          const el = await fixture<WaOtpInput>(html`<wa-otp-input length="3"></wa-otp-input>`);
          el.focus();
          const completePromise = oneEvent(el, 'wa-complete');
          await sendKeys({ type: '123' });
          await completePromise;
        });

        it('should not fire wa-complete again if typing continues after completion', async () => {
          const el = await fixture<WaOtpInput>(html`<wa-otp-input length="3"></wa-otp-input>`);
          const spy = sinon.spy();
          el.addEventListener('wa-complete', spy);
          el.value = '12';
          el.focus();
          await sendKeys({ type: '3' });
          await waitUntil(() => spy.callCount > 0);
          expect(spy.callCount).to.equal(1);
        });
      });

      describe('form integration', () => {
        it('should submit the value via FormData', async () => {
          const form = await fixture<HTMLFormElement>(html`
            <form>
              <wa-otp-input name="code" value="123456"></wa-otp-input>
            </form>
          `);
          const data = serialize(form);
          expect(data.code).to.equal('123456');
        });

        it('should associate with a form by id via the form attribute', async () => {
          const body = await fixture<HTMLDivElement>(html`
            <div>
              <form id="my-form"></form>
              <wa-otp-input name="code" form="my-form"></wa-otp-input>
            </div>
          `);
          const el = body.querySelector<WaOtpInput>('wa-otp-input')!;
          expect(el.getForm()?.id).to.equal('my-form');
        });

        it('should reset to defaultValue on form reset', async () => {
          const form = await fixture<HTMLFormElement>(html`
            <form>
              <wa-otp-input name="code" value="123456"></wa-otp-input>
            </form>
          `);
          const el = form.querySelector<WaOtpInput>('wa-otp-input')!;
          el.value = '999999';
          form.reset();
          await el.updateComplete;
          expect(el.value).to.equal('123456');
        });
      });

      describe('validation', () => {
        it('should be valid when empty and not required', async () => {
          const el = await fixture<WaOtpInput>(html`<wa-otp-input></wa-otp-input>`);
          expect(el.checkValidity()).to.equal(true);
        });

        it('should be invalid when empty and required', async () => {
          const el = await fixture<WaOtpInput>(html`<wa-otp-input required></wa-otp-input>`);
          expect(el.checkValidity()).to.equal(false);
          expect(el.validity.valueMissing).to.equal(true);
        });

        it('should be invalid (tooShort) when partially filled after user interaction', async () => {
          const el = await fixture<WaOtpInput>(html`<wa-otp-input></wa-otp-input>`);
          el.focus();
          await el.updateComplete;
          await sendKeys({ type: '123' });
          await el.updateComplete;
          expect(el.checkValidity()).to.equal(false);
          expect(el.validity.tooShort).to.equal(true);
        });

        it('should be valid when fully filled', async () => {
          const el = await fixture<WaOtpInput>(html`<wa-otp-input></wa-otp-input>`);
          el.value = '123456';
          await el.updateComplete;
          expect(el.checkValidity()).to.equal(true);
        });
      });

      describe('methods', () => {
        it('should clear the value and focus on clear()', async () => {
          const el = await fixture<WaOtpInput>(html`<wa-otp-input value="123"></wa-otp-input>`);
          el.clear();
          expect(el.value).to.equal('');
        });

        it('should focus the hidden input on focus()', async () => {
          const el = await fixture<WaOtpInput>(html`<wa-otp-input></wa-otp-input>`);
          const spy = sinon.spy();
          el.addEventListener('focus', spy);
          el.focus();
          await waitUntil(() => spy.calledOnce);
          expect(spy).to.have.been.calledOnce;
        });

        it('should blur on blur()', async () => {
          const el = await fixture<WaOtpInput>(html`<wa-otp-input></wa-otp-input>`);
          el.focus();
          const spy = sinon.spy();
          el.addEventListener('blur', spy);
          el.blur();
          await waitUntil(() => spy.calledOnce);
          expect(spy).to.have.been.calledOnce;
        });
      });

      describe('custom states', () => {
        it('should have --blank state when empty', async () => {
          const el = await fixture<WaOtpInput>(html`<wa-otp-input></wa-otp-input>`);
          await el.updateComplete;
          expect(el.matches(':state(--blank)')).to.equal(true);
        });

        it('should have --filled state when complete', async () => {
          const el = await fixture<WaOtpInput>(html`<wa-otp-input value="123456"></wa-otp-input>`);
          await el.updateComplete;
          expect(el.matches(':state(--filled)')).to.equal(true);
        });

        it('should not have --filled state when partially filled', async () => {
          const el = await fixture<WaOtpInput>(html`<wa-otp-input value="123"></wa-otp-input>`);
          await el.updateComplete;
          expect(el.matches(':state(--filled)')).to.equal(false);
        });
      });

      describe('mask', () => {
        it('should not expose filled segment text when mask is true', async () => {
          const el = await fixture<WaOtpInput>(html`<wa-otp-input value="123456" mask></wa-otp-input>`);
          const firstSegment = el.shadowRoot!.querySelector('[part~="segment"]')!;
          expect(firstSegment.textContent?.trim()).to.equal('•');
        });
      });

      describe('readonly', () => {
        it('should block keyboard input when readonly', async () => {
          const el = await fixture<WaOtpInput>(html`<wa-otp-input readonly></wa-otp-input>`);
          el.focus();
          await el.updateComplete;
          await sendKeys({ type: '123' });
          await el.updateComplete;
          expect(el.value).to.equal('');
        });

        it('should block backspace when readonly', async () => {
          const el = await fixture<WaOtpInput>(html`<wa-otp-input value="123456" readonly></wa-otp-input>`);
          el.focus();
          await el.updateComplete;
          await sendKeys({ press: 'Backspace' });
          await el.updateComplete;
          expect(el.value).to.equal('123456');
        });

        it('should still allow focus when readonly', async () => {
          const el = await fixture<WaOtpInput>(html`<wa-otp-input value="123456" readonly></wa-otp-input>`);
          const spy = sinon.spy();
          el.addEventListener('focus', spy);
          el.focus();
          await waitUntil(() => spy.calledOnce);
          expect(spy).to.have.been.calledOnce;
        });

        it('should have the readonly custom state when readonly', async () => {
          const el = await fixture<WaOtpInput>(html`<wa-otp-input readonly></wa-otp-input>`);
          await el.updateComplete;
          expect(el.matches(':state(readonly)')).to.equal(true);
        });

        it('should reflect the readonly attribute', async () => {
          const el = await fixture<WaOtpInput>(html`<wa-otp-input readonly></wa-otp-input>`);
          expect(el.hasAttribute('readonly')).to.equal(true);
        });
      });

      describe('placeholder', () => {
        it('should render placeholder hint chars in empty segments', async () => {
          const el = await fixture<WaOtpInput>(html`<wa-otp-input placeholder="·" length="3"></wa-otp-input>`);
          await el.updateComplete;
          const placeholders = el.shadowRoot!.querySelectorAll('.segment--placeholder');
          expect(placeholders.length).to.equal(3);
          expect(placeholders[0].textContent).to.equal('·');
        });

        it('should not show placeholder in segments that have a value', async () => {
          const el = await fixture<WaOtpInput>(
            html`<wa-otp-input placeholder="·" value="1" length="3"></wa-otp-input>`,
          );
          await el.updateComplete;
          const placeholders = el.shadowRoot!.querySelectorAll('.segment--placeholder');
          expect(placeholders.length).to.equal(2);
        });

        it('should show no placeholders when placeholder is empty', async () => {
          const el = await fixture<WaOtpInput>(html`<wa-otp-input length="3"></wa-otp-input>`);
          await el.updateComplete;
          const placeholders = el.shadowRoot!.querySelectorAll('.segment--placeholder');
          expect(placeholders.length).to.equal(0);
        });
      });

      describe('accessibility', () => {
        it('should have aria-describedby pointing to the hint element', async () => {
          const el = await fixture<WaOtpInput>(html`<wa-otp-input hint="Enter your code"></wa-otp-input>`);
          await el.updateComplete;
          const input = el.shadowRoot!.querySelector('.hidden-input')!;
          expect(input.getAttribute('aria-describedby')).to.equal('hint');
        });

        it('should have role=group on the segments container', async () => {
          const el = await fixture<WaOtpInput>(html`<wa-otp-input label="Code"></wa-otp-input>`);
          await el.updateComplete;
          const segments = el.shadowRoot!.querySelector('.segments')!;
          expect(segments.getAttribute('role')).to.equal('group');
        });
      });
    });
  }
});
