import { expect } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit';
import sinon from 'sinon';
import { fixtures } from '../../internal/test/fixture.js';
import type WaDurationInput from './duration-input.js';

describe('<wa-duration-input>', () => {
  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      it('submits the initial value and restores it on reset', async () => {
        const form = await fixture<HTMLFormElement>(html`
          <form><wa-duration-input name="duration" value="01:02:03.004"></wa-duration-input></form>
        `);
        const el = form.querySelector('wa-duration-input')!;
        await el.updateComplete;
        expect(new FormData(form).get('duration')).to.equal('01:02:03.004');
        el.value = '02:03:04.005';
        await el.updateComplete;
        form.reset();
        await el.updateComplete;
        expect(el.value).to.equal('01:02:03.004');
        expect(new FormData(form).get('duration')).to.equal('01:02:03.004');
      });

      it('treats an untouched required input as empty and allows an explicit zero', async () => {
        const el = await fixture<WaDurationInput>(
          html`<wa-duration-input label="Duration" required></wa-duration-input>`,
        );
        expect(el.checkValidity()).to.be.false;
        el.value = '00:00:00.000';
        await el.updateComplete;
        expect(el.checkValidity()).to.be.true;
      });

      it('accepts an explicitly typed zero even when the displayed segment was already zero', async () => {
        const el = await fixture<WaDurationInput>(
          html`<wa-duration-input label="Duration" required></wa-duration-input>`,
        );
        el.focus();
        await sendKeys({ type: '00' });
        el.blur();
        await el.updateComplete;
        expect(el.value).to.equal('00:00:00.000');
        expect(el.checkValidity()).to.be.true;
      });

      it('rejects invalid values and preserves them rather than submitting a different duration', async () => {
        const el = await fixture<WaDurationInput>(html`
          <wa-duration-input label="Duration" value="01:99:00.000"></wa-duration-input>
        `);
        expect(el.value).to.equal('01:99:00.000');
        expect(el.checkValidity()).to.be.false;
        expect(el.validity.badInput).to.be.true;
      });

      it('validates inclusive duration limits across hours and days', async () => {
        const form = await fixture<HTMLFormElement>(html`
          <form>
            <wa-duration-input name="duration" min="24:00:00.000" max="2:00:00:00.000" value="1:00:00:00.000">
            </wa-duration-input>
          </form>
        `);
        const el = form.querySelector('wa-duration-input')!;
        expect(form.checkValidity()).to.be.true;
        el.value = '23:59:59.999';
        await el.updateComplete;
        expect(el.validity.rangeUnderflow).to.be.true;
        expect(form.checkValidity()).to.be.false;
        expect(new FormData(form).get('duration')).to.equal('23:59:59.999');
        el.value = '2:00:00:00.000';
        await el.updateComplete;
        expect(el.checkValidity()).to.be.true;
        el.value = '2:00:00:00.001';
        await el.updateComplete;
        expect(el.validity.rangeOverflow).to.be.true;
        el.max = '3:00:00:00.000';
        await el.updateComplete;
        expect(el.checkValidity()).to.be.true;
        el.value = null;
        await el.updateComplete;
        expect(el.checkValidity()).to.be.true;
      });

      it('compares large day limits without losing millisecond precision', async () => {
        const el = await fixture<WaDurationInput>(html`
          <wa-duration-input
            show-days
            min="375299968947541:23:59:59.998"
            max="375299968947541:23:59:59.999"
            value="375299968947541:23:59:59.997"
          ></wa-duration-input>
        `);
        expect(el.validity.rangeUnderflow).to.be.true;
        el.value = '375299968947541:23:59:59.998';
        await el.updateComplete;
        expect(el.checkValidity()).to.be.true;
      });

      it('reports invalid or reversed limits and recovers when corrected', async () => {
        const el = await fixture<WaDurationInput>(html`
          <wa-duration-input min="invalid" value="01:00:00.000"></wa-duration-input>
        `);
        expect(el.validity.customError).to.be.true;
        expect(el.validationMessage).to.contain('Duration limits');
        el.min = '02:00:00.000';
        el.max = '01:00:00.000';
        await el.updateComplete;
        expect(el.validity.customError).to.be.true;
        expect(el.validationMessage).to.contain('Minimum duration');
        el.min = '00:00:00.000';
        await el.updateComplete;
        expect(el.checkValidity()).to.be.true;
      });

      it('renders configurable dividers as text without changing the submitted value', async () => {
        const form = await fixture<HTMLFormElement>(html`
          <form>
            <wa-duration-input
              name="duration"
              show-days
              value="2:03:04:05.006"
              days-divider=" days "
              hours-divider="h "
              minutes-divider=""
              seconds-divider="&lt;b&gt;"
              microseconds-divider="ms"
            ></wa-duration-input>
          </form>
        `);
        const el = form.querySelector('wa-duration-input')!;
        const dividers = el.shadowRoot!.querySelectorAll('.divider');
        expect([...dividers].map(divider => divider.textContent)).to.deep.equal([' days ', 'h ', '', '<b>', 'ms']);
        expect(el.shadowRoot!.querySelector('b')).to.be.null;
        expect(new FormData(form).get('duration')).to.equal('2:03:04:05.006');
        el.hoursDivider = ' hours ';
        el.microsecondsDivider = '';
        el.showDays = false;
        await el.updateComplete;
        expect([...el.shadowRoot!.querySelectorAll('.divider')].map(divider => divider.textContent)).to.deep.equal([
          ' hours ',
          '',
          '<b>',
        ]);
        expect(new FormData(form).get('duration')).to.equal('2:03:04:05.006');
      });

      it('keeps the left unit’s divider between visible segments and preserves hidden values', async () => {
        const form = await fixture<HTMLFormElement>(html`
          <form>
            <wa-duration-input
              name="duration"
              label="Duration"
              value="2:03:04:05.006"
              days-divider="D"
              hours-divider="H"
              minutes-divider="M"
              seconds-divider="S"
              microseconds-divider="Z"
            ></wa-duration-input>
          </form>
        `);
        const el = form.querySelector('wa-duration-input')!;
        const names = ['Days', 'Hours', 'Minutes', 'Seconds', 'Milliseconds'];
        const dividers = ['D', 'H', 'M', 'S'];
        for (let mask = 0; mask < 32; mask++) {
          el.showDays = !!(mask & 1);
          el.withoutHours = !(mask & 2);
          el.withoutMinutes = !(mask & 4);
          el.withoutSeconds = !(mask & 8);
          el.withoutMilliseconds = !(mask & 16);
          await el.updateComplete;
          const visible = names.filter((_name, index) => mask & (1 << index));
          expect([...el.shadowRoot!.querySelectorAll('input')].map(input => input.dataset.segment)).to.deep.equal(
            visible,
          );
          const expected = visible.slice(0, -1).map(name => dividers[names.indexOf(name)]);
          if (mask & 16) expected.push('Z');
          expect([...el.shadowRoot!.querySelectorAll('.divider')].map(divider => divider.textContent)).to.deep.equal(
            expected,
          );
          expect(el.value).to.equal('2:03:04:05.006');
          expect(new FormData(form).get('duration')).to.equal('2:03:04:05.006');
        }
      });

      it('supports unit hide and show methods and labels the first visible field', async () => {
        const el = await fixture<WaDurationInput>(
          html`<wa-duration-input label="Duration" value="01:02:03.004"></wa-duration-input>`,
        );
        const units: Array<[string, () => void, () => void, string]> = [
          ['no-hours', () => el.hideHours(), () => el.showHours(), '#hours'],
          ['no-minutes', () => el.hideMinutes(), () => el.showMinutes(), '#minutes'],
          ['no-seconds', () => el.hideSeconds(), () => el.showSeconds(), '#seconds'],
          ['no-microseconds', () => el.hideMicroSeconds(), () => el.showMicroSeconds(), '#milliseconds'],
        ];
        for (const [attribute, hide, show, selector] of units) {
          hide();
          await el.updateComplete;
          expect(el.hasAttribute(attribute)).to.be.true;
          expect(el.shadowRoot!.querySelector(selector)).to.be.null;
          show();
          await el.updateComplete;
          expect(el.hasAttribute(attribute)).to.be.false;
          expect(el.shadowRoot!.querySelector(selector)).not.to.be.null;
        }
        el.hideHours();
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('label')!.htmlFor).to.equal('minutes');
        el.focus();
        expect(el.shadowRoot!.activeElement).to.equal(el.shadowRoot!.querySelector('#minutes'));
        await expect(el).to.be.accessible();
      });

      it('commits an edit before hiding its segment and moves focus to the next visible unit', async () => {
        const el = await fixture<WaDurationInput>(html`
          <wa-duration-input label="Duration" value="01:02:03.004" no-hours></wa-duration-input>
        `);
        el.focus();
        await sendKeys({ type: '7' });
        el.hideMinutes();
        await el.updateComplete;
        expect(el.value).to.equal('01:07:03.004');
        expect(el.shadowRoot!.activeElement).to.equal(el.shadowRoot!.querySelector('#seconds'));
        await sendKeys({ type: '08' });
        await el.updateComplete;
        expect(el.value).to.equal('01:07:08.004');
        expect(el.shadowRoot!.activeElement).to.equal(el.shadowRoot!.querySelector('#milliseconds'));
      });

      it('submits and resets day values, including an explicit required zero', async () => {
        const form = await fixture<HTMLFormElement>(html`
          <form>
            <wa-duration-input name="duration" label="Duration" show-days required value="184:05:10:10.006">
            </wa-duration-input>
          </form>
        `);
        const el = form.querySelector('wa-duration-input')!;
        expect(el.shadowRoot!.querySelectorAll('input')).to.have.length(5);
        expect(new FormData(form).get('duration')).to.equal('184:05:10:10.006');
        el.value = '0:00:00:00.000';
        await el.updateComplete;
        expect(el.checkValidity()).to.be.true;
        form.reset();
        await el.updateComplete;
        expect(el.value).to.equal('184:05:10:10.006');
        expect(new FormData(form).get('duration')).to.equal('184:05:10:10.006');
        await expect(el).to.be.accessible();
      });

      it('normalizes an initial hours-only value in day mode without marking it as edited', async () => {
        const form = await fixture<HTMLFormElement>(html`
          <form><wa-duration-input name="duration" show-days value="99:00:00.000"></wa-duration-input></form>
        `);
        const el = form.querySelector('wa-duration-input')!;
        expect(el.value).to.equal('4:03:00:00.000');
        expect(new FormData(form).get('duration')).to.equal('4:03:00:00.000');
        el.setAttribute('value', '48:01:02.003');
        await el.updateComplete;
        expect(el.value).to.equal('2:00:01:02.003');
        expect(new FormData(form).get('duration')).to.equal('2:00:01:02.003');
        form.reset();
        await el.updateComplete;
        expect(el.value).to.equal('2:00:01:02.003');
      });

      it('keeps an untouched day input empty until a zero is entered', async () => {
        const el = await fixture<WaDurationInput>(html`<wa-duration-input show-days required></wa-duration-input>`);
        expect(el.value).to.be.null;
        expect(el.checkValidity()).to.be.false;
        el.focus();
        await sendKeys({ type: '0' });
        el.blur();
        expect(el.value).to.equal('0:00:00:00.000');
        expect(el.checkValidity()).to.be.true;
      });

      it('converts hours when days are enabled and preserves days when hidden', async () => {
        const form = await fixture<HTMLFormElement>(html`
          <form><wa-duration-input name="duration" value="99:59:59.999"></wa-duration-input></form>
        `);
        const el = form.querySelector('wa-duration-input')!;
        el.showDays = true;
        await el.updateComplete;
        expect(el.value).to.equal('4:03:59:59.999');
        expect(new FormData(form).get('duration')).to.equal('4:03:59:59.999');
        expect(el.shadowRoot!.querySelector<HTMLInputElement>('#days')!.value).to.equal('4');
        el.showDays = false;
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('#days')).to.be.null;
        expect(el.value).to.equal('4:03:59:59.999');
        expect(new FormData(form).get('duration')).to.equal('4:03:59:59.999');
        el.showDays = true;
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector<HTMLInputElement>('#days')!.value).to.equal('4');
      });

      it('rejects out-of-range day values and day-mode hours', async () => {
        const el = await fixture<WaDurationInput>(html`<wa-duration-input show-days></wa-duration-input>`);
        for (const value of ['1:24:00:00.000', '375299968947542:00:00:00.000', '1.5:00:00:00.000']) {
          el.value = value;
          await el.updateComplete;
          expect(el.value).to.equal(value);
          expect(el.validity.badInput).to.be.true;
        }
        el.value = '375299968947541:23:00:00.000';
        await el.updateComplete;
        expect(el.checkValidity()).to.be.true;
      });

      it('allows multi-digit days and carries and borrows when stepping hours', async () => {
        const el = await fixture<WaDurationInput>(html`
          <wa-duration-input show-days value="2:23:00:00.000"></wa-duration-input>
        `);
        const day = el.shadowRoot!.querySelector<HTMLInputElement>('#days')!;
        const hour = el.shadowRoot!.querySelector<HTMLInputElement>('#hours')!;
        hour.focus();
        await sendKeys({ press: 'ArrowUp' });
        expect(el.value).to.equal('3:00:00:00.000');
        await sendKeys({ press: 'ArrowDown' });
        expect(el.value).to.equal('2:23:00:00.000');
        day.focus();
        await sendKeys({ type: '184' });
        expect(el.value).to.equal('2:23:00:00.000');
        await sendKeys({ press: ':' });
        expect(el.value).to.equal('184:23:00:00.000');
        expect(el.shadowRoot!.activeElement).to.equal(hour);
        await el.updateComplete;
        expect(day.style.width).to.equal('3ch');
        el.value = '0:00:00:00.000';
        await el.updateComplete;
        await sendKeys({ press: 'ArrowDown' });
        expect(el.value).to.equal('0:00:00:00.000');
        el.value = '375299968947541:23:00:00.000';
        await el.updateComplete;
        await sendKeys({ press: 'ArrowUp' });
        expect(el.value).to.equal('375299968947541:23:00:00.000');
      });

      it('commits an in-progress day edit before hiding the days segment', async () => {
        const el = await fixture<WaDurationInput>(html`
          <wa-duration-input show-days value="2:03:00:00.000"></wa-duration-input>
        `);
        el.shadowRoot!.querySelector<HTMLInputElement>('#days')!.focus();
        await sendKeys({ type: '184' });
        el.showDays = false;
        await el.updateComplete;
        expect(el.value).to.equal('184:03:00:00.000');
      });

      it('commits segment edits and emits one change event', async () => {
        const el = await fixture<WaDurationInput>(html`
          <wa-duration-input label="Duration" value="01:02:03.004"></wa-duration-input>
        `);
        const inputs = el.shadowRoot!.querySelectorAll('input');
        const onInput = sinon.spy();
        const onChange = sinon.spy();
        el.addEventListener('input', onInput);
        el.addEventListener('change', onChange);
        inputs[1].focus();
        await sendKeys({ type: '7' });
        await el.updateComplete;
        expect(inputs[1].value).to.equal('7');
        expect(el.value).to.equal('01:02:03.004');
        inputs[1].blur();
        await el.updateComplete;
        expect(el.value).to.equal('01:07:03.004');
        expect(onInput).to.have.been.calledOnce;
        expect(onChange).to.have.been.calledOnce;
      });

      it('clears a value, updates the form and validity, and restores the default on reset', async () => {
        const form = await fixture<HTMLFormElement>(html`
          <form>
            <wa-duration-input
              name="duration"
              label="Duration"
              value="2:03:04:05.006"
              show-days
              required
              with-clear
            ></wa-duration-input>
          </form>
        `);
        const el = form.querySelector('wa-duration-input')!;
        const events: string[] = [];
        for (const name of ['wa-clear', 'input', 'change']) {
          el.addEventListener(name, () => {
            events.push(name);
            expect(new FormData(form).get('duration')).to.equal('');
          });
        }
        el.shadowRoot!.querySelector<HTMLButtonElement>('[part~="clear-button"]')!.click();
        await el.updateComplete;
        expect(el.value).to.be.null;
        expect(el.validity.valueMissing).to.be.true;
        expect(el.shadowRoot!.activeElement).to.equal(el.shadowRoot!.querySelector('#days'));
        expect(el.shadowRoot!.querySelector('[part~="clear-button"]')).to.be.null;
        expect(events).to.deep.equal(['wa-clear', 'input', 'change']);
        form.reset();
        await el.updateComplete;
        expect(el.value).to.equal('2:03:04:05.006');
        expect(new FormData(form).get('duration')).to.equal('2:03:04:05.006');
        expect(el.checkValidity()).to.be.true;
      });

      it('clears a pending edit and permits keyboard activation', async () => {
        const el = await fixture<WaDurationInput>(
          html`<wa-duration-input label="Duration" with-clear></wa-duration-input>`,
        );
        el.focus();
        await sendKeys({ type: '7' });
        await el.updateComplete;
        expect(el.value).to.be.null;
        expect(el.shadowRoot!.querySelector('[part~="clear-button"]')).not.to.be.null;
        await sendKeys({ press: 'Tab' });
        expect(el.shadowRoot!.activeElement).to.equal(el.shadowRoot!.querySelector('[part~="clear-button"]'));
        await sendKeys({ press: 'Enter' });
        await el.updateComplete;
        expect(el.value).to.be.null;
        expect(el.shadowRoot!.activeElement).to.equal(el.shadowRoot!.querySelector('#hours'));
        expect(el.shadowRoot!.querySelector<HTMLInputElement>('#hours')!.value).to.equal('00');
      });

      it('discards a pending edit when the clear button is clicked', async () => {
        const el = await fixture<WaDurationInput>(
          html`<wa-duration-input label="Duration" value="01:02:03.004" with-clear></wa-duration-input>`,
        );
        const changes = sinon.spy();
        el.addEventListener('change', changes);
        el.focus();
        await sendKeys({ type: '7' });
        await el.updateComplete;
        const button = el.shadowRoot!.querySelector<HTMLButtonElement>('[part~="clear-button"]')!;
        const mouseDown = new MouseEvent('mousedown', { bubbles: true, cancelable: true });
        button.dispatchEvent(mouseDown);
        expect(mouseDown.defaultPrevented).to.be.true;
        button.click();
        el.blur();
        await el.updateComplete;
        expect(el.value).to.be.null;
        expect(changes).to.have.been.calledOnce;
      });

      it('hides the clear button while readonly or disabled', async () => {
        const el = await fixture<WaDurationInput>(html`
          <wa-duration-input label="Duration" value="00:00:00.000" with-clear></wa-duration-input>
        `);
        expect(el.shadowRoot!.querySelector('[part~="clear-button"]')).not.to.be.null;
        el.readonly = true;
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('[part~="clear-button"]')).to.be.null;
        el.readonly = false;
        el.disabled = true;
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('[part~="clear-button"]')).to.be.null;
        el.disabled = false;
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('[part~="clear-button"]')).not.to.be.null;
      });

      it('renders start, end, and custom clear-icon slots', async () => {
        const el = await fixture<WaDurationInput>(html`
          <wa-duration-input label="Duration" value="01:02:03.004" with-clear>
            <span slot="start" aria-hidden="true">start</span>
            <span slot="end" aria-hidden="true">end</span>
            <span slot="clear-icon" aria-hidden="true">x</span>
          </wa-duration-input>
        `);
        for (const name of ['start', 'end', 'clear-icon']) {
          const slot = el.shadowRoot!.querySelector<HTMLSlotElement>(`slot[name="${name}"]`)!;
          expect(slot.assignedElements()).to.have.length(1);
        }
        await expect(el).to.be.accessible();
      });

      it('advances after a complete segment and wraps when stepping', async () => {
        const el = await fixture<WaDurationInput>(html`
          <wa-duration-input label="Duration" value="99:59:03.004"></wa-duration-input>
        `);
        const inputs = el.shadowRoot!.querySelectorAll('input');
        const onInput = sinon.spy();
        const onChange = sinon.spy();
        el.addEventListener('input', onInput);
        el.addEventListener('change', onChange);
        inputs[0].focus();
        await sendKeys({ press: 'ArrowUp' });
        expect(el.value).to.equal('00:59:03.004');
        await sendKeys({ type: '12' });
        await el.updateComplete;
        expect(el.value).to.equal('12:59:03.004');
        expect(el.shadowRoot!.activeElement).to.equal(inputs[1]);
        expect(onInput).to.have.been.calledThrice;
        expect(onChange).to.have.been.calledTwice;
        await sendKeys({ press: 'ArrowUp' });
        expect(el.value).to.equal('12:00:03.004');
      });

      it('navigates and flushes partial input without changing the value for readonly controls', async () => {
        const el = await fixture<WaDurationInput>(html`
          <wa-duration-input label="Duration" value="01:02:03.004"></wa-duration-input>
        `);
        const inputs = el.shadowRoot!.querySelectorAll('input');
        inputs[1].focus();
        await sendKeys({ type: '7' });
        await sendKeys({ press: 'ArrowRight' });
        expect(el.value).to.equal('01:07:03.004');
        expect(el.shadowRoot!.activeElement).to.equal(inputs[2]);
        el.readonly = true;
        await el.updateComplete;
        await sendKeys({ type: '9' });
        await sendKeys({ press: 'ArrowUp' });
        expect(el.value).to.equal('01:07:03.004');
      });

      it('commits a native input edit and clears pending typing on reset', async () => {
        const form = await fixture<HTMLFormElement>(html`
          <form><wa-duration-input name="duration" value="01:02:03.004"></wa-duration-input></form>
        `);
        const el = form.querySelector('wa-duration-input')!;
        const input = el.shadowRoot!.querySelectorAll('input')[1];
        input.focus();
        input.value = '42';
        input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
        input.blur();
        expect(el.value).to.equal('01:42:03.004');
        input.focus();
        await sendKeys({ type: '7' });
        form.reset();
        await el.updateComplete;
        input.blur();
        expect(el.value).to.equal('01:02:03.004');
        expect(new FormData(form).get('duration')).to.equal('01:02:03.004');
      });

      it('disables the segments and excludes the value from submission in a disabled fieldset', async () => {
        const form = await fixture<HTMLFormElement>(html`
          <form>
            <fieldset disabled><wa-duration-input name="duration" value="01:02:03.004"></wa-duration-input></fieldset>
          </form>
        `);
        const el = form.querySelector('wa-duration-input')!;
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('input')!.disabled).to.be.true;
        expect(getComputedStyle(el.shadowRoot!.querySelector<HTMLElement>('.duration-field')!).opacity).to.equal('0.5');
        expect(new FormData(form).has('duration')).to.be.false;
        form.querySelector('fieldset')!.disabled = false;
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('input')!.disabled).to.be.false;
        expect(new FormData(form).get('duration')).to.equal('01:02:03.004');
      });

      it('applies size, appearance, pill, and focus styling', async () => {
        const el = await fixture<WaDurationInput>(html`
          <wa-duration-input
            label="Duration"
            style="--wa-color-surface-lowered: rgb(31, 41, 51); --wa-color-focus: rgb(5, 6, 7); --wa-transition-fast: 0s; --wa-transition-normal: 0s"
          ></wa-duration-input>
        `);
        const field = el.shadowRoot!.querySelector<HTMLElement>('.duration-field')!;
        const normalRadius = getComputedStyle(field).borderRadius;
        el.pill = true;
        el.appearance = 'filled';
        el.size = 'xs';
        await el.updateComplete;
        const smallFont = parseFloat(getComputedStyle(el).fontSize);
        expect(el.hasAttribute('pill')).to.be.true;
        expect(getComputedStyle(field).borderRadius).not.to.equal(normalRadius);
        expect(getComputedStyle(field).backgroundColor).to.equal('rgb(31, 41, 51)');
        expect(getComputedStyle(field).borderTopColor).to.equal('rgba(0, 0, 0, 0)');
        el.focus();
        expect(getComputedStyle(field).outlineColor).to.equal('rgb(5, 6, 7)');
        el.size = 'xl';
        el.appearance = 'filled-outlined';
        el.pill = false;
        await el.updateComplete;
        expect(parseFloat(getComputedStyle(el).fontSize)).to.be.greaterThan(smallFont);
        expect(el.hasAttribute('pill')).to.be.false;
        expect(getComputedStyle(field).borderRadius).to.equal(normalRadius);
        expect(getComputedStyle(field).borderTopColor).not.to.equal('rgba(0, 0, 0, 0)');
      });

      it('uses theme colors and keeps readonly and invalid inputs focusable', async () => {
        const container = await fixture<HTMLDivElement>(html`
          <div class="wa-light">
            <wa-duration-input
              label="Duration"
              appearance="filled-outlined"
              readonly
              min="02:00:00.000"
              value="01:00:00.000"
              style="--wa-transition-normal: 0s"
            ></wa-duration-input>
          </div>
        `);
        const el = container.querySelector('wa-duration-input')!;
        const field = el.shadowRoot!.querySelector<HTMLElement>('.duration-field')!;
        const input = el.shadowRoot!.querySelector('input')!;
        const lightBackground = getComputedStyle(field).backgroundColor;
        container.className = 'wa-dark';
        expect(getComputedStyle(field).backgroundColor).not.to.equal(lightBackground);
        expect(input.readOnly).to.be.true;
        el.focus();
        expect(el.shadowRoot!.activeElement).to.equal(input);
        // The range check is exercised on an editable control; readonly controls are barred from form validation.
        el.readonly = false;
        await el.updateComplete;
        expect(el.checkValidity()).to.be.false;
        expect(el.validity.rangeUnderflow).to.be.true;
      });

      it('keeps long day values reachable in a narrow container', async () => {
        const container = await fixture<HTMLDivElement>(html`
          <div style="width: 100px">
            <wa-duration-input label="Duration" show-days value="375299968947541:23:59:59.999"></wa-duration-input>
          </div>
        `);
        const el = container.querySelector('wa-duration-input')!;
        const segments = el.shadowRoot!.querySelector<HTMLElement>('.segments')!;
        const last = el.shadowRoot!.querySelector<HTMLInputElement>('#milliseconds')!;
        expect(el.getBoundingClientRect().right).to.be.at.most(container.getBoundingClientRect().right + 1);
        expect(segments.scrollWidth).to.be.greaterThan(segments.clientWidth);
        last.focus();
        expect(el.shadowRoot!.activeElement).to.equal(last);
        expect(last.getBoundingClientRect().right).to.be.at.most(segments.getBoundingClientRect().right + 1);
      });

      it('commits the active edit before submitting with Enter', async () => {
        const form = await fixture<HTMLFormElement>(html`
          <form><wa-duration-input name="duration" value="01:02:03.004"></wa-duration-input></form>
        `);
        const el = form.querySelector('wa-duration-input')!;
        let submitted: FormDataEntryValue | null = null;
        form.addEventListener('submit', event => {
          event.preventDefault();
          submitted = new FormData(form).get('duration');
        });
        el.focus();
        await sendKeys({ type: '12' });
        await sendKeys({ press: 'Enter' });
        await new Promise(resolve => setTimeout(resolve, 50));
        expect(submitted).to.equal('12:02:03.004');
      });

      it('has accessible labels for the duration and each segment', async () => {
        const el = await fixture<WaDurationInput>(html`<wa-duration-input label="Duration"></wa-duration-input>`);
        await expect(el).to.be.accessible();
      });
    });
  }
});
