import { css } from 'lit';

export default css`
  :host {
    --background-color: var(--wa-form-control-background-color);
    --border-color: var(--wa-form-control-resting-color);
    --border-radius: var(--wa-form-control-border-radius);
    --border-style: var(--wa-form-control-border-style);
    --border-width: var(--wa-form-control-border-width);
    --box-shadow: initial;

    display: block;
  }

  :host([filled]) {
    --background-color: var(--wa-color-neutral-fill-quiet);
    --border-color: var(--background-color);
  }

  /** The popup */
  .select {
    flex: 1 1 auto;
    display: inline-flex;
    width: 100%;
    position: relative;
    vertical-align: middle;
  }

  .select::part(popup) {
    z-index: 900;
  }

  .select[data-current-placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .select[data-current-placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  /* Combobox */
  .select__combobox {
    background-color: var(--background-color);
    border-color: var(--border-color);
    border-radius: var(--border-radius);
    border-style: var(--border-style);
    border-width: var(--border-width);
    box-shadow: var(--box-shadow);
    flex: 1;
    display: flex;
    width: 100%;
    min-width: 0;
    position: relative;
    align-items: center;
    justify-content: start;
    font: inherit;
    vertical-align: middle;
    overflow: hidden;
    cursor: pointer;
    transition:
      background var(--wa-transition-normal) var(--wa-transition-easing),
      border var(--wa-transition-normal) var(--wa-transition-easing),
      box-shadow var(--wa-transition-normal) var(--wa-transition-easing),
      color var(--wa-transition-normal) var(--wa-transition-easing),
      outline var(--wa-transition-fast) var(--wa-transition-easing);
  }

  .select__display-input {
    position: relative;
    width: 100%;
    font: inherit;
    border: none;
    background: none;
    line-height: var(--wa-form-control-value-line-height);
    color: var(--wa-form-control-value-color);
    cursor: inherit;
    overflow: hidden;
    padding: 0;
    margin: 0;
    -webkit-appearance: none;
  }

  .select__display-input:focus {
    outline: none;
  }

  .select__display-input::placeholder {
    color: var(--wa-form-controls-placeholder-color);
  }

  /* Visually hide the display input when multiple is enabled */
  .select--multiple:not(.select--placeholder-visible) .select__display-input {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }

  .select__value-input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    opacity: 0;
    z-index: -1;
  }

  .select__tags {
    display: flex;
    flex: 1;
    align-items: center;
    flex-wrap: wrap;
    margin-inline-start: var(--wa-space-2xs);
  }

  .select__tags::slotted(wa-tag) {
    cursor: pointer !important;
  }

  .select--disabled .select__tags,
  .select--disabled .select__tags::slotted(wa-tag) {
    cursor: not-allowed !important;
  }

  /* Standard selects */
  .select--standard.select--disabled .select__combobox {
    opacity: 0.5;
    cursor: not-allowed;
    outline: none;
  }

  .select--standard:not(.select--disabled).select--open .select__combobox,
  .select--standard:not(.select--disabled).select--focused .select__combobox {
    border-color: var(--wa-form-control-activated-color);
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  /* Filled selects */
  .select--filled.select--disabled .select__combobox {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Sizes */
  .select--small .select__combobox {
    font-size: var(--wa-font-size-s);
    min-height: var(--wa-form-control-height-s);
    padding-block: 0;
    padding-inline: var(--wa-space-s);
  }

  .select--small .select__clear {
    margin-inline-start: var(--wa-space-s);
  }

  .select--small .select__prefix::slotted(*) {
    margin-inline-end: var(--wa-space-s);
  }

  .select--small.select--multiple:not(.select--placeholder-visible) .select__prefix::slotted(*) {
    margin-inline-start: var(--wa-space-s);
  }

  .select--small.select--multiple:not(.select--placeholder-visible) .select__combobox {
    padding-block: 2px;
    padding-inline-start: 0;
  }

  .select--small .select__tags {
    gap: 2px;
  }

  .select--medium .select__combobox {
    font-size: var(--wa-font-size-m);
    min-height: var(--wa-form-control-height-m);
    padding-block: 0;
    padding-inline: var(--wa-space-m);
  }

  .select--medium .select__clear {
    margin-inline-start: var(--wa-space-m);
  }

  .select--medium .select__prefix::slotted(*) {
    margin-inline-end: var(--wa-space-m);
  }

  .select--medium.select--multiple:not(.select--placeholder-visible) .select__prefix::slotted(*) {
    margin-inline-start: var(--wa-space-m);
  }

  .select--medium.select--multiple:not(.select--placeholder-visible) .select__combobox {
    padding-inline-start: 0;
    padding-block: 3px;
  }

  .select--medium .select__tags {
    gap: 3px;
  }

  .select--large .select__combobox {
    font-size: var(--wa-font-size-l);
    min-height: var(--wa-form-control-height-l);
    padding-block: 0;
    padding-inline: var(--wa-space-l);
  }

  .select--large .select__clear {
    margin-inline-start: var(--wa-space-l);
  }

  .select--large .select__prefix::slotted(*) {
    margin-inline-end: var(--wa-space-l);
  }

  .select--large.select--multiple:not(.select--placeholder-visible) .select__prefix::slotted(*) {
    margin-inline-start: var(--wa-space-l);
  }

  .select--large.select--multiple:not(.select--placeholder-visible) .select__combobox {
    padding-inline-start: 0;
    padding-block: 4px;
  }

  .select--large .select__tags {
    gap: 4px;
  }

  /* Pills */
  .select--pill.select--small .select__combobox {
    border-radius: var(--wa-border-radius-pill);
  }

  .select--pill.select--medium .select__combobox {
    border-radius: var(--wa-border-radius-pill);
  }

  .select--pill.select--large .select__combobox {
    border-radius: var(--wa-border-radius-pill);
  }

  /* Prefix and Suffix */
  .select__prefix,
  .select__suffix {
    flex: 0;
    display: inline-flex;
    align-items: center;
    color: var(--wa-color-neutral-on-quiet);
  }

  .select__suffix::slotted(*) {
    margin-inline-start: var(--wa-space-sm);
  }

  /* Clear button */
  .select__clear {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: inherit;
    color: var(--wa-color-neutral-on-quiet);
    border: none;
    background: none;
    padding: 0;
    transition: color var(--wa-transition-normal);
    cursor: pointer;
  }

  .select__clear:focus {
    outline: none;
  }

  .select__clear:hover {
    color: color-mix(in oklab, currentColor, var(--wa-color-mix-hover));
  }

  .select__clear:active {
    color: color-mix(in oklab, currentColor, var(--wa-color-mix-active));
  }

  /* Expand icon */
  .select__expand-icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    color: var(--wa-color-neutral-on-quiet);
    transition: rotate var(--wa-transition-slow) ease;
    rotate: 0;
    margin-inline-start: var(--wa-space-s);
  }

  .select--open .select__expand-icon {
    rotate: -180deg;
  }

  /* Listbox */
  .select__listbox {
    display: block;
    position: relative;
    font: inherit;
    box-shadow: var(--wa-shadow-m);
    background: var(--wa-color-surface-raised);
    border-color: var(--wa-color-surface-border);
    border-radius: var(--wa-border-radius-s);
    border-style: var(--border-style);
    border-width: var(--border-width);
    padding-block: var(--wa-space-xs);
    padding-inline: 0;
    overflow: auto;
    overscroll-behavior: none;

    /* Make sure it adheres to the popup's auto size */
    max-width: var(--auto-size-available-width);
    max-height: var(--auto-size-available-height);
  }

  .select__listbox ::slotted(wa-divider) {
    --spacing: var(--wa-space-xs);
  }

  .select__listbox ::slotted(small) {
    display: block;
    font-size: var(--wa-font-size-s);
    font-weight: var(--wa-font-weight-semibold);
    color: var(--wa-color-text-quiet);
    padding-block: var(--wa-space-xs);
    padding-inline: var(--wa-space-xl);
  }
`;
