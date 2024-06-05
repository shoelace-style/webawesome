// cspell:dictionaries lorem-ipsum
import { aTimeout, expect, fixture, waitUntil } from '@open-wc/testing';
import { html } from 'lit';
import { sendKeys } from '@web/test-runner-commands';
import sinon from 'sinon';
import type WaDialog from './dialog.js';

describe('<wa-dialog>', () => {
  it('should be visible with the open attribute', async () => {
    const el = await fixture<WaDialog>(html`
      <wa-dialog with-header open>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</wa-dialog>
    `);

    expect(getComputedStyle(el).display).to.not.equal('none');
  });

  it('should not be visible without the open attribute', async () => {
    const el = await fixture<WaDialog>(html`
      <wa-dialog with-header>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</wa-dialog>
    `);

    expect(getComputedStyle(el).display).to.equal('none');
  });

  it('should emit wa-show and wa-after-show when calling show()', async () => {
    const el = await fixture<WaDialog>(html`
      <wa-dialog with-header>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</wa-dialog>
    `);
    const showHandler = sinon.spy();
    const afterShowHandler = sinon.spy();

    el.addEventListener('wa-show', showHandler);
    el.addEventListener('wa-after-show', afterShowHandler);
    el.open = true;

    await waitUntil(() => showHandler.calledOnce);
    await waitUntil(() => afterShowHandler.calledOnce);

    expect(showHandler).to.have.been.calledOnce;
    expect(afterShowHandler).to.have.been.calledOnce;
    expect(getComputedStyle(el).display).to.not.equal('none');
  });

  it('should emit wa-hide and wa-after-hide when calling hide()', async () => {
    const el = await fixture<WaDialog>(html`
      <wa-dialog with-header open>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</wa-dialog>
    `);
    const hideHandler = sinon.spy();
    const afterHideHandler = sinon.spy();

    el.addEventListener('wa-hide', hideHandler);
    el.addEventListener('wa-after-hide', afterHideHandler);
    el.open = false;

    await waitUntil(() => hideHandler.calledOnce);
    await waitUntil(() => afterHideHandler.calledOnce);

    expect(hideHandler).to.have.been.calledOnce;
    expect(afterHideHandler).to.have.been.calledOnce;
    expect(getComputedStyle(el).display).to.equal('none');
  });

  it('should emit wa-show and wa-after-show when setting open = true', async () => {
    const el = await fixture<WaDialog>(html`
      <wa-dialog with-header>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</wa-dialog>
    `);
    const showHandler = sinon.spy();
    const afterShowHandler = sinon.spy();

    el.addEventListener('wa-show', showHandler);
    el.addEventListener('wa-after-show', afterShowHandler);
    el.open = true;

    await waitUntil(() => showHandler.calledOnce);
    await waitUntil(() => afterShowHandler.calledOnce);

    expect(showHandler).to.have.been.calledOnce;
    expect(afterShowHandler).to.have.been.calledOnce;
    expect(getComputedStyle(el).display).to.not.equal('none');
  });

  it('should emit wa-hide and wa-after-hide when setting open = false', async () => {
    const el = await fixture<WaDialog>(html`
      <wa-dialog with-header open>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</wa-dialog>
    `);
    const hideHandler = sinon.spy();
    const afterHideHandler = sinon.spy();

    el.addEventListener('wa-hide', hideHandler);
    el.addEventListener('wa-after-hide', afterHideHandler);
    el.open = false;

    await waitUntil(() => hideHandler.calledOnce);
    await waitUntil(() => afterHideHandler.calledOnce);

    expect(hideHandler).to.have.been.calledOnce;
    expect(afterHideHandler).to.have.been.calledOnce;
    expect(getComputedStyle(el).display).to.equal('none');
  });

  it('should not close when wa-hide is prevented', async () => {
    const el = await fixture<WaDialog>(html`
      <wa-dialog with-header open>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</wa-dialog>
    `);

    el.addEventListener('wa-hide', event => {
      event.preventDefault();
    });
    await sendKeys({ press: 'Escape' });

    expect(el.open).to.be.true;
  });

  it('should allow initial focus to be set', async () => {
    const el = await fixture<WaDialog>(html` <wa-dialog with-header><wa-input autofocus></wa-input></wa-dialog> `);
    const input = el.querySelector('wa-input')!;

    el.open = true;
    await aTimeout(250);
    expect(document.activeElement).to.equal(input);
  });

  it('should close when pressing Escape', async () => {
    const el = await fixture<WaDialog>(html` <wa-dialog with-header open></wa-dialog> `);
    const hideHandler = sinon.spy();

    el.addEventListener('wa-after-hide', hideHandler);

    await sendKeys({ press: 'Escape' });
    await waitUntil(() => hideHandler.calledOnce);

    expect(el.open).to.be.false;
  });
});
