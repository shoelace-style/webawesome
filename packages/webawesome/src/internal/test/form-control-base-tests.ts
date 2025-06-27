import { aTimeout, expect } from '@open-wc/testing';
import { html, type TemplateResult } from 'lit';
import { html as staticHTML, unsafeStatic } from 'lit/static-html.js';
import type { WebAwesomeFormControl } from '../webawesome-form-associated-element.js';
import type { clientFixture, hydratedFixture } from './fixture.js';
import { fixtures } from './fixture.js';
import { clickOnElement } from './pointer-utilities.js';

type CreateControlFn = () => Promise<WebAwesomeFormControl>;

/** Runs a set of generic tests for Web Awesome form controls */
export function runFormControlBaseTests<T extends WebAwesomeFormControl = WebAwesomeFormControl>(
  tagNameOrConfig:
    | string
    | {
        tagName: string;
        init?: (control: T) => void;
        variantName: string;
      },
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
  const renderControl = (fixtureType: typeof clientFixture | typeof hydratedFixture) => async () => {
    const controlFn = createFormControl<T>(fixtureType);
    const control = await controlFn(tagName);
    init?.(control);
    return control;
  };

  runAllValidityTests(tagName, displayName, renderControl);
}

//
// Applicable for all Web Awesome form controls. This function checks the behavior of:
//   - `.validity`
//   - `.validationMessage`,
//   - `.checkValidity()`
//   - `.reportValidity()`
//   - `.setCustomValidity(msg)`
//   - `.getForm()`
//   - `:disabled`
//
function runAllValidityTests(
  tagName: string, //
  displayName: string,
  renderControl: (fixture: typeof hydratedFixture | typeof clientFixture) => () => Promise<WebAwesomeFormControl>,
) {
  // This needs to be outside the describe block other wise everything breaks because "describe" blocks cannot be async.
  // https://github.com/mochajs/mocha/issues/2116
  describe(`Form validity base test for ${displayName}`, () => {
    for (const fixture of fixtures) {
      describe(`with ${fixture.type} rendering`, () => {
        const createControl = renderControl(fixture);
        let mode = 'standard' as ReturnType<typeof getMode>;

        before(async () => {
          // will be used later to retrieve meta information about the control
          mode = getMode(await createControl());
        });

        // Run special tests depending on component type
        if (mode === 'slButtonOfTypeButton') {
          runSpecialTests_slButtonOfTypeButton(createControl);
        } else if (mode === 'slButtonWithHRef') {
          runSpecialTests_slButtonWithHref(createControl);
        } else {
          runSpecialTests_standard(createControl);
        }

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

        it.skip('should make sure that calling `.reportValidity()` will return `true` when valid', async () => {
          const control = await createControl();
          expect(control.reportValidity()).to.equal(true);

          // This is silly, but it fixes an issue with `reportValidity()` causing WebKit to crash.
          await clickOnElement(document.body);
          await aTimeout(100);
        });

        it('should not emit an `wa-invalid` event when `.checkValidity()` is called while valid', async () => {
          const control = await createControl();
          const emittedEvents = await checkEventEmissions(control, 'wa-invalid', () => control.checkValidity());
          expect(emittedEvents.length).to.equal(0);
        });

        it('should not emit an `wa-invalid` event when `.reportValidity()` is called while valid', async () => {
          const control = await createControl();
          const emittedEvents = await checkEventEmissions(control, 'wa-invalid', () => control.reportValidity());
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
            const emittedEvents = await checkEventEmissions(control, 'wa-invalid', () => control.checkValidity());
            expect(emittedEvents.length).to.equal(0);
          });

          it('should not emit an `wa-invalid` event when `.reportValidity()` is called in custom error case while disabled', async () => {
            const control = await createControl();
            control.setCustomValidity('error');
            control.disabled = true;
            await control.updateComplete;
            const emittedEvents = await checkEventEmissions(control, 'wa-invalid', () => control.reportValidity());
            expect(emittedEvents.length).to.equal(0);
          });

          it('Should find the correct form when given a form property', async () => {
            const formId = 'test-form';
            const form = await fixture(html`<form id="${formId}"></form>`);
            const control = await createControl();
            expect(control.getForm()).to.equal(null);
            // control.setAttribute("form", 'test-form');
            control.form = 'test-form';
            await control.updateComplete;
            expect(control.getForm()).to.equal(form);
          });

          it('Should find the correct form when given a form attribute', async () => {
            const formId = 'test-form';
            const form = await fixture(html`<form id="${formId}"></form>`);
            const control = await createControl();
            expect(control.getForm()).to.equal(null);
            control.setAttribute('form', 'test-form');

            await control.updateComplete;
            expect(control.getForm()).to.equal(form);
          });

          it('Should be invalid if a `customError` property is passed.', async () => {
            const control = await createControl();
            // expect(control.validity.valid).to.equal(true)
            control.customError = 'MyError';
            await control.updateComplete;
            expect(control.validity.valid).to.equal(false);
            expect(control.customStates.has('invalid')).to.equal(true);
            expect(control.validationMessage).to.equal('MyError');
          });

          it('Should be invalid if a `customError` attribute is passed.', async () => {
            const control = await createControl();
            // expect(control.validity.valid).to.equal(true)
            control.setAttribute('custom-error', 'MyError');
            await control.updateComplete;
            expect(control.customStates.has('invalid')).to.equal(true);
            expect(control.validationMessage).to.equal('MyError');
          });

          it('Should properly move into and out of `:disabled` when using a <fieldset>', async () => {
            const control = await createControl();
            const fieldset = await fixture<HTMLFieldSetElement>(html`<fieldset></fieldset>`);
            expect(control.disabled).to.equal(false);
            fieldset.append(control);
            fieldset.disabled = true;
            await control.updateComplete;
            expect(control.disabled).to.equal(true);
            // expect(control.hasAttribute("disabled")).to.equal(false)
            expect(control.matches(':disabled')).to.equal(true);
            expect(control.customStates.has('disabled')).to.equal(true);

            fieldset.disabled = false;

            await control.updateComplete;
            expect(control.disabled).to.equal(false);
            expect(control.hasAttribute('disabled')).to.equal(false);
            expect(control.matches(':disabled')).to.equal(false);
            expect(control.customStates.has('disabled')).to.equal(false);
          });

          // it("This is the one edge case with ':disabled'. If you disable a fieldset, and then disable the element directly, it will not reflect the disabled attribute.", async () => {
          //   const control = await createControl();
          //   const fieldset = await fixture<HTMLFieldSetElement>(html`<fieldset></fieldset>`)
          //   expect(control.disabled).to.equal(false)
          //   fieldset.append(control)
          //   fieldset.disabled = true
          //   await control.updateComplete
          //   expect(control.disabled).to.equal(true)
          //   expect(control.hasAttribute("disabled")).to.equal(false)
          //   expect(control.matches(":disabled")).to.equal(true)

          //   control.disabled = true // This wont set the `disabled` attribute.
          //   fieldset.disabled = false

          //   await control.updateComplete
          //   expect(control.disabled).to.equal(true)
          //   expect(control.hasAttribute("disabled")).to.equal(true)
          //   expect(control.matches(":disabled")).to.equal(true)
          // })

          it('Should reflect the disabled attribute if its attribute is directly added', async () => {
            const control = await createControl();
            expect(control.disabled).to.equal(false);
            control.disabled = true;
            await control.updateComplete;
            expect(control.disabled).to.equal(true);
            expect(control.hasAttribute('disabled')).to.equal(true);
            expect(control.matches(':disabled')).to.equal(true);
            expect(control.customStates.has('disabled')).to.equal(true);

            control.disabled = false;
            await control.updateComplete;

            expect(control.disabled).to.equal(false);
            expect(control.hasAttribute('disabled')).to.equal(false);
            expect(control.matches(':disabled')).to.equal(false);
            expect(control.customStates.has('disabled')).to.equal(false);
          });
        }
      });
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
    expect(control.checkValidity()).to.equal(false);
    // This is silly,but it fixes an issue with `reportValidity()` causing WebKit to crash.
    await clickOnElement(document.body);
    await aTimeout(100);
  });

  it('should make sure that calling `.reportValidity()` will still return `true` when custom error has been set', async () => {
    const control = await createControl();
    control.setCustomValidity('error');
    expect(control.reportValidity()).to.equal(false);
    // This is silly,but it fixes an issue with `reportValidity()` causing WebKit to crash.
    await clickOnElement(document.body);
    await aTimeout(100);
  });

  it('should emit an `wa-invalid` event when `.checkValidity()` is called in custom error case, and not disabled', async () => {
    const control = await createControl();
    control.setCustomValidity('error');
    control.disabled = false;
    await control.updateComplete;
    const emittedEvents = await checkEventEmissions(control, 'wa-invalid', () => control.checkValidity());
    expect(emittedEvents.length).to.equal(1);
  });

  it('should emit an `wa-invalid` event when `.reportValidity()` is called in custom error case, and not disabled', async () => {
    const control = await createControl();
    control.setCustomValidity('error');
    control.disabled = false;
    await control.updateComplete;
    const emittedEvents = await checkEventEmissions(control, 'wa-invalid', () => control.reportValidity());
    expect(emittedEvents.length).to.equal(1);
  });
}

