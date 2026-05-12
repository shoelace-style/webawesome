import { html, type PropertyValues } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { WaErrorEvent } from '../../events/error.js';
import { WaLoadEvent } from '../../events/load.js';
import { watch } from '../../internal/watch.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import { LocalizeController } from '../../utilities/localize.js';
import '../icon/icon.js';
import styles from './animated-image.styles.js';

/**
 * @summary Animated images display GIFs and WEBPs with controls to play and pause them on demand. Use them when you
 *  want motion but need to give users control over when it plays.
 * @documentation https://webawesome.com/docs/components/animated-image
 * @status stable
 * @since 2.0
 *
 * @dependency wa-icon
 *
 * @event wa-load - Emitted when the image loads successfully.
 * @event wa-error - Emitted when the image fails to load.
 *
 * @slot play-icon - Optional play icon to use instead of the default. Works best with `<wa-icon>`.
 * @slot pause-icon - Optional pause icon to use instead of the default. Works best with `<wa-icon>`.
 *
 * @csspart control-box - The container that surrounds the pause/play icons and provides their background.
 *
 * @cssproperty --control-box-size - The size of the icon box.
 * @cssproperty --icon-size - The size of the play/pause icons.
 *
 * @ssr - Due to limitations of the browser, this component is not able to be SSR'ed. You can use a `<video>` tag, but the controls will not work, and it will always auto-play the gif or webp.
 */
@customElement('wa-animated-image')
export default class WaAnimatedImage extends WebAwesomeElement {
  static css = styles;

  private readonly localize = new LocalizeController(this);

  @query('.animated') animatedImage: HTMLImageElement;

  @state() frozenFrame: string;
  @state() isLoaded = false;

  /** The path to the image to load. */
  @property() src: string;

  /** A description of the image used by assistive devices. */
  @property() alt: string;

  /** Plays the animation. When this attribute is remove, the animation will pause. */
  @property({ type: Boolean, reflect: true }) play: boolean;

  private handleClick() {
    this.play = !this.play;
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.play = !this.play;
    }
  }

  firstUpdated (changedProperties: PropertyValues<this>) {
    super.firstUpdated
    if (this.didSSR) {
      const img = this.animatedImage
      if (img && img.complete) {
        // The image has loaded prior to this element connecting, so we need to simulate error / load events respectively.
        if (img.naturalWidth > 0) {
          img.dispatchEvent(new Event("load"))
        } else {
          img.dispatchEvent(new Event("error"))
        }
      }
    }
    super.firstUpdated(changedProperties)
  }

  private handleLoad() {
    const canvas = document.createElement('canvas');
    const { width, height } = this.animatedImage;
    canvas.width = width;
    canvas.height = height;
    canvas.getContext('2d')!.drawImage(this.animatedImage, 0, 0, width, height);
    this.frozenFrame = canvas.toDataURL('image/gif');

    if (!this.isLoaded) {
      this.dispatchEvent(new WaLoadEvent());
      this.isLoaded = true;
    }
  }

  private handleError() {
    this.dispatchEvent(new WaErrorEvent());
  }

  @watch('play', { waitUntilFirstUpdate: true })
  handlePlayChange() {
    // When the animation starts playing, reset the src so it plays from the beginning. Since the src is cached, this
    // won't trigger another request.
    if (this.play) {
      this.animatedImage.src = '';
      this.animatedImage.src = this.src;
    }
  }

  @watch('src')
  handleSrcChange() {
    this.isLoaded = false;
  }

  render() {
    const verb = this.localize.term(this.play ? 'pauseAnimation' : 'playAnimation');
    const label = `${verb} ${this.alt}`;


    // when SSR'ed and the component has not updated, render the frozen still image, but its invisible so it only prevents layout shifting.
    const shouldShow = (this.didSSR && !this.hasUpdated) || this.play

    return html`
      <div
        class="animated-image"
        tabindex="0"
        role="button"
        aria-pressed=${this.play ? 'true' : 'false'}
        aria-label=${label}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
      >
        <img
          class="animated"
          src=${this.src}
          alt=${this.alt}
          crossorigin="anonymous"
          aria-hidden=${shouldShow ? 'false' : 'true'}
          style="visibility: hidden;"
          role="presentation"
          @load=${this.handleLoad}
          @error=${this.handleError}
        />

        ${this.isLoaded
          ? html`
              <img
                class="frozen"
                src=${this.frozenFrame}
                alt=${this.alt}
                aria-hidden=${this.play ? 'true' : 'false'}
                role="presentation"
              />

              <div part="control-box" class="control-box" aria-hidden="true">
                <slot name="play-icon">
                  <wa-icon
                    name="play"
                    library="system"
                    variant="solid"
                    class="default"
                    style=${styleMap({ 'margin-inline-start': '3px' })}
                  ></wa-icon>
                </slot>
                <slot name="pause-icon">
                  <wa-icon name="pause" library="system" variant="solid" class="default"></wa-icon>
                </slot>
              </div>
            `
          : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-animated-image': WaAnimatedImage;
  }
}
