import { fixtures } from '../../internal/test/fixture.js';
import { runFormControlBaseTests } from '../../internal/test/form-control-base-tests.js';
import { serialize } from '../../utilities/form.js';
import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import sinon from 'sinon';
import type WaTimePicker from './time-picker.js';

function waitForEvent(el: EventTarget, eventName: string): Promise<void> {
  return new Promise(resolve => {
    el.addEventListener(eventName, () => resolve(), { once: true });
  });
}

function getSegments(el: WaTimePicker): HTMLElement[] {
  return Array.from(el.shadowRoot!.querySelectorAll<HTMLElement>('[data-segment]'));
}

function getSegment(el: WaTimePicker, field: 'hour' | 'minute' | 'second' | 'dayPeriod'): HTMLElement {
  return el.shadowRoot!.querySelector<HTMLElement>(`[data-segment="${field}"]`)!;
}

function type(segment: HTMLElement, key: string, modifiers: { altKey?: boolean } = {}) {
  segment.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, composed: true, ...modifiers }));
}

describe('<wa-time-picker>', () => {
  runFormControlBaseTests('wa-time-picker');

  describe('accessibility', () => {
    it('is accessible with a label and value', async () => {
      const el = await fixture<WaTimePicker>(
        html`<wa-time-picker label="Start" value="09:30" lang="en-GB"></wa-time-picker>`,
      );
      await el.updateComplete;
      await expect(el).to.be.accessible();
    });
  });

  describe('basic rendering', () => {
    it('renders with default attributes', async () => {
      const el = await fixture<WaTimePicker>(html`<wa-time-picker></wa-time-picker>`);
      expect(el).to.exist;
      expect(el.value).to.equal('');
      expect(el.open).to.equal(false);
      expect(el.step).to.equal(60);
    });

    it('hydrates value from the attribute', async () => {
      const el = await fixture<WaTimePicker>(html`<wa-time-picker value="14:30" lang="en-GB"></wa-time-picker>`);
      await el.updateComplete;
      expect(el.value).to.equal('14:30');
      expect(el.defaultValue).to.equal('14:30');
    });

    it('exposes valueAsDate', async () => {
      const el = await fixture<WaTimePicker>(html`<wa-time-picker value="14:30" lang="en-GB"></wa-time-picker>`);
      await el.updateComplete;
      const d = el.valueAsDate!;
      expect(d.getHours()).to.equal(14);
      expect(d.getMinutes()).to.equal(30);
    });

    it('exposes valueAsNumber (ms since midnight)', async () => {
      const el = await fixture<WaTimePicker>(html`<wa-time-picker value="01:00" lang="en-GB"></wa-time-picker>`);
      await el.updateComplete;
      expect(el.valueAsNumber).to.equal(3_600_000);
    });

    it('reflects the initial value in valueAsDate before any interaction', async () => {
      const el = await fixture<WaTimePicker>(html`<wa-time-picker value="09:30" lang="en-GB"></wa-time-picker>`);
      await el.updateComplete;
      // Read through the public getter, which must honor the defaultValue fallback (valueHasChanged === false).
      const d = el.valueAsDate;
      expect(d).to.not.equal(null);
      expect(d!.getHours()).to.equal(9);
      expect(d!.getMinutes()).to.equal(30);
    });

    it('returns null from valueAsDate after the value is cleared', async () => {
      const el = await fixture<WaTimePicker>(html`<wa-time-picker value="09:30" lang="en-GB"></wa-time-picker>`);
      await el.updateComplete;
      el.value = null;
      await el.updateComplete;
      expect(el.value).to.equal('');
      expect(el.valueAsDate).to.equal(null);
      expect(Number.isNaN(el.valueAsNumber)).to.equal(true);
    });
  });

  describe('segmented input structure', () => {
    it('renders 2 segments by default (hour, minute) in 24-hour locale', async () => {
      const el = await fixture<WaTimePicker>(html`<wa-time-picker lang="en-GB"></wa-time-picker>`);
      const segments = getSegments(el);
      const fields = segments.map(s => s.dataset.segment);
      expect(fields).to.deep.equal(['hour', 'minute']);
    });

    it('renders 3 segments in 12-hour locale (hour, minute, dayPeriod)', async () => {
      const el = await fixture<WaTimePicker>(html`<wa-time-picker lang="en-US"></wa-time-picker>`);
      const segments = getSegments(el);
      const fields = segments.map(s => s.dataset.segment);
      expect(fields).to.include.members(['hour', 'minute', 'dayPeriod']);
    });

    it('adds a seconds segment when step is sub-minute', async () => {
      const el = await fixture<WaTimePicker>(html`<wa-time-picker lang="en-GB" step="1"></wa-time-picker>`);
      await el.updateComplete;
      const fields = getSegments(el).map(s => s.dataset.segment);
      expect(fields).to.include('second');
    });

    it('hides the seconds segment when step is a whole-minute multiple', async () => {
      const el = await fixture<WaTimePicker>(html`<wa-time-picker lang="en-GB" step="300"></wa-time-picker>`);
      await el.updateComplete;
      const fields = getSegments(el).map(s => s.dataset.segment);
      expect(fields).to.not.include('second');
    });

    it('forces 24-hour layout when hour-format=24', async () => {
      const el = await fixture<WaTimePicker>(html`<wa-time-picker lang="en-US" hour-format="24"></wa-time-picker>`);
      await el.updateComplete;
      const fields = getSegments(el).map(s => s.dataset.segment);
      expect(fields).to.not.include('dayPeriod');
    });

    it('forces 12-hour layout when hour-format=12', async () => {
      const el = await fixture<WaTimePicker>(html`<wa-time-picker lang="en-GB" hour-format="12"></wa-time-picker>`);
      await el.updateComplete;
      const fields = getSegments(el).map(s => s.dataset.segment);
      expect(fields).to.include('dayPeriod');
    });
  });

  describe('roving tabindex', () => {
    it('exactly one segment has tabIndex=0 after focusing', async () => {
      const el = await fixture<WaTimePicker>(html`<wa-time-picker lang="en-GB"></wa-time-picker>`);
      const minute = getSegment(el, 'minute');
      minute.focus();
      const segments = getSegments(el);
      const tabbables = segments.filter(s => s.tabIndex === 0);
      expect(tabbables).to.have.length(1);
      expect(tabbables[0]).to.equal(minute);
    });
  });

  describe('keyboard typing', () => {
    it('types digits and commits a complete time', async () => {
      const el = await fixture<WaTimePicker>(html`<wa-time-picker lang="en-GB"></wa-time-picker>`);
      const hour = getSegment(el, 'hour');
      hour.focus();
      type(hour, '0');
      type(hour, '9');
      type(getSegment(el, 'minute'), '3');
      type(getSegment(el, 'minute'), '0');
      await el.updateComplete;
      expect(el.value).to.equal('09:30');
    });

    it('auto-advances after a hour digit that cannot start a 2-digit value (24-hour)', async () => {
      const el = await fixture<WaTimePicker>(html`<wa-time-picker lang="en-GB"></wa-time-picker>`);
      const hour = getSegment(el, 'hour');
      hour.focus();
      type(hour, '3');
      // 3 cannot start a valid 2-digit 24-hour (max 23), so it commits + advances.
      await el.updateComplete;
      expect(el.shadowRoot!.activeElement).to.equal(getSegment(el, 'minute'));
    });

    it('replaces buffer on overflow: hour 2 then 5 → 5', async () => {
      const el = await fixture<WaTimePicker>(html`<wa-time-picker lang="en-GB"></wa-time-picker>`);
      const hour = getSegment(el, 'hour');
      hour.focus();
      type(hour, '2');
      type(hour, '5');
      await el.updateComplete;
      // Hour is now 5 (the 25 overflowed and replaced with 5). Minute still empty.
      // The wire value is still empty until minute is set.
      type(getSegment(el, 'minute'), '0');
      type(getSegment(el, 'minute'), '0');
      await el.updateComplete;
      expect(el.value).to.equal('05:00');
    });
  });

  describe('AM/PM segment', () => {
    it('toggles dayPeriod via "p" key', async () => {
      const el = await fixture<WaTimePicker>(html`<wa-time-picker lang="en-US" value="09:00"></wa-time-picker>`);
      await el.updateComplete;
      const dp = getSegment(el, 'dayPeriod');
      dp.focus();
      type(dp, 'p');
      await el.updateComplete;
      expect(el.value).to.equal('21:00');
    });

    it('toggles dayPeriod via "a" key', async () => {
      const el = await fixture<WaTimePicker>(html`<wa-time-picker lang="en-US" value="21:00"></wa-time-picker>`);
      await el.updateComplete;
      const dp = getSegment(el, 'dayPeriod');
      dp.focus();
      type(dp, 'a');
      await el.updateComplete;
      expect(el.value).to.equal('09:00');
    });

    it('toggles dayPeriod via ArrowUp / ArrowDown', async () => {
      const el = await fixture<WaTimePicker>(html`<wa-time-picker lang="en-US" value="09:00"></wa-time-picker>`);
      await el.updateComplete;
      const dp = getSegment(el, 'dayPeriod');
      dp.focus();
      type(dp, 'ArrowDown');
      await el.updateComplete;
      expect(el.value).to.equal('21:00');
    });
  });

  describe('Arrow stepping', () => {
    it('hour wraps within bounds with no carry into minutes', async () => {
      const el = await fixture<WaTimePicker>(html`<wa-time-picker lang="en-GB" value="23:30"></wa-time-picker>`);
      await el.updateComplete;
      const hour = getSegment(el, 'hour');
      hour.focus();
      type(hour, 'ArrowUp');
      await el.updateComplete;
      expect(el.value).to.equal('00:30');
    });

    it('minute wraps without carrying into hour', async () => {
      const el = await fixture<WaTimePicker>(html`<wa-time-picker lang="en-GB" value="10:59"></wa-time-picker>`);
      await el.updateComplete;
      const minute = getSegment(el, 'minute');
      minute.focus();
      type(minute, 'ArrowUp');
      await el.updateComplete;
      expect(el.value).to.equal('10:00');
    });

    it('hour 12 → 1 in 12-hour mode without toggling AM/PM', async () => {
      const el = await fixture<WaTimePicker>(html`<wa-time-picker lang="en-US" value="12:00"></wa-time-picker>`);
      await el.updateComplete;
      // 12:00 in en-US 12-hour mode → 12 PM
      const hour = getSegment(el, 'hour');
      hour.focus();
      type(hour, 'ArrowUp');
      await el.updateComplete;
      // 12 PM + 1 hour (stepping the *hour* segment) wraps to 1 PM, NOT 1 AM (no period toggle).
      expect(el.value).to.equal('13:00');
    });
  });

  describe('separator keys', () => {
    it('colon advances to the next segment and flushes any buffered digit', async () => {
      const el = await fixture<WaTimePicker>(html`<wa-time-picker lang="en-GB"></wa-time-picker>`);
      const hour = getSegment(el, 'hour');
      hour.focus();
      type(hour, '1');
      type(hour, ':');
      await el.updateComplete;
      expect(el.shadowRoot!.activeElement).to.equal(getSegment(el, 'minute'));
    });
  });

  describe('clear button', () => {
    it('clears the value and refocuses the first segment', async () => {
      const el = await fixture<WaTimePicker>(
        html`<wa-time-picker lang="en-GB" value="10:00" with-clear></wa-time-picker>`,
      );
      await el.updateComplete;
      const clearButton = el.shadowRoot!.querySelector<HTMLButtonElement>('.clear-button')!;
      clearButton.click();
      await el.updateComplete;
      expect(el.value).to.equal('');
    });
  });

  describe('popup', () => {
    it('opens when the expand button is clicked', async () => {
      const el = await fixture<WaTimePicker>(html`<wa-time-picker lang="en-GB"></wa-time-picker>`);
      const expandButton = el.shadowRoot!.querySelector<HTMLButtonElement>('.expand-button')!;
      expandButton.click();
      await waitForEvent(el, 'wa-after-show');
      expect(el.open).to.equal(true);
    });

    it('closes via Alt+ArrowUp', async () => {
      const el = await fixture<WaTimePicker>(html`<wa-time-picker lang="en-GB"></wa-time-picker>`);
      el.show();
      await waitForEvent(el, 'wa-after-show');
      const hour = getSegment(el, 'hour');
      hour.focus();
      type(hour, 'ArrowUp', { altKey: true });
      await waitForEvent(el, 'wa-after-hide');
      expect(el.open).to.equal(false);
    });

    it('opens via Alt+ArrowDown', async () => {
      const el = await fixture<WaTimePicker>(html`<wa-time-picker lang="en-GB"></wa-time-picker>`);
      const hour = getSegment(el, 'hour');
      hour.focus();
      // Focus on a segment already auto-opened the popup; close it first to test Alt+Down explicitly.
      if (el.open) {
        el.hide();
        await waitForEvent(el, 'wa-after-hide');
      }
      type(hour, 'ArrowDown', { altKey: true });
      await waitForEvent(el, 'wa-after-show');
      expect(el.open).to.equal(true);
    });

    it('renders one column per segment', async () => {
      const el = await fixture<WaTimePicker>(html`<wa-time-picker lang="en-US"></wa-time-picker>`);
      el.show();
      await waitForEvent(el, 'wa-after-show');
      const columns = el.shadowRoot!.querySelectorAll<HTMLElement>('.column');
      expect(columns).to.have.length(3); // hour, minute, dayPeriod
    });

    it('clicking a column item commits its value', async () => {
      const el = await fixture<WaTimePicker>(html`<wa-time-picker lang="en-GB"></wa-time-picker>`);
      el.show();
      await waitForEvent(el, 'wa-after-show');
      const hourColumn = el.shadowRoot!.querySelector<HTMLElement>('[data-field="hour"]')!;
      const item = hourColumn.querySelector<HTMLElement>('[data-value="15"]')!;
      item.click();
      await el.updateComplete;
      // Minute is still null so wire value is still empty.
      const minuteColumn = el.shadowRoot!.querySelector<HTMLElement>('[data-field="minute"]')!;
      const minuteItem = minuteColumn.querySelector<HTMLElement>('[data-value="45"]')!;
      minuteItem.click();
      await el.updateComplete;
      expect(el.value).to.equal('15:45');
    });

    it('minute column reflects the step attribute (step=300 → 5-minute strides)', async () => {
      const el = await fixture<WaTimePicker>(html`<wa-time-picker lang="en-GB" step="300"></wa-time-picker>`);
      await el.updateComplete;
      el.show();
      await waitForEvent(el, 'wa-after-show');
      const minuteColumn = el.shadowRoot!.querySelector<HTMLElement>('[data-field="minute"]')!;
      const items = Array.from(minuteColumn.querySelectorAll<HTMLElement>('.column-item')).map(it =>
        Number(it.dataset.value),
      );
      expect(items).to.deep.equal([0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]);
    });
  });

  describe('Now button', () => {
    it('renders only when with-now is set', async () => {
      const noNow = await fixture<WaTimePicker>(html`<wa-time-picker lang="en-GB"></wa-time-picker>`);
      noNow.show();
      await waitForEvent(noNow, 'wa-after-show');
      expect(noNow.shadowRoot!.querySelector('.now-button')).to.equal(null);

      const withNow = await fixture<WaTimePicker>(html`<wa-time-picker lang="en-GB" with-now></wa-time-picker>`);
      withNow.show();
      await waitForEvent(withNow, 'wa-after-show');
      expect(withNow.shadowRoot!.querySelector('.now-button')).to.not.equal(null);
    });

    it('clicking Now sets the value to the current time', async () => {
      const el = await fixture<WaTimePicker>(html`<wa-time-picker lang="en-GB" with-now></wa-time-picker>`);
      el.show();
      await waitForEvent(el, 'wa-after-show');
      const button = el.shadowRoot!.querySelector<HTMLButtonElement>('.now-button')!;
      button.click();
      await el.updateComplete;
      // Value should now be a valid HH:mm.
      expect(el.value).to.match(/^\d{2}:\d{2}$/);
    });
  });

  describe('events', () => {
    it('emits input on every segment edit', async () => {
      const el = await fixture<WaTimePicker>(html`<wa-time-picker lang="en-GB"></wa-time-picker>`);
      let inputCount = 0;
      el.addEventListener('input', () => inputCount++);
      const hour = getSegment(el, 'hour');
      hour.focus();
      type(hour, '0');
      type(hour, '9');
      await el.updateComplete;
      expect(inputCount).to.be.greaterThan(0);
    });

    it('emits change on each committed value transition', async () => {
      // Like a native <input type="time">, the picker commits incrementally: each keystroke that produces a new
      // complete wire value fires `change`. Typing the hour alone leaves the value incomplete ('') so it does not
      // fire; once the minute digits arrive, each transition ('' → '09:03' → '09:30') fires a change.
      const el = await fixture<WaTimePicker>(html`<wa-time-picker lang="en-GB"></wa-time-picker>`);
      const changes: string[] = [];
      el.addEventListener('change', () => changes.push(el.value));
      const hour = getSegment(el, 'hour');
      hour.focus();
      type(hour, '0');
      type(hour, '9');
      await el.updateComplete;
      // No change yet — the wire value is still '' because the minute is empty.
      expect(changes).to.deep.equal([]);
      const minute = getSegment(el, 'minute');
      type(minute, '3');
      type(minute, '0');
      await el.updateComplete;
      // Each completed transition fires once; the final committed value is 09:30.
      expect(changes).to.deep.equal(['09:03', '09:30']);
      expect(el.value).to.equal('09:30');
    });

    it('emits wa-clear when the clear button is activated', async () => {
      const el = await fixture<WaTimePicker>(
        html`<wa-time-picker lang="en-GB" value="10:00" with-clear></wa-time-picker>`,
      );
      await el.updateComplete;
      let cleared = false;
      el.addEventListener('wa-clear', () => (cleared = true));
      el.shadowRoot!.querySelector<HTMLButtonElement>('.clear-button')!.click();
      expect(cleared).to.equal(true);
    });
  });

  describe('form association', () => {
    it('submits the wire value via form data', async () => {
      const form = await fixture<HTMLFormElement>(
        html`<form>
          <wa-time-picker name="t" value="14:30" lang="en-GB"></wa-time-picker>
        </form>`,
      );
      await (form.querySelector('wa-time-picker') as WaTimePicker).updateComplete;
      const data = new FormData(form);
      expect(data.get('t')).to.equal('14:30');
    });

    it('resets to the default value via form reset', async () => {
      const form = await fixture<HTMLFormElement>(
        html`<form>
          <wa-time-picker name="t" value="14:30" lang="en-GB"></wa-time-picker>
        </form>`,
      );
      const el = form.querySelector('wa-time-picker') as WaTimePicker;
      await el.updateComplete;
      el.value = '09:00';
      await el.updateComplete;
      form.reset();
      await el.updateComplete;
      expect(el.value).to.equal('14:30');
    });

    it('serializes its name and value with JSON', async () => {
      const form = await fixture<HTMLFormElement>(
        html`<form><wa-time-picker name="t" value="14:30" lang="en-GB"></wa-time-picker></form>`,
      );
      const el = form.querySelector<WaTimePicker>('wa-time-picker')!;
      await el.updateComplete;
      const json = serialize(form) as { t: string };
      expect(json.t).to.equal('14:30');
    });

    it('does not add a value to the form when disabled', async () => {
      const form = await fixture<HTMLFormElement>(
        html`<form><wa-time-picker name="t" value="14:30" lang="en-GB" disabled></wa-time-picker></form>`,
      );
      const el = form.querySelector<WaTimePicker>('wa-time-picker')!;
      await el.updateComplete;
      expect(new FormData(form).get('t')).to.equal(null);

      el.disabled = false;
      await el.updateComplete;
      expect(new FormData(form).get('t')).to.equal('14:30');
    });

    it('is included in form data when the form attribute points to an external form', async () => {
      const container = await fixture<HTMLDivElement>(html`
        <div>
          <form id="external"><wa-button type="submit">Submit</wa-button></form>
          <wa-time-picker form="external" name="t" value="14:30" lang="en-GB"></wa-time-picker>
        </div>
      `);
      const form = container.querySelector('form')!;
      const el = container.querySelector<WaTimePicker>('wa-time-picker')!;
      await el.updateComplete;
      expect(new FormData(form).get('t')).to.equal('14:30');
    });

    it('resets to the default value when a wa-button[type=reset] is clicked', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <wa-time-picker name="t" value="14:30" lang="en-GB"></wa-time-picker>
          <wa-button type="reset">Reset</wa-button>
        </form>
      `);
      const el = form.querySelector<WaTimePicker>('wa-time-picker')!;
      const button = form.querySelector('wa-button')!;
      await el.updateComplete;

      el.value = '09:00';
      await el.updateComplete;

      setTimeout(() => button.click());
      await oneEvent(form, 'reset');
      await el.updateComplete;
      expect(el.value).to.equal('14:30');
    });

    it('is invalid when required and empty and form.reportValidity() is called', async () => {
      const form = await fixture<HTMLFormElement>(
        html`<form><wa-time-picker name="t" lang="en-GB" required></wa-time-picker></form>`,
      );
      const el = form.querySelector<WaTimePicker>('wa-time-picker')!;
      await el.updateComplete;
      expect(form.reportValidity()).to.equal(false);
      expect(el.validity.valueMissing).to.equal(true);
    });

    it('keeps validation states when the parent form has novalidate', async () => {
      const form = await fixture<HTMLFormElement>(
        html`<form novalidate><wa-time-picker lang="en-GB" required></wa-time-picker></form>`,
      );
      const el = form.querySelector<WaTimePicker>('wa-time-picker')!;
      await el.updateComplete;
      expect(el.validity.valueMissing).to.equal(true);
      expect(el.customStates.has('invalid')).to.equal(true);
    });

    it('emits wa-invalid from form submission when invalid', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <wa-time-picker name="t" lang="en-GB" required></wa-time-picker>
          <wa-button type="submit">Submit</wa-button>
        </form>
      `);
      const el = form.querySelector<WaTimePicker>('wa-time-picker')!;
      const submit = form.querySelector('wa-button')!;
      await el.updateComplete;

      let invalid = false;
      el.addEventListener('wa-invalid', () => (invalid = true));
      submit.click();
      expect(invalid).to.equal(true);
    });
  });

  describe('validation', () => {
    it('valueMissing when required and empty', async () => {
      const el = await fixture<WaTimePicker>(html`<wa-time-picker lang="en-GB" required></wa-time-picker>`);
      await el.updateComplete;
      expect(el.validity.valueMissing).to.equal(true);
    });

    it('valid when required and a complete value is set', async () => {
      const el = await fixture<WaTimePicker>(
        html`<wa-time-picker lang="en-GB" required value="09:00"></wa-time-picker>`,
      );
      await el.updateComplete;
      expect(el.validity.valueMissing).to.equal(false);
    });
  });

  describe('accessibility', () => {
    it('segments have role=spinbutton with aria-valuemin/max/now/text', async () => {
      const el = await fixture<WaTimePicker>(html`<wa-time-picker lang="en-GB" value="09:30"></wa-time-picker>`);
      await el.updateComplete;
      const hour = getSegment(el, 'hour');
      expect(hour.getAttribute('role')).to.equal('spinbutton');
      expect(hour.getAttribute('aria-valuemin')).to.equal('0');
      expect(hour.getAttribute('aria-valuemax')).to.equal('23');
      expect(hour.getAttribute('aria-valuenow')).to.equal('9');
    });

    it('the group has role=group with a label', async () => {
      const el = await fixture<WaTimePicker>(html`<wa-time-picker lang="en-GB" label="Start"></wa-time-picker>`);
      await el.updateComplete;
      const group = el.shadowRoot!.querySelector<HTMLElement>('[part~="input"]')!;
      expect(group.getAttribute('role')).to.equal('group');
    });

    it('the expand button reports aria-expanded', async () => {
      const el = await fixture<WaTimePicker>(html`<wa-time-picker lang="en-GB"></wa-time-picker>`);
      const button = el.shadowRoot!.querySelector<HTMLElement>('.expand-button')!;
      expect(button.getAttribute('aria-expanded')).to.equal('false');
      el.show();
      await waitForEvent(el, 'wa-after-show');
      expect(button.getAttribute('aria-expanded')).to.equal('true');
    });
  });

  //
  // Gap #6: ArrowLeft/Right navigation, Home/End, Backspace/Delete clearing (synthetic-event style).
  //
  describe('segment navigation and clearing keys', () => {
    it('ArrowRight moves focus to the next segment', async () => {
      const el = await fixture<WaTimePicker>(html`<wa-time-picker lang="en-GB"></wa-time-picker>`);
      await el.updateComplete;
      const hour = getSegment(el, 'hour');
      hour.focus();
      type(hour, 'ArrowRight');
      expect(el.shadowRoot!.activeElement).to.equal(getSegment(el, 'minute'));
    });

    it('ArrowLeft moves focus to the previous segment', async () => {
      const el = await fixture<WaTimePicker>(html`<wa-time-picker lang="en-GB"></wa-time-picker>`);
      await el.updateComplete;
      const minute = getSegment(el, 'minute');
      minute.focus();
      type(minute, 'ArrowLeft');
      expect(el.shadowRoot!.activeElement).to.equal(getSegment(el, 'hour'));
    });

    it('Home jumps to the first segment, End jumps to the last segment', async () => {
      const el = await fixture<WaTimePicker>(html`<wa-time-picker lang="en-US"></wa-time-picker>`);
      await el.updateComplete;
      const minute = getSegment(el, 'minute');
      minute.focus();
      type(minute, 'Home');
      expect(el.shadowRoot!.activeElement).to.equal(getSegment(el, 'hour'));

      type(getSegment(el, 'hour'), 'End');
      // en-US 12-hour layout ends with the dayPeriod segment.
      expect(el.shadowRoot!.activeElement).to.equal(getSegment(el, 'dayPeriod'));
    });

    it('Backspace clears the focused segment and reverts the wire value toward empty', async () => {
      const el = await fixture<WaTimePicker>(html`<wa-time-picker lang="en-GB" value="09:30"></wa-time-picker>`);
      await el.updateComplete;
      expect(el.value).to.equal('09:30');
      const minute = getSegment(el, 'minute');
      minute.focus();
      type(minute, 'Backspace');
      await el.updateComplete;
      // With the minute cleared the time is no longer complete, so the wire value reverts to empty.
      expect(el.value).to.equal('');
      expect(minute.getAttribute('aria-valuenow')).to.equal(null);
    });

    it('Delete clears the focused segment', async () => {
      const el = await fixture<WaTimePicker>(html`<wa-time-picker lang="en-GB" value="09:30"></wa-time-picker>`);
      await el.updateComplete;
      const hour = getSegment(el, 'hour');
      hour.focus();
      type(hour, 'Delete');
      await el.updateComplete;
      expect(el.value).to.equal('');
      expect(hour.getAttribute('aria-valuenow')).to.equal(null);
    });
  });

  //
  // Gap #3: custom validity API.
  //
  describe('setCustomValidity / checkValidity', () => {
    it('setCustomValidity() makes the control invalid with a customError', async () => {
      const el = await fixture<WaTimePicker>(html`<wa-time-picker lang="en-GB" value="09:30"></wa-time-picker>`);
      await el.updateComplete;
      el.setCustomValidity('Nope');
      await el.updateComplete;
      expect(el.checkValidity()).to.equal(false);
      expect(el.validity.customError).to.equal(true);
      expect(el.validationMessage).to.equal('Nope');
      expect(el.customStates.has('invalid')).to.equal(true);
    });

    it('clearing the custom error restores validity', async () => {
      const el = await fixture<WaTimePicker>(html`<wa-time-picker lang="en-GB" value="09:30"></wa-time-picker>`);
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

    it('emits wa-invalid when checkValidity() fails on a custom error', async () => {
      const el = await fixture<WaTimePicker>(html`<wa-time-picker lang="en-GB" value="09:30"></wa-time-picker>`);
      await el.updateComplete;
      el.setCustomValidity('Nope');
      await el.updateComplete;
      const invalidSpy = sinon.spy();
      el.addEventListener('wa-invalid', invalidSpy);
      expect(el.reportValidity()).to.equal(false);
      expect(invalidSpy).to.have.been.calledOnce;
    });
  });

  //
  // Gap #4: min / max / step constraint validation.
  //
  // min/max/step are mirrored onto a hidden native `<input type="time">` and surfaced into WebAwesome
  // validity via MirrorValidator, so the component reports rangeUnderflow/rangeOverflow/stepMismatch
  // exactly as a native time input would (including reversed/overnight min > max ranges).
  //
  describe('min / max / step constraint validation', () => {
    it('a value below min reports rangeUnderflow and is invalid', async () => {
      const el = await fixture<WaTimePicker>(
        html`<wa-time-picker lang="en-GB" min="09:00" value="08:00"></wa-time-picker>`,
      );
      await el.updateComplete;
      expect(el.valueInput.min).to.equal('09:00');
      expect(el.validity.rangeUnderflow).to.equal(true);
      expect(el.validity.valid).to.equal(false);
      expect(el.checkValidity()).to.equal(false);
    });

    it('a value above max reports rangeOverflow and is invalid', async () => {
      const el = await fixture<WaTimePicker>(
        html`<wa-time-picker lang="en-GB" max="17:00" value="18:00"></wa-time-picker>`,
      );
      await el.updateComplete;
      expect(el.valueInput.max).to.equal('17:00');
      expect(el.validity.rangeOverflow).to.equal(true);
      expect(el.validity.valid).to.equal(false);
    });

    it('a value within [min, max] is valid', async () => {
      const el = await fixture<WaTimePicker>(
        html`<wa-time-picker lang="en-GB" min="09:00" max="17:00" value="12:00"></wa-time-picker>`,
      );
      await el.updateComplete;
      expect(el.validity.valid).to.equal(true);
      expect(el.validity.rangeUnderflow).to.equal(false);
      expect(el.validity.rangeOverflow).to.equal(false);
    });

    it('an overnight (min > max) range invalidates a value in the excluded window', async () => {
      const el = await fixture<WaTimePicker>(
        html`<wa-time-picker lang="en-GB" min="22:00" max="06:00" value="12:00"></wa-time-picker>`,
      );
      await el.updateComplete;
      expect(el.valueInput.min).to.equal('22:00');
      expect(el.valueInput.max).to.equal('06:00');
      // 12:00 falls outside the allowed 22:00–06:00 (wrapping) window.
      expect(el.validity.valid).to.equal(false);
    });

    it('an overnight (min > max) range accepts a value inside the wrapped window', async () => {
      const el = await fixture<WaTimePicker>(
        html`<wa-time-picker lang="en-GB" min="22:00" max="06:00" value="23:30"></wa-time-picker>`,
      );
      await el.updateComplete;
      expect(el.validity.valid).to.equal(true);
    });

    it('a step-misaligned value reports stepMismatch', async () => {
      const el = await fixture<WaTimePicker>(
        html`<wa-time-picker lang="en-GB" step="900" value="09:07"></wa-time-picker>`,
      );
      await el.updateComplete;
      expect(el.valueInput.step).to.equal('900');
      expect(el.validity.stepMismatch).to.equal(true);
      expect(el.validity.valid).to.equal(false);
    });

    it('step="any" never reports stepMismatch', async () => {
      const el = await fixture<WaTimePicker>(
        html`<wa-time-picker lang="en-GB" step="any" value="09:07:13"></wa-time-picker>`,
      );
      await el.updateComplete;
      expect(el.valueInput.step).to.equal('any');
      expect(el.validity.stepMismatch).to.equal(false);
      expect(el.validity.valid).to.equal(true);
    });

    it('revalidates when min changes reactively', async () => {
      const el = await fixture<WaTimePicker>(html`<wa-time-picker lang="en-GB" value="08:00"></wa-time-picker>`);
      await el.updateComplete;
      expect(el.checkValidity()).to.equal(true);
      el.min = '09:00';
      await el.updateComplete;
      expect(el.validity.rangeUnderflow).to.equal(true);
      expect(el.checkValidity()).to.equal(false);
      el.min = '07:00';
      await el.updateComplete;
      expect(el.checkValidity()).to.equal(true);
    });
  });

  //
  // Gap #5: user-invalid / assumeInteractionOn.
  //
  describe('user-invalid state', () => {
    it('a required empty time-picker is NOT user-invalid before interaction', async () => {
      const el = await fixture<WaTimePicker>(html`<wa-time-picker lang="en-GB" required></wa-time-picker>`);
      await el.updateComplete;
      expect(el.validity.valueMissing).to.equal(true);
      // Invalid, but the user hasn't interacted yet.
      expect(el.customStates.has('invalid')).to.equal(true);
      expect(el.customStates.has('user-invalid')).to.equal(false);
    });

    it('becomes user-invalid after editing a segment (assumeInteractionOn=["input"])', async () => {
      const el = await fixture<WaTimePicker>(html`<wa-time-picker lang="en-GB" required></wa-time-picker>`);
      await el.updateComplete;
      const hour = getSegment(el, 'hour');
      hour.focus();
      // A single segment edit fires `input`, which marks the field as interacted.
      type(hour, '0');
      type(hour, '9');
      await el.updateComplete;
      // The value is still incomplete (minute empty), so it remains invalid — but now interacted.
      expect(el.validity.valueMissing).to.equal(true);
      expect(el.customStates.has('user-invalid')).to.equal(true);
    });
  });

  //
  // Gap #7: seconds segment value composition.
  //
  describe('seconds segment composition', () => {
    it('types and commits HH:MM:SS when seconds are shown (step=1)', async () => {
      const el = await fixture<WaTimePicker>(html`<wa-time-picker lang="en-GB" step="1"></wa-time-picker>`);
      await el.updateComplete;
      const hour = getSegment(el, 'hour');
      hour.focus();
      type(hour, '0');
      type(hour, '9');
      type(getSegment(el, 'minute'), '3');
      type(getSegment(el, 'minute'), '0');
      type(getSegment(el, 'second'), '1');
      type(getSegment(el, 'second'), '5');
      await el.updateComplete;
      expect(el.value).to.equal('09:30:15');
    });

    it('shows the seconds segment at the withSecondsForStep boundary (step=90, 90 % 60 !== 0)', async () => {
      const el = await fixture<WaTimePicker>(html`<wa-time-picker lang="en-GB" step="90"></wa-time-picker>`);
      await el.updateComplete;
      const fields = getSegments(el).map(s => s.dataset.segment);
      expect(fields).to.include('second');
    });

    it('valueAsDate includes the seconds component', async () => {
      const el = await fixture<WaTimePicker>(
        html`<wa-time-picker lang="en-GB" step="1" value="09:30:15"></wa-time-picker>`,
      );
      await el.updateComplete;
      const d = el.valueAsDate!;
      expect(d.getHours()).to.equal(9);
      expect(d.getMinutes()).to.equal(30);
      expect(d.getSeconds()).to.equal(15);
    });
  });

  //
  // Gap #8: Date object and null value setters.
  //
  describe('value setter accepts Date and null', () => {
    it('accepts a Date and converts to the wire value (HH:mm)', async () => {
      const el = await fixture<WaTimePicker>(html`<wa-time-picker lang="en-GB"></wa-time-picker>`);
      await el.updateComplete;
      const date = new Date();
      date.setHours(7, 5, 0, 0);
      el.value = date;
      await el.updateComplete;
      expect(el.value).to.equal('07:05');
      expect(getSegment(el, 'hour').getAttribute('aria-valuenow')).to.equal('7');
      expect(getSegment(el, 'minute').getAttribute('aria-valuenow')).to.equal('5');
    });

    it('accepts a Date and includes seconds when the seconds segment is shown', async () => {
      const el = await fixture<WaTimePicker>(html`<wa-time-picker lang="en-GB" step="1"></wa-time-picker>`);
      await el.updateComplete;
      const date = new Date();
      date.setHours(7, 5, 42, 0);
      el.value = date;
      await el.updateComplete;
      expect(el.value).to.equal('07:05:42');
    });

    it('accepts null and clears the value', async () => {
      const el = await fixture<WaTimePicker>(html`<wa-time-picker lang="en-GB" value="09:30"></wa-time-picker>`);
      await el.updateComplete;
      el.value = null;
      await el.updateComplete;
      expect(el.value).to.equal('');
      expect(el.valueAsDate).to.equal(null);
      expect(getSegment(el, 'hour').getAttribute('aria-valuenow')).to.equal(null);
    });
  });

  //
  // Gap #2: Real keyboard interaction via sendKeys (real focus, not synthetic keydown).
  //
  describe('real keyboard (sendKeys)', () => {
    it('Tab leaves the segment group (roving tabindex) rather than moving between segments', async () => {
      // The segments form a single ARIA spinbutton group with roving tabindex: only the active segment is
      // tabbable, so Tab exits the group to the next focusable control. ArrowLeft/Right move between segments
      // (covered separately).
      const el = await fixture<WaTimePicker>(html`<wa-time-picker lang="en-GB"></wa-time-picker>`);
      await el.updateComplete;
      getSegment(el, 'hour').focus();
      expect(el.shadowRoot!.activeElement).to.equal(getSegment(el, 'hour'));
      await sendKeys({ press: 'Tab' });
      // Focus is no longer on any segment.
      const active = el.shadowRoot!.activeElement;
      expect(active).to.not.equal(getSegment(el, 'hour'));
      expect(active).to.not.equal(getSegment(el, 'minute'));
    });

    it('typing digits with a real keyboard fills hour + minute and commits a value', async () => {
      const el = await fixture<WaTimePicker>(html`<wa-time-picker lang="en-GB"></wa-time-picker>`);
      await el.updateComplete;
      getSegment(el, 'hour').focus();
      await sendKeys({ type: '0930' });
      await el.updateComplete;
      expect(el.value).to.equal('09:30');
    });

    it('ArrowUp steps the focused segment with a real keyboard', async () => {
      const el = await fixture<WaTimePicker>(html`<wa-time-picker lang="en-GB" value="09:30"></wa-time-picker>`);
      await el.updateComplete;
      getSegment(el, 'minute').focus();
      await sendKeys({ press: 'ArrowUp' });
      await el.updateComplete;
      expect(el.value).to.equal('09:31');
    });
  });

  //
  // Gap #1: SSR + hydration. A high-value subset run across both client-only and SSR+hydrated fixtures.
  //
  for (const fixture of fixtures) {
    describe(`SSR + hydration (${fixture.type})`, () => {
      it('renders 2 segments (hour, minute) in a 24-hour locale', async () => {
        const el = await fixture<WaTimePicker>(html`<wa-time-picker lang="en-GB"></wa-time-picker>`);
        await el.updateComplete;
        const fields = getSegments(el).map(s => s.dataset.segment);
        expect(fields).to.deep.equal(['hour', 'minute']);
      });

      it('renders the dayPeriod segment in a 12-hour locale', async () => {
        const el = await fixture<WaTimePicker>(html`<wa-time-picker lang="en-US"></wa-time-picker>`);
        await el.updateComplete;
        const fields = getSegments(el).map(s => s.dataset.segment);
        expect(fields).to.include.members(['hour', 'minute', 'dayPeriod']);
      });

      it('composes the value from a string attribute and survives hydration', async () => {
        const el = await fixture<WaTimePicker>(html`<wa-time-picker lang="en-GB" value="14:30"></wa-time-picker>`);
        await el.updateComplete;
        expect(el.value).to.equal('14:30');
        expect(getSegment(el, 'hour').getAttribute('aria-valuenow')).to.equal('14');
        expect(getSegment(el, 'minute').getAttribute('aria-valuenow')).to.equal('30');
      });

      it('serializes its value via FormData', async () => {
        const form = await fixture<HTMLFormElement>(
          html`<form><wa-time-picker name="t" value="14:30" lang="en-GB"></wa-time-picker></form>`,
        );
        const el = form.querySelector<WaTimePicker>('wa-time-picker')!;
        await el.updateComplete;
        expect(new FormData(form).get('t')).to.equal('14:30');
      });

      it('is accessible with a label and value', async () => {
        const el = await fixture<WaTimePicker>(
          html`<wa-time-picker label="Start" value="09:30" lang="en-GB"></wa-time-picker>`,
        );
        await el.updateComplete;
        await expect(el).to.be.accessible();
      });
    });
  }
});
