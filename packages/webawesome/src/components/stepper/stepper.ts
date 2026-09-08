import { html, isServer } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { WaAfterStepChangeEvent } from '../../events/after-step-change.js';
import { WaStepChangeEvent } from '../../events/step-change.js';
import { clamp } from '../../internal/math.js';
import { parseSpaceDelimitedTokens } from '../../internal/parse.js';
import { scrollIntoView } from '../../internal/scroll.js';
import { watch } from '../../internal/watch.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import { LocalizeController } from '../../utilities/localize.js';
import '../button/button.js';
import '../step/step.js';
import type WaStep from '../step/step.js';
import styles from './stepper.styles.js';

/**
 * @summary Steppers visually guide users through a process step by step, breaking content into clear, logical
 *  stages. Use them for checkout flows, multi-step setup, onboarding, or just to show the status of a process.
 * @documentation https://webawesome.com/docs/components/stepper
 * @status experimental
 * @since 3.13
 *
 * @dependency wa-button
 * @dependency wa-icon
 * @dependency wa-step
 *
 * @event {{ step: WaStep, previousStep: WaStep | null }} wa-step-change - Emitted before the active step changes.
 *  Calling `event.preventDefault()` prevents the change, to guard against invalid or unsaved data.
 * @event {{ step: WaStep, previousStep: WaStep | null }} wa-after-step-change - Emitted after the active step
 *  changes.
 *
 * @slot - One or more `<wa-step>` elements.
 *
 * @csspart stepper - The component's outer `<nav>` wrapper.
 * @csspart steps-container - The container wrapping `steps` and, when present, the scroll buttons.
 * @csspart steps - The `<ol>` that lays out the steps. Scrolls horizontally when steps no longer fit.
 * @csspart scroll-button - The previous/next scroll buttons that show when steps overflow horizontally, a
 *  `<wa-button>`.
 * @csspart scroll-button-start - The starting scroll button.
 * @csspart scroll-button-end - The ending scroll button.
 * @csspart scroll-button__base - The scroll button's exported `base` part.
 *
 * @cssproperty [--gap=var(--wa-space-l)] - The space between steps.
 * @cssproperty [--marker-size=2em] - The size of each step's marker.
 * @cssproperty [--marker-color=var(--wa-color-neutral-on-normal)] - The text/icon color of an untouched step's
 *  marker. A step's own `variant` tints this unless the property is set explicitly, which always wins.
 * @cssproperty [--marker-background-color=var(--wa-color-neutral-fill-normal)] - The background color of an
 *  untouched step's marker.
 * @cssproperty [--marker-border-color=var(--wa-color-neutral-border-normal)] - The border color of an untouched
 *  step's marker.
 * @cssproperty [--connector-color=var(--wa-color-surface-border)] - The color of the connector line between
 *  incomplete steps.
 * @cssproperty [--connector-active=var(--wa-color-brand-fill-loud)] - The color of the connector line behind
 *  completed and active steps.
 * @cssproperty [--connector-gap=0.35em] - The gap between a marker's edge and the connector line, on both sides.
 *  Kept clear of the marker geometrically, so it holds even if a marker's background is transparent.
 *
 * @cssstate completed - Applied when every step is completed.
 * @cssstate loading - Applied when at least one step is loading.
 */
@customElement('wa-stepper')
export default class WaStepper extends WebAwesomeElement {
  static css = styles;

  private readonly localize = new LocalizeController(this);
  private mutationObserver?: MutationObserver;
  private resizeObserver?: ResizeObserver;
  private lastFocusedStep: WaStep | null = null;

  @query('.steps') stepsEl: HTMLOListElement;

  @state() private hasScrollControls = false;

  /** The name of the active step. Falls back to the first step if unset, or if it doesn't match any step's name. */
  @property({ reflect: true }) active = '';

  /** The stepper's layout direction. */
  @property({ reflect: true }) orientation: 'horizontal' | 'vertical' = 'horizontal';

  /**
   * Requires steps to be completed in order. When set, `next()`/`goTo()` (and clicking or activating a step) can't
   * reach a step until every step before it is completed. Future steps render as blocked.
   */
  @property({ type: Boolean, reflect: true }) linear = false;

  /** A label that describes the stepper to assistive devices. Especially useful when more than one is on the page. */
  @property() label = '';

  /** Disables the scroll arrows that appear when steps overflow horizontally. */
  @property({ attribute: 'without-scroll-controls', type: Boolean }) withoutScrollControls = false;

