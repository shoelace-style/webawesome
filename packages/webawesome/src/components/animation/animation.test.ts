import { aTimeout, expect, oneEvent } from '@open-wc/testing';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { clientFixture } from '../../internal/test/fixture.js';
import type WaAnimation from './animation.js';

describe('<wa-animation>', () => {
  // Don't use HTML because its not supported by Lit SSR for WTR.
  // https://github.com/lit/lit/issues/4739#issuecomment-2299899990
  const boxToAnimate = `<div style="width: 10px; height: 10px;" data-testid="animated-box"></div>`;

  // Figure out why hydratedFixture fails promises.
  for (const fixture of [clientFixture]) {
    describe(`with "${fixture.type}" rendering`, () => {
      it('renders', async () => {
        const animationContainer = await fixture<WaAnimation>(
          html`<wa-animation>${unsafeHTML(boxToAnimate)}</wa-animation>`,
        );

        expect(animationContainer).to.exist;
      });

      it('is accessible', async () => {
        const animationContainer = await fixture<WaAnimation>(
          html`<wa-animation>${unsafeHTML(boxToAnimate)}</wa-animation>`,
        );

        await expect(animationContainer).to.be.accessible();
      });

      describe('animation start', () => {
        it('does not start the animation by default', async () => {
          const animationContainer = await fixture<WaAnimation>(
            html`<wa-animation name="bounce" easing="ease-in-out" duration="10"
              >${unsafeHTML(boxToAnimate)}</wa-animation
            >`,
          );
          await aTimeout(0);

          expect(animationContainer.play).to.be.false;
        });

        it('emits the correct event on animation start', async () => {
          const animationContainer = await fixture<WaAnimation>(
            html`<wa-animation name="bounce" easing="ease-in-out" duration="10"
              >${unsafeHTML(boxToAnimate)}</wa-animation
            >`,
          );

          const startPromise = oneEvent(animationContainer, 'wa-start');
          animationContainer.play = true;
          const isSettled = (await Promise.allSettled([startPromise]))[0].status === 'fulfilled';
          expect(isSettled).to.equal(true);
        });
      });

      it('emits the correct event on animation end', async () => {
        const animationContainer = await fixture<WaAnimation>(
          html`<wa-animation name="bounce" easing="ease-in-out" duration="1"
            >${unsafeHTML(boxToAnimate)}</wa-animation
          >`,
        );

        const endPromise = oneEvent(animationContainer, 'wa-finish');
        animationContainer.iterations = 1;
        animationContainer.play = true;
        return endPromise;
      });

      it('can be finished by hand', async () => {
        const animationContainer = await fixture<WaAnimation>(
          html`<wa-animation name="bounce" easing="ease-in-out" duration="1000"
            >${unsafeHTML(boxToAnimate)}</wa-animation
          >`,
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
          html`<wa-animation name="bounce" easing="ease-in-out" duration="1"
            >${unsafeHTML(boxToAnimate)}</wa-animation
          >`,
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
  }
});
