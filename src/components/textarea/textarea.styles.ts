import { css } from 'lit';
import componentStyles from '../../styles/component.styles.js';
import formControlStyles from '../../styles/form-control.styles.js';

export default css`
  ${componentStyles}
  ${formControlStyles}

  :host {
    display: block;
  }

  .textarea {
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    font: inherit;
    color: var(--wa-form-controls-text-color);
    line-height: var(--wa-form-controls-value-line-height);
    vertical-align: middle;
    transition:
      var(--wa-transition-fast) border,
      var(--wa-transition-fast) background-color;
    cursor: text;
  }

  /* Standard textareas */
  .textarea--standard {
    background-color: var(--wa-form-controls-background);
    border: var(--wa-form-controls-border-style) var(--wa-form-controls-border-width)
      var(--wa-form-controls-border-color-resting);
  }

  .textarea--standard.textarea--focused:not(.textarea--disabled) {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
    border-color: var(--wa-form-controls-border-color-activated);
  }

  .textarea--standard.textarea--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Filled textareas */
  .textarea--filled {
    border: none;
    background-color: var(--wa-color-neutral-fill-muted);
    color: var(--wa-color-neutral-text-on-muted);
  }

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
    line-height: var(--wa-form-controls-value-line-height);
    color: var(--wa-form-controls-text-color);
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
    border-radius: var(--wa-form-controls-corners);
    font-size: var(--wa-font-size-s);
  }

  .textarea--small .textarea__control {
    padding: 0.5em var(--wa-space-s);
  }

  .textarea--medium {
    border-radius: var(--wa-form-controls-corners);
    font-size: var(--wa-font-size-m);
  }

  .textarea--medium .textarea__control {
    padding: 0.5em var(--wa-space-m);
  }

  .textarea--large {
    border-radius: var(--wa-form-controls-corners);
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
