import { css } from 'lit';

export default css`
  @layer wa-component {
    :host {
      --comment-color: light-dark(var(--wa-color-gray-50), var(--wa-color-gray-60));
      --keyword-color: light-dark(var(--wa-color-indigo-40), var(--wa-color-indigo-70));
      --operator-color: light-dark(var(--wa-color-gray-30), var(--wa-color-gray-80));
      --string-color: light-dark(var(--wa-color-green-40), var(--wa-color-green-70));
      --constant-color: light-dark(var(--wa-color-orange-40), var(--wa-color-orange-70));
      --function-color: light-dark(var(--wa-color-purple-40), var(--wa-color-purple-70));
      --type-color: light-dark(var(--wa-color-cyan-40), var(--wa-color-cyan-70));
      --variable-color: light-dark(var(--wa-color-yellow-40), var(--wa-color-yellow-70));
      --property-color: light-dark(var(--wa-color-blue-40), var(--wa-color-blue-70));
      --tag-color: light-dark(var(--wa-color-red-40), var(--wa-color-red-70));
      --selector-color: light-dark(var(--wa-color-purple-40), var(--wa-color-purple-70));
      --inserted-color: light-dark(var(--wa-color-green-40), var(--wa-color-green-70));
      --deleted-color: light-dark(var(--wa-color-red-40), var(--wa-color-red-70));

      display: block;
      position: relative;
    }

    pre {
      margin: 0;
      padding: var(--wa-space-m);
      overflow: auto;
      background-color: var(--wa-color-neutral-fill-quiet);
      border-radius: var(--wa-border-radius-m);
      color: var(--wa-color-text-normal);
      font-family: var(--wa-font-family-code);
      font-size: var(--wa-font-size-s);
      line-height: var(--wa-line-height-normal);
      tab-size: 2;
      hyphens: none;

      /* Code is always left-to-right, even in RTL documents */
      direction: ltr;
      text-align: left;

      /* Prevent mobile Safari from enlarging text when the block is wider than the viewport */
      -webkit-text-size-adjust: 100%;

      &:focus {
        outline: none;
      }

      &:focus-visible {
        outline: var(--wa-focus-ring);
        outline-offset: calc(-1 * var(--wa-focus-ring-width)); /* inside, since the pre clips overflow */
      }
    }

    :host([wrap]) pre {
      white-space: pre-wrap;
      overflow-wrap: break-word;
    }

    /* Room for the copy button, whose width is 0.8 of the form control height at the host's font size. This resolves
       at the pre's smaller font size instead, so the gap to the button is a few pixels under --wa-space-m. */
    :host(:not([without-copy])) pre {
      padding-inline-end: calc(var(--wa-space-2xs) + var(--wa-form-control-height) * 0.8 + var(--wa-space-m));
    }

    code {
      font: inherit;
    }

    [part~='copy-button'] {
      position: absolute;
      inset-block-start: var(--wa-space-2xs);
      inset-inline-end: var(--wa-space-2xs);
    }

    /* The block's own fill, so the button occludes code it sits over instead of overlapping it */
    [part~='copy-button']::part(button) {
      background-color: var(--wa-color-neutral-fill-quiet);
    }

    [part~='copy-button']::part(button):hover,
    [part~='copy-button']::part(button):focus-visible {
      background-color: var(--wa-color-neutral-fill-normal);
    }

    /* Reveal the copy button on hover and focus when the device can hover */
    @media (hover: hover) {
      [part~='copy-button'] {
        opacity: 0;
        transition: opacity var(--wa-transition-fast) var(--wa-transition-easing);
      }

      :host(:hover) [part~='copy-button'],
      :host(:focus-within) [part~='copy-button'] {
        opacity: 1;
      }
    }

    /* Token colors. Category names come from getCategory() in internal/textmate.ts. */
    ::highlight(wa-comment),
    ::highlight(wa-quote) {
      color: var(--comment-color);
    }

    ::highlight(wa-keyword),
    ::highlight(wa-storage),
    ::highlight(wa-at-rule),
    ::highlight(wa-doctype),
    ::highlight(wa-important),
    ::highlight(wa-section) {
      color: var(--keyword-color);
    }

    ::highlight(wa-operator),
    ::highlight(wa-punctuation) {
      color: var(--operator-color);
    }

    ::highlight(wa-string),
    ::highlight(wa-regexp),
    ::highlight(wa-attribute-value),
    ::highlight(wa-link),
    ::highlight(wa-raw) {
      color: var(--string-color);
    }

    ::highlight(wa-numeric),
    ::highlight(wa-boolean),
    ::highlight(wa-constant),
    ::highlight(wa-symbol),
    ::highlight(wa-character-entity),
    ::highlight(wa-anchor),
    ::highlight(wa-entity) {
      color: var(--constant-color);
    }

    ::highlight(wa-function),
    ::highlight(wa-decorator),
    ::highlight(wa-animation) {
      color: var(--function-color);
    }

    ::highlight(wa-type),
    ::highlight(wa-support) {
      color: var(--type-color);
    }

    ::highlight(wa-variable),
    ::highlight(wa-interpolation) {
      color: var(--variable-color);
    }

    ::highlight(wa-property),
    ::highlight(wa-key),
    ::highlight(wa-attribute-name) {
      color: var(--property-color);
    }

    ::highlight(wa-tag) {
      color: var(--tag-color);
    }

    ::highlight(wa-selector) {
      color: var(--selector-color);
    }

    ::highlight(wa-inserted) {
      color: var(--inserted-color);
    }

    ::highlight(wa-deleted) {
      color: var(--deleted-color);
    }
  }
`;
