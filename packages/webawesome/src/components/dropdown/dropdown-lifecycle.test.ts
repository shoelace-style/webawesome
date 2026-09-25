import { expect, oneEvent } from '@open-wc/testing';
import { html } from 'lit';
import sinon from 'sinon';
import { clientFixture } from '../../internal/test/fixture.js';
import type WaPopup from '../popup/popup.js';
import type WaDropdown from './dropdown.js';

async function createDropdown() {
  const host = await clientFixture<HTMLDivElement>(html`
    <div>
      <wa-dropdown style="--show-duration: 1s; --hide-duration: 1s">
        <button slot="trigger">Actions</button>
        <wa-dropdown-item>First</wa-dropdown-item>
        <wa-dropdown-item>
          More
          <wa-dropdown-item slot="submenu">Nested</wa-dropdown-item>
        </wa-dropdown-item>
      </wa-dropdown>
      <button id="outside">Outside</button>
    </div>
  `);
  const dropdown = host.querySelector<WaDropdown>('wa-dropdown')!;
  await dropdown.updateComplete;
  await Promise.all([...dropdown.querySelectorAll('wa-dropdown-item')].map(item => item.updateComplete));
  const menu = dropdown.shadowRoot!.querySelector<HTMLElement>('#menu')!;
  const popup = dropdown.shadowRoot!.querySelector<WaPopup>('wa-popup')!;
  return { host, dropdown, menu, popup, outside: host.querySelector<HTMLButtonElement>('#outside')! };
}

async function startAnimation(menu: HTMLElement, action: () => void) {
  const started = oneEvent(menu, 'animationstart');
  action();
  await new Promise(requestAnimationFrame);
  await started;
  const animation = menu.getAnimations()[0];
  // Keep the animation running so CSS removal can still cancel it in Chromium.
  animation.playbackRate = 0;
  await animation.ready;
  return animation;
}

async function finishTransition(dropdown: WaDropdown, menu: HTMLElement, open: boolean) {
  const completed = oneEvent(dropdown, open ? 'wa-after-show' : 'wa-after-hide');
  const animation = await startAnimation(menu, () => (dropdown.open = open));
  animation.playbackRate = 1;
  animation.finish();
  await new Promise(requestAnimationFrame);
  await completed;
}

describe('<wa-dropdown> interrupted transitions', () => {
  it('does not complete or refocus an opening that was closed', async () => {
    const { dropdown, menu, outside } = await createDropdown();
    const afterShow = sinon.spy();
    dropdown.addEventListener('wa-after-show', afterShow);
    await startAnimation(menu, () => (dropdown.open = true));
    outside.focus();
    await finishTransition(dropdown, menu, false);
    expect(afterShow).not.to.have.been.called;
    expect(document.activeElement === outside).to.be.true;
  });

  it('restores dismissal when reopened during its hide animation', async () => {
    const { dropdown, menu, popup, outside } = await createDropdown();
    await finishTransition(dropdown, menu, true);
    await startAnimation(menu, () => (dropdown.open = false));
    const afterHide = sinon.spy();
    dropdown.addEventListener('wa-after-hide', afterHide);
    await finishTransition(dropdown, menu, true);
    expect(afterHide).not.to.have.been.called;
    expect(popup.active).to.be.true;
    const hidden = oneEvent(dropdown, 'wa-after-hide');
    const animation = await startAnimation(menu, () =>
      outside.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true })),
    );
    animation.playbackRate = 1;
    animation.finish();
    await new Promise(requestAnimationFrame);
    await hidden;
    expect(dropdown.open).to.be.false;
    expect(popup.active).to.be.false;
  });

  it('reopens and registers an open dropdown after reconnecting', async () => {
    const { host, dropdown, menu, popup } = await createDropdown();
    await startAnimation(menu, () => (dropdown.open = true));
    dropdown.remove();
    expect(popup.active).to.be.false;
    const shown = oneEvent(dropdown, 'wa-after-show');
    const animation = await startAnimation(menu, () => host.prepend(dropdown));
    animation.playbackRate = 1;
    animation.finish();
    await new Promise(requestAnimationFrame);
    await shown;
    dropdown.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await dropdown.updateComplete;
    expect(dropdown.open).to.be.false;
  });

  it('keeps submenus open when hiding is canceled', async () => {
    const { dropdown, menu } = await createDropdown();
    await finishTransition(dropdown, menu, true);
    const parent = dropdown.querySelectorAll('wa-dropdown-item')[1];
    parent.submenuOpen = true;
    await parent.updateComplete;
    dropdown.addEventListener('wa-hide', event => event.preventDefault(), { once: true });
    dropdown.open = false;
    await dropdown.updateComplete;
    expect(dropdown.open).to.be.true;
    expect(parent.submenuOpen).to.be.true;
  });
});
