import { expect, oneEvent } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit';
import sinon from 'sinon';
import { fixtures } from '../../internal/test/fixture.js';
import { clickOnElement } from '../../internal/test/pointer-utilities.js';
import type WaSelect from './select.js';

function pauseNextAnimation(el: Element) {
  return new Promise<Animation>(resolve => {
    el.addEventListener(
      'animationstart',
      () => {
        const animation = el.getAnimations()[0];
        animation.pause();
        resolve(animation);
      },
      { once: true },
    );
  });
}

describe('<wa-select> lifecycle', () => {
  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      it('keeps an already open listbox open when show is called again', async () => {
        const el = await fixture<WaSelect>(html`
          <wa-select label="Choice"><wa-option value="one">One</wa-option></wa-select>
        `);
        const afterShow = sinon.spy();
        el.addEventListener('wa-after-show', afterShow);

        await el.show();
        await el.show();

        expect(el.open).to.be.true;
        expect(el.querySelector('wa-option')!.checkVisibility()).to.be.true;
        expect(afterShow).to.have.been.calledOnce;
      });

      for (const eventName of ['wa-show', 'wa-hide']) {
        it(`settles the method without changing visibility when ${eventName} is canceled`, async () => {
          const el = await fixture<WaSelect>(html`
            <wa-select label="Choice"><wa-option value="one">One</wa-option></wa-select>
          `);
          const wasOpen = eventName === 'wa-hide';
          if (wasOpen) await el.show();
          const completed = sinon.spy();
          el.addEventListener(wasOpen ? 'wa-after-hide' : 'wa-after-show', completed);
          el.addEventListener(eventName, event => event.preventDefault(), { once: true });

          await (wasOpen ? el.hide() : el.show());

          expect(el.open).to.equal(wasOpen);
          expect(el.popup.active).to.equal(wasOpen);
          expect(completed).not.to.have.been.called;
        });
      }

      it('keeps reopened options selectable after interrupting a hide animation', async () => {
        const el = await fixture<WaSelect>(html`
          <wa-select label="Choice" style="--hide-duration: 1s">
            <wa-option value="one">One</wa-option>
          </wa-select>
        `);
        await el.show();
        const afterHide = sinon.spy();
        el.addEventListener('wa-after-hide', afterHide);
        const animationStarted = pauseNextAnimation(el.popup.popup);
        const hiding = el.hide();
        const animation = await animationStarted;

        const showing = el.show();
        animation.finish();
        await Promise.all([hiding, showing]);

        expect(afterHide).not.to.have.been.called;
        expect(el.open).to.be.true;
        expect(el.querySelector('wa-option')!.checkVisibility()).to.be.true;
        const changed = oneEvent(el, 'change');
        await clickOnElement(el.querySelector('wa-option')!);
        await changed;
        expect(el.value).to.equal('one');
      });

      it('settles an interrupted opening without publishing its completion after reconnect', async () => {
        const el = await fixture<WaSelect>(html`
          <wa-select label="Choice" style="--show-duration: 1s">
            <wa-option value="one">One</wa-option>
          </wa-select>
        `);
        const parent = el.parentElement!;
        const afterShow = sinon.spy();
        el.addEventListener('wa-after-show', afterShow);
        const animationStarted = pauseNextAnimation(el.popup.popup);
        const showing = el.show();
        await animationStarted;

        el.remove();
        await showing;
        expect(afterShow).not.to.have.been.called;
        parent.append(el);
        el.style.setProperty('--show-duration', '0s');
        await el.show();

        expect(afterShow).to.have.been.calledOnce;
        expect(el.querySelector('wa-option')!.checkVisibility()).to.be.true;
      });

      for (const duringOpening of [false, true]) {
        it(`preserves a canceled hide when disabled ${duringOpening ? 'during' : 'after'} opening`, async () => {
          const el = await fixture<WaSelect>(html`
            <wa-select label="Choice"><wa-option value="one">One</wa-option></wa-select>
          `);
          const afterShow = sinon.spy();
          el.addEventListener('wa-after-show', afterShow);
          if (duringOpening) el.style.setProperty('--show-duration', '1s');
          const animationStarted = duringOpening ? pauseNextAnimation(el.popup.popup) : undefined;
          const showing = el.show();
          const animation = animationStarted ? await animationStarted : undefined;
          if (!duringOpening) await showing;
          const hiding = oneEvent(el, 'wa-hide');
          el.addEventListener('wa-hide', event => event.preventDefault());

          el.disabled = true;
          await hiding;
          await el.updateComplete;
          animation?.finish();
          await showing;
          await el.popup.updateComplete;

          expect(el.open).to.be.true;
          expect(el.querySelector('wa-option')!.checkVisibility()).to.be.true;
          expect(afterShow).to.have.been.calledOnce;
        });
      }

      it('ignores keyboard selection while a disabled listbox is kept open', async () => {
        const host = await fixture<HTMLDivElement>(html`
          <div>
            <wa-select label="Choice"><wa-option value="one">One</wa-option></wa-select>
            <button>Other control</button>
          </div>
        `);
        const el = host.querySelector('wa-select')!;
        const changed = sinon.spy();
        el.addEventListener('change', changed);
        el.addEventListener('wa-hide', event => event.preventDefault());
        await el.show();

        el.disabled = true;
        await el.updateComplete;
        host.querySelector('button')!.focus();
        await sendKeys({ press: 'Enter' });
        await el.updateComplete;

        expect(el.value).to.equal(null);
        expect(changed).not.to.have.been.called;
      });

      it('closes an open listbox when the control is disabled', async () => {
        const el = await fixture<WaSelect>(html`
          <wa-select label="Choice"><wa-option value="one">One</wa-option></wa-select>
        `);
        await el.show();
        const hidden = oneEvent(el, 'wa-after-hide');

        el.disabled = true;
        await hidden;
        await el.popup.updateComplete;

        expect(el.open).to.be.false;
        expect(el.querySelector('wa-option')!.checkVisibility()).to.be.false;
      });
    });
  }

  it('shows selectable options immediately after connection before the first render', async () => {
    const parent = await fixtures[0]<HTMLDivElement>(html`<div></div>`);
    const el = document.createElement('wa-select');
    el.label = 'Choice';
    el.innerHTML = '<wa-option value="one">One</wa-option>';
    parent.append(el);

    await el.show();

    expect(el.querySelector('wa-option')!.checkVisibility()).to.be.true;
    const changed = oneEvent(el, 'change');
    await clickOnElement(el.querySelector('wa-option')!);
    await changed;
    expect(el.value).to.equal('one');
  });
});
