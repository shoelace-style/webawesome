import '../../../dist/webawesome.js';
import { aTimeout, expect, fixture, html, oneEvent } from '@open-wc/testing';
import type WaAnimation from './animation.js';

describe('<wa-animation>', () => {
  const boxToAnimate = html`<div style="width: 10px; height: 10px;" data-testid="animated-box"></div>`;

  it('renders', async () => {
    const animationContainer = await fixture<WaAnimation>(html`<wa-animation>${boxToAnimate}</wa-animation>`);

    expect(animationContainer).to.exist;
  });

  it('is accessible', async () => {
    const animationContainer = await fixture<WaAnimation>(html`<wa-animation>${boxToAnimate}</wa-animation>`);

    await expect(animationContainer).to.be.accessible();
  });

  describe('animation start', () => {
    it('does not start the animation by default', async () => {
      const animationContainer = await fixture<WaAnimation>(
        html`<wa-animation name="bounce" easing="ease-in-out" duration="10">${boxToAnimate}</wa-animation>`
      );
      await aTimeout(0);

      expect(animationContainer.play).to.be.false;
    });

    it('emits the correct event on animation start', async () => {
      const animationContainer = await fixture<WaAnimation>(
        html`<wa-animation name="bounce" easing="ease-in-out" duration="10">${boxToAnimate}</wa-animation>`
      );

      const startPromise = oneEvent(animationContainer, 'wa-start');
      animationContainer.play = true;
      return startPromise;
    });
  });

  it('emits the correct event on animation end', async () => {
    const animationContainer = await fixture<WaAnimation>(
      html`<wa-animation name="bounce" easing="ease-in-out" duration="1">${boxToAnimate}</wa-animation>`
    );

    const endPromise = oneEvent(animationContainer, 'wa-finish');
    animationContainer.iterations = 1;
    animationContainer.play = true;
    return endPromise;
  });

  it('can be finished by hand', async () => {
    const animationContainer = await fixture<WaAnimation>(
      html`<wa-animation name="bounce" easing="ease-in-out" duration="1000">${boxToAnimate}</wa-animation>`
    );

    const endPromise = oneEvent(animationContainer, 'wa-finish');
    animationContainer.iterations = 1;
    animationContainer.play = true;

    await aTimeout(0);

    animationContainer.finish();
    return endPromise;
  });

  it('can be cancelled', async () => {
    const animationContainer = await fixture<WaAnimation>(
      html`<wa-animation name="bounce" easing="ease-in-out" duration="1">${boxToAnimate}</wa-animation>`
    );
    let animationHasFinished = false;
    oneEvent(animationContainer, 'wa-finish').then(() => (animationHasFinished = true));
    const cancelPromise = oneEvent(animationContainer, 'wa-cancel');
    animationContainer.play = true;

    await aTimeout(0);
    animationContainer.cancel();

    await cancelPromise;
    expect(animationHasFinished).to.be.false;
  });
});
