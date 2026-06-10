/**
 * `SegmentedFieldController` — a reactive controller that wires the **keystroke and focus mechanics** for a segmented
 * input. It is the generic skeleton used by `<wa-date-input>` and `<wa-time-input>`, and is intentionally agnostic
 * about what the segments represent.
 *
 * What it owns:
 *  - Per-segment digit buffer (the raw chars the user is typing before commit).
 *  - Roving tabindex and the "active segment" pointer used by host render and focus restore.
 *  - Arrow Up/Down stepping, Arrow Left/Right navigation (with RTL inversion), Home/End, Backspace/Delete,
 *    separator-advance, Tab flush.
 *
 * What it does NOT own (the host plugs these in via `SegmentRules`):
 *  - The meaning of the segments (date fields, time fields, anything else).
 *  - Per-field digit typing semantics (when to commit, when to advance, when to overflow-replace).
 *  - Per-field bounds and stepping rules (wraparound, leap years, AM/PM, …).
 *  - Layout derivation (the host builds a `SegmentLayout` from the locale and passes it in each render).
 *  - The popup, validation, hidden form input, or any DOM beyond the segment elements themselves.
 *
 * The controller is **DOM-aware** (it reads `[data-group]`/`[data-segment]` attrs from the host's shadow root and
 * dispatches focus on them), but it has no knowledge of the host's render tree — the host renders segments however it
 * likes as long as those two data attributes are present.
 *
 * Why a controller instead of a class mixin: Web Awesome form controls already extend
 * `WebAwesomeFormAssociatedElement`, and date/time pickers need different validators on top of that base. A
 * ReactiveController composes cleanly without forcing inheritance and can be tested in isolation against a synthetic
 * host.
 */

import type { ReactiveController, ReactiveControllerHost } from 'lit';

//
// Public types
//

/** A field identifier — opaque to the controller. The host defines the strings (e.g. `'month'`, `'hour'`). */
export type SegmentField = string;

/** A group identifier — opaque to the controller. Single-group hosts can use a fixed string like `'single'`. */
export type SegmentGroup = string;

/** One editable segment in the layout. */
export interface SegmentToken {
  kind: 'segment';
  field: SegmentField;
}

/** Inert text rendered between segments (separator, suffix, …). The host renders this verbatim. */
export interface LiteralToken {
  kind: 'literal';
  text: string;
}

export type LayoutToken = SegmentToken | LiteralToken;

/** The ordered list of layout tokens for the current locale. */
export interface SegmentLayout {
  tokens: LayoutToken[];
  /** Just the segment fields, in order — convenience for focus/advance logic. */
  order: SegmentField[];
}

/** Result of typing a digit into a segment. */
export interface TypeDigitResult {
  /** The segment's new value (host-defined type), or `null` if still effectively empty. */
  value: unknown;
  /** The raw digit buffer still being accumulated. Empty once committed. */
  buffer: string;
  /** When true, the controller advances focus to the next segment. */
  advance: boolean;
}

/** Result of stepping a segment (Arrow Up / Down). */
export interface StepResult {
  /** The new value for the stepped segment. */
  value: unknown;
}

/** Inclusive numeric bounds for a segment, used for `aria-valuemin`/`aria-valuemax`. */
export interface SegmentBounds {
  min: number;
  max: number;
}

/**
 * Host-provided per-field rules. The controller calls these to apply user actions; the host owns the meaning.
 */
export interface SegmentRules {
  /**
   * Apply a digit to the current buffer of `field` in `group`. The host knows the field's value semantics; the
   * controller blindly forwards the result.
   */
  typeDigit(group: SegmentGroup, field: SegmentField, buffer: string, digit: string): TypeDigitResult;

  /**
   * Step a field by `delta` (always ±1 — Page Up/Down can be wired by the host via a custom shortcut if needed).
   * The host may return `null` to indicate the step was a no-op (e.g., past a hard bound).
   */
  step(group: SegmentGroup, field: SegmentField, delta: -1 | 1): StepResult | null;

  /** Bounds for the field's spinbutton ARIA values. */
  bounds(group: SegmentGroup, field: SegmentField): SegmentBounds;

