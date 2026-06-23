import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { fixtures } from '../../internal/test/fixture.js';
import { runFormControlBaseTests } from '../../internal/test/form-control-base-tests.js';
import type WaKnownDate from './known-date.js';

function getFields(el: WaKnownDate): HTMLInputElement[] {
  return Array.from(el.shadowRoot!.querySelectorAll<HTMLInputElement>('input[part~="field-input"]'));
}

function getField(el: WaKnownDate, field: 'day' | 'month' | 'year'): HTMLInputElement {
  return el.shadowRoot!.querySelector<HTMLInputElement>(`input[data-field="${field}"]`)!;
}

/** Set the input's value and dispatch a composed `input` event, simulating typing. */
function typeIn(input: HTMLInputElement, value: string) {
  input.value = value;
  input.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
}

describe('<wa-known-date>', () => {
  runFormControlBaseTests('wa-known-date');

  describe('accessibility', () => {
    it('is accessible with a label', async () => {
      const el = await fixture<WaKnownDate>(
        html`<wa-known-date label="When was your passport issued?" hint="For example, 27 3 2007"></wa-known-date>`,
      );
      await el.updateComplete;
      await expect(el).to.be.accessible();
    });

    it('is accessible without a label (uses role=group fallback)', async () => {
      const el = await fixture<WaKnownDate>(html`<wa-known-date></wa-known-date>`);
      await el.updateComplete;
      await expect(el).to.be.accessible();
    });
  });

  describe('rendering & defaults', () => {
    it('renders three text inputs', async () => {
      const el = await fixture<WaKnownDate>(html`<wa-known-date></wa-known-date>`);
      await el.updateComplete;
      const fields = getFields(el);
      expect(fields).to.have.length(3);
      for (const f of fields) {
        expect(f.type).to.equal('text');
        expect(f.inputMode).to.equal('numeric');
        expect(f.getAttribute('pattern')).to.equal('[0-9]*');
      }
    });

    it('value is empty by default', async () => {
      const el = await fixture<WaKnownDate>(html`<wa-known-date></wa-known-date>`);
      expect(el.value).to.equal('');
    });

    it('populates fields from value attribute', async () => {
      const el = await fixture<WaKnownDate>(html`<wa-known-date value="2007-03-27"></wa-known-date>`);
      await el.updateComplete;
      expect(el.value).to.equal('2007-03-27');
      expect(getField(el, 'year').value).to.equal('2007');
      expect(getField(el, 'month').value).to.equal('03');
      expect(getField(el, 'day').value).to.equal('27');
    });

    it('exposes valueAsDate', async () => {
      const el = await fixture<WaKnownDate>(html`<wa-known-date value="2007-03-27"></wa-known-date>`);
      await el.updateComplete;
      const d = el.valueAsDate!;
      expect(d).to.not.equal(null);
      expect(d.getFullYear()).to.equal(2007);
      expect(d.getMonth()).to.equal(2);
      expect(d.getDate()).to.equal(27);
    });

    it('accepts a Date in the value setter', async () => {
      const el = await fixture<WaKnownDate>(html`<wa-known-date></wa-known-date>`);
      el.value = new Date(2007, 2, 27);
      await el.updateComplete;
      expect(el.value).to.equal('2007-03-27');
    });

    it('clears the fields when value is set to null', async () => {
      const el = await fixture<WaKnownDate>(html`<wa-known-date value="2007-03-27"></wa-known-date>`);
      await el.updateComplete;
      el.value = null;
      await el.updateComplete;
      expect(el.value).to.equal('');
      expect(getField(el, 'year').value).to.equal('');
    });
  });

  describe('field order by locale', () => {
    function visibleFieldOrder(el: WaKnownDate): string[] {
      return Array.from(el.shadowRoot!.querySelectorAll<HTMLInputElement>('input[data-field]')).map(
        i => i.dataset.field as string,
      );
    }

    it('renders day/month/year for en-GB', async () => {
      const el = await fixture<WaKnownDate>(html`<wa-known-date lang="en-GB"></wa-known-date>`);
      await el.updateComplete;
      expect(visibleFieldOrder(el)).to.deep.equal(['day', 'month', 'year']);
    });

    it('renders month/day/year for en-US', async () => {
      const el = await fixture<WaKnownDate>(html`<wa-known-date lang="en-US"></wa-known-date>`);
      await el.updateComplete;
      expect(visibleFieldOrder(el)).to.deep.equal(['month', 'day', 'year']);
    });

    it('renders year/month/day for ja-JP', async () => {
      const el = await fixture<WaKnownDate>(html`<wa-known-date lang="ja-JP"></wa-known-date>`);
      await el.updateComplete;
      expect(visibleFieldOrder(el)).to.deep.equal(['year', 'month', 'day']);
    });

    it('the locale property overrides lang', async () => {
      const el = await fixture<WaKnownDate>(html`<wa-known-date lang="en-US" locale="en-GB"></wa-known-date>`);
      await el.updateComplete;
      expect(visibleFieldOrder(el)).to.deep.equal(['day', 'month', 'year']);
    });

    it('re-renders when lang changes', async () => {
      const el = await fixture<WaKnownDate>(html`<wa-known-date lang="en-US"></wa-known-date>`);
      await el.updateComplete;
      expect(visibleFieldOrder(el)).to.deep.equal(['month', 'day', 'year']);
      el.setAttribute('lang', 'ja-JP');
      // localize controller triggers a re-render asynchronously
      await new Promise(r => setTimeout(r, 0));
      await el.updateComplete;
      expect(visibleFieldOrder(el)).to.deep.equal(['year', 'month', 'day']);
    });
  });

  describe('value composition from typed input', () => {
    it('composes ISO when all fields are filled', async () => {
      const el = await fixture<WaKnownDate>(html`<wa-known-date></wa-known-date>`);
      await el.updateComplete;
      typeIn(getField(el, 'day'), '27');
      typeIn(getField(el, 'month'), '3');
      typeIn(getField(el, 'year'), '2007');
      await el.updateComplete;
      expect(el.value).to.equal('2007-03-27');
    });

    it('leaves value empty when any field is empty', async () => {
      const el = await fixture<WaKnownDate>(html`<wa-known-date></wa-known-date>`);
      await el.updateComplete;
      typeIn(getField(el, 'day'), '27');
      typeIn(getField(el, 'month'), '3');
      await el.updateComplete;
      expect(el.value).to.equal('');
    });

    it('leaves value empty for invalid combinations (Feb 30)', async () => {
      const el = await fixture<WaKnownDate>(html`<wa-known-date></wa-known-date>`);
      await el.updateComplete;
      typeIn(getField(el, 'day'), '30');
      typeIn(getField(el, 'month'), '2');
      typeIn(getField(el, 'year'), '2024');
      await el.updateComplete;
      expect(el.value).to.equal('');
    });

    it('sanitizes non-digit input', async () => {
      const el = await fixture<WaKnownDate>(html`<wa-known-date></wa-known-date>`);
      await el.updateComplete;
      const day = getField(el, 'day');
      typeIn(day, '1a2b');
      await el.updateComplete;
      expect(day.value).to.equal('12');
    });

    it('clips year to four digits', async () => {
      const el = await fixture<WaKnownDate>(html`<wa-known-date></wa-known-date>`);
      await el.updateComplete;
      const year = getField(el, 'year');
      typeIn(year, '20070');
      await el.updateComplete;
      expect(year.value).to.equal('2007');
    });
  });

  describe('no auto-advance (the host promise)', () => {
    it('does not move focus after a complete field entry', async () => {
      const el = await fixture<WaKnownDate>(html`<wa-known-date lang="en-GB"></wa-known-date>`);
      await el.updateComplete;
      const day = getField(el, 'day');
      day.focus();
      typeIn(day, '27');
      await el.updateComplete;
      expect(el.shadowRoot!.activeElement).to.equal(day);
    });
  });

  describe('events', () => {
    it('fires input on every keystroke', async () => {
      const el = await fixture<WaKnownDate>(html`<wa-known-date></wa-known-date>`);
      await el.updateComplete;
      let inputCount = 0;
      el.addEventListener('input', () => inputCount++);
      typeIn(getField(el, 'day'), '2');
      typeIn(getField(el, 'day'), '27');
      await el.updateComplete;
      // Each typeIn dispatches one event that bubbles to the host plus the host's own redispatched
      // event from recomputeValue — the count is unimportant, only that the host fires at all.
      expect(inputCount).to.be.greaterThan(0);
    });

    it('fires change only when the committed value transitions', async () => {
      const el = await fixture<WaKnownDate>(html`<wa-known-date></wa-known-date>`);
      await el.updateComplete;
      let changeCount = 0;
      el.addEventListener('change', () => changeCount++);
      typeIn(getField(el, 'day'), '27');
      typeIn(getField(el, 'month'), '3');
      // Still incomplete — no change should have fired yet (value remains '').
      expect(changeCount).to.equal(0);
      typeIn(getField(el, 'year'), '2007');
      await el.updateComplete;
      expect(changeCount).to.equal(1);
      // No-op re-typing — value didn't transition.
      typeIn(getField(el, 'year'), '2007');
      await el.updateComplete;
      expect(changeCount).to.equal(1);
    });
  });

  describe('validation', () => {
    it('is valid when empty and not required', async () => {
      const el = await fixture<WaKnownDate>(html`<wa-known-date></wa-known-date>`);
      await el.updateComplete;
      expect(el.checkValidity()).to.equal(true);
    });

    it('is invalid when required and empty', async () => {
      const el = await fixture<WaKnownDate>(html`<wa-known-date required></wa-known-date>`);
      await el.updateComplete;
      expect(el.checkValidity()).to.equal(false);
      expect(el.validity.valueMissing).to.equal(true);
    });

    it('is invalid when partially filled', async () => {
      const el = await fixture<WaKnownDate>(html`<wa-known-date></wa-known-date>`);
      await el.updateComplete;
      typeIn(getField(el, 'day'), '15');
      await el.updateComplete;
      // A partial entry has digits but can't compose to a real date, so it reports as badInput — the same
      // native flag a partially typed `<input type="date">` would report.
      expect(el.checkValidity()).to.equal(false);
      expect(el.validity.badInput).to.equal(true);
    });

    it('reports the invalid-date message (not the required message) for an out-of-range entry', async () => {
      // Even when required, an out-of-range entry must surface the "valid date" message rather than the
      // RequiredValidator's "Please fill out this field" — the hidden mirror is empty because the entry
      // never composed, so PartialDateValidator must take precedence.
      const el = await fixture<WaKnownDate>(html`<wa-known-date required></wa-known-date>`);
      await el.updateComplete;
      typeIn(getField(el, 'day'), '15');
      typeIn(getField(el, 'month'), '33');
      typeIn(getField(el, 'year'), '2020');
      await el.updateComplete;
      expect(el.checkValidity()).to.equal(false);
      expect(el.validity.badInput).to.equal(true);
      expect(el.validationMessage).to.equal(el.localize.term('incompleteDate'));
    });

    it('is valid for a complete real date', async () => {
      const el = await fixture<WaKnownDate>(html`<wa-known-date value="2007-03-27"></wa-known-date>`);
      await el.updateComplete;
      expect(el.checkValidity()).to.equal(true);
    });

    it('respects min', async () => {
      const el = await fixture<WaKnownDate>(html`<wa-known-date min="2020-01-01" value="2007-03-27"></wa-known-date>`);
      await el.updateComplete;
      expect(el.checkValidity()).to.equal(false);
    });

    it('respects max', async () => {
      const el = await fixture<WaKnownDate>(html`<wa-known-date max="2020-12-31" value="2024-03-27"></wa-known-date>`);
      await el.updateComplete;
      expect(el.checkValidity()).to.equal(false);
    });

    it('emits wa-invalid from reportValidity', async () => {
      const el = await fixture<WaKnownDate>(html`<wa-known-date required></wa-known-date>`);
      await el.updateComplete;
      const event = oneEvent(el, 'wa-invalid');
      el.reportValidity();
      await event;
    });

    it('does not enter user-invalid before interaction', async () => {
      const el = await fixture<WaKnownDate>(html`<wa-known-date required></wa-known-date>`);
      await el.updateComplete;
      // Required and empty is invalid, but the user hasn't interacted yet, so user-invalid stays off.
      expect(el.checkValidity()).to.equal(false);
      expect(el.customStates.has('user-invalid')).to.equal(false);
    });

    it('enters user-invalid after typing into a field and blurring (real interaction)', async () => {
      const el = await fixture<WaKnownDate>(html`<wa-known-date lang="en-GB" required></wa-known-date>`);
      await el.updateComplete;
      expect(el.customStates.has('user-invalid')).to.equal(false);

      const day = getField(el, 'day');
      day.focus();
      // Type a partial date — the host emits a composed `input`, which flips `hasInteracted` because
      // `assumeInteractionOn` is `['input']`. The value remains invalid (only the day is filled).
      await sendKeys({ type: '15' });
      // Leaving the group: blur the active field.
      day.blur();
      await el.updateComplete;

      expect(el.checkValidity()).to.equal(false);
      expect(el.customStates.has('user-invalid')).to.equal(true);
    });

    it('enters user-invalid after synthetic typing (no native focus required)', async () => {
      const el = await fixture<WaKnownDate>(html`<wa-known-date required></wa-known-date>`);
      await el.updateComplete;
      expect(el.customStates.has('user-invalid')).to.equal(false);
      typeIn(getField(el, 'day'), '15');
      await el.updateComplete;
      expect(el.checkValidity()).to.equal(false);
      expect(el.customStates.has('user-invalid')).to.equal(true);
    });
  });

  describe('form association', () => {
    it('submits the canonical ISO value', async () => {
      const form = await fixture<HTMLFormElement>(
        html`<form><wa-known-date name="dob" value="2007-03-27"></wa-known-date></form>`,
      );
      await (form.querySelector('wa-known-date') as WaKnownDate).updateComplete;
      const data = new FormData(form);
      expect(data.get('dob')).to.equal('2007-03-27');
    });

    it('omits the field when value is blank', async () => {
      const form = await fixture<HTMLFormElement>(html`<form><wa-known-date name="dob"></wa-known-date></form>`);
      await (form.querySelector('wa-known-date') as WaKnownDate).updateComplete;
      const data = new FormData(form);
      expect(data.has('dob')).to.equal(false);
    });

    it('restores the default value on form reset', async () => {
      const form = await fixture<HTMLFormElement>(
        html`<form><wa-known-date name="dob" value="2007-03-27"></wa-known-date></form>`,
      );
      const el = form.querySelector('wa-known-date') as WaKnownDate;
      await el.updateComplete;
      el.value = '2024-01-01';
      await el.updateComplete;
      expect(el.value).to.equal('2024-01-01');
      form.reset();
      await el.updateComplete;
      expect(el.value).to.equal('2007-03-27');
    });
  });

  describe('autocomplete mapping', () => {
    it('expands bday to per-field tokens', async () => {
      const el = await fixture<WaKnownDate>(html`<wa-known-date autocomplete="bday"></wa-known-date>`);
      await el.updateComplete;
      expect(getField(el, 'day').getAttribute('autocomplete')).to.equal('bday-day');
      expect(getField(el, 'month').getAttribute('autocomplete')).to.equal('bday-month');
      expect(getField(el, 'year').getAttribute('autocomplete')).to.equal('bday-year');
    });

    it('omits autocomplete when not set', async () => {
      const el = await fixture<WaKnownDate>(html`<wa-known-date></wa-known-date>`);
      await el.updateComplete;
      expect(getField(el, 'day').hasAttribute('autocomplete')).to.equal(false);
      expect(getField(el, 'month').hasAttribute('autocomplete')).to.equal(false);
      expect(getField(el, 'year').hasAttribute('autocomplete')).to.equal(false);
    });

    it('applies off to all three fields', async () => {
      const el = await fixture<WaKnownDate>(html`<wa-known-date autocomplete="off"></wa-known-date>`);
      await el.updateComplete;
      expect(getField(el, 'day').getAttribute('autocomplete')).to.equal('off');
      expect(getField(el, 'month').getAttribute('autocomplete')).to.equal('off');
      expect(getField(el, 'year').getAttribute('autocomplete')).to.equal('off');
    });

    it('applies on to all three fields', async () => {
      const el = await fixture<WaKnownDate>(html`<wa-known-date autocomplete="on"></wa-known-date>`);
      await el.updateComplete;
      expect(getField(el, 'day').getAttribute('autocomplete')).to.equal('on');
      expect(getField(el, 'month').getAttribute('autocomplete')).to.equal('on');
      expect(getField(el, 'year').getAttribute('autocomplete')).to.equal('on');
    });

    it('forwards other (non-directive) families only to the year field', async () => {
      const el = await fixture<WaKnownDate>(html`<wa-known-date autocomplete="section-foo"></wa-known-date>`);
      await el.updateComplete;
      expect(getField(el, 'day').hasAttribute('autocomplete')).to.equal(false);
      expect(getField(el, 'month').hasAttribute('autocomplete')).to.equal(false);
      expect(getField(el, 'year').getAttribute('autocomplete')).to.equal('section-foo');
    });
  });

  describe('disabled / readonly propagation', () => {
    it('disables all three inputs when host is disabled', async () => {
      const el = await fixture<WaKnownDate>(html`<wa-known-date disabled></wa-known-date>`);
      await el.updateComplete;
      for (const f of getFields(el)) {
        expect(f.disabled).to.equal(true);
      }
    });

    it('makes all three inputs readonly when host is readonly', async () => {
      const el = await fixture<WaKnownDate>(html`<wa-known-date readonly></wa-known-date>`);
      await el.updateComplete;
      for (const f of getFields(el)) {
        expect(f.readOnly).to.equal(true);
      }
    });
  });

  describe('focus', () => {
    it('focuses the first empty field', async () => {
      const el = await fixture<WaKnownDate>(html`<wa-known-date lang="en-GB"></wa-known-date>`);
      await el.updateComplete;
      el.focus();
      // Without delegatesFocus moving us, the first empty field (day, since order is dmy) gets focus.
      expect(el.shadowRoot!.activeElement?.getAttribute('data-field')).to.equal('day');
    });

    it('focuses the first empty field when some are filled', async () => {
      const el = await fixture<WaKnownDate>(html`<wa-known-date lang="en-GB"></wa-known-date>`);
      await el.updateComplete;
      typeIn(getField(el, 'day'), '15');
      typeIn(getField(el, 'month'), '5');
      await el.updateComplete;
      el.focus();
      expect(el.shadowRoot!.activeElement?.getAttribute('data-field')).to.equal('year');
    });
  });

  describe('setCustomValidity', () => {
    it('makes the control invalid with a custom error', async () => {
      const el = await fixture<WaKnownDate>(html`<wa-known-date value="2007-03-27"></wa-known-date>`);
      await el.updateComplete;
      // Valid before the custom error is applied.
      expect(el.checkValidity()).to.equal(true);

      el.setCustomValidity('Pick another date');
      await el.updateComplete;

      expect(el.checkValidity()).to.equal(false);
      expect(el.validity.customError).to.equal(true);
      expect(el.validationMessage).to.equal('Pick another date');
      expect(el.customStates.has('invalid')).to.equal(true);
    });

    it('restores validity when cleared with an empty string', async () => {
      const el = await fixture<WaKnownDate>(html`<wa-known-date value="2007-03-27"></wa-known-date>`);
      await el.updateComplete;
      el.setCustomValidity('Nope');
      await el.updateComplete;
      expect(el.checkValidity()).to.equal(false);

      el.setCustomValidity('');
      await el.updateComplete;

      expect(el.checkValidity()).to.equal(true);
      expect(el.validity.customError).to.equal(false);
      expect(el.validationMessage).to.equal('');
      expect(el.customStates.has('invalid')).to.equal(false);
    });

    it('fires wa-invalid when a custom error fails checkValidity via reportValidity', async () => {
      const el = await fixture<WaKnownDate>(html`<wa-known-date value="2007-03-27"></wa-known-date>`);
      await el.updateComplete;
      el.setCustomValidity('Custom problem');
      await el.updateComplete;

      const event = oneEvent(el, 'wa-invalid');
      el.reportValidity();
      await event;
      expect(el.checkValidity()).to.equal(false);
    });
  });

  describe('user-invalid reflection on fields', () => {
    it('sets aria-invalid="true" on the field inputs after interaction', async () => {
      const el = await fixture<WaKnownDate>(html`<wa-known-date required></wa-known-date>`);
      await el.updateComplete;

      // Before interaction: not user-invalid, fields not marked.
      expect(el.customStates.has('user-invalid')).to.equal(false);
      for (const f of getFields(el)) {
        expect(f.getAttribute('aria-invalid')).to.not.equal('true');
      }

      // Interact: typing dispatches a composed `input`, flipping `hasInteracted`. The value stays
      // invalid (required + only a partial entry).
      typeIn(getField(el, 'day'), '15');
      await el.updateComplete;

      expect(el.customStates.has('user-invalid')).to.equal(true);
      for (const f of getFields(el)) {
        expect(f.getAttribute('aria-invalid')).to.equal('true');
      }
    });

    it('never renders an inline error region — validation surfaces through the native popup', async () => {
      // Unlike a custom inline message, validity is reported via the native constraint validation flow,
      // matching <wa-time-input>. Interacting with an invalid control must not inject any error element.
      const el = await fixture<WaKnownDate>(html`<wa-known-date required></wa-known-date>`);
      await el.updateComplete;
      typeIn(getField(el, 'day'), '15');
      await el.updateComplete;

      expect(el.customStates.has('user-invalid')).to.equal(true);
      expect(el.shadowRoot!.querySelector('[part~="error"]')).to.equal(null);
    });
  });

  describe('out-of-bounds single fields', () => {
    async function compose(day: string, month: string, year: string) {
      const el = await fixture<WaKnownDate>(html`<wa-known-date></wa-known-date>`);
      await el.updateComplete;
      typeIn(getField(el, 'day'), day);
      typeIn(getField(el, 'month'), month);
      typeIn(getField(el, 'year'), year);
      await el.updateComplete;
      return el;
    }

    it('rejects day 32 (does not compose to ISO, control invalid)', async () => {
      const el = await compose('32', '1', '2020');
      expect(el.value).to.equal('');
      expect(el.checkValidity()).to.equal(false);
    });

    it('rejects month 13', async () => {
      const el = await compose('15', '13', '2020');
      expect(el.value).to.equal('');
      expect(el.checkValidity()).to.equal(false);
    });

    it('rejects day 0', async () => {
      const el = await compose('0', '1', '2020');
      expect(el.value).to.equal('');
      expect(el.checkValidity()).to.equal(false);
    });

    it('rejects month 0', async () => {
      const el = await compose('15', '0', '2020');
      expect(el.value).to.equal('');
      expect(el.checkValidity()).to.equal(false);
    });

    it('rejects year 0', async () => {
      // Year "0" is a single zero digit (0 < 1), which partsToIso rejects.
      const el = await compose('15', '1', '0');
      expect(el.value).to.equal('');
      expect(el.checkValidity()).to.equal(false);
    });
  });

  describe('validationTarget anchoring', () => {
    async function compose(day: string, month: string, year: string, lang = 'en-GB') {
      const el = await fixture<WaKnownDate>(html`<wa-known-date lang=${lang}></wa-known-date>`);
      await el.updateComplete;
      typeIn(getField(el, 'day'), day);
      typeIn(getField(el, 'month'), month);
      typeIn(getField(el, 'year'), year);
      await el.updateComplete;
      return el;
    }

    it('anchors on the out-of-range day (day 32)', async () => {
      const el = await compose('32', '1', '2020');
      expect((el.validationTarget as HTMLInputElement).dataset.field).to.equal('day');
    });

    it('anchors on the out-of-range month (month 13)', async () => {
      const el = await compose('15', '13', '2020');
      expect((el.validationTarget as HTMLInputElement).dataset.field).to.equal('month');
    });

    it('anchors on the day for a non-composing real-date combination (Feb 30)', async () => {
      const el = await compose('30', '2', '2024');
      expect((el.validationTarget as HTMLInputElement).dataset.field).to.equal('day');
    });

    it('anchors on the first empty field for a partial entry', async () => {
      const el = await fixture<WaKnownDate>(html`<wa-known-date lang="en-GB"></wa-known-date>`);
      await el.updateComplete;
      // en-GB order is day/month/year; fill the day, leaving month as the first empty field.
      typeIn(getField(el, 'day'), '15');
      await el.updateComplete;
      expect((el.validationTarget as HTMLInputElement).dataset.field).to.equal('month');
    });

    it('anchors on the offending field regardless of locale order (en-US)', async () => {
      // en-US order is month/day/year, but the day is the out-of-range field.
      const el = await compose('32', '1', '2020', 'en-US');
      expect((el.validationTarget as HTMLInputElement).dataset.field).to.equal('day');
    });
  });

  describe('valueAsDate null & partial cases', () => {
    it('returns null when empty', async () => {
      const el = await fixture<WaKnownDate>(html`<wa-known-date></wa-known-date>`);
      await el.updateComplete;
      expect(el.valueAsDate).to.equal(null);
    });

    it('returns null when only partially filled (day + month, no year)', async () => {
      const el = await fixture<WaKnownDate>(html`<wa-known-date></wa-known-date>`);
      await el.updateComplete;
      typeIn(getField(el, 'day'), '15');
      typeIn(getField(el, 'month'), '5');
      await el.updateComplete;
      // Partial entry never composes to a canonical value, so valueAsDate is null.
      expect(el.value).to.equal('');
      expect(el.valueAsDate).to.equal(null);
    });

    it('returns null for an out-of-bounds (non-composing) entry', async () => {
      const el = await fixture<WaKnownDate>(html`<wa-known-date></wa-known-date>`);
      await el.updateComplete;
      typeIn(getField(el, 'day'), '32');
      typeIn(getField(el, 'month'), '1');
      typeIn(getField(el, 'year'), '2020');
      await el.updateComplete;
      expect(el.valueAsDate).to.equal(null);
    });
  });

  describe('formStateRestoreCallback', () => {
    // Signature found in source: formStateRestoreCallback(state: string | File | FormData | null).
    // It is the standard FACE callback (mode is ignored by this component). When `hasUpdated`, it syncs
    // fields immediately; before first update it stashes into `pendingValue` for firstUpdated to apply.
    it('restores fields and value from a string state after first update', async () => {
      const el = await fixture<WaKnownDate>(html`<wa-known-date name="dob"></wa-known-date>`);
      await el.updateComplete;
      expect(el.value).to.equal('');

      el.formStateRestoreCallback('2007-03-27');
      await el.updateComplete;

      expect(el.value).to.equal('2007-03-27');
      expect(getField(el, 'year').value).to.equal('2007');
      expect(getField(el, 'month').value).to.equal('03');
      expect(getField(el, 'day').value).to.equal('27');
    });

    it('ignores non-string state', async () => {
      const el = await fixture<WaKnownDate>(html`<wa-known-date value="2007-03-27"></wa-known-date>`);
      await el.updateComplete;
      el.formStateRestoreCallback(null);
      await el.updateComplete;
      // Null state is a no-op for the value (only validity is recomputed).
      expect(el.value).to.equal('2007-03-27');
    });

    it('applies a state restored before the first update via pendingValue', async () => {
      // Create an unupgraded/unrendered element so hasUpdated is false when the callback fires.
      const el = document.createElement('wa-known-date') as WaKnownDate;
      el.formStateRestoreCallback('2020-12-31');
      // Now connect it; firstUpdated consumes pendingValue and syncs the parts, which schedules a follow-up
      // render — await twice so the field inputs reflect the restored value.
      document.body.appendChild(el);
      await el.updateComplete;
      await el.updateComplete;

      expect(el.value).to.equal('2020-12-31');
      expect(getField(el, 'year').value).to.equal('2020');
      expect(getField(el, 'month').value).to.equal('12');
      expect(getField(el, 'day').value).to.equal('31');

      el.remove();
    });
  });

  describe('real keyboard (sendKeys)', () => {
    it('sanitizes non-digit keystrokes typed into a field', async () => {
      const el = await fixture<WaKnownDate>(html`<wa-known-date lang="en-GB"></wa-known-date>`);
      await el.updateComplete;
      const day = getField(el, 'day');
      day.focus();
      await sendKeys({ type: '1a2b' });
      await el.updateComplete;
      expect(day.value).to.equal('12');
    });

    it('does not auto-advance to the next field after a complete entry', async () => {
      const el = await fixture<WaKnownDate>(html`<wa-known-date lang="en-GB"></wa-known-date>`);
      await el.updateComplete;
      const day = getField(el, 'day');
      day.focus();
      await sendKeys({ type: '27' });
      await el.updateComplete;
      // Day is the first field (en-GB order is d/m/y); focus must remain on it.
      expect(el.shadowRoot!.activeElement).to.equal(day);
    });

    it('Tab moves focus through the fields in document order', async () => {
      const el = await fixture<WaKnownDate>(html`<wa-known-date lang="en-GB"></wa-known-date>`);
      await el.updateComplete;
      const [first, second] = getFields(el); // en-GB: day, month, year
      first.focus();
      expect(el.shadowRoot!.activeElement).to.equal(first);
      await sendKeys({ press: 'Tab' });
      await el.updateComplete;
      expect(el.shadowRoot!.activeElement).to.equal(second);
    });
  });

  describe('per-field aria-required & labels', () => {
    it('sets aria-required="true" on all field inputs when required', async () => {
      const el = await fixture<WaKnownDate>(html`<wa-known-date required></wa-known-date>`);
      await el.updateComplete;
      for (const f of getFields(el)) {
        expect(f.getAttribute('aria-required')).to.equal('true');
      }
    });

    it('sets aria-required="false" on all field inputs when not required', async () => {
      const el = await fixture<WaKnownDate>(html`<wa-known-date></wa-known-date>`);
      await el.updateComplete;
      for (const f of getFields(el)) {
        expect(f.getAttribute('aria-required')).to.equal('false');
      }
    });

    it('gives each field an accessible label via an associated <label for>', async () => {
      const el = await fixture<WaKnownDate>(html`<wa-known-date></wa-known-date>`);
      await el.updateComplete;
      for (const f of getFields(el)) {
        expect(f.id).to.be.a('string').and.not.equal('');
        const label = el.shadowRoot!.querySelector<HTMLLabelElement>(`label[for="${f.id}"]`);
        expect(label, `expected a <label for="${f.id}">`).to.not.equal(null);
        expect(label!.textContent?.trim().length).to.be.greaterThan(0);
      }
    });
  });

  // SSR + hydration: a high-value subset run across both the client-only fixture and the
  // SSR-rendered-then-hydrated fixture. This validates that the server-rendered markup (which skips the
  // isServer validators, uses withLabel/withHint for slot detection, and stashes value in pendingValue)
  // survives hydration and behaves identically to the client-only path.
  for (const fixture of fixtures) {
    describe(`SSR + hydration ("${fixture.type}")`, () => {
      function getFieldOrder(el: WaKnownDate): string[] {
        return Array.from(el.shadowRoot!.querySelectorAll<HTMLInputElement>('input[data-field]')).map(
          i => i.dataset.field as string,
        );
      }

      it('renders three fields', async () => {
        const el = await fixture<WaKnownDate>(html`<wa-known-date></wa-known-date>`);
        await el.updateComplete;
        expect(getFields(el)).to.have.length(3);
      });

      it('orders fields by locale (en-US is month/day/year)', async () => {
        const el = await fixture<WaKnownDate>(html`<wa-known-date lang="en-US"></wa-known-date>`);
        await el.updateComplete;
        expect(getFieldOrder(el)).to.deep.equal(['month', 'day', 'year']);
      });

      it('composes an ISO value from typed fields', async () => {
        const el = await fixture<WaKnownDate>(html`<wa-known-date></wa-known-date>`);
        await el.updateComplete;
        typeIn(getField(el, 'day'), '27');
        typeIn(getField(el, 'month'), '3');
        typeIn(getField(el, 'year'), '2007');
        await el.updateComplete;
        expect(el.value).to.equal('2007-03-27');
      });

      it('serializes the canonical ISO value into FormData', async () => {
        const form = await fixture<HTMLFormElement>(
          html`<form><wa-known-date name="dob" value="2007-03-27"></wa-known-date></form>`,
        );
        const el = form.querySelector('wa-known-date') as WaKnownDate;
        await el.updateComplete;
        // The value comes from pendingValue on the SSR path; confirm it survives hydration.
        expect(el.value).to.equal('2007-03-27');
        const data = new FormData(form);
        expect(data.get('dob')).to.equal('2007-03-27');
      });

      it('is accessible with a label and hint', async () => {
        const el = await fixture<WaKnownDate>(
          html`<wa-known-date label="Birthday" hint="For example, 27 3 2007"></wa-known-date>`,
        );
        await el.updateComplete;
        await expect(el).to.be.accessible();
      });
    });
  }
});
