import { css } from 'lit';
import componentStyles from '../../styles/component.styles.js';

export default css`
  ${componentStyles}

  :host {
    display: inline-block;
    position: relative;
    width: auto;
    cursor: pointer;
  }

  .button {
    background: var(--button-background);
    border-color: var(--button-border-color, var(--button-background));
    border-style: var(--button-border-style, var(--wa-border-style));
    border-width: var(--button-border-width, var(--wa-form-controls-border-width));
    color: var(--button-label-color);

    display: inline-flex;
    align-items: stretch;
    justify-content: center;
    width: 100%;
    /* border: none; */
    font: inherit;
    font-weight: var(--wa-font-weight-action);
    text-decoration: none;
    user-select: none;
    white-space: nowrap;
    vertical-align: middle;
    padding: 0;
    transition: var(--wa-transition-faster) background-color, var(--wa-transition-faster) color,
      var(--wa-transition-faster) border, var(--wa-transition-faster) box-shadow;
    cursor: inherit;
  }

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

  .button--brand:focus-visible {
    outline-color: var(--wa-color-brand-fill-vivid);
  }

  .button--success:focus-visible {
    outline-color: var(--wa-color-success-fill-vivid);
  }

  .button--neutral:focus-visible {
    outline-color: var(--wa-color-neutral-fill-vivid);
  }

  .button--warning:focus-visible {
    outline-color: var(--wa-color-warning-fill-vivid);
  }

  .button--danger:focus-visible {
    outline-color: var(--wa-color-danger-fill-vivid);
  }

  .button:hover:not(.button--disabled) {
    background: var(--button-background-hover, var(--button-background));
    border-color: var(--button-border-color-hover, var(--button-border-color, var(--button-background-hover)));
    color: var(--button-label-color-hover, var(--button-label-color));
  }

  .button:active:not(.button--disabled) {
    background: var(--button-background-active, var(--button-background));
    border-color: var(--button-border-color-active, var(--button-border-color, var(--button-background-active)));
    color: var(--button-label-color-active, var(--button-label-color));
  }

  .button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* When disabled, prevent mouse events from bubbling up from children */
  .button--disabled * {
    pointer-events: none;
  }

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
   * Standard buttons
   */
  .button--standard:hover:not(.button--disabled) {
    --button-background-hover: color-mix(in oklab, var(--button-background), var(--wa-color-tint-hover));
  }

  .button--standard:active:not(.button--disabled) {
    --button-background-active: color-mix(in oklab, var(--button-background), var(--wa-color-tint-active));
  }

  /* Brand */
  .button--standard.button--brand {
    --button-background: var(--wa-color-brand-fill-vivid);
    --button-label-color: var(--wa-color-brand-text-on-vivid);
  }

  /* Success */
  .button--standard.button--success {
    --button-background: var(--wa-color-success-fill-vivid);
    --button-label-color: var(--wa-color-success-text-on-vivid);
  }

  /* Neutral */
  .button--standard.button--neutral {
    --button-background: var(--wa-color-neutral-fill-vivid);
    --button-label-color: var(--wa-color-neutral-text-on-vivid);
  }

  /* Warning */
  .button--standard.button--warning {
    --button-background: var(--wa-color-warning-fill-vivid);
    --button-label-color: var(--wa-color-warning-text-on-vivid);
  }

  /* Danger */
  .button--standard.button--danger {
    --button-background: var(--wa-color-danger-fill-vivid);
    --button-label-color: var(--wa-color-danger-text-on-vivid);
  }

  /*
   * Outline buttons
   */

  .button--outline {
    --button-background: none;
    --button-border-style: var(--wa-border-style);
    --button-border-width: max(1px, var(--wa-form-controls-border-width));
  }

  .button--outline:hover:not(.button--disabled),
  .button--outline.button--checked:not(.button--disabled) {
    --button-background-hover: color-mix(in oklab, var(--button-border-color), var(--wa-color-tint-hover));
    --button-border-color-hover: color-mix(in oklab, var(--button-border-color), var(--wa-color-tint-hover));
    --button-label-color-hover: var(--wa-color-brand-text-on-vivid);
  }

  .button--outline:active:not(.button--disabled) {
    --button-background-active: color-mix(in oklab, var(--button-border-color), var(--wa-color-tint-active));
    --button-border-color-active: color-mix(in oklab, var(--button-border-color), var(--wa-color-tint-active));
    --button-label-color-active: var(--wa-color-brand-text-on-vivid);
  }

  /* Brand */
  .button--outline.button--brand {
    --button-border-color: var(--wa-color-brand-outline-vivid);
    --button-label-color: var(--wa-color-brand-text-on-surface);
  }

  /* Success */
  .button--outline.button--success {
    --button-border-color: var(--wa-color-success-outline-vivid);
    --button-label-color: var(--wa-color-success-text-on-surface);
  }

  /* Neutral */
  .button--outline.button--neutral {
    --button-border-color: var(--wa-color-neutral-outline-vivid);
    --button-label-color: var(--wa-color-neutral-text-on-surface);
  }

  /* Warning */
  .button--outline.button--warning {
    --button-border-color: var(--wa-color-warning-outline-vivid);
    --button-label-color: var(--wa-color-warning-text-on-surface);
  }

  /* Danger */
  .button--outline.button--danger {
    --button-border-color: var(--wa-color-danger-outline-vivid);
    --button-label-color: var(--wa-color-danger-text-on-surface);
  }

  @media (forced-colors: active) {
    .button.button--outline.button--checked:not(.button--disabled) {
      outline: solid 2px transparent;
    }
  }

  /*
   * Text buttons
   */

  .button--text {
    --button-background: none;
    --button-border-color: transparent;
    --button-label-color: var(--wa-color-text-link);
  }

  .button--text:hover:not(.button--disabled) {
    --button-label-color: color-mix(in oklab, var(--wa-color-text-link), var(--wa-color-tint-hover));
  }

  .button--text:focus-visible:not(.button--disabled),
  .button--text:active:not(.button--disabled) {
    --button-label-color: var(--wa-color-text-link);
  }

  /*
   * Size modifiers
   */

  .button--small {
    height: var(--wa-form-controls-height-s);
    font-size: var(--wa-font-size-s);
    line-height: var(--wa-form-controls-height-s);
    border-radius: var(--wa-form-controls-corners);
  }

  .button--medium {
    height: var(--wa-form-controls-height-m);
    font-size: var(--wa-font-size-m);
    line-height: var(--wa-form-controls-height-m);
    border-radius: var(--wa-form-controls-corners);
  }

  .button--large {
    height: var(--wa-form-controls-height-l);
    font-size: var(--wa-font-size-l);
    line-height: var(--wa-form-controls-height-l);
    border-radius: var(--wa-form-controls-corners);
  }

  .button--outline.button--small {
    line-height: calc(var(--wa-form-controls-height-s) - var(--button-border-width) * 2);
  }

  .button--outline.button--medium {
    line-height: calc(var(--wa-form-controls-height-m) - var(--button-border-width) * 2);
  }

  .button--outline.button--large {
    line-height: calc(var(--wa-form-controls-height-l) - var(--button-border-width) * 2);
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
    padding-inline-start: var(--wa-space-s);
  }

  .button--has-prefix.button--large .button__label {
    padding-inline-start: var(--wa-space-s);
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
    padding-inline-end: var(--wa-space-s);
  }

  .button--has-suffix.button--large .button__label,
  .button--caret.button--large .button__label {
    padding-inline-end: var(--wa-space-s);
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
    border-left: solid 1px var(--wa-color-tint-black);
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
