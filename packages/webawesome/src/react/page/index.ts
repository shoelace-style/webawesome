import { createComponent } from '@lit/react';
import * as React from 'react';
import Component from '../../components/page/page.js';

const tagName = 'wa-page';

/**
 * @summary Pages offer an easy way to scaffold entire page layouts using minimal markup.
 * @documentation https://backers.webawesome.com/docs/components/page
 * @status experimental
 * @since 3.0
 *
 * @slot - The page's main content.
 * @slot banner - The banner that gets display above the header. The banner will not be shown if no content is provided.
 * @slot header - The header to display at the top of the page. If a banner is present, the header will appear below the banner. The header will not be shown if there is no content.
 * @slot subheader - A subheader to display below the `header`. This is a good place to put things like breadcrumbs.
 * @slot menu - The left side of the page. If you slot an element in here, you will override the default `navigation` slot and will be handling navigation on your own. This also will not disable the fallback behavior of the navigation button. This section "sticks" to the top as the page scrolls.
 * @slot navigation-header - The header for a navigation area. On mobile this will be the header for `<wa-drawer>`.
 * @slot navigation - The main content to display in the navigation area. This is displayed on the left side of the page, if `menu` is not used. This section "sticks" to the top as the page scrolls.
 * @slot navigation-footer - The footer for a navigation area. On mobile this will be the footer for `<wa-drawer>`.
 * @slot navigation-toggle - Use this slot to slot in your own button + icon for toggling the navigation drawer. By default it is a `<wa-button>` + a 3 bars `<wa-icon>`
 * @slot navigation-toggle-icon - Use this to slot in your own icon for toggling the navigation drawer. By default it is 3 bars `<wa-icon>`.
 * @slot main-header - Header to display inline above the main content.
 * @slot main-footer - Footer to display inline below the main content.
 * @slot aside - Content to be shown on the right side of the page. Typically contains a table of contents, ads, etc. This section "sticks" to the top as the page scrolls.
 * @slot skip-to-content - The "skip to content" slot. You can override this If you would like to override the `Skip to content` button and add additional "Skip to X", they can be inserted here.
 * @slot footer - The content to display in the footer. This is always displayed underneath the viewport so will always make the page "scrollable".
 *
 * @csspart base - The component's base wrapper.
 * @csspart banner - The banner to show above header.
 * @csspart header - The header, usually for top level navigation / branding.
 * @csspart subheader - Shown below the header, usually intended for things like breadcrumbs and other page level navigation.
 * @csspart body - The wrapper around menu, main, and aside.
 * @csspart menu - The left hand side of the page. Generally intended for navigation.
 * @csspart navigation - The `<nav>` that wraps the navigation slots on desktop viewports.
 * @csspart navigation-header - The header for a navigation area. On mobile this will be the header for `<wa-drawer>`.
 * @csspart navigation-footer - The footer for a navigation area. On mobile this will be the footer for `<wa-drawer>`.
 * @csspart navigation-toggle - The default `<wa-button>` that will toggle the `<wa-drawer>` for mobile viewports.
 * @csspart navigation-toggle-icon - The default `<wa-icon>` displayed inside of the navigation-toggle button.
 * @csspart main-header - The header above main content.
 * @csspart main-content - The main content.
 * @csspart main-footer - The footer below main content.
 * @csspart aside - The right hand side of the page. Used for things like table of contents, ads, etc.
 * @csspart skip-links - Wrapper around skip-link
 * @csspart skip-link - The "skip to main content" link
 * @csspart footer - The footer of the page. This is always below the initial viewport size.
 * @csspart dialog-wrapper - A wrapper around elements such as dialogs or other modal-like elements.
 *
 * @cssproperty [--menu-width=auto] - The width of the page's "menu" section.
 * @cssproperty [--main-width=1fr] - The width of the page's "main" section.
 * @cssproperty [--aside-width=auto] - The wide of the page's "aside" section.
 * @cssproperty [--banner-height=0px] - The height of the banner. This gets calculated when the page initializes. If the height is known, you can set it here to prevent shifting when the page loads.
 * @cssproperty [--header-height=0px] - The height of the header. This gets calculated when the page initializes. If the height is known, you can set it here to prevent shifting when the page loads.
 * @cssproperty [--subheader-height=0px] - The height of the subheader. This gets calculated when the page initializes. If the height is known, you can set it here to prevent shifting when the page loads.
 */
const reactWrapper = createComponent({
  tagName,
  elementClass: Component,
  react: React,
  events: {},
  displayName: 'WaPage',
});

export default reactWrapper;
