import { createComponent } from '@lit/react';
import * as React from 'react';
import Component from '../../components/relative-time/relative-time.js';

const tagName = 'wa-relative-time';

/**
 * @summary Outputs a localized time phrase relative to the current date and time.
 * @documentation https://backers.webawesome.com/docs/components/relative-time
 * @status stable
 * @since 2.0
 */
const reactWrapper = createComponent({
  tagName,
  elementClass: Component,
  react: React,
  events: {},
  displayName: 'WaRelativeTime',
});

export default reactWrapper;
