import { createComponent } from '@lit/react';
import * as React from 'react';
import Component from '../../components/divider/divider.js';

const tagName = 'wa-divider';

/**
 * @summary Dividers are used to visually separate or group elements.
 * @documentation https://backers.webawesome.com/docs/components/divider
 * @status stable
 * @since 2.0
 *
 * @cssproperty --color - The color of the divider.
 * @cssproperty --width - The width of the divider.
 * @cssproperty --spacing - The spacing of the divider.
 */
const reactWrapper = createComponent({
  tagName,
  elementClass: Component,
  react: React,
  events: {},
  displayName: 'WaDivider',
});

export default reactWrapper;
