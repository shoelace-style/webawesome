import { createComponent } from '@lit/react';
import * as React from 'react';
import Component from '../../components/viewport-demo/viewport-demo.js';

const tagName = 'wa-viewport-demo';

/**
 * @summary Viewport demos can be used to display an iframe as a resizable, zoomable preview.
 * @documentation https://backers.webawesome.com/docs/components/viewport-demo
 * @status experimental
 * @since 3.0
 *
 * @dependency wa-icon-button
 *
 * @slot - The iframe (usually an `<iframe>` element).
 *
 * @csspart frame - The visible frame around the viewport.
 *
 * @cssproperty --viewport-initial-aspect-ratio - The initial aspect ratio of the viewport, when the `viewport` attribute is used. Defaults to `16 / 9`.
 * @cssproperty --viewport-bezel-width - The width of the bezel around the viewport. Defaults to `0.25em`.
 * @cssproperty --viewport-background-color - The background color of the viewport. Defaults to `var(--wa-color-surface-default, canvas)`.
 * @cssproperty --viewport-resize - The resize behavior of the viewport. Defaults to `both`.
 * @cssproperty --viewport-min-width - The minimum width of the viewport. Defaults to `2em`.
 * @cssproperty --viewport-max-width - The maximum width of the viewport. Defaults to `100%`. Anything over 100% will be clipped.
 * @cssproperty --viewport-padding - The padding of the viewport. Defaults to `var(--wa-space-2xl, 2rem)`.
 *
 */
const reactWrapper = createComponent({
  tagName,
  elementClass: Component,
  react: React,
  events: {},
  displayName: 'WaViewportDemo',
});

export default reactWrapper;
