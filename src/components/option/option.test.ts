import '../../../dist/webawesome.js';
import { aTimeout, expect, fixture, html, waitUntil } from '@open-wc/testing';
import sinon from 'sinon';
import type WaOption from './option';

describe('<wa-option>', () => {
  it('passes accessibility test', async () => {
    const el = await fixture<WaOption>(html`
      <wa-select label="Select one">
        <wa-option value="1">Option 1</wa-option>
        <wa-option value="2">Option 2</wa-option>
        <wa-option value="3">Option 3</wa-option>
        <wa-option value="4" disabled>Disabled</wa-option>
      </wa-select>
    `);
    await expect(el).to.be.accessible();
  });

  it('default properties', async () => {
    const el = await fixture<WaOption>(html` <wa-option>Test</wa-option> `);

    expect(el.value).to.equal('');
    expect(el.disabled).to.be.false;
    expect(el.getAttribute('aria-disabled')).to.equal('false');
  });

  it('changes aria attributes', async () => {
    const el = await fixture<WaOption>(html` <wa-option>Test</wa-option> `);

    el.disabled = true;
    await aTimeout(100);
    expect(el.getAttribute('aria-disabled')).to.equal('true');
  });

  it('emits the slotchange event when the label changes', async () => {
    const el = await fixture<WaOption>(html` <wa-option>Text</wa-option> `);
    const slotChangeHandler = sinon.spy();

    el.addEventListener('slotchange', slotChangeHandler);
    el.textContent = 'New Text';
    await waitUntil(() => slotChangeHandler.calledOnce);

    expect(slotChangeHandler).to.have.been.calledOnce;
  });

  it('should convert non-string values to string', async () => {
    const el = await fixture<WaOption>(html` <wa-option>Text</wa-option> `);

    // @ts-expect-error - intentional
    el.value = 10;
    await el.updateComplete;

    expect(el.value).to.equal('10');
  });
});
