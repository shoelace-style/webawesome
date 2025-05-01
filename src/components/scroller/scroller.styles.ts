import { css } from 'lit';

export default css`
  :host {
    --edge-color: var(--wa-color-neutral-border-soft);
    --edge-width: var(--wa-border-width-s);
    --shadow-color: var(--wa-color-text-normal);
    --shadow-opacity: 10%;
    --shadow-width: 0.5rem;

    display: block;
    position: relative;
    max-width: 100%;
  }

  :host([orientation='vertical']) {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  #content {
    border-radius: inherit;
    scroll-behavior: smooth;
    scrollbar-width: thin;

    /* Prevent text in mobile Safari from being larger when the container width larger than the viewport */
    -webkit-text-size-adjust: 100%;

    &:focus {
      outline: none;
    }

    &:focus-visible {
      outline: var(--wa-focus-ring);
      outline-offset: var(--wa-focus-ring-offset);
    }
  }

  :host([orientation='horizontal']) #content {
    overflow-x: auto;
    overflow-y: hidden;
  }

  :host([orientation='vertical']) #content {
    flex: 1 1 auto;
    min-height: 0; /* This is crucial for flex children to respect overflow */
    overflow-x: hidden;
    overflow-y: auto;
  }

  #scroll-left {
    position: absolute;
    top: calc(50% - var(--quiet-form-control-height-md) / 2);
    left: 0.5em;
  }

  #scroll-right {
    position: absolute;
    top: calc(50% - var(--quiet-form-control-height-md) / 2);
    right: 0.5em;
  }

  /* Horizontal shadows */
  :host([orientation='horizontal']) {
    #start-shadow,
    #end-shadow {
      z-index: 1;
      position: absolute;
      top: 0;
      bottom: 0;
      width: var(--shadow-width);
      isolation: isolate;

      /* Add mask for top/bottom fade */
      mask-image: linear-gradient(
        to bottom,
        transparent 0%,
        var(--shadow-color) 5%,
        var(--shadow-color) 95%,
        transparent 100%
      );
      pointer-events: none;
    }

    #start-shadow {
      &:dir(ltr) {
        left: 0;
        border-left: solid var(--edge-width)
          color-mix(in oklab, var(--edge-color) calc(var(--start-shadow-opacity) * 100%), transparent);
        background: linear-gradient(
          to right,
          color-mix(
              in srgb,
              var(--shadow-color) calc(min(1, var(--start-shadow-opacity)) * var(--shadow-opacity)),
              transparent
            )
            0%,
          transparent 100%
        );
      }

      &:dir(rtl) {
        right: 0;
        border-right: solid var(--edge-width)
          color-mix(in oklab, var(--edge-color) calc(var(--start-shadow-opacity) * 100%), transparent);
        background: linear-gradient(
          to left,
          color-mix(
              in srgb,
              var(--shadow-color) calc(min(1, var(--start-shadow-opacity)) * var(--shadow-opacity)),
              transparent
            )
            0%,
          transparent 100%
        );
      }
    }

    #end-shadow {
      &:dir(ltr) {
        right: 0;
        border-right: solid var(--edge-width)
          color-mix(in oklab, var(--edge-color) calc(var(--end-shadow-opacity) * 100%), transparent);
        background: linear-gradient(
          to left,
          color-mix(
              in srgb,
              var(--shadow-color) calc(min(1, var(--end-shadow-opacity)) * var(--shadow-opacity)),
              transparent
            )
            0%,
          transparent 100%
        );
      }

      &:dir(rtl) {
        left: 0;
        border-left: solid var(--edge-width)
          color-mix(in oklab, var(--edge-color) calc(var(--end-shadow-opacity) * 100%), transparent);
        background: linear-gradient(
          to right,
          color-mix(
              in srgb,
              var(--shadow-color) calc(min(1, var(--end-shadow-opacity)) * var(--shadow-opacity)),
              transparent
            )
            0%,
          transparent 100%
        );
      }
    }
  }

  /* Vertical shadows */
  :host([orientation='vertical']) {
    #start-shadow,
    #end-shadow {
      z-index: 1;
      position: absolute;
      right: 0;
      left: 0;
      height: var(--shadow-width);
      isolation: isolate;

      /* Add mask for left/right fade */
      mask-image: linear-gradient(
        to right,
        transparent 0%,
        var(--shadow-color) 5%,
        var(--shadow-color) 95%,
        transparent 100%
      );
      pointer-events: none;
    }

    #start-shadow {
      top: 0;
      border-top: solid var(--edge-width)
        color-mix(in oklab, var(--edge-color) calc(var(--start-shadow-opacity) * 100%), transparent);
      background: linear-gradient(
        to bottom,
        color-mix(
            in srgb,
            var(--shadow-color) calc(min(1, var(--start-shadow-opacity)) * var(--shadow-opacity)),
            transparent
          )
          0%,
        transparent 100%
      );
    }

    #end-shadow {
      bottom: 0;
      border-bottom: solid var(--edge-width)
        color-mix(in oklab, var(--edge-color) calc(var(--end-shadow-opacity) * 100%), transparent);
      background: linear-gradient(
        to top,
        color-mix(
            in srgb,
            var(--shadow-color) calc(min(1, var(--end-shadow-opacity)) * var(--shadow-opacity)),
            transparent
          )
          0%,
        transparent 100%
      );
    }
  }
`;
