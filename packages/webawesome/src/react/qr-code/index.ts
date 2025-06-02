import { createComponent } from '@lit/react';
import * as React from 'react';
import Component from '../../components/qr-code/qr-code.js';

const tagName = 'wa-qr-code';

/**
 * @summary Generates a [QR code](https://www.qrcode.com/) and renders it using the [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API).
 * @documentation https://backers.webawesome.com/docs/components/qr-code
 * @status stable
 * @since 2.0
 *
 * @csspart base - The component's base wrapper.
 */
const reactWrapper = createComponent({
  tagName,
  elementClass: Component,
  react: React,
  events: {},
  displayName: 'WaQrCode',
});

export default reactWrapper;
