import { createComponent } from '@lit/react';
import * as React from 'react';
import Component from '../../components/badge/badge.js';

const tagName = 'wa-badge';

/**
 * @summary Badges are used to draw attention and display statuses or counts.
 * @documentation https://backers.webawesome.com/docs/components/badge
 * @status stable
 * @since 2.0
 *
 * @slot - The badge's content.
 *
 * @csspart base - The component's base wrapper.
 *
 * @cssproperty --background-color - The badge's background color.
 * @cssproperty --border-color - The color of the badge's border.
 * @cssproperty --text-color - The color of the badge's content.
 */
const reactWrapper = createComponent({
  tagName,
  elementClass: Component,
  react: React,
  events: {},
  displayName: 'WaBadge',
});

export default reactWrapper;
