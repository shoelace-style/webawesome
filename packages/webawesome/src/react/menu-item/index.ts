import { createComponent } from '@lit/react';
import * as React from 'react';
import Component from '../../components/menu-item/menu-item.js';

const tagName = 'wa-menu-item';

/**
 * @summary Menu items provide options for the user to pick from in a menu.
 * @documentation https://backers.webawesome.com/docs/components/menu-item
 * @status stable
 * @since 2.0
 *
 * @dependency wa-icon
 * @dependency wa-popup
 *
 * @slot - The menu item's label.
 * @slot prefix - Used to prepend an icon or similar element to the menu item.
 * @slot suffix - Used to append an icon or similar element to the menu item.
 * @slot submenu - Used to denote a nested menu.
 * @slot checked-icon - The icon used to indicate that this menu item is checked. Usually a `<wa-icon>`.
 * @slot submenu-icon - The icon used to indicate that this menu item has a submenu. Usually a `<wa-icon>`.
 *
 * @csspart checked-icon - The checked icon, which is only visible when the menu item is checked.
 * @csspart prefix - The prefix container.
 * @csspart label - The menu item label.
 * @csspart suffix - The suffix container.
 * @csspart spinner - The spinner that shows when the menu item is in the loading state.
 * @csspart spinner__base - The spinner's base part.
 * @csspart submenu-icon - The submenu icon, visible only when the menu item has a submenu (not yet implemented).
 *
 * @cssproperty --background-color-hover - The menu item's background color on hover.
 * @cssproperty --text-color-hover - The label color on hover.
 * @cssproperty [--submenu-offset=-2px] - The distance submenus shift to overlap the parent menu.
 *
 * @cssstate has-submenu - Applied when the menu item has a submenu.
 * @cssstate submenu-expanded - Applied when the menu item has a submenu and it is expanded.
 */
const reactWrapper = createComponent({
  tagName,
  elementClass: Component,
  react: React,
  events: {},
  displayName: 'WaMenuItem',
});

export default reactWrapper;
