import { css } from 'lit';

export default css`
  @layer wa-component {
    :host {
      display: inline-flex;
      position: relative;
      gap: 0.5em;
      line-height: 1.2;
      font-variant-numeric: tabular-nums;
    }

    .unit {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .label {
      font-size: max(0.5em, var(--wa-font-size-2xs));
    }

    /* Clock-style counters read left to right, even in RTL */
    :host([without-labels]) {
      direction: ltr;
    }

    :host([without-labels]) .label {
      display: none;
    }

    /* Stacks the visible label over the widest form so the width holds steady */
    .default-label {
      display: inline-grid;
      justify-items: center;
    }

    .default-label > * {
      grid-area: 1 / 1;
    }

    .sizer {
      visibility: hidden;
      user-select: none;
      -webkit-user-select: none;
    }

    /* Sits on the same line as the values and hugs them */
    .delimiter {
      align-self: flex-start;
      margin-inline: -0.25em;
    }

    /* Keeps the phrase for screen readers out of copied text */
    .wa-visually-hidden {
      user-select: none;
      -webkit-user-select: none;
    }
  }
`;
