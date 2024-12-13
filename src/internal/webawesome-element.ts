import { CustomErrorValidator } from './validators/custom-error-validator.js';
import { isServer, LitElement, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { WaInvalidEvent } from '../events/invalid.js';
import componentStyles from '../styles/shadow/component.css';
import type { CSSResult, CSSResultGroup, PropertyValues } from 'lit';

export default class WebAwesomeElement extends LitElement {
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
      typeof style === 'string' ? unsafeCSS(style) : style
    );

    return shadowStyles;
  }

  @property({ type: Boolean, reflect: true, attribute: 'did-ssr' }) didSSR = isServer || Boolean(this.shadowRoot);

  #hasRecordedInitialProperties = false;

  // Store the constructor value of all `static properties = {}`
  initialReflectedProperties: Map<string, unknown> = new Map();

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (!this.#hasRecordedInitialProperties) {
      (this.constructor as typeof WebAwesomeElement).elementProperties.forEach(
        (obj, prop: keyof typeof this & string) => {
          // eslint-disable-next-line
          if (obj.reflect && this[prop] != null) {
            this.initialReflectedProperties.set(prop, this[prop]);
          }
        }
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
}

export interface Validator<T extends WebAwesomeFormAssociatedElement = WebAwesomeFormAssociatedElement> {
  observedAttributes?: string[];
  checkValidity: (element: T) => {
    message: string;
    isValid: boolean;
    invalidKeys: Exclude<keyof ValidityState, 'valid'>[];
  };
  message?: string | ((element: T) => string);
}

export interface WebAwesomeFormControl extends WebAwesomeElement {
  // Form attributes
  name: null | string;
  disabled?: boolean;
  defaultValue?: unknown;
  defaultChecked?: boolean;
  checked?: boolean;
  defaultSelected?: boolean;
  selected?: boolean;
  form?: string | null;

  value?: unknown;

  // Constraint validation attributes
  pattern?: string;
  min?: number | string | Date;
  max?: number | string | Date;
  step?: number | 'any';
  required?: boolean;
  minlength?: number;
  maxlength?: number;

  // Form validation properties
  readonly validity: ValidityState;
  readonly validationMessage: string;

  // Form validation methods
  checkValidity: () => boolean;
  getForm: () => HTMLFormElement | null;
  reportValidity: () => boolean;
  setCustomValidity: (message: string) => void;

  // Form properties
  hasInteracted: boolean;
  valueHasChanged?: boolean;

  /** Convenience API for `setCustomValidity()` */
  customError: null | string;
}

// setFormValue omitted so that we can use `setValue`
export class WebAwesomeFormAssociatedElement
  extends WebAwesomeElement
  implements Omit<ElementInternals, 'form' | 'setFormValue'>, WebAwesomeFormControl
{
  static formAssociated = true;

  /**
   * Validators are static because they have `observedAttributes`, essentially attributes to "watch"
   * for changes. Whenever these attributes change, we want to be notified and update the validator.
   */
  static get validators(): Validator[] {
    return [CustomErrorValidator()];
  }

  // Append all Validator "observedAttributes" into the "observedAttributes" so they can run.
  static get observedAttributes() {
    const parentAttrs = new Set(super.observedAttributes || []);

    for (const validator of this.validators) {
      if (!validator.observedAttributes) {
        continue;
      }

      for (const attr of validator.observedAttributes) {
        parentAttrs.add(attr);
      }
    }

    return [...parentAttrs];
  }

  // Form attributes
  /** The name of the input, submitted as a name/value pair with form data. */
  @property({ reflect: true }) name: string | null = null;

  /** Disables the form control. */
  @property({ type: Boolean }) disabled = false;

  required: boolean = false;

  // Form validation methods
  internals: ElementInternals;

  assumeInteractionOn: string[] = ['wa-input'];

  // Additional
  input?: (HTMLElement & { value: unknown }) | HTMLInputElement | HTMLTextAreaElement;

  validators: Validator[] = [];

  // Should these be private?
  @property({ state: true, attribute: false }) valueHasChanged: boolean = false;
  @property({ state: true, attribute: false }) hasInteracted: boolean = false;

  // This works around a limitation in Safari. It is a hacky way for us to preserve custom errors generated by the user.
  @property({ attribute: 'custom-error', reflect: true }) customError: string | null = null;

  private emittedEvents: string[] = [];

  constructor() {
    super();

    try {
      this.internals = this.attachInternals();
    } catch (_e) {
      /* Need to tell people if they need a polyfill. */
      /* eslint-disable-next-line */
      console.error('Element internals are not supported in your browser. Consider using a polyfill');
    }

    if (!isServer) {
      // eslint-disable-next-line
      this.addEventListener('invalid', this.emitInvalid);
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.updateValidity();

    // Lazily evaluate after the constructor to allow people to override the `assumeInteractionOn`
    this.assumeInteractionOn.forEach(event => {
      this.addEventListener(event, this.handleInteraction);
    });
  }

  firstUpdated(...args: Parameters<LitElement['firstUpdated']>) {
    super.firstUpdated(...args);
    this.updateValidity();
  }

  emitInvalid = (e: Event) => {
    if (e.target !== this) return;

    // An "invalid" event counts as interacted, this is usually triggered by a button "submitting"
    this.hasInteracted = true;
    this.dispatchEvent(new WaInvalidEvent());
  };

  protected willUpdate(changedProperties: Parameters<LitElement['willUpdate']>[0]) {
    if (!isServer && changedProperties.has('customError')) {
      // We use null because it we really don't want it to show up in the attributes because `custom-error` does reflect
      if (!this.customError) {
        this.customError = null;
      }
      this.setCustomValidity(this.customError || '');
    }

    if (changedProperties.has('value') || changedProperties.has('disabled')) {
      // @ts-expect-error Some components will use an accessors, other use a property, so we dont want to limit them.
      const value = this.value as unknown;

      // Accounts for the snowflake case on `<wa-select>`
      if (Array.isArray(value)) {
        if (this.name) {
          const formData = new FormData();
          for (const val of value) {
            formData.append(this.name, val as string);
          }
          this.setValue(formData, formData);
        }
      } else {
        this.setValue(value as FormData | string | File | null, value as FormData | string | File | null);
      }
    }

    if (changedProperties.has('disabled')) {
      this.toggleCustomState('disabled', this.disabled);

      if (this.hasAttribute('disabled') || (!isServer && !this.matches(':disabled'))) {
        this.toggleAttribute('disabled', this.disabled);
      }
    }

    this.updateValidity();
    super.willUpdate(changedProperties);
  }

  private handleInteraction = (event: Event) => {
    const emittedEvents = this.emittedEvents;
    if (!emittedEvents.includes(event.type)) {
      emittedEvents.push(event.type);
    }

    // Mark it as user-interacted as soon as all associated events have been emitted
    if (emittedEvents.length === this.assumeInteractionOn?.length) {
      this.hasInteracted = true;
    }
  };

  get labels() {
    return this.internals.labels;
  }

  getForm() {
    return this.internals.form;
  }

  @property({ attribute: false, state: true, type: Object })
  get validity() {
    return this.internals.validity;
  }

  // Not sure if this supports `novalidate`. Will need to test.
  get willValidate() {
    return this.internals.willValidate;
  }

  get validationMessage() {
    return this.internals.validationMessage;
  }

  checkValidity() {
    this.updateValidity();
    return this.internals.checkValidity();
  }

  reportValidity() {
    this.updateValidity();
    // This seems reasonable. `reportValidity()` is kind of like "we expect you to have interacted"
    this.hasInteracted = true;
    return this.internals.reportValidity();
  }

  /**
   * Override this to change where constraint validation popups are anchored.
   */
  get validationTarget(): undefined | HTMLElement {
    return (this.input || undefined) as undefined | HTMLElement;
  }

  setValidity(...args: Parameters<typeof this.internals.setValidity>) {
    const flags = args[0];
    const message = args[1];
    let anchor = args[2];

    if (!anchor) {
      anchor = this.validationTarget;
    }

    this.internals.setValidity(flags, message, anchor || undefined);
    this.requestUpdate('validity');
    this.setCustomStates();
  }

  setCustomStates() {
    const required = Boolean(this.required);
    const isValid = this.internals.validity.valid;
    const hasInteracted = this.hasInteracted;

    this.toggleCustomState('required', required);
    this.toggleCustomState('optional', !required);
    this.toggleCustomState('invalid', !isValid);
    this.toggleCustomState('valid', isValid);
    this.toggleCustomState('user-invalid', !isValid && hasInteracted);
    this.toggleCustomState('user-valid', isValid && hasInteracted);
  }

  /**
   * Do not use this when creating a "Validator". This is intended for end users of components.
   * We track manually defined custom errors so we don't clear them on accident in our validators.
   *
   */
  setCustomValidity(message: string) {
    if (!message) {
      // We use null because it we really don't want it to show up in the attributes because `custom-error` does reflect
      this.customError = null;
      this.setValidity({});
      return;
    }

    this.customError = message;
    this.setValidity({ customError: true }, message, this.validationTarget);
  }

  formResetCallback() {
    this.resetValidity();
    this.hasInteracted = false;
    this.valueHasChanged = false;
    this.emittedEvents = [];
    this.updateValidity();
  }

  formDisabledCallback(isDisabled: boolean) {
    this.disabled = isDisabled;

    this.updateValidity();
  }

  /**
   * Called when the browser is trying to restore element’s state to state in which case reason is "restore", or when
   * the browser is trying to fulfill autofill on behalf of user in which case reason is "autocomplete". In the case of
   * "restore", state is a string, File, or FormData object previously set as the second argument to setFormValue.
   */
  formStateRestoreCallback(state: string | File | FormData | null, reason: 'autocomplete' | 'restore') {
    // @ts-expect-error We purposely do not have a value property. It makes things hard to extend.
    this.value = state;

    if (reason === 'restore') {
      this.resetValidity();
    }

    this.updateValidity();
  }

  setValue(...args: Parameters<typeof this.internals.setFormValue>) {
    const [value, state] = args;

    this.internals.setFormValue(value, state);
  }

  get allValidators() {
    const staticValidators = (this.constructor as typeof WebAwesomeFormAssociatedElement).validators || [];

    const validators = this.validators || [];
    return [...staticValidators, ...validators];
  }

  /**
   * Reset validity is a way of removing manual custom errors and native validation.
   */
  resetValidity() {
    this.setCustomValidity('');
    this.setValidity({});
  }

  updateValidity() {
    if (
      this.disabled ||
      this.hasAttribute('disabled') ||
      !this.willValidate //
    ) {
      this.resetValidity();

      return;
    }

    const validators = this.allValidators;

    if (!validators?.length) {
      // If there's no validators, we do nothing. We also don't want to mess with custom errors, so we just stop here.
      return;
    }

    type ValidityKey = { -readonly [P in keyof ValidityState]: ValidityState[P] };

    const flags: Partial<ValidityKey> = {
      // Don't trust custom errors from the Browser. Safari breaks the spec.
      customError: Boolean(this.customError)
    };

    const formControl = this.validationTarget || this.input || undefined;

    let finalMessage = '';

    for (const validator of validators) {
      const { isValid, message, invalidKeys } = validator.checkValidity(this);

      if (isValid) {
        continue;
      }

      if (!finalMessage) {
        finalMessage = message;
      }

      if (invalidKeys?.length >= 0) {
        (invalidKeys as (keyof ValidityState)[]).forEach(str => (flags[str] = true));
      }
    }

    // This is a workaround for preserving custom errors
    if (!finalMessage) {
      finalMessage = this.validationMessage;
    }

    this.setValidity(flags, finalMessage, formControl);
  }

  // Custom states
  addCustomState(state: string) {
    try {
      // @ts-expect-error CustomStateSet doesn't exist in TS yet.
      (this.internals.states as Set<string>).add(state);
    } catch (_) {
      // Without this, test suite errors.
    } finally {
      this.setAttribute(`data-wa-${state}`, '');
    }
  }

  deleteCustomState(state: string) {
    try {
      // @ts-expect-error CustomStateSet doesn't exist in TS yet.
      (this.internals.states as Set<string>).delete(state);
    } catch (_) {
      // Without this, test suite errors.
    } finally {
      this.removeAttribute(`data-wa-${state}`);
    }
  }

  toggleCustomState(state: string, force: boolean) {
    if (force) {
      this.addCustomState(state);
      return;
    }

    if (!force) {
      this.deleteCustomState(state);
      return;
    }

    this.toggleCustomState(state, !this.hasCustomState(state));
  }

  hasCustomState(state: string) {
    let bool = false;

    try {
      // @ts-expect-error CustomStateSet doesn't exist in TS yet.
      bool = (this.internals.states as Set<string>).has(state);
    } catch (_) {
      // Without this, test suite errors.
    } finally {
      if (!bool) {
        bool = this.hasAttribute(`data-wa-${state}`);
      }
    }

    return bool;
  }
}
