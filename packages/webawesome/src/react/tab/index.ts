import { createComponent } from '@lit/react';
import * as React from 'react';
import Component from '../../components/tab/tab.js';

const tagName = 'wa-tab';

/**
 * @summary Tabs are used inside [tab groups](/docs/components/tab-group) to represent and activate [tab panels](/docs/components/tab-panel).
 * @documentation https://backers.webawesome.com/docs/components/tab
 * @status stable
 * @since 2.0
 *
 * @slot - The tab's label.
 *
 * @cssproperty --active-tab-color - The color of the active tab's label.
 *
 * @csspart base - The component's base wrapper.
 */
const reactWrapper = createComponent({
  tagName,
  elementClass: Component,
  react: React,
  events: {},
  displayName: 'WaTab',
});

export default reactWrapper;
