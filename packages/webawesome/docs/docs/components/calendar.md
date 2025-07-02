---
title: Calendar
description: A component for displaying a monthly view of the Gregorian calendar, optionally allowing users to interact with dates.
layout: component
category: Form Controls
---

```html {.example}
<wa-calendar months="2" value="2024-04-03/2024-04-05" type="range"></wa-calendar>
```

## Navigation

### Focus on a specific month

By default, the calendar focuses on the month of the current date. For example, if the value is set to `1979-09-05`, the calendar will display September 1979.

```html {.example}
<wa-calendar value="1979-09-05"></wa-calendar>
```

### Disabling navigation

To disable the navigation between months, use `disable-navigation`.

```html {.example}
<wa-calendar disable-navigation></wa-calendar>
```

### Navigate with Header Actions

The calendar can be navigated using header actions. Use the `caption-layout` property to set the layout of the header actions. (Only available in single month mode.)

Default is `buttons`, which displays the header actions as buttons.

```html {.example}
<wa-calendar caption-layout="buttons"></wa-calendar>
```

The `dropdown` layout displays the header actions as a dropdown menu.

```html {.example}
<wa-calendar caption-layout="dropdown"></wa-calendar>
```

## Customization

### Showing the outside days

By default, only dates in the target month are shown. Use `show-outside-days` to display the days falling out the current month.

```html {.example}
<wa-calendar show-outside-days></wa-calendar>
```

### Showing the week numbers

Use `show-week-numbers` to display the week numbers.

```html {.example}
<wa-calendar show-week-numbers></wa-calendar>
```

Use a custom formatter to customize the rendering.

```html {.example}
<wa-calendar id="custom-week-numbers" show-week-numbers></wa-calendar>

<script>
  const calendar = document.querySelector('#custom-week-numbers');
  calendar.weekNumberFormatter = weekNumber => {
    return `W${weekNumber}`;
  };
</script>
```

## Selecting Days

### Single Selection

By default, the calendar allows the selection of single days.

```html {.example}
<wa-calendar value="2024-04-03"></wa-calendar>
```

### Range Selection

Use `type="range"` to allow the selection of multiple days in a range.

```html {.example}
<wa-calendar type="range" value="2024-04-03/2024-04-05"></wa-calendar>
```

### Selecting multiple days

Use `type="multi"` to allow the selection of multiple days.
To set the selected days, use the `value` property. An array of dates is accepted and the selection does not have to be continuous.

```html {.example}
<wa-calendar type="multi" value="2025-06-05 2025-06-13 2025-06-14"></wa-calendar>
```

## Modifiers

In the calendar, a modifier is added to a day when the day matches a specific condition, called Matcher. For example, selected days have the `selected` modifiers, disabled days the `disabled` modifier.

### The selected modifier

To style selected days, use the `selected` modifier.

```html {.example}
<wa-calendar class="calendar-selected-modifier" value="2024-04-07"></wa-calendar>

<style>
  .calendar-selected-modifier::part(selected) {
    background-color: #7048e8;
    font-weight: bold;
    transform: rotate(10deg);
    transition: transform 0.3s;
  }
</style>
```

### The outside modifier

To style days outside the current month, use the `outside` modifier.

```html {.example}
<wa-calendar class="calendar-outside-modifier" show-outside-days></wa-calendar>

<style>
  .calendar-outside-modifier::part(outside) {
    background-color: var(--wa-color-neutral-fill-normal);
    color: var(--wa-color-neutral-on-normal);
    border-radius: 0;
  }
</style>
```

### The today modifier

To style the current day, use the `today` modifier.

```html {.example}
<wa-calendar class="calendar-today-modifier"></wa-calendar>

<style>
  .calendar-today-modifier::part(today) {
    border: 1px solid #7048e8;
  }
</style>
```

### The disallowed modifier

Days that are not selectable due to the `isDateDisallowed` function are styled using the `disallowed` modifier.

