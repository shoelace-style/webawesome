import { createComponent } from '@lit/react';
import * as React from 'react';
import Component from '../../components/breadcrumb-item/breadcrumb-item.js';

const tagName = 'wa-breadcrumb-item';

/**
 * @summary Breadcrumb Items are used inside [breadcrumbs](/docs/components/breadcrumb) to represent different links.
 * @documentation https://backers.webawesome.com/docs/components/breadcrumb-item
 * @status stable
 * @since 2.0
 *
 * @slot - The breadcrumb item's label.
 * @slot prefix - An optional prefix, usually an icon or icon button.
 * @slot suffix - An optional suffix, usually an icon or icon button.
 * @slot separator - The separator to use for the breadcrumb item. This will only change the separator for this item. If
 * you want to change it for all items in the group, set the separator on `<wa-breadcrumb>` instead.
 *
 * @csspart base - The component's base wrapper.
 * @csspart label - The breadcrumb item's label.
 * @csspart prefix - The container that wraps the prefix.
 * @csspart suffix - The container that wraps the suffix.
 * @csspart separator - The container that wraps the separator.
 */
const reactWrapper = createComponent({
  tagName,
  elementClass: Component,
  react: React,
  events: {},
  displayName: 'WaBreadcrumbItem',
});

export default reactWrapper;
