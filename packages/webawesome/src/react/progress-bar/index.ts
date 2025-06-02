import { createComponent } from '@lit/react';
import * as React from 'react';
import Component from '../../components/progress-bar/progress-bar.js';

const tagName = 'wa-progress-bar';

/**
 * @summary Progress bars are used to show the status of an ongoing operation.
 * @documentation https://backers.webawesome.com/docs/components/progress-bar
 * @status stable
 * @since 2.0
 *
 * @slot - A label to show inside the progress indicator.
 *
 * @csspart base - The component's base wrapper.
 * @csspart indicator - The progress bar's indicator.
 * @csspart label - The progress bar's label.
 *
 * @cssproperty --indicator-color - The color of the indicator.
 * @cssproperty --display - Set to `none` to hide the element, or any other valid `display` value to override the internal `display` value of the `base` part.
 */
const reactWrapper = createComponent({
  tagName,
  elementClass: Component,
  react: React,
  events: {},
  displayName: 'WaProgressBar',
});

export default reactWrapper;
