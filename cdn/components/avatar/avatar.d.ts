import '../icon/icon.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import type { CSSResultGroup } from 'lit';
/**
 * @summary Avatars are used to represent a person or object.
 * @documentation https://backers.webawesome.com/docs/components/avatar
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
 * @csspart base - The component's base wrapper.
 * @csspart icon - The container that wraps the avatar's icon.
 * @csspart initials - The container that wraps the avatar's initials.
 * @csspart image - The avatar image. Only shown when the `image` attribute is set.
 *
 * @cssproperty --background-color - The avatar's background color.
 * @cssproperty --content-color - The color of the avatar's content.
 * @cssproperty --size - The size of the avatar.
 */
export default class WaAvatar extends WebAwesomeElement {
    static styles: CSSResultGroup;
    private hasError;
    /** The image source to use for the avatar. */
    image: string;
    /** A label to use to describe the avatar to assistive devices. */
    label: string;
    /** Initials to use as a fallback when no image is available (1-2 characters max recommended). */
    initials: string;
    /** Indicates how the browser should load the image. */
    loading: 'eager' | 'lazy';
    /** The shape of the avatar. */
    shape: 'circle' | 'square' | 'rounded';
    handleImageChange(): void;
    private handleImageLoadError;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wa-avatar': WaAvatar;
    }
}
