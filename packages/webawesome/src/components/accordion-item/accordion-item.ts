import { html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { animate, parseDuration } from '../../internal/animate.js';
import { waitForEvent } from '../../internal/event.js';
import { watch } from '../../internal/watch.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import { WaAccordionItemCollapsedEvent } from '../../events/accordion-item-collapsed.js';
import { WaAccordionItemExpandedEvent } from '../../events/accordion-item-expanded.js';
import { WaAccordionItemTriggerEvent } from '../../events/accordion-item-trigger.js';
import '../icon/icon.js';
import styles from './accordion-item.styles.js';

/**
 * @summary Accordion items are used inside `<wa-accordion>` to create expandable sections with accessible headers.
 * @documentation https://webawesome.com/docs/components/accordion
 * @status experimental
 * @since 1.0
 *
 * @dependency wa-icon
 *
 * @slot - The accordion item's body content.
 * @slot label - The accordion item's label. Alternatively, use the `label` attribute.
 * @slot icon - Optional expand/collapse icon. Works best with `<wa-icon>`.
 *
 * @csspart base - The component's base wrapper.
 * @csspart heading - The heading element wrapping the trigger button. Omitted when `heading-level="none"`.
 * @csspart button - The trigger button that toggles the panel.
 * @csspart label - The container that wraps the label.
 * @csspart icon - The container that wraps the expand/collapse icon.
 * @csspart panel - The panel that contains the item's content.
 * @csspart content - The content slot inside the panel.
 *
 * @cssproperty [--padding=1em] - The amount of padding inside the header and panel. Em-based so it scales with font size.
 * @cssproperty [--duration=200ms] - The animation duration for expand/collapse.
 * @cssproperty [--easing=ease] - The animation easing for expand/collapse.
 *
 * @cssstate animating - Applied while the panel is animating.
 */
@customElement('wa-accordion-item')
export default class WaAccordionItem extends WebAwesomeElement {
  static css = styles;

  private animationGeneration = 0;

  @query('.body') private body: HTMLElement;
  @query('[part~="button"]') private triggerButton: HTMLButtonElement;

  @state() private isAnimating = false;

  /** The text label shown in the header. If you need HTML, use the `label` slot instead. */
  @property() label = '';

  /** Expands the accordion item. */
  @property({ type: Boolean, reflect: true }) expanded = false;

  /** Disables the accordion item so it can't be toggled. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** @internal Set by the parent accordion to control the heading level of the trigger. */
  @property({ attribute: 'heading-level', reflect: true }) headingLevel = '3';

  /** @internal Set by the parent accordion to control the roving tab index. */
  @property({ type: Boolean, attribute: false }) isTabbable = true;

  /** @internal Set by the parent accordion to control icon placement. */
  @property({ attribute: 'icon-placement', reflect: true }) iconPlacement: 'start' | 'end' = 'end';

  firstUpdated() {
    this.body.style.height = this.expanded ? 'auto' : '0';
  }

  updated() {
    this.customStates.set('animating', this.isAnimating);
  }

  private handleTriggerClick() {
    if (this.disabled) return;
    this.dispatchEvent(new WaAccordionItemTriggerEvent({ item: this }));
  }

  private handleTriggerKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.handleTriggerClick();
    }
  }

  @watch('expanded', { waitUntilFirstUpdate: true })
  async handleExpandedChange() {
    this.animationGeneration++;
    const generation = this.animationGeneration;

    if (this.expanded) {
      this.isAnimating = true;
      const duration = parseDuration(getComputedStyle(this.body).getPropertyValue('--duration') || '200ms');
      const easing = getComputedStyle(this.body).getPropertyValue('--easing') || 'ease';
      await animate(
        this.body,
        [
          { height: '0', opacity: '0' },
          { height: `${this.body.scrollHeight}px`, opacity: '1' },
        ],
        { duration, easing },
      );
      if (this.animationGeneration !== generation) return;
      this.body.style.height = 'auto';
      this.isAnimating = false;
      this.dispatchEvent(new WaAccordionItemExpandedEvent());
    } else {
      this.isAnimating = true;
      const duration = parseDuration(getComputedStyle(this.body).getPropertyValue('--duration') || '200ms');
      const easing = getComputedStyle(this.body).getPropertyValue('--easing') || 'ease';
      await animate(
        this.body,
        [
          { height: `${this.body.scrollHeight}px`, opacity: '1' },
          { height: '0', opacity: '0' },
        ],
        { duration, easing },
      );
      if (this.animationGeneration !== generation) return;
      this.body.style.height = '0';
      this.isAnimating = false;
      this.dispatchEvent(new WaAccordionItemCollapsedEvent());
    }
  }

  /** Expands the accordion item with animation. */
  async expand() {
    if (this.expanded || this.disabled) return;
    this.expanded = true;
    return waitForEvent(this, 'wa-accordion-item-expanded');
  }

  /** Collapses the accordion item with animation. */
  async collapse() {
    if (!this.expanded || this.disabled) return;
    this.expanded = false;
    return waitForEvent(this, 'wa-accordion-item-collapsed');
  }

  /** Toggles the accordion item's expanded state. */
  async toggle() {
    return this.expanded ? this.collapse() : this.expand();
  }

  /** Focuses the accordion item's trigger button. */
  focus(options?: FocusOptions) {
    this.triggerButton?.focus(options);
  }

  private renderHeadingWrapper(content: unknown) {
    const level = parseInt(this.headingLevel, 10);
    switch (level >= 1 && level <= 6 ? level : 3) {
      case 1: return html`<h1 part="heading">${content}</h1>`;
      case 2: return html`<h2 part="heading">${content}</h2>`;
      case 4: return html`<h4 part="heading">${content}</h4>`;
      case 5: return html`<h5 part="heading">${content}</h5>`;
      case 6: return html`<h6 part="heading">${content}</h6>`;
      default: return html`<h3 part="heading">${content}</h3>`;
    }
  }

  render() {
    const button = html`
      <button
        part="button"
        type="button"
        id="trigger"
        aria-expanded=${this.expanded ? 'true' : 'false'}
        aria-controls="panel"
        aria-disabled=${this.disabled ? 'true' : 'false'}
        tabindex=${this.disabled || !this.isTabbable ? '-1' : '0'}
        @click=${this.handleTriggerClick}
        @keydown=${this.handleTriggerKeyDown}
      >
        <slot name="label" part="label">${this.label}</slot>
        <span part="icon">
          <slot name="icon">
            <wa-icon library="system" variant="solid" name="chevron-right"></wa-icon>
          </slot>
        </span>
      </button>
    `;

    return html`
      <div part="base">
        ${this.headingLevel === 'none' ? button : this.renderHeadingWrapper(button)}
        <div
          part="panel"
          id="panel"
          class=${classMap({ body: true, animating: this.isAnimating })}
          role="region"
          aria-labelledby="trigger"
        >
          <slot part="content" class="content"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-accordion-item': WaAccordionItem;
  }
}
