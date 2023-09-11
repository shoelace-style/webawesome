import { expect, fixture } from '@open-wc/testing';
import type { WebAwesomeFormControl } from '../webawesome-element.js';

type CreateControlFn = () => Promise<WebAwesomeFormControl>;

/** Runs a set of generic tests for Web Awesome form controls */
export function runFormControlBaseTests<T extends WebAwesomeFormControl = WebAwesomeFormControl>(
  tagNameOrConfig:
    | string
    | {
        tagName: string;
        init?: (control: T) => void;
        variantName: string;
      }
) {
  const isStringArg = typeof tagNameOrConfig === 'string';
  const tagName = isStringArg ? tagNameOrConfig : tagNameOrConfig.tagName;

  // component initialization function or null
  const init =
    isStringArg || !tagNameOrConfig.init //
      ? null
      : tagNameOrConfig.init || null;

  // either `<tagName>` or `<tagName> (<variantName>)
  const displayName = isStringArg //
    ? tagName
    : `${tagName} (${tagNameOrConfig.variantName})`;

  // creates a testable form control instance
  const createControl = async () => {
    const control = await createFormControl<T>(tagName);
    init?.(control);
    return control;
  };

  runAllValidityTests(tagName, displayName, createControl);
}

//
// Applicable for all Web Awesome form controls. This function checks the behavior of:
//   - `.validity`
//   - `.validationMessage`,
//   - `.checkValidity()`
//   - `.reportValidity()`
//   - `.setCustomValidity(msg)`
//
function runAllValidityTests(
  tagName: string, //
  displayName: string,
  createControl: () => Promise<WebAwesomeFormControl>
) {
  // will be used later to retrieve meta information about the control
  describe(`Form validity base test for ${displayName}`, async () => {
    it('should have a property `validity` of type `object`', async () => {
      const control = await createControl();
      expect(control).satisfy(() => control.validity !== null && typeof control.validity === 'object');
    });

    it('should have a property `validationMessage` of type `string`', async () => {
      const control = await createControl();
      expect(control).satisfy(() => typeof control.validationMessage === 'string');
    });

    it('should implement method `checkValidity`', async () => {
      const control = await createControl();
      expect(control).satisfies(() => typeof control.checkValidity === 'function');
    });

    it('should implement method `setCustomValidity`', async () => {
      const control = await createControl();
      expect(control).satisfies(() => typeof control.setCustomValidity === 'function');
    });

    it('should implement method `reportValidity`', async () => {
      const control = await createControl();
      expect(control).satisfies(() => typeof control.reportValidity === 'function');
    });

    it('should be valid initially', async () => {
      const control = await createControl();
      expect(control.validity.valid).to.equal(true);
    });

    it('should make sure that calling `.checkValidity()` will return `true` when valid', async () => {
      const control = await createControl();
      expect(control.checkValidity()).to.equal(true);
    });

    it('should make sure that calling `.reportValidity()` will return `true` when valid', async () => {
      const control = await createControl();
      expect(control.reportValidity()).to.equal(true);
    });

    it('should not emit an `wa-invalid` event when `.checkValidity()` is called while valid', async () => {
      const control = await createControl();
      const emittedEvents = checkEventEmissions(control, 'wa-invalid', () => control.checkValidity());
      expect(emittedEvents.length).to.equal(0);
    });

    it('should not emit an `wa-invalid` event when `.reportValidity()` is called while valid', async () => {
      const control = await createControl();
      const emittedEvents = checkEventEmissions(control, 'wa-invalid', () => control.reportValidity());
      expect(emittedEvents.length).to.equal(0);
    });

    // TODO: As soon as `WaRadioGroup` has a property `disabled` this
    // condition can be removed
    if (tagName !== 'wa-radio-group') {
      it('should not emit an `wa-invalid` event when `.checkValidity()` is called in custom error case while disabled', async () => {
        const control = await createControl();
        control.setCustomValidity('error');
        control.disabled = true;
        await control.updateComplete;
        const emittedEvents = checkEventEmissions(control, 'wa-invalid', () => control.checkValidity());
        expect(emittedEvents.length).to.equal(0);
      });

      it('should not emit an `wa-invalid` event when `.reportValidity()` is called in custom error case while disabled', async () => {
        const control = await createControl();
        control.setCustomValidity('error');
        control.disabled = true;
        await control.updateComplete;
        const emittedEvents = checkEventEmissions(control, 'wa-invalid', () => control.reportValidity());
        expect(emittedEvents.length).to.equal(0);
      });
    }

    // Run special tests depending on component type

    const mode = getMode(await createControl());

    if (mode === 'slButtonOfTypeButton') {
      runSpecialTests_slButtonOfTypeButton(createControl);
    } else if (mode === 'slButtonWithHRef') {
      runSpecialTests_slButtonWithHref(createControl);
    } else {
      runSpecialTests_standard(createControl);
    }
  });
}

