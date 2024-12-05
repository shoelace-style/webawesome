import { css } from 'lit';

export default css`
  :host {
    border: var(--wa-border-style) var(--wa-panel-border-width) var(--wa-color-neutral-border-quiet);
    border-radius: var(--wa-border-radius-m);
    color: var(--wa-color-text-normal);
    margin-block-end: var(--wa-flow-spacing);
  }

  .code-example-preview {
    display: block;
    padding: 2rem;
    border-bottom: var(--wa-border-style) var(--wa-panel-border-width) var(--wa-color-neutral-border-quiet);

    > :first-child {
      margin-block-start: 0;
    }

    > :last-child {
      margin-block-end: 0;
    }
  }

  .code-example-source {
    border-bottom: var(--wa-border-style) var(--wa-panel-border-width) var(--wa-color-neutral-border-quiet);
  }

  :host(:not([open])) .code-example-source {
    display: none;
  }

  :host([open]) .code-example-toggle wa-icon {
    rotate: 180deg;
  }

  #code-example-source {
    &::slotted(pre) {
      position: relative;
      border-radius: 0 !important;
      margin: 0;
      white-space: normal;
    }

  &:not(:has(+ .code-example-buttons)) {
    border-bottom: none;

    pre {
      border-bottom-right-radius: var(--wa-border-radius-m);
      border-bottom-left-radius: var(--wa-border-radius-m);
    }
  }

  .code-example-buttons {
    display: flex;
    align-items: stretch;

    button {
      all: unset;
      flex: 1 0 auto;
      font-size: 0.875rem;
      color: var(--wa-color-text-quiet);
      border-left: var(--wa-border-style) var(--wa-panel-border-width) var(--wa-color-neutral-border-quiet);
      text-align: center;
      padding: 0.5rem;
      cursor: pointer;

      &:first-of-type {
        border-left: none;
        /* bottom left in horizontal ltr */
        border-end-start-radius: var(--wa-border-radius-m);
      }

      &:last-of-type {
        /* bottom right in horizontal ltr */
        border-end-end-radius: var(--wa-border-radius-m);
      }

      &:focus-visible {
        outline: var(--wa-focus-ring);
      }
    }

    .code-example-pen {
      flex: 0 0 100px;
      white-space: nowrap;
    }

    wa-icon {
      width: 1em;
      height: 1em;
      vertical-align: -2px;
    }
  }
`;
