import { html, isServer } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { WaAfterStepChangeEvent } from '../../events/after-step-change.js';
import { WaStepChangeEvent } from '../../events/step-change.js';
import { parseSpaceDelimitedTokens } from '../../internal/parse.js';
import { watch } from '../../internal/watch.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import sizeStyles from '../../styles/component/size.styles.js';
import visuallyHidden from '../../styles/component/visually-hidden.styles.js';
import { LocalizeController } from '../../utilities/localize.js';
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
 * @csspart summary - Visually hidden "Step X of Y" text that tells assistive technology where the active step sits.
 * @csspart steps - The `<ol>` that lays out the steps.
 *
 * @cssproperty [--gap=var(--wa-space-l)] - The space between steps.
 * @cssproperty [--marker-size=2em] - The size of each step's marker.
 * @cssproperty [--connector-color=var(--wa-color-neutral-fill-normal)] - The color of the connector line after a
 *  step that isn't completed.
 * @cssproperty --connector-color-active - The color of the connector line after a completed step. Unset by default,
 *  so the line takes the completed marker's fill and follows its `variant`.
 * @cssproperty [--connector-width=var(--wa-border-width-m)] - The thickness of the connector line, in either
 *  orientation.
 * @cssproperty [--connector-gap=0.35em] - The gap between a marker's edge and the connector line, on both sides.
 *  Kept clear of the marker geometrically, so it holds even if a marker's background is transparent.
 *
 * @cssstate completed - Applied when every step is completed.
 * @cssstate loading - Applied when at least one step is loading.
 * @cssstate stacked - Applied while the steps are laid out vertically, whether by `orientation="vertical"` or because
 *  an `auto` stepper is too narrow to give each step room.
 */
@customElement('wa-stepper')
export default class WaStepper extends WebAwesomeElement {
  static css = [sizeStyles, visuallyHidden, styles];

  private readonly localize = new LocalizeController(this);
  private mutationObserver?: MutationObserver;
  private resizeObserver?: ResizeObserver;

  @query('.steps') stepsEl: HTMLOListElement;

  @state() private isStacked = false;
  @state() private activeIndex = 0;
  @state() private stepCount = 0;

  /** The name of the active step. Falls back to the first step if unset, or if it doesn't match any step's name. */
  @property({ reflect: true }) active = '';

  /**
   * The stepper's layout direction. `auto` lays steps out in a row and stacks them when the stepper is too narrow to
   * give each step about 6em of width, so labels stay legible on small screens; use it for anything shown on a
   * phone. It relies on measuring the stepper, so a server-rendered `auto` stepper starts as a row and stacks once
   * it hydrates, which is why `horizontal` is the default.
   */
  @property({ reflect: true }) orientation: 'horizontal' | 'vertical' | 'auto' = 'horizontal';

  /** The stepper's size. Scales the markers, connectors, and text together. */
  @property({ reflect: true }) size: 'xs' | 's' | 'm' | 'l' | 'xl' | 'small' | 'medium' | 'large' = 'm';

  /**
   * Requires steps to be completed in order. When set, `next()`/`goTo()`/a `data-stepper` invoker and, if
   * `clickable` is also set, clicking or activating a step can't reach a step until every step before it is
   * completed. Every step past that point renders as locked.
   */
  @property({ type: Boolean, reflect: true }) linear = false;

  /**
   * Allows clicking a step, or focusing it and pressing Enter/Space, to jump straight to it. When unset (the
   * default), only `next()`/`previous()`/`goTo()` change the active step, e.g. from your own Next/Back buttons or a
   * `data-stepper` invoker.
   */
  @property({ type: Boolean, reflect: true }) clickable = false;

  /** A label that describes the stepper to assistive devices. Especially useful when more than one is on the page. */
  @property() label = '';

  constructor() {
    super();

    if (!isServer) {
      this.addEventListener('click', this.handleClick);
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
          attributeFilter: ['name', 'completed', 'loading', 'disabled', 'variant'],
        });
      });
    }

    // SSR guard: ResizeObserver is not available during server-side rendering. Catches viewport/container resizes;
    // syncSteps() (steps added/removed, orientation changed) re-checks on its own via updateStacking() below.
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(entries => {
        // Stacking changes the stepper's height, so apply it on the next frame like <wa-page> does, to keep the
        // observer from reporting an undelivered-notifications loop.
        requestAnimationFrame(() => {
          for (const entry of entries) {
            this.updateStacking(entry.borderBoxSize[0].inlineSize);
          }
        });
      });
      this.resizeObserver.observe(this);
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
      Promise.all(this.getAllSteps().map(step => step.updateComplete)).then(() => this.syncSteps());
    } else {
      this.syncSteps();
    }
  }

  private getAllSteps(): WaStep[] {
    return [...this.querySelectorAll<WaStep>('wa-step')];
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
    this.activeIndex = steps.indexOf(activeStep);
    this.stepCount = steps.length;
    this.updateStacking(this.getBoundingClientRect().width);
    const isVertical = this.orientation === 'vertical' || this.isStacked;

    steps.forEach((step, index) => {
      step.position = index + 1;
      step.active = step === activeStep;
      step.locked = this.linear && index > boundaryIndex;
      step.clickable = this.clickable;
      step.connectorActive = step.completed;
      // The half-connector leading into a step is drawn by that step, so it needs to know the previous step's
      // variant to match the half leading out of it.
      const previous = steps[index - 1];
      step.connectorStartVariant = previous?.completed ? previous.variant || 'brand' : '';
      step.toggleAttribute('data-wa-step-vertical', isVertical);
    });

    this.customStates.set(
      'completed',
      steps.every(step => step.completed),
    );

    const isLoading = steps.some(step => step.loading);
    this.customStates.set('loading', isLoading);
    this.setAttribute('aria-busy', isLoading ? 'true' : 'false');
    this.customStates.set('stacked', isVertical);
  }

  @watch(['active', 'linear', 'clickable', 'orientation', 'isStacked'], { waitUntilFirstUpdate: true })
  handleStateChange() {
    this.syncSteps();
  }

  /**
   * Decides whether an `auto` stepper stacks at the given width. Each step needs roughly 6em to keep a short label
   * on one line, so the row stacks once the stepper is narrower than that times the step count, plus the gaps.
   */
  private updateStacking(width: number) {
    if (this.orientation !== 'auto' || !this.stepsEl) {
      this.isStacked = false;
      return;
    }

    const stepCount = this.getAllSteps().length;
    const fontSize = parseFloat(getComputedStyle(this).fontSize);
    const gap = parseFloat(getComputedStyle(this.stepsEl).columnGap) || 0;
    const minRowWidth = stepCount * fontSize * 6 + Math.max(0, stepCount - 1) * gap;

    this.isStacked = width < minRowWidth;
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
    if (!this.clickable) return;

    const step = (event.target as HTMLElement).closest('wa-step');
    if (!step || step.closest('wa-stepper') !== this || step.disabled) return;

    this.goTo(step.name);
  }

  render() {
    return html`
      <nav part="stepper" class="stepper" aria-label=${this.label}>
        ${this.stepCount > 0
          ? html`
              <span part="summary" class="wa-visually-hidden">
                ${this.localize.term('stepXOfY', this.activeIndex + 1, this.stepCount)}
              </span>
            `
          : ''}
        <ol part="steps" class="steps" role="list">
          <slot @slotchange=${() => this.syncSteps()}></slot>
        </ol>
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
