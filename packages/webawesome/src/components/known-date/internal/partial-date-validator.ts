import type { Validator } from '../../../internal/webawesome-form-associated-element.js';
import type WaKnownDate from '../known-date.js';

/**
 * Reports `badInput` for any entry that has digits but doesn't compose to a canonical date — a partially
 * filled set of fields (some but not all) or a complete-but-impossible combination (e.g. day 32, month 13,
 * Feb 30). Like `<wa-time-input>`, this surfaces through the native constraint validation flow (the browser
 * popup on submit), not as live inline messaging.
 *
 * The empty case is valid here; the empty + required case is handled by `RequiredValidator`, so we inherit
 * the browser-localized native "Please fill out this field" message.
 */
export const PartialDateValidator = (): Validator => {
  return {
    checkValidity(element) {
      const host = element as unknown as WaKnownDate;
      const parts = host.parts;
      const empty = parts.day === '' && parts.month === '' && parts.year === '';

      // Empty is fine — required-ness is RequiredValidator's concern.
      if (empty) {
        return { isValid: true, invalidKeys: [], message: '' };
      }

      // Any digits present but the value didn't compose to a real, in-range calendar date.
      if (host.value === '') {
        const message = host.localize?.term('incompleteDate') || 'Enter a valid date.';
        return { isValid: false, invalidKeys: ['badInput'], message };
      }

      return { isValid: true, invalidKeys: [], message: '' };
    },
  };
};
