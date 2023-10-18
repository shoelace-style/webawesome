import { css } from 'lit';
import componentStyles from '../../styles/component.styles.js';

export default css`
  ${componentStyles}

  :host {
    display: block;
  }

  :host(:focus-visible) {
    outline: none;
  }

  .radio {
    display: inline-flex;
    align-items: top;
    font: inherit;
    color: var(--wa-form-controls-text-color);
    vertical-align: middle;
    cursor: pointer;
  }

  .radio--small {
    --toggle-size: var(--wa-form-control-toggle-size-s);
    font-size: var(--wa-font-size-s);
  }

  .radio--medium {
    --toggle-size: var(--wa-form-control-toggle-size-m);
    font-size: var(--wa-font-size-m);
  }

  .radio--large {
    --toggle-size: var(--wa-form-control-toggle-size-l);
    font-size: var(--wa-font-size-l);
  }

  .radio__checked-icon {
    display: inline-flex;
    width: var(--toggle-size);
    height: var(--toggle-size);
  }

  .radio__control {
    flex: 0 0 auto;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--toggle-size);
    height: var(--toggle-size);
    border: var(--wa-border-style) var(--wa-form-controls-border-width) var(--wa-form-controls-border-color-resting);
    border-radius: 50%;
    background-color: var(--wa-form-controls-background);
    color: transparent;
    transition:
      var(--wa-transition-fast) border-color,
      var(--wa-transition-fast) background-color,
      var(--wa-transition-fast) color,
      var(--wa-transition-fast) box-shadow;
  }

  .radio__input {
    position: absolute;
    opacity: 0;
    padding: 0;
    margin: 0;
    pointer-events: none;
  }

  /* Checked */
  .radio--checked .radio__control {
    color: var(--wa-color-brand-text-on-vivid);
    border-color: var(--wa-color-brand-fill-vivid);
    background-color: var(--wa-color-brand-fill-vivid);
  }

  /* Checked + focus */
  :host(:focus-visible) .radio__control {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  /* Disabled */
  .radio--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* When the control isn't checked, hide the circle for Windows High Contrast mode a11y */
  .radio:not(.radio--checked) svg circle {
    opacity: 0;
  }

  .radio__label {
    display: inline-block;
    color: var(--wa-form-controls-text-color);
    line-height: var(--toggle-size);
    margin-inline-start: 0.5em;
    user-select: none;
    -webkit-user-select: none;
  }
`;
