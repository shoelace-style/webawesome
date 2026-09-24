import { html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { HasSlotController } from '../../internal/slot.js';
import { watch } from '../../internal/watch.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import variantStyles from '../../styles/component/variants.styles.js';
import visuallyHidden from '../../styles/component/visually-hidden.styles.js';
import { LocalizeController } from '../../utilities/localize.js';
import '../icon/icon.js';
import '../spinner/spinner.js';
import styles from './step.styles.js';

/**
 * @summary Steps represent a single stage inside a `<wa-stepper>`, showing its position, label, and status.
 * @documentation https://webawesome.com/docs/components/step
 * @status experimental
 * @since 3.14
 *
 * @dependency wa-icon
 * @dependency wa-spinner
 *
 * @slot - The step's label.
 * @slot description - Optional text shown under the label.
 * @slot icon - An element, such as `<wa-icon>`, that replaces the step number, checkmark, or loading indicator.
 *
 * @csspart step - The component's outer wrapper.
 * @csspart connector - The line connecting this step to its neighbors. Each step draws the half leading in and the
 *  half leading out, and both carry this part name.
 * @csspart button - The `<button>` wrapping the marker and content. Only rendered when the parent stepper is
 *  `clickable`; otherwise the same wrapper is a plain, non-focusable element.
 * @csspart marker - The circular marker that shows the step's number, checkmark, or loading indicator.
 * @csspart spinner - The spinner shown in the marker while the step is `loading`.
 * @csspart content - The wrapper around the label, status text, and description.
 * @csspart label - The step's label.
 * @csspart status - Visually hidden text that tells assistive technology whether the step is completed, not
 *  completed, or locked.
 * @csspart description - The step's description.
 *
 * @cssproperty --pulse-color - The color of the marker's pulse effect when using `attention="pulse"`. Defaults to the
 *  step's accent color.
 *
 * @cssstate active - Applied when this is the parent stepper's current step.
 * @cssstate completed - Mirrors the `completed` attribute.
 * @cssstate loading - Mirrors the `loading` attribute.
 * @cssstate disabled - Mirrors the `disabled` attribute.
 * @cssstate locked - Applied by the parent stepper when `linear` is set and this step can't be reached yet, i.e. it
 *  comes after the first incomplete step.
 * @cssstate clickable - Applied by the parent stepper when its `clickable` attribute is set, allowing this step to
 *  be clicked or activated (Enter/Space) directly.
 */
@customElement('wa-step')
export default class WaStep extends WebAwesomeElement {
  static css = [variantStyles, visuallyHidden, styles];

  private readonly localize = new LocalizeController(this);
  private readonly hasSlotController = new HasSlotController(this, 'description');

  /** Identifies the step. Matched against the stepper's `active` attribute and used in events. */
  @property({ reflect: true }) name = '';

  /** Marks the step done. Shows a checkmark instead of the step number. */
  @property({ type: Boolean, reflect: true }) completed = false;

  /** Shows a loading indicator instead of the step number, e.g. while an async transition is in progress. */
  @property({ type: Boolean, reflect: true }) loading = false;

  /**
   * Makes the step non-interactive. It can't be clicked or reached with `next()`/`goTo()`, and it renders as a
   * disabled button when the stepper is `clickable`.
   */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /**
   * Colors the step's marker with a semantic color. Upcoming `brand` steps keep a neutral outline so a default stepper
   * reads quietly. The color is cosmetic; pair it with an icon in the `icon` slot and a clear label when a step needs
   * to read as failed or flagged.
   */
  @property({ reflect: true }) variant: 'neutral' | 'brand' | 'success' | 'warning' | 'danger' = 'brand';

  /** Adds an animation to the step's marker to draw attention to it, e.g. the step the user should do next. */
  @property({ reflect: true }) attention: 'none' | 'pulse' | 'bounce' = 'none';

  /**
   * Only required for SSR. Set to `true` if you're slotting in a `description` element, so the server-rendered
   * markup includes it before the component hydrates on the client.
   */
  @property({ type: Boolean, attribute: 'with-description' }) withDescription = false;

  /**
   * @internal Set by the parent `<wa-stepper>` to this step's 1-based position among its siblings. Used as the
   * default marker content.
   */
  @state() position = 1;

  /**
   * Draws the step as the stepper's current step. The parent `<wa-stepper>` sets this from its own `active`
   * attribute, so you only need to set it yourself for SSR.
   */
  @property({ type: Boolean, reflect: true }) active = false;

  /**
   * @internal Set by the parent `<wa-stepper>` to match its own `clickable` attribute. Renders the step's marker and
   * content inside a `<button>` when set.
   */
  @state() clickable = false;

  /**
   * @internal Set by the parent `<wa-stepper>`. True for every step that can't be reached yet when the stepper's
   * `linear` attribute is set.
   */
  @state() locked = false;

  /**
   * @internal Set by the parent `<wa-stepper>`. The variant of the completed step before this one, so the
   * half-connector leading in matches the half leading out of it. Unset when the previous step isn't completed.
   */
  @state() connectorStartVariant?: WaStep['variant'];

  @property({ reflect: true }) role = 'listitem';

  @watch('completed')
  handleCompletedChange() {
    this.customStates.set('completed', this.completed);
  }

  @watch('loading')
  handleLoadingChange() {
    this.customStates.set('loading', this.loading);
    this.setAttribute('aria-busy', this.loading ? 'true' : 'false');
  }

  @watch('disabled')
  handleDisabledChange() {
    this.customStates.set('disabled', this.disabled);
  }

  @watch('active')
  handleActiveChange() {
    this.customStates.set('active', this.active);
    this.syncAriaCurrent();
  }

  @watch('locked')
  handleLockedChange() {
    this.customStates.set('locked', this.locked);
  }

  // aria-current belongs on whichever element actually receives focus: the inner <button> when the step is
  // clickable, the host (a plain listitem) otherwise.
  private syncAriaCurrent() {
    if (this.active && !this.clickable) {
      this.setAttribute('aria-current', 'step');
    } else {
      this.removeAttribute('aria-current');
    }
  }

  private getStatusText() {
    if (this.completed) return this.localize.term('completed');
    if (this.disabled) return this.localize.term('disabled');
    if (this.locked) return this.localize.term('locked');
    if (this.active) return '';
    return this.localize.term('notCompleted');
  }

  @watch('clickable')
  handleClickableChange() {
    this.customStates.set('clickable', this.clickable);
    this.syncAriaCurrent();
  }

  private renderIcon() {
    if (this.loading) {
      return html`<wa-spinner part="spinner"></wa-spinner>`;
    }

    if (this.completed) {
      return html`<wa-icon name="check" library="system" variant="solid"></wa-icon>`;
    }

    return this.localize.number(this.position);
  }

  render() {
    const hasDescription = this.hasSlotController.test('description', 'withDescription');

    const body = html`
      <span part="marker" class="marker">
        <slot name="icon">${this.renderIcon()}</slot>
      </span>
      <span part="content" class="content">
        <span part="label" class="label">
          <slot></slot>
        </span>
        <span part="status" class="wa-visually-hidden">${this.getStatusText()}</span>
        <span part="description" class="description" ?hidden=${!hasDescription}>
          <slot name="description"></slot>
        </span>
      </span>
    `;

    return html`
      <div part="step" class="step">
        <span
          part="connector"
          class=${classMap({
            'connector-start': true,
            [`wa-${this.connectorStartVariant}`]: !!this.connectorStartVariant,
          })}
          ?data-completed=${!!this.connectorStartVariant}
        ></span>
        <span part="connector" class="connector-end"></span>
        ${this.clickable
          ? html`
              <button
                part="button"
                class="body"
                type="button"
                ?disabled=${this.disabled || this.locked}
                aria-current=${this.active ? 'step' : nothing}
              >
                ${body}
              </button>
            `
          : html`<div class="body">${body}</div>`}
      </div>
    `;
  }
}

// The change-in-update warning is required for this component because HasSlotController calls requestUpdate() in
// response to slotchange events after first render, including the synthetic slotchange WebAwesomeElement dispatches
// post-hydration to work around SSR not being able to catch real slotchange events. See
// https://lit.dev/docs/tools/development/#development-build-runtime-warnings
WaStep.disableWarning?.('change-in-update');

declare global {
  interface HTMLElementTagNameMap {
    'wa-step': WaStep;
  }
}
