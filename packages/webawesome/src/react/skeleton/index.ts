import { createComponent } from '@lit/react';
import * as React from 'react';
import Component from '../../components/skeleton/skeleton.js';

const tagName = 'wa-skeleton';

/**
 * @summary Skeletons are used to provide a visual representation of where content will eventually be drawn.
 * @documentation https://backers.webawesome.com/docs/components/skeleton
 * @status stable
 * @since 2.0
 *
 * @csspart indicator - The skeleton's indicator which is responsible for its color and animation.
 *
 * @cssproperty --border-radius - The skeleton's border radius.
 * @cssproperty --color - The color of the skeleton.
 * @cssproperty --sheen-color - The sheen color when the skeleton is in its loading state.
 */
const reactWrapper = createComponent({
  tagName,
  elementClass: Component,
  react: React,
  events: {},
  displayName: 'WaSkeleton',
});

export default reactWrapper;