//
// Special tests for <wa-button href="...">
//
function runSpecialTests_slButtonWithHref(createControl: CreateControlFn) {
  it('should make sure that calling `.checkValidity()` will return `false` in custom error case', async () => {
    const control = await createControl();
    control.setCustomValidity('error');
    expect(control.checkValidity()).to.equal(false);
  });

  it('should make sure that calling `.reportValidity()` will return `false` in custom error case', async () => {
    const control = await createControl();
    control.setCustomValidity('error');
    expect(control.reportValidity()).to.equal(false);
    // This is silly,but it fixes an issue with `reportValidity()` causing WebKit to crash.
    await clickOnElement(document.body);
    await aTimeout(100);
  });

  it('should emit an `wa-invalid` event when `.checkValidity()` is called in custom error case', async () => {
    const control = await createControl();
    control.setCustomValidity('error');
    await control.updateComplete;
    const emittedEvents = await checkEventEmissions(control, 'wa-invalid', () => control.checkValidity());
    expect(emittedEvents.length).to.equal(1);
  });

  it('should emit an `wa-invalid` event when `.reportValidity()` is called in custom error case', async () => {
    const control = await createControl();
    control.setCustomValidity('error');
    await control.updateComplete;
    const emittedEvents = await checkEventEmissions(control, 'wa-invalid', () => control.reportValidity());
    expect(emittedEvents.length).to.equal(1);
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
    // This is silly,but it fixes an issue with `reportValidity()` causing WebKit to crash.
    await clickOnElement(document.body);
    await aTimeout(100);
  });

  it('should emit an `wa-invalid` event when `.checkValidity()` is called in custom error case and not disabled', async () => {
    const control = await createControl();
    control.setCustomValidity('error');
    control.disabled = false;
    await control.updateComplete;
    const emittedEvents = await checkEventEmissions(control, 'wa-invalid', () => control.checkValidity());
    expect(emittedEvents.length).to.equal(1);
  });

  it('should emit an `wa-invalid` event when `.reportValidity()` is called in custom error case and not disabled', async () => {
    const control = await createControl();
    control.setCustomValidity('error');
    control.disabled = false;
    await control.updateComplete;
    const emittedEvents = await checkEventEmissions(control, 'wa-invalid', () => control.reportValidity());

    expect(emittedEvents.length).to.equal(1);
  });
}

