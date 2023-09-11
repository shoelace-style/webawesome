import '../../../dist/webawesome.js';
import { clickOnElement } from '../../internal/test.js';
import { expect, fixture, html, waitUntil } from '@open-wc/testing';
import { sendKeys, sendMouse } from '@web/test-runner-commands';
import sinon from 'sinon';
import type WaDropdown from './dropdown.js';

describe('<wa-dropdown>', () => {
  it('should be visible with the open attribute', async () => {
    const el = await fixture<WaDropdown>(html`
      <wa-dropdown open>
        <wa-button slot="trigger" caret>Toggle</wa-button>
        <wa-menu>
          <wa-menu-item>Item 1</wa-menu-item>
          <wa-menu-item>Item 2</wa-menu-item>
          <wa-menu-item>Item 3</wa-menu-item>
        </wa-menu>
      </wa-dropdown>
    `);
    const panel = el.shadowRoot!.querySelector<HTMLElement>('[part~="panel"]')!;

    expect(panel.hidden).to.be.false;
  });

  it('should not be visible without the open attribute', async () => {
    const el = await fixture<WaDropdown>(html`
      <wa-dropdown>
        <wa-button slot="trigger" caret>Toggle</wa-button>
        <wa-menu>
          <wa-menu-item>Item 1</wa-menu-item>
          <wa-menu-item>Item 2</wa-menu-item>
          <wa-menu-item>Item 3</wa-menu-item>
        </wa-menu>
      </wa-dropdown>
    `);
    const panel = el.shadowRoot!.querySelector<HTMLElement>('[part~="panel"]')!;

    expect(panel.hidden).to.be.true;
  });

  it('should emit wa-show and wa-after-show when calling show()', async () => {
    const el = await fixture<WaDropdown>(html`
      <wa-dropdown>
        <wa-button slot="trigger" caret>Toggle</wa-button>
        <wa-menu>
          <wa-menu-item>Item 1</wa-menu-item>
          <wa-menu-item>Item 2</wa-menu-item>
          <wa-menu-item>Item 3</wa-menu-item>
        </wa-menu>
      </wa-dropdown>
    `);
    const panel = el.shadowRoot!.querySelector<HTMLElement>('[part~="panel"]')!;
    const showHandler = sinon.spy();
    const afterShowHandler = sinon.spy();

    el.addEventListener('wa-show', showHandler);
    el.addEventListener('wa-after-show', afterShowHandler);
    el.show();

    await waitUntil(() => showHandler.calledOnce);
    await waitUntil(() => afterShowHandler.calledOnce);

    expect(showHandler).to.have.been.calledOnce;
    expect(afterShowHandler).to.have.been.calledOnce;
    expect(panel.hidden).to.be.false;
  });

  it('should emit wa-hide and wa-after-hide when calling hide()', async () => {
    const el = await fixture<WaDropdown>(html`
      <wa-dropdown open>
        <wa-button slot="trigger" caret>Toggle</wa-button>
        <wa-menu>
          <wa-menu-item>Item 1</wa-menu-item>
          <wa-menu-item>Item 2</wa-menu-item>
          <wa-menu-item>Item 3</wa-menu-item>
        </wa-menu>
      </wa-dropdown>
    `);
    const panel = el.shadowRoot!.querySelector<HTMLElement>('[part~="panel"]')!;
    const hideHandler = sinon.spy();
    const afterHideHandler = sinon.spy();

    el.addEventListener('wa-hide', hideHandler);
    el.addEventListener('wa-after-hide', afterHideHandler);
    el.hide();

    await waitUntil(() => hideHandler.calledOnce);
    await waitUntil(() => afterHideHandler.calledOnce);

    expect(hideHandler).to.have.been.calledOnce;
    expect(afterHideHandler).to.have.been.calledOnce;
    expect(panel.hidden).to.be.true;
  });

  it('should emit wa-show and wa-after-show when setting open = true', async () => {
    const el = await fixture<WaDropdown>(html`
      <wa-dropdown>
        <wa-button slot="trigger" caret>Toggle</wa-button>
        <wa-menu>
          <wa-menu-item>Item 1</wa-menu-item>
          <wa-menu-item>Item 2</wa-menu-item>
          <wa-menu-item>Item 3</wa-menu-item>
        </wa-menu>
      </wa-dropdown>
    `);
    const panel = el.shadowRoot!.querySelector<HTMLElement>('[part~="panel"]')!;
    const showHandler = sinon.spy();
    const afterShowHandler = sinon.spy();

    el.addEventListener('wa-show', showHandler);
    el.addEventListener('wa-after-show', afterShowHandler);
    el.open = true;

    await waitUntil(() => showHandler.calledOnce);
    await waitUntil(() => afterShowHandler.calledOnce);

    expect(showHandler).to.have.been.calledOnce;
    expect(afterShowHandler).to.have.been.calledOnce;
    expect(panel.hidden).to.be.false;
  });

  it('should emit wa-hide and wa-after-hide when setting open = false', async () => {
    const el = await fixture<WaDropdown>(html`
      <wa-dropdown open>
        <wa-button slot="trigger" caret>Toggle</wa-button>
        <wa-menu>
          <wa-menu-item>Item 1</wa-menu-item>
          <wa-menu-item>Item 2</wa-menu-item>
          <wa-menu-item>Item 3</wa-menu-item>
        </wa-menu>
      </wa-dropdown>
    `);
    const panel = el.shadowRoot!.querySelector<HTMLElement>('[part~="panel"]')!;
    const hideHandler = sinon.spy();
    const afterHideHandler = sinon.spy();

    el.addEventListener('wa-hide', hideHandler);
    el.addEventListener('wa-after-hide', afterHideHandler);
    el.open = false;

    await waitUntil(() => hideHandler.calledOnce);
    await waitUntil(() => afterHideHandler.calledOnce);

    expect(hideHandler).to.have.been.calledOnce;
    expect(afterHideHandler).to.have.been.calledOnce;
    expect(panel.hidden).to.be.true;
  });

  it('should still open on arrow navigation when no menu items', async () => {
    const el = await fixture<WaDropdown>(html`
      <wa-dropdown>
        <wa-button slot="trigger" caret>Toggle</wa-button>
        <wa-menu> </wa-menu>
      </wa-dropdown>
    `);
    const trigger = el.querySelector('wa-button')!;

    trigger.focus();
    await sendKeys({ press: 'ArrowDown' });
    await el.updateComplete;

    expect(el.open).to.be.true;
  });

  it('should open on arrow down navigation', async () => {
    const el = await fixture<WaDropdown>(html`
      <wa-dropdown>
        <wa-button slot="trigger" caret>Toggle</wa-button>
        <wa-menu>
          <wa-menu-item>Item 1</wa-menu-item>
          <wa-menu-item>Item 2</wa-menu-item>
        </wa-menu>
      </wa-dropdown>
    `);
    const trigger = el.querySelector('wa-button')!;
    const firstMenuItem = el.querySelectorAll('wa-menu-item')[0];

    trigger.focus();
    await sendKeys({ press: 'ArrowDown' });
    await el.updateComplete;

    expect(el.open).to.be.true;
    expect(document.activeElement).to.equal(firstMenuItem);
  });

  it('should open on arrow up navigation', async () => {
    const el = await fixture<WaDropdown>(html`
      <wa-dropdown>
        <wa-button slot="trigger" caret>Toggle</wa-button>
        <wa-menu>
          <wa-menu-item>Item 1</wa-menu-item>
          <wa-menu-item>Item 2</wa-menu-item>
        </wa-menu>
      </wa-dropdown>
    `);
    const trigger = el.querySelector('wa-button')!;
    const secondMenuItem = el.querySelectorAll('wa-menu-item')[1];

    trigger.focus();
    await sendKeys({ press: 'ArrowUp' });
    await el.updateComplete;

    expect(el.open).to.be.true;
    expect(document.activeElement).to.equal(secondMenuItem);
  });

  it('should navigate to first focusable item on arrow navigation', async () => {
    const el = await fixture<WaDropdown>(html`
      <wa-dropdown>
        <wa-button slot="trigger" caret>Toggle</wa-button>
        <wa-menu>
          <wa-menu-label>Top Label</wa-menu-label>
          <wa-menu-item>Item 1</wa-menu-item>
        </wa-menu>
      </wa-dropdown>
    `);
    const trigger = el.querySelector('wa-button')!;
    const item = el.querySelector('wa-menu-item')!;

    await clickOnElement(trigger);
    await trigger.updateComplete;
    await sendKeys({ press: 'ArrowDown' });
    await el.updateComplete;

    expect(document.activeElement).to.equal(item);
  });

  it('should close on escape key', async () => {
    const el = await fixture<WaDropdown>(html`
      <wa-dropdown open>
        <wa-button slot="trigger" caret>Toggle</wa-button>
        <wa-menu>
          <wa-menu-item>Item 1</wa-menu-item>
          <wa-menu-item>Item 2</wa-menu-item>
        </wa-menu>
      </wa-dropdown>
    `);
    const trigger = el.querySelector('wa-button')!;

    trigger.focus();
    await sendKeys({ press: 'Escape' });
    await el.updateComplete;

    expect(el.open).to.be.false;
  });

  it('should not open on arrow navigation when no menu exists', async () => {
    const el = await fixture<WaDropdown>(html`
      <wa-dropdown>
        <wa-button slot="trigger" caret>Toggle</wa-button>
        <div>Some custom content</div>
      </wa-dropdown>
    `);
    const trigger = el.querySelector('wa-button')!;

    trigger.focus();
    await sendKeys({ press: 'ArrowDown' });
    await el.updateComplete;

    expect(el.open).to.be.false;
  });

  it('should open on enter key', async () => {
    const el = await fixture<WaDropdown>(html`
      <wa-dropdown>
        <wa-button slot="trigger" caret>Toggle</wa-button>
        <wa-menu>
          <wa-menu-item>Item 1</wa-menu-item>
        </wa-menu>
      </wa-dropdown>
    `);
    const trigger = el.querySelector('wa-button')!;

    trigger.focus();
    await el.updateComplete;
    await sendKeys({ press: 'Enter' });
    await el.updateComplete;

    expect(el.open).to.be.true;
  });

  it('should focus on menu items when clicking the trigger and arrowing through options', async () => {
    const el = await fixture<WaDropdown>(html`
      <wa-dropdown>
        <wa-button slot="trigger" caret>Toggle</wa-button>
        <wa-menu>
          <wa-menu-item>Item 1</wa-menu-item>
          <wa-menu-item>Item 2</wa-menu-item>
          <wa-menu-item>Item 3</wa-menu-item>
        </wa-menu>
      </wa-dropdown>
    `);
    const trigger = el.querySelector('wa-button')!;
    const secondMenuItem = el.querySelectorAll('wa-menu-item')[1];

    await clickOnElement(trigger);
    await trigger.updateComplete;
    await sendKeys({ press: 'ArrowDown' });
    await el.updateComplete;
    await sendKeys({ press: 'ArrowDown' });
    await el.updateComplete;

    expect(document.activeElement).to.equal(secondMenuItem);
  });

  it('should open on enter key when no menu exists', async () => {
    const el = await fixture<WaDropdown>(html`
      <wa-dropdown>
        <wa-button slot="trigger" caret>Toggle</wa-button>
        <div>Some custom content</div>
      </wa-dropdown>
    `);
    const trigger = el.querySelector('wa-button')!;

    trigger.focus();
    await el.updateComplete;
    await sendKeys({ press: 'Enter' });
    await el.updateComplete;

    expect(el.open).to.be.true;
  });

  it('should hide when clicked outside container and initially open', async () => {
    const el = await fixture<WaDropdown>(html`
      <wa-dropdown open>
        <wa-button slot="trigger" caret>Toggle</wa-button>
        <wa-menu>
          <wa-menu-item>Item 1</wa-menu-item>
        </wa-menu>
      </wa-dropdown>
    `);

    await sendMouse({ type: 'click', position: [0, 0] });
    await el.updateComplete;

    expect(el.open).to.be.false;
  });

  it('should hide when clicked outside container', async () => {
    const el = await fixture<WaDropdown>(html`
      <wa-dropdown>
        <wa-button slot="trigger" caret>Toggle</wa-button>
        <wa-menu>
          <wa-menu-item>Item 1</wa-menu-item>
        </wa-menu>
      </wa-dropdown>
    `);
    const trigger = el.querySelector('wa-button')!;

    trigger.click();
    await el.updateComplete;
    await sendMouse({ type: 'click', position: [0, 0] });
    await el.updateComplete;

    expect(el.open).to.be.false;
  });

  it('should close and stop propagating the keydown event when Escape is pressed and the dropdown is open ', async () => {
    const el = await fixture<WaDropdown>(html`
      <wa-dropdown open>
        <wa-button slot="trigger" caret>Toggle</wa-button>
        <wa-menu>
          <wa-menu-item>Dropdown Item 1</wa-menu-item>
          <wa-menu-item>Dropdown Item 2</wa-menu-item>
          <wa-menu-item>Dropdown Item 3</wa-menu-item>
        </wa-menu>
      </wa-dropdown>
    `);
    const firstMenuItem = el.querySelector('wa-menu-item')!;
    const hideHandler = sinon.spy();

    document.body.addEventListener('keydown', hideHandler);
    firstMenuItem.focus();
    await sendKeys({ press: 'Escape' });
    await el.updateComplete;

    expect(el.open).to.be.false;
    expect(hideHandler).to.not.have.been.called;
  });
});
