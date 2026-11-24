import { expect } from '@open-wc/testing';
import { lockBodyScrolling, unlockBodyScrolling } from './scroll.js';

describe('lockBodyScrolling()', () => {
  let link: HTMLLinkElement;

  before(async () => {
    link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/dist/styles/utilities/scroll-lock.css';
    const loaded = new Promise((resolve, reject) => {
      link.addEventListener('load', resolve, { once: true });
      link.addEventListener('error', () => reject(new Error(`Couldn't load ${link.href}`)), { once: true });
    });
    document.head.append(link);
    await loaded;
  });

  after(() => link.remove());

  afterEach(() => {
    unlockBodyScrolling(document.body);
    document.documentElement.style.removeProperty('scrollbar-gutter');
    document.documentElement.style.removeProperty('scrollbar-width');
    document.documentElement.style.removeProperty('--wa-scroll-lock-gutter');
  });

  it("should keep the author's scrollbar-gutter when the scrollbar has no width", () => {
    const root = document.documentElement;
    root.style.setProperty('scrollbar-gutter', 'stable');
    root.style.setProperty('scrollbar-width', 'none');

    lockBodyScrolling(document.body);

    expect(root.classList.contains('wa-scroll-lock')).to.be.true;
    expect(getComputedStyle(root).scrollbarGutter).to.equal('stable');
  });
});
