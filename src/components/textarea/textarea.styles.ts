import { css } from 'lit';
import componentStyles from '../../styles/component.styles.js';
import formControlStyles from '../../styles/form-control.styles.js';

export default css`
  ${componentStyles}
  ${formControlStyles}

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

  .textarea {
    background: var(--background);
    border-color: var(--border-color);
    border-radius: var(--border-radius);
    border-style: var(--border-style);
    border-width: var(--border-width);
    box-shadow: var(--box-shadow);
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    font: inherit;
    line-height: var(--wa-form-controls-value-line-height);
    vertical-align: middle;
    transition:
      var(--wa-transition-fast) background,
      var(--wa-transition-fast) border,
      var(--wa-transition-faster) outline;
    cursor: text;
  }

  /* Standard textareas */
  .textarea--standard.textarea--focused:not(.textarea--disabled) {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
    border-color: var(--wa-form-controls-activated-color);
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
    flex: 1 1 auto;
    font: inherit;
    line-height: var(--wa-font-line-height-comfortable);
    color: var(--wa-form-controls-value-color);
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
    color: var(--wa-form-controls-placeholder-color);
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
