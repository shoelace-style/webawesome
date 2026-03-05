import { css } from 'lit';

export default css`
  :host {
    display: inline-flex;
  }

  .button-group {
    display: flex;
    position: relative;
    isolation: isolate;
    flex-wrap: wrap;

    @media (hover: hover) {
      > :hover,
      &::slotted(:hover) {
        z-index: 1;
      }
    }

    /* Focus and checked are always on top */
    > :focus,
    &::slotted(:focus),
    > [aria-checked='true'],
    &::slotted([aria-checked='true']),
    > [checked],
    &::slotted([checked]) {
      z-index: 2 !important;
    }

    :host([orientation='horizontal']) & {
      flex-direction: row;
    }

    :host([orientation='vertical']) & {
      flex-direction: column;
    }
  }

  /* Set custom properties to be inherited by slotted buttons */
  :host([orientation='horizontal']) {
    --_wa-button-horizontal-indent: 1px;
    --_wa-button-horizontal-indent-outlined: calc(var(--wa-border-width-s) * -1);
  }

  :host([orientation='vertical']) {
    --_wa-button-vertical-indent: 1px;
    --_wa-button-vertical-indent-outlined: calc(var(--wa-border-width-s) * -1);
  }

  /* All buttons that are not in front or at the end get their border radius removed */
  ::slotted(:not(:first-child):not(:last-child)) {
    --_wa-button-start-start-radius: 0;
    --_wa-button-start-end-radius: 0;
    --_wa-button-end-start-radius: 0;
    --_wa-button-end-end-radius: 0;
  }

  /* Remove leading and trailing buttons border radius individually */
  :host([orientation='horizontal']) {
    ::slotted(:first-child) {
      --_wa-button-start-end-radius: 0;
      --_wa-button-end-end-radius: 0;
    }

    ::slotted(:last-child) {
      --_wa-button-start-start-radius: 0;
      --_wa-button-end-start-radius: 0;
    }
  }

  :host([orientation='vertical']) {
    ::slotted(:first-child) {
      --_wa-button-end-start-radius: 0;
      --_wa-button-end-end-radius: 0;
    }

    ::slotted(:last-child) {
      --_wa-button-start-start-radius: 0;
      --_wa-button-start-end-radius: 0;
    }
  }
`;
