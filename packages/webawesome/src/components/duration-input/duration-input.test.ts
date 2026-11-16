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

      it('commits segment edits and emits one change event', async () => {
        const el = await fixture<WaDurationInput>(html`
          <wa-duration-input label="Duration" value="01:02:03.004"></wa-duration-input>
        `);
        const inputs = el.shadowRoot!.querySelectorAll('input');
        const onChange = sinon.spy();
        el.addEventListener('change', onChange);
        inputs[1].focus();
        await sendKeys({ type: '7' });
        await el.updateComplete;
        expect(inputs[1].value).to.equal('7');
        expect(el.value).to.equal('01:02:03.004');
        inputs[1].blur();
        await el.updateComplete;
        expect(el.value).to.equal('01:07:03.004');
        expect(onChange).to.have.been.calledOnce;
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
        expect(new FormData(form).has('duration')).to.be.false;
        form.querySelector('fieldset')!.disabled = false;
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('input')!.disabled).to.be.false;
        expect(new FormData(form).get('duration')).to.equal('01:02:03.004');
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
