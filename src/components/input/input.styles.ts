import { css } from 'lit';

export default css`
  :host {
    --background: var(--wa-form-controls-background);
    --border-color: var(--wa-form-controls-resting-color);
    --border-radius: var(--wa-form-controls-corners);
    --border-style: var(--wa-form-controls-border-style);
    --border-width: var(--wa-form-controls-border-width);
    --box-shadow: var(--wa-shadow-level-0);

    display: block;
  }

  :host([filled]) {
    --background: var(--wa-color-neutral-fill-subtle);
    --border-color: var(--background);
  }

  .input {
    background: var(--background);
    border-color: var(--border-color);
    border-radius: var(--border-radius);
    border-style: var(--border-style);
    border-width: var(--border-width);
    box-shadow: var(--box-shadow);
    flex: 1 1 auto;
    display: inline-flex;
    align-items: stretch;
    justify-content: start;
    position: relative;
    width: 100%;
    font: inherit;
    vertical-align: middle;
    overflow: hidden;
    cursor: text;
    transition:
      var(--wa-transition-fast) background,
      var(--wa-transition-fast) border,
      var(--wa-transition-faster) outline;
  }

  /* Standard inputs */
  .input--standard.input--focused:not(.input--disabled) {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
    border-color: var(--wa-form-controls-activated-color);
  }

  .input--standard.input--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Filled inputs */
  .input--filled.input--focused:not(.input--disabled) {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  .input--filled.input--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input__control {
    flex: 1 1 auto;
    min-width: 0;
    height: 100%;
    font: inherit;
    line-height: var(--wa-form-controls-value-line-height);
    color: var(--wa-form-controls-value-color);
    border: none;
    /* prettier-ignore */
    background: rgb(118 118 118 / 0); /* ensures proper placeholder styles in webkit's date input */
    box-shadow: none;
    padding: 0;
    margin: 0;
    cursor: inherit;
    -webkit-appearance: none;
  }

  .input__control::-webkit-search-decoration,
  .input__control::-webkit-search-cancel-button,
  .input__control::-webkit-search-results-button,
  .input__control::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  .input__control:-webkit-autofill,
  .input__control:-webkit-autofill:hover,
  .input__control:-webkit-autofill:focus,
  .input__control:-webkit-autofill:active {
    box-shadow: none;
    -webkit-text-fill-color: var(--wa-color-brand-text-on-fill);
    caret-color: var(--wa-form-controls-value-color);
  }

  .input--filled .input__control:-webkit-autofill,
  .input--filled .input__control:-webkit-autofill:hover,
  .input--filled .input__control:-webkit-autofill:focus,
  .input--filled .input__control:-webkit-autofill:active {
    box-shadow: none;
  }

  .input__control::placeholder {
    color: var(--wa-form-controls-placeholder-color);
    user-select: none;
    -webkit-user-select: none;
  }

  .input__control:focus {
    outline: none;
  }

  .input__prefix,
  .input__suffix {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    cursor: default;
  }

  .input__prefix ::slotted(wa-icon),
  .input__suffix ::slotted(wa-icon) {
    color: var(--wa-color-neutral-spot);
  }

  /*
   * Size modifiers
   */

  .input--small {
    font-size: var(--wa-font-size-s);
    height: var(--wa-form-controls-height-s);
  }

  .input--small .input__control {
    height: calc(var(--wa-form-controls-height-s) - var(--border-width) * 2);
    padding: 0 var(--wa-space-s);
  }

  .input--small .input__clear,
  .input--small .input__password-toggle {
    width: calc(1em + var(--wa-space-s) * 2);
  }

  .input--small .input__prefix ::slotted(*) {
    margin-inline-start: var(--wa-space-s);
  }

  .input--small .input__suffix ::slotted(*) {
    margin-inline-end: var(--wa-space-s);
  }

  .input--medium {
    font-size: var(--wa-font-size-m);
    height: var(--wa-form-controls-height-m);
  }

  .input--medium .input__control {
    height: calc(var(--wa-form-controls-height-m) - var(--border-width) * 2);
    padding: 0 var(--wa-space-m);
  }

  .input--medium .input__clear,
  .input--medium .input__password-toggle {
    width: calc(1em + var(--wa-space-m) * 2);
  }

  .input--medium .input__prefix ::slotted(*) {
    margin-inline-start: var(--wa-space-m);
  }

  .input--medium .input__suffix ::slotted(*) {
    margin-inline-end: var(--wa-space-m);
  }

  .input--large {
    font-size: var(--wa-font-size-l);
    height: var(--wa-form-controls-height-l);
  }

  .input--large .input__control {
    height: calc(var(--wa-form-controls-height-l) - var(--border-width) * 2);
    padding: 0 var(--wa-space-l);
  }

  .input--large .input__clear,
  .input--large .input__password-toggle {
    width: calc(1em + var(--wa-space-l) * 2);
  }

  .input--large .input__prefix ::slotted(*) {
    margin-inline-start: var(--wa-space-l);
  }

  .input--large .input__suffix ::slotted(*) {
    margin-inline-end: var(--wa-space-l);
  }

  /*
   * Pill modifier
   */

  .input--pill.input--small {
    border-radius: var(--wa-corners-pill);
  }

  .input--pill.input--medium {
    border-radius: var(--wa-corners-pill);
  }

  .input--pill.input--large {
    border-radius: var(--wa-corners-pill);
  }

  /*
   * Clearable + Password Toggle
   */

  .input__clear:not(.input__clear--visible) {
    visibility: hidden;
  }

  .input__clear,
  .input__password-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: inherit;
    color: var(--wa-color-neutral-spot);
    border: none;
    background: none;
    padding: 0;
    transition: var(--wa-transition-fast) color;
    cursor: pointer;
  }

  .input__clear:active,
  .input__password-toggle:active {
    color: color-mix(in oklab, var(--wa-color-neutral-spot), var(--wa-color-mix-active));
  }

  .input__clear:focus,
  .input__password-toggle:focus {
    outline: none;
  }

  .input--empty .input__clear {
    visibility: hidden;
  }

  /* Don't show the browser's password toggle in Edge */
  ::-ms-reveal {
    display: none;
  }

  /* Hide the built-in number spinner */
  .input--no-spin-buttons input[type='number']::-webkit-outer-spin-button,
  .input--no-spin-buttons input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    display: none;
  }

  .input--no-spin-buttons input[type='number'] {
    -moz-appearance: textfield;
  }
`;
