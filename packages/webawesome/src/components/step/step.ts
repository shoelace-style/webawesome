import { html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { HasSlotController } from '../../internal/slot.js';
import { watch } from '../../internal/watch.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import variantStyles from '../../styles/component/variants.styles.js';
import '../icon/icon.js';
import '../spinner/spinner.js';
import styles from './step.styles.js';

/**
 * @summary Steps represent a single stage inside a `<wa-stepper>`, showing its position, label, and status.
 * @documentation https://webawesome.com/docs/components/step
 * @status experimental
 * @since 3.13
 *
 * @dependency wa-icon
 * @dependency wa-spinner
 *
 * @slot - The step's label.
 * @slot description - Optional text shown under the label.
 * @slot bullet - Custom content, such as a `<wa-icon>`, that replaces the step number, checkmark, or loading
 *  indicator.
 *
 * @csspart step - The component's outer wrapper.
 * @csspart connector - The line connecting this step to the one before it.
 * @csspart connector-trailing - The line connecting this step to the one after it.
 * @csspart marker - The circular marker that shows the step's number, checkmark, or loading indicator.
 * @csspart spinner - The spinner shown in the marker while the step is `loading`.
 * @csspart spinner__base - The spinner's exported `base` part.
 * @csspart label - The step's label.
 * @csspart description - The step's description.
 *
 * @cssproperty [--marker-size=2em] - The size of the step's marker. Usually set on `<wa-stepper>` so every step
 *  matches.
 *
 * @cssstate active - Applied when this is the parent stepper's current step.
 * @cssstate completed - Mirrors the `completed` attribute.
 * @cssstate loading - Mirrors the `loading` attribute.
 * @cssstate disabled - Mirrors the `disabled` attribute.
 * @cssstate locked - Applied by the parent stepper when `linear` is set and this step is the one right after the
 *  active step.
 * @cssstate clickable - Applied by the parent stepper when its `clickable` attribute is set, allowing this step to
 *  be clicked or activated (Enter/Space) directly.
 * @cssstate connector-active - Applied when the connector leading into this step should render as reached, i.e. this
 *  step is at or before the stepper's active step.
 * @cssstate trailing-connector-active - Applied when the connector leading out of this step, toward the next one,
 *  should render as reached, i.e. this step comes before the stepper's active step.
 */
@customElement('wa-step')
export default class WaStep extends WebAwesomeElement {
  static css = [variantStyles, styles];

  private readonly hasSlotController = new HasSlotController(this, 'description');

  /** Identifies the step. Matched against the stepper's `active` attribute and used in events. */
  @property({ reflect: true }) name = '';

  /** Marks the step done. Shows a checkmark instead of the step number. */
  @property({ type: Boolean, reflect: true }) completed = false;

  /** Shows a loading indicator instead of the step number, e.g. while an async transition is in progress. */
  @property({ type: Boolean, reflect: true }) loading = false;

  /** Makes the step non-interactive. It's not focusable, not clickable, and not reachable by arrow key navigation. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Overrides the marker's color. Purely cosmetic, and doesn't change behavior. */
  @property({ reflect: true }) variant: 'neutral' | 'brand' | 'success' | 'warning' | 'danger' | '' = '';

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

  /** @internal Set by the parent `<wa-stepper>`. Whether this is the stepper's current step. */
  @state() active = false;

  /**
   * @internal Set by the parent `<wa-stepper>` to match its own `clickable` attribute. Governs the marker's cursor
   * affordance.
   */
  @state() clickable = false;

  /**
   * @internal Set by the parent `<wa-stepper>`. True only for the single step right after the active one when the
   * stepper's `linear` attribute is set.
   */
  @state() locked = false;

  /**
   * @internal Set by the parent `<wa-stepper>`. Whether the connector leading into this step should render as
   * "reached" — true for every step at or before the active one, false for the connector leading out of the active
   * step and everything after it.
   */
  @state() connectorActive = false;

  /**
   * @internal Set by the parent `<wa-stepper>`. Whether the connector leading out of this step, toward the next
   * one, should render as "reached" — true for every step strictly before the active one.
   */
  @state() trailingConnectorActive = false;

  @property({ reflect: true }) role = 'listitem';

  /**
   * @internal
   * Need to wrap in a `@property()` otherwise NextJS blows up.
   */
  @property({ type: Number, reflect: true, attribute: 'tabindex' }) tabIndex = -1;

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
    this.setAttribute('aria-disabled', this.disabled ? 'true' : 'false');

    // Belt-and-suspenders: the parent stepper also excludes disabled steps from its roving tabindex, but a step
    // can be disabled before it's ever synced by its stepper (e.g. set before being slotted in).
    if (this.disabled) {
      this.tabIndex = -1;
    }
  }

  @watch('active')
  handleActiveChange() {
    this.customStates.set('active', this.active);

    if (this.active) {
      this.setAttribute('aria-current', 'step');
    } else {
      this.removeAttribute('aria-current');
    }
  }

  @watch('locked')
  handleLockedChange() {
    this.customStates.set('locked', this.locked);
  }

  @watch('clickable')
  handleClickableChange() {
    this.customStates.set('clickable', this.clickable);
  }

  @watch('connectorActive')
  handleConnectorActiveChange() {
    this.customStates.set('connector-active', this.connectorActive);
  }

  @watch('trailingConnectorActive')
  handleTrailingConnectorActiveChange() {
    this.customStates.set('trailing-connector-active', this.trailingConnectorActive);
  }

  private renderBullet() {
    if (this.loading) {
      return html`<wa-spinner part="spinner" exportparts="base:spinner__base"></wa-spinner>`;
    }

    if (this.completed) {
      return html`<wa-icon name="check" library="system" variant="solid"></wa-icon>`;
    }

    if (this.locked) {
      // Unlike `check` (used above), `lock` isn't in the small curated "system" icon set, so this uses the default
      // (full Font Awesome) library instead.
      return html`<wa-icon name="lock" variant="solid"></wa-icon>`;
    }

    return this.position;
  }

  render() {
    const hasDescription = this.hasSlotController.test('description', 'withDescription');

    return html`
      <div part="step" class="step">
        <span part="connector" class="connector"></span>
        <span part="connector-trailing" class="connector-trailing"></span>
        <span
          part="marker"
          class=${classMap({
            marker: true,
            'marker-completed': this.completed,
          })}
        >
          <slot name="bullet">${this.renderBullet()}</slot>
        </span>
        <span part="label" class="label">
          <slot></slot>
        </span>
        <span part="description" class="description" ?hidden=${!hasDescription}>
          <slot name="description"></slot>
        </span>
      </div>
    `;
  }
}

// The change-in-update warning is required for this component because HasSlotController calls requestUpdate() in
// response to slotchange events after first render — including the synthetic slotchange WebAwesomeElement dispatches
// post-hydration to work around SSR not being able to catch real slotchange events. See
// https://lit.dev/docs/tools/development/#development-build-runtime-warnings
WaStep.disableWarning?.('change-in-update');

declare global {
  interface HTMLElementTagNameMap {
    'wa-step': WaStep;
  }
}
