import { expect, fixture, nextFrame } from '@open-wc/testing';
import { html } from 'lit';
import type WaInput from '../components/input/input.js';
import { autofocus } from './autofocus.js';

describe('autofocus', () => {
  beforeEach(() => {
    (document.activeElement as HTMLElement | null)?.blur();
  });

  afterEach(() => {
    history.replaceState(null, '', location.pathname + location.search);
  });

  it('should focus the element when nothing has focus', async () => {
    const el = await fixture<WaInput>(html`<wa-input></wa-input>`);

    await autofocus(el);

    expect(document.activeElement).to.equal(el);
  });

  it('should not take focus from another element', async () => {
    const el = await fixture<HTMLDivElement>(html`<div><input /><wa-input></wa-input></div>`);
    const other = el.querySelector('input')!;
    other.focus();

    await autofocus(el.querySelector('wa-input')!);

    expect(document.activeElement).to.equal(other);
  });

  it('should take focus from an ancestor', async () => {
    const el = await fixture<HTMLDivElement>(html`<div tabindex="-1"><wa-input></wa-input></div>`);
    const input = el.querySelector('wa-input')!;
    el.focus();

    await autofocus(input);

    expect(document.activeElement).to.equal(input);
  });

  it('should not focus the element when the URL fragment points to an element', async () => {
    const el = await fixture<HTMLDivElement>(
      html`<div>
        <wa-input></wa-input>
        <p id="autofocus-target"></p>
      </div>`,
    );
    location.hash = 'autofocus-target';

    await autofocus(el.querySelector('wa-input')!);

    expect(document.activeElement).to.equal(document.body);
  });

  it('should wait for an ancestor to be defined before focusing', async () => {
    const el = await fixture<HTMLElement>(
      html`<wa-autofocus-test-ancestor><wa-input></wa-input></wa-autofocus-test-ancestor>`,
    );
    const input = el.querySelector('wa-input')!;
    let receivedFocus = false;
    input.addEventListener('focusin', () => (receivedFocus = true));

    const done = autofocus(input);
    await nextFrame();
    customElements.define(
      'wa-autofocus-test-ancestor',
      class extends HTMLElement {
        connectedCallback() {
          this.hidden = true;
        }
      },
    );
    await done;

    expect(receivedFocus).to.be.false;
  });
});
