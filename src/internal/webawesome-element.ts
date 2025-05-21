import type { CSSResult, CSSResultGroup, PropertyDeclaration, PropertyValues } from 'lit';
import { LitElement, defaultConverter, isServer, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { ElementStyleObserver } from 'style-observer';
import componentStyles from '../styles/shadow/component.css';
import { getComputedStyle } from './computed-style.js';

// Augment Lit's module
declare module 'lit' {
  interface PropertyDeclaration {
    /**
     * Specifies the property’s default value
     */
    default?: any;
    initial?: any;

    /**
     * Indicates whether the property should reflect to a CSS custom property.
     */
    cssProperty?: string;
  }
}

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

    this.toggleCustomState('wa-defined');

    let Self = this.constructor as typeof WebAwesomeElement;
    for (let [property, spec] of Self.elementProperties) {
      if (spec.default === 'inherit' && spec.initial !== undefined && typeof property === 'string') {
        this.toggleCustomState(`initial-${property}-${spec.initial}`);
      }
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

  /** Metadata about CSS-settable props on this element */
  private cssProps: Record<PropertyKey, { setVia?: 'css' | 'attribute' | 'js'; updating?: boolean }> = {};
  private computedStyle: CSSStyleDeclaration | null = null;
  private styleObserver: ElementStyleObserver | null = null;

  connectedCallback(): void {
    super.connectedCallback();

    // Set the initial computed styles
    const Self = this.constructor as typeof WebAwesomeElement;
    let cssProps = Object.keys(Self.cssProps);

    if (cssProps.length > 0) {
      let properties: string[] = [];

      if (Object.keys(this.cssProps).length === 0) {
        // First time connected, initialize
        this.cssProps = Object.fromEntries(
          cssProps.map(property => {
            let setVia = this.getSetVia(property);
            return [property, { setVia }];
          }),
        );
      }

      for (let property in this.cssProps) {
        let setVia = this.cssProps[property].setVia;
        if (!setVia || setVia === 'css') {
          // No attribute set, observe CSS property
          properties.push(property);
        }
      }

      this.handleCSSPropertyChange(properties);

      this.styleObserver ??= new ElementStyleObserver(this, (records: object[]) => {
        let cssProperties = new Set(records.map((record: { property: string }) => record.property));

        // Map CSS properties to prop names
        let properties = cssProps.filter(property => {
          let cssProperty = Self.cssProps[property].cssProperty as string;
          return cssProperties.has(cssProperty);
        });

        this.handleCSSPropertyChange(properties);
      });
      this.styleObserver.unobserve();
      this.styleObserver.observe(properties.map(property => Self.cssProps[property].cssProperty as string));
    }
  }

  /**
   * Respond to CSS property changes for CSS properties reflecting props
   * @param [properties] - Prop names. Defaults to all CSS-reflected props.
   * @void
   */
  handleCSSPropertyChange(properties?: PropertyKey | PropertyKey[]) {
    const Self = this.constructor as typeof WebAwesomeElement;

    properties ??= Object.keys(Self.cssProps);
    properties = Array.isArray(properties) ? properties : [properties];

    if (properties.length === 0) {
      return;
    }

    this.computedStyle ??= getComputedStyle(this);

    for (let property of properties) {
      let propOptions = Self.cssProps[property];
      let cssProperty = propOptions?.cssProperty;
      let meta = this.cssProps[property];

      if (!cssProperty || (meta.setVia && meta.setVia !== 'css')) {
        continue;
      }

      const value = this.computedStyle?.getPropertyValue(cssProperty);
      // if (property === 'variant' && !value) debugger;

      if (value) {
        meta.setVia = 'css';
        meta.updating = true;
        // @ts-ignore
        this[property] = value.trim();

        this.updateComplete.then(() => {
          meta.updating = false;
        });
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

  /**
   * Get how a prop was set
   * @param property - The property to check
   */
  private getSetVia(property: PropertyKey): 'css' | 'js' | 'attribute' | undefined {
    let Self = this.constructor as typeof WebAwesomeElement;
    let setVia;
    let propOptions = Self.cssProps[property];
    let attribute = typeof propOptions.attribute === 'string' ? propOptions.attribute : (property as string);

    if (propOptions.attribute !== false && this.hasAttribute(attribute)) {
      setVia = 'attribute';
    } else {
      // @ts-ignore
      let value = this[property as PropertyKey];
      if (value !== undefined && value !== propOptions.default) {
        setVia = 'js';
      }
    }

    return setVia as 'attribute' | 'js' | 'css' | undefined;
  }

  protected updated(changedProperties: PropertyValues<this>) {
    super.updated(changedProperties);

    let Self = this.constructor as typeof WebAwesomeElement;
    let cssProps = Object.keys(Self.cssProps);

    if (cssProps.length === 0) {
      return;
    }

    for (let [property] of changedProperties) {
      let meta = this.cssProps[property];

      if (meta && typeof property === 'string' && !(meta.setVia === 'css' && meta.updating)) {
        // A prop is being set via JS or an attribute that was previously set via CSS
        // and it's not because we're in the middle of an update
        meta.setVia = this.getSetVia(property);
      }
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

  getComputed(prop: PropertyKey) {
    let value = this[prop as keyof this];
    if (value !== 'inherit') {
      return value;
    }

    let Self = this.constructor as typeof WebAwesomeElement;
    let options = Self.elementProperties.get(prop as string);

    for (let element: Node = this; element.parentElement; element = element.parentElement) {
      value = (element as any)[prop as PropertyKey];
      if (value !== 'inherit') {
        return value;
      }
    }

    // If we've reached this point and we still have `inherit`, we just ran out of parents
    return options?.initial ?? options?.default ?? value;
  }

  /**
   * Given a native event, this function cancels it and dispatches it again from the host element using the desired
   * event options.
   */
  relayNativeEvent(event: Event, eventOptions?: EventInit) {
    event.stopImmediatePropagation();

    this.dispatchEvent(
      new (event.constructor as typeof Event)(event.type, {
        ...event,
        ...eventOptions,
      }),
    );
  }

  getBoundingClientRect(): DOMRect {
    let rect = super.getBoundingClientRect();

    if (rect.width === 0 && rect.height === 0) {
      let Self = this.constructor as typeof WebAwesomeElement;

      if (Self.rectProxy) {
        let element = this[Self.rectProxy as keyof this];
        if (element instanceof Element) {
          let childRect = element.getBoundingClientRect();
          if (childRect.width > 0 || childRect.height > 0) {
            return childRect;
          }
        }
      }
    }

    return rect;
  }

  /**
   * If getBoundingClientRect() returns an empty rect,
   * should we check another element?
   */
  static rectProxy: undefined | string;

  /**
   * Props that can be set via CSS custom properties
   */
  static cssProps: Record<PropertyKey, PropertyDeclaration> = {};

  static createProperty(name: PropertyKey, options?: PropertyDeclaration): void {
    if (options) {
      if (options.initial !== undefined && options.default === undefined) {
        // Set "inherit" value as default if no default is specified but the initial value is
        // This saves us having to tediously specify default: "inherit", initial: "foo" for every property
        options.default = 'inherit';
      }

      if (options.default !== undefined && options.converter === undefined) {
        // Wrap the default converter to remove the attribute if the value is the default
        // This effectively prevents the component sprouting attributes that have not been specified
        let converter = {
          ...defaultConverter,
          toAttribute(value: string, type: unknown): unknown {
            if (value === options!.default) {
              return null;
            }
            return defaultConverter.toAttribute!(value, type);
          },
        };
        options = { ...options, converter };
      }
    }

    super.createProperty(name, options);

    if (options) {
      if (options.cssProperty) {
        // Add to the set of CSS-settable props
        if (this.cssProps === WebAwesomeElement.cssProps) {
          // Each class needs its own, otherwise they'd share the same object
          this.cssProps = {};
        }

        this.cssProps[name] = options;
      }

      // Wrap the default accessor with logic to return the default value if the value is null
      if (options.default !== undefined) {
        const descriptor = Object.getOwnPropertyDescriptor(this.prototype, name as string);

        if (descriptor?.get) {
          const getter = descriptor.get;

          Object.defineProperty(this.prototype, name, {
            ...descriptor,
            get() {
              return getter.call(this) ?? options.default;
            },
          });
        }
      }
    }
  }
}
