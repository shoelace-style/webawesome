import { css } from 'lit';
import componentStyles from '../../styles/component.styles.js';

export default css`
  ${componentStyles}

  :host {
    --border-radius: var(--wa-form-controls-corners);
    --border-style: var(--wa-border-style);
    --border-width: var(--wa-form-controls-border-width);
    --box-shadow: var(--wa-shadow-level-0);
    --box-shadow-color: var(--wa-color-shadow);

    display: inline-block;
    position: relative;
    width: auto;
    cursor: pointer;
  }

  /*
   * Standard buttons
   */

  :host([variant='brand']) {
    --background: var(--wa-color-brand-spot);
    --label-color: var(--wa-color-brand-text-on-spot);
  }

  :host([variant='success']) {
    --background: var(--wa-color-success-spot);
    --label-color: var(--wa-color-success-text-on-spot);
  }

  :host([variant='warning']) {
    --background: var(--wa-color-warning-spot);
    --label-color: var(--wa-color-warning-text-on-spot);
  }

  :host([variant='neutral']) {
    --background: var(--wa-color-neutral-spot);
    --label-color: var(--wa-color-neutral-text-on-spot);
  }

  :host([variant='danger']) {
    --background: var(--wa-color-danger-spot);
    --label-color: var(--wa-color-danger-text-on-spot);
  }

  :host(:not([variant='text'])) {
    --background-hover: color-mix(in oklab, var(--background), var(--wa-color-mix-hover));
    --background-active: color-mix(in oklab, var(--background), var(--wa-color-mix-active));
    --border-color: var(--background);
    --border-color-hover: var(--background-hover);
    --border-color-active: var(--background-active);
    --label-color-hover: var(--label-color);
    --label-color-active: var(--label-color);
  }

  /*
   * Outline buttons
   */

  :host([variant='brand'][outline]) {
    --background-hover: var(--wa-color-brand-fill-subtle);
    --label-color: var(--wa-color-brand-text-on-surface);
    --label-color-hover: var(--wa-color-brand-text-on-fill);
  }

  :host([variant='success'][outline]) {
    --background-hover: var(--wa-color-success-fill-subtle);
    --label-color: var(--wa-color-success-text-on-surface);
    --label-color-hover: var(--wa-color-success-text-on-fill);
  }

  :host([variant='neutral'][outline]),
  :host(.wa-button-group__button--radio:not([checked])) {
    --background-hover: var(--wa-color-neutral-fill-subtle);
    --label-color: var(--wa-color-neutral-text-on-surface);
    --label-color-hover: var(--wa-color-neutral-text-on-fill);
  }

  :host([variant='warning'][outline]) {
    --background-hover: var(--wa-color-warning-fill-subtle);
    --label-color: var(--wa-color-warning-text-on-surface);
    --label-color-hover: var(--wa-color-warning-text-on-fill);
  }

  :host([variant='danger'][outline]) {
    --background-hover: var(--wa-color-danger-fill-subtle);
    --label-color: var(--wa-color-danger-text-on-surface);
    --label-color-hover: var(--wa-color-danger-text-on-fill);
  }

  :host([outline]),
  :host(.wa-button-group__button--radio:not([checked])) {
    --background-active: color-mix(in oklab, var(--background-hover), var(--wa-color-surface-default) 30%);
    --border-color: var(--label-color);
    --border-color-hover: var(--border-color);
    --border-color-active: var(--border-color);
    --label-color-active: var(--label-color-hover);
  }

  /*
   * Text buttons
   */

  :host([variant='text']) {
    --background: none;
    --background-active: none;
    --background-hover: none;
    --border-color: transparent;
    --border-color-active: transparent;
    --border-color-hover: transparent;
    --label-color: var(--wa-color-text-link);
    --label-color-active: var(--wa-color-text-link);
    --label-color-hover: color-mix(in oklab, var(--wa-color-text-link), var(--wa-color-mix-hover));
  }

  /*
   * Checked buttons
   */

  :host([checked]) {
    --background: var(--wa-color-brand-spot);
    --label-color: var(--wa-color-brand-text-on-spot);
  }

  /* 
   * Sizes
   */

  :host([size='small']) {
    font-size: var(--wa-font-size-s);
  }

  :host([size='medium']) {
    font-size: var(--wa-font-size-m);
  }

  :host([size='large']) {
    font-size: var(--wa-font-size-l);
  }

  /*
   * Internal
   */

  .button {
    border-radius: var(--border-radius);
    border-style: var(--border-style);
    border-width: max(1px, var(--border-width));
    color: var(--label-color);
    display: inline-flex;
    align-items: stretch;
    justify-content: center;
    width: 100%;
    font: inherit;
    font-weight: var(--wa-font-weight-action);
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    white-space: nowrap;
    vertical-align: middle;
    padding: 0;
    transition:
      var(--wa-transition-faster) background,
      var(--wa-transition-faster) border,
      var(--wa-transition-faster) box-shadow,
      var(--wa-transition-faster) color;
    cursor: inherit;
  }

  .button--standard,
  .button--checked {
    background: var(--background);
    border-color: var(--border-color);
    box-shadow: var(--box-shadow);
  }

  .button--outline:not(.button--checked) {
    background: none;
    border-color: var(--border-color);
    box-shadow: var(--box-shadow);
  }

  .button--text {
    background: none;
    border-color: transparent;
    box-shadow: none;
  }

  /*
   * States
   */

  .button::-moz-focus-inner {
    border: 0;
  }

  .button:focus {
    outline: none;
  }

  .button:focus-visible {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  .button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* When disabled, prevent mouse events from bubbling up from children */
  .button--disabled * {
    pointer-events: none;
  }

  .button:hover:not(.button--disabled) {
    background: var(--background-hover, var(--background, none));
    border-color: var(--border-color-hover, var(--border-color, transparent));
    color: var(--label-color-hover, var(--label-color));
  }

  .button:active:not(.button--disabled) {
    background: var(--background-active, var(--background, none));
    border-color: var(--border-color-active, var(--border-color, transparent));
    color: var(--label-color-active, var(--label-color));
  }

  @media (forced-colors: active) {
    .button.button--outline.button--checked:not(.button--disabled) {
      outline: solid 2px transparent;
    }
  }

  /*
   * Label
   */

  .button__prefix,
  .button__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    pointer-events: none;
  }

  .button__label {
    display: inline-block;
  }

  .button__label::slotted(wa-icon) {
    vertical-align: -2px;
  }

  /*
   * Size modifiers
   */

  .button--small {
    height: var(--wa-form-controls-height-s);
    line-height: calc(var(--wa-form-controls-height-s) - var(--border-width) * 2);
  }

  .button--medium {
    height: var(--wa-form-controls-height-m);
    line-height: calc(var(--wa-form-controls-height-m) - var(--border-width) * 2);
  }

  .button--large {
    height: var(--wa-form-controls-height-l);
    line-height: calc(var(--wa-form-controls-height-l) - var(--border-width) * 2);
  }

  /*
   * Pill modifier
   */

  .button--pill.button--small {
    border-radius: var(--wa-corners-pill);
  }

  .button--pill.button--medium {
    border-radius: var(--wa-corners-pill);
  }

  .button--pill.button--large {
    border-radius: var(--wa-corners-pill);
  }

  /*
   * Caret modifier
   */

  .button--caret .button__suffix {
    display: none;
  }

  .button--caret .button__caret {
    height: auto;
  }

  /*
   * Loading modifier
   */

  .button--loading {
    position: relative;
    cursor: wait;
  }

  .button--loading .button__prefix,
  .button--loading .button__label,
  .button--loading .button__suffix,
  .button--loading .button__caret {
    visibility: hidden;
  }

  .button--loading wa-spinner {
    --indicator-color: currentColor;
    --track-color: color-mix(in oklab, currentColor, transparent 90%);
    position: absolute;
    font-size: 1em;
    height: 1em;
    width: 1em;
    top: calc(50% - 0.5em);
    left: calc(50% - 0.5em);
  }

  /*
   * Badges
   */

  .button ::slotted(wa-badge) {
    position: absolute;
    top: 0;
    right: 0;
    translate: 50% -50%;
    pointer-events: none;
  }

  .button--rtl ::slotted(wa-badge) {
    right: auto;
    left: 0;
    translate: -50% -50%;
  }

  /*
   * Button spacing
   */

  .button--has-label.button--small .button__label {
    padding: 0 var(--wa-space-s);
  }

  .button--has-label.button--medium .button__label {
    padding: 0 var(--wa-space-m);
  }

  .button--has-label.button--large .button__label {
    padding: 0 var(--wa-space-l);
  }

  .button--has-prefix.button--small {
    padding-inline-start: var(--wa-space-xs);
  }

  .button--has-prefix.button--small .button__label {
    padding-inline-start: var(--wa-space-xs);
  }

  .button--has-prefix.button--medium {
    padding-inline-start: var(--wa-space-s);
  }

  .button--has-prefix.button--medium .button__label {
    padding-inline-start: var(--wa-space-s);
  }

  .button--has-prefix.button--large {
    padding-inline-start: var(--wa-space-m);
  }

  .button--has-prefix.button--large .button__label {
    padding-inline-start: var(--wa-space-m);
  }

  .button--has-suffix.button--small,
  .button--caret.button--small {
    padding-inline-end: var(--wa-space-xs);
  }

  .button--has-suffix.button--small .button__label,
  .button--caret.button--small .button__label {
    padding-inline-end: var(--wa-space-xs);
  }

  .button--has-suffix.button--medium,
  .button--caret.button--medium {
    padding-inline-end: var(--wa-space-s);
  }

  .button--has-suffix.button--medium .button__label,
  .button--caret.button--medium .button__label {
    padding-inline-end: var(--wa-space-s);
  }

  .button--has-suffix.button--large,
  .button--caret.button--large {
    padding-inline-end: var(--wa-space-m);
  }

  .button--has-suffix.button--large .button__label,
  .button--caret.button--large .button__label {
    padding-inline-end: var(--wa-space-m);
  }

  /*
   * Button groups support a variety of button types (e.g. buttons with tooltips, buttons as dropdown triggers, etc.).
   * This means buttons aren't always direct descendants of the button group, thus we can't target them with the
   * ::slotted selector. To work around this, the button group component does some magic to add these special classes to
   * buttons and we style them here instead.
   */

  :host(.wa-button-group__button--first:not(.wa-button-group__button--last)) .button {
    border-start-end-radius: 0;
    border-end-end-radius: 0;
  }

  :host(.wa-button-group__button--inner) .button {
    border-radius: 0;
  }

  :host(.wa-button-group__button--last:not(.wa-button-group__button--first)) .button {
    border-start-start-radius: 0;
    border-end-start-radius: 0;
  }

  /* All except the first */
  :host(.wa-button-group__button:not(.wa-button-group__button--first)) {
    margin-inline-start: calc(-1 * var(--wa-border-width-thin));
  }

  /* Add a visual separator between solid buttons */
  :host(.wa-button-group__button:not(.wa-button-group__button--first, .wa-button-group__button--radio):not(:hover))
    .button:after {
    content: '';
    position: absolute;
    top: 0;
    inset-inline-start: 0;
    bottom: 0;
    border-left: solid 1px rgb(0 0 0 / 0.2);
    mix-blend-mode: multiply;
  }

  /* Bump hovered, focused, and checked buttons up so their focus ring isn't clipped */
  :host(.wa-button-group__button--hover) {
    z-index: 1;
  }

  /* Focus and checked are always on top */
  :host(.wa-button-group__button--focus),
  :host(.wa-button-group__button[checked]) {
    z-index: 2;
  }
`;
