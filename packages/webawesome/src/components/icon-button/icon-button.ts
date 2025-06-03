import { customElement, property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { html, literal } from 'lit/static-html.js';
import { WebAwesomeFormAssociatedElement } from '../../internal/webawesome-form-associated-element.js';
import '../icon/icon.js';
import styles from './icon-button.css';

/**
 * @summary Icons buttons are simple, icon-only buttons that can be used for actions and in toolbars.
 * @documentation https://backers.webawesome.com/docs/components/icon-button
 * @status stable
 * @since 2.0
 *
 * @dependency wa-icon
 *
 * @event blur - Emitted when the icon button loses focus.
 * @event focus - Emitted when the icon button gains focus.
 *
 * @cssproperty [--background-color-hover=var(--wa-color-neutral-fill-quiet)] - The color of the button's background on hover.
 * @cssproperty [--background-color-active=var(--wa-color-neutral-fill-quiet)] - The color of the button's background on `:active`.
 * @cssproperty --text-color-hover - The color of the button's background on hover.
 * @cssproperty --text-color-active - The color of the button's background on `:active`.
 *
 * @csspart base - The component's base wrapper.
 */
@customElement('wa-icon-button')
export default class WaIconButton extends WebAwesomeFormAssociatedElement {
  static css = styles;

  @query('.icon-button') button: HTMLButtonElement | HTMLLinkElement;

  /** The name of the icon to draw. Available names depend on the icon library being used. */
  @property({ reflect: true }) name: string | null = null;

  /**
   * The family of icons to choose from. For Font Awesome, valid options include `classic`, `sharp`, `duotone`, and
   * `brands`. Custom icon libraries may or may not use this property.
   */
  @property({ reflect: true }) family: string;

  /**
   * The name of the icon's variant. For Font Awesome, valid options include `thin`, `light`, `regular`, and `solid` for
   * the _classic_ and _sharp_ families. Custom icon libraries may or may not use this property.
   */
  @property({ reflect: true }) variant: string;

  /** The name of a registered custom icon library. */
  @property() library?: string;

  /**
   * An external URL of an SVG file. Be sure you trust the content you are including, as it will be executed as code and
   * can result in XSS attacks.
   */
  @property() src?: string;

  /** When set, the underlying button will be rendered as an `<a>` with this `href` instead of a `<button>`. */
  @property() href?: string;

  /** Tells the browser where to open the link. Only used when `href` is set. */
  @property() target?: '_blank' | '_parent' | '_self' | '_top';

  /** Tells the browser to download the linked file as this filename. Only used when `href` is set. */
  @property() download?: string;

  /**
   * A description that gets read by assistive devices. For optimal accessibility, you should always include a label
   * that describes what the icon button does.
   */
  @property() label = '';

  /** Disables the button. */
  @property({ type: Boolean }) disabled = false;

  private handleClick(event: MouseEvent) {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  /** Simulates a click on the icon button. */
  click() {
    this.button.click();
  }

  /** Sets focus on the icon button. */
  focus(options?: FocusOptions) {
    this.button.focus(options);
  }

  /** Removes focus from the icon button. */
  blur() {
    this.button.blur();
  }

  render() {
    const isLink = this.href ? true : false;
    const tag = isLink ? literal`a` : literal`button`;

    /* eslint-disable lit/binding-positions, lit/no-invalid-html */
    return html`
      <${tag}
        part="base"
        class=${classMap({
          'icon-button': true,
        })}
        ?disabled=${ifDefined(isLink ? undefined : this.disabled)}
        type=${ifDefined(isLink ? undefined : 'button')}
        href=${ifDefined(isLink ? this.href : undefined)}
        target=${ifDefined(isLink ? this.target : undefined)}
        download=${ifDefined(isLink ? this.download : undefined)}
        rel=${ifDefined(isLink && this.target ? 'noreferrer noopener' : undefined)}
        role=${ifDefined(isLink ? undefined : 'button')}
        aria-disabled=${this.disabled ? 'true' : 'false'}
        aria-label="${this.label}"
        tabindex=${this.disabled ? '-1' : '0'}
        @click=${this.handleClick}
      >
        <wa-icon
          class="icon"
          name=${ifDefined(this.name)}
          family=${ifDefined(this.family)}
          variant=${ifDefined(this.variant)}
          library=${ifDefined(this.library)}
          src=${ifDefined(this.src)}
          aria-hidden="true"
          fixed-width
        ></wa-icon>
      </${tag}>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-icon-button': WaIconButton;
  }
}
