import type { Validator } from '../webawesome-form-associated-element.js';

/**
 * This validator is for if you have an exact copy of your element in the shadow DOM. Rather than needing
 * custom translations and error messages, you can simply rely on the element "formControl" in your shadow dom.
 */
export const CustomErrorValidator = (): Validator => {
  return {
    observedAttributes: ['custom-error'],
    checkValidity(element) {
      const validity: ReturnType<Validator['checkValidity']> = {
        message: '',
        isValid: true,
        invalidKeys: [],
      };

      if (element.customError) {
        validity.message = element.customError;
        validity.isValid = false;
        validity.invalidKeys = ['customError'];
      }

      return validity;
    },
  };
};
