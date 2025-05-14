import { createComponent } from '@lit/react';
import * as React from 'react';
import Component from '../../components/comparer/comparer.js';

const tagName = 'wa-comparer';

/**
 * @summary Compare visual differences between similar content with a sliding panel.
 * @documentation https://backers.webawesome.com/docs/components/comparer
 * @status stable
 * @since 2.0
 *
 * @dependency wa-icon
 *
 * @slot before - The before content, often an `<img>` or `<svg>` element.
 * @slot after - The after content, often an `<img>` or `<svg>` element.
 * @slot handle - The icon used inside the handle.
 *
 * @event change - Emitted when the position changes.
 *
 * @csspart before - The container that wraps the before content.
 * @csspart after - The container that wraps the after content.
 * @csspart divider - The divider that separates the before and after content.
 * @csspart handle - The handle that the user drags to expose the after content.
 *
 * @cssproperty --divider-color - The color of the divider.
 * @cssproperty --divider-width - The width of the dividing line.
 * @cssproperty --handle-color - The color of the icon used inside the handle.
 * @cssproperty --handle-size - The size of the compare handle.
 */
const reactWrapper = createComponent({
  tagName,
  elementClass: Component,
  react: React,
  events: {},
  displayName: 'WaComparer',
});

export default reactWrapper;
