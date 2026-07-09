import type WaSlider from '../../components/slider/slider.js';
import type { Validator } from '../webawesome-form-associated-element.js';

/**
 * True when `value` isn't aligned to the step grid anchored at `min`. The step count is compared to the nearest integer
 * with a small tolerance so values that legitimately land on the grid (e.g. `0.3` with a step of `0.1`) aren't rejected
 * because of floating-point error, matching the native `<input>` step-mismatch behavior.
 */
function isStepMismatch(value: number, min: number, step: number): boolean {
  const steps = (value - min) / step;
  return Math.abs(steps - Math.round(steps)) > 1e-9;
}

/**
 * Comprehensive validator for sliders that handles range and step validation
 */
export const SliderValidator = (): Validator<WaSlider> => {
  return {
    observedAttributes: ['min', 'max', 'step'],
    checkValidity(element) {
      const validity: ReturnType<Validator['checkValidity']> = {
        message: '',
        isValid: true,
        invalidKeys: [],
      };

      // Create native range input to get localized validation messages
      const createNativeRange = (value: number, min: number, max: number, step: number) => {
        if (typeof document === 'undefined') {
          return '';
        }

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
          const minStepMismatch = isStepMismatch(minValue, element.min, element.step);
          const maxStepMismatch = isStepMismatch(maxValue, element.min, element.step);

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
        if (element.step && element.step !== 1 && isStepMismatch(value, element.min, element.step)) {
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
