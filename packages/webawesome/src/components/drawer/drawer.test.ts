// cspell:dictionaries lorem-ipsum
import { aTimeout, expect, waitUntil } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit';
import sinon from 'sinon';
import { fixtures } from '../../internal/test/fixture.js';
import { clickOnElement } from '../../internal/test/pointer-utilities.js';
import type WaDrawer from './drawer.js';

describe('<wa-drawer>', () => {
  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      it('should be visible with the open attribute', async () => {
        const el = await fixture<WaDrawer>(html`
          <wa-drawer open>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</wa-drawer>
        `);

        expect(getComputedStyle(el).display).to.not.equal('none');
      });

      it('should not be visible without the open attribute', async () => {
        const el = await fixture<WaDrawer>(html`
          <wa-drawer>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</wa-drawer>
        `);

        expect(getComputedStyle(el).display).to.equal('none');
      });

      it('should emit wa-show and wa-after-show when calling show()', async () => {
        const el = await fixture<WaDrawer>(html`
          <wa-drawer>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</wa-drawer>
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
        const el = await fixture<WaDrawer>(html`
          <wa-drawer open>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</wa-drawer>
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
        const el = await fixture<WaDrawer>(html`
          <wa-drawer>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</wa-drawer>
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
        const el = await fixture<WaDrawer>(html`
          <wa-drawer open>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</wa-drawer>
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
        const el = await fixture<WaDrawer>(html`
          <wa-drawer open>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</wa-drawer>
        `);

        el.addEventListener('wa-hide', event => {
          event.preventDefault();
        });
        await sendKeys({ press: 'Escape' });

        expect(el.open).to.be.true;
      });

      it('should allow initial focus to be set', async () => {
        const el = await fixture<WaDrawer>(html` <wa-drawer><wa-input autofocus></wa-input></wa-drawer> `);
        const input = el.querySelector('wa-input')!;

        el.open = true;
        await aTimeout(250);

        expect(document.activeElement).to.equal(input);
      });

      it('should close when pressing Escape', async () => {
        const el = await fixture<WaDrawer>(html` <wa-drawer open></wa-drawer> `);
        const hideHandler = sinon.spy();

        el.addEventListener('wa-after-hide', hideHandler);

        await clickOnElement(el); // Chromium wants the page to be clicked
        await sendKeys({ press: 'Escape' });
        await waitUntil(() => hideHandler.calledOnce);

        expect(el.open).to.be.false;
      });
    });
  }
});
