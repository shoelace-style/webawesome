import { aTimeout, expect, oneEvent, waitUntil } from '@open-wc/testing';
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
          expect(el.size).to.equal('m');
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

        it('should not reflect a value attribute when none was set', async () => {
          // Regression guard: defaultValue previously initialized to '' when the attribute was
          // absent, and since it's a reflecting property, Lit would then write value="" back
          // onto the element even though the author never set one.
          const el = await fixture<WaOtpInput>(html`<wa-otp-input></wa-otp-input>`);
          expect(el.defaultValue).to.equal(null);
          expect(el.hasAttribute('value')).to.equal(false);
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
          const separators = el.shadowRoot!.querySelectorAll('[part~="segment-literal"]');
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

        it('should fire exactly one input event per keystroke, carrying the typed character', async () => {
          // Regression guard: handleInput() previously dispatched a synthetic 'input' event in
          // addition to the real native one that already bubbles/composes out of the shadow
          // root on its own, causing every keystroke to fire the event twice (the second with
          // no `data`).
          const el = await fixture<WaOtpInput>(html`<wa-otp-input></wa-otp-input>`);
          el.focus();
          const spy = sinon.spy();
          el.addEventListener('input', spy);
          await sendKeys({ type: '1' });
          await waitUntil(() => spy.called);
          expect(spy).to.have.been.calledOnce;
          const event = spy.firstCall.args[0] as InputEvent;
          expect(event.data).to.equal('1');
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

      describe('autosubmit', () => {
        it('should submit the form when autosubmit is enabled and the value completes', async () => {
          const form = await fixture<HTMLFormElement>(
            html`<form><wa-otp-input name="code" length="3" autosubmit></wa-otp-input></form>`,
          );
          const el = form.querySelector<WaOtpInput>('wa-otp-input')!;
          const submitHandler = sinon.spy((event: SubmitEvent) => event.preventDefault());

          form.addEventListener('submit', submitHandler);
          el.focus();
          await sendKeys({ type: '123' });
          await waitUntil(() => submitHandler.calledOnce);

          expect(submitHandler).to.have.been.calledOnce;
        });

        it('should not submit the form when autosubmit is disabled', async () => {
          const form = await fixture<HTMLFormElement>(
            html`<form><wa-otp-input name="code" length="3"></wa-otp-input></form>`,
          );
          const el = form.querySelector<WaOtpInput>('wa-otp-input')!;
          const submitHandler = sinon.spy((event: SubmitEvent) => event.preventDefault());

          form.addEventListener('submit', submitHandler);
          el.focus();
          await sendKeys({ type: '123' });
          await el.updateComplete;

          expect(submitHandler).to.not.have.been.called;
        });

        it('should not submit the form when wa-complete is canceled', async () => {
          const form = await fixture<HTMLFormElement>(
            html`<form><wa-otp-input name="code" length="3" autosubmit></wa-otp-input></form>`,
          );
          const el = form.querySelector<WaOtpInput>('wa-otp-input')!;
          const submitHandler = sinon.spy((event: SubmitEvent) => event.preventDefault());

          form.addEventListener('submit', submitHandler);
          el.addEventListener('wa-complete', event => event.preventDefault());
          el.focus();
          await sendKeys({ type: '123' });
          await el.updateComplete;

          expect(submitHandler).to.not.have.been.called;
        });

        it('should not submit again when typing continues after completion', async () => {
          const form = await fixture<HTMLFormElement>(
            html`<form><wa-otp-input name="code" length="3" autosubmit></wa-otp-input></form>`,
          );
          const el = form.querySelector<WaOtpInput>('wa-otp-input')!;
          const submitHandler = sinon.spy((event: SubmitEvent) => event.preventDefault());

          form.addEventListener('submit', submitHandler);
          el.value = '12';
          el.focus();
          await sendKeys({ type: '3' });
          await waitUntil(() => submitHandler.calledOnce);
          await sendKeys({ press: 'Backspace' });
          await sendKeys({ type: '3' });
          await el.updateComplete;

          expect(submitHandler).to.have.been.calledOnce;
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

      describe('appearance', () => {
        it('should draw the active segment focus ring inward for contained appearance', async () => {
          // Regression guard: contained segments sit flush with zero gap and have no border of
          // their own, so the focus ring's default positive outline-offset bled into the
          // neighboring segment, rendering as a stray line at each shared edge.
          const el = await fixture<WaOtpInput>(html`<wa-otp-input appearance="contained" value="1"></wa-otp-input>`);
          el.focus();
          await el.updateComplete;
          await aTimeout(200); // let the outline-offset transition settle
          const active = el.shadowRoot!.querySelector('.segment--active') as HTMLElement;
          expect(getComputedStyle(active).outlineOffset).to.equal('-3px');
        });

        it('should keep the default outward focus ring for outlined appearance', async () => {
          const el = await fixture<WaOtpInput>(html`<wa-otp-input appearance="outlined" value="1"></wa-otp-input>`);
          el.focus();
          await el.updateComplete;
          await aTimeout(200);
          const active = el.shadowRoot!.querySelector('.segment--active') as HTMLElement;
          expect(getComputedStyle(active).outlineOffset).to.equal('1px');
        });
      });

      describe('selection', () => {
        // el.select() calls the hidden input's native .select(), which produces the same
        // (selectionStart, selectionEnd) range as a user pressing Cmd/Ctrl+A — this is the
        // mechanism under test, independent of OS/browser keyboard-shortcut quirks. The
        // browser's 'select' event fires asynchronously, so tests wait for it explicitly
        // before driving further key presses.
        async function selectAllAndWait(el: WaOtpInput) {
          const selectPromise = oneEvent(el.input, 'select');
          el.select();
          await selectPromise;
        }

        it('should clear the whole value when Backspace is pressed after select()', async () => {
          const el = await fixture<WaOtpInput>(html`<wa-otp-input value="123456"></wa-otp-input>`);
          el.focus();
          await el.updateComplete;
          await selectAllAndWait(el);
          await sendKeys({ press: 'Backspace' });
          await el.updateComplete;
          expect(el.value).to.equal('');
        });

        it('should clear the whole value when Delete is pressed after select()', async () => {
          const el = await fixture<WaOtpInput>(html`<wa-otp-input value="123456"></wa-otp-input>`);
          el.focus();
          await el.updateComplete;
          await selectAllAndWait(el);
          await sendKeys({ press: 'Delete' });
          await el.updateComplete;
          expect(el.value).to.equal('');
        });

        it('should only select entered characters, not the full segment length', async () => {
          const el = await fixture<WaOtpInput>(html`<wa-otp-input value="123" length="6"></wa-otp-input>`);
          el.focus();
          await el.updateComplete;
          await selectAllAndWait(el);
          await sendKeys({ press: 'Backspace' });
          await el.updateComplete;
          expect(el.value).to.equal('');
        });

        it('should highlight all filled segments as selected and hide the caret', async () => {
          const el = await fixture<WaOtpInput>(html`<wa-otp-input value="123456"></wa-otp-input>`);
          el.focus();
          await el.updateComplete;
          await selectAllAndWait(el);
          await el.updateComplete;
          const selectedSegments = el.shadowRoot!.querySelectorAll('.segment--selected');
          expect(selectedSegments.length).to.equal(6);
          expect(el.shadowRoot!.querySelector('.caret')).to.equal(null);
        });

        it('should visibly change the segment border color when selected', async () => {
          // Regression guard: .segment--selected previously lost the cascade to the
          // appearance rules (e.g. outlined/filled), which have equal-or-higher CSS
          // specificity, so the class was applied but never visually rendered.
          const el = await fixture<WaOtpInput>(html`<wa-otp-input value="123456"></wa-otp-input>`);
          el.focus();
          await el.updateComplete;
          const segment = el.shadowRoot!.querySelector('[part~="segment"]') as HTMLElement;
          const unselectedBorderColor = getComputedStyle(segment).borderColor;
          await selectAllAndWait(el);
          await el.updateComplete;
          await aTimeout(200); // let the border-color transition settle
          const selectedBorderColor = getComputedStyle(segment).borderColor;
          expect(selectedBorderColor).to.not.equal(unselectedBorderColor);
        });

        it('should still replace the value when typing over a full selection', async () => {
          const el = await fixture<WaOtpInput>(html`<wa-otp-input value="123456"></wa-otp-input>`);
          el.focus();
          await el.updateComplete;
          await selectAllAndWait(el);
          await sendKeys({ type: '9' });
          await el.updateComplete;
          expect(el.value).to.equal('9');
        });

        it('should preserve an active selection across an unrelated re-render', async () => {
          const el = await fixture<WaOtpInput>(html`<wa-otp-input value="123456"></wa-otp-input>`);
          el.focus();
          await el.updateComplete;
          await selectAllAndWait(el);
          // An unrelated reactive property change re-renders the component; syncCursor()
          // must not collapse the selection back to a single caret in the process.
          el.placeholder = '·';
          await el.updateComplete;
          await sendKeys({ press: 'Backspace' });
          await el.updateComplete;
          expect(el.value).to.equal('');
        });

        it('should clear the selection when a specific segment is clicked', async () => {
          const el = await fixture<WaOtpInput>(html`<wa-otp-input value="123456"></wa-otp-input>`);
          el.focus();
          await el.updateComplete;
          await selectAllAndWait(el);
          const segments = el.shadowRoot!.querySelectorAll<HTMLElement>('[part~="segment"]');
          segments[2].dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
          await el.updateComplete;
          await sendKeys({ press: 'Backspace' });
          await el.updateComplete;
          expect(el.value).to.equal('12456');
        });

        it('should not delete the value when Backspace is pressed after select() while readonly', async () => {
          const el = await fixture<WaOtpInput>(html`<wa-otp-input value="123456" readonly></wa-otp-input>`);
          el.focus();
          await el.updateComplete;
          await selectAllAndWait(el);
          await sendKeys({ press: 'Backspace' });
          await el.updateComplete;
          expect(el.value).to.equal('123456');
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

        it('should not highlight a segment as active when focused', async () => {
          const el = await fixture<WaOtpInput>(html`<wa-otp-input value="123456" readonly></wa-otp-input>`);
          el.focus();
          await el.updateComplete;
          const active = el.shadowRoot!.querySelectorAll('.segment--active, .segment--selected');
          expect(active.length).to.equal(0);
        });

        it('should not highlight or move a segment when arrow keys are pressed', async () => {
          const el = await fixture<WaOtpInput>(html`<wa-otp-input value="123456" readonly></wa-otp-input>`);
          el.focus();
          await el.updateComplete;
          await sendKeys({ press: 'ArrowRight' });
          await sendKeys({ press: 'ArrowLeft' });
          await el.updateComplete;
          const active = el.shadowRoot!.querySelectorAll('.segment--active, .segment--selected');
          expect(active.length).to.equal(0);
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

      describe('caret', () => {
        it('should show the caret in an empty active segment', async () => {
          const el = await fixture<WaOtpInput>(html`<wa-otp-input label="Code"></wa-otp-input>`);
          el.focus();
          await el.updateComplete;
          expect(el.shadowRoot!.querySelector('.caret')).to.exist;
        });

        it('should not draw the caret over a filled segment', async () => {
          // A filled active segment is in replace mode — the ring marks it; a caret
          // through the existing character reads as a strikethrough.
          const el = await fixture<WaOtpInput>(html`<wa-otp-input label="Code" value="123456"></wa-otp-input>`);
          el.focus();
          await el.updateComplete;
          expect(el.shadowRoot!.querySelector('.caret')).to.not.exist;
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

        it('should pass accessibility checks', async () => {
          const el = await fixture<WaOtpInput>(
            html`<wa-otp-input label="Verification code" hint="Check your email for a 6-digit code."></wa-otp-input>`,
          );
          await el.updateComplete;
          await expect(el).to.be.accessible();
        });
      });

      describe('enter key', () => {
        it('should submit the containing form when enter is pressed', async () => {
          const form = await fixture<HTMLFormElement>(
            html`<form><wa-otp-input name="code" length="3" value="123"></wa-otp-input></form>`,
          );
          const el = form.querySelector<WaOtpInput>('wa-otp-input')!;
          const submitHandler = sinon.spy((event: SubmitEvent) => event.preventDefault());

          form.addEventListener('submit', submitHandler);
          el.focus();
          await sendKeys({ press: 'Enter' });
          await waitUntil(() => submitHandler.calledOnce);

          expect(submitHandler).to.have.been.calledOnce;
        });
      });

      describe('tab key', () => {
        it('should move focus out of the field when tab is pressed', async () => {
          const container = await fixture<HTMLDivElement>(
            html`<div>
              <wa-otp-input label="Code"></wa-otp-input>
              <button type="button">After</button>
            </div>`,
          );
          const el = container.querySelector<WaOtpInput>('wa-otp-input')!;
          const button = container.querySelector('button')!;

          el.focus();
          await sendKeys({ press: 'Tab' });

          expect(document.activeElement).to.equal(button);
        });
      });

      describe('right-to-left', () => {
        it('should keep segments laid out left-to-right in RTL contexts', async () => {
          const container = await fixture<HTMLDivElement>(
            html`<div dir="rtl"><wa-otp-input label="Code" value="12"></wa-otp-input></div>`,
          );
          const el = container.querySelector<WaOtpInput>('wa-otp-input')!;
          await el.updateComplete;
          const segments = el.shadowRoot!.querySelector('.segments')!;
          expect(getComputedStyle(segments).direction).to.equal('ltr');
        });
      });

      describe('autofill', () => {
        it('should filter, not truncate, raw values that exceed the segment count', async () => {
          const el = await fixture<WaOtpInput>(html`<wa-otp-input label="Code"></wa-otp-input>`);
          await el.updateComplete;
          const input = el.shadowRoot!.querySelector<HTMLInputElement>('.hidden-input')!;

          // Simulate browser autofill: set the raw input value (with separators) and fire input
          input.value = '123 456';
          input.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
          await el.updateComplete;

          // maxlength would truncate an autofilled "123 456" to "123 45" before filtering ran
          expect(input.hasAttribute('maxlength')).to.be.false;
          expect(el.value).to.equal('123456');
        });
      });
    });
  }
});
