import { createComponent } from '@lit/react';
import * as React from 'react';
import Component from '../../components/radio-button/radio-button.js';

const tagName = 'wa-radio-button';

/**
 * @summary Radios buttons allow the user to select a single option from a group using a button-like control.
 * @documentation https://backers.webawesome.com/docs/components/radio-button
 * @status stable
 * @since 2.0
 *
 * @slot - The radio button's label.
 * @slot prefix - A presentational prefix icon or similar element.
 * @slot suffix - A presentational suffix icon or similar element.
 *
 * @event blur - Emitted when the button loses focus.
 * @event focus - Emitted when the button gains focus.
 *
 * @cssproperty --indicator-color - The color of the checked button indicator.
 * @cssproperty --indicator-width - The width of the checked button indicator.
 *
 * @csspart base - The internal `<button>` element.
 * @csspart checked - The internal button element when the radio button is checked.
 * @csspart prefix - The container that wraps the prefix.
 * @csspart label - The container that wraps the radio button's label.
 * @csspart suffix - The container that wraps the suffix.
 * @cssproperty --display - Set to `none` to hide the element, or any other valid `display` value to override the internal `display` value of the `base` part.
 */
const reactWrapper = createComponent({
  tagName,
  elementClass: Component,
  react: React,
  events: {},
  displayName: 'WaRadioButton',
});

export default reactWrapper;