  /**
   * Commit a non-empty buffer as the field's value when the user navigates away. Returns the value to store, or `null`
   * to leave the segment empty.
   */
  commitBuffer(group: SegmentGroup, field: SegmentField, buffer: string): unknown;

  /**
   * Clear the field — used by Backspace/Delete on a committed value. Returns `true` if a value was actually cleared,
   * `false` if the field was already empty. The controller uses this to decide whether Backspace should additionally
   * jump focus to the previous segment.
   */
  clear(group: SegmentGroup, field: SegmentField): boolean;
}

/** Host-supplied side-effect hook fired when a segment's value changes. The host updates its model and re-renders. */
export type SegmentCommitListener = (group: SegmentGroup, field: SegmentField, value: unknown) => void;

/** Optional config for the controller. */
export interface SegmentedFieldControllerConfig {
  /**
   * Returns the layout for the current render. The host typically derives this from its current locale; we read it on
   * demand so locale changes reflect on the next interaction without controller surgery.
   */
  getLayout: (group: SegmentGroup) => SegmentLayout;

  /** True if the field is currently RTL. The controller flips logical left/right when computing nav direction. */
  isRtl: () => boolean;

  /** Per-field rules — required. */
  rules: SegmentRules;

  /** Fired after a segment's value changes (digit type, step, clear, buffer-flush). */
  onCommit?: SegmentCommitListener;

  /**
   * Characters that advance to the next segment without changing the current one. Defaults match common date/time
   * separators: `/`, `.`, `-`, `:`, `,`, and space. The host can override (e.g. add `'+'` for sign segments).
   */
  separatorKeys?: string[];

  /** Read-only mode — disables typing/stepping but still allows focus traversal. */
  isReadonly?: () => boolean;

  /** Disabled mode — disables everything (focus included; tab indices go to -1). */
  isDisabled?: () => boolean;
}

const DEFAULT_SEPARATORS = ['/', '.', '-', ':', ',', ' '];

//
// Controller
//

/**
 * Wires segment behavior into a Lit host. Construct one per host element.
 *
 * The host renders each segment with `data-group="<group>"` and `data-segment="<field>"` and binds the keyboard/focus
 * events returned by `eventHandlers()`. Everything else flows through the controller.
 */
export class SegmentedFieldController implements ReactiveController {
  private host: ReactiveControllerHost & Element;
  private config: SegmentedFieldControllerConfig;

  /** Per-segment digit buffers keyed by `${group}:${field}`. */
  private buffers: Map<string, string> = new Map();

  /** Which segment currently owns the roving tabindex / was most recently focused. */
  private active: { group: SegmentGroup; field: SegmentField } | null = null;

  constructor(host: ReactiveControllerHost & Element, config: SegmentedFieldControllerConfig) {
    this.host = host;
    this.config = config;
    host.addController(this);
  }

  //
  // ReactiveController lifecycle
  //

  hostConnected() {
    // Nothing — keyboard listeners are bound by the host on each segment via `eventHandlers()`.
  }

  hostDisconnected() {
    this.buffers.clear();
    this.active = null;
  }

  //
  // Public API
  //

  /** Get the buffer for a segment. Empty string when nothing is pending. */
  getBuffer(group: SegmentGroup, field: SegmentField): string {
    return this.buffers.get(this.key(group, field)) ?? '';
  }

  /** Replace the buffer for a segment. Pass `''` to clear. */
  setBuffer(group: SegmentGroup, field: SegmentField, buffer: string): void {
    const k = this.key(group, field);
    if (buffer) this.buffers.set(k, buffer);
    else this.buffers.delete(k);
  }

  /** Drop every pending buffer. Used by the host when the canonical value is replaced wholesale. */
  clearBuffers(): void {
    this.buffers.clear();
  }

  /** The active segment, or `null` if focus has never landed on one. */
  getActiveSegment(): { group: SegmentGroup; field: SegmentField } | null {
    return this.active;
  }

  /** Sets the active segment (does not move DOM focus). Used by hosts that programmatically restore focus. */
  setActiveSegment(group: SegmentGroup, field: SegmentField): void {
    this.active = { group, field };
  }

  /** All segment elements in the host's shadow root, in DOM (logical) order. */
  segmentElements(): HTMLElement[] {
    const root = this.host.shadowRoot;
    if (!root) return [];
    return Array.from(root.querySelectorAll<HTMLElement>('[data-segment][data-group]'));
  }

