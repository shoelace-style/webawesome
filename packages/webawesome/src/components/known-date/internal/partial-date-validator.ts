import type { Validator } from '../../../internal/webawesome-form-associated-element.js';
import type WaKnownDate from '../known-date.js';

/**
 * Reports validity for the three-field model:
 *  - Partially filled (some but not all fields): `valueMissing` with a clearer message.
 *  - Fully filled but not a real calendar date (e.g. day 32, month 13, Feb 30): `badInput`, since the entry
 *    can't compose to a canonical value.
 * The empty + required case is left to the mirror validator so we inherit the browser-localized native
 * "Please fill out this field" message.
 */
export const PartialDateValidator = (): Validator => {
  return {
    checkValidity(element) {
      const host = element as unknown as WaKnownDate;
      const parts = host.parts;
      const empty = parts.day === '' && parts.month === '' && parts.year === '';
      const complete = parts.day !== '' && parts.month !== '' && parts.year !== '';

      if (empty) {
        return { isValid: true, invalidKeys: [], message: '' };
      }

      // Fully filled but the value didn't compose — the combination isn't a real calendar date.
      if (complete) {
        if (host.value === '') {
          const message = host.localize?.term('incompleteDate') || 'Enter a valid date.';
          return { isValid: false, invalidKeys: ['badInput'], message };
        }
        return { isValid: true, invalidKeys: [], message: '' };
      }

      const message = host.localize?.term('incompleteDate') || 'Enter a complete date.';
      return {
        isValid: false,
        invalidKeys: ['valueMissing'],
        message,
      };
    },
  };
};
