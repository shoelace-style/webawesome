import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit';
import { animateWithClass } from './animate.js';

const nextFrame = () => new Promise<void>(resolve => requestAnimationFrame(() => resolve()));

describe('animateWithClass', () => {
  beforeEach(async () => {
    await fixture(html`
      <style>
        @keyframes test-fade {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes test-move {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(1px);
          }
        }
        .test-animate {
          animation: test-fade 60s;
        }
        .test-delayed {
          animation: test-fade 60s 60s;
        }
        .test-multiple {
          animation:
            test-fade 60s,
            test-move 60s;
        }
        .test-infinite {
          animation: test-fade 60s infinite;
        }
        .test-zero {
          animation: test-fade 0s;
        }
      </style>
    `);
  });

  it('should settle every call for the same animation', async () => {
    const el = await fixture<HTMLElement>(html`<div></div>`);
    const first = animateWithClass(el, 'test-animate');
    const second = animateWithClass(el, 'test-animate');
    await nextFrame();
    const animation = el.getAnimations()[0];
    await animation.ready;
    animation.finish();
    await nextFrame();

    await Promise.all([first, second]);
    expect(el.classList.contains('test-animate')).to.be.false;
  });

  it('should settle when an animation is canceled before it starts', async () => {
    const el = await fixture<HTMLElement>(html`<div></div>`);
    const completion = animateWithClass(el, 'test-delayed');
    await nextFrame();
    const animation = el.getAnimations()[0];
    expect(animation.effect!.getComputedTiming().progress).to.equal(null);
    animation.cancel();

    await completion;
    expect(el.classList.contains('test-delayed')).to.be.false;
  });

  it('should not finish when a descendant animation ends', async () => {
    const el = await fixture<HTMLElement>(html`<div><span class="test-animate"></span></div>`);
    const child = el.firstElementChild!;
    const completion = animateWithClass(el, 'test-animate');
    await nextFrame();
    const animation = child.getAnimations()[0];
    await animation.ready;
    const childEnded = new Promise(resolve => child.addEventListener('animationend', resolve, { once: true }));
    animation.finish();
    await nextFrame();
    await childEnded;

    expect(el.classList.contains('test-animate')).to.be.true;
    el.getAnimations()[0].finish();
    await completion;
    expect(el.classList.contains('test-animate')).to.be.false;
  });

  it('should wait for every finite animation on the element', async () => {
    const el = await fixture<HTMLElement>(html`<div></div>`);
    const completion = animateWithClass(el, 'test-multiple');
    await nextFrame();
    const [first, second] = el.getAnimations();
    await Promise.all([first.ready, second.ready]);
    const firstEnded = new Promise(resolve => el.addEventListener('animationend', resolve, { once: true }));
    first.finish();
    await nextFrame();
    await firstEnded;

    expect(el.classList.contains('test-multiple')).to.be.true;
    second.finish();
    await completion;
    expect(el.classList.contains('test-multiple')).to.be.false;
  });

  it('should start a fresh animation when the same class is immediately reused', async () => {
    const el = await fixture<HTMLElement>(html`<div></div>`);
    const first = animateWithClass(el, 'test-animate');
    await nextFrame();
    const animation = el.getAnimations()[0];
    await animation.ready;
    animation.finish();
    await nextFrame();
    await first;

    const second = animateWithClass(el, 'test-animate');
    await nextFrame();
    expect(el.classList.contains('test-animate')).to.be.true;
    expect(el.getAnimations()[0].playState).to.equal('running');
    el.getAnimations()[0].finish();
    await second;
    expect(el.classList.contains('test-animate')).to.be.false;
  });

  it('should settle without waiting for infinite CSS animations or Web Animations', async () => {
    const el = await fixture<HTMLElement>(html`<div></div>`);
    const animation = el.animate([{ color: 'red' }, { color: 'blue' }], { duration: 60000 });
    try {
      await animateWithClass(el, 'test-infinite');
      expect(el.classList.contains('test-infinite')).to.be.false;
      expect(animation.playState).to.equal('running');
    } finally {
      animation.cancel();
    }
  });

  it('should settle without waiting for CSS transitions', async () => {
    const el = await fixture<HTMLElement>(html`<div style="opacity: 0; transition: opacity 60s"></div>`);
    getComputedStyle(el).opacity;
    el.style.opacity = '1';
    const transition = el.getAnimations()[0];
    expect(transition).to.be.instanceOf(CSSTransition);

    await animateWithClass(el, 'test-no-animation');
    expect(el.classList.contains('test-no-animation')).to.be.false;
    expect(transition.playState).to.equal('running');
  });

  for (const className of ['test-no-animation', 'test-zero']) {
    it(`should settle with ${className}`, async () => {
      const el = await fixture<HTMLElement>(html`<div></div>`);
      await animateWithClass(el, className);
      expect(el.classList.contains(className)).to.be.false;
    });
  }
});