  /** The segment element for a given (group, field), or `null` if not in the DOM. */
  segmentElementFor(group: SegmentGroup, field: SegmentField): HTMLElement | null {
    const root = this.host.shadowRoot;
    if (!root) return null;
    return root.querySelector<HTMLElement>(`[data-group="${group}"][data-segment="${field}"]`);
  }

  /**
   * Returns the segment that should receive initial focus: the first empty segment (no value AND no buffer) per
   * `isEmpty`, otherwise the first segment in the layout. The host supplies the emptiness predicate since the
   * controller doesn't know the field's stored value.
   */
  findFocusableSegment(isEmpty: (group: SegmentGroup, field: SegmentField) => boolean): HTMLElement | null {
    const segments = this.segmentElements();
    if (segments.length === 0) return null;
    const firstEmpty = segments.find(el => {
      const group = el.dataset.group as SegmentGroup;
      const field = el.dataset.segment as SegmentField;
      return isEmpty(group, field) && !this.getBuffer(group, field);
    });
    return firstEmpty ?? segments[0];
  }

  /** Restore focus to the most recently active segment (or the first segment if none has been active). */
  focusActiveSegment(options?: FocusOptions): void {
    if (this.active) {
      const el = this.segmentElementFor(this.active.group, this.active.field);
      if (el) {
        el.focus({ preventScroll: true, ...options });
        return;
      }
    }
    this.segmentElements()[0]?.focus({ preventScroll: true, ...options });
  }

  /** Move focus to the neighbor segment in logical (DOM) order. */
  moveFocus(from: HTMLElement, direction: -1 | 1, options?: FocusOptions): void {
    const segments = this.segmentElements();
    const idx = segments.indexOf(from);
    if (idx < 0) return;
    const next = segments[idx + direction];
    if (next) next.focus({ preventScroll: true, ...options });
  }

  /**
   * Commit a pending buffer to its committed value via `rules.commitBuffer`. Notifies the host via `onCommit`. Does
   * nothing if no buffer is pending.
   */
  flushBuffer(group: SegmentGroup, field: SegmentField): boolean {
    const buffer = this.getBuffer(group, field);
    if (!buffer) return false;
    const value = this.config.rules.commitBuffer(group, field, buffer);
    this.setBuffer(group, field, '');
    this.config.onCommit?.(group, field, value);
    return true;
  }

  /**
   * Flush every pending buffer across all groups. Used when the host needs to read a final value (e.g., on form
   * submission outside of a focus change).
   */
  flushAllBuffers(): void {
    for (const [k, buffer] of this.buffers) {
      if (!buffer) continue;
      const [group, field] = k.split(':');
      const value = this.config.rules.commitBuffer(group, field, buffer);
      this.config.onCommit?.(group, field, value);
    }
    this.buffers.clear();
  }

  /**
   * Returns the event handlers a segment element should bind. Hosts wire these via `@keydown=${handlers.keydown}` etc.
   * The returned functions are stable references safe to pass to Lit's directive cache.
   *
   * Hosts that need host-level shortcuts (e.g. `Alt+ArrowDown` to open a popup) should call `handleKeyDown` themselves
   * after handling their own keys. The controller's `keydown` handler is safe to invoke when the host has not consumed
   * the event — it ignores keys it doesn't recognize.
   */
  eventHandlers() {
    return {
      keydown: this.handleKeyDown,
      focus: this.handleFocus,
      blur: this.handleBlur,
    };
  }

  /**
   * Direct entry point for hosts that wrap the controller's keydown with their own pre-handler (e.g. for popup
   * shortcuts). Returns `true` if the controller consumed the event (called `preventDefault`), `false` otherwise.
   */
  handleKeyDownEvent(event: KeyboardEvent): boolean {
    const defaultPreventedBefore = event.defaultPrevented;
    this.handleKeyDown(event);
    return event.defaultPrevented && !defaultPreventedBefore;
  }

  //
  // Internal handlers
  //

