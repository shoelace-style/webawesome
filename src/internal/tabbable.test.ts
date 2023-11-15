import { aTimeout, elementUpdated, expect, fixture } from '@open-wc/testing';

import { activeElements, getDeepestActiveElement } from './active-elements.js';
import { clickOnElement } from './test.js';
import { html } from 'lit';
import { sendKeys } from '@web/test-runner-commands';
import type { WaDialog } from '../webawesome.js';

import '../../../dist/webawesome.js';

async function holdShiftKey(callback: () => Promise<void>) {
  await sendKeys({ down: 'Shift' });
  await callback();
  await sendKeys({ up: 'Shift' });
}

const tabKey =
  navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('HeadlessChrome') ? 'Alt+Tab' : 'Tab';

// Simple helper to turn the activeElements generator into an array
function activeElementsArray() {
  return [...activeElements()];
}

window.customElements.define(
  'tab-test-1',
  class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
      this.shadowRoot!.innerHTML = `
      <wa-drawer>
        <slot name="label" slot="label"></slot>

        <slot></slot>

        <slot name="footer" slot="footer"></slot>
      </wa-drawer>
    `;
    }
  }
);

it('Should allow tabbing to slotted elements', async () => {
  const el = await fixture(html`
    <tab-test-1>
      <div slot="label">
        <wa-button id="focus-1">Focus 1</wa-button>
      </div>

      <div>
        <!-- Focus 2 lives as the close-button from <wa-drawer> -->
        <wa-button id="focus-3">Focus 3</wa-button>
        <button id="focus-4">Focus 4</button>
        <input id="focus-5" value="Focus 5" />
      </div>

      <div slot="footer">
        <div id="focus-6" tabindex="0">Focus 6</div>
        <button tabindex="-1">No Focus</button>
      </div>
    </tab-test-1>
  `);

  const drawer = el.shadowRoot?.querySelector('wa-drawer');

  if (drawer === null || drawer === undefined) throw Error('Could not find drawer inside of the test element');

  await drawer.show();

  await elementUpdated(drawer);

  const focusZero = drawer.shadowRoot?.querySelector("[role='dialog']");

  if (focusZero === null || focusZero === undefined) throw Error('Could not find dialog panel inside <wa-drawer>');

  const focusOne = el.querySelector('#focus-1');
  const focusTwo = drawer.shadowRoot?.querySelector("[part~='close-button']");

  if (focusTwo === null || focusTwo === undefined) throw Error('Could not find close button inside <wa-drawer>');

  const focusThree = el.querySelector('#focus-3');
  const focusFour = el.querySelector('#focus-4');
  const focusFive = el.querySelector('#focus-5');
  const focusSix = el.querySelector('#focus-6');

  // When we open drawer, we should be focused on the panel to start.
  expect(getDeepestActiveElement()).to.equal(focusZero);

  await sendKeys({ press: tabKey });
  expect(activeElementsArray()).to.include(focusOne);

  // When we hit the <Tab> key we should go to the "close button" on the drawer
  await sendKeys({ press: tabKey });
  expect(activeElementsArray()).to.include(focusTwo);

  await sendKeys({ press: tabKey });
  expect(activeElementsArray()).to.include(focusThree);

  await sendKeys({ press: tabKey });
  expect(activeElementsArray()).to.include(focusFour);

  await sendKeys({ press: tabKey });
  expect(activeElementsArray()).to.include(focusFive);

  await sendKeys({ press: tabKey });
  expect(activeElementsArray()).to.include(focusSix);

  // Now we should loop back to #panel
  await sendKeys({ press: tabKey });
  expect(activeElementsArray()).to.include(focusZero);

  // Now we should loop back to #panel
  await sendKeys({ press: tabKey });
  expect(activeElementsArray()).to.include(focusOne);

  // Let's reset and try from starting point 0 and go backwards.
  await holdShiftKey(async () => await sendKeys({ press: tabKey }));
  expect(activeElementsArray()).to.include(focusZero);

  await holdShiftKey(async () => await sendKeys({ press: tabKey }));
  expect(activeElementsArray()).to.include(focusSix);

  await holdShiftKey(async () => await sendKeys({ press: tabKey }));
  expect(activeElementsArray()).to.include(focusFive);

  await holdShiftKey(async () => await sendKeys({ press: tabKey }));
  expect(activeElementsArray()).to.include(focusFour);

  await holdShiftKey(async () => await sendKeys({ press: tabKey }));
  expect(activeElementsArray()).to.include(focusThree);

  await holdShiftKey(async () => await sendKeys({ press: tabKey }));
  expect(activeElementsArray()).to.include(focusTwo);

  await holdShiftKey(async () => await sendKeys({ press: tabKey }));
  expect(activeElementsArray()).to.include(focusOne);

  await holdShiftKey(async () => await sendKeys({ press: tabKey }));
  expect(activeElementsArray()).to.include(focusZero);

  await holdShiftKey(async () => await sendKeys({ press: tabKey }));
  expect(activeElementsArray()).to.include(focusSix);
});

