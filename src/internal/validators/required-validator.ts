import type { Validator } from '../webawesome-form-associated-element.js';

export interface RequiredValidatorOptions {
  /** This is a cheap way for us to get translation strings for the user without having proper translations. */
  validationElement?: HTMLSelectElement | HTMLInputElement;

  /**
   * The property to check if its not null-ish. For most elements this will be "value".
   * For "checkbox" for example it will be "checked"
   */
  validationProperty?: string;
}

export const RequiredValidator = (options: RequiredValidatorOptions = {}): Validator => {
  let { validationElement, validationProperty } = options;

  if (!validationElement) {
    validationElement = Object.assign(document.createElement('input'), { required: true });
  }

  if (!validationProperty) {
    validationProperty = 'value';
  }

  const obj: Validator = {
    observedAttributes: ['required'],
    message: validationElement.validationMessage, // @TODO: Add a translation.
    checkValidity(element) {
      const validity: ReturnType<Validator['checkValidity']> = {
        message: '',
        isValid: true,
        invalidKeys: [],
      };

      const isRequired = element.required ?? element.hasAttribute('required');

      // Always true if the element isn't required.
      if (!isRequired) {
        return validity;
      }

      const value = element[validationProperty as keyof typeof element];

      const isEmpty = !value;

      if (isEmpty) {
        validity.message = typeof obj.message === 'function' ? obj.message(element) : obj.message || '';
        validity.isValid = false;
        validity.invalidKeys.push('valueMissing');
      }

      return validity;
    },
  };

  return obj;
};
