import { css } from 'lit';

export default css`
  .form-control .form-control__label {
    display: none;
  }

  .form-control .form-control__help-text {
    display: none;
  }

  /* Label */
  .form-control--has-label .form-control__label {
    display: inline-block;
    color: inherit;
    margin-bottom: var(--wa-space-3xs);
  }

  .form-control--has-label.form-control--small .form-control__label {
    font-size: var(--wa-font-size-s);
  }

  .form-control--has-label.form-control--medium .form-control__label {
    font-size: var(--wa-font-size-m);
  }

  .form-control--has-label.form-control--large .form-control__label {
    font-size: var(--wa-font-size-l);
  }

  :host([required]) .form-control--has-label .form-control__label::after {
    content: var(--wa-form-controls-required-content);
    margin-inline-start: var(--wa-form-controls-required-content-offset);
    color: var(--wa-form-controls-required-content-color);
  }

  /* Help text */
  .form-control--has-help-text .form-control__help-text {
    display: block;
    color: var(--wa-color-text-quiet);
    margin-top: var(--wa-space-3xs);
  }

  .form-control--has-help-text.form-control--small .form-control__help-text {
    font-size: var(--wa-font-size-xs);
  }

  .form-control--has-help-text.form-control--medium .form-control__help-text {
    font-size: var(--wa-font-size-s);
  }

  .form-control--has-help-text.form-control--large .form-control__help-text {
    font-size: var(--wa-font-size-m);
  }

  .form-control--has-help-text.form-control--radio-group .form-control__help-text {
    margin-top: var(--wa-space-2xs);
  }
`;