it('Should account for when focus is changed from outside sources (like clicking)', async () => {
  const dialog = await fixture(html`
    <wa-dialog open="" label="Dialog" class="dialog-overview">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      <wa-input placeholder="tab to me"></wa-input>
      <wa-button slot="footer" variant="primary">Close</wa-button>
    </wa-dialog>
  `);

  const inputEl = dialog.querySelector('wa-input')!;
  const closeButton = dialog.shadowRoot!.querySelector('wa-icon-button')!;
  const footerButton = dialog.querySelector('wa-button')!;

  expect(activeElementsArray()).to.not.include(inputEl);

  // Sets focus to the input element
  inputEl.focus();

  expect(activeElementsArray()).to.include(inputEl);

  await sendKeys({ press: tabKey });

  expect(activeElementsArray()).not.to.include(inputEl);
  expect(activeElementsArray()).to.include(footerButton);

  // Reset focus back to input el
  inputEl.focus();
  expect(activeElementsArray()).to.include(inputEl);

  await holdShiftKey(async () => await sendKeys({ press: tabKey }));
  expect(activeElementsArray()).to.include(closeButton);
});

// https://github.com/shoelace-style/shoelace/issues/1710
it('Should respect nested modal instances', async () => {
  const dialogOne = (): WaDialog => document.querySelector('#dialog-1')!;
  const dialogTwo = (): WaDialog => document.querySelector('#dialog-2')!;

  // lit-a11y doesn't like the "autofocus" attribute.
  /* eslint-disable */
  await fixture(html`
    <div>
      <wa-button id="open-dialog-1" @click=${() => dialogOne().show()}></wa-button>
      <wa-dialog id="dialog-1" label="Dialog 1">
        <wa-button @click=${() => dialogTwo().show()} id="open-dialog-2">Open Dialog 2</wa-button>
        <wa-button slot="footer" variant="primary">Close</wa-button>
      </wa-dialog>

      <wa-dialog id="dialog-2" label="Dialog 2">
        <wa-input id="focus-1" autofocus="" placeholder="I will have focus when the dialog is opened"></wa-input>
        <wa-input id="focus-2" placeholder="Second input"></wa-input>
        <wa-button slot="footer" variant="primary" class="close-2">Close</wa-button>
      </wa-dialog>
    </div>
  `);
  /* eslint-enable */

  const firstFocusedEl = document.querySelector('#focus-1');
  const secondFocusedEl = document.querySelector('#focus-2');

  // So we can trigger auto-focus stuff
  await clickOnElement(document.querySelector('#open-dialog-1')!);
  // These clicks need a ~100ms timeout. I'm assuming for animation reasons?
  await aTimeout(100);
  await clickOnElement(document.querySelector('#open-dialog-2')!);
  await aTimeout(100);

  expect(activeElementsArray()).to.include(firstFocusedEl);

  await sendKeys({ press: tabKey });
  expect(activeElementsArray()).to.include(secondFocusedEl);
});
