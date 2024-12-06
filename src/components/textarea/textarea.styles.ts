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

  .textarea {
    background-color: var(--background-color);
    border-color: var(--border-color);
    border-radius: var(--border-radius);
    border-style: var(--border-style);
    border-width: var(--border-width);
    box-shadow: var(--box-shadow);
    display: grid;
    align-items: center;
    position: relative;
    width: 100%;
    font: inherit;
    line-height: var(--wa-form-control-value-line-height);
    vertical-align: middle;
    transition:
      background var(--wa-transition-normal) var(--wa-transition-easing),
      border var(--wa-transition-normal) var(--wa-transition-easing),
      outline var(--wa-transition-fast) var(--wa-transition-easing);
    cursor: text;
  }

  .textarea__control,
  .textarea__size-adjuster {
    grid-area: 1 / 1 / 2 / 2;
  }

  .textarea__size-adjuster {
    visibility: hidden;
    pointer-events: none;
    opacity: 0;
  }

  /* Standard textareas */
  .textarea--standard.textarea--focused:not(.textarea--disabled) {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
    border-color: var(--wa-form-control-activated-color);
  }

  .textarea--standard.textarea--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Filled textareas */
  .textarea--filled.textarea--focused:not(.textarea--disabled) {
    outline: var(--wa-focus-ring);
    outline-offset: 0;
  }

  .textarea--filled.textarea--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .textarea__control {
    font: inherit;
    line-height: var(--wa-line-height-expanded);
    color: var(--wa-form-control-value-color);
    border: none;
    background: none;
    box-shadow: none;
    cursor: inherit;
    -webkit-appearance: none;
  }

  .textarea__control::-webkit-search-decoration,
  .textarea__control::-webkit-search-cancel-button,
  .textarea__control::-webkit-search-results-button,
  .textarea__control::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  .textarea__control::placeholder {
    color: var(--wa-form-control-placeholder-color);
    user-select: none;
    -webkit-user-select: none;
  }

  .textarea__control:focus {
    outline: none;
  }

  /*
   * Size modifiers
   */

  .textarea--small {
    font-size: var(--wa-font-size-s);
  }

  .textarea--small .textarea__control {
    padding: 0.5em var(--wa-space-s);
  }

  .textarea--medium {
    font-size: var(--wa-font-size-m);
  }

  .textarea--medium .textarea__control {
    padding: 0.5em var(--wa-space-m);
  }

  .textarea--large {
    font-size: var(--wa-font-size-l);
  }

  .textarea--large .textarea__control {
    padding: 0.5em var(--wa-space-l);
  }

  /*
   * Resize types
   */

  .textarea--resize-none .textarea__control {
    resize: none;
  }

  .textarea--resize-vertical .textarea__control {
    resize: vertical;
  }

  .textarea--resize-auto .textarea__control {
    height: auto;
    resize: none;
    overflow-y: hidden;
  }
`;
