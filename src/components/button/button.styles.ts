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
    display: inline-flex;
    align-items: stretch;
    justify-content: center;
    width: 100%;
    border: none;
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

  /* Brand */
  .button--standard.button--brand {
    background-color: var(--wa-color-brand-fill-vivid);
    color: var(--wa-color-brand-text-on-vivid);
  }

  .button--standard.button--brand:hover:not(.button--disabled) {
    background-color: color-mix(in oklab, var(--wa-color-brand-fill-vivid), var(--wa-color-tint-hover));
  }

  .button--standard.button--brand:active:not(.button--disabled) {
    background-color: color-mix(in oklab, var(--wa-color-brand-fill-vivid), var(--wa-color-tint-active));
  }

  /* Success */
  .button--standard.button--success {
    background-color: var(--wa-color-success-fill-vivid);
    color: var(--wa-color-success-text-on-vivid);
  }

  .button--standard.button--success:hover:not(.button--disabled) {
    background-color: color-mix(in oklab, var(--wa-color-success-fill-vivid), var(--wa-color-tint-hover));
  }

  .button--standard.button--success:active:not(.button--disabled) {
    background-color: color-mix(in oklab, var(--wa-color-success-fill-vivid), var(--wa-color-tint-active));
  }

  /* Neutral */
  .button--standard.button--neutral {
    background-color: var(--wa-color-neutral-fill-vivid);
    color: var(--wa-color-neutral-text-on-vivid);
  }

  .button--standard.button--neutral:hover:not(.button--disabled) {
    background-color: color-mix(in oklab, var(--wa-color-neutral-fill-vivid), var(--wa-color-tint-hover));
  }

  .button--standard.button--neutral:active:not(.button--disabled) {
    background-color: color-mix(in oklab, var(--wa-color-neutral-fill-vivid), var(--wa-color-tint-active));
  }

  /* Warning */
  .button--standard.button--warning {
    background-color: var(--wa-color-warning-fill-vivid);
    color: var(--wa-color-warning-text-on-vivid);
  }
  .button--standard.button--warning:hover:not(.button--disabled) {
    background-color: color-mix(in oklab, var(--wa-color-warning-fill-vivid), var(--wa-color-tint-hover));
  }

  .button--standard.button--warning:active:not(.button--disabled) {
    background-color: color-mix(in oklab, var(--wa-color-warning-fill-vivid), var(--wa-color-tint-active));
  }

  /* Danger */
  .button--standard.button--danger {
    background-color: var(--wa-color-danger-fill-vivid);
    color: var(--wa-color-danger-text-on-vivid);
  }

  .button--standard.button--danger:hover:not(.button--disabled) {
    background-color: color-mix(in oklab, var(--wa-color-danger-fill-vivid), var(--wa-color-tint-hover));
  }

  .button--standard.button--danger:active:not(.button--disabled) {
    background-color: color-mix(in oklab, var(--wa-color-danger-fill-vivid), var(--wa-color-tint-active));
  }

  /*
   * Outline buttons
   */

  .button--outline {
    background: none;
    border: solid max(1px, var(--wa-form-controls-border-width));
  }

  /* Brand */
  .button--outline.button--brand {
    border-color: var(--wa-color-brand-outline-vivid);
    color: var(--wa-color-brand-text-on-surface);
  }

  .button--outline.button--brand:hover:not(.button--disabled),
  .button--outline.button--brand.button--checked:not(.button--disabled) {
    background-color: color-mix(in oklab, var(--wa-color-brand-fill-vivid), var(--wa-color-tint-hover));
    border-color: color-mix(in oklab, var(--wa-color-brand-fill-vivid), var(--wa-color-tint-hover));
    color: var(--wa-color-brand-text-on-vivid);
  }

  .button--outline.button--brand:active:not(.button--disabled) {
    background-color: color-mix(in oklab, var(--wa-color-brand-fill-vivid), var(--wa-color-tint-active));
    border-color: color-mix(in oklab, var(--wa-color-brand-fill-vivid), var(--wa-color-tint-active));
  }

  /* Success */
  .button--outline.button--success {
    border-color: var(--wa-color-success-outline-vivid);
    color: var(--wa-color-success-text-on-surface);
  }

  .button--outline.button--success:hover:not(.button--disabled),
  .button--outline.button--success.button--checked:not(.button--disabled) {
    background-color: color-mix(in oklab, var(--wa-color-success-fill-vivid), var(--wa-color-tint-hover));
    border-color: color-mix(in oklab, var(--wa-color-success-fill-vivid), var(--wa-color-tint-hover));
    color: var(--wa-color-success-text-on-vivid);
  }

  .button--outline.button--success:active:not(.button--disabled) {
    background-color: color-mix(in oklab, var(--wa-color-success-fill-vivid), var(--wa-color-tint-active));
    border-color: color-mix(in oklab, var(--wa-color-success-fill-vivid), var(--wa-color-tint-active));
  }

  .button--outline.button--small {
    line-height: calc(var(--wa-form-controls-height-s) - max(1px, var(--wa-form-controls-border-width)) * 2);
  }

  .button--outline.button--medium {
    line-height: calc(var(--wa-form-controls-height-m) - max(1px, var(--wa-form-controls-border-width)) * 2);
  }

  .button--outline.button--large {
    line-height: calc(var(--wa-form-controls-height-l) - max(1px, var(--wa-form-controls-border-width)) * 2);
  }

  /* Neutral */
  .button--outline.button--neutral {
    border-color: var(--wa-color-neutral-outline-vivid);
    color: var(--wa-color-neutral-text-on-surface);
  }

  .button--outline.button--neutral:hover:not(.button--disabled),
  .button--outline.button--neutral.button--checked:not(.button--disabled) {
    background-color: color-mix(in oklab, var(--wa-color-neutral-fill-vivid), var(--wa-color-tint-hover));
    border-color: color-mix(in oklab, var(--wa-color-neutral-fill-vivid), var(--wa-color-tint-hover));
    color: var(--wa-color-neutral-text-on-vivid);
  }

  .button--outline.button--neutral:active:not(.button--disabled) {
    background-color: color-mix(in oklab, var(--wa-color-neutral-fill-vivid), var(--wa-color-tint-active));
    border-color: color-mix(in oklab, var(--wa-color-neutral-fill-vivid), var(--wa-color-tint-active));
  }

  /* Warning */
  .button--outline.button--warning {
    border-color: var(--wa-color-warning-outline-vivid);
    color: var(--wa-color-warning-text-on-surface);
  }

  .button--outline.button--warning:hover:not(.button--disabled),
  .button--outline.button--warning.button--checked:not(.button--disabled) {
    background-color: color-mix(in oklab, var(--wa-color-warning-fill-vivid), var(--wa-color-tint-hover));
    border-color: color-mix(in oklab, var(--wa-color-warning-fill-vivid), var(--wa-color-tint-hover));
    color: var(--wa-color-warning-text-on-vivid);
  }

  .button--outline.button--warning:active:not(.button--disabled) {
    background-color: color-mix(in oklab, var(--wa-color-warning-fill-vivid), var(--wa-color-tint-active));
    border-color: color-mix(in oklab, var(--wa-color-warning-fill-vivid), var(--wa-color-tint-active));
  }

  /* Danger */
  .button--outline.button--danger {
    border-color: var(--wa-color-danger-outline-vivid);
    color: var(--wa-color-danger-text-on-surface);
  }

  .button--outline.button--danger:hover:not(.button--disabled),
  .button--outline.button--danger.button--checked:not(.button--disabled) {
    background-color: color-mix(in oklab, var(--wa-color-danger-fill-vivid), var(--wa-color-tint-hover));
    border-color: color-mix(in oklab, var(--wa-color-danger-fill-vivid), var(--wa-color-tint-hover));
    color: var(--wa-color-danger-text-on-vivid);
  }

  .button--outline.button--danger:active:not(.button--disabled) {
    background-color: color-mix(in oklab, var(--wa-color-danger-fill-vivid), var(--wa-color-tint-active));
    border-color: color-mix(in oklab, var(--wa-color-danger-fill-vivid), var(--wa-color-tint-active));
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
    background-color: transparent;
    border-color: transparent;
    color: var(--wa-color-text-link);
  }

  .button--text:hover:not(.button--disabled) {
    color: color-mix(in oklab, var(--wa-color-text-link), var(--wa-color-tint-hover));
  }

  .button--text:focus-visible:not(.button--disabled),
  .button--text:active:not(.button--disabled) {
    color: var(--wa-color-text-link);
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
    border-left: solid 1px rgb(128 128 128 / 33%);
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
