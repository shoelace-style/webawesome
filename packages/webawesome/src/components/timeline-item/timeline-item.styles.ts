import { css } from 'lit';

export default css`
  @layer wa-component {
    :host {
      --_filled: var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal));
      --_filled-on: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
      --_connector-color: var(--_filled);
      /* How far a first line taller than the marker would rise above the item. Applied as padding so it stays inside. */
      --_line-overhang: max(0px, (1.125lh - var(--marker-size)) / 2);

      display: block;
    }

    /* A neutral item takes the timeline's --connector-color; any other variant colors its own connector. */
    :host([variant='neutral']) {
      --_connector-color: var(--connector-color, var(--wa-color-neutral-fill-normal));
    }

    /* The previous item's variant, set by <wa-timeline> as an attribute, colors a centered connector's incoming half.
       An attribute rather than step's wa-{variant} class because a class set before hydration never reaches the DOM. */
    :host([data-wa-timeline-previous-variant='neutral']) {
      --_incoming-connector-color: var(--connector-color, var(--wa-color-neutral-fill-normal));
    }

    :host([data-wa-timeline-previous-variant='brand']) {
      --_incoming-connector-color: var(--wa-color-brand-fill-normal);
    }

    :host([data-wa-timeline-previous-variant='success']) {
      --_incoming-connector-color: var(--wa-color-success-fill-normal);
    }

    :host([data-wa-timeline-previous-variant='warning']) {
      --_incoming-connector-color: var(--wa-color-warning-fill-normal);
    }

    :host([data-wa-timeline-previous-variant='danger']) {
      --_incoming-connector-color: var(--wa-color-danger-fill-normal);
    }

    /* Layout */
    .item {
      display: grid;
      grid-template-columns: subgrid;
      grid-column: 1 / -1;
      padding-block-start: var(--_line-overhang);
    }

    .rail {
      grid-column: rail;
      grid-row: 1;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    /* Shift by half the difference between the marker and the first line so the marker centers on that line. 1.125lh,
       not 1lh, keeps a condensed heading line centered too. */
    .content,
    .opposite {
      grid-row: 1;
      align-self: start;
      min-width: 0;
      margin-block-start: calc((var(--marker-size) - 1.125lh) / 2);
    }

    .content {
      grid-column: content;
      margin-inline-start: 1em;
    }

    .opposite {
      grid-column: opposite;
      margin-inline-end: 1em;
      font-size: var(--wa-font-size-smaller);
      line-height: var(--wa-line-height-condensed);
      color: var(--wa-color-text-quiet);
      text-align: end;
    }

    /* Marker */
    .marker {
      position: relative;
      z-index: 1;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: var(--marker-size);
      height: var(--marker-size);
      color: var(--_filled-on);
      background-color: var(--_filled);
      border-radius: var(--wa-border-radius-circle);
    }

    /* Same content-to-circle ratio as <wa-avatar>, for icons and avatars alike. */
    .marker slot {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: calc(var(--marker-size) * 0.4);
    }

    /* Connector */
    .connector {
      position: absolute;
      z-index: 0;
      inset-inline: 0;
      inset-block-start: calc(var(--marker-size) + var(--connector-gap));
      inset-block-end: calc(-1 * var(--gap) - var(--_line-overhang) + var(--connector-gap));
      width: var(--connector-width);
      margin-inline: auto;
      background-color: var(--_connector-color);
    }

    :host(:last-child) .connector {
      display: none;
    }

    /* Horizontal */
    :host([data-wa-timeline-horizontal]) .item {
      grid-template-columns: none;
      grid-template-rows: subgrid;
      grid-column: auto;
      grid-row: 1 / -1;
      padding-block-start: 0;
      text-align: center;
    }

    :host([data-wa-timeline-horizontal]) .opposite {
      grid-column: auto;
      grid-row: opposite;
      margin-inline: 0;
      margin-block: 0 1em;
      text-align: center;
    }

    :host([data-wa-timeline-horizontal]) .rail {
      grid-column: auto;
      grid-row: rail;
    }

    :host([data-wa-timeline-horizontal]) .content {
      grid-column: auto;
      grid-row: content;
      margin-inline: 0;
      margin-block: 1em 0;
    }

    :host([data-wa-timeline-horizontal]) .connector {
      inset-inline-start: calc(50% + var(--marker-size) / 2 + var(--connector-gap));
      inset-inline-end: calc(-50% - var(--gap) + var(--marker-size) / 2 + var(--connector-gap));
      inset-block-start: calc(var(--marker-size) / 2);
      inset-block-end: auto;
      width: auto;
      height: var(--connector-width);
      translate: 0 -50%;
    }

    /* End placement */
    :host([data-wa-timeline-placement='end']) .content {
      margin-inline: 0 1em;
    }

    :host([data-wa-timeline-placement='end']) .opposite {
      margin-inline: 1em 0;
      text-align: start;
    }

    /* Alternate placement. Whichever side sits before the rail is end-aligned so it hugs the rail. */
    :host([data-wa-timeline-placement='alternate-start']) .content {
      grid-column: 1;
      margin-inline: 0 1em;
      text-align: end;
    }

    :host([data-wa-timeline-placement='alternate-start']) .opposite {
      grid-column: 3;
      margin-inline: 1em 0;
      text-align: start;
    }

    :host([data-wa-timeline-placement='alternate-end']) .content {
      grid-column: 3;
    }

    :host([data-wa-timeline-placement='alternate-end']) .opposite {
      grid-column: 1;
    }

    /* Center alignment. The connector spans the row behind the marker and splits at it: the incoming half takes the
       previous item's color, the outgoing half this item's. --connector-gap doesn't apply. */
    :host([data-wa-timeline-center]) .item {
      padding-block-start: 0;
    }

    :host([data-wa-timeline-center]) .marker {
      margin-block: auto;
    }

    :host([data-wa-timeline-center]) .content,
    :host([data-wa-timeline-center]) .opposite {
      align-self: center;
      margin-block-start: 0;
    }

    :host([data-wa-timeline-center]) .connector,
    :host([data-wa-timeline-center]:first-child) .connector,
    :host([data-wa-timeline-center]:last-child) .connector {
      display: block;
      inset-block: 0;
      background-color: transparent;
    }

    :host([data-wa-timeline-center]) .connector::before,
    :host([data-wa-timeline-center]) .connector::after {
      content: '';
      position: absolute;
      inset-inline: 0;
    }

    :host([data-wa-timeline-center]) .connector::before {
      inset-block-start: 0;
      inset-block-end: 50%;
      background-color: var(--_incoming-connector-color, var(--_connector-color));
    }

    :host([data-wa-timeline-center]) .connector::after {
      inset-block-start: 50%;
      inset-block-end: calc(-1 * var(--gap));
      background-color: var(--_connector-color);
    }

    :host([data-wa-timeline-center]:first-child) .connector::before,
    :host([data-wa-timeline-center]:last-child) .connector::after {
      display: none;
    }

    /* A lone item has nothing to connect to. */
    :host([data-wa-timeline-center]:only-child) .connector {
      display: none;
    }

    /* Forced colors flatten backgrounds to Canvas, so anything that's fill-only needs a system-color edge. */
    @media (forced-colors: active) {
      .connector,
      .connector::before,
      .connector::after {
        background-color: CanvasText;
      }

      .marker {
        outline: solid 1px CanvasText;
        outline-offset: -1px;
      }
    }
  }
`;
