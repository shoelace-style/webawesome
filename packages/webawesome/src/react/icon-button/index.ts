import { createComponent } from '@lit/react';
import * as React from 'react';
import Component from '../../components/icon-button/icon-button.js';

const tagName = 'wa-icon-button';

/**
 * @summary Icons buttons are simple, icon-only buttons that can be used for actions and in toolbars.
 * @documentation https://backers.webawesome.com/docs/components/icon-button
 * @status stable
 * @since 2.0
 *
 * @dependency wa-icon
 *
 * @event blur - Emitted when the icon button loses focus.
 * @event focus - Emitted when the icon button gains focus.
 *
 * @cssproperty [--background-color-hover=var(--wa-color-neutral-fill-quiet)] - The color of the button's background on hover.
 * @cssproperty [--background-color-active=var(--wa-color-neutral-fill-quiet)] - The color of the button's background on `:active`.
 * @cssproperty --text-color-hover - The color of the button's background on hover.
 * @cssproperty --text-color-active - The color of the button's background on `:active`.
 *
 * @csspart base - The component's base wrapper.
 */
const reactWrapper = createComponent({
  tagName,
  elementClass: Component,
  react: React,
  events: {},
  displayName: 'WaIconButton',
});

export default reactWrapper;
