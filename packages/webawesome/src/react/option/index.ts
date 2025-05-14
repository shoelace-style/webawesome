import { createComponent } from '@lit/react';
import * as React from 'react';
import Component from '../../components/option/option.js';

const tagName = 'wa-option';

/**
 * @summary Options define the selectable items within various form controls such as [select](/docs/components/select).
 * @documentation https://backers.webawesome.com/docs/components/option
 * @status stable
 * @since 2.0
 *
 * @dependency wa-icon
 *
 * @slot - The option's label.
 * @slot prefix - Used to prepend an icon or similar element to the menu item.
 * @slot suffix - Used to append an icon or similar element to the menu item.
 *
 * @cssproperty --background-color-current - The current option's background color.
 * @cssproperty --background-color-hover - The options's background color on hover.
 * @cssproperty --text-color-current - The current option's label color.
 * @cssproperty --text-color-hover - The label color on hover.
 *
 * @csspart checked-icon - The checked icon, a `<wa-icon>` element.
 * @csspart label - The option's label.
 * @csspart prefix - The container that wraps the prefix.
 * @csspart suffix - The container that wraps the suffix.
 *
 * @cssstate current - The user has keyed into the option, but hasn't selected it yet (shows a highlight)
 * @cssstate selected - The option is selected and has aria-selected="true"
 * @cssstate hover - Like `:hover` but works while dragging in Safari
 */
const reactWrapper = createComponent({
  tagName,
  elementClass: Component,
  react: React,
  events: {},
  displayName: 'WaOption',
});

export default reactWrapper;
