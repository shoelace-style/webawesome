import { html, isServer, type PropertyValues } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { styleMap } from 'lit/directives/style-map.js';
import { WaAfterHideEvent } from '../../events/after-hide.js';
import { WaAfterShowEvent } from '../../events/after-show.js';
import { WaHideEvent } from '../../events/hide.js';
import { WaItemChangeEvent } from '../../events/item-change.js';
import { WaShowEvent } from '../../events/show.js';
import { animate, parseDuration, prefersReducedMotion } from '../../internal/animate.js';
import { isTopDismissible, registerDismissible, unregisterDismissible } from '../../internal/dismissible-stack.js';
import { clamp } from '../../internal/math.js';
import { parseSpaceDelimitedTokens } from '../../internal/parse.js';
import { lockBodyScrolling, unlockBodyScrolling } from '../../internal/scroll.js';
import '../../internal/scrollend-polyfill.js';
import { watch } from '../../internal/watch.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import visuallyHidden from '../../styles/component/visually-hidden.styles.js';
import { LocalizeController } from '../../utilities/localize.js';
import '../icon/icon.js';
import '../lightbox-item/lightbox-item.js';
import type WaLightboxItem from '../lightbox-item/lightbox-item.js';
import styles from './lightbox.styles.js';

const MORPH_EASING = 'cubic-bezier(0.2, 0, 0, 1)';
const DRAG_SLOP = 10; // px a pointer can move before a tap becomes a drag
const DOUBLE_TAP_DELAY = 300; // ms
const DOUBLE_TAP_ZOOM = 2.5;
const PULL_DISTANCE = 120; // px needed to dismiss
const KEYBOARD_PAN = 50; // px per arrow key press
const CROSSFADE_DURATION = 250; // ms

const nextFrame = () => new Promise<void>(resolve => requestAnimationFrame(() => resolve()));

/** Safari's proprietary trackpad pinch event. */
interface GestureEvent extends UIEvent {
  scale: number;
  clientX: number;
  clientY: number;
}

/**
 * @summary Lightboxes show images and videos in a full-screen viewer that opens from their thumbnails. Use them for
 *  photo galleries, product images, or any media that deserves a closer look.
 * @documentation https://webawesome.com/docs/components/lightbox
 * @status experimental
 * @since 3.15
 *
 * @dependency wa-icon
 * @dependency wa-lightbox-item
 *
 * @slot - One or more `<wa-lightbox-item>` elements, along with any markup you need to lay them out.
 * @slot actions - Extra buttons to show in the lightbox's toolbar, such as download or share. Works best with
 *  `<wa-button>`, which is styled to match the built-in controls.
 * @slot close-icon - Optional close icon to use instead of the default. Works best with `<wa-icon>`.
 * @slot previous-icon - Optional previous icon to use instead of the default. Works best with `<wa-icon>`.
 * @slot next-icon - Optional next icon to use instead of the default. Works best with `<wa-icon>`.
 * @slot zoom-in-icon - Optional icon to show on the zoom button when the image can be zoomed in. Works best with
 *  `<wa-icon>`.
 * @slot zoom-out-icon - Optional icon to show on the zoom button when the image is zoomed in. Works best with
 *  `<wa-icon>`.
 *
 * @event wa-show - Emitted when the lightbox opens.
 * @event wa-after-show - Emitted after the lightbox opens and all animations are complete.
 * @event {{ source: Element }} wa-hide - Emitted when the lightbox is requested to close. Calling
 *  `event.preventDefault()` will prevent the lightbox from closing. You can inspect `event.detail.source` to see
 *  which element caused the lightbox to close. If the source is the lightbox's internal dialog, the user has pressed
 *  [[Escape]], clicked the backdrop, pulled the media up or down, or the lightbox has been closed programmatically.
 * @event wa-after-hide - Emitted after the lightbox closes and all animations are complete.
 * @event {{ index: number, previousIndex: number, item: WaLightboxItem, previousItem: WaLightboxItem | null }} wa-item-change
 *  - Emitted when the current item changes.
 *
 * @csspart dialog - The lightbox's internal `<dialog>` element.
 * @csspart backdrop - The backdrop behind the media.
 * @csspart scroll-container - The scroll container that holds the slides.
 * @csspart slide - A slide.
 * @csspart image - The full-size image in a slide.
 * @csspart video - The video in a slide.
 * @csspart toolbar - The toolbar at the top of the lightbox.
 * @csspart counter - The "3 of 12" counter.
 * @csspart zoom-button - The button that zooms the current image in and out.
 * @csspart close-button - The close button.
 * @csspart navigation-button - The previous and next buttons.
 * @csspart navigation-button-previous - Applied to the previous button.
 * @csspart navigation-button-next - Applied to the next button.
 * @csspart caption - The current item's caption.
 * @csspart thumbnails - The thumbnail strip.
 * @csspart thumbnail - A thumbnail in the strip.
 * @csspart thumbnail-active - Applied to the current item's thumbnail.
 *
 * @cssproperty [--backdrop-color=color-mix(in oklab, black 95%, transparent)] - The color of the backdrop.
 * @cssproperty [--backdrop-filter=none] - A filter to apply to the backdrop behind the lightbox.
 * @cssproperty [--show-duration=var(--wa-transition-slow)] - The animation duration when showing the lightbox.
 * @cssproperty [--hide-duration=var(--wa-transition-slow)] - The animation duration when hiding the lightbox.
 * @cssproperty [--spacing=clamp(var(--wa-space-m), 3vw, var(--wa-space-2xl))] - The space around the media, the
 *  caption, and the lightbox's controls. Grows with the viewport by default.
 * @cssproperty [--slide-gap=var(--wa-space-xl)] - The space between slides.
 * @cssproperty [--thumbnail-size=3.5rem] - The size of each thumbnail in the strip.
 *
 * @cssstate open - Applied when the lightbox is open.
 * @cssstate zoomed - Applied when the current image is zoomed in.
 */
@customElement('wa-lightbox')
export default class WaLightbox extends WebAwesomeElement {
  static css = [visuallyHidden, styles];

  private readonly localize = new LocalizeController(this);
  private mutationObserver?: MutationObserver;
  private originalTrigger: HTMLElement | null = null;
  private announcer: HTMLElement | null = null;
  private isClosing = false;
  private morphId = 0;
  private morphAnimations: Animation[] = [];
  private isReady = false; // open and safe to measure
  private hasRunSync = false;
  private hasSyncedItems = false;
  private lastItem: WaLightboxItem | null = null;
  private lastIndex = -1;

  // Scroll tracking
  private pitch = 0; // distance between slides, measured lazily
  private stageWidth = 0; // the scroll container's width when the current slide was last pinned
  private scrollFrame = 0;
  private indexFromScroll = false;
  private isJump = false; // the next index change cuts to its slide, even when it's adjacent
  private departing: { src: string; rect: DOMRect } | null = null; // the image a cut is fading out from
  private isProgrammaticScroll = false;
  private scrollOrigin = 0; // where the last programmatic scroll started
  private visibleFrom = 0; // the range of slides that are at least partly on screen
  private visibleTo = 0;

  // What's known about each item's media once it loads
  private naturalSizes = new WeakMap<WaLightboxItem, { width: number; height: number }>();
  private failedItems = new WeakSet<WaLightboxItem>();
  private loadedItems = new WeakSet<WaLightboxItem>();

  // Custom content. Each item's template is copied into a light DOM child of the lightbox so it keeps the page's
  // styles, then slotted into its slide.
  private contentContainers = new Map<WaLightboxItem, HTMLElement>();
  private contentSlots = new WeakMap<WaLightboxItem, string>();
  private contentCount = 0;

  // Zoom, pan, and pull state. These stay out of Lit's reactivity so gestures never cause a render.
  private scale = 1;
  private x = 0;
  private y = 0;
  private activeMedia: HTMLElement | null = null;
  private fitRect: DOMRect | null = null; // the active media's box at rest
  private stageRect: DOMRect | null = null;
  private transformFrame = 0;
  private gesture: 'pan' | 'pull' | 'pinch' | null = null;
  private pointer: {
    id: number;
    startX: number;
    startY: number;
    lastX: number;
    lastY: number;
    lastTime: number;
    velocityY: number; // px per ms, weighted toward the most recent movement
  } | null = null;
  private pinch = { distance: 0, scale: 1, x: 0, y: 0 };
  private gestureScale = 1;
  private didDrag = false;
  private downOnMedia = false;
  private lastTap = { time: 0, x: 0, y: 0 };