//
//  Special tests for <wa-button type="button">
//
function runSpecialTests_slButtonOfTypeButton(createControl: CreateControlFn) {
  it('should make sure that `.validity.valid` is `false` in custom error case', async () => {
    const control = await createControl();
    control.setCustomValidity('error');
    expect(control.validity.valid).to.equal(false);
  });

  it('should make sure that calling `.checkValidity()` will still return `true` when custom error has been set', async () => {
    const control = await createControl();
    control.setCustomValidity('error');
    expect(control.checkValidity()).to.equal(true);
  });

  it('should make sure that calling `.reportValidity()` will still return `true` when custom error has been set', async () => {
    const control = await createControl();
    control.setCustomValidity('error');
    expect(control.reportValidity()).to.equal(true);
  });

  it('should not emit an `wa-invalid` event when `.checkValidity()` is called in custom error case, and not disabled', async () => {
    const control = await createControl();
    control.setCustomValidity('error');
    control.disabled = false;
    await control.updateComplete;
    const emittedEvents = checkEventEmissions(control, 'wa-invalid', () => control.checkValidity());
    expect(emittedEvents.length).to.equal(0);
  });

  it('should not emit an `wa-invalid` event when `.reportValidity()` is called in custom error case, and not disabled', async () => {
    const control = await createControl();
    control.setCustomValidity('error');
    control.disabled = false;
    await control.updateComplete;
    const emittedEvents = checkEventEmissions(control, 'wa-invalid', () => control.reportValidity());

    expect(emittedEvents.length).to.equal(0);
  });
}

//
// Special tests for <wa-button href="...">
//
function runSpecialTests_slButtonWithHref(createControl: CreateControlFn) {
  it('should make sure that calling `.checkValidity()` will return `true` in custom error case', async () => {
    const control = await createControl();
    control.setCustomValidity('error');
    expect(control.checkValidity()).to.equal(true);
  });

  it('should make sure that calling `.reportValidity()` will return `true` in custom error case', async () => {
    const control = await createControl();
    control.setCustomValidity('error');
    expect(control.reportValidity()).to.equal(true);
  });

  it('should not emit an `wa-invalid` event when `.checkValidity()` is called in custom error case', async () => {
    const control = await createControl();
    control.setCustomValidity('error');
    await control.updateComplete;
    const emittedEvents = checkEventEmissions(control, 'wa-invalid', () => control.checkValidity());
    expect(emittedEvents.length).to.equal(0);
  });

  it('should not emit an `wa-invalid` event when `.reportValidity()` is called in custom error case', async () => {
    const control = await createControl();
    control.setCustomValidity('error');
    await control.updateComplete;
    const emittedEvents = checkEventEmissions(control, 'wa-invalid', () => control.reportValidity());
    expect(emittedEvents.length).to.equal(0);
  });
}

//
// Special tests for all components with standard behavior
//
function runSpecialTests_standard(createControl: CreateControlFn) {
  it('should make sure that `.validity.valid` is `false` in custom error case', async () => {
    const control = await createControl();
    control.setCustomValidity('error');
    expect(control.validity.valid).to.equal(false);
  });

  it('should make sure that calling `.checkValidity()` will return `false` in custom error case', async () => {
    const control = await createControl();
    control.setCustomValidity('error');
    expect(control.checkValidity()).to.equal(false);
  });

  it('should make sure that calling `.reportValidity()` will return `false` in custom error case', async () => {
    const control = await createControl();
    control.setCustomValidity('error');
    expect(control.reportValidity()).to.equal(false);
  });

  it('should emit an `wa-invalid` event when `.checkValidity()` is called in custom error case and not disabled', async () => {
    const control = await createControl();
    control.setCustomValidity('error');
    control.disabled = false;
    await control.updateComplete;
    const emittedEvents = checkEventEmissions(control, 'wa-invalid', () => control.checkValidity());
    expect(emittedEvents.length).to.equal(1);
  });

  it('should emit an `wa-invalid` event when `.reportValidity()` is called in custom error case and not disabled', async () => {
    const control = await createControl();
    control.setCustomValidity('error');
    control.disabled = false;
    await control.updateComplete;
    const emittedEvents = checkEventEmissions(control, 'wa-invalid', () => control.reportValidity());
    expect(emittedEvents.length).to.equal(1);
  });
}

//
// Local helper functions
//

// Creates a testable Web Awesome form control instance
async function createFormControl<T extends WebAwesomeFormControl = WebAwesomeFormControl>(tagName: string): Promise<T> {
  return await fixture<T>(`<${tagName}></${tagName}>`);
}

// Runs an action while listening for emitted events of a given type. Returns an array of all events of the given type
// that have been been emitted while the action was running.
function checkEventEmissions(control: WebAwesomeFormControl, eventType: string, action: () => void): Event[] {
  const emittedEvents: Event[] = [];

  const eventHandler = (event: Event) => {
    emittedEvents.push(event);
  };

  try {
    control.addEventListener(eventType, eventHandler);
    action();
  } finally {
    control.removeEventListener(eventType, eventHandler);
  }

  return emittedEvents;
}

// Component `wa-button` behaves quite different to the other components. To keep things simple we use simple conditions
// here. `wa-button` might stay the only component in Web Awesome core behaves that way, so we just hard code it here.
function getMode(control: WebAwesomeFormControl) {
  if (
    control.localName === 'wa-button' && //
    'href' in control &&
    'type' in control &&
    control.type === 'button' &&
    !control.href
  ) {
    return 'slButtonOfTypeButton';
  }

  // <wa-button href="...">
  if (control.localName === 'wa-button' && 'href' in control && !!control.href) {
    return 'slButtonWithHRef';
  }

  // all other components
  return 'standard';
}
