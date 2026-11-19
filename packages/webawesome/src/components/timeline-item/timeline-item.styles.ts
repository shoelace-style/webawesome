import { css } from 'lit';

export default css`
  @layer wa-component {
    :host {
      --_marker-background: var(--wa-color-fill-loud);
      --_marker-color: var(--wa-color-on-loud);
      display: block;
    }

    /* Neutral items keep a quiet marker so a plain timeline reads quietly. */
    :host([variant='neutral']) {
      --_marker-background: var(--wa-color-fill-normal);
      --_marker-color: var(--wa-color-on-normal);
    }

    /* Layout */
    .item {
      --_marker-size: var(--marker-size, 1em);
      /* How far a first line taller than the marker would rise above the item. Applied as padding so it stays inside. */
      --_line-overhang: max(0px, (1lh - var(--_marker-size)) / 2);

      display: grid;
      grid-template-columns: subgrid;
      grid-column: 1 / -1;
      padding-block-start: var(--_line-overhang);
    }

    /* An icon needs a bigger marker to stay legible, unless the author picked a size. */
    .item.has-icon {
      --_marker-size: var(--marker-size, 2em);
    }

    .rail {
      grid-column: rail;
      grid-row: 1;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .content,
    .opposite {
      grid-row: 1;
      align-self: start;
      min-width: 0;
      overflow-wrap: break-word;
    }

    /* Shift by half the marker and first line difference so the marker centers on that line. */
    .content {
      grid-column: content;
      margin-block-start: calc((var(--_marker-size) - 1lh) / 2);
      margin-inline-start: 1em;
    }

    /* Starts at the marker's middle. The slot then pulls its smaller first line up by half its own height. */
    .opposite {
      grid-column: opposite;
      margin-block-start: calc(var(--_marker-size) / 2);
      margin-inline-end: 1em;
      color: var(--wa-color-text-quiet);
      text-align: end;
    }

    .opposite slot {
      display: block;
      margin-block-start: -0.5lh;
      font-size: var(--wa-font-size-smaller);
      line-height: var(--wa-line-height-condensed);
    }

    /* Marker */
    .marker {
      position: relative;
      z-index: 1;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: var(--_marker-size);
      height: var(--_marker-size);
      color: var(--_marker-color);
      background-color: var(--_marker-background);
      border-radius: var(--wa-border-radius-circle);
    }

    /* Same content-to-circle ratio as <wa-avatar>. A slotted avatar needs 2.5em, the inverse of this 0.4. */
    .marker slot {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: calc(var(--_marker-size) * 0.4);
    }

    slot[name='icon']::slotted(wa-avatar) {
      --size: 2.5em;
    }

    /* Connector. Each item draws two halves that meet in the middle of the gap, so every length is its own. */
    .connector {
      position: absolute;
      z-index: 0;
      inset-inline: 0;
      width: var(--connector-width);
      margin-inline: auto;
    }

    /* From the middle of the gap above the item to one connector gap above the marker. */
    .connector-start {
      inset-block: calc(-1 * (var(--gap) / 2 + var(--_line-overhang))) calc(100% + var(--connector-gap));
      background-color: var(--connector-color);
    }

    /* From one connector gap below the marker to the middle of the gap below the item. */
    .connector-end {
      inset-block: calc(var(--_marker-size) + var(--connector-gap)) calc(-1 * var(--gap) / 2);
      background-color: var(--connector-color);
    }

    :host(:first-of-type) .connector-start,
    :host(:last-of-type) .connector-end {
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
      margin-block: 0 0.5em;
      padding-inline: calc(var(--gap) / 2);
      text-align: center;
    }

    :host([data-wa-timeline-horizontal]) .opposite slot {
      margin-block-start: 0;
    }

    /* Centers markers of different sizes on one line. */
    :host([data-wa-timeline-horizontal]) .rail {
      grid-column: auto;
      grid-row: rail;
      justify-content: center;
    }

    :host([data-wa-timeline-horizontal]) .content {
      grid-column: auto;
      grid-row: content;
      margin-inline: 0;
      margin-block: 0.5em 0;
      padding-inline: calc(var(--gap) / 2);
    }

    :host([data-wa-timeline-horizontal]) .connector {
      inset-block: 0;
      width: auto;
      height: var(--connector-width);
      margin-block: auto;
    }

    :host([data-wa-timeline-horizontal]) .connector-start {
      inset-inline: 0 calc(50% + var(--_marker-size) / 2 + var(--connector-gap));
    }

    :host([data-wa-timeline-horizontal]) .connector-end {
      inset-inline: calc(50% + var(--_marker-size) / 2 + var(--connector-gap)) 0;
    }

    /* The first item hugs the start edge and the last item hugs the end edge. A lone item follows the first. */
    :host([data-wa-timeline-horizontal]:first-of-type) .rail {
      align-items: flex-start;
    }

    :host([data-wa-timeline-horizontal]:first-of-type) .content,
    :host([data-wa-timeline-horizontal]:first-of-type) .opposite {
      padding-inline-start: 0;
      text-align: start;
    }

    :host([data-wa-timeline-horizontal]:first-of-type) .connector-end {
      inset-inline-start: calc(var(--_marker-size) + var(--connector-gap));
    }

    :host([data-wa-timeline-horizontal]:last-of-type:not(:first-of-type)) .rail {
      align-items: flex-end;
    }

    :host([data-wa-timeline-horizontal]:last-of-type:not(:first-of-type)) .content,
    :host([data-wa-timeline-horizontal]:last-of-type:not(:first-of-type)) .opposite {
      padding-inline-end: 0;
      text-align: end;
    }

    :host([data-wa-timeline-horizontal]:last-of-type:not(:first-of-type)) .connector-start {
      inset-inline-end: calc(var(--_marker-size) + var(--connector-gap));
    }

    /* End placement */
    :host([data-wa-timeline-placement='end']) .content {
      margin-inline: 0 1em;
      text-align: end;
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

    /* Center alignment. The connector runs behind the marker, colored by the previous item above and this one below. */
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

    :host([data-wa-timeline-center]) .opposite slot {
      margin-block-start: 0;
    }

    :host([data-wa-timeline-center]) .connector-start {
      inset-block: calc(-1 * var(--gap) / 2) 50%;
    }

    :host([data-wa-timeline-center]) .connector-end {
      inset-block: 50% calc(-1 * var(--gap) / 2);
    }

    /* Forced colors flatten backgrounds to Canvas, so anything that's fill-only needs a system-color edge. */
    @media (forced-colors: active) {
      .connector-start,
      .connector-end {
        background-color: CanvasText;
      }

      .marker {
        outline: solid 1px CanvasText;
        outline-offset: -1px;
      }
    }
  }
`;
