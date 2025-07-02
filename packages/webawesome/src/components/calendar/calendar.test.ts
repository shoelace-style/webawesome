import '../../../dist/components/index.js';
import { expect, fixture, html, nextFrame } from '@open-wc/testing';
import { Locale } from '../../internal/utils/date/Locale.js';
import type WaCalendar from './calendar.js';

function getMonthName(date: Date): string {
  const locale = Locale.fromOptions({ month: 'long' }, 'en-US');
  const monthName = locale.monthNames[date.getMonth()].name;
  return monthName.charAt(0).toUpperCase() + monthName.slice(1);
}

function getMonthHeading(calendar: WaCalendar): string {
  return calendar.shadowRoot?.querySelector('.calendar-heading')?.textContent?.trim() || '';
}

function getDayButton(calendar: WaCalendar, date: string): HTMLButtonElement | null {
  const buttons = calendar.shadowRoot?.querySelectorAll('button');
  return Array.from(buttons || []).find(
    button => button.getAttribute('aria-label')?.trim() === date.trim()
  ) as HTMLButtonElement | null;
}

function getSelectedDays(calendar: WaCalendar): HTMLButtonElement[] {
  return Array.from(calendar.shadowRoot?.querySelectorAll('button[aria-pressed]') || []);
}

function clickDay(calendar: WaCalendar, date: string): Promise<void> {
  const button = getDayButton(calendar, date);
  if (button) {
    button.click();
    return nextFrame();
  }
  return Promise.resolve();
}

