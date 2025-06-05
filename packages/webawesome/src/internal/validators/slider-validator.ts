import type WaSlider from '../../components/slider/slider.js';
import type { Validator } from '../webawesome-form-associated-element.js';

/**
 * Comprehensive validator for sliders that handles required, range, and step validation
 */
export const SliderValidator = (): Validator<WaSlider> => {
  // Create a native range input to get localized validation messages
  const nativeRequiredRange = Object.assign(document.createElement('input'), {
    type: 'range',
    required: true,
  });

  return {
    observedAttributes: ['required', 'min', 'max', 'step'],
    checkValidity(element) {
      const validity: ReturnType<Validator['checkValidity']> = {
        message: '',
        isValid: true,
        invalidKeys: [],
      };

      // Create native range input to get localized validation messages
      const createNativeRange = (value: number, min: number, max: number, step: number) => {
        const input = document.createElement('input');
        input.type = 'range';
        input.min = String(min);
        input.max = String(max);
        input.step = String(step);
        input.value = String(value);

        // Trigger validation
        input.checkValidity();
        return input.validationMessage;
      };

      // Check required validation first
      if (element.required && !element.hasInteracted) {
        validity.isValid = false;
        validity.invalidKeys.push('valueMissing');
        validity.message = nativeRequiredRange.validationMessage || 'Please fill out this field.';
        return validity;
      }

      // For range sliders, validate both values
      if (element.isRange) {
        const minValue = element.minValue;
        const maxValue = element.maxValue;

        // Check range underflow for min value
        if (minValue < element.min) {
          validity.isValid = false;
          validity.invalidKeys.push('rangeUnderflow');
          validity.message =
            createNativeRange(minValue, element.min, element.max, element.step) ||
            `Value must be greater than or equal to ${element.min}.`;
          return validity;
        }

        // Check range overflow for max value
        if (maxValue > element.max) {
          validity.isValid = false;
          validity.invalidKeys.push('rangeOverflow');
          validity.message =
            createNativeRange(maxValue, element.min, element.max, element.step) ||
            `Value must be less than or equal to ${element.max}.`;
          return validity;
        }

        // Check step mismatch
        if (element.step && element.step !== 1) {
          const minStepMismatch = (minValue - element.min) % element.step !== 0;
          const maxStepMismatch = (maxValue - element.min) % element.step !== 0;

          if (minStepMismatch || maxStepMismatch) {
            validity.isValid = false;
            validity.invalidKeys.push('stepMismatch');
            const testValue = minStepMismatch ? minValue : maxValue;
            validity.message =
              createNativeRange(testValue, element.min, element.max, element.step) ||
              `Value must be a multiple of ${element.step}.`;
            return validity;
          }
        }
      } else {
        // Single value validation
        const value = element.value;

        // Check range underflow
        if (value < element.min) {
          validity.isValid = false;
          validity.invalidKeys.push('rangeUnderflow');
          validity.message =
            createNativeRange(value, element.min, element.max, element.step) ||
            `Value must be greater than or equal to ${element.min}.`;
          return validity;
        }

        // Check range overflow
        if (value > element.max) {
          validity.isValid = false;
          validity.invalidKeys.push('rangeOverflow');
          validity.message =
            createNativeRange(value, element.min, element.max, element.step) ||
            `Value must be less than or equal to ${element.max}.`;
          return validity;
        }

        // Check step mismatch
        if (element.step && element.step !== 1 && (value - element.min) % element.step !== 0) {
          validity.isValid = false;
          validity.invalidKeys.push('stepMismatch');
          validity.message =
            createNativeRange(value, element.min, element.max, element.step) ||
            `Value must be a multiple of ${element.step}.`;
          return validity;
        }
      }

      return validity;
    },
  };
};
