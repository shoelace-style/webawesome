import { createComponent } from '@lit/react';
import * as React from 'react';
import Component from '../../components/radio-group/radio-group.js';

import { type EventName } from '@lit/react';
import type { WaInvalidEvent } from '../../events/events.js';
export type { WaInvalidEvent } from '../../events/events.js';

const tagName = 'wa-radio-group';

/**
 * @summary Radio groups are used to group multiple [radios](/docs/components/radio) so they function as a single form control.
 * @documentation https://backers.webawesome.com/docs/components/radio-group
 * @status stable
 * @since 2.0
 *
 * @dependency wa-radio
 *
 * @slot - The default slot where `<wa-radio>` elements are placed.
 * @slot label - The radio group's label. Required for proper accessibility. Alternatively, you can use the `label`
 *  attribute.
 * @slot hint - Text that describes how to use the radio group. Alternatively, you can use the `hint` attribute.
 *
 * @event change - Emitted when the radio group's selected value changes.
 * @event input - Emitted when the radio group receives user input.
 * @event wa-invalid - Emitted when the form control has been checked for validity and its constraints aren't satisfied.
 *
 * @csspart form-control - The form control that wraps the label, input, and hint.
 * @csspart form-control-label - The label's wrapper.
 * @csspart form-control-input - The input's wrapper.
 * @csspart radios - The wrapper than surrounds radio items, styled as a flex container by default.
 * @csspart hint - The hint's wrapper.
 */
const reactWrapper = createComponent({
  tagName,
  elementClass: Component,
  react: React,
  events: {
    onWaInvalid: 'wa-invalid' as EventName<WaInvalidEvent>,
  },
  displayName: 'WaRadioGroup',
});

export default reactWrapper;