describe('<wa-calendar>', () => {
  let el: WaCalendar;

  describe('when provided no parameters', () => {
    beforeEach(async () => {
      el = await fixture<WaCalendar>(html` <wa-calendar></wa-calendar> `);
    });

    it('should pass accessibility test', async () => {
      await expect(el).to.be.accessible();
    });

    it('should have default properties', () => {
      expect(el.type).to.equal('date');
      expect(el.value).to.equal('');
      expect(el.months).to.equal(1);
      expect(el.showOutsideDays).to.be.false;
      expect(el.showWeekNumbers).to.be.false;
      expect(el.disableNavigation).to.be.false;
      expect(el.firstDayOfWeek).to.equal(1);
      expect(el.readonly).to.be.false;
      expect(el.locale).to.be.undefined;
    });
  });

  describe('when provided a type parameter', () => {
    ['date', 'multi', 'range'].forEach(type => {
      it(`should set type to ${type}`, async () => {
        el = await fixture<WaCalendar>(html` <wa-calendar type="${type}"></wa-calendar> `);
        expect(el.type).to.equal(type);
      });
    });
  });

  describe('when provided a value', () => {
    it('should set single date value', async () => {
      const date = '2024-03-15';
      el = await fixture<WaCalendar>(html` <wa-calendar value="${date}"></wa-calendar> `);
      expect(el.value).to.equal(date);
    });

    it('should set multiple dates value', async () => {
      const dates = '2024-03-15 2024-03-16 2024-03-17';
      el = await fixture<WaCalendar>(html` <wa-calendar type="multi" value="${dates}"></wa-calendar> `);
      expect(el.value).to.equal(dates);
    });

    it('should set date range value', async () => {
      const range = '2024-03-15/2024-03-20';
      el = await fixture<WaCalendar>(html` <wa-calendar type="range" value="${range}"></wa-calendar> `);
      expect(el.value).to.equal(range);
    });
  });

  describe('when provided months parameter', () => {
    it('should display multiple months', async () => {
      el = await fixture<WaCalendar>(html` <wa-calendar months="2"></wa-calendar> `);
      const monthElements = el.shadowRoot!.querySelectorAll('.calendar-month');
      expect(monthElements.length).to.equal(2);
    });
  });

  describe('when provided showOutsideDays parameter', () => {
    it('should show days from adjacent months', async () => {
      el = await fixture<WaCalendar>(html` <wa-calendar show-outside-days></wa-calendar> `);
      const outsideDays = el.shadowRoot!.querySelectorAll('.outside');
      expect(outsideDays.length).to.be.greaterThan(0);
    });
  });

  describe('when provided showWeekNumbers parameter', () => {
    it('should show week numbers', async () => {
      el = await fixture<WaCalendar>(html` <wa-calendar show-week-numbers></wa-calendar> `);
      const weekNumbers = el.shadowRoot!.querySelectorAll('[part="weeknumber"]');
      expect(weekNumbers.length).to.be.greaterThan(0);
    });
  });

  describe('when provided disableNavigation parameter', () => {
    it('should hide navigation buttons', async () => {
      el = await fixture<WaCalendar>(html` <wa-calendar disable-navigation></wa-calendar> `);
      const navButtons = el.shadowRoot!.querySelectorAll('.navigation-button');
      expect(navButtons.length).to.equal(0);
    });
  });

  describe('when provided firstDayOfWeek parameter', () => {
    it('should start week on specified day', async () => {
      el = await fixture<WaCalendar>(html` <wa-calendar first-day-of-week="0"></wa-calendar> `);
      const weekDays = el.shadowRoot!.querySelectorAll('[part="weekday"]');
      expect(weekDays[0].textContent).to.equal('Sun');
    });
  });

  describe('when provided min and max parameters', () => {
    it('should disable dates outside range', async () => {
      el = await fixture<WaCalendar>(html` <wa-calendar min="2024-03-15" max="2024-03-20"></wa-calendar> `);
      const disabledDays = el.shadowRoot!.querySelectorAll('.disabled');
      expect(disabledDays.length).to.be.greaterThan(0);
    });
  });

  describe('when provided locale parameter', () => {
    it('should format dates according to locale', async () => {
      el = await fixture<WaCalendar>(html` <wa-calendar locale="de-DE"></wa-calendar> `);
      const weekDays = el.shadowRoot!.querySelectorAll('[part="weekday"]');
      expect(weekDays[0].textContent).to.equal('Mo');
    });
  });

  describe('when provided readonly parameter', () => {
    it('should disable date selection', async () => {
      el = await fixture<WaCalendar>(html` <wa-calendar readonly></wa-calendar> `);
      const disabledDays = el.shadowRoot!.querySelectorAll('.disabled');
      expect(disabledDays.length).to.be.greaterThan(0);
    });
  });

  describe('date selection', () => {
    it('should emit change event when date is selected', async () => {
      const calendar = await fixture<WaCalendar>('<wa-calendar></wa-calendar>');
      const today = new Date();

      // Create a promise that resolves when the change event is fired
      const changePromise = new Promise<Event>(resolve => {
        calendar.addEventListener('change', (e: Event) => resolve(e), { once: true });
      });

      // Click the date
      const button = getDayButton(calendar, `${getMonthName(today)} ${today.getDate()}`)!;
      button.click();

      // Wait for the event
      const event = await changePromise;
      expect(event).to.exist;
    });

    it('should update value when date is selected', async () => {
      el = await fixture<WaCalendar>(html` <wa-calendar></wa-calendar> `);
      const dateButton = el.shadowRoot!.querySelector('button[part="day"]')!;
      (dateButton as HTMLElement).click();

      expect(el.value).to.not.equal('');
    });
  });

  describe('keyboard navigation', () => {
    it('should handle arrow key navigation', async () => {
      el = await fixture<WaCalendar>(html` <wa-calendar></wa-calendar> `);
      const focusedButton = el.shadowRoot!.querySelector('button[tabindex="0"]')!;

      focusedButton.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
      await el.updateComplete;

      const newFocusedButton = el.shadowRoot!.querySelector('button[tabindex="0"]')!;
      expect(newFocusedButton).to.not.equal(focusedButton);
    });
  });

  describe('range selection', () => {
    it('should select date range', async () => {
      el = await fixture<WaCalendar>(html` <wa-calendar type="range"></wa-calendar> `);
      const dateButtons = el.shadowRoot!.querySelectorAll('button[part="day"]');

      (dateButtons[0] as HTMLElement).click();
      (dateButtons[5] as HTMLElement).click();

      expect(el.value).to.include('/');
    });
  });

  describe('multi selection', () => {
    it('should select multiple dates', async () => {
      el = await fixture<WaCalendar>(html` <wa-calendar type="multi"></wa-calendar> `);
      const dateButtons = el.shadowRoot!.querySelectorAll('button[part="day"]');

      (dateButtons[0] as HTMLElement).click();
      (dateButtons[1] as HTMLElement).click();
      (dateButtons[2] as HTMLElement).click();

      expect(el.value.split(' ').length).to.be.greaterThan(1);
    });
  });

  describe('value types', () => {
    describe('range', () => {
      it('handles an empty value', async () => {
        const calendar = await fixture<WaCalendar>('<wa-calendar type="range" value=""></wa-calendar>');
        const selected = getSelectedDays(calendar);
        expect(selected.length).to.eq(0);
      });

      it('marks a range as selected', async () => {
        const calendar = await fixture<WaCalendar>(
          '<wa-calendar type="range" value="2020-01-01/2020-01-03"></wa-calendar>'
        );

        const selected = getSelectedDays(calendar);
        expect(selected.length).to.eq(3);

        expect(selected[0]).to.have.attribute('aria-label', 'January 1');
        expect(selected[0].part.contains('selected')).to.eq(true);
        expect(selected[0].part.contains('range-start')).to.eq(true);

        expect(selected[1]).to.have.attribute('aria-label', 'January 2');
        expect(selected[1].part.contains('selected')).to.eq(true);
        expect(selected[1].part.contains('in-range')).to.eq(true);

        expect(selected[2]).to.have.attribute('aria-label', 'January 3');
        expect(selected[2].part.contains('selected')).to.eq(true);
        expect(selected[2].part.contains('range-end')).to.eq(true);
      });
    });

    describe('single date', () => {
      it('handles an empty value', async () => {
        const calendar = await fixture<WaCalendar>('<wa-calendar></wa-calendar>');
        const selected = getSelectedDays(calendar);
        expect(selected.length).to.eq(0);
      });

      it('marks a single date as selected', async () => {
        const calendar = await fixture<WaCalendar>('<wa-calendar value="2025-06-17"></wa-calendar>');

        const selected = getSelectedDays(calendar);
        expect(selected.length).to.eq(1);
        expect(selected[0]).to.have.attribute('aria-label', 'June 17');
        expect(selected[0].part.contains('selected')).to.eq(true);
      });
    });

    describe('multi date', () => {
      it('handles an empty value', async () => {
        const calendar = await fixture<WaCalendar>('<wa-calendar type="multi" value=""></wa-calendar>');
        const selected = getSelectedDays(calendar);
        expect(selected.length).to.eq(0);
      });

      it('marks multiple dates as selected', async () => {
        const calendar = await fixture<WaCalendar>(
          '<wa-calendar type="multi" value="2020-01-01 2020-01-02 2020-01-03"></wa-calendar>'
        );

        const selected = getSelectedDays(calendar);
        expect(selected.length).to.eq(3);
        expect(selected[0]).to.have.attribute('aria-label', 'January 1');
        expect(selected[1]).to.have.attribute('aria-label', 'January 2');
        expect(selected[2]).to.have.attribute('aria-label', 'January 3');
      });
    });
  });

  describe('a11y/ARIA requirements', () => {
    describe('grid', () => {
      it('is labelled', async () => {
        const calendar = await fixture<WaCalendar>('<wa-calendar></wa-calendar>');
        const title = getMonthHeading(calendar);
        expect(title).not.to.eq(undefined);
      });

      it('marks today', async () => {
        const calendar = await fixture<WaCalendar>('<wa-calendar></wa-calendar>');
        const today = new Date();
        const button = getDayButton(calendar, `${getMonthName(today)} ${today.getDate()}`)!;

        expect(button.part.contains('today')).to.eq(true);
        expect(button).to.have.attribute('aria-current', 'date');
      });
    });
  });

  describe('min/max support', () => {
    it('supports a min date', async () => {
      const calendar = await fixture<WaCalendar>(
        '<wa-calendar min="2025-06-15" value="2025-06-15"></wa-calendar>'
      );

      // try clicking a day outside the range
      await clickDay(calendar, 'June 14');
      expect(calendar.value).to.eq('2025-06-15');

      // click a day inside the range
      await clickDay(calendar, 'June 20');
      expect(calendar.value).to.eq('2025-06-20');
    });

    it('supports a max date', async () => {
      const calendar = await fixture<WaCalendar>(
        '<wa-calendar max="2025-06-15" value="2025-06-15"></wa-calendar>'
      );

      // try clicking a day outside the range
      await clickDay(calendar, 'June 20');
      expect(calendar.value).to.eq('2025-06-15');

      // click a day inside the range
      await clickDay(calendar, 'June 10');
      expect(calendar.value).to.eq('2025-06-10');
    });

    it('supports min and max dates', async () => {
      const calendar = await fixture<WaCalendar>(
        '<wa-calendar min="2025-06-10" max="2025-06-20" value="2025-06-15"></wa-calendar>'
      );

      // try clicking a day less than min
      await clickDay(calendar, 'June 1');
      expect(calendar.value).to.eq('2025-06-15');

      // try clicking a day greater than max
      await clickDay(calendar, 'June 25');
      expect(calendar.value).to.eq('2025-06-15');

      // click a day inside the range
      await clickDay(calendar, 'June 12');
      expect(calendar.value).to.eq('2025-06-12');
    });
  });

  it('can show outside days', async () => {
    const calendar = await fixture<WaCalendar>(
      '<wa-calendar show-outside-days value="2025-06-15"></wa-calendar>'
    );

    const outsideMay = getDayButton(calendar, 'May 30');
    const outsideJuly = getDayButton(calendar, 'July 1');

    expect(outsideMay?.part.contains('outside')).to.eq(true);
    expect(outsideJuly?.part.contains('outside')).to.eq(true);
  });
});
