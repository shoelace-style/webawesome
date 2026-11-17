import { css } from 'lit';

export default css`
  @layer wa-component {
    :host {
      display: inline-block;
      position: relative;
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
    }

    /* Only the final value copies while counting. */
    [aria-hidden='true'] {
      user-select: none;
      -webkit-user-select: none;
    }
  }
`;
