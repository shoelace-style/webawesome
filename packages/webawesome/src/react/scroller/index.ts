import { createComponent } from '@lit/react';
import * as React from 'react';
import Component from '../../components/scroller/scroller.js';

const tagName = 'wa-scroller';

/**
 * @summary Scrollers create an accessible container while providing visual cues that help users identify and navigate
 *  through content that scrolls.
 * @documentation https://backers.webawesome.com/docs/components/card
 * @status stable
 * @since 3.0
 *
 * @slot - The content to show inside the scroller.
 *
 * @cssproperty [--shadow-color=var(--wa-color-surface-default)] - The base color of the shadow.
 * @cssproperty [--shadow-size=2rem] - The size of the shadow.
 *
 * @csspart content - The container that wraps the slotted content.
 */
const reactWrapper = createComponent({
  tagName,
  elementClass: Component,
  react: React,
  events: {},
  displayName: 'WaScroller',
});

export default reactWrapper;
