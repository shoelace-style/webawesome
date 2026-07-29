import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit';

async function loadNativeStyles() {
  const existing = document.querySelector<HTMLLinkElement>('link[data-test-native-styles]');
  if (existing) return;

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = '/dist/styles/native.css';
  link.dataset.testNativeStyles = '';
  document.head.append(link);

  await new Promise<void>((resolve, reject) => {
    link.addEventListener('load', () => resolve(), { once: true });
    link.addEventListener('error', () => reject(new Error('Failed to load native styles')), { once: true });
  });
}

function resolvedColor(el: HTMLElement, value: string) {
  el.style.color = value;
  return getComputedStyle(el).color;
}

describe('native styles', () => {
  before(async () => {
    await loadNativeStyles();
  });

  it('should apply inverted neutral colors to native buttons inside wa-invert', async () => {
    const el = await fixture<HTMLElement>(html`
      <div class="wa-invert">
        <span data-token></span>
        <button class="wa-filled">Button</button>
      </div>
    `);
    const token = el.querySelector<HTMLElement>('[data-token]')!;
    const button = el.querySelector('button')!;

    expect(getComputedStyle(button).backgroundColor).to.equal(
      resolvedColor(token, 'var(--wa-color-neutral-fill-normal)'),
    );
  });

  it('should apply inverted neutral colors to native buttons with wa-invert', async () => {
    const el = await fixture<HTMLElement>(html`
      <div>
        <span class="wa-invert" data-token></span>
        <button class="wa-invert wa-filled">Button</button>
      </div>
    `);
    const token = el.querySelector<HTMLElement>('[data-token]')!;
    const button = el.querySelector('button')!;

    expect(getComputedStyle(button).backgroundColor).to.equal(
      resolvedColor(token, 'var(--wa-color-neutral-fill-normal)'),
    );
  });
});
