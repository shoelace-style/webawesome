import { html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { WaErrorEvent } from '../../events/error.js';
import { watch } from '../../internal/watch.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import '../icon/icon.js';
import styles from './avatar.styles.js';

/**
 * @summary Avatars are used to represent a person or object.
 * @documentation https://webawesome.com/docs/components/avatar
 * @status stable
 * @since 2.0
 *
 * @dependency wa-icon
 *
 * @slot icon - The default icon to use when no image or initials are present. Works best with `<wa-icon>`.
 *
 * @event wa-error - The image could not be loaded. This may because of an invalid URL, a temporary network condition, or some
 * unknown cause.
 *
 * @csspart icon - The container that wraps the avatar's icon.
 * @csspart initials - The container that wraps the avatar's initials.
 * @csspart image - The avatar image. Only shown when the `image` attribute is set.
 *
 * @cssproperty --size - The size of the avatar.
 */
@customElement('wa-avatar')
export default class WaAvatar extends WebAwesomeElement {
  static css = styles;

  @state() private hasError = false;

  /** The image source to use for the avatar. */
  @property() image = '';

  /** A label to use to describe the avatar to assistive devices. */
  @property() label = '';

  /** Initials to use as a fallback when no image is available (1-2 characters max recommended). */
  @property() initials = '';

  /** Indicates how the browser should load the image. */
  @property() loading: 'eager' | 'lazy' = 'eager';

  /** The shape of the avatar. */
  @property({ reflect: true }) shape: 'circle' | 'square' | 'rounded' = 'circle';

  @watch('image')
  handleImageChange() {
    // Reset the error when a new image is provided
    this.hasError = false;
  }

  private handleImageLoadError() {
    this.hasError = true;
    this.dispatchEvent(new WaErrorEvent());
  }

  render() {
    const avatarWithImage = html`
      <img
        part="image"
        class="image"
        src="${this.image}"
        loading="${this.loading}"
        role="img"
        aria-label=${this.label}
        @error="${this.handleImageLoadError}"
      />
    `;

    let avatarWithoutImage = html``;

    if (this.initials) {
      avatarWithoutImage = html`<div part="initials" class="initials" role="img" aria-label=${this.label}>
        ${this.initials}
      </div>`;
    } else {
      avatarWithoutImage = html`
        <slot name="icon" part="icon" class="icon" role="img" aria-label=${this.label}>
          <wa-icon name="user" library="system" variant="solid"></wa-icon>
        </slot>
      `;
    }

    return html` ${this.image && !this.hasError ? avatarWithImage : avatarWithoutImage} `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-avatar': WaAvatar;
  }
}
