import { createComponent } from '@lit/react';
import * as React from 'react';
import Component from '../../components/button-group/button-group.js';

const tagName = 'wa-button-group';

/**
 * @summary Button groups can be used to group related buttons into sections.
 * @documentation https://backers.webawesome.com/docs/components/button-group
 * @status stable
 * @since 2.0
 *
 * @slot - One or more `<wa-button>` elements to display in the button group.
 *
 * @csspart base - The component's base wrapper.
 */
const reactWrapper = createComponent({
  tagName,
  elementClass: Component,
  react: React,
  events: {},
  displayName: 'WaButtonGroup',
});

export default reactWrapper;
