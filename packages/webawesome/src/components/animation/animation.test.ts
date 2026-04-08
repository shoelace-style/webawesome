import { aTimeout, expect, oneEvent } from '@open-wc/testing';
import { html } from 'lit';
import { clientFixture } from '../../internal/test/fixture.js';
import type WaAnimation from './animation.js';

describe('<wa-animation>', () => {
  // Animation component only uses clientFixture because SSR/hydration has issues with animation promises.
  // See: https://github.com/lit/lit/issues/4739#issuecomment-2299899990
  for (const fixture of [clientFixture]) {
    describe(`with "${fixture.type}" rendering`, () => {
      describe('properties', () => {
        it('should have correct default property values', async () => {
          const el = await fixture<WaAnimation>(
            html`<wa-animation><div></div></wa-animation>`,
          );

          expect(el.name).to.equal('none');
          expect(el.play).to.be.false;
          expect(el.delay).to.equal(0);
          expect(el.direction).to.equal('normal');
          expect(el.duration).to.equal(1000);
          expect(el.easing).to.equal('linear');
          expect(el.endDelay).to.equal(0);
          expect(el.fill).to.equal('auto');
          expect(el.iterations).to.equal(Infinity);
          expect(el.iterationStart).to.equal(0);
          expect(el.playbackRate).to.equal(1);
        });

        it('should reflect the "play" property to an attribute', async () => {
          const el = await fixture<WaAnimation>(
            html`<wa-animation name="bounce"><div></div></wa-animation>`,
          );

          expect(el.hasAttribute('play')).to.be.false;

          el.play = true;
          await el.updateComplete;
          expect(el.hasAttribute('play')).to.be.true;

          el.play = false;
          await el.updateComplete;
          expect(el.hasAttribute('play')).to.be.false;
        });

        it('should set the name property via attribute', async () => {
          const el = await fixture<WaAnimation>(
            html`<wa-animation name="bounce"><div></div></wa-animation>`,
          );

          expect(el.name).to.equal('bounce');
        });

        it('should set the duration property via attribute', async () => {
          const el = await fixture<WaAnimation>(
            html`<wa-animation duration="500"><div></div></wa-animation>`,
          );

          expect(el.duration).to.equal(500);
        });

        it('should set the delay property via attribute', async () => {
          const el = await fixture<WaAnimation>(
            html`<wa-animation delay="200"><div></div></wa-animation>`,
          );

          expect(el.delay).to.equal(200);
        });

        it('should set the iterations property via attribute', async () => {
          const el = await fixture<WaAnimation>(
            html`<wa-animation iterations="3"><div></div></wa-animation>`,
          );

          expect(el.iterations).to.equal(3);
        });

        it('should set the easing property via attribute', async () => {
          const el = await fixture<WaAnimation>(
            html`<wa-animation easing="ease-in-out"><div></div></wa-animation>`,
          );

          expect(el.easing).to.equal('ease-in-out');
        });

        it('should set the playback-rate property via attribute', async () => {
          const el = await fixture<WaAnimation>(
            html`<wa-animation playback-rate="2"><div></div></wa-animation>`,
          );

          expect(el.playbackRate).to.equal(2);
        });

        it('should accept custom keyframes via the keyframes property', async () => {
          const el = await fixture<WaAnimation>(
            html`<wa-animation><div></div></wa-animation>`,
          );

          const keyframes = [{ opacity: 0 }, { opacity: 1 }];
          el.keyframes = keyframes;
          await el.updateComplete;
          expect(el.keyframes).to.equal(keyframes);
        });

        it('should get and set currentTime', async () => {
          const el = await fixture<WaAnimation>(
            html`<wa-animation name="bounce" duration="1000"><div></div></wa-animation>`,
          );

          expect(el.currentTime).to.equal(0);

          el.currentTime = 500;
          expect(el.currentTime).to.equal(500);
        });
      });

      describe('events', () => {
        it('should emit wa-start when play is set to true', async () => {
          const el = await fixture<WaAnimation>(
            html`<wa-animation name="bounce" duration="1000"><div></div></wa-animation>`,
          );

          const startPromise = oneEvent(el, 'wa-start');
          el.play = true;
          await startPromise;
        });

        it('should emit wa-finish when the animation completes', async () => {
          const el = await fixture<WaAnimation>(
            html`<wa-animation name="bounce" duration="1" iterations="1"><div></div></wa-animation>`,
          );

          const finishPromise = oneEvent(el, 'wa-finish');
          el.play = true;
          await finishPromise;
        });

        it('should emit wa-cancel when the animation is cancelled', async () => {
          const el = await fixture<WaAnimation>(
            html`<wa-animation name="bounce" duration="10000"><div></div></wa-animation>`,
          );

          el.play = true;
          await aTimeout(0);

          const cancelPromise = oneEvent(el, 'wa-cancel');
          el.cancel();
          await cancelPromise;
        });

        it('should not emit wa-finish when cancelled before completion', async () => {
          const el = await fixture<WaAnimation>(
            html`<wa-animation name="bounce" duration="10000"><div></div></wa-animation>`,
          );

          let finishFired = false;
          oneEvent(el, 'wa-finish').then(() => {
            finishFired = true;
          });

          el.play = true;
          await aTimeout(0);

          const cancelPromise = oneEvent(el, 'wa-cancel');
          el.cancel();
          await cancelPromise;

          expect(finishFired).to.be.false;
        });

        it('should set play to false after the animation finishes', async () => {
          const el = await fixture<WaAnimation>(
            html`<wa-animation name="bounce" duration="1" iterations="1"><div></div></wa-animation>`,
          );

          const finishPromise = oneEvent(el, 'wa-finish');
          el.play = true;
          await finishPromise;

          expect(el.play).to.be.false;
        });

        it('should set play to false after the animation is cancelled', async () => {
          const el = await fixture<WaAnimation>(
            html`<wa-animation name="bounce" duration="10000"><div></div></wa-animation>`,
          );

          el.play = true;
          await aTimeout(0);

          const cancelPromise = oneEvent(el, 'wa-cancel');
          el.cancel();
          await cancelPromise;

          expect(el.play).to.be.false;
        });
      });

      describe('slots', () => {
        it('should render slotted content in the default slot', async () => {
          const el = await fixture<WaAnimation>(html`
            <wa-animation>
              <div id="animated-box" style="width: 10px; height: 10px;"></div>
            </wa-animation>
          `);

          const child = el.querySelector('#animated-box');
          expect(child).to.exist;
        });
      });

      describe('behavior', () => {
        it('should not start the animation by default', async () => {
          const el = await fixture<WaAnimation>(
            html`<wa-animation name="bounce" duration="10"><div></div></wa-animation>`,
          );
          await aTimeout(0);

          expect(el.play).to.be.false;
        });

        it('should finish the animation programmatically', async () => {
          const el = await fixture<WaAnimation>(
            html`<wa-animation name="bounce" duration="10000" iterations="1"><div></div></wa-animation>`,
          );

          const finishPromise = oneEvent(el, 'wa-finish');
          el.play = true;
          await aTimeout(0);
          el.finish();
          await finishPromise;
        });

        it('should start playing when the play attribute is set initially', async () => {
          const el = await fixture<WaAnimation>(
            html`<wa-animation name="bounce" duration="10000" play><div></div></wa-animation>`,
          );

          expect(el.play).to.be.true;
        });
      });
    });
  }
});
