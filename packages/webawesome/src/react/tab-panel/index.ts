import { createComponent } from '@lit/react';
import * as React from 'react';
import Component from '../../components/tab-panel/tab-panel.js';

const tagName = 'wa-tab-panel';

/**
 * @summary Tab panels are used inside [tab groups](/docs/components/tab-group) to display tabbed content.
 * @documentation https://backers.webawesome.com/docs/components/tab-panel
 * @status stable
 * @since 2.0
 *
 * @slot - The tab panel's content.
 *
 * @csspart base - The component's base wrapper.
 *
 * @cssproperty --padding - The tab panel's padding.
 */
const reactWrapper = createComponent({
  tagName,
  elementClass: Component,
  react: React,
  events: {},
  displayName: 'WaTabPanel',
});

export default reactWrapper;
