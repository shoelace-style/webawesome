import { css } from 'lit';

export default css`
  @layer wa-component {
    :host {
      display: block;
    }

    /* Items with nothing slotted are data only. */
    :host(:state(empty)) {
      display: none;
    }

    .trigger {
      position: relative;
      display: block;
      border-radius: inherit;
      color: inherit;
      text-decoration: none;
      cursor: zoom-in;
    }

    .trigger:focus-visible {
      outline: none;
    }

    /* The ring goes on the thumbnail so it follows the thumbnail's own corners. */
    .trigger:focus-visible ::slotted(*) {
      outline: var(--wa-focus-ring);
      outline-offset: var(--wa-focus-ring-offset);
    }

    ::slotted(img) {
      display: block;
    }

    [hidden] {
      display: none !important;
    }

    /* Marks a thumbnail as a video. It matches the controls in the lightbox. */
    .play-button {
      position: absolute;
      inset: 0;
      display: grid;
      place-items: center;
      width: 3rem;
      height: 3rem;
      margin: auto;
      border-radius: var(--wa-border-radius-circle);
      background: rgb(0 0 0 / 0.5);
      color: white;
      font-size: var(--wa-font-size-l);
      pointer-events: none;
      transition: background var(--wa-transition-fast) ease;
    }

    .trigger:hover .play-button {
      background: rgb(0 0 0 / 0.7);
    }

    /* The lightbox hides the thumbnail while its image animates to or from the slide. */
    :host(:state(morphing)) :is(::slotted(*), .play-button) {
      visibility: hidden;
    }
  }
`;
