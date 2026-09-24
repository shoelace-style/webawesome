import type WaButton from '../components/button/button.js';
import type { WebAwesomeFormAssociatedElement } from './webawesome-form-associated-element.js';

export function submitOnEnter<T extends HTMLElement>(event: KeyboardEvent, el: T) {
  const hasModifier = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;

  // Pressing enter when focused on an input should submit the form like a native input, but we wait a tick before
  // submitting to allow users to cancel the keydown event if they need to
  if (event.key === 'Enter' && !hasModifier) {
    // setTimeout in case the event is caught higher up in the tree and defaultPrevented
    setTimeout(() => {
      //
      // When using an Input Method Editor (IME), pressing enter will cause the form to submit unexpectedly. One way
      // to check for this is to look at event.isComposing, which will be true when the IME is open.
      //
      // See https://github.com/shoelace-style/shoelace/pull/988
      //
      if (!event.defaultPrevented && !event.isComposing) {
        submitForm(el);
      }
    });
  }
}

// Submittable inputs are all tags we know that are submittable by pressing "Enter".
// This is rough, and I may miss some, but its the best I could get to.
const submittableTags = new Map([
  ['input', true],
  ['wa-input', true],
  ['wa-tag-input', true],
  ['wa-number-input', true],
  ['wa-otp-input', true],
  ['wa-slider', true],
]);

// Pulled from sidebar here: <https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/button>
const submittableTypes = new Map([
  ['button', false],
  ['checkbox', false],
  ['color', false],
  ['date', false],
  ['datetime-local', false],
  ['email', true],
  ['file', false],
  ['hidden', false],
  ['image', false],
  ['month', false],
  ['number', true],
  ['password', true],
  ['radio', false],
  ['range', false],
  ['reset', true],
  ['search', true],
  ['submit', false],
  ['tel', true],
  ['text', true],
  ['time', false],
  ['url', true],
  ['week', false],
]);

const isSubmittableElement = (el: Element) => {
  const tagName = el?.localName;
  if (!tagName) {
    return false;
  }

  const isSubmittableTag = Boolean(submittableTags.get(tagName));

  if (!isSubmittableTag) {
    return false;
  }

  // We dont need to typecheck unless the input is either `<wa-input>` or `<input>`
  if (tagName !== 'input' && tagName !== 'wa-input') {
    return true;
  }

  const type = (el as HTMLInputElement).type;
  return Boolean(submittableTypes.get(type));
};

export function submitForm(el: HTMLElement | WebAwesomeFormAssociatedElement) {
  let form: HTMLFormElement | null = null;

  if ('form' in el) {
    form = el.form as HTMLFormElement | null;
  }

  if (!form && 'getForm' in el) {
    form = el.getForm();
  }

  if (!form) {
    return;
  }

  const formElements = Array.from(form.elements);

  let submittableFormElements = 0;
  for (const el of formElements) {
    if (isSubmittableElement(el)) {
      submittableFormElements += 1;
    }
  }

  // If we're the only formElement, we submit like a native input.
  if (submittableFormElements === 1) {
    form.requestSubmit(null);
    return;
  }

  const button = formElements.find((el: HTMLButtonElement | HTMLInputElement) => {
    return el.type === 'submit' && !el.matches(':disabled');
  }) as undefined | HTMLButtonElement | HTMLInputElement | WaButton;

  // No button found, don't submit.
  if (!button) {
    return;
  }

  if (['input', 'button'].includes(button.localName)) {
    form.requestSubmit(button);
  } else {
    // requestSubmit() wont work with `<wa-button>`, so trigger a manual click.
    button.click();
  }
}
