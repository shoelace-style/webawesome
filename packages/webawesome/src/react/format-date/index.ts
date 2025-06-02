import { createComponent } from '@lit/react';
import * as React from 'react';
import Component from '../../components/format-date/format-date.js';

const tagName = 'wa-format-date';

/**
 * @summary Formats a date/time using the specified locale and options.
 * @documentation https://backers.webawesome.com/docs/components/format-date
 * @status stable
 * @since 2.0
 */
const reactWrapper = createComponent({
  tagName,
  elementClass: Component,
  react: React,
  events: {},
  displayName: 'WaFormatDate',
});

export default reactWrapper;
