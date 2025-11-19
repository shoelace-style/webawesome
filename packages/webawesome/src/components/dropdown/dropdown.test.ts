import { aTimeout, expect, fixture, html, waitUntil } from '@open-wc/testing';
import sinon from 'sinon';
import type WaDropdown from './dropdown.js';

describe('<wa-dropdown>', () => {
  it('should render a component', async () => {
    const el = await fixture(html` <wa-dropdown></wa-dropdown> `);

    expect(el).to.exist;
  });

  it('should respect the open attribute when included', async () => {
    const el = await fixture<WaDropdown>(html`
      <wa-dropdown open>
        <wa-button slot="trigger">Dropdown</wa-button>
        <wa-dropdown-item>One</wa-dropdown-item>
      </wa-dropdown>
    `);

    await el.updateComplete;
    await aTimeout(200);

    expect(el.open).to.be.true;
  });

  it('should fire a single show/after-show and hide/after-hide in normal open/close flow', async () => {
    const el = await fixture<WaDropdown>(html`
      <wa-dropdown>
        <wa-button slot="trigger">Dropdown</wa-button>
        <wa-dropdown-item>One</wa-dropdown-item>
        <wa-dropdown-item>Two</wa-dropdown-item>
      </wa-dropdown>
    `);

    // setup spies to track how often we see different show/hide events
    const showSpy = sinon.spy();
    const afterShowSpy = sinon.spy();
    const hideSpy = sinon.spy();
    const afterHideSpy = sinon.spy();

    el.addEventListener('wa-show', showSpy);
    el.addEventListener('wa-after-show', afterShowSpy);
    el.addEventListener('wa-hide', hideSpy);
    el.addEventListener('wa-after-hide', afterHideSpy);

    // open the dropdown by triggering a click on the trigger
    const trigger = el.querySelector<HTMLElement>('[slot="trigger"]')!;
    trigger.click();

    await waitUntil(() => showSpy.calledOnce);
    await waitUntil(() => afterShowSpy.calledOnce);

    expect(showSpy.callCount).to.equal(1);
    expect(afterShowSpy.callCount).to.equal(1);

    expect(el.open).to.be.true;

    // close the dropdown by clicking the trigger again
    trigger.click();

    await waitUntil(() => hideSpy.calledOnce);
    await waitUntil(() => afterHideSpy.calledOnce);

    expect(hideSpy.callCount).to.equal(1);
    expect(afterHideSpy.callCount).to.equal(1);

    expect(el.open).to.be.false;
  });

  it('should fire a single show/after-show and hide/after-hide when wa-hide event is cancelled', async () => {
    const el = await fixture<WaDropdown>(html`
      <wa-dropdown>
        <wa-button slot="trigger">Dropdown</wa-button>
        <wa-dropdown-item>One</wa-dropdown-item>
        <wa-dropdown-item>Two</wa-dropdown-item>
      </wa-dropdown>
    `);

    // setup spies to track how often we see different show/hide events
    const showSpy = sinon.spy();
    const afterShowSpy = sinon.spy();
    const hideSpy = sinon.spy();
    const afterHideSpy = sinon.spy();

    el.addEventListener('wa-show', showSpy);
    el.addEventListener('wa-after-show', afterShowSpy);

    // Intercept wa-hide and prevent it
    el.addEventListener('wa-hide', event => {
      event.preventDefault();
      hideSpy(event);
    });

    el.addEventListener('wa-after-hide', afterHideSpy);

    // open the dropdown by triggering a click on the trigger
    const trigger = el.querySelector<HTMLElement>('[slot="trigger"]')!;
    trigger.click();

    await waitUntil(() => showSpy.calledOnce);
    await waitUntil(() => afterShowSpy.calledOnce);

    expect(showSpy.callCount).to.equal(1);
    expect(afterShowSpy.callCount).to.equal(1);

    expect(el.open).to.be.true;

    // click on the trigger (which should do nothing to the open state)
    trigger.click();

    await waitUntil(() => hideSpy.calledOnce);

    expect(hideSpy.callCount).to.equal(1);
    // after-hide should not have been called if hide is cancelled
    expect(afterHideSpy.callCount).to.equal(0);

    expect(el.open).to.be.true;
  });
});
