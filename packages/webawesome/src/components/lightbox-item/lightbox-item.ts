import { html, type PropertyValues } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import '../icon/icon.js';
import styles from './lightbox-item.styles.js';

/**
 * @summary Lightbox items represent the individual images and videos shown in a lightbox. Each one wraps the
 *  thumbnail that opens it.
 * @documentation https://webawesome.com/docs/components/lightbox-item
 * @status experimental
 * @since 3.15
 *
 * @dependency wa-icon
 *
 * @slot - The item's thumbnail, usually an `<img>`. Clicking it opens the lightbox at this item. Leave it empty to
 *  add an item that only appears in the lightbox. To show your own content in the lightbox, such as a video player
 *  or an embed, add it in a `<template>`.
 * @slot play-icon - Optional play icon to use instead of the default. Works best with `<wa-icon>`.
 *
 * @csspart trigger - The link that wraps the thumbnail and opens the lightbox.
 * @csspart play-button - The play button shown over a video's thumbnail.
 *
 * @cssstate active - Applied when this is the current item in an open lightbox.
 * @cssstate empty - Applied when nothing is slotted in. Empty items aren't displayed on the page.
 */
@customElement('wa-lightbox-item')
export default class WaLightboxItem extends WebAwesomeElement {
  static css = styles;

  @query('.trigger') trigger: HTMLAnchorElement;
  @query('slot') defaultSlot: HTMLSlotElement;

  @state() private hasOnlyDecorativeImage = false;

  /** The kind of media the item shows in the lightbox. Videos show a play button over their thumbnail. */
  @property({ reflect: true }) type: 'image' | 'video' = 'image';

  /**
   * The URL of the full-size image or video. The thumbnail links to it, so the item still works without JavaScript
   * and when opened in a new tab.
   */
  @property() src = '';

  /** A set of image sources for the full-size image, in the same format as the `<img>` `srcset` attribute. */
  @property() srcset = '';

  /**
   * The `sizes` to use with `srcset`. When omitted, the lightbox uses the viewport width, and the zoomed width once
   * the image is zoomed in.
   */
  @property() sizes = '';

  /** Alternative text for the full-size media. Defaults to the slotted thumbnail's `alt`. */
  @property() alt = '';

  /** A plain text caption to show with the item in the lightbox. */
  @property() caption = '';

  /**
   * The URL of a thumbnail to use in the lightbox's thumbnail strip and as a placeholder while the full-size media
   * loads. Only needed when no `<img>` is slotted in.
   */
  @property() thumbnail = '';

  /**
   * The intrinsic width of the full-size media in pixels. Set this with `height` so the lightbox can size the slide
   * before the media loads.
   */
  @property({ type: Number }) width: number;

  /** The intrinsic height of the full-size media in pixels. */
  @property({ type: Number }) height: number;

  firstUpdated(changedProperties: PropertyValues<typeof this>) {
    super.firstUpdated(changedProperties);
    this.handleSlotChange();
  }

  updated(changedProperties: PropertyValues<typeof this>) {
    super.updated(changedProperties);

    // The lightbox renders its slides from the item's properties. It may not be defined yet.
    this.closest('wa-lightbox')?.requestUpdate?.();
  }

  /** @internal The slotted thumbnail image, if there is one. */
  get thumbnailElement(): HTMLImageElement | null {
    return this.querySelector('img');
  }

  /** @internal The URL of the item's thumbnail, from the slotted image or the `thumbnail` attribute. */
  get thumbnailSrc(): string {
    const image = this.thumbnailElement;
    return image?.currentSrc || image?.src || this.thumbnail;
  }

  /** @internal A template holding custom content to show in the lightbox in place of an image or video. */
  get contentTemplate(): HTMLTemplateElement | null {
    return this.querySelector(':scope > template');
  }

  /** @internal The alt text to use in the lightbox. */
  get resolvedAlt(): string {
    return this.alt || this.thumbnailElement?.alt || '';
  }

  /** Sets focus on the item's trigger. */
  focus(options?: FocusOptions) {
    this.trigger?.focus(options);
  }

  private handleSlotChange() {
    const hasContent = this.defaultSlot
      .assignedNodes({ flatten: true })
      .some(node =>
        node.nodeType === Node.ELEMENT_NODE
          ? (node as Element).localName !== 'template'
          : Boolean(node.textContent?.trim()),
      );

    this.customStates.set('empty', !hasContent);
    this.hasOnlyDecorativeImage = this.thumbnailElement?.alt === '' && !this.textContent?.trim();
  }

  /** Without a URL the trigger isn't a real link, so it needs the keyboard behavior of a button. */
  private handleKeyDown(event: KeyboardEvent) {
    if (!this.src && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      this.trigger.click();
    }
  }

  render() {
    // A thumbnail with alt="" and no text around it leaves the link without a name, so the item's own alt names it
    const label = this.hasOnlyDecorativeImage && this.alt ? this.alt : undefined;

    return html`
      <a
        part="trigger"
        class="trigger"
        href=${ifDefined(this.src || undefined)}
        role=${ifDefined(this.src ? undefined : 'button')}
        tabindex=${ifDefined(this.src ? undefined : '0')}
        aria-haspopup="dialog"
        aria-label=${ifDefined(label)}
        @keydown=${this.handleKeyDown}
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
        <span part="play-button" class="play-button" ?hidden=${this.type !== 'video'}>
          <slot name="play-icon"><wa-icon library="system" name="play"></wa-icon></slot>
        </span>
      </a>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-lightbox-item': WaLightboxItem;
  }
}
