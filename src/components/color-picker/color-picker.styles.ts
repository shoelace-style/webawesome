import { css } from 'lit';

export default css`
  :host {
    --background-color: var(--wa-color-surface-raised);
    --border-color: var(--wa-color-surface-border);
    --border-radius: var(--wa-form-control-border-radius);
    --border-style: var(--wa-form-control-border-style);
    --border-width: var(--wa-form-control-border-width);
    --grid-width: 17rem;
    --grid-height: 12rem;
    --grid-handle-size: 1.25rem;
    --spacing: var(--wa-space-s);
    --preview-size: 2.25rem;
    --preview-border-radius: var(--wa-border-radius-circle);
    --slider-height: 1rem;
    --slider-handle-size: calc(var(--slider-height) + 0.25rem);
    --swatch-border-radius: var(--wa-border-radius-s);
    --swatch-size: 1.5rem;
    --trigger-border-radius: var(--wa-border-radius-circle);

    display: inline-block;
  }

  .color-picker {
    background-color: var(--background-color);
    border-radius: var(--border-radius);
    color: var(--color);
    font: inherit;
    user-select: none;
    width: var(--grid-width);
    -webkit-user-select: none;
  }

  .color-picker__grid {
    position: relative;
    height: var(--grid-height);
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%),
      linear-gradient(to right, #fff 0%, rgba(255, 255, 255, 0) 100%);
    border-top-left-radius: calc(var(--border-radius) - var(--border-width));
    border-top-right-radius: calc(var(--border-radius) - var(--border-width));
    cursor: crosshair;
    forced-color-adjust: none;
  }

  .color-picker__grid-handle {
    position: absolute;
    width: var(--grid-handle-size);
    height: var(--grid-handle-size);
    border-radius: var(--wa-border-radius-circle);
    box-shadow: 0 0 0 0.0625rem rgba(0, 0, 0, 0.2);
    border: solid 0.125rem white;
    margin-top: calc(var(--grid-handle-size) / -2);
    margin-left: calc(var(--grid-handle-size) / -2);
    transition: scale var(--wa-transition-normal) var(--wa-transition-easing);
  }

  .color-picker__grid-handle--dragging {
    cursor: none;
    scale: 1.5;
  }

  .color-picker__grid-handle:focus-visible {
    outline: var(--wa-focus-ring);
  }

  .color-picker__controls {
    padding: var(--spacing);
    display: flex;
    align-items: center;
  }

  .color-picker__sliders {
    flex: 1 1 auto;
  }

  .color-picker__slider {
    position: relative;
    height: var(--slider-height);
    border-radius: var(--wa-border-radius-xs);
    box-shadow: inset 0 0 0 0.0625rem rgba(0, 0, 0, 0.2);
    forced-color-adjust: none;
  }

  .color-picker__slider:not(:last-of-type) {
    margin-bottom: var(--wa-space-s);
  }

  .color-picker__slider-handle {
    position: absolute;
    top: calc(50% - var(--slider-handle-size) / 2);
    width: var(--slider-handle-size);
    height: var(--slider-handle-size);
    border-radius: var(--wa-border-radius-circle);
    border: solid 0.125rem white;
    box-shadow: 0 0 0 0.0625rem rgba(0, 0, 0, 0.2);
    margin-left: calc(var(--slider-handle-size) / -2);
  }

  .color-picker__slider-handle:focus-visible {
    outline: var(--wa-focus-ring);
  }

  .color-picker__hue {
    background-image: linear-gradient(
      to right,
      rgb(255, 0, 0) 0%,
      rgb(255, 255, 0) 17%,
      rgb(0, 255, 0) 33%,
      rgb(0, 255, 255) 50%,
      rgb(0, 0, 255) 67%,
      rgb(255, 0, 255) 83%,
      rgb(255, 0, 0) 100%
    );
  }

  .color-picker__alpha .color-picker__alpha-gradient {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
  }

  .color-picker__preview {
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: var(--preview-size);
    height: var(--preview-size);
    border: none;
    border-radius: var(--preview-border-radius);
    background: none;
    margin-inline-start: var(--spacing);
    cursor: copy;
    forced-color-adjust: none;
  }

  .color-picker__preview:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    box-shadow: inset 0 0 0 0.0625rem rgba(0, 0, 0, 0.2);

    /* We use a custom property in lieu of currentColor because of https://bugs.webkit.org/show_bug.cgi?id=216780 */
    background-color: var(--preview-color);
  }

  .color-picker__preview:focus-visible {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  .color-picker__preview-color {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: solid 0.0625rem rgba(0, 0, 0, 0.125);
  }

  .color-picker__preview-color--copied {
    animation: pulse 850ms;
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 var(--wa-color-brand-fill-loud);
    }
    70% {
      box-shadow: 0 0 0 0.5rem transparent;
    }
    100% {
      box-shadow: 0 0 0 0 transparent;
    }
  }

  .color-picker__user-input {
    display: flex;
    padding: 0 var(--spacing) var(--spacing) var(--spacing);
  }

  .color-picker__user-input wa-input {
    min-width: 0; /* fix input width in Safari */
    flex: 1 1 auto;
  }

  .color-picker__user-input wa-button-group {
    margin-inline-start: var(--spacing);
  }

  .color-picker__user-input wa-button:first-of-type {
    min-width: 3rem;
    max-width: 3rem;
  }

  .color-picker__swatches {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(var(--swatch-size), 100%), 1fr));
    grid-gap: var(--wa-space-xs);
    justify-items: center;
    border-block-start: var(--wa-form-control-border-style) var(--wa-form-control-border-width)
      var(--wa-color-surface-border);
    padding: var(--spacing);
    forced-color-adjust: none;
  }

  .color-picker__swatch {
    position: relative;
    aspect-ratio: 1 / 1;
    width: 100%;
    border-radius: var(--swatch-border-radius);
  }

  .color-picker__swatch .color-picker__swatch-color {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: solid 0.0625rem rgba(0, 0, 0, 0.125);
    border-radius: inherit;
    cursor: pointer;
  }

  .color-picker__swatch:focus-visible {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  .color-picker__transparent-bg {
    background-image: linear-gradient(45deg, var(--wa-color-neutral-fill-normal) 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, var(--wa-color-neutral-fill-normal) 75%),
      linear-gradient(45deg, transparent 75%, var(--wa-color-neutral-fill-normal) 75%),
      linear-gradient(45deg, var(--wa-color-neutral-fill-normal) 25%, transparent 25%);
    background-size: 0.5rem 0.5rem;
    background-position:
      0 0,
      0 0,
      -0.25rem -0.25rem,
      0.25rem 0.25rem;
  }

  .color-picker--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .color-picker--disabled .color-picker__grid,
  .color-picker--disabled .color-picker__grid-handle,
  .color-picker--disabled .color-picker__slider,
  .color-picker--disabled .color-picker__slider-handle,
  .color-picker--disabled .color-picker__preview,
  .color-picker--disabled .color-picker__swatch,
  .color-picker--disabled .color-picker__swatch-color {
    pointer-events: none;
  }

  /*
   * Color dropdown
   */

  .color-dropdown {
    display: flex;
  }

  .color-dropdown::part(panel) {
    max-height: none;
    background-color: var(--background-color);
    border: var(--border-style) var(--border-width) var(--border-color);
    border-radius: var(--border-radius);
    overflow: visible;
  }

  .color-dropdown__trigger {
    display: block;
    position: relative;
    background-color: transparent;
    border: none;
    cursor: pointer;
    forced-color-adjust: none;
  }

  .color-dropdown__trigger.color-dropdown__trigger--small {
    width: var(--wa-form-control-height-s);
    height: var(--wa-form-control-height-s);
    border-radius: var(--trigger-border-radius);
  }

  .color-dropdown__trigger.color-dropdown__trigger--medium {
    width: var(--wa-form-control-height-m);
    height: var(--wa-form-control-height-m);
    border-radius: var(--trigger-border-radius);
  }

  .color-dropdown__trigger.color-dropdown__trigger--large {
    width: var(--wa-form-control-height-l);
    height: var(--wa-form-control-height-l);
    border-radius: var(--trigger-border-radius);
  }

  .color-dropdown__trigger:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    background-color: currentColor;
    box-shadow:
      inset 0 0 0 0.0625rem var(--wa-form-control-resting-color),
      inset 0 0 0 0.25rem var(--wa-color-surface-default);
  }

  .color-dropdown__trigger--empty:before {
    background-color: transparent;
  }

  .color-dropdown__trigger:focus-visible {
    outline: none;
  }

  .color-dropdown__trigger:focus-visible:not(.color-dropdown__trigger--disabled) {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  :host(:disabled) :is(.color-dropdown__label, .color-dropdown__trigger) {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .form-control.form-control--has-label .form-control__label {
    cursor: pointer;
    display: inline-block;
  }
`;
