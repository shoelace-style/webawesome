import type { TemplateResult } from 'lit';
import { html, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { repeat } from 'lit/directives/repeat.js';
import { drag } from '../../internal/drag.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import { LocalizeController } from '../../utilities/localize.js';
import styles from './dock-panel.css';

/** Represents a single tab within a dock panel */
export interface DockTab {
  /** Unique identifier for the tab */
  id: string;
  /** Display label for the tab */
  label: string;
  /** Whether the tab can be closed */
  closable?: boolean;
  /** Custom icon name */
  icon?: string;
}

/** Represents a panel node in the dock layout tree */
export interface DockPanelNode {
  /** Unique identifier for the panel */
  id: string;
  /** Type of node - 'tabs' for a tab container, 'split' for a split container */
  type: 'tabs' | 'split';
  /** For tab nodes: array of tabs */
  tabs?: DockTab[];
  /** For tab nodes: currently active tab id */
  activeTabId?: string;
  /** For split nodes: direction of split */
  direction?: 'horizontal' | 'vertical';
  /** For split nodes: child panels */
  children?: DockPanelNode[];
  /** For split nodes: sizes as percentages (should sum to 100) */
  sizes?: number[];
}

/** Drop zone information */
export type DropZone = 'center' | 'left' | 'right' | 'top' | 'bottom';

let idCounter = 0;
function generateId(): string {
  return `dock-panel-${++idCounter}`;
}

/**
 * @summary Dock panels provide a flexible layout system with draggable tabs that can be split horizontally or vertically.
 * @documentation https://webawesome.com/docs/components/dock-panel
 * @status experimental
 * @since 3
 *
 * @event wa-dock-tab-show - Emitted when a tab is shown. Detail contains `panelId` and `tabId`.
 * @event wa-dock-tab-hide - Emitted when a tab is hidden. Detail contains `panelId` and `tabId`.
 * @event wa-dock-tab-close - Emitted when a tab close button is clicked. Detail contains `panelId` and `tabId`.
 * @event wa-dock-tab-move - Emitted when a tab is moved via drag and drop. Detail contains `tabId`, `sourcePanelId`, `targetPanelId`, and `dropZone`.
 * @event wa-dock-layout-change - Emitted when the layout structure changes (splits, merges).
 * @event wa-dock-resize - Emitted when a divider is moved.
 *
 * @slot - The default slot for tab content. Use data-tab-id attribute to associate content with tabs.
 *
 * @csspart base - The component's base wrapper.
 * @csspart panel - A panel container.
 * @csspart tabs - The tab bar container.
 * @csspart tab - An individual tab.
 * @csspart tab-active - The active tab.
 * @csspart content - The content area.
 * @csspart divider - A divider between split panels.
 * @csspart drop-zone - The drop zone indicator.
 *
 * @cssproperty [--divider-width=4px] - The width of the divider between split panels.
 * @cssproperty [--divider-hit-area=12px] - The draggable area around the divider.
 * @cssproperty [--tab-height=36px] - The height of the tab bar.
 * @cssproperty [--drop-zone-color] - The color of drop zone indicators. Defaults to a semi-transparent primary color.
 */
@customElement('wa-dock-panel')
export default class WaDockPanel extends WebAwesomeElement {
  static css = styles;

  private readonly localize = new LocalizeController(this);
  private resizeObserver: ResizeObserver;
  private draggedTabId: string | null = null;
  private draggedFromPanelId: string | null = null;

  @query('.dock-panel') container: HTMLElement;

  /** The layout structure of the dock panel */
  @property({ type: Object, attribute: false })
  layout: DockPanelNode;

  /** Disables all drag and drop functionality */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Minimum panel size in pixels */
  @property({ type: Number, attribute: 'min-panel-size' }) minPanelSize = 100;

  @state() private dropTarget: { panelId: string; zone: DropZone } | null = null;
  @state() private resizingDivider: { parentId: string; index: number } | null = null;
  @state() private tabDropTarget: { panelId: string; insertIndex: number } | null = null;

  constructor() {
    super();
    this.layout = {
      id: generateId(),
      type: 'tabs',
      tabs: [],
      activeTabId: undefined,
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.resizeObserver = new ResizeObserver(() => this.requestUpdate());
    this.updateComplete.then(() => {
      if (this.container) {
        this.resizeObserver.observe(this.container);
      }
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.resizeObserver?.disconnect();
  }

  /**
   * Adds a new tab to a specific panel
   * @param panelId - The panel to add the tab to
   * @param tab - The tab configuration
   */
  addTab(panelId: string, tab: DockTab): void {
    const newLayout = this.deepCloneLayout(this.layout);
    const panel = this.findPanel(newLayout, panelId);
    if (panel && panel.type === 'tabs') {
      if (!panel.tabs) {
        panel.tabs = [];
      }
      panel.tabs.push({ ...tab });
      if (!panel.activeTabId) {
        panel.activeTabId = tab.id;
      }
      this.layout = newLayout;
      this.dispatchEvent(
        new CustomEvent('wa-dock-layout-change', { detail: { layout: this.layout }, bubbles: true, composed: true }),
      );
    }
  }

  /**
   * Removes a tab from the dock panel
   * @param tabId - The tab to remove
   */
  removeTab(tabId: string): void {
    const newLayout = this.deepCloneLayout(this.layout);
    this.removeTabFromLayout(newLayout, tabId);
    this.layout = newLayout;
    this.cleanupEmptyPanels();
    this.dispatchEvent(
      new CustomEvent('wa-dock-layout-change', { detail: { layout: this.layout }, bubbles: true, composed: true }),
    );
  }

  /**
   * Activates a specific tab
   * @param panelId - The panel containing the tab
   * @param tabId - The tab to activate
   */
  activateTab(panelId: string, tabId: string): void {
    const newLayout = this.deepCloneLayout(this.layout);
    const panel = this.findPanel(newLayout, panelId);
    if (panel && panel.type === 'tabs' && panel.tabs?.some(t => t.id === tabId)) {
      const previousTabId = panel.activeTabId;
      panel.activeTabId = tabId;
      this.layout = newLayout;

      if (previousTabId && previousTabId !== tabId) {
        this.dispatchEvent(
          new CustomEvent('wa-dock-tab-hide', {
            detail: { panelId, tabId: previousTabId },
            bubbles: true,
            composed: true,
          }),
        );
      }
      this.dispatchEvent(
        new CustomEvent('wa-dock-tab-show', { detail: { panelId, tabId }, bubbles: true, composed: true }),
      );
    }
  }

  private findPanel(node: DockPanelNode, panelId: string): DockPanelNode | null {
    if (node.id === panelId) {
      return node;
    }
    if (node.type === 'split' && node.children) {
      for (const child of node.children) {
        const found = this.findPanel(child, panelId);
        if (found) return found;
      }
    }
    return null;
  }

  private deepCloneLayout(node: DockPanelNode): DockPanelNode {
    const clone: DockPanelNode = {
      id: node.id,
      type: node.type,
    };

    if (node.tabs) {
      clone.tabs = node.tabs.map(tab => ({ ...tab }));
    }
    if (node.activeTabId !== undefined) {
      clone.activeTabId = node.activeTabId;
    }
    if (node.direction) {
      clone.direction = node.direction;
    }
    if (node.children) {
      clone.children = node.children.map(child => this.deepCloneLayout(child));
    }
    if (node.sizes) {
      clone.sizes = [...node.sizes];
    }

    return clone;
  }

  private removeTabFromLayout(node: DockPanelNode, tabId: string): boolean {
    if (node.type === 'tabs' && node.tabs) {
      const index = node.tabs.findIndex(t => t.id === tabId);
      if (index !== -1) {
        node.tabs.splice(index, 1);
        if (node.activeTabId === tabId) {
          node.activeTabId = node.tabs[0]?.id;
        }
        return true;
      }
    }
    if (node.type === 'split' && node.children) {
      for (const child of node.children) {
        if (this.removeTabFromLayout(child, tabId)) {
          return true;
        }
      }
    }
    return false;
  }

  private cleanupEmptyPanels(): void {
    this.layout = this.cleanupNode(this.layout);
  }

  private cleanupNode(node: DockPanelNode): DockPanelNode {
    if (node.type === 'split' && node.children) {
      // Recursively clean children
      node.children = node.children
        .map(child => this.cleanupNode(child))
        .filter(child => {
          if (child.type === 'tabs') {
            return child.tabs && child.tabs.length > 0;
          }
          return child.type === 'split' && child.children && child.children.length > 0;
        });

      // Recalculate sizes
      if (node.children.length > 0 && node.sizes) {
        const totalSize = node.sizes.reduce((a, b) => a + b, 0);
        const remainingIndexes = node.children.map((_, i) => i);
        const remainingSizes = remainingIndexes.map(i => node.sizes![i] || totalSize / remainingIndexes.length);
        const remainingTotal = remainingSizes.reduce((a, b) => a + b, 0);
        node.sizes = remainingSizes.map(s => (s / remainingTotal) * 100);
      }

      // If only one child remains, promote it
      if (node.children.length === 1) {
        return node.children[0];
      }
    }
    return node;
  }

  private handleTabClick(panelId: string, tabId: string): void {
    this.activateTab(panelId, tabId);
  }

  private handleTabClose(event: Event, panelId: string, tabId: string): void {
    event.stopPropagation();
    this.dispatchEvent(
      new CustomEvent('wa-dock-tab-close', { detail: { panelId, tabId }, bubbles: true, composed: true }),
    );
  }

  private handleTabDragStart(event: DragEvent, panelId: string, tabId: string): void {
    if (this.disabled) return;

    this.draggedTabId = tabId;
    this.draggedFromPanelId = panelId;

    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', JSON.stringify({ tabId, panelId }));
    }
  }

  private handleTabDragEnd(): void {
    this.draggedTabId = null;
    this.draggedFromPanelId = null;
    this.dropTarget = null;
    this.tabDropTarget = null;
  }

  private handleTabBarDragOver(event: DragEvent, panelId: string): void {
    if (this.disabled || !this.draggedTabId) return;

    event.preventDefault();
    event.stopPropagation();

    // Clear the panel drop target when over the tab bar
    this.dropTarget = null;

    const tabBar = event.currentTarget as HTMLElement;
    const tabs = Array.from(tabBar.querySelectorAll('.dock-panel__tab')) as HTMLElement[];

    if (tabs.length === 0) {
      this.tabDropTarget = { panelId, insertIndex: 0 };
      return;
    }

    // Find the insert position based on mouse position
    const mouseX = event.clientX;
    let insertIndex = tabs.length;

    for (let i = 0; i < tabs.length; i++) {
      const tabRect = tabs[i].getBoundingClientRect();
      const tabCenter = tabRect.left + tabRect.width / 2;

      if (mouseX < tabCenter) {
        insertIndex = i;
        break;
      }
    }

    this.tabDropTarget = { panelId, insertIndex };
  }

  private handleTabBarDragLeave(event: DragEvent): void {
    const relatedTarget = event.relatedTarget as HTMLElement;
    const currentTarget = event.currentTarget as HTMLElement;
    if (!relatedTarget || !currentTarget.contains(relatedTarget)) {
      this.tabDropTarget = null;
    }
  }

  private handleTabBarDrop(event: DragEvent, panelId: string): void {
    event.preventDefault();
    event.stopPropagation();

    if (this.disabled || !this.draggedTabId || !this.draggedFromPanelId || !this.tabDropTarget) {
      this.handleTabDragEnd();
      return;
    }

    const tabId = this.draggedTabId;
    const sourcePanelId = this.draggedFromPanelId;
    const { insertIndex } = this.tabDropTarget;

    // Deep clone the layout
    const newLayout = this.deepCloneLayout(this.layout);

    // Find the source panel
    const sourcePanel = this.findPanel(newLayout, sourcePanelId);
    if (!sourcePanel || sourcePanel.type !== 'tabs' || !sourcePanel.tabs) {
      this.handleTabDragEnd();
      return;
    }

    const tabIndex = sourcePanel.tabs.findIndex(t => t.id === tabId);
    if (tabIndex === -1) {
      this.handleTabDragEnd();
      return;
    }

    const tab = { ...sourcePanel.tabs[tabIndex] };

    // Calculate the actual insert index before removing
    let actualInsertIndex = insertIndex;

    // If moving within the same panel, adjust the index if needed
    if (sourcePanelId === panelId && tabIndex < insertIndex) {
      actualInsertIndex = insertIndex - 1;
    }

    // Check if this is just a reorder within the same panel with no actual change
    if (sourcePanelId === panelId && tabIndex === actualInsertIndex) {
      this.handleTabDragEnd();
      return;
    }

    // Remove from source
    sourcePanel.tabs.splice(tabIndex, 1);

    // Find the target panel
    const targetPanel = this.findPanel(newLayout, panelId);
    if (!targetPanel || targetPanel.type !== 'tabs') {
      this.handleTabDragEnd();
      return;
    }

    if (!targetPanel.tabs) {
      targetPanel.tabs = [];
    }

    // Insert at the new position
    targetPanel.tabs.splice(actualInsertIndex, 0, tab);
    targetPanel.activeTabId = tab.id;

    // Update active tab in source if needed
    if (sourcePanelId !== panelId && sourcePanel.activeTabId === tabId) {
      sourcePanel.activeTabId = sourcePanel.tabs[0]?.id;
    }

    this.layout = newLayout;
    this.cleanupEmptyPanels();

    // Only emit wa-dock-tab-move when moving between different panels
    if (sourcePanelId !== panelId) {
      this.dispatchEvent(
        new CustomEvent('wa-dock-tab-move', {
          detail: { tabId, sourcePanelId, targetPanelId: panelId, dropZone: 'center' },
          bubbles: true,
          composed: true,
        }),
      );
    }

    this.dispatchEvent(
      new CustomEvent('wa-dock-layout-change', { detail: { layout: this.layout }, bubbles: true, composed: true }),
    );

    this.handleTabDragEnd();
  }

  private handlePanelDragOver(event: DragEvent, panelId: string): void {
    if (this.disabled || !this.draggedTabId) return;

    event.preventDefault();
    event.stopPropagation();

    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const width = rect.width;
    const height = rect.height;

    // Determine drop zone based on position
    const edgeThreshold = 0.25; // 25% from each edge
    let zone: DropZone = 'center';

    if (x < width * edgeThreshold) {
      zone = 'left';
    } else if (x > width * (1 - edgeThreshold)) {
      zone = 'right';
    } else if (y < height * edgeThreshold) {
      zone = 'top';
    } else if (y > height * (1 - edgeThreshold)) {
      zone = 'bottom';
    }

    this.dropTarget = { panelId, zone };
  }

  private handlePanelDragLeave(event: DragEvent): void {
    // Only clear if we're leaving the panel entirely
    const relatedTarget = event.relatedTarget as HTMLElement;
    const currentTarget = event.currentTarget as HTMLElement;
    if (!relatedTarget || !currentTarget.contains(relatedTarget)) {
      this.dropTarget = null;
    }
  }

  private handlePanelDrop(event: DragEvent, targetPanelId: string): void {
    event.preventDefault();
    event.stopPropagation();

    if (this.disabled || !this.draggedTabId || !this.draggedFromPanelId || !this.dropTarget) {
      this.handleTabDragEnd();
      return;
    }

    const { zone } = this.dropTarget;
    const tabId = this.draggedTabId;
    const sourcePanelId = this.draggedFromPanelId;

    // Deep clone the layout to ensure Lit detects changes
    const newLayout = this.deepCloneLayout(this.layout);

    // Find the source panel and tab in the cloned layout
    const sourcePanel = this.findPanel(newLayout, sourcePanelId);
    if (!sourcePanel || sourcePanel.type !== 'tabs' || !sourcePanel.tabs) {
      this.handleTabDragEnd();
      return;
    }

    const tabIndex = sourcePanel.tabs.findIndex(t => t.id === tabId);
    if (tabIndex === -1) {
      this.handleTabDragEnd();
      return;
    }

    const tab = { ...sourcePanel.tabs[tabIndex] };

    if (zone === 'center') {
      // Move tab to target panel
      if (sourcePanelId !== targetPanelId) {
        sourcePanel.tabs.splice(tabIndex, 1);
        if (sourcePanel.activeTabId === tabId) {
          sourcePanel.activeTabId = sourcePanel.tabs[0]?.id;
        }

        const targetPanel = this.findPanel(newLayout, targetPanelId);
        if (targetPanel && targetPanel.type === 'tabs') {
          if (!targetPanel.tabs) {
            targetPanel.tabs = [];
          }
          targetPanel.tabs.push(tab);
          targetPanel.activeTabId = tab.id;
        }
      }
    } else {
      // Remove from source first
      sourcePanel.tabs.splice(tabIndex, 1);
      if (sourcePanel.activeTabId === tabId) {
        sourcePanel.activeTabId = sourcePanel.tabs[0]?.id;
      }
      // Split the panel (operates on newLayout)
      this.splitPanelInLayout(newLayout, targetPanelId, tab, zone);
    }

    this.layout = newLayout;
    this.cleanupEmptyPanels();

    this.dispatchEvent(
      new CustomEvent('wa-dock-tab-move', {
        detail: { tabId, sourcePanelId, targetPanelId, dropZone: zone },
        bubbles: true,
        composed: true,
      }),
    );
    this.dispatchEvent(
      new CustomEvent('wa-dock-layout-change', { detail: { layout: this.layout }, bubbles: true, composed: true }),
    );

    this.handleTabDragEnd();
  }

  private splitPanelInLayout(layout: DockPanelNode, panelId: string, tab: DockTab, zone: DropZone): void {
    const targetPanel = this.findPanel(layout, panelId);
    if (!targetPanel) return;

    const direction: 'horizontal' | 'vertical' = zone === 'left' || zone === 'right' ? 'horizontal' : 'vertical';

    const newPanel: DockPanelNode = {
      id: generateId(),
      type: 'tabs',
      tabs: [tab],
      activeTabId: tab.id,
    };

    // Create a copy of the target panel's content
    const existingPanel: DockPanelNode = {
      id: generateId(),
      type: targetPanel.type,
      tabs: targetPanel.tabs ? [...targetPanel.tabs] : undefined,
      activeTabId: targetPanel.activeTabId,
      direction: targetPanel.direction,
      children: targetPanel.children ? [...targetPanel.children] : undefined,
      sizes: targetPanel.sizes ? [...targetPanel.sizes] : undefined,
    };

    // Transform target panel into a split
    targetPanel.type = 'split';
    targetPanel.direction = direction;
    targetPanel.tabs = undefined;
    targetPanel.activeTabId = undefined;

    if (zone === 'left' || zone === 'top') {
      targetPanel.children = [newPanel, existingPanel];
    } else {
      targetPanel.children = [existingPanel, newPanel];
    }
    targetPanel.sizes = [50, 50];
  }

  private handleDividerDrag(event: PointerEvent, parentId: string, dividerIndex: number): void {
    if (this.disabled) return;

    event.preventDefault();

    const initialLayout = this.deepCloneLayout(this.layout);
    const initialParent = this.findPanel(initialLayout, parentId);
    if (!initialParent || initialParent.type !== 'split' || !initialParent.children || !initialParent.sizes) return;

    this.resizingDivider = { parentId, index: dividerIndex };

    const parentElement = this.shadowRoot!.querySelector(`[data-panel-id="${parentId}"]`) as HTMLElement | null;
    if (!parentElement) return;

    const isVertical = initialParent.direction === 'vertical';
    const parentRect = parentElement.getBoundingClientRect();
    const totalSize = isVertical ? parentRect.height : parentRect.width;

    // Store initial sizes for calculating deltas
    const initialSizes = [...initialParent.sizes];

    drag(parentElement, {
      onMove: (x, y) => {
        const pos = isVertical ? y : x;
        const percentage = (pos / totalSize) * 100;

        const minPercentage = (this.minPanelSize / totalSize) * 100;

        // Calculate what the cumulative size should be up to dividerIndex
        const initialBeforeTotal = initialSizes.slice(0, dividerIndex + 1).reduce((a, b) => a + b, 0);

        // Calculate the difference from the initial position
        const diff = percentage - initialBeforeTotal;

        // Create new sizes array
        const newSizes = [...initialSizes];
        newSizes[dividerIndex] = Math.max(initialSizes[dividerIndex] + diff, minPercentage);
        newSizes[dividerIndex + 1] = Math.max(initialSizes[dividerIndex + 1] - diff, minPercentage);

        // Create a fresh deep clone and update the sizes
        const newLayout = this.deepCloneLayout(this.layout);
        const targetParent = this.findPanel(newLayout, parentId);
        if (targetParent && targetParent.type === 'split' && targetParent.sizes) {
          targetParent.sizes = newSizes;
          this.layout = newLayout;

          this.dispatchEvent(
            new CustomEvent('wa-dock-resize', {
              detail: { parentId, sizes: newSizes },
              bubbles: true,
              composed: true,
            }),
          );
        }
      },
      onStop: () => {
        this.resizingDivider = null;
      },
      initialEvent: event,
    });
  }

  private renderDropZoneIndicator(panelId: string): TemplateResult | typeof nothing {
    if (!this.dropTarget || this.dropTarget.panelId !== panelId) {
      return nothing;
    }

    const { zone } = this.dropTarget;

    return html`
      <div
        part="drop-zone"
        class=${classMap({
          'drop-zone': true,
          'drop-zone--center': zone === 'center',
          'drop-zone--left': zone === 'left',
          'drop-zone--right': zone === 'right',
          'drop-zone--top': zone === 'top',
          'drop-zone--bottom': zone === 'bottom',
        })}
      ></div>
    `;
  }

  private renderTabs(panel: DockPanelNode): TemplateResult {
    const tabs = panel.tabs || [];

    return html`
      <div
        part="panel"
        class="dock-panel__panel"
        data-panel-id=${panel.id}
        @dragover=${(e: DragEvent) => this.handlePanelDragOver(e, panel.id)}
        @dragleave=${this.handlePanelDragLeave}
        @drop=${(e: DragEvent) => this.handlePanelDrop(e, panel.id)}
      >
        <div
          part="tabs"
          class="dock-panel__tabs"
          @dragover=${(e: DragEvent) => this.handleTabBarDragOver(e, panel.id)}
          @dragleave=${this.handleTabBarDragLeave}
          @drop=${(e: DragEvent) => this.handleTabBarDrop(e, panel.id)}
        >
          ${repeat(
            tabs,
            tab => tab.id,
            (tab, index) => html`
              ${this.tabDropTarget?.panelId === panel.id && this.tabDropTarget?.insertIndex === index
                ? html`<div class="dock-panel__tab-drop-indicator"></div>`
                : nothing}
              <div
                part="tab ${panel.activeTabId === tab.id ? 'tab-active' : ''}"
                class=${classMap({
                  'dock-panel__tab': true,
                  'dock-panel__tab--active': panel.activeTabId === tab.id,
                  'dock-panel__tab--closable': tab.closable ?? false,
                })}
                draggable=${this.disabled ? 'false' : 'true'}
                @click=${() => this.handleTabClick(panel.id, tab.id)}
                @dragstart=${(e: DragEvent) => this.handleTabDragStart(e, panel.id, tab.id)}
                @dragend=${this.handleTabDragEnd}
              >
                ${tab.icon ? html`<wa-icon name=${tab.icon} class="dock-panel__tab-icon"></wa-icon>` : nothing}
                <span class="dock-panel__tab-label">${tab.label}</span>
                ${tab.closable
                  ? html`
                      <button
                        class="dock-panel__tab-close"
                        @click=${(e: Event) => this.handleTabClose(e, panel.id, tab.id)}
                        aria-label=${this.localize.term('close')}
                      >
                        <wa-icon name="x-lg" library="system"></wa-icon>
                      </button>
                    `
                  : nothing}
              </div>
            `,
          )}
          ${this.tabDropTarget?.panelId === panel.id && this.tabDropTarget?.insertIndex === tabs.length
            ? html`<div class="dock-panel__tab-drop-indicator"></div>`
            : nothing}
        </div>
        <div part="content" class="dock-panel__content">
          <slot name=${panel.activeTabId || ''}></slot>
          ${this.renderDropZoneIndicator(panel.id)}
        </div>
      </div>
    `;
  }

  private renderSplit(panel: DockPanelNode): TemplateResult {
    if (!panel.children || panel.children.length === 0) {
      return html``;
    }

    const isVertical = panel.direction === 'vertical';
    const sizes = panel.sizes || panel.children.map(() => 100 / panel.children!.length);

    // Build grid template
    const gridTemplate = sizes
      .map((size, index) => {
        const sizeStr = `${size}%`;
        if (index < sizes.length - 1) {
          return `${sizeStr} var(--divider-width)`;
        }
        return sizeStr;
      })
      .join(' ');

    return html`
      <div
        part="panel"
        class=${classMap({
          'dock-panel__split': true,
          'dock-panel__split--horizontal': !isVertical,
          'dock-panel__split--vertical': isVertical,
        })}
        data-panel-id=${panel.id}
        style=${isVertical ? `grid-template-rows: ${gridTemplate}` : `grid-template-columns: ${gridTemplate}`}
      >
        ${repeat(
          panel.children,
          child => child.id,
          (child, index) => html`
            ${this.renderPanel(child)}
            ${index < panel.children!.length - 1
              ? html`
                  <div
                    part="divider"
                    class=${classMap({
                      'dock-panel__divider': true,
                      'dock-panel__divider--vertical': isVertical,
                      'dock-panel__divider--horizontal': !isVertical,
                      'dock-panel__divider--active':
                        this.resizingDivider?.parentId === panel.id && this.resizingDivider?.index === index,
                    })}
                    tabindex=${this.disabled ? nothing : '0'}
                    role="separator"
                    aria-label=${this.localize.term('resize')}
                    @mousedown=${(e: PointerEvent) => this.handleDividerDrag(e, panel.id, index)}
                    @touchstart=${(e: PointerEvent) => this.handleDividerDrag(e, panel.id, index)}
                  ></div>
                `
              : nothing}
          `,
        )}
      </div>
    `;
  }

  private renderPanel(panel: DockPanelNode): TemplateResult {
    if (panel.type === 'tabs') {
      return this.renderTabs(panel);
    }
    return this.renderSplit(panel);
  }

  render() {
    return html`
      <div
        part="base"
        class=${classMap({
          'dock-panel': true,
          'dock-panel--disabled': this.disabled,
          'dock-panel--dragging': this.draggedTabId !== null,
        })}
      >
        ${this.renderPanel(this.layout)}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-dock-panel': WaDockPanel;
  }
}
