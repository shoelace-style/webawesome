import type { PropertyValueMap } from 'lit';
import { html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { live } from 'lit/directives/live.js';
import { when } from 'lit/directives/when.js';
import { WaAfterCollapseEvent } from '../../events/after-collapse.js';
import { WaAfterExpandEvent } from '../../events/after-expand.js';
import { WaCollapseEvent } from '../../events/collapse.js';
import { WaExpandEvent } from '../../events/expand.js';
import { WaLazyChangeEvent } from '../../events/lazy-change.js';
import { WaLazyLoadEvent } from '../../events/lazy-load.js';
import { animate, parseDuration } from '../../internal/animate.js';
import { watch } from '../../internal/watch.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import { LocalizeController } from '../../utilities/localize.js';
import '../checkbox/checkbox.js';
import '../icon/icon.js';
import '../spinner/spinner.js';
import styles from './tree-item.styles.js';

/**
 * @summary A tree item serves as a hierarchical node that lives inside a [tree](/docs/components/tree).
 * @documentation https://webawesome.com/docs/components/tree-item
 * @status stable
 * @since 2.0
 *
 * @dependency wa-checkbox
 * @dependency wa-icon
 * @dependency wa-spinner
 *
 * @event wa-expand - Emitted when the tree item expands.
 * @event wa-after-expand - Emitted after the tree item expands and all animations are complete.
 * @event wa-collapse - Emitted when the tree item collapses.
 * @event wa-after-collapse - Emitted after the tree item collapses and all animations are complete.
 * @event wa-lazy-change - Emitted when the tree item's lazy state changes.
 * @event wa-lazy-load - Emitted when a lazy item is selected. Use this event to asynchronously load data and append
 *  items to the tree before expanding. After appending new items, remove the `lazy` attribute to remove the loading
 *  state and update the tree.
 *
 * @slot - The default slot.
 * @slot expand-icon - The icon to show when the tree item is expanded.
 * @slot collapse-icon - The icon to show when the tree item is collapsed.
 *
 * @csspart base - The component's base wrapper.
 * @csspart item - The tree item's container. This element wraps everything except slotted tree item children.
 * @csspart indentation - The tree item's indentation container.
 * @csspart expand-button - The container that wraps the tree item's expand button and spinner.
 * @csspart spinner - The spinner that shows when a lazy tree item is in the loading state.
 * @csspart spinner__base - The spinner's base part.
 * @csspart label - The tree item's label.
 * @csspart children - The container that wraps the tree item's nested children.
 * @csspart checkbox - The checkbox that shows when using multiselect.
 * @csspart checkbox__base - The checkbox's exported `base` part.
 * @csspart checkbox__control - The checkbox's exported `control` part.
 * @csspart checkbox__checked-icon - The checkbox's exported `checked-icon` part.
 * @csspart checkbox__indeterminate-icon - The checkbox's exported `indeterminate-icon` part.
 * @csspart checkbox__label - The checkbox's exported `label` part.
 *
 * @cssproperty [--show-duration=200ms] - The animation duration when expanding tree items.
 * @cssproperty [--hide-duration=200ms] - The animation duration when collapsing tree items.
 *
 * @cssstate disabled - Applied when the tree item is disabled.
 * @cssstate expanded - Applied when the tree item is expanded.
 * @cssstate indeterminate - Applied when the selection is indeterminate.
 * @cssstate selected - Applied when the tree item is selected.
 */
@customElement('wa-tree-item')
export default class WaTreeItem extends WebAwesomeElement {
  static css = styles;

  static isTreeItem(node: Node) {
    return node instanceof Element && node.getAttribute('role') === 'treeitem';
  }

  private readonly localize = new LocalizeController(this);

  @state() indeterminate = false;
  @state() isLeaf = false;
  @state() loading = false;
  @state() selectable = false;

  /** Expands the tree item. */
  @property({ type: Boolean, reflect: true }) expanded = false;

  /** Draws the tree item in a selected state. */
  @property({ type: Boolean, reflect: true }) selected = false;

  /** Disables the tree item. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Enables lazy loading behavior. */
  @property({ type: Boolean, reflect: true }) lazy = false;

  @query('slot:not([name])') defaultSlot: HTMLSlotElement;
  @query('slot[name=children]') childrenSlot: HTMLSlotElement;
  @query('.item') itemElement: HTMLDivElement;
  @query('.children') childrenContainer: HTMLDivElement;
  @query('.expand-button slot') expandButtonSlot: HTMLSlotElement;

  connectedCallback() {
    super.connectedCallback();

    this.setAttribute('role', 'treeitem');
    this.setAttribute('tabindex', '-1');

    if (this.isNestedItem()) {
      this.slot = 'children';
    }
  }

  firstUpdated() {
    this.childrenContainer.hidden = !this.expanded;
    this.childrenContainer.style.height = this.expanded ? 'auto' : '0';

    this.isLeaf = !this.lazy && this.getChildrenItems().length === 0;
    this.handleExpandedChange();
  }

  private async animateCollapse() {
    this.dispatchEvent(new WaCollapseEvent());

    const duration = parseDuration(getComputedStyle(this.childrenContainer).getPropertyValue('--hide-duration'));
    await animate(
      this.childrenContainer,
      [
        // We can't animate from 'auto', so use the scroll height for now
        { height: `${this.childrenContainer.scrollHeight}px`, opacity: '1', overflow: 'hidden' },
        { height: '0', opacity: '0', overflow: 'hidden' },
      ],
      { duration, easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)' },
    );
    this.childrenContainer.hidden = true;

    this.dispatchEvent(new WaAfterCollapseEvent());
  }

  // Checks whether the item is nested into an item
  private isNestedItem(): boolean {
    const parent = this.parentElement;
    return !!parent && WaTreeItem.isTreeItem(parent);
  }

  private handleChildrenSlotChange() {
    this.loading = false;
    this.isLeaf = !this.lazy && this.getChildrenItems().length === 0;
  }

  protected willUpdate(changedProperties: PropertyValueMap<WaTreeItem> | Map<PropertyKey, unknown>) {
    if (changedProperties.has('selected') && !changedProperties.has('indeterminate')) {
      this.indeterminate = false;
    }
  }

  private async animateExpand() {
    this.dispatchEvent(new WaExpandEvent());

    this.childrenContainer.hidden = false;
    // We can't animate to 'auto', so use the scroll height for now
    const duration = parseDuration(getComputedStyle(this.childrenContainer).getPropertyValue('--show-duration'));
    await animate(
      this.childrenContainer,
      [
        { height: '0', opacity: '0', overflow: 'hidden' },
        { height: `${this.childrenContainer.scrollHeight}px`, opacity: '1', overflow: 'hidden' },
      ],
      {
        duration,
        easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
      },
    );
    this.childrenContainer.style.height = 'auto';

    this.dispatchEvent(new WaAfterExpandEvent());
  }

  @watch('loading', { waitUntilFirstUpdate: true })
  handleLoadingChange() {
    this.setAttribute('aria-busy', this.loading ? 'true' : 'false');

    if (!this.loading) {
      this.animateExpand();
    }
  }

  @watch('disabled')
  handleDisabledChange() {
    this.customStates.set('disabled', this.disabled);
    this.setAttribute('aria-disabled', this.disabled ? 'true' : 'false');
  }

  @watch('expanded')
  handleExpandedState() {
    this.customStates.set('expanded', this.expanded);
  }

  @watch('indeterminate')
  handleIndeterminateStateChange() {
    this.customStates.set('indeterminate', this.indeterminate);
  }

  @watch('selected')
  handleSelectedChange() {
    this.customStates.set('selected', this.selected);
    this.setAttribute('aria-selected', this.selected ? 'true' : 'false');
  }

  @watch('expanded', { waitUntilFirstUpdate: true })
  handleExpandedChange() {
    if (!this.isLeaf) {
      this.setAttribute('aria-expanded', this.expanded ? 'true' : 'false');
    } else {
      this.removeAttribute('aria-expanded');
    }
  }

  @watch('expanded', { waitUntilFirstUpdate: true })
  handleExpandAnimation() {
    if (this.expanded) {
      if (this.lazy) {
        this.loading = true;
        this.dispatchEvent(new WaLazyLoadEvent());
      } else {
        this.animateExpand();
      }
    } else {
      this.animateCollapse();
    }
  }

  @watch('lazy', { waitUntilFirstUpdate: true })
  handleLazyChange() {
    this.dispatchEvent(new WaLazyChangeEvent());
  }

  /** Gets all the nested tree items in this node. */
  getChildrenItems({ includeDisabled = true }: { includeDisabled?: boolean } = {}): WaTreeItem[] {
    return this.childrenSlot
      ? ([...this.childrenSlot.assignedElements({ flatten: true })].filter(
          (item: WaTreeItem) => WaTreeItem.isTreeItem(item) && (includeDisabled || !item.disabled),
        ) as WaTreeItem[])
      : [];
  }

  render() {
    const isRtl = this.localize.dir() === 'rtl';
    const showExpandButton = !this.loading && (!this.isLeaf || this.lazy);

    return html`
      <div
        part="base"
        class="${classMap({
          'tree-item': true,
          'tree-item-expanded': this.expanded,
          'tree-item-selected': this.selected,
          'tree-item-leaf': this.isLeaf,
          'tree-item-loading': this.loading,
          'tree-item-has-expand-button': showExpandButton,
        })}"
      >
        <div class="item" part="item">
          <div class="indentation" part="indentation"></div>

          <div
            part="expand-button"
            class=${classMap({
              'expand-button': true,
              'expand-button-visible': showExpandButton,
            })}
            aria-hidden="true"
          >
            <slot class="expand-icon-slot" name="expand-icon">
              ${when(
                this.loading,
                () => html` <wa-spinner part="spinner" exportparts="base:spinner__base"></wa-spinner> `,
                () => html`
                  <wa-icon name=${isRtl ? 'chevron-left' : 'chevron-right'} library="system" variant="solid"></wa-icon>
                `,
              )}
            </slot>
            <slot class="expand-icon-slot" name="collapse-icon">
              <wa-icon name=${isRtl ? 'chevron-left' : 'chevron-right'} library="system" variant="solid"></wa-icon>
            </slot>
          </div>

          ${when(
            this.selectable,
            () => html`
              <wa-checkbox
                part="checkbox"
                exportparts="
                    base:checkbox__base,
                    control:checkbox__control,
                    checked-icon:checkbox__checked-icon,
                    indeterminate-icon:checkbox__indeterminate-icon,
                    label:checkbox__label
                  "
                class="checkbox"
                ?disabled="${this.disabled}"
                ?checked="${live(this.selected)}"
                ?indeterminate="${this.indeterminate}"
                tabindex="-1"
              ></wa-checkbox>
            `,
          )}

          <slot class="label" part="label"></slot>
        </div>

        <div class="children" part="children" role="group">
          <slot name="children" @slotchange="${this.handleChildrenSlotChange}"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-tree-item': WaTreeItem;
  }
}
