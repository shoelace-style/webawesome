import { expect, waitUntil } from '@open-wc/testing';
import { html } from 'lit';
import sinon from 'sinon';
import { fixtures } from '../../internal/test/fixture.js';
import type WaTooltip from './tooltip.js';

describe('<wa-tooltip>', () => {
  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      it('should be visible with the open attribute', async () => {
        const el = await fixture<WaTooltip>(html`
          <div>
            <wa-tooltip open for="wa-button">This is a tooltip</wa-tooltip>
            <wa-button id="wa-button">Hover Me</wa-button>
          </div>
        `);
        const tooltip = el.querySelector('wa-tooltip')!;
        const body = tooltip.shadowRoot!.querySelector<HTMLElement>('[part~="body"]')!;

        expect(body.hidden).to.be.false;
      });

      it('should not be visible without the open attribute', async () => {
        const el = await fixture<WaTooltip>(html`
          <div>
            <wa-tooltip for="wa-button">This is a tooltip</wa-tooltip>
            <wa-button id="wa-button">Hover Me</wa-button>
          </div>
        `);
        const tooltip = el.querySelector('wa-tooltip')!;
        const body = tooltip.shadowRoot!.querySelector<HTMLElement>('[part~="body"]')!;

        expect(body.hidden).to.be.true;
      });

      it('should emit wa-show and wa-after-show when calling show()', async () => {
        const el = await fixture<WaTooltip>(html`
          <div>
            <wa-tooltip for="wa-button">This is a tooltip</wa-tooltip>
            <wa-button id="wa-button">Hover Me</wa-button>
          </div>
        `);
        const tooltip = el.querySelector('wa-tooltip')!;
        const body = tooltip.shadowRoot!.querySelector<HTMLElement>('[part~="body"]')!;
        const showHandler = sinon.spy();
        const afterShowHandler = sinon.spy();

        tooltip.addEventListener('wa-show', showHandler);
        tooltip.addEventListener('wa-after-show', afterShowHandler);
        tooltip.show();

        await waitUntil(() => showHandler.calledOnce);
        await waitUntil(() => afterShowHandler.calledOnce);

        expect(showHandler).to.have.been.calledOnce;
        expect(afterShowHandler).to.have.been.calledOnce;
        expect(body.hidden).to.be.false;
      });

      it('should emit wa-hide and wa-after-hide when calling hide()', async () => {
        const el = await fixture<WaTooltip>(html`
          <div>
            <wa-tooltip for="wa-button" open>This is a tooltip</wa-tooltip>
            <wa-button id="wa-button">Hover Me</wa-button>
          </div>
        `);
        const tooltip = el.querySelector('wa-tooltip')!;
        const body = tooltip.shadowRoot!.querySelector<HTMLElement>('[part~="body"]')!;
        const hideHandler = sinon.spy();
        const afterHideHandler = sinon.spy();

        tooltip.addEventListener('wa-hide', hideHandler);
        tooltip.addEventListener('wa-after-hide', afterHideHandler);

        await tooltip.updateComplete;
        tooltip.hide();

        await waitUntil(() => hideHandler.calledOnce);
        await waitUntil(() => afterHideHandler.calledOnce);

        expect(hideHandler).to.have.been.calledOnce;
        expect(afterHideHandler).to.have.been.calledOnce;
        expect(body.hidden).to.be.true;
      });

      it('should emit wa-show and wa-after-show when setting open = true', async () => {
        const el = await fixture<WaTooltip>(html`
          <div>
            <wa-tooltip for="wa-button">This is a tooltip</wa-tooltip>
            <wa-button id="wa-button">Hover Me</wa-button>
          </div>
        `);
        const tooltip = el.querySelector('wa-tooltip')!;
        const body = tooltip.shadowRoot!.querySelector<HTMLElement>('[part~="body"]')!;
        const showHandler = sinon.spy();
        const afterShowHandler = sinon.spy();

        tooltip.addEventListener('wa-show', showHandler);
        tooltip.addEventListener('wa-after-show', afterShowHandler);
        tooltip.open = true;

        await waitUntil(() => showHandler.calledOnce);
        await waitUntil(() => afterShowHandler.calledOnce);

        expect(showHandler).to.have.been.calledOnce;
        expect(afterShowHandler).to.have.been.calledOnce;
        expect(body.hidden).to.be.false;
      });

      it('should emit wa-hide and wa-after-hide when setting open = false', async () => {
        const el = await fixture<WaTooltip>(html`
          <div>
            <wa-tooltip for="wa-button" open>This is a tooltip</wa-tooltip>
            <wa-button id="wa-button">Hover Me</wa-button>
          </div>
        `);
        const tooltip = el.querySelector('wa-tooltip')!;
        const body = tooltip.shadowRoot!.querySelector<HTMLElement>('[part~="body"]')!;
        const hideHandler = sinon.spy();
        const afterHideHandler = sinon.spy();

        tooltip.addEventListener('wa-hide', hideHandler);
        tooltip.addEventListener('wa-after-hide', afterHideHandler);
        tooltip.open = false;

        await waitUntil(() => hideHandler.calledOnce);
        await waitUntil(() => afterHideHandler.calledOnce);

        expect(hideHandler).to.have.been.calledOnce;
        expect(afterHideHandler).to.have.been.calledOnce;
        expect(body.hidden).to.be.true;
      });

      it('should hide the tooltip when tooltip is visible and disabled becomes true', async () => {
        const el = await fixture<WaTooltip>(html`
          <div>
            <wa-tooltip for="wa-button" open>This is a tooltip</wa-tooltip>
            <wa-button id="wa-button">Hover Me</wa-button>
          </div>
        `);
        const tooltip = el.querySelector('wa-tooltip')!;
        const body = tooltip.shadowRoot!.querySelector<HTMLElement>('[part~="body"]')!;
        const hideHandler = sinon.spy();
        const afterHideHandler = sinon.spy();

        tooltip.addEventListener('wa-hide', hideHandler);
        tooltip.addEventListener('wa-after-hide', afterHideHandler);

        await tooltip.updateComplete;
        tooltip.disabled = true;

        await waitUntil(() => hideHandler.calledOnce);
        await waitUntil(() => afterHideHandler.calledOnce);

        expect(hideHandler).to.have.been.calledOnce;
        expect(afterHideHandler).to.have.been.calledOnce;
        expect(body.hidden).to.be.true;
      });

      it('should show when open initially', async () => {
        const el = await fixture<WaTooltip>(html`
          <div>
            <wa-tooltip for="wa-button" open>This is a tooltip</wa-tooltip>
            <wa-button id="wa-button">Hover Me</wa-button>
          </div>
        `);
        const tooltip = el.querySelector('wa-tooltip')!;
        const body = tooltip.shadowRoot!.querySelector<HTMLElement>('[part~="body"]')!;
        await tooltip.updateComplete;

        expect(body.hidden).to.be.false;
      });

      it('should not accept user selection on the tooltip', async () => {
        const el = await fixture<WaTooltip>(html`
          <div>
            <wa-tooltip for="wa-button" open>This is a tooltip</wa-tooltip>
            <wa-button id="wa-button">Hover Me</wa-button>
          </div>
        `);
        const tooltip = el.querySelector('wa-tooltip')!;
        const tooltipBody = tooltip.shadowRoot!.querySelector('.body')!;
        const userSelect = getComputedStyle(tooltipBody).userSelect || getComputedStyle(tooltipBody).webkitUserSelect;

        expect(userSelect).to.equal('none');
      });
    });
  }
});
