import { createComponent } from '@lit/react';
import * as React from 'react';
import Component from '../../components/card/card.js';

const tagName = 'wa-card';

/**
 * @summary Cards can be used to group related subjects in a container.
 * @documentation https://backers.webawesome.com/docs/components/card
 * @status stable
 * @since 2.0
 *
 * @slot - The card's main content.
 * @slot header - An optional header for the card.
 * @slot footer - An optional footer for the card.
 * @slot image - An optional image to render at the start of the card.
 *
 * @csspart image - The container that wraps the card's image.
 * @csspart header - The container that wraps the card's header.
 * @csspart body - The container that wraps the card's main content.
 * @csspart footer - The container that wraps the card's footer.
 *
 * @cssproperty [--border-radius=var(--wa-panel-border-radius)] - The radius for the card's corners. Expects a single value.
 * @cssproperty [--border-color=var(--wa-color-surface-border)] - The color of the card's borders. Expects a single value.
 * @cssproperty [--inner-border-color=var(--wa-color-surface-border)] - The color of the card's inner borders, e.g. those separating headers and footers from the main content. Expects a single value.
 * @cssproperty [--border-width=var(--wa-panel-border-width)] - The width of the card's borders. Expects a single value.
 * @cssproperty [--spacing=var(--wa-space)] - The amount of space around and between sections of the card. Expects a single value.
 */
const reactWrapper = createComponent({
  tagName,
  elementClass: Component,
  react: React,
  events: {},
  displayName: 'WaCard',
});

export default reactWrapper;
