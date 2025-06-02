import { createComponent } from '@lit/react';
import * as React from 'react';
import Component from '../../components/menu-label/menu-label.js';

const tagName = 'wa-menu-label';

/**
 * @summary Menu labels are used to describe a group of menu items.
 * @documentation https://backers.webawesome.com/docs/components/menu-label
 * @status stable
 * @since 2.0
 *
 * @slot - The menu label's content.
 */
const reactWrapper = createComponent({
  tagName,
  elementClass: Component,
  react: React,
  events: {},
  displayName: 'WaMenuLabel',
});

export default reactWrapper;