  private handleFocus = (event: FocusEvent) => {
    const el = event.currentTarget as HTMLElement;
    const group = el.dataset.group as SegmentGroup;
    const field = el.dataset.segment as SegmentField;
    this.active = { group, field };

    // Roving tabindex — Tab returns to this segment next time the host is entered.
    for (const segment of this.segmentElements()) {
      segment.tabIndex = segment === el ? 0 : -1;
    }
  };

  private handleBlur = (event: FocusEvent) => {
    const el = event.currentTarget as HTMLElement;
    const group = el.dataset.group as SegmentGroup;
    const field = el.dataset.segment as SegmentField;
    if (this.getBuffer(group, field)) this.flushBuffer(group, field);
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    // `currentTarget` is the segment when bound as a Lit `@keydown` listener. If the host invokes this manually from
    // a different listener, fall back to walking `composedPath()` for the nearest segment element.
    const el =
      (event.currentTarget as HTMLElement | null) ??
      (event.composedPath().find(t => {
        return t instanceof HTMLElement && t.dataset.group && t.dataset.segment;
      }) as HTMLElement | undefined) ??
      null;
    if (!el) return;
    const group = el.dataset.group as SegmentGroup;
    const field = el.dataset.segment as SegmentField;
    if (!group || !field) return;

    // Stepping (Arrow Up / Down).
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();
      if (this.isReadonlyOrDisabled()) return;
      // Any partial buffer flushes first so step operates on the committed value.
      if (this.getBuffer(group, field)) this.flushBuffer(group, field);
      const delta: -1 | 1 = event.key === 'ArrowUp' ? 1 : -1;
      const result = this.config.rules.step(group, field, delta);
      if (result) this.config.onCommit?.(group, field, result.value);
      return;
    }

    // Logical-direction nav (RTL inverts visual arrows).
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      if (this.getBuffer(group, field)) this.flushBuffer(group, field);
      const visualLeft = event.key === 'ArrowLeft';
      const logicalPrev = this.config.isRtl() ? !visualLeft : visualLeft;
      this.moveFocus(el, logicalPrev ? -1 : 1);
      return;
    }

    if (event.key === 'Home') {
      event.preventDefault();
      this.segmentElements()[0]?.focus({ preventScroll: true });
      return;
    }
    if (event.key === 'End') {
      event.preventDefault();
      const segments = this.segmentElements();
      segments[segments.length - 1]?.focus({ preventScroll: true });
      return;
    }

    if (event.key === 'Tab') {
      // Let the browser handle the focus move, but commit any pending buffer first.
      if (this.getBuffer(group, field)) this.flushBuffer(group, field);
      return;
    }

    if (event.key === 'Backspace' || event.key === 'Delete') {
      event.preventDefault();
      if (this.isReadonlyOrDisabled()) return;
      const buffer = this.getBuffer(group, field);
      if (buffer) {
        // Wipe just the partial — leave any prior committed value alone.
        this.setBuffer(group, field, '');
        this.config.onCommit?.(group, field, null);
      } else {
        const hadValue = this.config.rules.clear(group, field);
        if (hadValue) {
          this.config.onCommit?.(group, field, null);
        } else if (event.key === 'Backspace') {
          // Empty segment — Backspace jumps to the previous segment. Delete stays put.
          this.moveFocus(el, -1);
        }
      }
      return;
    }

    // Digit input.
    if (/^[0-9]$/.test(event.key)) {
      event.preventDefault();
      if (this.isReadonlyOrDisabled()) return;
      const buffer = this.getBuffer(group, field);
      const result = this.config.rules.typeDigit(group, field, buffer, event.key);
      this.setBuffer(group, field, result.buffer);
      this.config.onCommit?.(group, field, result.value);
      if (result.advance) this.moveFocus(el, 1);
      return;
    }

    // Separator: commit the buffer and advance.
    const seps = this.config.separatorKeys ?? DEFAULT_SEPARATORS;
    if (seps.includes(event.key)) {
      event.preventDefault();
      if (this.getBuffer(group, field)) this.flushBuffer(group, field);
      this.moveFocus(el, 1);
      return;
    }
  };

  //
  // Helpers
  //

  private key(group: SegmentGroup, field: SegmentField): string {
    return `${group}:${field}`;
  }

  private isReadonlyOrDisabled(): boolean {
    return !!(this.config.isReadonly?.() || this.config.isDisabled?.());
  }
}
