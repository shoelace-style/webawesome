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

  const formElements = [...form.elements];

  // If we're the only formElement, we submit like a native input.
  if (formElements.length === 1) {
    form.requestSubmit(null);
    return;
  }

  const button = formElements.find((el: HTMLButtonElement) => el.type === 'submit' && !el.matches(':disabled')) as
    | undefined
    | HTMLButtonElement
    | WaButton;

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
