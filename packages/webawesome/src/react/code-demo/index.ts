import { createComponent } from '@lit/react';
import * as React from 'react';
import Component from '../../components/code-demo/code-demo.js';

const tagName = 'wa-code-demo';

/**
 * @summary Code demos can be used to render code examples as inline live demos.
 * @documentation https://backers.webawesome.com/docs/components/code-demo
 * @status experimental
 * @since 3.0
 *
 * @dependency wa-viewport-demo
 * @dependency wa-icon
 *
 * @slot - The main code example (usually a `<pre>` element).
 * @slot preview - One or more custom elements to display as the code example preview.
 *
 * @csspart preview - The container of the code example preview.
 * @csspart controls - The container of the control buttons.
 * @csspart button - The control buttons.
 * @csspart open-button - The open in new tab button.
 * @csspart toggle-button - The toggle button.
 * @csspart edit-button - The edit button.
 * @csspart iframe - The iframe that contains the preview (in isolated demos).
 * @csspart viewport-demo - The viewport demo container (in isolated demos).
 * @csspart viewport-controls - The viewport demo controls (in isolated demos).
 *
 * @cssproperty --preview-backdrop - The color behind the preview, shown when it is resized
 * @cssproperty --preview-background - The background color of the preview.
 * @cssproperty --preview-padding - The padding used for the preview. Defaults to `var(--wa-space-2xl)`.
 * @cssproperty --preview-resize - The CSS `resize` property value used for the preview. Default: `inline`, for horizontal resizing.
 * @cssproperty --viewport-initial-aspect-ratio - The initial aspect ratio of the viewport, when the `viewport` attribute is used. Defaults to `16 / 9`.
 * @cssproperty --preview-max-width - The maximum width of the preview. Defaults to `100%`.
 * @cssproperty --preview-min-width - The minimum width of the preview. Defaults to `4em`.
 * @cssproperty --divider-width - The width of the divider. Defaults to `var(--wa-border-width-s)`.
 * @cssproperty --code-collapse-duration - The duration of the code collapse animation (for supporting browsers). Defaults to `var(--wa-transition-normal)`.
 *
 */
const reactWrapper = createComponent({
  tagName,
  elementClass: Component,
  react: React,
  events: {},
  displayName: 'WaCodeDemo',
});

export default reactWrapper;
