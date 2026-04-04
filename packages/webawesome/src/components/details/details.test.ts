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

      it('should reflect the name property', async () => {
        const el = await fixture<WaDetails>(html`<wa-details></wa-details>`);
        el.name = 'test';
        await el.updateComplete;
        expect(el.getAttribute('name')).to.equal('test');
      });

      it('should be visible with the open attribute', async () => {
        const el = await fixture<WaDetails>(html`
          <wa-details open>
            This is some content inside the details component for testing purposes. It contains enough text to verify
            that the expand and collapse behavior works correctly.
          </wa-details>
        `);
        const body = el.shadowRoot!.querySelector<HTMLElement>('.body')!;

        expect(parseInt(getComputedStyle(body).height)).to.be.greaterThan(0);
      });

      it('should not be visible without the open attribute', async () => {
        const el = await fixture<WaDetails>(html`
          <wa-details summary="click me">
            This is some content inside the details component for testing purposes. It contains enough text to verify
            that the expand and collapse behavior works correctly.
          </wa-details>
        `);
        const body = el.shadowRoot!.querySelector<HTMLElement>('.body')!;
        expect(parseInt(getComputedStyle(body).height)).to.equal(0);
      });

      it('should emit wa-show and wa-after-show when calling show()', async () => {
        const el = await fixture<WaDetails>(html`
          <wa-details>
            This is some content inside the details component for testing purposes. It contains enough text to verify
            that the expand and collapse behavior works correctly.
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
            This is some content inside the details component for testing purposes. It contains enough text to verify
            that the expand and collapse behavior works correctly.
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
            This is some content inside the details component for testing purposes. It contains enough text to verify
            that the expand and collapse behavior works correctly.
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
            This is some content inside the details component for testing purposes. It contains enough text to verify
            that the expand and collapse behavior works correctly.
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
            This is some content inside the details component for testing purposes. It contains enough text to verify
            that the expand and collapse behavior works correctly.
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
            This is some content inside the details component for testing purposes. It contains enough text to verify
            that the expand and collapse behavior works correctly.
          </wa-details>
        `);
        const hideHandler = sinon.spy((event: WaHideEvent) => event.preventDefault());

        el.addEventListener('wa-hide', hideHandler);
        el.open = false;

        await waitUntil(() => hideHandler.calledOnce);

        expect(hideHandler).to.have.been.calledOnce;
        expect(el.open).to.be.true;
      });

      describe('when open is toggled rapidly', () => {
        it('should keep body in sync when hiding is interrupted by showing', async () => {
          const el = await fixture<WaDetails>(html`
            <wa-details open summary="Test">
              This is some content inside the details component for testing purposes.
            </wa-details>
          `);
          const body = el.shadowRoot!.querySelector<HTMLElement>('.body')!;

          // Close, then re-open during the close animation
          el.open = false;
          await new Promise(resolve => setTimeout(resolve, 20));
          el.open = true;

          // Wait for animations to settle
          await new Promise(resolve => setTimeout(resolve, 300));

          // Should be open with body visible
          expect(el.open).to.be.true;
          expect(body.style.height).to.equal('auto');
        });

        it('should keep body in sync when showing is interrupted by hiding', async () => {
          const el = await fixture<WaDetails>(html`
            <wa-details summary="Test">
              This is some content inside the details component for testing purposes.
            </wa-details>
          `);
          const body = el.shadowRoot!.querySelector<HTMLElement>('.body')!;

          // Open, then close during the open animation
          el.open = true;
          await new Promise(resolve => setTimeout(resolve, 20));
          el.open = false;

          // Wait for animations to settle
          await new Promise(resolve => setTimeout(resolve, 300));

          // Should be closed
          expect(el.open).to.be.false;
          expect(parseInt(getComputedStyle(body).height)).to.equal(0);
        });

        it('should only fire the final wa-after-show event when hide is interrupted by show', async () => {
          const el = await fixture<WaDetails>(html`
            <wa-details open summary="Test">
              This is some content inside the details component for testing purposes.
            </wa-details>
          `);
          const afterShowSpy = sinon.spy();
          const afterHideSpy = sinon.spy();
          el.addEventListener('wa-after-show', afterShowSpy);
          el.addEventListener('wa-after-hide', afterHideSpy);

          // Close, then re-open during the close animation
          el.open = false;
          await new Promise(resolve => setTimeout(resolve, 20));
          el.open = true;

          // Wait for animations to settle
          await new Promise(resolve => setTimeout(resolve, 300));

          // Only the final show's after-event should fire
          expect(afterShowSpy.callCount).to.equal(1);
          expect(afterHideSpy.callCount).to.equal(0);
        });
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

        // height + 32 (padding probably?)
        expect(firstBody.clientHeight).to.equal(232);
        expect(secondBody.clientHeight).to.equal(432);
      });
    });
  }
});
