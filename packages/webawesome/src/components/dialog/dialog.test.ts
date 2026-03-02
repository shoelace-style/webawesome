import { aTimeout, expect, waitUntil } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit';
import sinon from 'sinon';
import { fixtures } from '../../internal/test/fixture.js';
import { clickOnElement } from '../../internal/test/pointer-utilities.js';
import type WaPopover from '../popover/popover.js';
import type WaDialog from './dialog.js';

describe('<wa-dialog>', () => {
  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      it('should be visible with the open attribute', async () => {
        const el = await fixture<WaDialog>(html` <wa-dialog open>This is a dialog for testing purposes.</wa-dialog> `);

        expect(getComputedStyle(el).display).to.not.equal('none');
      });

      it('should not be visible without the open attribute', async () => {
        const el = await fixture<WaDialog>(html` <wa-dialog>This is a dialog for testing purposes.</wa-dialog> `);

        expect(getComputedStyle(el).display).to.equal('none');
      });

      it('should emit wa-show and wa-after-show when calling show()', async () => {
        const el = await fixture<WaDialog>(html` <wa-dialog>This is a dialog for testing purposes.</wa-dialog> `);
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
        const el = await fixture<WaDialog>(html` <wa-dialog open>This is a dialog for testing purposes.</wa-dialog> `);
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
        const el = await fixture<WaDialog>(html` <wa-dialog>This is a dialog for testing purposes.</wa-dialog> `);
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
        const el = await fixture<WaDialog>(html` <wa-dialog open>This is a dialog for testing purposes.</wa-dialog> `);
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
        const el = await fixture<WaDialog>(html` <wa-dialog open>This is a dialog for testing purposes.</wa-dialog> `);

        const spy = sinon.spy();
        el.addEventListener('wa-hide', event => {
          event.preventDefault();
          spy();
        });
        await clickOnElement(el); // Chromium wants the page to have been clicked prior to closing the dialog.
        await sendKeys({ press: 'Escape' });
        await waitUntil(() => spy.calledOnce);

        expect(el.open).to.be.true;
      });

      it('should not close when bubbled cancel event originates from within the drawer', async () => {
        const el = await fixture<WaDialog>(html` <wa-dialog open><input type="file" /></wa-dialog> `);
        const input = el.querySelector('input')!;

        await clickOnElement(el); // Chromium wants the page to have been clicked prior to closing the dialog.
        const cancelEvent = new Event('cancel', { bubbles: true });
        input.dispatchEvent(cancelEvent);

        await aTimeout(250);

        expect(el.open).to.be.true;
      });

      it('should allow initial focus to be set', async () => {
        const el = await fixture<WaDialog>(html` <wa-dialog><wa-input autofocus></wa-input></wa-dialog> `);
        const input = el.querySelector('wa-input')!;

        el.open = true;
        await aTimeout(250);
        expect(document.activeElement).to.equal(input);
      });

      it('should close when pressing Escape', async () => {
        const hideHandler = sinon.spy();

        const el = await fixture<WaDialog>(html` <wa-dialog open></wa-dialog> `);
        el.addEventListener('wa-after-hide', hideHandler);

        await clickOnElement(el); // Chromium wants the page to have been clicked prior to closing the dialog.
        await sendKeys({ press: 'Escape' });
        await waitUntil(() => hideHandler.calledOnce);

        expect(el.open).to.be.false;
      });
    });
  }

  describe('dismissible stack', () => {
    // showModal() can cause WTR timeouts in some browsers
    it.skip('should only close the popover when pressing Escape with a dialog open underneath', async () => {
      const fixture = fixtures[0];
      const el = await fixture<HTMLDivElement>(html`
        <div>
          <wa-dialog id="test-dialog" label="Test Dialog" open>
            <wa-button id="popover-anchor">Open Popover</wa-button>
            <wa-popover id="test-popover" for="popover-anchor">
              <div style="padding: 1rem;">Popover content</div>
            </wa-popover>
          </wa-dialog>
        </div>
      `);

      const dialog = el.querySelector<WaDialog>('#test-dialog')!;
      const popover = el.querySelector<WaPopover>('#test-popover')!;

      await aTimeout(200);

      popover.open = true;
      await waitUntil(() => popover.open);
      await aTimeout(200);

      await sendKeys({ press: 'Escape' });
      await aTimeout(200);

      expect(popover.open).to.be.false;
      expect(dialog.open).to.be.true;
    });
  });
});
