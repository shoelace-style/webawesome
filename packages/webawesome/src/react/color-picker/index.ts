import { createComponent } from '@lit/react';
import * as React from 'react';
import Component from '../../components/color-picker/color-picker.js';

import { type EventName } from '@lit/react';
import type { WaInvalidEvent } from '../../events/events.js';
export type { WaInvalidEvent } from '../../events/events.js';

const tagName = 'wa-color-picker';

/**
 * @summary Color pickers allow the user to select a color.
 * @documentation https://backers.webawesome.com/docs/components/color-picker
 * @status stable
 * @since 2.0
 *
 * @dependency wa-button
 * @dependency wa-button-group
 * @dependency wa-dropdown
 * @dependency wa-input
 * @dependency wa-visually-hidden
 *
 * @slot label - The color picker's form label. Alternatively, you can use the `label` attribute.
 * @slot hint - The color picker's form hint. Alternatively, you can use the `hint` attribute.
 *
 * @event blur - Emitted when the color picker loses focus.
 * @event change - Emitted when the color picker's value changes.
 * @event focus - Emitted when the color picker receives focus.
 * @event input - Emitted when the color picker receives input.
 * @event wa-invalid - Emitted when the form control has been checked for validity and its constraints aren't satisfied.
 *
 * @csspart base - The component's base wrapper.
 * @csspart trigger - The color picker's dropdown trigger.
 * @csspart swatches - The container that holds the swatches.
 * @csspart swatch - Each individual swatch.
 * @csspart grid - The color grid.
 * @csspart grid-handle - The color grid's handle.
 * @csspart slider - Hue and opacity sliders.
 * @csspart slider-handle - Hue and opacity slider handles.
 * @csspart hue-slider - The hue slider.
 * @csspart hue-slider-handle - The hue slider's handle.
 * @csspart opacity-slider - The opacity slider.
 * @csspart opacity-slider-handle - The opacity slider's handle.
 * @csspart preview - The preview color.
 * @csspart input - The text input.
 * @csspart eye-dropper-button - The eye dropper button.
 * @csspart eye-dropper-button__base - The eye dropper button's exported `button` part.
 * @csspart eye-dropper-button__prefix - The eye dropper button's exported `prefix` part.
 * @csspart eye-dropper-button__label - The eye dropper button's exported `label` part.
 * @csspart eye-dropper-button__suffix - The eye dropper button's exported `suffix` part.
 * @csspart eye-dropper-button__caret - The eye dropper button's exported `caret` part.
 * @csspart format-button - The format button.
 * @csspart format-button__base - The format button's exported `button` part.
 * @csspart format-button__prefix - The format button's exported `prefix` part.
 * @csspart format-button__label - The format button's exported `label` part.
 * @csspart format-button__suffix - The format button's exported `suffix` part.
 * @csspart format-button__caret - The format button's exported `caret` part.
 *
 * @cssproperty --background-color - The color picker's background color.
 * @cssproperty --border-color - The color of the color picker's borders.
 * @cssproperty --border-radius - The radius of the color picker's corners.
 * @cssproperty --border-style - The style of the color picker's borders.
 * @cssproperty --border-width - The width of the color picker's borders.
 * @cssproperty --grid-width - The width of the color grid.
 * @cssproperty --grid-height - The height of the color grid.
 * @cssproperty --grid-handle-size - The size of the color grid's handle.
 * @cssproperty --preview-size - The size of the preview color.
 * @cssproperty --preview-border-radius - The corners of the preview color.
 * @cssproperty --slider-height - The height of the hue and alpha sliders.
 * @cssproperty --slider-handle-size - The diameter of the slider's handle.
 * @cssproperty --spacing - The amount of space around and between the color picker's controls.
 * @cssproperty --swatch-border-radius - The corners of each predefined color swatch.
 * @cssproperty --swatch-size - The size of each predefined color swatch.
 * @cssproperty --trigger-border-radius - The corners of the color picker's dropdown trigger.
 */
const reactWrapper = createComponent({
  tagName,
  elementClass: Component,
  react: React,
  events: {
    onWaInvalid: 'wa-invalid' as EventName<WaInvalidEvent>,
  },
  displayName: 'WaColorPicker',
});

export default reactWrapper;
