import { customElement, property, query, state } from 'lit/decorators.js';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { watch } from '../../internal/watch.js';
import componentStyles from '../../styles/component.styles.js';
import styles from './breadcrumb-item.styles.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import type { CSSResultGroup } from 'lit';

/**
 * @summary Breadcrumb Items are used inside [breadcrumbs](/docs/components/breadcrumb) to represent different links.
 * @documentation https://backers.webawesome.com/docs/components/breadcrumb-item
 * @status stable
 * @since 2.0
 *
 * @slot - The breadcrumb item's label.
 * @slot prefix - An optional prefix, usually an icon or icon button.
 * @slot suffix - An optional suffix, usually an icon or icon button.
 * @slot separator - The separator to use for the breadcrumb item. This will only change the separator for this item. If
 * you want to change it for all items in the group, set the separator on `<wa-breadcrumb>` instead.
 *
 * @csspart base - The component's base wrapper.
 * @csspart label - The breadcrumb item's label.
 * @csspart prefix - The container that wraps the prefix.
 * @csspart suffix - The container that wraps the suffix.
 * @csspart separator - The container that wraps the separator.
 */
@customElement('wa-breadcrumb-item')
export default class WaBreadcrumbItem extends WebAwesomeElement {
  static styles: CSSResultGroup = [componentStyles, styles];

  @query('slot:not([name])') defaultSlot: HTMLSlotElement;

  @state() private renderType: 'button' | 'link' | 'dropdown' = 'button';

  /**
   * Optional URL to direct the user to when the breadcrumb item is activated. When set, a link will be rendered
   * internally. When unset, a button will be rendered instead.
   */
  @property() href?: string;

  /** Tells the browser where to open the link. Only used when `href` is set. */
  @property() target?: '_blank' | '_parent' | '_self' | '_top';

  /** The `rel` attribute to use on the link. Only used when `href` is set. */
  @property() rel = 'noreferrer noopener';

  private setRenderType() {
    const hasDropdown =
      this.defaultSlot.assignedElements({ flatten: true }).filter(i => i.tagName.toLowerCase() === 'wa-dropdown')
        .length > 0;

    if (this.href) {
      this.renderType = 'link';
      return;
    }

    if (hasDropdown) {
      this.renderType = 'dropdown';
      return;
    }

    this.renderType = 'button';
  }

  @watch('href', { waitUntilFirstUpdate: true })
  hrefChanged() {
    this.setRenderType();
  }

  handleSlotChange() {
    this.setRenderType();
  }

  render() {
    return html`
      <div part="base" class="breadcrumb-item">
        <span part="prefix" class="breadcrumb-item__prefix">
          <slot name="prefix"></slot>
        </span>

        ${this.renderType === 'link'
          ? html`
              <a
                part="label"
                class="breadcrumb-item__label breadcrumb-item__label--link"
                href="${this.href!}"
                target="${ifDefined(this.target ? this.target : undefined)}"
                rel=${ifDefined(this.target ? this.rel : undefined)}
              >
                <slot></slot>
              </a>
            `
          : ''}
        ${this.renderType === 'button'
          ? html`
              <button part="label" type="button" class="breadcrumb-item__label breadcrumb-item__label--button">
                <slot @slotchange=${this.handleSlotChange}></slot>
              </button>
            `
          : ''}
        ${this.renderType === 'dropdown'
          ? html`
              <div part="label" class="breadcrumb-item__label breadcrumb-item__label--dropdown">
                <slot @slotchange=${this.handleSlotChange}></slot>
              </div>
            `
          : ''}

        <span part="suffix" class="breadcrumb-item__suffix">
          <slot name="suffix"></slot>
        </span>

        <span part="separator" class="breadcrumb-item__separator" aria-hidden="true">
          <slot name="separator"></slot>
        </span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-breadcrumb-item': WaBreadcrumbItem;
  }
}
