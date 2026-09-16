import { css } from 'lit';

export default css`
  @layer wa-component {
    :host {
      --gap: var(--wa-space-l);
      --marker-size: 2em;
      --connector-color: var(--wa-color-surface-border);
      --connector-active: var(--wa-color-brand-fill-loud);
      --connector-gap: 0.35em;
      display: block;
    }
  }

  .stepper {
    display: block;
  }

  .steps-container {
    position: relative;
  }

  .stepper.has-scroll-controls .steps-container {
    padding: 0 1.5em;
  }

  .steps {
    /* The scroll container clips anything outside the steps' boxes, including their focus rings, so it pads out
       by the ring's full extent and pulls the same amount back with a negative margin to stay visually flush. */
    --focus-ring-extent: calc(var(--wa-focus-ring-width) + var(--wa-focus-ring-offset));

    display: flex;
    flex-direction: row;
    align-items: flex-start;
    flex-wrap: nowrap;
    gap: var(--gap);
    margin: calc(-1 * var(--focus-ring-extent));
    padding: var(--focus-ring-extent);
    list-style: none;
    overflow-x: auto;
    scrollbar-width: none;
  }

  .steps::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  :host([orientation='vertical']) .steps {
    flex-direction: column;
    align-items: stretch;
    flex-wrap: nowrap;
    overflow-x: visible;
  }

  .scroll-button {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    width: 1.5em;
  }

  .scroll-button-start {
    inset-inline-start: 0;
  }

  .scroll-button-end {
    inset-inline-end: 0;
  }
`;
