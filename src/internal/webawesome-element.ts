import type { CSSResult, CSSResultGroup, PropertyValues } from 'lit';
import { LitElement, isServer, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import componentStyles from '../styles/shadow/component.css';

export default class WebAwesomeElement extends LitElement {
  constructor() {
    super();

    try {
      this.internals = this.attachInternals();
    } catch (_e) {
      /* Need to tell people if they need a polyfill. */
      /* eslint-disable-next-line */
      console.error('Element internals are not supported in your browser. Consider using a polyfill');
    }
  }

  // Make localization attributes reactive
  @property() dir: string;
  @property() lang: string;

  /**
   * One or more styles for the element’s own shadow DOM.
   * Shared component styles will automatically be added.
   * If that is not desirable, the subclass can define its own styles property.
   */
  static shadowStyle?: CSSResultGroup | CSSResult | string | (CSSResult | string)[];

  /** The base styles property will only get called if the subclass does not define a styles property of its own */
  static get styles(): CSSResultGroup {
    const shadowStyle = this.shadowStyle
      ? Array.isArray(this.shadowStyle)
        ? this.shadowStyle
        : [this.shadowStyle]
      : [];

    // Convert any string styles to Lit’s CSSResult
    const shadowStyles = [componentStyles, ...shadowStyle].map(style =>
      typeof style === 'string' ? unsafeCSS(style) : style,
    );

    return shadowStyles;
  }

  @property({ type: Boolean, reflect: true, attribute: 'did-ssr' }) didSSR = isServer || Boolean(this.shadowRoot);

  #hasRecordedInitialProperties = false;

  // Store the constructor value of all `static properties = {}`
  initialReflectedProperties: Map<string, unknown> = new Map();

  internals: ElementInternals;

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (!this.#hasRecordedInitialProperties) {
      (this.constructor as typeof WebAwesomeElement).elementProperties.forEach(
        (obj, prop: keyof typeof this & string) => {
          // eslint-disable-next-line
          if (obj.reflect && this[prop] != null) {
            this.initialReflectedProperties.set(prop, this[prop]);
          }
        },
      );

      this.#hasRecordedInitialProperties = true;
    }

    super.attributeChangedCallback(name, oldValue, newValue);
  }

  protected willUpdate(changedProperties: Parameters<LitElement['willUpdate']>[0]): void {
    super.willUpdate(changedProperties);

    // Run the morph fixing *after* willUpdate.
    this.initialReflectedProperties.forEach((value, prop: string & keyof typeof this) => {
      // If a prop changes to `null`, we assume this happens via an attribute changing to `null`.
      // eslint-disable-next-line
      if (changedProperties.has(prop) && this[prop] == null) {
        // Silly type gymnastics to appease the compiler.
        (this as Record<string, unknown>)[prop] = value;
      }
    });
  }

  protected firstUpdated(changedProperties: Parameters<LitElement['firstUpdated']>[0]): void {
    super.firstUpdated(changedProperties);

    // This is a fix to workaround SSR not being able to catch slotchange events.
    // https://github.com/lit/lit/discussions/4697
    if (this.didSSR) {
      this.shadowRoot?.querySelectorAll('slot').forEach(slotElement => {
        slotElement.dispatchEvent(new Event('slotchange', { bubbles: true, composed: false, cancelable: false }));
      });
    }
  }

  protected update(changedProperties: PropertyValues<this>): void {
    try {
      super.update(changedProperties);
    } catch (e) {
      if (this.didSSR && !this.hasUpdated) {
        // Emit a hydration error so we can catch it and do cool things.
        // This may accidentally grab non-hydration related errors, but its the best I've found without directly reading error strings.
        const event = new Event('lit-hydration-error', { bubbles: true, composed: true, cancelable: false });
        // @ts-expect-error leave me alone TS.
        event.error = e;
        this.dispatchEvent(event);
      }
      throw e;
    }
  }

  /** Checks if states are supported by the element */
  private hasStatesSupport(): boolean {
    return Boolean(this.internals?.states);
  }

  /** Adds a custom state to the element. */
  addCustomState(state: string) {
    if (this.hasStatesSupport()) {
      this.internals.states.add(state);
    }
  }

  /** Removes a custom state from the element. */
  deleteCustomState(state: string) {
    if (this.hasStatesSupport()) {
      this.internals.states.delete(state);
    }
  }

  /** Toggles a custom state on the element. */
  toggleCustomState(state: string, force?: boolean) {
    if (typeof force === 'boolean') {
      if (force) {
        this.addCustomState(state);
      } else {
        this.deleteCustomState(state);
      }
      return;
    }

    this.toggleCustomState(state, !this.hasCustomState(state));
  }

  /** Determines if the element has the specified custom state. */
  hasCustomState(state: string): boolean {
    return this.hasStatesSupport() ? this.internals.states.has(state) : false;
  }
}
