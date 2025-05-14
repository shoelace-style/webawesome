import { createComponent } from '@lit/react';
import * as React from 'react';
import Component from '../../components/format-bytes/format-bytes.js';

const tagName = 'wa-format-bytes';

/**
 * @summary Formats a number as a human readable bytes value.
 * @documentation https://backers.webawesome.com/docs/components/format-bytes
 * @status stable
 * @since 2.0
 */
const reactWrapper = createComponent({
  tagName,
  elementClass: Component,
  react: React,
  events: {},
  displayName: 'WaFormatBytes',
});

export default reactWrapper;
