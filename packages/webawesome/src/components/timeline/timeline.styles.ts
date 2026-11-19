import { css } from 'lit';

export default css`
  @layer wa-component {
    :host {
      --gap: var(--wa-space-l);
      --marker-size: 1em;
      --connector-color: var(--wa-color-neutral-fill-normal);
      --connector-width: var(--wa-border-width-m);
      --connector-gap: 0.35em;

      display: block;
    }

    /* The list owns the column tracks and every item subgrids into them, so the rail stays straight. */
    .timeline {
      display: grid;
      grid-template-columns:
        [opposite-start] fit-content(40%)
        [opposite-end rail-start] auto
        [rail-end content-start] minmax(0, 1fr)
        [content-end];
      row-gap: var(--gap);
      margin: 0;
      padding: 0;
      list-style: none;
    }

    :host([marker-placement='end']) .timeline {
      grid-template-columns:
        [content-start] minmax(0, 1fr)
        [content-end rail-start] auto
        [rail-end opposite-start] fit-content(40%)
        [opposite-end];
    }

    :host([marker-placement='alternate']) .timeline {
      grid-template-columns: minmax(0, 1fr) [rail-start] auto [rail-end] minmax(0, 1fr);
    }

    ::slotted(wa-timeline-item) {
      display: grid;
      grid-template-columns: subgrid;
      grid-column: 1 / -1;
    }

    /* Horizontal */
    :host([orientation='horizontal']) .timeline {
      grid-auto-flow: column;
      grid-auto-columns: 1fr;
      grid-template-columns: none;
      grid-template-rows: [opposite-start] auto [opposite-end rail-start] auto [rail-end content-start] auto [content-end];
      row-gap: 0;
      column-gap: var(--gap);
    }

    :host([orientation='horizontal']) ::slotted(wa-timeline-item) {
      grid-template-columns: none;
      grid-template-rows: subgrid;
      grid-column: auto;
      grid-row: 1 / -1;
    }
  }
`;