  @query('.dialog') dialog: HTMLDialogElement;
  @query('.backdrop') backdrop: HTMLElement;
  @query('.slides') slides: HTMLElement;
  @query('.chrome') chrome: HTMLElement;
  @query('.ghost') ghost: HTMLElement;
  @query('.ghost img') ghostImage: HTMLImageElement;
  @query('.departing') departingImage: HTMLImageElement;
  @query('.thumbnails') thumbnails: HTMLElement;

  @state() private itemList: WaLightboxItem[] = [];
  @state() private hasOpened = false;
  @state() private isZoomed = false;

  /** Indicates whether or not the lightbox is open. Toggle this attribute to show and hide the lightbox. */
  @property({ type: Boolean, reflect: true }) open = false;

  /** The zero-based index of the current item. Set this before opening to choose which item the lightbox starts on. */
  @property({ type: Number, reflect: true }) index = 0;

  /** A label that describes the lightbox to assistive devices, e.g. "Vacation photos". */
  @property({ reflect: true }) label = '';

  /** Wraps around when navigating past the first or last item with the buttons or the keyboard. */
  @property({ type: Boolean, reflect: true }) loop = false;

  /** Shows a strip of thumbnails for jumping between items. */
  @property({ attribute: 'with-thumbnails', type: Boolean, reflect: true }) withThumbnails = false;

  /**
   * Hides the previous and next buttons. Swiping and the arrow keys still work. The buttons are always hidden on touch
   * screens, where swiping takes their place.
   */
  @property({ attribute: 'without-navigation', type: Boolean, reflect: true }) withoutNavigation = false;

  /** Hides the counter that shows the current item's position. */
  @property({ attribute: 'without-counter', type: Boolean, reflect: true }) withoutCounter = false;

  /** Disables zooming and removes the zoom button. */
  @property({ attribute: 'without-zoom', type: Boolean, reflect: true }) withoutZoom = false;

  /** The lightbox's items, in document order. */
  get items(): WaLightboxItem[] {
    return [...this.itemList];
  }

  /** The current item. Useful for download and share buttons in the `actions` slot. */
  get currentItem(): WaLightboxItem | undefined {
    return this.itemList[this.currentIndex];
  }

  /** The index, kept within the range of available items. */
  private get currentIndex() {
    return clamp(Math.round(this.index) || 0, 0, Math.max(0, this.itemList.length - 1));
  }

  private get currentMedia() {
    return this.shadowRoot?.querySelector<HTMLElement>(`.slide[data-index="${this.currentIndex}"] .media`) ?? null;
  }

  private get canZoom() {
    const item = this.currentItem;
    return (
      !this.withoutZoom &&
      Boolean(item) &&
      item!.type !== 'video' &&
      !item!.contentTemplate &&
      !this.failedItems.has(item!)
    );
  }

  /** The most the current image can be zoomed: its natural size, but never less than 2x. */
  private get maxZoom() {
    const item = this.currentItem;
    const naturalWidth = item ? item.width || this.naturalSizes.get(item)?.width || 0 : 0;
    return Math.max(2, naturalWidth && this.fitRect ? naturalWidth / this.fitRect.width : 3);
  }

  constructor() {
    super();

    if (!isServer) {
      this.addEventListener('click', this.handleHostClick);
    }
  }

