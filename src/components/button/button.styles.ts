import { css } from 'lit';

export default css`
  :host {
    --background-color-hover: color-mix(in oklab, var(--background-color), var(--wa-color-mix-hover));
    --background-color-active: color-mix(in oklab, var(--background-color), var(--wa-color-mix-active));
    --border-color: initial;
    --border-color-hover: var(--border-color);
    --border-color-active: var(--border-color);
    --border-radius: var(--wa-form-control-border-radius);
    --border-style: var(--wa-border-style);
    --border-width: var(--wa-form-control-border-width);
    --box-shadow: initial;
    --label-color-hover: var(--label-color);
    --label-color-active: var(--label-color);

    display: inline-block;
    position: relative;
    width: auto;
    cursor: pointer;
  }

  /*
   * Filled buttons
   */

  :host([appearance='filled'][variant='neutral']) {
    --background-color: var(--wa-color-neutral-fill-loud);
    --label-color: var(--wa-color-neutral-on-loud);
  }

  :host([appearance='filled'][variant='brand']) {
    --background-color: var(--wa-color-brand-fill-loud);
    --label-color: var(--wa-color-brand-on-loud);
  }

  :host([appearance='filled'][variant='success']) {
    --background-color: var(--wa-color-success-fill-loud);
    --label-color: var(--wa-color-success-on-loud);
  }

  :host([appearance='filled'][variant='warning']) {
    --background-color: var(--wa-color-warning-fill-loud);
    --label-color: var(--wa-color-warning-on-loud);
  }

  :host([appearance='filled'][variant='danger']) {
    --background-color: var(--wa-color-danger-fill-loud);
    --label-color: var(--wa-color-danger-on-loud);
  }

  /*
   * Tinted buttons
   */

  :host([appearance='tinted']) {
    --background-color-hover: color-mix(in oklab, var(--background-color), transparent 10%);
    --background-color-active: color-mix(in oklab, var(--background-color), transparent 20%);
  }

  :host([appearance='tinted'][variant='neutral']) {
    --background-color: var(--wa-color-neutral-fill-normal);
    --label-color: var(--wa-color-neutral-on-normal);
  }

  :host([appearance='tinted'][variant='brand']) {
    --background-color: var(--wa-color-brand-fill-normal);
    --label-color: var(--wa-color-brand-on-normal);
  }

  :host([appearance='tinted'][variant='success']) {
    --background-color: var(--wa-color-success-fill-normal);
    --label-color: var(--wa-color-success-on-normal);
  }

  :host([appearance='tinted'][variant='warning']) {
    --background-color: var(--wa-color-warning-fill-normal);
    --label-color: var(--wa-color-warning-on-normal);
  }

  :host([appearance='tinted'][variant='danger']) {
    --background-color: var(--wa-color-danger-fill-normal);
    --label-color: var(--wa-color-danger-on-normal);
  }

  /*
   * Outlined buttons
   */

  :host([appearance='outlined']),
  :host(.wa-button-group__button--radio:not([checked])) {
    --background-color: transparent;
    --background-color-active: color-mix(in oklab, var(--background-color-hover), transparent 20%);
  }

  :host([appearance='outlined'][variant='neutral']),
  :host(.wa-button-group__button--radio:not([checked])) {
    --background-color-hover: var(--wa-color-neutral-fill-quiet);
    --border-color: var(--wa-color-neutral-border-loud);
    --label-color: var(--wa-color-neutral-on-quiet);
  }

  :host([appearance='outlined'][variant='brand']) {
    --background-color-hover: var(--wa-color-brand-fill-quiet);
    --border-color: var(--wa-color-brand-border-loud);
    --label-color: var(--wa-color-brand-on-quiet);
  }

  :host([appearance='outlined'][variant='success']) {
    --background-color-hover: var(--wa-color-success-fill-quiet);
    --border-color: var(--wa-color-success-border-loud);
    --label-color: var(--wa-color-success-on-quiet);
  }

  :host([appearance='outlined'][variant='warning']) {
    --background-color-hover: var(--wa-color-warning-fill-quiet);
    --border-color: var(--wa-color-warning-border-loud);
    --label-color: var(--wa-color-warning-on-quiet);
  }

  :host([appearance='outlined'][variant='danger']) {
    --background-color-hover: var(--wa-color-danger-fill-quiet);
    --border-color: var(--wa-color-danger-border-loud);
    --label-color: var(--wa-color-danger-on-quiet);
  }

  /*
   * Text buttons
   */

  :host([appearance='text']) {
    --background-color: transparent;
    --background-color-active: color-mix(in oklab, var(--background-color-hover), transparent 20%);
  }

  :host([appearance='text'][variant='neutral']) {
    --label-color: var(--wa-color-neutral-on-quiet);
    --background-color-hover: var(--wa-color-neutral-fill-quiet);
  }

  :host([appearance='text'][variant='brand']) {
    --label-color: var(--wa-color-brand-on-quiet);
    --background-color-hover: var(--wa-color-brand-fill-quiet);
  }

  :host([appearance='text'][variant='success']) {
    --label-color: var(--wa-color-success-on-quiet);
    --background-color-hover: var(--wa-color-success-fill-quiet);
  }

  :host([appearance='text'][variant='warning']) {
    --label-color: var(--wa-color-warning-on-quiet);
    --background-color-hover: var(--wa-color-warning-fill-quiet);
  }

  :host([appearance='text'][variant='danger']) {
    --label-color: var(--wa-color-danger-on-quiet);
    --background-color-hover: var(--wa-color-danger-fill-quiet);
  }

  /*
   * Checked buttons
   */

  :host([checked]) {
    --background-color: var(--wa-color-brand-fill-quiet);
    --background-color-hover: var(--background-color);
    --border-color: var(--wa-form-control-activated-color);
    --label-color: var(--wa-color-brand-on-normal);
    --indicator-color: var(--border-color);
    --indicator-width: var(--wa-border-width-s);
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
    background-color: var(--background-color);
    border-color: var(--border-color, var(--background-color));
    border-radius: var(--border-radius);
    border-style: var(--border-style);
    border-width: max(1px, var(--border-width));
    box-shadow: var(--box-shadow);
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
      background var(--wa-transition-fast) var(--wa-transition-easing),
      border var(--wa-transition-fast) var(--wa-transition-easing),
      box-shadow var(--wa-transition-fast) var(--wa-transition-easing),
      color var(--wa-transition-fast) var(--wa-transition-easing);
    cursor: inherit;
  }

  .button--checked {
    box-shadow:
      var(--box-shadow, 0 0 transparent),
      inset 0 0 0 var(--indicator-width) var(--indicator-color);
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

  .button:hover:not(.button--disabled, .button--loading) {
    background-color: var(--background-color-hover, var(--background-color, none));
    border-color: var(--border-color-hover, var(--border-color, var(--background-color-hover)));
    color: var(--label-color-hover, var(--label-color));
  }

  .button:active:not(.button--disabled, .button--loading) {
    background-color: var(--background-color-active, var(--background-color, none));
    border-color: var(--border-color-active, var(--border-color, var(--background-color-active)));
    color: var(--label-color-active, var(--label-color));
  }

  @media (forced-colors: active) {
    .button.button--outlined.button--checked:not(.button--disabled) {
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
    height: var(--wa-form-control-height-s);
    line-height: calc(var(--wa-form-control-height-s) - var(--border-width) * 2);
  }

  .button--medium {
    height: var(--wa-form-control-height-m);
    line-height: calc(var(--wa-form-control-height-m) - var(--border-width) * 2);
  }

  .button--large {
    height: var(--wa-form-control-height-l);
    line-height: calc(var(--wa-form-control-height-l) - var(--border-width) * 2);
  }

  /*
   * Pill modifier
   */

  .button--pill.button--small {
    border-radius: var(--wa-border-radius-pill);
  }

  .button--pill.button--medium {
    border-radius: var(--wa-border-radius-pill);
  }

  .button--pill.button--large {
    border-radius: var(--wa-border-radius-pill);
  }

  /*
   * Caret modifier
   */

  .button--caret .button__suffix {
    display: none;
  }

  .button--caret .button__caret {
    display: flex;
    align-self: center;
    align-items: center;
  }

  .button--caret .button__caret::part(svg) {
    width: 0.875em;
    height: 0.875em;
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
    --border-color: var(--wa-color-surface-default);
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

  .button--small {
    padding: 0 var(--wa-space-s);
  }

  .button--medium {
    padding: 0 var(--wa-space-m);
  }

  .button--large {
    padding: 0 var(--wa-space-l);
  }

  .button--small ::slotted([slot='prefix']) {
    margin-inline-end: var(--wa-space-s);
  }

  .button--medium ::slotted([slot='prefix']) {
    margin-inline-end: var(--wa-space-m);
  }

  .button--large ::slotted([slot='prefix']) {
    margin-inline-end: var(--wa-space-l);
  }

  .button--small ::slotted([slot='suffix']),
  .button--small.button--caret:not(.button--visually-hidden-label) .button__caret {
    margin-inline-start: var(--wa-space-s);
  }

  .button--medium ::slotted([slot='suffix']),
  .button--medium.button--caret:not(.button--visually-hidden-label) .button__caret {
    margin-inline-start: var(--wa-space-m);
  }

  .button--large ::slotted([slot='suffix']),
  .button--large.button--caret:not(.button--visually-hidden-label) .button__caret {
    margin-inline-start: var(--wa-space-l);
  }

  /*
   * Button groups support a variety of button types (e.g. buttons with tooltips, buttons as dropdown triggers, etc.).
   * This means buttons aren't always direct descendants of the button group, thus we can't target them with the
   * ::slotted selector. To work around this, the button group component does some magic to add these special classes to
   * buttons and we style them here instead.
   */

  /*
  :host([data-button-group-middle]) #button {
    border-radius: 0;
  }

  :host([data-button-group-horizontal][data-button-group-first]) #button {
    border-start-end-radius: 0;
    border-end-end-radius: 0;
  }

  :host([data-button-group-horizontal][data-button-group-last]) #button {
    border-start-start-radius: 0;
    border-end-start-radius: 0;
  }

  :host([data-button-group-vertical][data-button-group-first]) #button {
    border-end-start-radius: 0;
    border-end-end-radius: 0;
  }

  :host([data-button-group-vertical][data-button-group-last]) #button {
    border-start-start-radius: 0;
    border-start-end-radius: 0;
  }
  */

  :host(.wa-button-group__button--inner) .button {
    border-radius: 0;
  }

  :host(.wa-button-group-horizontal.wa-button-group__button--first:not(.wa-button-group__button--last)) .button {
    border-start-end-radius: 0;
    border-end-end-radius: 0;
  }

  :host(.wa-button-group-horizontal.wa-button-group__button--last:not(.wa-button-group__button--first)) .button {
    border-start-start-radius: 0;
    border-end-start-radius: 0;
  }

  :host(.wa-button-group-vertical.wa-button-group__button--first:not(.wa-button-group__button--last)) .button {
    border-end-start-radius: 0;
    border-end-end-radius: 0;
  }

  :host(.wa-button-group-vertical.wa-button-group__button--last:not(.wa-button-group__button--first)) .button {
    border-start-start-radius: 0;
    border-start-end-radius: 0;
  }

  /* All except the first */
  :host(
      .wa-button-group-horizontal.wa-button-group-horizontal.wa-button-group__button:not(
          .wa-button-group__button--first
        )
    ) {
    margin-inline-start: calc(-1 * var(--border-width));
  }

  :host(
      .wa-button-group-vertical.wa-button-group-horizontal.wa-button-group__button:not(.wa-button-group__button--first)
    ) {
    margin-block-start: calc(-1 * var(--border-width));
  }

  /* Add a visual separator between filled buttons */
  :host(.wa-button-group__button:not(.wa-button-group__button--first, .wa-button-group__button--radio)) .button:after {
    content: '';
    position: absolute;
    z-index: 2; /* Keep separators visible on hover */
  }

  :host(
      .wa-button-group-horizontal.wa-button-group__button:not(
          .wa-button-group__button--first,
          .wa-button-group__button--radio
        )
    )
    .button:after {
    top: 0;
    bottom: 0;
    inset-inline-start: 0;
    border-left: solid max(var(--border-width), 1px) var(--border-color, rgb(0 0 0 / 0.3));
  }

  :host(
      .wa-button-group-vertical.wa-button-group__button:not(
          .wa-button-group__button--first,
          .wa-button-group__button--radio
        )
    )
    .button:after {
    left: 0;
    right: 0;
    inset-block-start: 0;
    border-top: solid max(var(--border-width), 1px) var(--border-color, rgb(0 0 0 / 0.3));
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
