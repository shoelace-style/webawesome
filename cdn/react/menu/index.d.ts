import Component from '../../components/menu/menu.js';
import { type EventName } from '@lit/react';
import type { WaSelectEvent } from '../../events/events.js';
export type { WaSelectEvent } from '../../events/events.js';
/**
 * @summary Menus provide a list of options for the user to choose from.
 * @documentation https://backers.webawesome.com/docs/components/menu
 * @status stable
 * @since 2.0
 *
 * @dependency wa-menu-item
 *
 * @slot - The menu's content, including menu items, menu labels, and dividers.
 *
 * @event {{ item: WaMenuItem }} wa-select - Emitted when a menu item is selected.
 */
declare const reactWrapper: import("@lit/react").ReactWebComponent<Component, {
    onWaSelect: EventName<WaSelectEvent>;
}>;
export default reactWrapper;
