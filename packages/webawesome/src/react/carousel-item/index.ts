import { createComponent } from '@lit/react';
import * as React from 'react';
import Component from '../../components/carousel-item/carousel-item.js';

const tagName = 'wa-carousel-item';

/**
 * @summary A carousel item represent a slide within a [carousel](/docs/components/carousel).
 *
 * @since 2.0
 * @status experimental
 *
 * @slot - The carousel item's content..
 *
 * @cssproperty --aspect-ratio - The slide's aspect ratio. Inherited from the carousel by default.
 *
 */
const reactWrapper = createComponent({
  tagName,
  elementClass: Component,
  react: React,
  events: {},
  displayName: 'WaCarouselItem',
});

export default reactWrapper;