  constructor() {
    super();

    if (!isServer) {
      this.addEventListener('click', this.handleClick);
      this.addEventListener('keydown', this.handleKeyDown);
      this.addEventListener('focusin', this.handleFocusIn);
      this.addEventListener('mousedown', this.handleMouseDown);
    }
  }

  connectedCallback() {
    super.connectedCallback();

    // SSR guard: MutationObserver is not available during server-side rendering
    if (typeof MutationObserver !== 'undefined') {
      this.updateComplete.then(() => {
        this.mutationObserver = new MutationObserver(() => this.syncSteps());
        this.mutationObserver.observe(this, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ['name', 'completed', 'loading', 'disabled'],
        });
      });
    }

    // SSR guard: ResizeObserver is not available during server-side rendering. Catches viewport/container resizes;
    // syncSteps() (steps added/removed, orientation changed) re-checks on its own via updateScrollControls() below.
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => this.updateScrollControls());
      this.updateComplete.then(() => this.resizeObserver!.observe(this.stepsEl));
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.mutationObserver?.disconnect();
    this.resizeObserver?.disconnect();
  }

  firstUpdated() {
    if (this.didSSR) {
      // Wait for every step's own first render before mutating them (position/active/locked). Doing it any earlier
      // races the step's SSR hydration — flipping its marker between a plain number and a `<wa-icon>` before the
      // step has reconciled its server-rendered markup trips Lit's hydration mismatch check. Later syncs
      // (slotchange, attribute changes, goTo()) happen well after hydration and stay synchronous.
      Promise.all(this.getAllSteps().map(step => step.updateComplete)).then(() => {
        this.syncSteps();
        this.scrollActiveStepIntoView('auto');
      });
    } else {
      this.syncSteps();
      this.scrollActiveStepIntoView('auto');
    }
  }

  private getAllSteps(): WaStep[] {
    return [...this.querySelectorAll<WaStep>('wa-step')];
  }

  private getFocusableSteps(): WaStep[] {
    return this.getAllSteps().filter(step => !step.disabled);
  }

  /** In `linear` mode, the 0-based index of the boundary a step's position must fall within (inclusive) to be reachable. */
  private getLinearBoundaryIndex(steps: WaStep[]): number {
    const firstIncompleteIndex = steps.findIndex(step => !step.completed);
    return firstIncompleteIndex === -1 ? steps.length - 1 : firstIncompleteIndex;
  }

  private isReachable(step: WaStep, steps = this.getAllSteps()): boolean {
    if (step.disabled) return false;
    if (!this.linear) return true;
    return steps.indexOf(step) <= this.getLinearBoundaryIndex(steps);
  }

  /** Recomputes each step's position/active/locked state and the stepper's own custom states. */
  private syncSteps() {
    const steps = this.getAllSteps();

    if (steps.length === 0) return;

    let activeStep = steps.find(step => step.name === this.active);

    if (!activeStep) {
      if (this.active) {
        console.warn(`A step named "${this.active}" could not be found. Falling back to the first step.`, this);
      }
      activeStep = steps[0];
    }

    const boundaryIndex = this.getLinearBoundaryIndex(steps);
    const activeIndex = steps.indexOf(activeStep);

    steps.forEach((step, index) => {
      step.position = index + 1;
      step.active = step === activeStep;
      step.locked = this.linear && index === boundaryIndex + 1;
      // The connector leading into a step is "active" (colored) for every step at or before the active one —
      // marking how far the user has progressed, independent of each step's own `completed` attribute. The
      // connector leading out of the active step (into whatever comes after it) is never active. Both halves of one
      // logical connector (this step's leading half and the previous step's trailing half) always agree, since
      // `index < activeIndex` here is equivalent to `index <= activeIndex` evaluated one step later.
      step.connectorActive = index <= activeIndex;
      step.trailingConnectorActive = index < activeIndex;
      step.toggleAttribute('data-wa-step-vertical', this.orientation === 'vertical');
    });

    const focusableSteps = steps.filter(step => !step.disabled);
    const focusTarget =
      (this.lastFocusedStep && focusableSteps.includes(this.lastFocusedStep) && this.lastFocusedStep) ||
      (activeStep && !activeStep.disabled && activeStep) ||
      focusableSteps[0];

    steps.forEach(step => {
      step.tabIndex = step === focusTarget ? 0 : -1;
    });

    this.customStates.set(
      'completed',
      steps.every(step => step.completed),
    );

    const isLoading = steps.some(step => step.loading);
    this.customStates.set('loading', isLoading);
    this.setAttribute('aria-busy', isLoading ? 'true' : 'false');

    this.updateScrollControls();
  }

  @watch(['active', 'linear', 'orientation'], { waitUntilFirstUpdate: true })
  handleStateChange() {
    this.syncSteps();
  }

  // Also runs as the change handler for `withoutScrollControls` itself, matching <wa-tab-group>'s equivalent watcher.
  @watch('withoutScrollControls', { waitUntilFirstUpdate: true })
  updateScrollControls() {
    if (this.withoutScrollControls || this.orientation !== 'horizontal' || !this.stepsEl) {
      this.hasScrollControls = false;
      return;
    }

    // Padding the comparison by a pixel avoids a Safari zoom rounding quirk toggling this indefinitely — see
    // <wa-tab-group>'s identical comparison (https://github.com/shoelace-style/shoelace/issues/1839).
    this.hasScrollControls = this.stepsEl.scrollWidth > this.stepsEl.clientWidth + 1;
  }

  private handleScrollToStart() {
    this.stepsEl.scroll({
      left:
        this.localize.dir() === 'rtl'
          ? this.stepsEl.scrollLeft + this.stepsEl.clientWidth
          : this.stepsEl.scrollLeft - this.stepsEl.clientWidth,
      behavior: 'smooth',
    });
  }

  private handleScrollToEnd() {
    this.stepsEl.scroll({
      left:
        this.localize.dir() === 'rtl'
          ? this.stepsEl.scrollLeft - this.stepsEl.clientWidth
          : this.stepsEl.scrollLeft + this.stepsEl.clientWidth,
      behavior: 'smooth',
    });
  }

  // Reveals the active step when it changes (goTo()/next()/previous(), or the initial `active` on first render) —
  // distinct from the keyboard scroll-into-view in handleKeyDown below, which follows *focus*, not activation.
  private scrollActiveStepIntoView(behavior: 'auto' | 'smooth' = 'smooth') {
    if (this.orientation !== 'horizontal' || !this.stepsEl) return;

    const activeStep = this.getAllSteps().find(step => step.active);
    if (activeStep) scrollIntoView(activeStep, this.stepsEl, 'horizontal', behavior);
  }

  /**
   * Requests a change to the named step. Emits a cancelable `wa-step-change`; if not canceled, updates `active` and
   * emits `wa-after-step-change`. No-ops silently if the step doesn't exist, is disabled, or (in `linear` mode)
   * isn't reachable yet.
   */
  goTo(name: string) {
    const steps = this.getAllSteps();
    const target = steps.find(step => step.name === name);

    if (!target || !this.isReachable(target, steps)) return;

    const previousStep = steps.find(step => step.active) ?? null;
    if (target === previousStep) return;

    const changeEvent = new WaStepChangeEvent({ step: target, previousStep });
    this.dispatchEvent(changeEvent);
    if (changeEvent.defaultPrevented) return;

    this.active = target.name;

    this.updateComplete.then(() => {
      this.scrollActiveStepIntoView('smooth');
      this.dispatchEvent(new WaAfterStepChangeEvent({ step: target, previousStep }));
    });
  }

  /** Advances to the step after the active one, if any. */
  next() {
    const steps = this.getAllSteps();
    const activeIndex = steps.findIndex(step => step.active);
    const next = steps[activeIndex + 1];
    if (next) this.goTo(next.name);
  }

  /** Goes back to the step before the active one, if any. */
  previous() {
    const steps = this.getAllSteps();
    const activeIndex = steps.findIndex(step => step.active);
    const previous = activeIndex > 0 ? steps[activeIndex - 1] : undefined;
    if (previous) this.goTo(previous.name);
  }

  private handleClick(event: MouseEvent) {
    const step = (event.target as HTMLElement).closest('wa-step');
    if (!step || step.closest('wa-stepper') !== this || step.disabled) return;

    this.goTo(step.name);
  }

  // A disabled step still carries a tabindex attribute (needed to keep it out of the roving-tabindex focus target
  // without removing/re-adding the attribute on every sync), and any element with a tabindex attribute, even -1
  // remains focusable by mouse click, just not by Tab. Preventing the default mousedown action is the standard way
  // to stop click-to-focus without affecting the tabindex itself. See handleClick above for why the click itself
  // already no-ops for disabled steps; this only stops the resulting focus ring some browsers would otherwise show.
  private handleMouseDown(event: MouseEvent) {
    const step = (event.target as HTMLElement).closest('wa-step');
    if (step && step.closest('wa-stepper') === this && step.disabled) {
      event.preventDefault();
    }
  }

  private handleKeyDown(event: KeyboardEvent) {
    const target = event.target as HTMLElement;
    const step = target.closest('wa-step');

    if (!step || step.closest('wa-stepper') !== this) return;

    if (event.key === 'Enter' || event.key === ' ') {
      if (!step.disabled) {
        event.preventDefault();
        this.goTo(step.name);
      }
      return;
    }

    if (!['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) return;

    const steps = this.getFocusableSteps();
    if (steps.length === 0) return;

    event.preventDefault();

    const isRtl = this.localize.dir() === 'rtl';
    const currentIndex = steps.indexOf(step);

    const focusStepAt = (index: number) => {
      const target = steps[clamp(index, 0, steps.length - 1)];
      target?.focus();

      if (target && this.orientation === 'horizontal') {
        scrollIntoView(target, this.stepsEl, 'horizontal');
      }
    };

    if (event.key === 'Home') {
      focusStepAt(0);
    } else if (event.key === 'End') {
      focusStepAt(steps.length - 1);
    } else if (
      event.key === 'ArrowDown' ||
      (event.key === 'ArrowRight' && !isRtl) ||
      (event.key === 'ArrowLeft' && isRtl)
    ) {
      focusStepAt(currentIndex + 1);
    } else {
      focusStepAt(currentIndex - 1);
    }
  }

  // Keeps the roving tabindex in sync as focus moves between steps, so a subsequent Tab into the stepper (e.g. after
  // tabbing away and back) resumes at the step the user was last on.
  private handleFocusIn = (event: FocusEvent) => {
    const step = (event.target as HTMLElement).closest('wa-step');
    if (!step || step.closest('wa-stepper') !== this || step.disabled) return;

    this.lastFocusedStep = step;
    this.getAllSteps().forEach(s => {
      s.tabIndex = s === step ? 0 : -1;
    });
  };

  render() {
    const isRtl = this.hasUpdated ? this.localize.dir() === 'rtl' : this.dir === 'rtl';

    return html`
      <nav
        part="stepper"
        class=${classMap({ stepper: true, 'has-scroll-controls': this.hasScrollControls })}
        aria-label=${this.label}
      >
        <div part="steps-container" class="steps-container">
          ${this.hasScrollControls
            ? html`
                <wa-button
                  part="scroll-button scroll-button-start"
                  exportparts="base:scroll-button__base"
                  class="scroll-button scroll-button-start"
                  appearance="plain"
                  @click=${this.handleScrollToStart}
                >
                  <wa-icon
                    name=${isRtl ? 'chevron-right' : 'chevron-left'}
                    library="system"
                    variant="solid"
                    label=${this.localize.term('scrollToStart')}
                  ></wa-icon>
                </wa-button>
              `
            : ''}

          <ol part="steps" class="steps" role="list">
            <slot @slotchange=${() => this.syncSteps()}></slot>
          </ol>

          ${this.hasScrollControls
            ? html`
                <wa-button
                  part="scroll-button scroll-button-end"
                  exportparts="base:scroll-button__base"
                  class="scroll-button scroll-button-end"
                  appearance="plain"
                  @click=${this.handleScrollToEnd}
                >
                  <wa-icon
                    name=${isRtl ? 'chevron-left' : 'chevron-right'}
                    library="system"
                    variant="solid"
                    label=${this.localize.term('scrollToEnd')}
                  ></wa-icon>
                </wa-button>
              `
            : ''}
        </div>
      </nav>
    `;
  }
}

// Handles `data-stepper="<command> <id> [args]"` invokers, which may live anywhere on the page — not just inside
// the stepper — so they're resolved with a document-level listener rather than a handler scoped to this component.
// Matches the `data-dialog="open <id>"` / `data-drawer="open <id>"` / `<wa-copy-button from="<id>">` convention used
// elsewhere in the library: an explicit id, resolved via the invoker's own root node (the invoker's shadow root if
// it has one, the document otherwise) with a console warning if it can't be found.
if (!isServer) {
  document.addEventListener('click', (event: MouseEvent) => {
    const invoker = (event.target as Element).closest('[data-stepper]');
    if (!(invoker instanceof Element)) return;

    const [command, id, ...rest] = parseSpaceDelimitedTokens(invoker.getAttribute('data-stepper') || '');
    if (!id) return;

    const root = invoker.getRootNode() as Document | ShadowRoot;
    const stepper = root.getElementById(id) as WaStepper | null;

    if (stepper?.localName !== 'wa-stepper') {
      console.warn(`A stepper with an ID of "${id}" could not be found in this document.`);
      return;
    }

    if (command === 'next') {
      stepper.next();
    } else if (command === 'prev') {
      stepper.previous();
    } else if (command === 'goto' && rest.length > 0) {
      stepper.goTo(rest.join(' '));
    }
  });
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-stepper': WaStepper;
  }
}
