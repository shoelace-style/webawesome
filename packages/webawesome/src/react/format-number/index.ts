import { createComponent } from '@lit/react';
import * as React from 'react';
import Component from '../../components/format-number/format-number.js';

const tagName = 'wa-format-number';

/**
 * @summary Formats a number using the specified locale and options.
 * @documentation https://backers.webawesome.com/docs/components/format-number
 * @status stable
 * @since 2.0
 */
const reactWrapper = createComponent({
  tagName,
  elementClass: Component,
  react: React,
  events: {},
  displayName: 'WaFormatNumber',
});

export default reactWrapper;