  connectedCallback() {
    super.connectedCallback();

    if (isServer) return;

    this.updateComplete.then(() => {
      this.syncItems();

      // Items can live at any depth, so watch the whole subtree. Mutations inside a nested lightbox are ignored, and
      // so are the announcer's text changes, since reacting to them would disturb a swipe in progress.
      this.mutationObserver = new MutationObserver(mutations => {
        const isOurs = (target: Node) =>
          target !== this.announcer &&
          (target as Element).closest?.('wa-lightbox') === this &&
          !(target as Element).closest?.('[data-lightbox-content]');

        if (mutations.some(mutation => isOurs(mutation.target))) {
          this.syncItems();
        }
      });
      this.mutationObserver.observe(this, { childList: true, subtree: true });
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.mutationObserver?.disconnect();
    unlockBodyScrolling(this);
    this.removeOpenListeners();

    // Removed while open. Close fully so nothing is left half open if the lightbox is reconnected.
    if (this.dialog?.open) {
      this.dialog.close();
      this.open = false;
      this.isReady = false;
      this.isClosing = false;
      this.customStates.set('open', false);
      this.resetMorph();
      this.syncActiveItem();
    }
  }

  firstUpdated(changedProperties: PropertyValues<typeof this>) {
    super.firstUpdated(changedProperties);

    // These must be able to cancel the browser's own zooming and scrolling, so they can't be passive
    this.slides.addEventListener('wheel', this.handleWheel, { passive: false });
    this.slides.addEventListener('touchstart', this.handleTouchStart, { passive: false });
    this.slides.addEventListener('touchmove', this.handleTouchMove, { passive: false });
    this.slides.addEventListener('touchend', this.handleTouchEnd);
    this.slides.addEventListener('touchcancel', this.handleTouchEnd);
    this.slides.addEventListener('gesturestart', this.handleGestureStart, { passive: false });
    this.slides.addEventListener('gesturechange', this.handleGestureChange, { passive: false });

    new ResizeObserver(() => this.handleResize()).observe(this.slides);

    // Open without animating when the attribute is present on load
    if (this.open) {
      this.addOpenListeners();
      lockBodyScrolling(this);
      this.dialog.showModal();
      this.customStates.set('open', true);
      this.updateComplete.then(async () => {
        await nextFrame();
        this.isReady = true;
        this.scrollToIndex(this.currentIndex);
        this.syncActiveItem();
        this.announce();
        this.scrollThumbnailIntoView();
      });
    }
  }

  willUpdate(changedProperties: PropertyValues<typeof this>) {
    super.willUpdate(changedProperties);

    // Slides aren't rendered until the lightbox has been opened once
    if (this.open) {
      this.hasOpened = true;
    }

    // A cut to another slide crossfades from the image that's showing now, so capture it before it's gone
    if (changedProperties.has('index') && this.hasUpdated) {
      const isAdjacent = Math.abs(this.currentIndex - this.lastIndex) === 1;
      const isCut = this.isReady && !this.indexFromScroll && (this.isJump || !isAdjacent) && !prefersReducedMotion();
      this.departing = isCut ? this.getDepartingImage() : null;
    }

    // Zoom never carries over to another item
    if (changedProperties.has('index') || (changedProperties as Map<string, unknown>).has('itemList')) {
      this.resetZoom();
    }
  }

  updated(changedProperties: PropertyValues<typeof this>) {
    super.updated(changedProperties);

    this.syncContent();

    const hasItemListChanged = (changedProperties as Map<string, unknown>).has('itemList');
    if (!changedProperties.has('index') && !hasItemListChanged) return;

    const index = this.currentIndex;
    const item = this.currentItem ?? null;
    const isOpen = this.dialog.open && this.isReady;

    // Bring the slide into view, unless the user's own scrolling is what changed the index
    const hasMoved = index !== this.lastIndex || item !== this.lastItem;
    if (isOpen && hasMoved && !this.indexFromScroll) {
      // Finish a morph that's still running so its image doesn't sit over the slides as they move
      if (!this.ghost.hidden) {
        this.morphAnimations.forEach(animation => animation.finish());
      }

      const isAdjacent = item !== this.lastItem && Math.abs(index - this.lastIndex) === 1;
      const isSmooth = isAdjacent && !this.isJump && !prefersReducedMotion();
      this.scrollToIndex(index, isSmooth ? 'smooth' : 'instant');

      // Cuts go straight to the slide, since the ones in between have nothing loaded to scroll past, and crossfade
      // from the old image to the new one
      if (!isSmooth && item !== this.lastItem && !prefersReducedMotion()) {
        this.crossfade();
      }
    }
    this.indexFromScroll = false;
    this.isJump = false;
    this.departing = null;

    if (item !== this.lastItem) {
      const previousItem = this.lastItem;
      const previousIndex = this.lastIndex;
      this.lastItem = item;
      this.lastIndex = index;

      this.pauseVideos(previousItem);
      this.syncActiveItem();

      if (this.hasSyncedItems && item) {
        this.dispatchEvent(new WaItemChangeEvent({ index, previousIndex, item, previousItem }));
      }

      if (isOpen && item) {
        this.announce();
        this.scrollThumbnailIntoView();

        // Keep the item's thumbnail on screen behind the backdrop so the closing animation has a target
        if (!item.customStates.has('empty')) {
          item.scrollIntoView({ block: 'nearest', inline: 'nearest' });
        }
      }
    } else {
      this.lastIndex = index;
    }

    // Nothing left to show
    if (hasItemListChanged && this.hasSyncedItems && this.dialog.open && this.itemList.length === 0) {
      this.requestClose(this.dialog);
    }

    // Events start after the first real sync, so finding the initial items doesn't count as a change
    if (hasItemListChanged && this.hasRunSync) {
      this.hasSyncedItems = true;
    }
  }

  //
  // Items
  //

  private syncItems() {
    this.hasRunSync = true;
    const current = this.currentItem;
    const items = [...this.querySelectorAll('wa-lightbox-item')].filter(
      item => item.closest('wa-lightbox') === this && !item.closest('[data-lightbox-content]'),
    );

    // Only a real change to the list replaces it. Anything else, like an item's caption changing, just renders.
    const hasChanged = items.length !== this.itemList.length || items.some((item, i) => item !== this.itemList[i]);
    if (!hasChanged) {
      this.requestUpdate();
      return;
    }

    this.itemList = items;

    // Stay on the same item when others are added or removed before it
    const newIndex = current ? items.indexOf(current) : -1;
    if (newIndex > -1 && newIndex !== this.index) {
      this.index = newIndex;
    }
  }

  private syncActiveItem() {
    const current = this.currentItem;
    for (const item of this.itemList) {
      item.customStates.set('active', this.open && item === current);
    }
  }

  /** Stops anything that's playing. Embeds can't be paused from outside, so the item being left reloads its own. */
  private pauseVideos(leaving?: WaLightboxItem | null) {
    this.shadowRoot?.querySelectorAll('video').forEach(video => video.pause());

    for (const [item, container] of this.contentContainers) {
      for (const el of container.querySelectorAll<HTMLElement & { pause?: unknown; playing?: unknown }>('*')) {
        if (typeof el.pause === 'function') {
          el.pause();
        } else if ('playing' in el) {
          el.playing = false;
        } else if (el instanceof HTMLIFrameElement && (leaving === undefined || leaving === item)) {
          el.src = el.src; // eslint-disable-line no-self-assign
        }
      }
    }
  }

  private getContentSlot(item: WaLightboxItem) {
    if (!this.contentSlots.has(item)) {
      this.contentSlots.set(item, `content-${++this.contentCount}`);
    }
    return this.contentSlots.get(item)!;
  }

  /** Copies custom content into place for the slides that are showing or about to, and clears out what's gone. */
  private syncContent() {
    if (!this.hasOpened) return;

    const index = this.currentIndex;
    this.itemList.forEach((item, i) => {
      const template = item.contentTemplate;
      if (!template || Math.abs(i - index) > 1 || this.contentContainers.has(item)) return;

      const container = document.createElement('div');
      container.slot = this.getContentSlot(item);
      container.setAttribute('data-lightbox-content', '');
      container.append(template.content.cloneNode(true));
      this.append(container);
      this.contentContainers.set(item, container);
    });

    for (const [item, container] of this.contentContainers) {
      if (!this.itemList.includes(item) || !item.contentTemplate) {
        container.remove();
        this.contentContainers.delete(item);
      }
    }
  }

  //
  // Opening and closing
  //

  private addOpenListeners() {
    document.addEventListener('keydown', this.handleDocumentKeyDown);
    registerDismissible(this);
  }

  private removeOpenListeners() {
    document.removeEventListener('keydown', this.handleDocumentKeyDown);
    unregisterDismissible(this);
  }

  private getDuration(property: '--show-duration' | '--hide-duration') {
    return prefersReducedMotion() ? 0 : parseDuration(getComputedStyle(this).getPropertyValue(property));
  }

  @watch('open', { waitUntilFirstUpdate: true })
  handleOpenChange() {
    if (this.open && !this.dialog.open) {
      this.show();
    } else if (!this.open && this.dialog.open) {
      // Route programmatic closes through the cancelable hide path
      this.open = true;
      this.requestClose(this.dialog);
    }
  }

  private async show() {
    const showEvent = new WaShowEvent();
    this.dispatchEvent(showEvent);
    if (showEvent.defaultPrevented) {
      this.open = false;
      return;
    }

    this.originalTrigger = document.activeElement as HTMLElement;
    this.open = true;
    this.addOpenListeners();
    this.dialog.classList.add('preparing');

    // Locking first lets the browser restyle the page once for both changes instead of twice
    lockBodyScrolling(this);
    this.dialog.showModal();
    this.customStates.set('open', true);
    this.syncActiveItem();

    // Wait for the slides to render, then a frame more. Forcing layout right after showModal() can hang Firefox and
    // WebKit, so every measurement happens in here.
    await this.updateComplete;
    await nextFrame();
    if (!this.dialog.open || this.isClosing) return;

    this.isReady = true;
    this.pitch = 0;
    this.scrollToIndex(this.currentIndex);
    this.dialog.focus({ preventScroll: true });
    this.announce();
    this.scrollThumbnailIntoView();

    const duration = this.getDuration('--show-duration');
    const item = this.currentItem;
    const media = this.currentMedia;
    const thumbnail = item ? this.getVisibleThumbnail(item) : null;
    const fadeIn = (el: Element) => animate(el, [{ opacity: 0 }, { opacity: 1 }], { duration, easing: 'ease' });

    if (item && media && thumbnail && duration > 0) {
      const finish = await this.morph('open', item, media, thumbnail, duration, () => {
        this.dialog.classList.remove('preparing');
        fadeIn(this.backdrop);
        fadeIn(this.chrome);
      });
      if (finish) {
        finish();
      } else if (!this.isClosing) {
        // The thumbnail's image wasn't ready to animate
        this.dialog.classList.remove('preparing');
        await fadeIn(this.dialog);
      }
    } else {
      this.dialog.classList.remove('preparing');
      await fadeIn(this.dialog);
    }

    // Closed again before it finished opening
    if (this.isClosing || !this.dialog.open) return;

    this.dispatchEvent(new WaAfterShowEvent());
  }

  private async requestClose(source: Element) {
    if (this.isClosing) return;

    const hideEvent = new WaHideEvent({ source });
    this.dispatchEvent(hideEvent);

    if (hideEvent.defaultPrevented) {
      this.open = true;
      this.settle();
      return;
    }

    this.isClosing = true;
    this.isReady = false;
    this.morphId++; // abandons an open that hasn't started animating yet
    this.departingImage.hidden = true;
    this.removeOpenListeners();
    this.pauseVideos();

    // Nothing is visible yet while still preparing to open, so there's nothing to animate
    const duration = this.dialog.classList.contains('preparing') ? 0 : this.getDuration('--hide-duration');
    const item = this.currentItem;
    const media = this.currentMedia;
    const thumbnail = item ? this.getVisibleThumbnail(item) : null;
    const options: KeyframeAnimationOptions = { duration, easing: 'ease', fill: 'forwards' };
    let didMorph = false;

    if (item && media && thumbnail && duration > 0) {
      let fades: Promise<unknown>[] = [];
      const finish = await this.morph('close', item, media, thumbnail, duration, () => {
        // Fade from wherever a pull left the backdrop and controls
        fades = [this.backdrop, this.chrome].map(el =>
          animate(el, [{ opacity: getComputedStyle(el).opacity }, { opacity: 0 }], options),
        );
      });
      didMorph = Boolean(finish);
      await Promise.all(fades);
    }

    if (!didMorph) {
      await animate(this.dialog, [{ opacity: getComputedStyle(this.dialog).opacity }, { opacity: 0 }], options);
    }

    this.open = false;
    this.dialog.close();
    unlockBodyScrolling(this);
    this.customStates.set('open', false);

    // Put everything back for the next open
    this.resetMorph();
    for (const el of [this.dialog, this.backdrop, this.chrome]) {
      el.getAnimations().forEach(animation => animation.cancel());
      el.style.opacity = '';
    }
    this.dialog.classList.remove('pulling', 'preparing');
    this.resetZoom();
    this.syncActiveItem();
    this.isClosing = false;

    // Return focus to the current item's thumbnail, or to whatever opened the lightbox if it doesn't have one
    const focusTarget = item && !item.customStates.has('empty') ? item : this.originalTrigger;
    if (typeof focusTarget?.focus === 'function') {
      focusTarget.focus({ preventScroll: true });
    }

    this.dispatchEvent(new WaAfterHideEvent());
  }

  //
  // Morph
  //

  /** Returns the item's thumbnail image if it's on screen, the only time it can be animated to or from. */
  private getVisibleThumbnail(item: WaLightboxItem) {
    const thumbnail = item.thumbnailElement;
    const rect = thumbnail?.getBoundingClientRect();
    const isVisible =
      rect &&
      thumbnail!.complete &&
      thumbnail!.naturalWidth > 0 &&
      rect.width > 0 &&
      rect.height > 0 &&
      rect.bottom > 0 &&
      rect.right > 0 &&
      rect.top < window.innerHeight &&
      rect.left < window.innerWidth;

    return isVisible ? thumbnail : null;
  }

  /**
   * Animates a copy of the image between the item's thumbnail and its slide. The copy lives outside the scroll
   * container, which would clip it. Resolves when the animation ends with a function that restores everything, or
   * with null if it couldn't run and the caller should fade instead.
   */
  private async morph(
    direction: 'open' | 'close',
    item: WaLightboxItem,
    media: HTMLElement,
    thumbnail: HTMLImageElement,
    duration: number,
    onStart?: () => void,
  ): Promise<(() => void) | null> {
    // Read everything first. If another morph is still running, take over from wherever its image is now.
    const id = ++this.morphId;
    const isInFlight = !this.ghost.hidden;
    const mediaRect = isInFlight ? this.ghostImage.getBoundingClientRect() : media.getBoundingClientRect();
    const flightClip = isInFlight ? getComputedStyle(this.ghost).clipPath : 'none';
    const thumbnailRect = thumbnail.getBoundingClientRect();
    const thumbnailStyle = getComputedStyle(thumbnail);
    const radius = parseFloat(thumbnailStyle.borderTopLeftRadius) || 0;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const fullImage = media.querySelector('img');
    const src = fullImage?.classList.contains('ready') ? fullImage.currentSrc : item.thumbnailSrc;

    // Work out where the whole image sits relative to the thumbnail's box. A cover thumbnail only shows part of
    // it, so the image is larger than the box and the clip below hides the rest.
    // This assumes object-position is centered. Read it here if off-center crops need to line up.
    const ratio = mediaRect.width / mediaRect.height;
    const isWider = thumbnailRect.width / thumbnailRect.height > ratio;
    const fillsWidth = thumbnailStyle.objectFit === 'contain' ? !isWider : isWider;
    const imageWidth = fillsWidth ? thumbnailRect.width : thumbnailRect.height * ratio;
    const imageHeight = imageWidth / ratio;
    const centerX = (rect: DOMRect) => rect.left + rect.width / 2;
    const centerY = (rect: DOMRect) => rect.top + rect.height / 2;

    const atThumbnail =
      `translate(${centerX(thumbnailRect) - centerX(mediaRect)}px, ${centerY(thumbnailRect) - centerY(mediaRect)}px) ` +
      `scale(${imageWidth / mediaRect.width})`;
    const atMedia = 'translate(0px, 0px) scale(1)';

    // The clip is in viewport coordinates on an untransformed wrapper, so it tracks the thumbnail's box exactly
    const isCropped =
      radius > 0 || Math.abs(imageWidth - thumbnailRect.width) > 1 || Math.abs(imageHeight - thumbnailRect.height) > 1;
    const inset = (rect: DOMRect, round: number) =>
      `inset(${rect.top}px ${viewportWidth - rect.right}px ${viewportHeight - rect.bottom}px ${rect.left}px round ${round}px)`;
    const clipAtThumbnail = inset(thumbnailRect, radius);
    const clipAtMedia = flightClip !== 'none' ? flightClip : inset(mediaRect, 0);

    // Then write
    this.morphAnimations.forEach(animation => animation.cancel());
    const ghostImage = this.ghostImage;
    ghostImage.src = src;
    Object.assign(ghostImage.style, {
      left: `${mediaRect.left}px`,
      top: `${mediaRect.top}px`,
      width: `${mediaRect.width}px`,
      height: `${mediaRect.height}px`,
    });

    if (!isInFlight) {
      // The source is already loaded elsewhere on the page, so this is normally instant
      await Promise.race([ghostImage.decode().catch(() => {}), new Promise(resolve => setTimeout(resolve, 100))]);

      // Superseded while waiting, or there's no image to animate
      if (id !== this.morphId || !ghostImage.complete || !ghostImage.naturalWidth) return null;
    }

    this.ghost.hidden = false;
    media.classList.add('morphing');
    this.setMorphingItem(item);
    onStart?.();

    const isOpening = direction === 'open';
    const options: KeyframeAnimationOptions = { duration, easing: MORPH_EASING, fill: 'both' };
    const animations = [
      ghostImage.animate(
        [{ transform: isOpening ? atThumbnail : atMedia }, { transform: isOpening ? atMedia : atThumbnail }],
        options,
      ),
    ];

    if (isCropped || flightClip !== 'none') {
      animations.push(
        this.ghost.animate(
          [
            { clipPath: isOpening ? clipAtThumbnail : clipAtMedia },
            { clipPath: isOpening ? clipAtMedia : clipAtThumbnail },
          ],
          options,
        ),
      );
    }

    this.morphAnimations = animations;

    if (!isInFlight) {
      // Hold on the first keyframe for a frame. Firefox and WebKit otherwise start the clock before the first
      // paint and the image appears to jump off the thumbnail.
      animations.forEach(animation => animation.pause());
      await nextFrame();

      // Another morph took over during the wait and now owns the cleanup
      if (id !== this.morphId) {
        animations.forEach(animation => animation.cancel());
        return () => {};
      }

      // Anything no longer paused was finished early, e.g. by navigating
      animations.forEach(animation => animation.playState === 'paused' && animation.play());
    }

    await Promise.allSettled(animations.map(animation => animation.finished));

    return () => {
      if (id === this.morphId) this.resetMorph();
    };
  }

  /** Captures the image and position of the slide being left, including any zoom. */
  private getDepartingImage() {
    const media = this.shadowRoot?.querySelector<HTMLElement>(`.slide[data-index="${this.lastIndex}"] .media`);
    const image = media?.querySelector('img');
    const src = image?.classList.contains('ready') ? image.currentSrc : this.lastItem?.thumbnailSrc;

    return media && src ? { src, rect: media.getBoundingClientRect() } : null;
  }

  /** Fades the new slide in while a copy of the old image fades out over it. */
  private crossfade() {
    const options: KeyframeAnimationOptions = { duration: CROSSFADE_DURATION, easing: 'ease' };
    const image = this.departingImage;

    image.getAnimations().forEach(animation => animation.cancel());
    animate(this.slides, [{ opacity: 0 }, { opacity: 1 }], options);

    if (!this.departing) return;

    const { src, rect } = this.departing;
    image.src = src;
    Object.assign(image.style, {
      left: `${rect.left}px`,
      top: `${rect.top}px`,
      width: `${rect.width}px`,
      height: `${rect.height}px`,
    });
    image.hidden = false;
    animate(image, [{ opacity: 1 }, { opacity: 0 }], options).then(() => {
      // A newer crossfade may have taken the image over
      if (image.getAnimations().length === 0) image.hidden = true;
    });
  }

  /** Hides the animated copy and restores everything it was standing in for. */
  private resetMorph() {
    this.morphAnimations.forEach(animation => animation.cancel());
    this.morphAnimations = [];
    if (this.ghost) this.ghost.hidden = true;
    if (this.departingImage) this.departingImage.hidden = true;
    this.shadowRoot?.querySelectorAll('.media.morphing').forEach(media => media.classList.remove('morphing'));
    this.setMorphingItem(null);
  }

  /** Hides one item's thumbnail on the page while its image is animating or being pulled in the lightbox. */
  private setMorphingItem(morphingItem: WaLightboxItem | null) {
    for (const item of this.itemList) {
      item.customStates.set('morphing', item === morphingItem);
    }
  }

  //
  // Scrolling
  //

  private getPitch() {
    this.pitch ||= this.slides.clientWidth + (parseFloat(getComputedStyle(this.slides).columnGap) || 0);
    return this.pitch;
  }

  /** The scroll position that centers a slide. Negative in RTL. */
  private getScrollLeft(index: number) {
    return index * this.getPitch() * (this.localize.dir() === 'rtl' ? -1 : 1);
  }

  private scrollToIndex(index: number, behavior: ScrollBehavior = 'instant') {
    const left = this.getScrollLeft(index);

    // While a smooth scroll is running, the scroll position doesn't describe the current item yet
    this.scrollOrigin = this.slides.scrollLeft;
    this.isProgrammaticScroll = behavior === 'smooth' && Math.abs(left - this.scrollOrigin) > 1;
    this.slides.scrollTo({ left, behavior });
  }

  private handleScroll() {
    // Track which slides are on screen. Stepping through items quickly moves the index ahead of the scroll, and a
    // slide that's still scrolling out has to keep its media until it's gone.
    const position = Math.abs(this.slides.scrollLeft) / this.getPitch();
    this.visibleFrom = Math.floor(position);
    this.visibleTo = Math.ceil(position);

    // Slides don't move while zoomed. A smooth scroll that was cut short to zoom can still apply one more frame of
    // movement, so reset it.
    if (this.isZoomed) {
      const left = this.getScrollLeft(this.currentIndex);
      if (Math.abs(this.slides.scrollLeft - left) > 0.5) {
        this.slides.scrollTo({ left, behavior: 'instant' });
      }
      return;
    }

    if (this.scrollFrame || this.isProgrammaticScroll) return;

    this.scrollFrame = requestAnimationFrame(() => {
      this.scrollFrame = 0;
      if (!this.dialog.open || this.isProgrammaticScroll || this.itemList.length === 0) return;

      // A resize moves the scroll position before the slide is re-pinned. handleResize() corrects it.
      if (this.slides.clientWidth !== this.stageWidth) return;

      // scrollLeft is negative in RTL
      const index = clamp(Math.round(Math.abs(this.slides.scrollLeft) / this.getPitch()), 0, this.itemList.length - 1);

      if (index !== this.currentIndex) {
        this.indexFromScroll = true;
        this.index = index;
      }
    });
  }

  private handleScrollEnd() {
    // WebKit can report an end before a smooth scroll has moved at all
    if (this.isProgrammaticScroll && Math.abs(this.slides.scrollLeft - this.scrollOrigin) < 2) return;

    // Read the index from wherever it came to rest, in case that isn't the slide it was sent to
    this.isProgrammaticScroll = false;
    this.handleScroll();

    // Slides that were only kept because they were on screen can release their media now
    this.requestUpdate();
  }

  private handleResize() {
    this.stageWidth = this.slides.clientWidth;
    this.pitch = 0;
    this.resetZoom();

    // Browsers don't reliably keep the same slide snapped through a resize or rotation
    if (this.dialog.open) {
      this.scrollToIndex(this.currentIndex);
    }
  }

  private scrollThumbnailIntoView() {
    const strip = this.thumbnails;
    const tab = strip?.querySelector<HTMLElement>('[aria-selected="true"]');
    if (!tab) return;

    // scrollIntoView() would also scroll the page behind the lightbox
    strip.scrollTo({
      left: tab.offsetLeft - (strip.clientWidth - tab.offsetWidth) / 2,
      behavior: prefersReducedMotion() ? 'instant' : 'smooth',
    });
  }

  //
  // Zoom and pan
  //

  /** Measures the current media at rest. Zooming and panning are relative to this box. */
  private measure() {
    const media = this.currentMedia;
    if (!media) return false;

    if (this.activeMedia !== media || !this.fitRect) {
      // A slide that's still scrolling into place would be measured in the wrong spot
      this.scrollToIndex(this.currentIndex);
      this.activeMedia = media;
      this.fitRect = media.getBoundingClientRect();
      this.stageRect = this.slides.getBoundingClientRect();
    }

    return true;
  }

  private setTransform(scale: number, x: number, y: number, options: { animate?: boolean; free?: boolean } = {}) {
    const media = this.activeMedia;
    const fit = this.fitRect;
    const stage = this.stageRect;
    if (!media || !fit || !stage) return;

    if (!options.free) {
      // Keep the media's edges at or beyond the lightbox's, and centered on any axis where it's smaller
      const width = fit.width * scale;
      const height = fit.height * scale;
      const centerX = fit.left + fit.width / 2;
      const centerY = fit.top + fit.height / 2;
      x = width <= stage.width ? 0 : clamp(x, stage.right - centerX - width / 2, stage.left - centerX + width / 2);
      y = height <= stage.height ? 0 : clamp(y, stage.bottom - centerY - height / 2, stage.top - centerY + height / 2);
    }

    const wasZoomed = this.scale > 1;
    this.scale = scale;
    this.x = x;
    this.y = y;

    media.classList.toggle('settling', Boolean(options.animate));
    cancelAnimationFrame(this.transformFrame);
    this.transformFrame = requestAnimationFrame(() => {
      media.style.transform = scale === 1 && x === 0 && y === 0 ? '' : `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
    });

    // These only cause a render when zooming starts, stops, or reaches its limit
    this.isZoomed = scale > 1;
    this.customStates.set('zoomed', this.isZoomed);

    // Ask for a sharper source the first time the image is zoomed in
    if (this.isZoomed && !wasZoomed) {
      const item = this.currentItem;
      const image = media.querySelector('img');
      if (image && item?.srcset && !item.sizes) {
        image.sizes = `${Math.ceil(fit.width * this.maxZoom)}px`;
      }
    }
  }

  /** Zooms to a scale while keeping the point under the given viewport coordinates in place. */
  private zoomAt(clientX: number, clientY: number, scale: number, animate = false) {
    if (!this.canZoom || !this.measure()) return;

    const fit = this.fitRect!;
    const ratio = scale / this.scale;
    const centerX = fit.left + fit.width / 2 + this.x;
    const centerY = fit.top + fit.height / 2 + this.y;

    this.setTransform(scale, this.x - (clientX - centerX) * (ratio - 1), this.y - (clientY - centerY) * (ratio - 1), {
      animate,
    });
  }

  private zoomAtCenter(scale: number) {
    if (!this.canZoom || !this.measure()) return;

    const stage = this.stageRect!;
    this.zoomAt(
      stage.left + stage.width / 2,
      stage.top + stage.height / 2,
      clamp(scale, 1, this.maxZoom),
      !prefersReducedMotion(),
    );
  }

  private panBy(x: number, y: number, animate = false) {
    this.setTransform(this.scale, this.x + x, this.y + y, { animate });
  }

  /** Eases the media back within its limits after a gesture. */
  private settle() {
    this.backdrop.style.opacity = '';
    this.chrome.style.opacity = '';
    this.setMorphingItem(null);

    if (this.activeMedia && this.fitRect) {
      this.setTransform(clamp(this.scale, 1, this.maxZoom), this.x, this.y, { animate: !prefersReducedMotion() });
    }
  }

  private resetZoom() {
    cancelAnimationFrame(this.transformFrame);

    if (this.activeMedia) {
      this.activeMedia.classList.remove('settling');
      this.activeMedia.style.transform = '';
    }

    this.scale = 1;
    this.x = 0;
    this.y = 0;
    this.activeMedia = null;
    this.fitRect = null;
    this.gesture = null;
    this.isZoomed = false;
    this.customStates.set('zoomed', false);
  }

  //
  // Pointer, touch, and wheel gestures
  //

  private handlePointerDown(event: PointerEvent) {
    // The user has taken over, so the scroll position is meaningful again
    this.isProgrammaticScroll = false;

    if (!event.isPrimary || event.button !== 0) return;

    this.didDrag = false;
    // Custom content is slotted in from the light DOM, so look along the whole path, not just up from the target
    this.downOnMedia = event.composedPath().some(node => node instanceof Element && node.classList.contains('media'));
    this.pointer = {
      id: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      lastX: event.clientX,
      lastY: event.clientY,
      lastTime: event.timeStamp,
      velocityY: 0,
    };

    if (this.isZoomed && this.gesture !== 'pinch') {
      this.gesture = 'pan';
      this.slides.setPointerCapture(event.pointerId);
    }
  }

  private handlePointerMove(event: PointerEvent) {
    const pointer = this.pointer;
    if (!pointer || event.pointerId !== pointer.id || this.gesture === 'pinch') return;

    const deltaX = event.clientX - pointer.startX;
    const deltaY = event.clientY - pointer.startY;

    if (Math.hypot(deltaX, deltaY) > DRAG_SLOP) {
      this.didDrag = true;
    }

    if (this.gesture === 'pan') {
      this.panBy(event.clientX - pointer.lastX, event.clientY - pointer.lastY);
    } else if (this.gesture === 'pull') {
      this.pull(deltaX, deltaY);
    } else if (
      event.pointerType !== 'mouse' &&
      !this.isZoomed &&
      !this.isClosing &&
      Math.abs(deltaY) > DRAG_SLOP &&
      Math.abs(deltaY) > Math.abs(deltaX) * 1.5 &&
      this.measure()
    ) {
      // A mostly vertical drag at rest, in either direction, starts a pull to dismiss
      this.gesture = 'pull';
      this.dialog.classList.add('pulling');
      this.slides.setPointerCapture(event.pointerId);

      // Measure the pull from here, so the image doesn't jump by the distance it took to recognize the gesture
      pointer.startX = event.clientX;
      pointer.startY = event.clientY;

      // The image is leaving its slide, so its thumbnail shouldn't also show through the fading backdrop
      const item = this.currentItem;
      if (item && this.getVisibleThumbnail(item)) {
        this.setMorphingItem(item);
      }
    }

    const elapsed = event.timeStamp - pointer.lastTime;
    if (elapsed > 0) {
      pointer.velocityY = 0.7 * ((event.clientY - pointer.lastY) / elapsed) + 0.3 * pointer.velocityY;
    }
    pointer.lastX = event.clientX;
    pointer.lastY = event.clientY;
    pointer.lastTime = event.timeStamp;
  }

  private handlePointerUp(event: PointerEvent) {
    const pointer = this.pointer;
    if (!pointer || event.pointerId !== pointer.id) return;

    const gesture = this.gesture;
    this.pointer = null;
    if (gesture === 'pinch') return;
    this.gesture = null;

    if (gesture === 'pull') {
      // Up or down both work. A flick only counts if it's still heading away when the finger lifts.
      const offset = event.clientY - pointer.startY;
      const distance = Math.abs(offset);
      const velocity = pointer.velocityY * Math.sign(offset);
      this.dialog.classList.remove('pulling');

      // Far enough, or a quick flick
      if (distance > PULL_DISTANCE || (distance > PULL_DISTANCE / 4 && velocity > 0.4)) {
        this.requestClose(this.dialog);
      } else {
        this.settle();
      }
      return;
    }

    // A press that never moved is a tap, even if it could have become a pan
    if (this.didDrag || !this.downOnMedia) return;

    // A second tap close to the first toggles zoom. dblclick isn't reliable for touch.
    const isDoubleTap =
      event.timeStamp - this.lastTap.time < DOUBLE_TAP_DELAY &&
      Math.hypot(event.clientX - this.lastTap.x, event.clientY - this.lastTap.y) < 30;

    if (isDoubleTap) {
      this.lastTap.time = 0;
      if (this.canZoom && this.measure()) {
        const scale = this.scale > 1 ? 1 : Math.min(this.maxZoom, DOUBLE_TAP_ZOOM);
        this.zoomAt(event.clientX, event.clientY, scale, !prefersReducedMotion());
      }
    } else {
      this.lastTap = { time: event.timeStamp, x: event.clientX, y: event.clientY };
    }
  }

  /** The browser took over the gesture (e.g. to scroll between slides), so abandon the current one. */
  private handlePointerCancel(event: PointerEvent) {
    if (event.pointerId !== this.pointer?.id) return;

    this.pointer = null;
    if (this.gesture === 'pinch') return;

    if (this.gesture === 'pull') {
      this.dialog.classList.remove('pulling');
      this.settle();
    }
    this.gesture = null;
  }

  /** Moves and shrinks the media with the finger while the backdrop and controls fade out. */
  private pull(x: number, y: number) {
    const progress = clamp(Math.abs(y) / (PULL_DISTANCE * 2.5), 0, 1);

    this.setTransform(1 - progress * 0.25, x, y, { free: true });
    this.backdrop.style.opacity = String(1 - progress * 0.7);
    this.chrome.style.opacity = String(1 - Math.min(1, progress * 3));
  }

  /** The zoom button toggles between fitting the image and a comfortable zoom. */
  private handleZoomClick() {
    this.zoomAtCenter(this.isZoomed ? 1 : DOUBLE_TAP_ZOOM);
  }

  /** Picking a thumbnail always cuts to its slide, so every thumbnail behaves the same however far away it is. */
  private handleThumbnailClick(index: number) {
    this.isJump = true;
    this.index = index;
  }

  private handleSlidesClick() {
    // The media can't be hit while its copy is animating in, so every click then would look like a miss
    if (!this.isReady || !this.ghost.hidden || this.dialog.classList.contains('preparing')) return;

    // Clicking the empty space around the media closes the lightbox
    if (!this.didDrag && !this.downOnMedia) {
      this.requestClose(this.dialog);
    }
  }

  private handleWheel = (event: WheelEvent) => {
    // The user has taken over, so the scroll position is meaningful again
    this.isProgrammaticScroll = false;

    if (!this.canZoom) return;

    const unit = event.deltaMode === WheelEvent.DOM_DELTA_LINE ? 16 : 1;

    if (event.ctrlKey) {
      // Ctrl + wheel, which is also how Chrome and Firefox report a trackpad pinch
      event.preventDefault();
      if (this.measure()) {
        const scale = clamp(this.scale * Math.exp(-event.deltaY * unit * 0.01), 1, this.maxZoom);
        this.zoomAt(event.clientX, event.clientY, scale);
      }
    } else if (this.isZoomed) {
      event.preventDefault();
      this.panBy(-event.deltaX * unit, -event.deltaY * unit);
    }
  };

  private getPinch(event: TouchEvent) {
    const [a, b] = [event.touches[0], event.touches[1]];
    return {
      distance: Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY),
      x: (a.clientX + b.clientX) / 2,
      y: (a.clientY + b.clientY) / 2,
    };
  }

  private handleTouchStart = (event: TouchEvent) => {
    // A second finger during a pull is ignored so the pull can finish
    if (event.touches.length !== 2 || this.gesture === 'pull') return;
    if (!this.canZoom || this.isClosing || !this.measure()) return;

    // Stops the browser from scrolling or zooming the page with these two fingers
    if (event.cancelable) event.preventDefault();
    this.gesture = 'pinch';
    this.didDrag = true;
    this.dialog.classList.remove('pulling');
    this.pinch = { ...this.getPinch(event), scale: this.scale };
  };

  private handleTouchMove = (event: TouchEvent) => {
    // Keep the browser from starting a scroll of its own in the middle of a pull
    if (this.gesture === 'pull') {
      if (event.cancelable) event.preventDefault();
      return;
    }

    if (this.gesture !== 'pinch' || event.touches.length < 2) return;
    if (event.cancelable) event.preventDefault();

    // Zoom around the midpoint of the fingers, and pan along with it
    const { distance, x, y } = this.getPinch(event);
    const scale = clamp((this.pinch.scale * distance) / this.pinch.distance, 0.75, this.maxZoom);
    const ratio = scale / this.scale;
    const fit = this.fitRect!;
    const centerX = fit.left + fit.width / 2 + this.x;
    const centerY = fit.top + fit.height / 2 + this.y;

    this.setTransform(
      scale,
      this.x - (this.pinch.x - centerX) * (ratio - 1) + (x - this.pinch.x),
      this.y - (this.pinch.y - centerY) * (ratio - 1) + (y - this.pinch.y),
      { free: scale < 1 },
    );
    this.pinch.x = x;
    this.pinch.y = y;
  };

  private handleTouchEnd = (event: TouchEvent) => {
    if (this.gesture === 'pinch' && event.touches.length < 2) {
      this.gesture = null;
      this.pointer = null;
      this.settle();
    }
  };

  // Safari reports trackpad pinches with its own gesture events. On iOS they fire alongside touches, which the
  // touch handlers above already cover.
  private handleGestureStart = (event: Event) => {
    if (this.gesture === 'pinch' || !this.canZoom || !this.measure()) return;
    event.preventDefault();
    this.gestureScale = this.scale;
  };

  private handleGestureChange = (event: Event) => {
    if (this.gesture === 'pinch' || !this.canZoom || !this.fitRect) return;
    event.preventDefault();

    const { scale, clientX, clientY } = event as GestureEvent;
    this.zoomAt(clientX, clientY, clamp(this.gestureScale * scale, 1, this.maxZoom));
  };

  //
  // Keyboard and clicks
  //

  private handleDialogCancel(event: Event) {
    event.preventDefault();

    if (event.target === this.dialog && isTopDismissible(this)) {
      this.requestClose(this.dialog);
    }
  }

  private handleDocumentKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && this.open && isTopDismissible(this)) {
      event.preventDefault();
      event.stopPropagation();
      this.requestClose(this.dialog);
    }
  };

  private handleKeyDown(event: KeyboardEvent) {
    // Leave modified keys to the browser so shortcuts like page zoom keep working
    if (event.ctrlKey || event.metaKey || event.altKey) return;

    // Text fields, a video's own controls, and custom content need these keys for themselves
    const usesKeys = event
      .composedPath()
      .some(
        node =>
          node instanceof HTMLElement &&
          (node.isContentEditable ||
            node.hasAttribute('data-lightbox-content') ||
            ['input', 'textarea', 'select', 'video'].includes(node.localName)),
      );
    if (usesKeys) return;

    const isRTL = this.localize.dir() === 'rtl';
    const wasInThumbnails = Boolean(this.shadowRoot?.activeElement?.closest('.thumbnails'));

    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowRight': {
        const isLeft = event.key === 'ArrowLeft';
        if (this.isZoomed) {
          this.panBy(isLeft ? KEYBOARD_PAN : -KEYBOARD_PAN, 0, !prefersReducedMotion());
        } else if (isLeft === isRTL) {
          this.next();
        } else {
          this.previous();
        }
        break;
      }
      case 'ArrowUp':
      case 'ArrowDown':
        if (!this.isZoomed) return;
        this.panBy(0, event.key === 'ArrowUp' ? KEYBOARD_PAN : -KEYBOARD_PAN, !prefersReducedMotion());
        break;
      case 'Home':
        this.index = 0;
        break;
      case 'End':
        this.index = this.itemList.length - 1;
        break;
      case '+':
      case '=':
        this.zoomIn();
        break;
      case '-':
      case '_':
        this.zoomOut();
        break;
      case '0':
        this.zoomAtCenter(1);
        break;
      default:
        return;
    }

    // Chrome would otherwise also scroll the slides with the arrow keys, skipping an item
    event.preventDefault();

    // Roving focus follows the current thumbnail
    if (wasInThumbnails) {
      this.updateComplete.then(() => {
        this.thumbnails.querySelector<HTMLElement>('[aria-selected="true"]')?.focus({ preventScroll: true });
      });
    }
  }

  private handleHostClick = (event: MouseEvent) => {
    const target = event.target as Element;

    // Close when a slotted [data-lightbox="close"] element is clicked
    const closeButton = target.closest?.('[data-lightbox="close"]');
    if (closeButton && this.open) {
      this.requestClose(closeButton);
      return;
    }

    // Open at the clicked item. Modified clicks fall through so the link can open in a new tab.
    const item = target.closest?.('wa-lightbox-item');
    const index = item ? this.itemList.indexOf(item) : -1;
    const isPlainClick = event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;

    if (index > -1 && isPlainClick && !event.defaultPrevented) {
      event.preventDefault();
      this.index = index;
      this.open = true;
    }
  };

  //
  // Announcements
  //

  /**
   * Tells screen readers which item is showing. The region is a light DOM child slotted into the dialog because a
   * modal dialog makes the shared announcer on the body inert, and some screen readers ignore shadow DOM live regions.
   */
  private announce() {
    const item = this.currentItem;
    if (!item) return;

    if (!this.announcer) {
      this.announcer = document.createElement('div');
      this.announcer.slot = 'announcer';
      this.announcer.setAttribute('aria-live', 'polite');
      this.append(this.announcer);
    }

    const count = this.itemList.length;
    const position = count > 1 ? this.localize.term('compactPageXOfY', this.currentIndex + 1, count) : '';
    const parts = [position, item.resolvedAlt, item.caption].filter(Boolean);

    this.announcer.textContent = [...new Set(parts)].join(', ');
  }

  //
  // Public methods
  //

  /** Shows the next item. */
  next() {
    const lastIndex = this.itemList.length - 1;

    if (this.currentIndex < lastIndex) {
      this.index = this.currentIndex + 1;
    } else if (this.loop && lastIndex > 0) {
      this.index = 0;
    }
  }

  /** Shows the previous item. */
  previous() {
    const lastIndex = this.itemList.length - 1;

    if (this.currentIndex > 0) {
      this.index = this.currentIndex - 1;
    } else if (this.loop && lastIndex > 0) {
      this.index = lastIndex;
    }
  }

  /** Zooms in on the current image. */
  zoomIn() {
    this.zoomAtCenter(this.scale * 2);
  }

  /** Zooms out of the current image. */
  zoomOut() {
    this.zoomAtCenter(this.scale / 2);
  }

  //
  // Rendering
  //

  private async handleImageLoad(item: WaLightboxItem, image: HTMLImageElement) {
    // The load event can fire before the image is decoded. Revealing it only once it can paint keeps the
    // placeholder up until then, so there's never an empty frame between the two.
    await image.decode().catch(() => {});

    // An image that's been shown before has nothing to reveal gradually
    if (this.loadedItems.has(item)) {
      image.classList.add('instant');
    }
    this.loadedItems.add(item);
    image.classList.add('ready');
    this.handleMediaLoad(item, image.naturalWidth, image.naturalHeight);
  }

  private handleMediaLoad(item: WaLightboxItem, width: number, height: number) {
    const known = this.naturalSizes.get(item);
    const hadError = this.failedItems.delete(item);
    this.naturalSizes.set(item, { width, height });

    // Only render if something new was learned about the slide's shape
    if (hadError || known?.width !== width || known?.height !== height) {
      if (this.scale === 1) {
        this.fitRect = null;
      }
      this.requestUpdate();
    }
  }

  private handleMediaError(item: WaLightboxItem) {
    this.failedItems.add(item);
    this.requestUpdate();
  }

  private renderSlide(item: WaLightboxItem, index: number, currentIndex: number, count: number) {
    // Only the current slide, its neighbors, and anything still on screen load their media
    const isNearby = Math.abs(index - currentIndex) <= 1 || (index >= this.visibleFrom && index <= this.visibleTo);
    const label = this.localize.term('compactPageXOfY', index + 1, count);

    // The slide elements are never added or removed, only their contents. They're the scroll container's snap
    // targets, and Safari jumps to a neighboring slide if one is removed ahead of the current scroll position.
    return html`
      <div
        part="slide"
        id="slide-${index}"
        class="slide"
        data-index=${index}
        role="group"
        aria-label=${label}
        ?inert=${index !== currentIndex}
      >
        ${isNearby ? this.renderMedia(item, index, currentIndex) : ''}
      </div>
    `;
  }

  private renderMedia(item: WaLightboxItem, index: number, currentIndex: number) {
    // Size the slide from the best information available: the item's attributes, the loaded media, or its thumbnail
    const hasContent = Boolean(item.contentTemplate);
    const natural = this.naturalSizes.get(item);
    const thumbnail = item.thumbnailElement;
    const width = item.width || natural?.width || 0;
    const height = item.height || natural?.height || 0;
    const ratio =
      width && height
        ? width / height
        : thumbnail?.naturalWidth && thumbnail.naturalHeight
          ? thumbnail.naturalWidth / thumbnail.naturalHeight
          : item.type === 'video' || hasContent
            ? 16 / 9
            : 1.5;
    const hasError = this.failedItems.has(item);
    const placeholder = item.thumbnailSrc;
    const alt = item.resolvedAlt;

    return html`
      <div class="frame">
        <div
          class="media"
          style=${styleMap({ '--ratio': String(ratio), '--natural-width': width ? `${width}px` : '100cqw' })}
        >
          ${hasContent
            ? html`<slot name=${this.getContentSlot(item)}></slot>`
            : item.type === 'video'
              ? html`
                  <video
                    part="video"
                    src=${ifDefined(item.src || undefined)}
                    poster=${ifDefined(placeholder || undefined)}
                    aria-label=${ifDefined(alt || undefined)}
                    controls
                    playsinline
                    preload="metadata"
                    @loadedmetadata=${(event: Event) => {
                      const video = event.target as HTMLVideoElement;
                      this.handleMediaLoad(item, video.videoWidth, video.videoHeight);
                    }}
                    @error=${() => this.handleMediaError(item)}
                  ></video>
                `
              : html`
                  <img
                    part="image"
                    src=${ifDefined(item.src || undefined)}
                    srcset=${ifDefined(item.srcset || undefined)}
                    sizes=${ifDefined(item.sizes || (item.srcset ? '100vw' : undefined))}
                    alt=${alt}
                    decoding="async"
                    draggable="false"
                    fetchpriority=${index === currentIndex ? 'high' : 'low'}
                    @load=${(event: Event) => this.handleImageLoad(item, event.target as HTMLImageElement)}
                    @error=${() => this.handleMediaError(item)}
                  />
                  ${placeholder
                    ? html`
                        <div
                          class="placeholder"
                          style=${styleMap({ backgroundImage: `url("${placeholder.replace(/"/g, '%22')}")` })}
                        ></div>
                      `
                    : ''}
                `}
          ${hasError
            ? html`
                <div class="error-message">
                  <wa-icon library="system" name="image"></wa-icon>
                  ${this.localize.term('error')}
                </div>
              `
            : ''}
        </div>
      </div>
    `;
  }

  render() {
    const items = this.itemList;
    const count = items.length;
    const index = this.currentIndex;
    const item = items[index];
    const isRTL = isServer ? this.dir === 'rtl' : this.localize.dir() === 'rtl';
    const hasMany = count > 1;
    const hasThumbnails = this.withThumbnails && hasMany;
    const canZoom = this.canZoom;

    return html`
      <slot></slot>

      <dialog
        part="dialog"
        class=${classMap({
          dialog: true,
          zoomed: this.isZoomed,
          'has-captions': items.some(i => i.caption),
          'has-thumbnails': hasThumbnails,
        })}
        aria-label=${this.label || this.localize.term('image')}
        tabindex="-1"
        @cancel=${this.handleDialogCancel}
        @keydown=${this.handleKeyDown}
      >
        <div part="backdrop" class="backdrop"></div>

        <div
          part="scroll-container"
          class="slides"
          tabindex="-1"
          @scroll=${this.handleScroll}
          @scrollend=${this.handleScrollEnd}
          @click=${this.handleSlidesClick}
          @pointerdown=${this.handlePointerDown}
          @pointermove=${this.handlePointerMove}
          @pointerup=${this.handlePointerUp}
          @pointercancel=${this.handlePointerCancel}
          @dragstart=${(event: DragEvent) => event.preventDefault()}
        >
          ${this.hasOpened ? items.map((slideItem, i) => this.renderSlide(slideItem, i, index, count)) : ''}
        </div>

        <img class="departing" alt="" draggable="false" hidden />
        <div class="ghost" hidden><img alt="" draggable="false" /></div>

        <div class="chrome">
          <div part="toolbar" class="toolbar">
            <span part="counter" class="counter" ?hidden=${!hasMany || this.withoutCounter}>
              ${this.localize.term('compactPageXOfY', index + 1, count)}
            </span>
            <span class="spacer"></span>
            <slot name="actions"></slot>
            <button
              part="zoom-button"
              class="control zoom"
              type="button"
              ?hidden=${!canZoom}
              aria-label=${this.localize.term(this.isZoomed ? 'zoomOut' : 'zoomIn')}
              @click=${this.handleZoomClick}
            >
              <slot name="zoom-in-icon" ?hidden=${this.isZoomed}>
                <wa-icon library="system" name="magnifying-glass-plus"></wa-icon>
              </slot>
              <slot name="zoom-out-icon" ?hidden=${!this.isZoomed}>
                <wa-icon library="system" name="magnifying-glass-minus"></wa-icon>
              </slot>
            </button>
            <button
              part="close-button"
              class="control"
              type="button"
              aria-label=${this.localize.term('close')}
              @click=${(event: MouseEvent) => this.requestClose(event.currentTarget as Element)}
            >
              <slot name="close-icon"><wa-icon library="system" name="xmark"></wa-icon></slot>
            </button>
          </div>

          <button
            part="navigation-button navigation-button-previous"
            class="control navigation previous"
            type="button"
            ?hidden=${!hasMany || this.withoutNavigation}
            aria-label=${this.localize.term('previousSlide')}
            aria-disabled=${!this.loop && index === 0 ? 'true' : 'false'}
            @click=${this.previous}
          >
            <slot name="previous-icon">
              <wa-icon library="system" name=${isRTL ? 'chevron-right' : 'chevron-left'}></wa-icon>
            </slot>
          </button>

          <button
            part="navigation-button navigation-button-next"
            class="control navigation next"
            type="button"
            ?hidden=${!hasMany || this.withoutNavigation}
            aria-label=${this.localize.term('nextSlide')}
            aria-disabled=${!this.loop && index === count - 1 ? 'true' : 'false'}
            @click=${this.next}
          >
            <slot name="next-icon">
              <wa-icon library="system" name=${isRTL ? 'chevron-left' : 'chevron-right'}></wa-icon>
            </slot>
          </button>

          <div class="footer">
            <div part="caption" class="caption" ?hidden=${!item?.caption}>${item?.caption}</div>

            <div part="thumbnails" class="thumbnails" role="tablist" ?hidden=${!hasThumbnails}>
              ${hasThumbnails
                ? items.map((thumbnailItem, i) => {
                    const isActive = i === index;
                    const src = thumbnailItem.thumbnailSrc;
                    return html`
                      <button
                        part="thumbnail ${isActive ? 'thumbnail-active' : ''}"
                        class="thumbnail"
                        type="button"
                        role="tab"
                        aria-selected=${isActive ? 'true' : 'false'}
                        aria-controls="slide-${i}"
                        aria-label=${this.localize.term('goToSlide', i + 1, count)}
                        tabindex=${isActive ? '0' : '-1'}
                        @click=${() => this.handleThumbnailClick(i)}
                      >
                        ${src ? html`<img src=${src} alt="" draggable="false" loading="lazy" />` : ''}
                      </button>
                    `;
                  })
                : ''}
            </div>
          </div>
        </div>

        <div class="wa-visually-hidden"><slot name="announcer"></slot></div>
      </dialog>
    `;
  }
}

if (!isServer) {
  //
  // Watch for data-lightbox="open <lightbox-id> [item-id]" clicks
  //
  document.addEventListener('click', (event: MouseEvent) => {
    const invoker = (event.target as Element).closest?.('[data-lightbox]');
    if (!(invoker instanceof Element)) return;

    const [command, id, itemId] = parseSpaceDelimitedTokens(invoker.getAttribute('data-lightbox') || '');
    if (command !== 'open' || !id?.length) return;

    const root = invoker.getRootNode() as Document | ShadowRoot;
    const lightbox = root.getElementById(id) as WaLightbox | null;

    if (lightbox?.localName !== 'wa-lightbox') {
      console.warn(`A lightbox with an ID of "${id}" could not be found in this document.`);
      return;
    }

    // Open at the named item, or at the start
    let index = 0;
    if (itemId) {
      index = lightbox.items.findIndex(item => item.id === itemId);
      if (index === -1) {
        console.warn(`A lightbox item with an ID of "${itemId}" could not be found in this lightbox.`, lightbox);
        index = 0;
      }
    }

    lightbox.index = index;
    lightbox.open = true;
  });
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-lightbox': WaLightbox;
  }
}
