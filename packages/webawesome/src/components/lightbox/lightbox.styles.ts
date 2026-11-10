import { css } from 'lit';

export default css`
  @layer wa-component {
    :host {
      --backdrop-color: color-mix(in oklab, black 95%, transparent);
      --backdrop-filter: none;
      --media-border-radius: 0px;
      --controls-color: var(--wa-color-neutral-95);
      --controls-background: rgb(0 0 0 / 0.5);
      --show-duration: var(--wa-transition-slow);
      --hide-duration: var(--wa-transition-slow);
      --spacing: clamp(var(--wa-space-m), 3vw, var(--wa-space-2xl));
      --slide-gap: var(--wa-space-xl);
      --thumbnail-size: 3.5rem;

      display: block;
    }

    [hidden] {
      display: none !important;
    }

    .dialog {
      /* Controls only get a backing when the media can be behind them. */
      --control-fill: transparent;
      --navigation-fill: transparent;
      --control-size: 2.5rem;
      --caption-space: 0rem;
      --thumbnails-space: 0rem;

      position: fixed;
      inset: 0;
      width: 100%;
      height: 100%;
      max-width: none;
      max-height: none;
      margin: 0;
      padding: 0;
      border: none;
      background: none;
      color: var(--controls-color);
      color-scheme: dark;
      font-family: var(--wa-font-family-body);
      overflow: hidden;
      outline: none;
      overscroll-behavior: contain;

      &::backdrop {
        background: none;
      }

      /* Hides the first frame, before the lightbox has scrolled to the current slide. */
      &.preparing {
        opacity: 0;
      }

      &.zoomed {
        --control-fill: var(--controls-background);
        --navigation-fill: var(--controls-background);
      }

      /* The media is wide enough at rest to sit under the previous and next buttons. */
      &.overlapping {
        --navigation-fill: var(--controls-background);
      }

      &.has-captions {
        --caption-space: calc(3rem + var(--spacing));
      }

      &.has-thumbnails {
        --thumbnails-space: calc(var(--thumbnail-size) + var(--spacing));
      }
    }

    .backdrop {
      position: absolute;
      inset: 0;
      background: var(--backdrop-color);
      backdrop-filter: var(--backdrop-filter);
    }

    /* These follow the finger during a pull, then ease back. */
    .backdrop,
    .chrome {
      transition: opacity var(--wa-transition-normal) ease;
    }

    .pulling :is(.backdrop, .chrome) {
      transition: none;
    }

    /* Slides */

    .slides {
      position: absolute;
      inset: 0;
      display: flex;
      gap: var(--slide-gap);
      overflow-x: auto;
      overflow-y: hidden;
      outline: none;
      overscroll-behavior: contain;
      scroll-snap-type: x mandatory;
      scrollbar-width: none;

      /* Horizontal swipes stay native. Vertical drags and pinches are handled in script. */
      touch-action: pan-x;

      &::-webkit-scrollbar {
        display: none;
      }
    }

    .zoomed .slides {
      overflow: hidden;
      touch-action: none;
    }

    .slide {
      flex: 0 0 100%;
      display: grid;
      box-sizing: border-box;
      min-width: 0;
      padding: calc(var(--control-size) + var(--spacing) * 2) var(--spacing)
        calc(var(--spacing) + var(--caption-space) + var(--thumbnails-space));
      scroll-snap-align: center;
      scroll-snap-stop: always;

      /* Keeps zoomed media from adding to the scrollable width. */
      overflow: clip;
    }

    .frame {
      display: grid;
      place-items: center;
      min-width: 0;
      min-height: 0;
      container-type: size;
    }

    /* The largest box with the media's ratio that fits the frame, capped at its natural width. */
    .media {
      position: relative;
      width: min(100cqw, calc(100cqh * var(--ratio)), var(--natural-width));
      aspect-ratio: var(--ratio);
      border-radius: var(--media-border-radius);
      overflow: clip;
      cursor: zoom-in;

      /* Keeps the image's stacking inside the slide so the controls stay on top. */
      isolation: isolate;
      transform-origin: center;

      &:has(video, slot) {
        cursor: auto;
      }

      &.settling {
        transition: transform 250ms cubic-bezier(0.2, 0, 0, 1);
      }

      & :is(img, video) {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: contain;
      }

      & video {
        background: black;
      }

      /* Images stay hidden until decoded, then fade in over the placeholder. */
      & img {
        position: relative;
        z-index: 1;
        opacity: 0;
        transition: opacity var(--wa-transition-normal) ease;
        user-select: none;
        -webkit-user-drag: none;

        &.ready {
          opacity: 1;
        }
      }
    }

    /* Hidden while its copy animates to or from the thumbnail. Nothing fades in behind the copy. */
    .media.morphing {
      visibility: hidden;

      & :is(img, .placeholder) {
        transition: none;
      }
    }

    /* Custom content fills its slide. A single child stretches to fit. */
    ::slotted([data-lightbox-content]) {
      display: grid;
      width: 100%;
      height: 100%;
    }

    /* The thumbnail stands in for the full-size image while it loads. */
    .placeholder {
      position: absolute;
      inset: 0;
      background: center / cover no-repeat;
    }

    /* Hidden after the fade so it can't show through a transparent image. */
    img.ready ~ .placeholder {
      visibility: hidden;
      transition: visibility 0s var(--wa-transition-normal);
    }

    :host([without-zoom]) .media {
      cursor: auto;
    }

    .zoomed .media {
      cursor: grab;
    }

    :is(.zoomed, .pulling) .media,
    .media.settling {
      will-change: transform;
    }

    /* Images that have been shown before skip the fade. */
    .media img.instant,
    img.instant ~ .placeholder {
      transition: none;
    }

    .error-message {
      position: absolute;
      inset: 0;
      z-index: 2;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--wa-space-xs);
      background: rgb(0 0 0 / 0.6);
      font-size: var(--wa-font-size-s);

      & wa-icon {
        font-size: var(--wa-font-size-2xl);
      }
    }

    /* A copy of the previous image that fades out when cutting to another slide. */
    .departing {
      position: fixed;
      border-radius: var(--media-border-radius);
      object-fit: cover;
      pointer-events: none;
    }

    /* The copy of the image that animates between the thumbnail and the slide. */
    .ghost {
      position: fixed;
      inset: 0;
      pointer-events: none;

      & img {
        position: absolute;
        object-fit: cover;
        transform-origin: center;
        will-change: transform;
      }
    }

    /* Controls */

    .chrome {
      position: absolute;
      inset: 0;
      display: grid;
      grid-template-columns: auto 1fr auto;
      grid-template-rows: auto 1fr auto;
      box-sizing: border-box;
      padding: env(safe-area-inset-top, 0px) env(safe-area-inset-right, 0px) env(safe-area-inset-bottom, 0px)
        env(safe-area-inset-left, 0px);
      pointer-events: none;
    }

    .toolbar {
      grid-area: 1 / 1 / 2 / -1;
      display: flex;
      align-items: center;
      gap: var(--wa-space-xs);
      padding: var(--spacing);
    }

    .counter {
      padding: var(--wa-space-2xs) var(--wa-space-s);
      border-radius: var(--wa-border-radius-pill);
      background: var(--control-fill);
      font-size: var(--wa-font-size-s);
      transition: background var(--wa-transition-fast) ease;
      font-variant-numeric: tabular-nums;
      unicode-bidi: isolate;
    }

    .spacer {
      flex: 1 1 auto;
    }

    .control,
    .caption,
    .thumbnails,
    ::slotted([slot='actions']) {
      pointer-events: auto;
    }

    /* Slotted actions match the built-in controls. Buttons read these tokens, and page styles can override them. */
    ::slotted([slot='actions']) {
      --wa-form-control-height: var(--control-size);
      --wa-form-control-border-radius: var(--wa-border-radius-pill);
      --wa-form-control-padding-inline: 0.875em;
      --wa-color-fill-loud: var(--control-fill);
      --wa-color-fill-normal: var(--control-fill);
      --wa-color-fill-quiet: var(--control-fill);
      --wa-color-border-loud: transparent;
      --wa-color-border-normal: transparent;
      --wa-color-border-quiet: transparent;
      --wa-color-on-loud: var(--controls-color);
      --wa-color-on-normal: var(--controls-color);
      --wa-color-on-quiet: var(--controls-color);
      --wa-color-mix-hover: var(--controls-color) 20%;
      --wa-color-mix-active: var(--controls-color) 30%;
      --wa-focus-ring: solid 2px var(--controls-color);
      --wa-focus-ring-offset: 2px;
    }

    /* Native buttons and links have no tokens to read, so they're styled directly. */
    ::slotted(:is(button, a)[slot='actions']) {
      display: inline-grid;
      place-items: center;
      box-sizing: border-box;
      min-width: var(--control-size);
      height: var(--control-size);
      margin: 0;
      padding: 0 0.75em;
      border: solid 1px transparent;
      border-radius: var(--wa-border-radius-pill);
      background: var(--control-fill);
      color: var(--controls-color);
      font: inherit;
      text-decoration: none;
      cursor: pointer;
    }

    .control {
      flex: 0 0 auto;
      display: grid;
      place-items: center;
      width: var(--control-size);
      height: var(--control-size);
      margin: 0;
      padding: 0;
      border: solid 1px transparent;
      border-radius: var(--wa-border-radius-circle);
      background: var(--control-fill);
      color: inherit;
      font: inherit;
      cursor: pointer;
      transition: background var(--wa-transition-fast) ease;
      -webkit-tap-highlight-color: transparent;

      /* The hover tint goes over the backing, so the icon keeps its contrast with the media behind it. */
      &:hover {
        background: color-mix(in oklab, var(--controls-color) 20%, var(--control-fill));
      }

      &[aria-disabled='true'] {
        opacity: 0.4;
        cursor: default;

        &:hover {
          background: var(--control-fill);
        }
      }
    }

    /* A two-tone ring stays visible over light and dark images. */
    :is(.control, .thumbnail):focus-visible {
      outline: solid 2px var(--controls-color);
      outline-offset: 2px;
      box-shadow: 0 0 0 4px black;
    }

    @media (pointer: coarse) {
      /* A comfortable touch target. */
      .dialog {
        --control-size: 2.75rem;
      }

      /* Swiping, pinching, and double tapping replace these on touch screens. */
      .zoom,
      .navigation {
        display: none;
      }
    }

    /* On short screens, like a phone on its side, the controls overlay the media. */
    @media (max-height: 30rem) {
      .dialog {
        --control-fill: var(--controls-background);
        --navigation-fill: var(--controls-background);
      }

      .slide {
        padding-block: var(--spacing) calc(var(--spacing) + var(--thumbnails-space));
      }

      .caption {
        padding: var(--wa-space-2xs) var(--wa-space-s);
        border-radius: var(--wa-border-radius-m);
        background: var(--controls-background);
      }
    }

    @media (forced-colors: active) {
      .backdrop {
        background: Canvas;
      }
    }

    .navigation {
      align-self: center;
      margin-inline: var(--spacing);
      background: var(--navigation-fill);

      &:hover {
        background: color-mix(in oklab, var(--controls-color) 20%, var(--navigation-fill));
      }

      &[aria-disabled='true']:hover {
        background: var(--navigation-fill);
      }

      &.previous {
        grid-area: 2 / 1;
      }

      &.next {
        grid-area: 2 / 3;
      }
    }

    .footer {
      grid-area: 3 / 1 / 4 / -1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--spacing);
      min-width: 0;
      padding: var(--spacing);
    }

    .caption {
      max-width: 70ch;
      font-size: var(--wa-font-size-m);
      line-height: var(--wa-line-height-condensed);
      text-align: center;
      text-wrap: balance;
    }

    /* Hidden while zoomed, where they would be unreadable over the image. */
    .caption,
    .thumbnails {
      transition:
        opacity var(--wa-transition-normal) ease,
        visibility 0s;
    }

    .zoomed :is(.caption, .thumbnails) {
      opacity: 0;
      visibility: hidden;
      transition:
        opacity var(--wa-transition-normal) ease,
        visibility 0s var(--wa-transition-normal);
    }

    .thumbnails {
      position: relative;
      display: flex;
      gap: var(--wa-space-xs);
      max-width: 100%;
      padding: 4px;
      overflow-x: auto;
      scrollbar-width: none;

      &::-webkit-scrollbar {
        display: none;
      }
    }

    .thumbnail {
      flex: 0 0 auto;
      width: var(--thumbnail-size);
      height: var(--thumbnail-size);
      margin: 0;
      padding: 0;
      border: none;
      border-radius: var(--wa-border-radius-s);
      background: black;
      overflow: hidden;
      cursor: pointer;

      /* Centers the strip without clipping it when it overflows. */
      &:first-child {
        margin-inline-start: auto;
      }

      &:last-child {
        margin-inline-end: auto;
      }

      & img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        opacity: 0.5;
        transition: opacity var(--wa-transition-fast) ease;
      }

      &:hover img {
        opacity: 0.8;
      }

      &[aria-selected='true'] {
        outline: solid 2px var(--controls-color);
        outline-offset: 1px;

        & img {
          opacity: 1;
        }
      }
    }

    /* The selected thumbnail already has a ring, so focus needs its own. */
    .thumbnail:focus-visible {
      outline: solid 3px var(--wa-color-focus);
      outline-offset: 2px;
      box-shadow: none;
    }

    @media (prefers-reduced-motion: reduce) {
      .media.settling,
      .media img,
      .caption,
      .thumbnails,
      .backdrop,
      .chrome {
        transition: none;
      }
    }
  }
`;
