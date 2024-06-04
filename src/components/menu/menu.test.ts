import { clickOnElement } from '../../internal/test.js';
import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit';
import { sendKeys } from '@web/test-runner-commands';
import sinon from 'sinon';
import type { WaSelectEvent } from '../../events/select.js';
import type WaMenu from './menu.js';

describe('<wa-menu>', () => {
  it('emits wa-select with the correct event detail when clicking an item', async () => {
    const menu = await fixture<WaMenu>(html`
      <wa-menu>
        <wa-menu-item value="item-1">Item 1</wa-menu-item>
        <wa-menu-item value="item-2">Item 2</wa-menu-item>
        <wa-menu-item value="item-3">Item 3</wa-menu-item>
        <wa-menu-item value="item-4">Item 4</wa-menu-item>
      </wa-menu>
    `);
    const item2 = menu.querySelectorAll('wa-menu-item')[1];
    const selectHandler = sinon.spy((event: WaSelectEvent) => {
      const item = event.detail.item;
      if (item !== item2) {
        expect.fail('Incorrect event detail emitted with wa-select');
      }
    });

    menu.addEventListener('wa-select', selectHandler);
    await clickOnElement(item2);

    expect(selectHandler).to.have.been.calledOnce;
  });

  it('can be selected via keyboard', async () => {
    const menu = await fixture<WaMenu>(html`
      <wa-menu>
        <wa-menu-item value="item-1">Item 1</wa-menu-item>
        <wa-menu-item value="item-2">Item 2</wa-menu-item>
        <wa-menu-item value="item-3">Item 3</wa-menu-item>
        <wa-menu-item value="item-4">Item 4</wa-menu-item>
      </wa-menu>
    `);
    const [item1, item2] = menu.querySelectorAll('wa-menu-item');
    const selectHandler = sinon.spy((event: WaSelectEvent) => {
      const item = event.detail.item;
      if (item !== item2) {
        expect.fail('Incorrect item selected');
      }
    });

    menu.addEventListener('wa-select', selectHandler);

    item1.focus();
    await item1.updateComplete;
    await sendKeys({ press: 'ArrowDown' });
    await sendKeys({ press: 'Enter' });

    expect(selectHandler).to.have.been.calledOnce;
  });

  it('does not select disabled items when clicking', async () => {
    const menu = await fixture<WaMenu>(html`
      <wa-menu>
        <wa-menu-item value="item-1">Item 1</wa-menu-item>
        <wa-menu-item value="item-2" disabled>Item 2</wa-menu-item>
        <wa-menu-item value="item-3">Item 3</wa-menu-item>
        <wa-menu-item value="item-4">Item 4</wa-menu-item>
      </wa-menu>
    `);
    const item2 = menu.querySelectorAll('wa-menu-item')[1];
    const selectHandler = sinon.spy();

    menu.addEventListener('wa-select', selectHandler);

    await clickOnElement(item2);

    expect(selectHandler).to.not.have.been.calledOnce;
  });

  it('does not select disabled items when pressing enter', async () => {
    const menu = await fixture<WaMenu>(html`
      <wa-menu>
        <wa-menu-item value="item-1">Item 1</wa-menu-item>
        <wa-menu-item value="item-2" disabled>Item 2</wa-menu-item>
        <wa-menu-item value="item-3">Item 3</wa-menu-item>
        <wa-menu-item value="item-4">Item 4</wa-menu-item>
      </wa-menu>
    `);
    const [item1, item2] = menu.querySelectorAll('wa-menu-item');
    const selectHandler = sinon.spy();

    menu.addEventListener('wa-select', selectHandler);

    item1.focus();
    await item1.updateComplete;
    await sendKeys({ press: 'ArrowDown' });
    expect(document.activeElement).to.equal(item2);
    await sendKeys({ press: 'Enter' });
    await item2.updateComplete;

    expect(selectHandler).to.not.have.been.called;
  });

  // @see https://github.com/shoelace-style/shoelace/issues/1596
  it('Should fire "wa-select" when clicking an element within a menu-item', async () => {
    // eslint-disable-next-line
    const selectHandler = sinon.spy(() => {});

    const menu: WaMenu = await fixture(html`
      <wa-menu>
        <wa-menu-item>
          <span>Menu item</span>
        </wa-menu-item>
      </wa-menu>
    `);

    menu.addEventListener('wa-select', selectHandler);
    const span = menu.querySelector('span')!;
    await clickOnElement(span);

    expect(selectHandler).to.have.been.calledOnce;
  });
});
