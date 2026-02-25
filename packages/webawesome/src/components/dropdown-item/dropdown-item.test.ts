import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import { clickOnElement } from '../../internal/test/pointer-utilities.js';
import type WaDropdownItem from './dropdown-item.js';

describe('<wa-dropdown-item>', () => {
  it('should render a component', async () => {
    const el = await fixture(html` <wa-dropdown-item></wa-dropdown-item> `);

    expect(el).to.exist;
  });

  it('should not fire click event when disabled', async () => {
    const el = await fixture<WaDropdownItem>(html` <wa-dropdown-item disabled>Item</wa-dropdown-item> `);
    await el.updateComplete;

    const clickHandler = sinon.spy();
    el.addEventListener('click', clickHandler);
    await clickOnElement(el);
    expect(clickHandler).not.to.have.been.called;
  });

  it('should fire click event when not disabled', async () => {
    const el = await fixture<WaDropdownItem>(html` <wa-dropdown-item>Item</wa-dropdown-item> `);
    const clickHandler = sinon.spy();
    el.addEventListener('click', clickHandler);
    await clickOnElement(el);
    expect(clickHandler).to.have.been.calledOnce;
  });
});
