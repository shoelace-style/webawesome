import { css } from 'lit';
import componentStyles from '../../styles/component.styles.js';
import formControlStyles from '../../styles/form-control.styles.js';

export default css`
  ${componentStyles}
  ${formControlStyles}

  :host {
    --background: var(--wa-form-controls-background);
    --border-color: var(--wa-form-controls-border-color-resting);
    --border-radius: var(--wa-form-controls-corners);
    --border-style: var(--wa-form-controls-border-style);
    --border-width: var(--wa-form-controls-border-width);
    --box-shadow: var(--wa-shadow-level-0);

    display: block;
  }

  :host([filled]) {
    --background: var(--wa-color-neutral-fill-muted);
    --border-color: var(--background);
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
    z-index: var(--wa-z-index-dropdown);
  }

  .select[data-current-placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .select[data-current-placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  /* Combobox */
  .select__combobox {
    background: var(--background);
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
      var(--wa-transition-fast) background,
      var(--wa-transition-fast) border,
      var(--wa-transition-fast) box-shadow,
      var(--wa-transition-fast) color,
      var(--wa-transition-faster) outline;
  }

  .select__display-input {
    position: relative;
    width: 100%;
    font: inherit;
    border: none;
    background: none;
    line-height: var(--wa-form-controls-value-line-height);
    color: var(--wa-form-controls-text-color);
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
    color: var(--sl-input-placeholder-color);
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
    min-height: var(--wa-form-controls-height-s);
    padding-block: 0;
    padding-inline: var(--wa-space-s);
  }

  .select--small .select__clear {
    margin-inline-start: var(--wa-space-s);
  }

  .select--small .select__prefix::slotted(*) {
    margin-inline-end: var(--wa-space-s);
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
    min-height: var(--wa-form-controls-height-m);
    padding-block: 0;
    padding-inline: var(--wa-space-m);
  }

  .select--medium .select__clear {
    margin-inline-start: var(--wa-space-m);
  }

  .select--medium .select__prefix::slotted(*) {
    margin-inline-end: var(--wa-space-m);
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
    min-height: var(--wa-form-controls-height-l);
    padding-block: 0;
    padding-inline: var(--wa-space-l);
  }

  .select--large .select__clear {
    margin-inline-start: var(--wa-space-l);
  }

  .select--large .select__prefix::slotted(*) {
    margin-inline-end: var(--wa-space-l);
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
    border-radius: var(--wa-corners-pill);
  }

  .select--pill.select--medium .select__combobox {
    border-radius: var(--wa-corners-pill);
  }

  .select--pill.select--large .select__combobox {
    border-radius: var(--wa-corners-pill);
  }

  /* Prefix */
  .select__prefix {
    flex: 0;
    display: inline-flex;
    align-items: center;
    color: var(--wa-color-neutral-fill-vivid);
  }

  /* Clear button */
  .select__clear {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: inherit;
    color: var(--wa-color-neutral-fill-vivid);
    border: none;
    background: none;
    padding: 0;
    transition: color var(--wa-transition-fast);
    cursor: pointer;
  }

  .select__clear:focus {
    outline: none;
  }

  .select__clear:active {
    color: color-mix(in oklab, var(--wa-color-neutral-fill-vivid), var(--wa-color-tint-active));
  }

  /* Expand icon */
  .select__expand-icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    transition: rotate var(--wa-transition-normal) ease;
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
    box-shadow: var(--wa-shadow-level-2);
    background: var(--wa-color-surface-raised);
    border-color: var(--border-color);
    border-radius: var(--wa-corners-1x);
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
    font-size: var(--wa-font-size-s);
    font-weight: var(--wa-font-weight-medium);
    color: var(--wa-color-text-quiet);
    padding-block: var(--wa-space-xs);
    padding-inline: var(--wa-space-xl);
  }
`;
