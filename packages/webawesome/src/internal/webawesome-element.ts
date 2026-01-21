import type { CSSResultGroup, PropertyValues } from 'lit';
import { LitElement, isServer } from 'lit';
import { property } from 'lit/decorators.js';
import hostStyles from '../styles/component/host.styles.js';

// Augment Lit's module
declare module 'lit' {
  interface PropertyDeclaration {
    /**
     * Specifies the property's default value
     */
    default?: any;
    initial?: any;
  }
}

export default class WebAwesomeElement extends LitElement {
  /** One or more CSSResultGroup to include in the component's shadow root. Host styles are automatically prepended. */
  static css?: CSSResultGroup;

  /** Prepends host styles to the component's styles. */
  static get styles(): CSSResultGroup {
    const styles = Array.isArray(this.css) ? this.css : this.css ? [this.css] : [];
    return [hostStyles, ...styles];
  }

  #hasRecordedInitialProperties = false;
  initialReflectedProperties: Map<string, unknown> = new Map();
  internals: ElementInternals;

  // Make localization attributes reactive
  @property() dir: string;
  @property() lang: string;
  @property({ type: Boolean, reflect: true, attribute: 'did-ssr' }) didSSR = isServer || Boolean(this.shadowRoot);

  constructor() {
    super();

    try {
      this.internals = this.attachInternals();
    } catch {
      /* Need to tell people if they need a polyfill. */
      /* eslint-disable-next-line */
      console.error('Element internals are not supported in your browser. Consider using a polyfill');
    }

    this.customStates.set('wa-defined', true);

    let Self = this.constructor as typeof WebAwesomeElement;
    for (let [property, spec] of Self.elementProperties) {
      if (spec.default === 'inherit' && spec.initial !== undefined && typeof property === 'string') {
        this.customStates.set(`initial-${property}-${spec.initial}`, true);
      }
    }
  }

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

  /**
   * Methods for setting and checking custom states.
   */
  public customStates = {
    /** Adds or removes the specified custom state. */
    set: (customState: string, active: boolean) => {
      if (!Boolean(this.internals?.states)) return;
      try {
        if (active) {
          this.internals.states.add(customState);
        } else {
          this.internals.states.delete(customState);
        }
      } catch (e) {
        if (String(e).includes("must start with '--'")) {
          /* eslint-disable-next-line */
          console.error('Your browser implements an outdated version of CustomStateSet. Consider using a polyfill');
        } else {
          throw e;
        }
      }
    },

    /** Determines whether or not the element currently has the specified state. */
    has: (customState: string) => {
      if (!Boolean(this.internals?.states)) return false;
      try {
        return this.internals.states.has(customState);
      } catch {
        return false;
      }
    },
  };

  /**
   * Given a native event, this function cancels it and dispatches it again from the host element using the desired
   * event options.
   */
  relayNativeEvent(event: Event, eventOptions?: EventInit) {
    event.stopImmediatePropagation();

    // This triggers an error in CEM, so we need to ignore it.
    /** @internal */
    this.dispatchEvent(
      new (event.constructor as typeof Event)(event.type, {
        ...event,
        ...eventOptions,
      }),
    );
  }
}
