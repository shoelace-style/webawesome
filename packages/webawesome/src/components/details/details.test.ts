// cspell:dictionaries lorem-ipsum
import { expect, waitUntil } from '@open-wc/testing';
import { html } from 'lit';
import sinon from 'sinon';
import type { WaHideEvent } from '../../events/hide.js';
import type { WaShowEvent } from '../../events/show.js';
import { fixtures } from '../../internal/test/fixture.js';
import type WaDetails from './details.js';

describe('<wa-details>', () => {
  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      describe('accessibility', () => {
        it('should be accessible when closed', async () => {
          const details = await fixture<WaDetails>(html`<wa-details summary="Test"> Test text </wa-details>`);

          await expect(details).to.be.accessible();
        });

        it('should be accessible when open', async () => {
          const details = await fixture<WaDetails>(html`<wa-details open summary="Test">Test text</wa-details>`);

          await expect(details).to.be.accessible();
        });
      });

      it('should be visible with the open attribute', async () => {
        const el = await fixture<WaDetails>(html`
          <wa-details open>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </wa-details>
        `);
        const body = el.shadowRoot!.querySelector<HTMLElement>('.body')!;

        expect(parseInt(getComputedStyle(body).height)).to.be.greaterThan(0);
      });

      it('should not be visible without the open attribute', async () => {
        const el = await fixture<WaDetails>(html`
          <wa-details summary="click me">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </wa-details>
        `);
        const body = el.shadowRoot!.querySelector<HTMLElement>('.body')!;
        expect(parseInt(getComputedStyle(body).height)).to.equal(0);
      });

      it('should emit wa-show and wa-after-show when calling show()', async () => {
        const el = await fixture<WaDetails>(html`
          <wa-details>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </wa-details>
        `);
        const showHandler = sinon.spy();
        const afterShowHandler = sinon.spy();

        el.addEventListener('wa-show', showHandler);
        el.addEventListener('wa-after-show', afterShowHandler);
        el.show();

        await waitUntil(() => showHandler.calledOnce);
        await waitUntil(() => afterShowHandler.calledOnce);

        expect(showHandler).to.have.been.calledOnce;
        expect(afterShowHandler).to.have.been.calledOnce;
      });

      it('should emit wa-hide and wa-after-hide when calling hide()', async () => {
        const el = await fixture<WaDetails>(html`
          <wa-details open>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </wa-details>
        `);
        const hideHandler = sinon.spy();
        const afterHideHandler = sinon.spy();

        el.addEventListener('wa-hide', hideHandler);
        el.addEventListener('wa-after-hide', afterHideHandler);
        el.hide();

        await waitUntil(() => hideHandler.calledOnce);
        await waitUntil(() => afterHideHandler.calledOnce);

        expect(hideHandler).to.have.been.calledOnce;
        expect(afterHideHandler).to.have.been.calledOnce;
      });

      it('should emit wa-show and wa-after-show when setting open = true', async () => {
        const el = await fixture<WaDetails>(html`
          <wa-details>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </wa-details>
        `);
        const body = el.shadowRoot!.querySelector<HTMLElement>('.body')!;
        const showHandler = sinon.spy();
        const afterShowHandler = sinon.spy();

        el.addEventListener('wa-show', showHandler);
        el.addEventListener('wa-after-show', afterShowHandler);
        el.open = true;

        await waitUntil(() => showHandler.calledOnce);
        await waitUntil(() => afterShowHandler.calledOnce);

        expect(showHandler).to.have.been.calledOnce;
        expect(afterShowHandler).to.have.been.calledOnce;
        expect(body.hidden).to.be.false;
      });

      it('should emit wa-hide and wa-after-hide when setting open = false', async () => {
        const el = await fixture<WaDetails>(html`
          <wa-details open>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </wa-details>
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
      });

      it('should not open when preventing wa-show', async () => {
        const el = await fixture<WaDetails>(html`
          <wa-details>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </wa-details>
        `);
        const showHandler = sinon.spy((event: WaShowEvent) => event.preventDefault());

        el.addEventListener('wa-show', showHandler);
        el.open = true;

        await waitUntil(() => showHandler.calledOnce);

        expect(showHandler).to.have.been.calledOnce;
        expect(el.open).to.be.false;
      });

      it('should not close when preventing wa-hide', async () => {
        const el = await fixture<WaDetails>(html`
          <wa-details open>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </wa-details>
        `);
        const hideHandler = sinon.spy((event: WaHideEvent) => event.preventDefault());

        el.addEventListener('wa-hide', hideHandler);
        el.open = false;

        await waitUntil(() => hideHandler.calledOnce);

        expect(hideHandler).to.have.been.calledOnce;
        expect(el.open).to.be.true;
      });

      it('should be the correct size after opening more than one instance', async () => {
        const el = await fixture<WaDetails>(html`
          <div>
            <wa-details>
              <div style="height: 200px;"></div>
            </wa-details>
            <wa-details>
              <div style="height: 400px;"></div>
            </wa-details>
          </div>
        `);
        const first = el.querySelectorAll('wa-details')[0];
        const second = el.querySelectorAll('wa-details')[1];
        const firstBody = first.shadowRoot!.querySelector('.body')!;
        const secondBody = second.shadowRoot!.querySelector('.body')!;

        await first.show();
        await second.show();

        expect(firstBody.clientHeight).to.equal(200);
        expect(secondBody.clientHeight).to.equal(400);
      });
    });
  }
});
