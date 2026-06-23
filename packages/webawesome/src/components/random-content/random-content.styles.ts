import { css } from 'lit';

export default css`
  :host {
    display: contents;
  }

  /*
   * @keyframes are defined in both document scope (random-content.ts) and here:
   * Chromium resolves animation-name from the document for slotted elements;
   * WebKit resolves it from the shadow root. Both copies are needed.
   */

  @keyframes wa-rc-fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes wa-rc-fade-up {
    from {
      opacity: 0;
      transform: translateY(var(--animation-translate, 0.5em));
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes wa-rc-fade-down {
    from {
      opacity: 0;
      transform: translateY(calc(-1 * var(--animation-translate, 0.5em)));
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes wa-rc-fade-left {
    from {
      opacity: 0;
      transform: translateX(var(--animation-translate, 0.5em));
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes wa-rc-fade-right {
    from {
      opacity: 0;
      transform: translateX(calc(-1 * var(--animation-translate, 0.5em)));
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  ::slotted([data-wa-animation]) {
    animation-duration: var(--animation-duration, 300ms);
    animation-timing-function: var(--animation-easing, ease);
    animation-fill-mode: both;
  }

  ::slotted([data-wa-animation='fade']) {
    animation-name: wa-rc-fade;
  }

  ::slotted([data-wa-animation='fade-up']) {
    animation-name: wa-rc-fade-up;
  }

  ::slotted([data-wa-animation='fade-down']) {
    animation-name: wa-rc-fade-down;
  }

  ::slotted([data-wa-animation='fade-left']) {
    animation-name: wa-rc-fade-left;
  }

  ::slotted([data-wa-animation='fade-right']) {
    animation-name: wa-rc-fade-right;
  }
`;
