import type { Validator } from '../webawesome-form-associated-element.js';

/**
 * This validator is for if you have an exact copy of your element in the shadow DOM. Rather than needing
 * custom translations and error messages, you can simply rely on the element "formControl" in your shadow dom.
 */
export const MirrorValidator = (): Validator => {
  return {
    checkValidity(element) {
      const formControl = element.input;

      const validity: ReturnType<Validator['checkValidity']> = {
        message: '',
        isValid: true,
        invalidKeys: [],
      };

      if (!formControl) {
        return validity;
      }

      let isValid = true;

      if ('checkValidity' in formControl) {
        isValid = formControl.checkValidity();
      }

      if (isValid) {
        return validity;
      }

      validity.isValid = false;

      if ('validationMessage' in formControl) {
        validity.message = formControl.validationMessage;
      }

      // For some reason formControl doesn't have "validity", so chalk it up to customError
      if (!('validity' in formControl)) {
        validity.invalidKeys.push('customError');
        return validity;
      }

      for (const key in formControl.validity) {
        if (key === 'valid') {
          continue;
        }

        const checkedKey = key as Exclude<keyof ValidityState, 'valid'>;

        if (formControl.validity[checkedKey]) {
          validity.invalidKeys.push(checkedKey);
        }
      }

      return validity;
    },
  };
};