//
// Local helper functions
//

type FixtureFunction<T extends HTMLElement = HTMLElement> = (template: TemplateResult) => Promise<T>;

// Creates a testable Web Awesome form control instance. Takes in a fixture function for SSR vs Client rendering
function createFormControl<T extends WebAwesomeFormControl = WebAwesomeFormControl>(fixtureFn: FixtureFunction<T>) {
  return async (tagName: string) => {
    // https://github.com/lit/lit/issues/2246#issuecomment-1400035813
    const tag = unsafeStatic(`${tagName}`);
    return await fixtureFn(staticHTML`<${tag}></${tag}>`);
  };
}

// Runs an action while listening for emitted events of a given type. Returns an array of all events of the given type
// that have been been emitted while the action was running.
function checkEventEmissions(control: WebAwesomeFormControl, eventType: string, action: () => void): Promise<Event[]> {
  const emittedEvents: Event[] = [];

  const eventHandler = (event: Event) => {
    emittedEvents.push(event);
  };

  return new Promise<Event[]>(resolve => {
    (async () => {
      try {
        control.addEventListener(eventType, eventHandler);
        action();
        await aTimeout(300);
      } finally {
        control.removeEventListener(eventType, eventHandler);
      }

      resolve(emittedEvents);
    })();
  });
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
