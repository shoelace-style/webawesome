import type WaTagInput from '../../components/tag-input/tag-input.js';
import type { Validator } from '../webawesome-form-associated-element.js';

/**
 * Validates the number of tags in a tag input against `required`, `min-tags`, and `max-tags`. The built-in required
 * validator only checks whether the value is falsy, which an empty array never is, so tag inputs need their own.
 */
export const TagInputValidator = (): Validator<WaTagInput> => {
  // Borrow the browser's localized "Please fill out this field." message, like the required validator does
  const nativeRequired =
    typeof document !== 'undefined' && 'createElement' in document
      ? Object.assign(document.createElement('input'), { required: true })
      : undefined;

  return {
    observedAttributes: ['required', 'min-tags', 'max-tags'],
    checkValidity(element) {
      const validity: ReturnType<Validator['checkValidity']> = {
        message: '',
        isValid: true,
        invalidKeys: [],
      };

      const count = element.value.length;

      if (element.required && count === 0) {
        validity.isValid = false;
        validity.invalidKeys.push('valueMissing');
        validity.message = nativeRequired?.validationMessage || 'Please fill out this field.';
        return validity;
      }

      // Zero tags on an optional control stays valid, like minlength on an empty input
      if (element.minTags != null && count > 0 && count < element.minTags) {
        validity.isValid = false;
        validity.invalidKeys.push('rangeUnderflow');
        validity.message = element.localize.term('tooFewTags', element.minTags);
        return validity;
      }

      if (element.maxTags != null && count > element.maxTags) {
        validity.isValid = false;
        validity.invalidKeys.push('rangeOverflow');
        validity.message = element.localize.term('tooManyTags', element.maxTags);
      }

      return validity;
    },
  };
};
