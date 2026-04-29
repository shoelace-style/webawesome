import { css } from 'lit';

export default css`
  :host {
    display: inline-block;
    color: var(--wa-color-neutral-on-quiet);
  }

  .copy-button__trigger {
    position: relative;
  }

  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border: none;
    border-radius: var(--wa-form-control-border-radius);
    color: inherit;
    font-size: inherit;
    height: var(--wa-form-control-height);
    aspect-ratio: 1;
    cursor: pointer;
    transition-property: background-color, color;
    transition-duration: var(--wa-transition-fast);
    transition-timing-function: var(--wa-transition-easing);
  }

  @media (hover: hover) {
    .button:hover:not([disabled]) {
      background-color: var(--wa-color-neutral-fill-quiet);
      color: color-mix(in oklab, currentColor, var(--wa-color-mix-hover));
    }
  }

  .button:focus-visible:not([disabled]) {
    background-color: var(--wa-color-neutral-fill-quiet);
    color: color-mix(in oklab, currentColor, var(--wa-color-mix-hover));
  }

  .button:active:not([disabled]) {
    color: color-mix(in oklab, currentColor, var(--wa-color-mix-active));
  }

  slot[name='success-icon'] {
    color: var(--wa-color-success-on-quiet);
  }

  slot[name='error-icon'] {
    color: var(--wa-color-danger-on-quiet);
  }

  .button:focus-visible {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  .button[disabled] {
    opacity: 0.5;
    cursor: not-allowed !important;
  }

  slot {
    display: inline-flex;
  }

  /* Icon swap animation */
  .show {
    animation: copy-button-icon-show 100ms ease;
  }

  .hide {
    animation: copy-button-icon-show 100ms ease reverse;
  }

  @keyframes copy-button-icon-show {
    from {
      scale: 0.25;
      opacity: 0.25;
    }
    to {
      scale: 1;
      opacity: 1;
    }
  }

  /* Feedback popup — styled to match wa-tooltip */
  .feedback {
    position: absolute;
    padding: 0.25em 0.5em;
    background-color: var(--wa-tooltip-background-color);
    border: var(--wa-tooltip-border-width) var(--wa-tooltip-border-style) var(--wa-tooltip-border-color);
    border-radius: var(--wa-tooltip-border-radius);
    color: var(--wa-tooltip-content-color);
    font-size: var(--wa-tooltip-font-size);
    line-height: var(--wa-tooltip-line-height);
    white-space: nowrap;
    pointer-events: none;
    user-select: none;
    -webkit-user-select: none;
    z-index: 1000;
  }

  .feedback::after {
    content: '';
    position: absolute;
    width: var(--wa-tooltip-arrow-size);
    height: var(--wa-tooltip-arrow-size);
    background-color: var(--wa-tooltip-background-color);
    border-right: var(--wa-tooltip-border-width) var(--wa-tooltip-border-style) var(--wa-tooltip-border-color);
    border-bottom: var(--wa-tooltip-border-width) var(--wa-tooltip-border-style) var(--wa-tooltip-border-color);
  }

  /* Top placement (default) */
  :host(:not([feedback-placement])) .feedback,
  :host([feedback-placement='top']) .feedback {
    bottom: 100%;
    left: 50%;
    margin-bottom: var(--wa-tooltip-arrow-size);
    transform: translateX(-50%);
    transform-origin: bottom center;
  }

  :host(:not([feedback-placement])) .feedback::after,
  :host([feedback-placement='top']) .feedback::after {
    top: 100%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
  }

  /* Bottom placement */
  :host([feedback-placement='bottom']) .feedback {
    top: 100%;
    left: 50%;
    margin-top: var(--wa-tooltip-arrow-size);
    transform: translateX(-50%);
    transform-origin: top center;
  }

  :host([feedback-placement='bottom']) .feedback::after {
    bottom: 100%;
    left: 50%;
    transform: translate(-50%, 50%) rotate(225deg);
  }

  /* Left placement */
  :host([feedback-placement='left']) .feedback {
    right: 100%;
    top: 50%;
    margin-right: var(--wa-tooltip-arrow-size);
    transform: translateY(-50%);
    transform-origin: center right;
  }

  :host([feedback-placement='left']) .feedback::after {
    left: 100%;
    top: 50%;
    transform: translate(-50%, -50%) rotate(-45deg);
  }

  /* Right placement */
  :host([feedback-placement='right']) .feedback {
    left: 100%;
    top: 50%;
    margin-left: var(--wa-tooltip-arrow-size);
    transform: translateY(-50%);
    transform-origin: center left;
  }

  :host([feedback-placement='right']) .feedback::after {
    right: 100%;
    top: 50%;
    transform: translate(50%, -50%) rotate(135deg);
  }

  /* Show / hide animations — directional based on placement */
  .feedback.show {
    animation: copy-button-feedback-show var(--wa-transition-normal) var(--wa-transition-easing) forwards;
  }

  .feedback.hide {
    animation: copy-button-feedback-hide var(--wa-transition-normal) var(--wa-transition-easing) forwards;
  }

  /* Top */
  :host(:not([feedback-placement])) .feedback.show,
  :host([feedback-placement='top']) .feedback.show {
    animation-name: copy-button-feedback-show-top;
  }

  :host(:not([feedback-placement])) .feedback.hide,
  :host([feedback-placement='top']) .feedback.hide {
    animation-name: copy-button-feedback-hide-top;
  }

  @keyframes copy-button-feedback-show-top {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(0.5rem) scale(0.9);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0) scale(1);
    }
  }

  @keyframes copy-button-feedback-hide-top {
    from {
      opacity: 1;
      transform: translateX(-50%) translateY(0) scale(1);
    }
    to {
      opacity: 0;
      transform: translateX(-50%) translateY(0.2rem) scale(0.9);
    }
  }

  /* Bottom */
  :host([feedback-placement='bottom']) .feedback.show {
    animation-name: copy-button-feedback-show-bottom;
  }

  :host([feedback-placement='bottom']) .feedback.hide {
    animation-name: copy-button-feedback-hide-bottom;
  }

  @keyframes copy-button-feedback-show-bottom {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(-0.5rem) scale(0.9);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0) scale(1);
    }
  }

  @keyframes copy-button-feedback-hide-bottom {
    from {
      opacity: 1;
      transform: translateX(-50%) translateY(0) scale(1);
    }
    to {
      opacity: 0;
      transform: translateX(-50%) translateY(-0.2rem) scale(0.9);
    }
  }

  /* Left */
  :host([feedback-placement='left']) .feedback.show {
    animation-name: copy-button-feedback-show-left;
  }

  :host([feedback-placement='left']) .feedback.hide {
    animation-name: copy-button-feedback-hide-left;
  }

  @keyframes copy-button-feedback-show-left {
    from {
      opacity: 0;
      transform: translateY(-50%) translateX(0.5rem) scale(0.9);
    }
    to {
      opacity: 1;
      transform: translateY(-50%) translateX(0) scale(1);
    }
  }

  @keyframes copy-button-feedback-hide-left {
    from {
      opacity: 1;
      transform: translateY(-50%) translateX(0) scale(1);
    }
    to {
      opacity: 0;
      transform: translateY(-50%) translateX(0.2rem) scale(0.9);
    }
  }

  /* Right */
  :host([feedback-placement='right']) .feedback.show {
    animation-name: copy-button-feedback-show-right;
  }

  :host([feedback-placement='right']) .feedback.hide {
    animation-name: copy-button-feedback-hide-right;
  }

  @keyframes copy-button-feedback-show-right {
    from {
      opacity: 0;
      transform: translateY(-50%) translateX(-0.5rem) scale(0.9);
    }
    to {
      opacity: 1;
      transform: translateY(-50%) translateX(0) scale(1);
    }
  }

  @keyframes copy-button-feedback-hide-right {
    from {
      opacity: 1;
      transform: translateY(-50%) translateX(0) scale(1);
    }
    to {
      opacity: 0;
      transform: translateY(-50%) translateX(-0.2rem) scale(0.9);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .show,
    .hide,
    .feedback.show,
    .feedback.hide {
      animation-duration: 1ms;
    }
  }
`;
