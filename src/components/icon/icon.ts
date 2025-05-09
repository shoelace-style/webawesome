import { html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { WaErrorEvent } from '../../events/error.js';
import { WaLoadEvent } from '../../events/load.js';
import { watch } from '../../internal/watch.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import styles from './icon.css';
import {
  CACHEABLE_ERROR,
  getIconLibrary,
  RETRYABLE_ERROR,
  unwatchIcon,
  watchIcon,
  type IconLibrary,
} from './registry.js';

import type { HTMLTemplateResult, PropertyValues } from 'lit';

/**
 * @summary Icons are symbols that can be used to represent various options within an application.
 * @documentation https://backers.webawesome.com/docs/components/icon
 * @status stable
 * @since 2.0
 *
 * @event wa-load - Emitted when the icon has loaded.
 * @event wa-error - Emitted when the icon fails to load due to an error.
 *
 * @csspart svg - The internal SVG element.
 *
 * @cssproperty [--primary-color=currentColor] - Sets a duotone icon's primary color.
 * @cssproperty [--primary-opacity=1] - Sets a duotone icon's primary opacity.
 * @cssproperty [--secondary-color=currentColor] - Sets a duotone icon's secondary color.
 * @cssproperty [--secondary-opacity=0.4] - Sets a duotone icon's secondary opacity.
 */
@customElement('wa-icon')
export default class WaIcon extends WebAwesomeElement {
  static shadowStyle = styles;

  private initialRender = false;

  @state() private svg: SVGElement | HTMLTemplateResult | null = null;

  /** The name of the icon to draw. Available names depend on the icon library being used. */
  @property({ cssProperty: '--wa-icon-name' }) name?: string;

  /**
   * The family of icons to choose from. For Font Awesome Free (default), valid options include `classic` and `brands`.
   * For Font Awesome Pro subscribers, valid options include, `classic`, `sharp`, `duotone`, and `brands`. Custom icon
   * libraries may or may not use this property.
   */
  @property({ cssProperty: '--wa-icon-family' }) family: string;

  /**
   * The name of the icon's variant. For Font Awesome, valid options include `thin`, `light`, `regular`, and `solid` for
   * the `classic` and `sharp` families. Some variants require a Font Awesome Pro subscription. Custom icon libraries
   * may or may not use this property.
   */
  @property({ cssProperty: '--wa-icon-variant' }) variant: string;

  /** Draws the icon in a fixed-width both. */
  @property({ attribute: 'fixed-width', type: Boolean, reflect: true }) fixedWidth: false;

  /**
   * An external URL of an SVG file. Be sure you trust the content you are including, as it will be executed as code and
   * can result in XSS attacks.
   */
  @property() src?: string;

  /**
   * An alternate description to use for assistive devices. If omitted, the icon will be considered presentational and
   * ignored by assistive devices.
   */
  @property() label = '';

  /** The name of a registered custom icon library. */
  @property({ cssProperty: '--wa-icon-library', default: 'default' }) library = 'default';

  /** The icon library object being used. */
  private iconLibrary?: IconLibrary;

  connectedCallback() {
    super.connectedCallback();

    watchIcon(this);
  }

  firstUpdated(changedProperties: PropertyValues<this>) {
    super.firstUpdated(changedProperties);
    this.initialRender = true;
    this.setIcon();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    unwatchIcon(this);
  }

  private getIconSource(): string | undefined {
    let ref = this.src ?? this.name;

    if (ref) {
      return this.iconLibrary?.getUrl(ref, this.family, this.variant);
    }

    return undefined;
  }

  @watch('label')
  handleLabelChange() {
    const hasLabel = typeof this.label === 'string' && this.label.length > 0;

    if (hasLabel) {
      this.setAttribute('role', 'img');
      this.setAttribute('aria-label', this.label);
      this.removeAttribute('aria-hidden');
    } else {
      this.removeAttribute('role');
      this.removeAttribute('aria-label');
      this.setAttribute('aria-hidden', 'true');
    }
  }

  @watch(['library', 'src'])
  setIconLibrary() {
    // Clear it out so that next time `setIcon()` is called it sets it.
    this.iconLibrary = undefined;
  }

  @watch(['family', 'name', 'library', 'variant', 'src'])
  async setIcon() {
    this.iconLibrary ??= getIconLibrary(this.src ? 'custom' : this.library);

    let { src, name, family, variant } = this;
    let ref = src ?? name;

    const url = ref ? this.iconLibrary?.getUrl(ref, family, variant) : undefined;

    if (!ref || !url || !this.iconLibrary) {
      this.svg = null;
      return;
    }

    let iconResolver = this.iconLibrary.getElement(ref, family, variant);

    // If we haven't rendered yet, exit early. This avoids unnecessary work due to watching multiple props.
    if (!this.initialRender) {
      return;
    }

    const svg = await iconResolver;

    if (url !== this.getIconSource()) {
      // If the url has changed while fetching the icon, ignore this request
      return;
    }

    switch (svg) {
      case RETRYABLE_ERROR:
      case CACHEABLE_ERROR:
        this.svg = null;
        this.dispatchEvent(new WaErrorEvent());
        break;
      default:
        this.svg = svg.cloneNode(true) as SVGElement;
        this.dispatchEvent(new WaLoadEvent());
    }
  }

  render() {
    if (this.hasUpdated) {
      return this.svg;
    }

    // @TODO: 16x16 is generally a safe bet. Perhaps be user setable?? `size="16x16"`, size="20x16". We just want to avoid "blowouts" with SSR.
    return html`<svg part="svg" fill="currentColor" width="16" height="16"></svg>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-icon': WaIcon;
  }
}
