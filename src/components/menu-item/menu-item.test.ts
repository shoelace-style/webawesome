import '../../../dist/webawesome.js';
import { expect, fixture, html, waitUntil } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import sinon from 'sinon';
import type { WaSelectEvent } from '../../events/wa-select';
import type WaMenuItem from './menu-item';

describe('<wa-menu-item>', () => {
  it('should pass accessibility tests', async () => {
    const el = await fixture<WaMenuItem>(html`
      <wa-menu>
        <wa-menu-item>Item 1</wa-menu-item>
        <wa-menu-item>Item 2</wa-menu-item>
        <wa-menu-item>Item 3</wa-menu-item>
        <wa-divider></wa-divider>
        <wa-menu-item type="checkbox" checked>Checked</wa-menu-item>
        <wa-menu-item type="checkbox">Unchecked</wa-menu-item>
      </wa-menu>
    `);
    await expect(el).to.be.accessible();
  });

  it('should pass accessibility tests when using a submenu', async () => {
    const el = await fixture<WaMenuItem>(html`
      <wa-menu>
        <wa-menu-item>
          Submenu
          <wa-menu slot="submenu">
            <wa-menu-item>Submenu Item 1</wa-menu-item>
            <wa-menu-item>Submenu Item 2</wa-menu-item>
          </wa-menu>
        </wa-menu-item>
      </wa-menu>
    `);
    await expect(el).to.be.accessible();
  });

  it('should have the correct default properties', async () => {
    const el = await fixture<WaMenuItem>(html` <wa-menu-item>Test</wa-menu-item> `);

    expect(el.value).to.equal('');
    expect(el.disabled).to.be.false;
    expect(el.getAttribute('aria-disabled')).to.equal('false');
  });

  it('should render the correct aria attributes when disabled', async () => {
    const el = await fixture<WaMenuItem>(html` <wa-menu-item disabled>Test</wa-menu-item> `);
    expect(el.getAttribute('aria-disabled')).to.equal('true');
  });

  it('should return a text label when calling getTextLabel()', async () => {
    const el = await fixture<WaMenuItem>(html` <wa-menu-item>Test</wa-menu-item> `);
    expect(el.getTextLabel()).to.equal('Test');
  });

  it('should emit the slotchange event when the label changes', async () => {
    const el = await fixture<WaMenuItem>(html` <wa-menu-item>Text</wa-menu-item> `);
    const slotChangeHandler = sinon.spy();

    el.addEventListener('slotchange', slotChangeHandler);
    el.textContent = 'New Text';
    await waitUntil(() => slotChangeHandler.calledOnce);

    expect(slotChangeHandler).to.have.been.calledOnce;
  });

  it('should render a hidden menu item when the inert attribute is used', async () => {
    const menu = await fixture<WaMenuItem>(html`
      <wa-menu>
        <wa-menu-item inert>Item 1</wa-menu-item>
        <wa-menu-item>Item 2</wa-menu-item>
        <wa-menu-item>Item 3</wa-menu-item>
      </wa-menu>
    `);
    const item1 = menu.querySelector('wa-menu-item')!;

    expect(getComputedStyle(item1).display).to.equal('none');
  });

  it('should not render a wa-popup if the slot="submenu" attribute is missing, but the slot should exist in the component and be hidden.', async () => {
    const menu = await fixture<WaMenuItem>(html`
      <wa-menu>
        <wa-menu-item>
          Item 1
          <wa-menu>
            <wa-menu-item> Nested Item 1 </wa-menu-item>
          </wa-menu>
        </wa-menu-item>
      </wa-menu>
    `);

    const menuItem: HTMLElement = menu.querySelector('wa-menu-item')!;
    expect(menuItem.shadowRoot!.querySelector('wa-popup')).to.be.null;
    const submenuSlot: HTMLElement = menuItem.shadowRoot!.querySelector('slot[name="submenu"]')!;
    expect(submenuSlot.hidden).to.be.true;
  });

  it('should render an wa-popup if the slot="submenu" attribute is present', async () => {
    const menu = await fixture<WaMenuItem>(html`
      <wa-menu>
        <wa-menu-item id="test">
          Item 1
          <wa-menu slot="submenu">
            <wa-menu-item> Nested Item 1 </wa-menu-item>
          </wa-menu>
        </wa-menu-item>
      </wa-menu>
    `);

    const menuItem = menu.querySelector('wa-menu-item')!;
    expect(menuItem.shadowRoot!.querySelector('wa-popup')).to.be.not.null;
    const submenuSlot: HTMLElement = menuItem.shadowRoot!.querySelector('slot[name="submenu"]')!;
    expect(submenuSlot.hidden).to.be.false;
  });

  it('should focus on first menuitem of submenu if ArrowRight is pressed on parent menuitem', async () => {
    const menu = await fixture<WaMenuItem>(html`
      <wa-menu>
        <wa-menu-item id="item-1">
          Submenu
          <wa-menu slot="submenu">
            <wa-menu-item value="submenu-item-1"> Nested Item 1 </wa-menu-item>
          </wa-menu>
        </wa-menu-item>
      </wa-menu>
    `);

    const selectHandler = sinon.spy((event: WaSelectEvent) => {
      const item = event.detail.item;
      expect(item.value).to.equal('submenu-item-1');
    });
    menu.addEventListener('wa-select', selectHandler);

    const submenu = menu.querySelector('wa-menu-item');
    submenu.focus();
    await menu.updateComplete;
    await sendKeys({ press: 'ArrowRight' });
    await menu.updateComplete;
    await sendKeys({ press: 'Enter' });
    await menu.updateComplete;
    // Once for each menu element.
    expect(selectHandler).to.have.been.calledTwice;
  });

  it('should focus on outer menu if ArrowRight is pressed on nested menuitem', async () => {
    const menu = await fixture<WaMenuItem>(html`
      <wa-menu>
        <wa-menu-item value="outer-item-1">
          Submenu
          <wa-menu slot="submenu">
            <wa-menu-item value="inner-item-1"> Nested Item 1 </wa-menu-item>
          </wa-menu>
        </wa-menu-item>
      </wa-menu>
    `);

    const focusHandler = sinon.spy((event: FocusEvent) => {
      expect(event.target.value).to.equal('outer-item-1');
      expect(event.relatedTarget.value).to.equal('inner-item-1');
    });

    const outerItem = menu.querySelector('wa-menu-item');
    outerItem.focus();
    await menu.updateComplete;
    await sendKeys({ press: 'ArrowRight' });

    outerItem.addEventListener('focus', focusHandler);
    await menu.updateComplete;
    await sendKeys({ press: 'ArrowLeft' });
    await menu.updateComplete;
    expect(focusHandler).to.have.been.calledOnce;
  });
});