#### Disallow specific days of the week

Use the `isDateDisallowed` function to disallow specific days of the week. The function should return `true` for days that should be disallowed.

```html {.example}
<wa-calendar class="calendar-disallow-days"></wa-calendar>

<script>
  const calendar = document.querySelector('.calendar-disallow-days');

  function isWeekend(date) {
    const day = date.getDay();
    return [0, 6].includes(day);
  }

  calendar.isDateDisallowed = isWeekend;
</script>

<style>
  .calendar-disallow-days::part(disallowed) {
    text-decoration: line-through;
  }
</style>
```

### The disabled modifier

Days that are not selectable due to the `min` and `max` props are styled using the `disabled` modifier.

#### Disable days before or after a specific date

Use the `min` and `max` props to disable days before or after a specific date.

```html {.example}
<wa-calendar class="calendar-disabled-beforeafter"></wa-calendar>

<script>
  const calendar = document.querySelector('.calendar-disabled-beforeafter');
  const today = new Date();

  calendar.min = '2023-11-10';
  calendar.max = '2024-03-20';
</script>

<style>
  .calendar-disabled-beforeafter::part(disabled) {
    /* default styling */
  }
</style>
```

## Localization

### Changing locale

By default, the calendar will use the browsers's locale. You can use the `locale` attribute to change this.
For example, to localize the calendar in Spanish, set the `locale` attribute to `es`.

```html {.example}
<wa-calendar locale="es"></wa-calendar>
```

### Overriding the first day of the week

Use the `first-day-of-week` prop to change the first day of the week.

```html {.example}
<wa-calendar first-day-of-week="0"></wa-calendar>
```

## Styling

### Customizing the calendar with a custom header

The calendar header can be customized by using the `header` slot.

```html {.example}
<wa-calendar class="calendar-header">
  <div slot="header">Custom Header</div>
</wa-calendar>
```

### Display in a dialog

The calendar can be displayed in a dialog.

```html {.example}
<wa-dialog label="Dialog" class="dialog-datepicker" with-footer>
  <wa-calendar></wa-calendar>
  <wa-button slot="footer">Cancel</wa-button>
  <wa-button slot="footer" variant="brand">Ok</wa-button>
</wa-dialog>

<wa-button>Open Calendar</wa-button>

<script>
  const dialog = document.querySelector('.dialog-datepicker');
  const openButton = dialog.nextElementSibling;
  const closeButton = dialog.querySelector('wa-button[slot="footer"]');

  openButton.addEventListener('click', () => (dialog.open = true));
  closeButton.addEventListener('click', () => (dialog.open = false));
</script>

<style>
  .dialog-datepicker {
    --width: fit-content;
  }
</style>
```

### Use as a date picker

The calendar can be used as a date picker.

```html {.example}
<wa-dropdown class="picker">
  <wa-button slot="trigger">
    <span>Pick a Date</span>
    <wa-icon name="calendar_today" slot="prefix"></wa-icon>
  </wa-button>
  <wa-card>
    <wa-calendar class="calendar-datepicker"></wa-calendar>
  </wa-card>
</wa-dropdown>

<script>
  const picker = document.querySelector('.picker');
  const button = picker.querySelector('wa-button span');
  const calendar = picker.querySelector('.calendar-datepicker');

  calendar.addEventListener('change', event => {
    const date = event.target.value;
    if (!date) {
      button.textContent = 'Pick a Date';
      return;
    }

    try {
      const parsedDate = new Date(date);
      if (isNaN(parsedDate.getTime())) {
        throw new Error('Invalid date');
      }

      const formatted = new Intl.DateTimeFormat('default', {
        dateStyle: 'full'
      }).format(parsedDate);
      button.textContent = formatted;
    } catch (error) {
      console.error('Error formatting date:', error);
      button.textContent = 'Pick a Date';
    }
  });

  picker.addEventListener('change', () => {
    picker.hide();
  });
</script>
```
